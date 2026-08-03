---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 11
title: "Secrets"
slug: "7-8-secrets"
sectionNumber: "7.8"
part: "PART II — GETTING IN AND STAYING OUT"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 387
status: "raw"
section: "§7.8"
summary: ""
enriched: false
---

## § 7.8 — Secrets

You've been told since Document 02: never hardcode keys, use environment variables. **Production goes further.**

A **secrets manager** is a dedicated, encrypted, access-controlled store for credentials. Why beyond environment variables: *encryption at rest*, *access control* so only authorised identities read specific secrets, *rotation* without redeploying, *audit* of who accessed which secret when, and **no secrets in code, config, or images**.

The mental model: **secrets live in one hardened, audited place, and everything fetches them at runtime** — never scattered across repos, env files, and images where they leak.

```python
@lru_cache(maxsize=None)
def get_secret(name: str) -> str:
    return secret_client.access(f"projects/{settings.project}/secrets/{name}/versions/latest")

# at startup, not at request time
API_KEY = get_secret("meridian-model-api-key")
```

**MENTAL TRACE.** `@lru_cache` means the fetch happens once per process and the value is reused. Without it you'd hit the secrets API on every request — adding latency, cost, and rate-limit exposure to every single call.

But note the tension the cache creates: a **rotated** secret won't be picked up until the process restarts. For scheduled rotation that's fine, because rotation is paired with a rolling restart. For emergency revocation it isn't — so a cache with a TTL, or an explicit reload endpoint, is the mature version.

**And cost engineering shares this section for a reason: both secrets and money are resources a production system can lose catastrophically and silently.**

**Strict budget capping** is the key phrase. A budget you *watch* is good. A budget you *enforce* — where the request is **refused** when the cap is hit — is what prevents the runaway-bill disaster.

**Architecture over vigilance, for money.** "We noticed the bill was high" becomes "the system refused to exceed the budget."

**THE DEPLOYMENT LENS.** At Meridian the failure mode is subtler than a leak, and it's an ownership question.

**Who rotates the model API key, and what happens to your service when they do?**

If the answer is "nobody knows," you have found a real problem. Establish it explicitly: which team owns the secret, what the rotation schedule is, how your service picks up the new value, and who gets paged if a rotation breaks the service at 2 a.m.

Write it in the runbook. **An unowned credential is an outage with a date on it**, and the date is whenever their security team next runs a rotation sweep.

---
