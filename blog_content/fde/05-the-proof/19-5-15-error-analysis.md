---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 19
title: "Error analysis"
slug: "5-15-error-analysis"
sectionNumber: "5.15"
part: "PART III — THE LIFECYCLE"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 420
status: "raw"
section: "§5.15"
summary: ""
enriched: false
---

## § 5.15 — Error analysis

The most underrated skill in this document, and the highest-return half-day you will spend.

**Why it beats whack-a-mole.** Fixing failures individually is effort proportional to failures, and it misses the forest — you patch symptom after symptom while the underlying cause keeps generating new ones.

Error *analysis* is different: collect failures, **categorise by root cause**, and the distribution reveals that most of them share a few causes. Fix the dominant one and a large fraction vanishes at once.

### The protocol

**Collect ~20 real failures** — enough to see patterns, few enough to read every one.

**Read every one, with its trace.** No shortcuts. **The reading *is* the analysis.**

**Categorise by root cause, not symptom.** Not "wrong answer" but "retrieval missed the chunk," "query too vague," "qualifier severed by chunking."

**Count and rank.**

**Fix the dominant cause.**

**Re-measure.**

```
ERROR ANALYSIS — 20 failures, week 6
────────────────────────────────────────────────────────
root cause                              n    %
vague hop-1 query → wrong doc_type      8   40%   ← dominant
OCR quality (150 DPI branch scans)      5   25%
qualifier severed from figure           3   15%
refusal miscalibration (fabricated)     2   10%
reranker demoted the correct chunk      1    5%
genuinely ambiguous file                1    5%
────────────────────────────────────────────────────────
```

**MENTAL TRACE — and read what this table saves you from.**

Before doing this, your instinct was that the problem was *retrieval quality*, and you were about to spend a week tuning the reranker.

The reranker accounts for **one failure out of twenty.**

Forty percent share one cause: hop-1 queries too vague to reach third-party documents — the same thing the trace in § 5.10 showed and the same thing the tool-use scorecard in § 5.6 flagged as the weakest dimension. **Three independent instruments pointing at one fix.**

That fix — better parameter descriptions, a few-shot example of good queries, and the `is_third_party` trajectory assertion — is roughly a day of work and addresses 40% of failures.

The 25% from OCR is a *conversation*, not a code change: someone at Meridian needs to be told a branch changed scanners. **Some of your highest-value findings aren't fixes you make, they're facts you surface**, and an FDE is often the only person positioned to notice them at all.

**The cause-distribution is your prioritised roadmap.** Data-driven prioritisation, not vibes.

`[RECEIPT]` **A 20-failure error analysis with the distribution, the dominant-cause fix, and the before-and-after measurement.** This is a methodology artifact, it's rare, and it demonstrates the thing hiring managers are actually screening for: that you improve systems by evidence rather than by instinct.

---
