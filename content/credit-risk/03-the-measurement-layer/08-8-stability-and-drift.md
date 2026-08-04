---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "03"
volumeSlug: "the-measurement-layer"
volumeTitle: "THE MEASUREMENT LAYER"
order: 8
title: "STABILITY AND DRIFT"
slug: "8-stability-and-drift"
sectionNumber: "8"
part: null
kind: "narrative"
sourceFile: "CR_03_THE_MEASUREMENT_LAYER.md"
tags: []
hasSayThis: false
wordCount: 721
status: "raw"
section: "§8"
summary: ""
enriched: false
---

# §8 · STABILITY AND DRIFT

Everything so far measures the portfolio. This section measures whether your *measurement* is still valid — and it is the section where Document 01's warning about 1 July 2026 becomes an actual piece of work.

## 8.1 The problem

Document 02 §12 established the defining constraint: the target variable for every model is generated twelve to eighteen months downstream of the decision being modelled. So you cannot detect model failure through performance, because by the time performance proves the model has broken you have written a year of business on it.

**Stability monitoring is the substitute.** It does not ask "is the model still accurate?" It asks the answerable question: **"is the model still being applied to the population it was built on?"** If the population has moved, the model's accuracy is unverified regardless of what its last validation said.

## 8.2 PSI — Population Stability Index

📘 The standard measure of how far a distribution has moved from a reference. For bands *i*, with *A* the actual proportion and *E* the expected (development-sample) proportion:

> **PSI = Σ (Aᵢ − Eᵢ) × ln(Aᵢ / Eᵢ)**

Conventional reading, and these are rules of thumb rather than law:

| PSI | Interpretation |
|:--|:--|
| Below 0.10 | Stable — no action |
| 0.10 to 0.25 | Moderate shift — investigate |
| Above 0.25 | Significant shift — the model needs review |

🧮 **Worked, one band.** A score band held 20% of the development sample and now holds 28% of applicants. Its contribution is (0.28 − 0.20) × ln(0.28/0.20) = 0.08 × ln(1.40) = 0.08 × 0.3365 = **0.0269**. Sum across all bands for the PSI. A handful of bands moving like that will breach 0.10 easily.

## 8.3 CSI — Characteristic Stability Index

The same computation applied to an **individual input variable** rather than to the score.

🔴 **The distinction that matters, and it is one of the most reliably asked things in this whole document.** **PSI tells you *that* the population moved. CSI tells you *which variable* moved it.**

And the more important half: **PSI can be stable while CSI is not.** Two variables can shift in opposite directions and cancel out in the score distribution, leaving PSI quiet while the underlying population has changed materially. A monitoring pack that reports PSI alone will miss this entirely.

✅ So: **always run CSI alongside PSI, never PSI on its own.** If PSI is fine and you have not checked CSI, you have not checked stability.

## 8.4 The 1 July 2026 artefact

Now the specific, dateable problem this set has flagged twice and can now state precisely.

From **1 July 2026**, credit institutions report to the bureaus on four reference dates a month — the 9th, 16th, 23rd and last day — instead of two (Document 01 §7.2, Document 02 §9.4).

Consider a bureau attribute like *number of trades opened in the last 30 days*, or *enquiries in the last 90 days*. Under fortnightly reporting a new trade could take up to a fortnight to appear. Under the new cadence it appears within days. **The same borrower, with the same behaviour, now produces a different value of the same variable.**

Consequences, in order:

1. **CSI on every velocity-based bureau attribute will move** in the second half of 2026 — not because borrowers changed, but because the observation window changed.
2. **PSI may move too**, if those attributes carry weight in the score.
3. **Delinquency will appear to worsen slightly and cure to accelerate**, because both are simply observed sooner.
4. **A model built on pre-July-2026 data is using variables whose definition has silently changed** between development and application.

⚠️ **The diagnosis this prevents.** A risk team that sees CSI breach in Q3 2026 and concludes "the applicant population has deteriorated" will tighten cut-offs against a data artefact — rejecting good business and booking the cost as prudence. **The correct response is to re-baseline the affected attributes against post-July data and re-validate, not to move the cut-off.**

🔴 This is, in my view, the single most valuable thing you can carry out of this document into an interview: a **specific, dated, current, non-obvious model-monitoring risk in the Indian market**, with a named cause and a named correct response. Almost nobody volunteers it.

---
