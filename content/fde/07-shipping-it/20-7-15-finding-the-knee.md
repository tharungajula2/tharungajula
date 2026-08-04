---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 20
title: "Finding the knee"
slug: "7-15-finding-the-knee"
sectionNumber: "7.15"
part: "PART IV — KEEPING IT ALIVE"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 392
status: "raw"
section: "§7.15"
summary: ""
enriched: false
---

## § 7.15 — Finding the knee

Your system works for you. Will it work for a hundred concurrent users?

**You don't know your capacity, your bottleneck, your latency behaviour, or your failure mode until you measure them under load.**

**The method.** Define realistic user scenarios. Ramp load — 10 users, 100, 1000 — watching where it breaks. Measure latency percentiles, error rates, throughput, resource usage. **Find the knee** — the load level where latency spikes or errors climb.

**And the AI-specific wrinkle: use demo mode**, so load-testing the *system* — your API, database, queue, workers — costs nothing and doesn't exhaust your model API rate limits.

```
LOAD TEST — memo pipeline, demo mode, ramping

users   rps    p50     p95      p99     errors   bottleneck signal
──────────────────────────────────────────────────────────────────────
  10    2.1   0.9s    1.4s     1.9s      0%      —
  50   10.4   1.1s    2.2s     3.8s      0%      —
 100   19.8   1.4s    3.9s     9.1s      0%      db pool wait ↑
 200   24.1   4.8s   21.3s    48.0s      2%      db pool exhausted ⚠
 400   24.3  18.2s   95.0s   timeout    31%      cascade ⚠⚠
──────────────────────────────────────────────────────────────────────
KNEE: ~120 concurrent users
BOTTLENECK: database connection pool (20 connections)
FAILURE MODE: cascading — requests queue on pool, time out, retry, worsen
```

**MENTAL TRACE — read the `rps` column, because it's where the diagnosis lives.**

Throughput climbs to 24 requests per second at 200 users and then **stops climbing** while latency explodes. That flat ceiling with rising latency is the signature of a **saturated resource**, not a slow one.

The resource is the database connection pool. Twenty connections, each held for the duration of a request; at 200 concurrent users, requests queue waiting for a connection, and the wait — not the work — becomes the latency.

Then it gets worse in a specific way. At 400 users, timed-out requests **retry**, adding load to an already-saturated pool. That's a **cascading failure**: the system's own recovery behaviour amplifies the problem.

**And the bottleneck is not the model.** Everyone's intuition says the LLM is the slow part. Here the LLM is mocked and the system still falls over at 120 users, on a resource nobody would have guessed.

**Measure, don't guess — for systems, exactly as for quality.**

The fixes follow directly: raise the pool size within the DBA's allocation, shorten connection hold time by moving work off the request path, and add a circuit breaker so retries back off rather than pile on.

---
