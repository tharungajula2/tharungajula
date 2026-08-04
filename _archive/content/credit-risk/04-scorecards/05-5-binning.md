---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 5
title: "BINNING"
slug: "5-binning"
sectionNumber: "5"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 370
status: "raw"
section: "§5"
summary: ""
enriched: false
---

# §5 · BINNING

Also called coarse classing. Unglamorous, and it determines more of the final model's quality than the algorithm does.

## 5.1 The procedure

**Fine classing** first — split the characteristic into many small bins, typically by decile or by natural category. Then **coarse classing** — merge adjacent bins until four constraints are satisfied simultaneously:

1. **Minimum bin size**, conventionally at least **5% of the sample** in every bin.
2. **Sufficient bads per bin** — a bin with three bads gives a WoE built on noise.
3. **Monotonicity** across ordered characteristics, where the business logic implies it.
4. **Business sense** — bin boundaries should be explicable, and ideally should align with how the business already thinks about the variable.

## 5.2 On monotonicity

📘 **The rule: enforce monotonicity where theory demands it, and investigate where the data refuses.**

If bad rate rises with income across every band except one, that exception is either a sample-size artefact or a real finding — a self-employed cluster inside a salaried band, a product mix effect, a data quality problem in one segment. **Look before you smooth.** Non-monotonicity is one of the more reliable ways that a genuine data issue announces itself, and forcing the bins flat destroys the signal that something is wrong.

But where the exception is noise, enforce the monotone shape. A non-monotone scorecard is very hard to defend in a credit committee, impossible to explain to a declined applicant, and prone to instability out of time — because the wobble you fitted was noise and noise does not replicate.

## 5.3 The two failure modes

🔴 **Too many bins.** Fits noise, produces unstable WoE, degrades out of time, and makes the points table unreadable.

🔴 **Too few bins.** Discards genuine signal, particularly at the tails — and the tails are where the decisions are. Collapsing "below 650" and "650–700" in the §4.2 table would merge a 15% bad rate with a 7% one and throw away most of the variable's discriminating power.

✅ **The test:** does each bin have a materially different bad rate from its neighbours, and does the pattern survive in the out-of-time sample? If a bin boundary does not replicate OOT, it was noise.

---
