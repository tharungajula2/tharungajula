---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 22
title: "The approval"
slug: "the-approval"
sectionNumber: null
part: "PART III — PROVE IT AND SHIP IT"
kind: "scene"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 405
status: "raw"
section: ""
summary: ""
enriched: false
---

## The approval

Rina's team ran 60 attacks. You gave them the threat model and told them where you thought it was weakest, and they found two things you hadn't — a crescendo attack splitting a payload across three documents, and a way to make the system quote its own prompt back inside a flag detail.

Both are fixed. Both are in the CI suite.

She signs off with one condition: **the zero-egress rule is enforced at the network layer and any change to it requires her approval, not yours.** Which is exactly right, and you say so.

Adaeze takes longer. The counterfactual finding did what it was supposed to do — it turned an unanswerable question into two specific ones with different answers. She approves the deployment **excluding Spanish-language files**, which route to manual review, with quarterly counterfactual testing run by Meridian and a requirement that the less-discriminatory-alternative analysis be documented before any scope expansion.

You lost a fifth of the volume. You gained the only thing that mattered.

On the way out she asks how you knew to run that test. You tell her the truth: you didn't, at first. You built the redaction for privacy reasons, and only later worked out that the same control was doing fairness work, and once you saw that you had to go look at whether it was doing it *well*.

*"Most vendors tell me their model doesn't use race,"* she says. *"You're the first one who's shown me a number."*

---

The system is now allowed to exist. It is still running on your laptop.

There is no authentication against Meridian's identity provider. No deployment into their cloud. No queue that survives 3 a.m. No secrets management that isn't a `.env` file. No on-call. No rollback. No database that four other teams also depend on.

Every one of those is a reason a fully-approved, fully-tested, fully-fair system never goes live — and this is the part where most pilots quietly die.

---

**Wikilinks:** [[agent-threat-model]] · [[direct-injection]] · [[build-overlap-scanner]] · [[jailbreaks-redteaming]] · [[supply-chain-risks]] · [[spotlighting-delimiters]] · [[lethal-trifecta]] · [[least-privilege-tools]] · [[build-proposal-gate]] · [[build-idempotency-audit]] · [[guardrails-in-out]] · [[pii-redaction]] · [[refusals-content-safety]] · [[sandboxing-isolation]] · [[build-redteam-my-agent]] · [[build-injection-suite]] · [[responsible-shipping]] · [[synthesis-safety]] · [[privacy-in-memory]] · [[mcp-security]] · [[classical-ml-fundamentals]] · [[hitl-interrupts]]

*Next — Document 07: SHIPPING IT. FastAPI, Docker, Postgres, queues, OAuth against their identity provider, secrets, monitoring, SLOs, multi-tenancy, and rollback. The 80%, and the largest document in this set.*
