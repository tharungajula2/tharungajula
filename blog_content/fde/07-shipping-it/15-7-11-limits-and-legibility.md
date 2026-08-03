---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 15
title: "Limits and legibility"
slug: "7-11-limits-and-legibility"
sectionNumber: "7.11"
part: "PART III — DOING THE WORK"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 225
status: "raw"
section: "§7.11"
summary: ""
enriched: false
---

## § 7.11 — Limits and legibility

Two production essentials, paired: protecting your API from overload, and making your system's behaviour **legible**.

**Rate limiting**, now from the server side. Per-identity, per-tenant, per-endpoint caps that protect you from abuse, runaway costs, and overload — the § 2.10 mechanics inverted.

**Structured logging** is the one that will save you at 3 a.m.

```json
{"ts":"2026-07-29T14:02:11.884Z","level":"info","event":"memo.completed",
 "trace_id":"4f2a...","span_id":"9c11...","correlation_id":"REQ-88123",
 "tenant":"personal-loans","task_id":"t_8812","applicant_ref":"sha256:9e41...",
 "duration_ms":8412,"cost_usd":0.031,"model":"claude-sonnet-4-5",
 "flags":["income_discrepancy"],"citations":3,"status":"awaiting_review"}
```

**MENTAL TRACE.** One line, machine-parseable, and every field earns its place.

`trace_id` and `span_id` connect this log to the § 5.9 trace, so a log line and a trace span are two views of the same event. `correlation_id` is *their* header, propagated — which means Meridian's ops team can search their logs and yours with one id.

And look at `applicant_ref`. **It's a hash, not an applicant id.** The log records *which* file this was in a way that lets you correlate across systems, without putting a consumer identifier into a log aggregator that has different retention and different access control from your database.

That single choice is § 6.11's least-data principle applied to logging, and it's the difference between a log store that's an operational tool and one that's a compliance liability.

Unstructured logs — `print(f"finished memo for {applicant_id}")` — cannot be searched, aggregated, alerted on, or safely retained. **Structured from day one; retrofitting is miserable.**

---
