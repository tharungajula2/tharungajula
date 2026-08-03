---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 19
title: "Reliability as a number"
slug: "7-14-reliability-as-a-number"
sectionNumber: "7.14"
part: "PART IV — KEEPING IT ALIVE"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 389
status: "raw"
section: "§7.14"
summary: ""
enriched: false
---

## § 7.14 — Reliability as a number

**The three pillars.** *Metrics* — numeric measurements over time; aggregate health. *Logs* — discrete events with context. *Traces* — the path of one request.

They answer different questions. **Metrics say something's wrong. Traces say where. Logs say what.** Detect, localise, diagnose.

**The reliability vocabulary.** An **SLI** is a *measured* aspect of quality. An **SLO** is a *target* for an SLI. An **SLA** is a *contractual* SLO with consequences.

**The error budget is the genuinely useful idea.** An SLO of 99.5% success implies that 0.5% of requests are *allowed* to fail.

This reframes reliability powerfully. **You don't need perfection** — it's impossible and absurdly expensive; the last 0.01% costs more than everything before it. **You need to stay within budget.**

And the budget becomes a *decision tool*: budget remaining means ship features; budget exhausted means stop shipping and fix reliability. **Reliability and velocity balanced by a number rather than by whoever argues loudest.**

**AI systems have extra SLO dimensions.** Beyond availability and latency: **quality** SLOs, **cost** SLOs, and **safety** SLOs.

```
MERIDIAN SLOs — agreed with platform + model risk

DIMENSION      SLI                              SLO         BUDGET/30d
────────────────────────────────────────────────────────────────────────
availability   successful /memos requests       99.5%       3.6h
latency        p95 memo completion              < 20s       —
quality        discrepancy catch rate           ≥ 0.90      (halt below)
quality        citation integrity               = 1.00      zero tolerance
cost           mean cost per file               < $0.06     —
safety         successful exfiltrations         = 0         zero tolerance
────────────────────────────────────────────────────────────────────────
ERROR BUDGET POLICY
  > 50% remaining  → normal feature work
  < 50% remaining  → reliability work prioritised, changes reviewed
  exhausted        → feature freeze until budget recovers
```

**MENTAL TRACE.** Six SLOs across five dimensions, and notice that **two have no budget at all.**

Availability gets 3.6 hours of downtime a month, because perfect uptime isn't worth what it costs. Latency and cost are targets you engineer toward.

But citation integrity and successful exfiltrations are **zero tolerance**. There is no acceptable rate of uncited numbers in credit memos and no acceptable rate of data leaving the building.

**Knowing which of your SLOs have budgets and which don't is the judgement.** An engineer who treats every metric as negotiable ships something dangerous; one who treats every metric as sacred ships nothing. The bottom rows aren't reliability targets — they're the deployment's licence conditions, and they get a different mechanism: not an alert, a halt.

---
