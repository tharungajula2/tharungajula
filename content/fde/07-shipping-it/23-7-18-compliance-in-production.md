---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 23
title: "Compliance, in production"
slug: "7-18-compliance-in-production"
sectionNumber: "7.18"
part: "PART IV — KEEPING IT ALIVE"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 432
status: "raw"
section: "§7.18"
summary: ""
enriched: false
---

## § 7.18 — Compliance, in production

Documents 00 and 06 established the obligations. This is where they become infrastructure.

**Data retention limits.** Don't keep data forever. Delete it when its purpose expires or its retention period ends — **a legal requirement and a security benefit**, because data you've deleted can't leak.

**PII masked everywhere it flows** — not just at the model boundary. Logs, traces, caches, backups, error reports, monitoring. **Access to unmasked data is controlled and audited.**

**Append-only, tamper-evident security logs** — § 6.9's hash chain, now as the accountability infrastructure compliance demands.

```
DATA FLOW AUDIT — where applicant data lives, and for how long

STORE               CONTAINS          MASKED   RETENTION   DELETION
────────────────────────────────────────────────────────────────────
loan documents      full PII            no     bank policy  bank-owned
extracted chunks    full PII            no     90d after    cascade
                                                decision
memo drafts         full PII            no     bank policy  bank-owned
task queue          applicant_id only   n/a    7d           auto-purge
application logs    hashed ref only    yes     30d          auto-purge
traces              doc ids + spans    yes     14d          auto-purge
metrics             no PII             n/a     13mo         —
redis cache         policy corpus only n/a     1h TTL       —
backups             full PII            no     bank policy  bank-owned
────────────────────────────────────────────────────────────────────
FINDING: extracted chunks are a SECOND COPY of consumer data with a
         retention rule we invented. Must align to the bank's schedule
         and join the deletion cascade.
```

**MENTAL TRACE.** Nine stores, and the finding at the bottom is the kind of thing this exercise exists to surface.

Read the *Masked* column: everything you built — logs, traces, metrics, cache — carries no consumer PII, because § 6.11 pushed redaction to the input boundary. That's four stores that would otherwise each be a compliance surface with their own retention question, access control, and place in a breach notification.

But **extracted chunks are a second copy of consumer financial data**, created by your ingestion pipeline, sitting in a table whose retention rule you invented.

That's not a bug. It's a **discovered obligation.** When a consumer exercises a deletion right, the bank's process deletes the loan file — and your chunks would survive it, silently, because nobody knew they existed.

**The fix is a cascade: chunk deletion is triggered by document deletion, and it's tested.** § 4.19's designed-for-deletion, made real.

**Do this audit before someone asks you for it.** Walking into a compliance review with a completed data-flow map — including a finding you surfaced yourself — is a completely different meeting from being asked to produce one.

`[RECEIPT]` **The data-flow audit with a discovered obligation and its remediation.** Almost nobody maps where data actually goes in their own system, and the finding is what makes it credible.

---
