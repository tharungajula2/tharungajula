---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 14
title: "The money and the milliseconds"
slug: "5-11-the-money-and-the-milliseconds"
sectionNumber: "5.11"
part: "PART II — SEEING INSIDE"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 303
status: "raw"
section: "§5.11"
summary: ""
enriched: false
---

## § 5.11 — The money and the milliseconds

A ledger records; a dashboard **reveals**.

**What to dashboard.** *Cost* — total over time, per file, broken down by model and span. Cache-hit rate and savings. *Latency* — **p50, p95, p99 over time, never the mean.** Latency by step and tool. *Throughput*. *Reliability* — error rates, retry rates, fallback frequency.

```
COST & LATENCY — last 30 days
──────────────────────────────────────────────────────────
cost / file          $0.031      (mean)      trend: ▁▁▂▂▂▃▃  +18%  ⚠
latency p50           6.1s
latency p95          14.7s
latency p99          38.2s                   ← the tail
cache hit rate         31%       policy corpus only
fallback rate         0.4%
──────────────────────────────────────────────────────────
COST BY SPAN
  synthesise         38%   ████████
  hop reasoning      31%   ██████
  rerank             14%   ███
  retrieval           9%   ██
  validation          8%   ██
```

**MENTAL TRACE.** Two things jump out that a log file would bury.

**p99 is six times p50.** The average user waits six seconds; one in a hundred waits nearly forty. **Means hide tails, and the tail is what generates complaints.** If you reported "average latency 6 seconds" nobody would investigate — and the 38-second files are almost certainly the 240-page ones, which are also the highest-value ones.

**Cost per file is trending up 18% with no code change.** That's the drift signal, and § 5.13 explains what it usually means. Something is growing — probably file sizes, possibly scratchpad growth from § 4.9, possibly a prompt that lost its cache prefix.

**And the breakdown localises the optimisation.** 38% of spend is one span. If you want a cheaper system, that's where to look, and you know it in five seconds rather than after a week of guessing.

**Verify the numbers against two other sources.** The dashboard, the ledger, and the traces should agree. Three instruments agreeing validates all three; a disagreement means one of them lies, and you need to know which.

---
