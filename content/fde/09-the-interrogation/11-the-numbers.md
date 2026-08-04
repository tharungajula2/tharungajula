---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 11
title: "THE NUMBERS"
slug: "the-numbers"
sectionNumber: null
part: "PART III — THE NUMBERS"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 184
status: "raw"
section: ""
summary: ""
enriched: false
---

# PART III — THE NUMBERS

*Know these cold.*

**1 token ≈ 4 characters ≈ ¾ of a word.** 1,000 tokens ≈ 750 words.

**Non-English can cost 2–4× more tokens** for the same meaning. Code tokenises worse than prose.

**Expected Loss = PD × LGD × EAD.** The whole credit engine.

**Precision = TP/(TP+FP). Recall = TP/(TP+FN).** F1 is their harmonic mean.

**RRF(d) = Σ 1/(rank + k), k ≈ 60.** Rank 1 contributes 1/61.

**cos(A,B) = (A·B)/(|A|·|B|).** Direction, not magnitude.

**Retry backoff: 1s, 2s, 4s, 8s**, capped, times a random jitter factor. Cap attempts at 3–5, then fail loudly.

**Temperature: 0–0.2 extraction, 0.5–0.7 assistant, 0.8–1.2 creative.**

**Rerank depth: 20–50** candidates is the sweet spot.

**Judge calibration threshold: ~80% agreement** with human labels before you trust an aggregate.

**Multi-agent cost: 2–5× solo.** Debate: 5–15×.

**Golden set: 10–20 cases minimum**, and at n=15 treat a one-case difference as a tie.

**Status codes: 400/404 your bug · 401/403 config · 429 back off · 5xx back off.**

**p95 and p99, never the mean.** Means hide tails.

**Hop budget: 2–3** covers nearly all real multi-hop questions.

---
