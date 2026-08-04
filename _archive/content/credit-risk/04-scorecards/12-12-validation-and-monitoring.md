---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 12
title: "VALIDATION AND MONITORING"
slug: "12-validation-and-monitoring"
sectionNumber: "12"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 464
status: "raw"
section: "§12"
summary: ""
enriched: false
---

# §12 · VALIDATION AND MONITORING

## 12.1 The monitoring pack for a live scorecard

Building on Document 03 §9:

| Frequency | What | Detects |
|:--|:--|:--|
| **Monthly** | PSI on the score distribution | Has the population moved? |
| **Monthly** | CSI on each characteristic | Which variable moved it? |
| **Monthly** | Score distribution against the development sample; approval rate by band | Drift and cut-off creep |
| **Quarterly** | Bad rate by score band on matured cohorts | Is rank-ordering intact? |
| **Quarterly** | Gini and KS on the newest matured cohort | Decay |
| **Annually** | Full independent validation, calibration testing, fairness assessment | Everything |

🔴 **The rank-ordering check is the one to lead with.** If bad rates are not monotone across score bands on a matured cohort, the model has broken in a way that no aggregate statistic will show you clearly. A Gini can stay respectable while two adjacent bands invert — and an inversion at the cut-off band is the most expensive failure mode there is, because it is precisely where decisions concentrate.

## 12.2 Recalibrate or redevelop?

The decision that comes up constantly, and there is a clean way to reason about it.

📘 **Recalibration** adjusts the mapping from score to probability, leaving the ranking untouched. Cheap, fast, and correct when the model still ranks but the level has shifted — typically because the base bad rate moved with the cycle.

📘 **Redevelopment** rebuilds the model. Expensive, slow, and necessary when the ranking itself has degraded.

✅ **The diagnostic, and it echoes Document 03 §3.3's level-versus-shape distinction exactly:**

- **Rank-ordering intact, predicted level wrong** → a **level** error → **recalibrate.**
- **Rank-ordering degraded, bands inverting, Gini decayed materially** → a **shape** error → **redevelop.**

⚠️ **And the failure mode to name:** recalibrating a model whose *shape* has broken will make the aggregate numbers look right for a while, because you have fixed the average. Every individual decision remains wrong, and the problem compounds silently until the next validation. **Recalibration applied to a shape problem is not a fix, it is concealment.**

## 12.3 The 2026 monitoring artefact, once more

Document 03 §8.4, now stated in scorecard terms: from **1 July 2026** bureau reporting moved to four reference dates a month. Any velocity-based bureau characteristic in your scorecard — trades opened in the last 30 days, enquiries in the last 90 days — now takes a different value for the same borrower behaviour.

**Expect CSI to breach on those characteristics in the second half of 2026.** The correct response is to re-baseline the affected characteristics against post-July data and re-validate. **The incorrect response is to tighten the cut-off**, which rejects good business and books the cost as prudence.

---
