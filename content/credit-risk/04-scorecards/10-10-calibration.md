---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 10
title: "CALIBRATION"
slug: "10-calibration"
sectionNumber: "10"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 438
status: "raw"
section: "§10"
summary: ""
enriched: false
---

# §10 · CALIBRATION

Discrimination and calibration are different properties. This section contains the single most commonly fumbled fact in Indian credit risk interviews.

## 10.1 The distinction

📘 **Discrimination** — can the model rank? Does a worse applicant score worse?
📘 **Calibration** — are the predicted probabilities *right*? Of accounts predicted at 3%, do about 3% actually default?

**A model can rank perfectly and be badly calibrated.** Add 10 percentage points to every prediction: the ranking is untouched, Gini is unchanged, and every probability is wrong. Conversely a model can be well calibrated on average and rank poorly.

**Which one you need depends on the use.** For a **cut-off decision**, ranking is what matters — you are choosing where to cut an ordered list. For **pricing, provisioning and capital**, calibration is what matters, because the number itself enters an arithmetic that produces rupees. Under the ECL Directions of April 2026 (Document 03), a miscalibrated PD feeds directly into provisions.

## 10.2 The Hosmer–Lemeshow test, and the direction

The standard calibration test. Group observations into bands of predicted probability, compare predicted against observed defaults in each band, and compute a chi-square statistic.

🔴 **THE TRAP. A HIGH p-VALUE MEANS THE MODEL PASSES.**

The null hypothesis is that predicted and observed agree. You are **hoping to fail to reject the null.** So a p-value of 0.49 means good calibration; a p-value of 0.01 means the model is significantly miscalibrated and fails.

This inverts the direction of every other significance test people have encountered, and it is fumbled more often than any other single fact in this subject. **A p-value near zero is a failure, not a triumph.**

⚠️ Two caveats worth having ready: the test is **sensitive to sample size** — on a very large sample almost any model fails, because trivial deviations become significant — and it is **sensitive to the number of groups chosen**. Practitioners increasingly supplement it with calibration plots and with binomial tests per band rather than relying on it alone.

## 10.3 Point-in-time versus through-the-cycle

📘 **PIT** — a PD reflecting current conditions. Moves with the cycle. What **IFRS 9 and the ECL Directions** require, because ECL is a forward-looking estimate of what will actually happen.

📘 **TTC** — a PD averaged across a full cycle. Stable. What **Basel capital** conventionally uses, so that capital requirements do not swing procyclically.

🔴 **The consequence that surprises people: the same portfolio legitimately carries two different PDs for two different purposes**, and a candidate who treats "the PD" as a single number is signalling they have not worked with both frameworks. Document 06 handles the reconciliation.

---
