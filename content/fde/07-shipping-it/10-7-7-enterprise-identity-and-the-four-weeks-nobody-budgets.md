---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 10
title: "Enterprise identity, and the four weeks nobody budgets"
slug: "7-7-enterprise-identity-and-the-four-weeks-nobody-budgets"
sectionNumber: "7.7"
part: "PART II — GETTING IN AND STAYING OUT"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 687
status: "raw"
section: "§7.7"
summary: ""
enriched: false
---

## § 7.7 — Enterprise identity, and the four weeks nobody budgets

*This section is not in any textbook and it is where deployments actually stall.*

Every tutorial teaches "Sign in with Google." **No enterprise deployment works that way.**

Meridian has an identity provider — Entra ID, Okta, Ping, something — and it is the source of truth for who works there. Your application does not maintain users. It **federates** to theirs.

### What that actually means

**Two protocols, and you need to recognise both.** **OIDC** — OpenID Connect, built on OAuth2, modern, JSON and JWT based, and what you want. **SAML** — older, XML-based, and still extremely common in banking. If their IdP integration team says SAML, you're doing SAML, and it is more painful.

**The flow, for OIDC.** Your app redirects the user to the IdP. They authenticate there — with the bank's own MFA, conditional access, and device policies, none of which you see or control. The IdP redirects back with an authorization code. Your backend exchanges it for tokens. **You never see a password**, which is the entire point.

**Group-to-role mapping is where the real work is.** The IdP returns group memberships — `CN=Underwriters-Tier2,OU=Lending`. Your application has roles — `memo:review`, `memo:create`, `admin`. Something has to map between them, and that mapping is a *policy artifact* that someone at the bank owns, not a config file you edit.

### The friction, honestly

Here is the timeline nobody puts in the project plan, and knowing it is worth more than knowing the protocol.

**Getting an app registration in their IdP takes weeks.** It's a ticket, to a team with a queue, that requires a business owner, a security review, and often an architecture review board slot. **Raise it in week one, before you need it**, because it's pure lead time and it blocks everything.

**Redirect URIs are locked down.** Every environment — local, dev, staging, prod — needs its URI registered. Each one is a change request. `localhost` is often forbidden entirely, which means you cannot test the login flow on your own machine and need a dev environment before you can develop.

**The claims you get are not the claims you asked for.** You'll request group memberships and receive an opaque object id. You'll request email and get a UPN that isn't an email. **Log the entire token payload the first time it works and design against what actually arrives**, not what the documentation promised.

**Group membership may be capped.** Some IdPs stop emitting groups above a threshold and hand you a lookup endpoint instead, which means your authorization needs a network call you didn't plan for.

**Token lifetimes are set by their policy.** If corporate policy expires access tokens in fifteen minutes and your memo review takes twenty, you have a real UX problem that no amount of clever code fixes — you need a refresh flow, and possibly a conversation about the policy.

### The FDE moves

**Find the IdP person in week one and buy them a coffee.** They are not in your meetings, they are not on the project, and they are on the critical path. This is the § 3.2 move — find the person, not the document — applied to identity.

**Build behind an auth interface from day one.** A `current_user` dependency with a mock implementation for local development and the real OIDC validator in deployed environments. Your entire application develops against the interface while the IdP ticket works through the queue. Without this seam, four weeks of IdP lead time becomes four weeks of blocked development.

**Never build your own user table "for now."** It becomes permanent, it becomes a second source of truth about who works there, it becomes an offboarding hole when someone leaves the bank and still has access to your system, and it becomes an audit finding. **Federate or don't ship.**

`[RECEIPT]` **An OIDC integration against a real enterprise IdP, with group-to-role mapping and a documented claims contract.** "Sign in with Google" is a tutorial. This is the thing enterprise deployments actually need and the thing almost no self-taught engineer has done.

---
