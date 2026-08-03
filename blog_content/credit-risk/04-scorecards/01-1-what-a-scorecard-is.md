---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 1
title: "WHAT A SCORECARD IS"
slug: "1-what-a-scorecard-is"
sectionNumber: "1"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 589
status: "raw"
section: "§1"
summary: ""
enriched: false
---

# §1 · WHAT A SCORECARD IS

## 1.1 The definition

📘 **Scorecard.** A model that assigns a numeric score to a borrower such that the score **rank-orders** them by probability of default. Higher score, lower risk — or the reverse, depending on convention, which is why the convention must always be stated.

Three things it is *not*:

**It is not a decision.** It produces a ranking. A cut-off applied to that ranking produces a decision. §11.

**It is not a probability, until it is calibrated.** Discrimination — can it tell the risky from the safe? — and calibration — does a predicted 3% actually default 3% of the time? — are different properties, and a model can have one without the other. §10.

**It is not the whole underwriting decision.** Document 02 §5.1: policy rules, bureau history, affordability, and *then* the scorecard for residual risk. Letting a good score override a policy rule delegates risk appetite to a model.

## 1.2 The three scorecards

| Type | Built when | Uses | Answers |
|:--|:--|:--|:--|
| **Application** | At origination | Application data, bureau, demographics | Should we lend to this applicant? |
| **Behavioural** | On the live book | Repayment history, utilisation, bounce, refreshed bureau | Has this account's risk changed? |
| **Collection** | On delinquent accounts | Delinquency history, contact and promise outcomes | Which accounts get which treatment? |

These map exactly onto Document 02's lifecycle: application to Stage 4, behavioural to Stage 8, collection to Stage 9. **This document builds the first.** Document 05 builds the second and third.

## 1.3 Why logistic regression on weight-of-evidence, still

The dominant Indian retail scorecard is a logistic regression on WoE-transformed, coarse-classed variables, rendered as an additive points table. This is not because nobody has heard of gradient boosting. Five reasons, in the order they actually bind:

1. **Explainability.** Every point a borrower scores traces to a stated characteristic and a stated band. Adverse-action reasons fall out of the structure. And as of June 2026 this is a regulatory principle with a stated cost attached to the alternative.
2. **The points table is auditable and portable.** A credit officer, an auditor and a regulator can read it. It ships to a loan origination system as a lookup, not as an inference service.
3. **Stability.** Coarse classing makes the model insensitive to outliers and to small distributional wobbles — which matters more than a couple of Gini points when your population drifts, as Document 03 §8 established it will.
4. **Missing data is handled natively.** Missing becomes a bin with its own WoE. In Indian retail, where thin files and absent bureau records are routine, this is not a minor convenience.
5. **The uplift is often smaller than expected.** On tabular data with 15–20 well-binned bureau and application variables, the gap between a well-built WoE logistic model and a tuned tree ensemble is real but usually modest — commonly a few Gini points — and it shrinks further out of time.

⚠️ **The honest counter-position, which you should be able to state.** Where the data is genuinely high-dimensional — device telemetry, transaction-level cash flow from Account Aggregator feeds, alternative data — trees and ensembles win by more than a few points, and the interpretability argument weakens because nobody can read a 200-variable logistic model either. The defensible position is *stratified*: interpretable models for the primary credit decision, machine-learning models for fraud, for early warning and for treatment allocation, where the regulatory adverse-action burden is lighter.

---
