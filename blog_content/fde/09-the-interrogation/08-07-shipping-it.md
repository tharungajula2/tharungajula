---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 8
title: "SHIPPING IT"
slug: "07-shipping-it"
sectionNumber: "07"
part: "PART I — FAST RECALL"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 1166
status: "raw"
section: "§07"
summary: ""
enriched: false
---

## 07 — SHIPPING IT

**Why validate settings at startup?**
A missing or malformed config fails loudly at boot rather than mysteriously at 3 a.m. on the first request.

**Why return 202 rather than 200 from a job-creating endpoint?**
202 means accepted, not completed — which is the truth when the work goes on a queue. 200 is a lie the client acts on.

**What's the SSE wire-format trap?**
`data: ` then **two** newlines. One newline and the client waits forever for the rest of the event.

**Why does enterprise networking break streaming?**
Proxies and load balancers buffer by default, so tokens arrive in one lump. Test through the real network path, and know that polling is a legitimate fallback.

**Why must migrations be transactional?**
A half-applied migration leaves a broken schema. All-or-nothing makes a failure a no-op you can fix and retry.

**Explain connection pooling and the outage it prevents.**
Reusable open connections borrowed and returned per request. It prevents connection exhaustion, the classic production database outage.

**What's the additive-migration pattern and why does an FDE need it?**
Add the column, deploy code writing both, backfill, deploy code reading the new one, drop the old one later. Four deploys for one column — necessary when schema changes are gated on change windows.

**State the Dockerfile layer-ordering trick and why it works.**
Copy and install `requirements.txt` before copying code. Layers are cached, so a code change doesn't reinstall dependencies.

**Why must secrets never be baked into an image?**
An image is a distributable artifact. A key baked in is a key leaked to everyone who has it.

**Liveness versus readiness — state the distinction and the classic mistake.**
Liveness: should this container be restarted? Readiness: should it receive traffic now? Making liveness depend on a downstream dependency turns a five-second database blip into a full outage as every pod restarts at once.

**AuthN versus AuthZ, and the dangerous failure.**
Who are you, versus what may you do. The dangerous failure is authenticated-but-not-authorized: a valid user reading another user's data, which looks like normal traffic in the logs.

**Why must JWT algorithms be pinned in code?**
If you trust the token's declared algorithm, an attacker sets it to `none`, sends an unsigned token, and your validator accepts it.

**Why check audience and issuer?**
Signature validity alone means the token is genuine — not that it was intended for *you*. A valid token for another app would otherwise be accepted.

**Why is "Sign in with Google" the wrong mental model for enterprise?**
The enterprise has an identity provider that is the source of truth for who works there. You federate to theirs; you do not maintain users.

**Name three enterprise identity frictions nobody budgets for.**
App registration is a ticketed queue taking weeks. Redirect URIs are locked down and `localhost` may be forbidden. The claims you receive are not the claims you requested.

**Why never build your own user table "for now"?**
It becomes permanent, becomes a second source of truth, becomes an offboarding hole when someone leaves, and becomes an audit finding.

**Name five things a secrets manager adds over environment variables.**
Encryption at rest, access control, rotation without redeploy, audit of access, and no secrets in code or images.

**Distinguish watching a budget from enforcing one.**
Watching alerts. Enforcing refuses the request. "We noticed the bill was high" versus "the system refused to exceed the budget."

**How does RLS make row-level isolation architectural?**
The database appends the tenant condition to every query, so a query that forgets the filter still isolates. It turns "every developer must remember, forever" into a structural guarantee.

**What does `FORCE ROW LEVEL SECURITY` prevent?**
The table owner — usually your application's own role — bypassing RLS, which would silently disable the whole protection.

**Explain the noisy-neighbour problem and its three limits.**
One tenant degrades others' experience. Contained by rate limits, resource quotas, and cost caps.

**Why model business lines as tenants at a single-customer deployment?**
Business lines have different users, different policy, and sometimes a real regulatory segregation boundary. Retrofitting isolation is a rewrite.

**Why can't long agent tasks run inside HTTP requests?**
They time out, tie up the server, and leave the user watching a spinner. Accept fast, run slow, poll for status.

**Why autoscale workers on queue depth rather than CPU?**
Workers are blocked on model API latency, not computing anything, so CPU looks fine while a thousand files wait.

**Why does `applicant_ref` in a log line get hashed?**
It lets you correlate across systems without putting a consumer identifier into a log store with different retention and access control from your database.

**Name the four problems demo mode solves.**
Safe demos, credential-free CI, cost-free development, and reliable demos that don't depend on a live API.

**Why can't you demo-mode a tangled system?**
Demo mode works by swapping implementations behind interfaces. Without clean seams there's nothing to swap.

**What's the one production caching trap?**
A shared cache is a shared blast radius. Tenant id goes in every cache key.

**Name the three observability pillars and the question each answers.**
Metrics — something's wrong. Traces — where. Logs — what.

**Distinguish SLI, SLO, SLA.**
Measurement, target, contract.

**Explain the error budget as a decision tool.**
An SLO of 99.5% means 0.5% is allowed to fail. Budget remaining means ship features; exhausted means reliability work outranks features.

**Which SLOs get no budget, and why?**
Citation integrity and successful exfiltrations. There's no acceptable rate of uncited numbers in credit memos or of data leaving the building — those get a halt, not an alert.

**What does flat throughput with rising latency indicate?**
A saturated resource, not a slow one. The queue is the latency.

**Why load-test in demo mode?**
It tests your API, database, queue, and workers for free, without model cost or rate-limit exposure.

**Why is the bottleneck rarely what you'd guess?**
In the worked case the LLM was mocked and the system still collapsed at 120 users, on a 20-connection database pool.

**Why order CI stages cheapest-first?**
A syntax error should fail in twelve seconds, not after eight minutes of eval.

**How do you design for change management rather than fighting it?**
Continuous deployment to staging, gated to production. Auto-generate the change record. Batch small changes. Build feature flags so behaviour changes without a deploy.

**Why deliberately break your own system?**
Failures will happen, and the only way to know you recover is to test it — while you're watching and calm.

**Why is fast rollback usually better than forward-fix?**
Mean-time-to-recovery is what burns error budget and trust. Roll back, breathe, then diagnose calmly.

**Why does data need protection code doesn't?**
Code rolls back by redeploying. A migration that drops data is often irreversible.

**What's the untested-backup disaster?**
"We had backups but never tested the restore and it didn't work."

**Why is a data-flow audit worth doing before you're asked?**
It surfaces discovered obligations — data you created that nobody knew existed and that would survive a deletion request.

---
