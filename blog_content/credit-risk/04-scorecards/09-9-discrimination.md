---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 9
title: "DISCRIMINATION"
slug: "9-discrimination"
sectionNumber: "9"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 434
status: "raw"
section: "§9"
summary: ""
enriched: false
---

# §9 · DISCRIMINATION

Does the model separate goods from bads?

## 9.1 The measures

📘 **KS — Kolmogorov–Smirnov statistic.** The maximum vertical distance between the cumulative distribution of goods and the cumulative distribution of bads across the score range. Ranges 0 to 1, usually quoted as a percentage.

Its virtue is interpretability: **KS tells you the single score at which separation is greatest**, which is operationally useful because it is a candidate cut-off region. Its weakness is that it is a **single-point** statistic — it describes one place on the curve and ignores the rest.

📘 **AUC and Gini.** AUC is the area under the ROC curve, equivalently the probability that a randomly chosen bad scores worse than a randomly chosen good. Gini is the linear rescaling:

> **Gini = 2 × AUC − 1**

So AUC 0.5 (no discrimination) is Gini 0; AUC 0.75 is Gini 0.50. **Gini uses the whole curve**, which is why it is the primary reporting measure in most credit shops, with KS quoted alongside.

📘 **Divergence.** The separation between the score distributions of goods and bads, scaled by their variances. Less common in reporting, but sensitive to differences in distribution *shape* that Gini can miss.

## 9.2 What good looks like

Practitioner ranges for an Indian retail **application** scorecard, measured **out of time** — and these are rules of thumb, not standards:

| Gini (OOT) | Reading |
|:--|:--|
| Below 0.30 | Weak — investigate before deploying |
| 0.30 – 0.40 | Acceptable, common in thin-file unsecured |
| 0.40 – 0.55 | Good |
| Above 0.55 | Strong — and worth checking for leakage |

⚠️ **Three things that make cross-model Gini comparison nearly meaningless, and you should say so whenever a number is quoted at you:**

1. **The bad definition.** A 30+ definition and a 90+ definition on the same portfolio give different Ginis.
2. **The population.** A model applied to through-the-door applicants and one applied to a pre-screened population are measured on different variances. **A tighter existing cut-off mechanically lowers measurable Gini**, because you have already removed the easy cases.
3. **Indeterminate treatment.** §2.1 — excluding indeterminates raises apparent discrimination.

🔴 So the useful question is never "is 0.42 good?" It is **"is 0.42 better than what we had, on the same definition, on the same population, out of time?"**

## 9.3 Gini decay

A model's Gini falls over time as the population drifts away from the development sample. **Tracking Gini decay against PSI and CSI is how you decide between recalibration and redevelopment**, and §12 works through that decision.

---
