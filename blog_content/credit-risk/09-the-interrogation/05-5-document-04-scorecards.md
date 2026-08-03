---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 5
title: "DOCUMENT 04 — SCORECARDS"
slug: "5-document-04-scorecards"
sectionNumber: "5"
part: null
kind: "interrogation"
sourceFile: "CR_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 1031
status: "raw"
section: "§5"
summary: ""
enriched: false
---

# §5 · DOCUMENT 04 — SCORECARDS

**What does a scorecard do, in one sentence?**
It ranks. The cut-off decides, and the cut-off is a statement of business appetite, not a modelling output.

**Name the four design decisions before any data.**
Bad definition, performance window, sample window, exclusions.

**How would you set the bad definition from evidence rather than convention?**
Build the roll-rate matrix and place it at the point of no return — where cure probability has collapsed and eventual default is largely determined.

**How do you set the performance window?**
To the product's maturity point off the vintage curves. For Indian unsecured retail, usually 12 to 18 months.

**Which exclusions matter most, and why?**
Confirmed fraud and first-payment defaults, because first-party fraud in the bad population teaches the model to predict something that isn't credit risk.

**Why is out-of-time the split that matters?**
Because a random holdout shares the training period's population, policy regime and economy — it detects overfitting and nothing else. OOT answers the question production actually asks.

**A large in-time to OOT gap means what?**
Population instability more than overfitting. Investigate with CSI rather than regularising harder.

**Write the WoE and IV formulas.**
WoE = ln(%Good / %Bad), using distribution shares not rates. IV contribution = (%Good − %Bad) × WoE, summed across bins.

**What's the sign-convention trap?**
With ln(%Good/%Bad), positive WoE means better than average. Many shops use ln(%Bad/%Good), which flips everything. Neither is wrong; not stating which is.

**IV thresholds.**
Below 0.02 drop, 0.02–0.10 weak, 0.10–0.30 medium, 0.30–0.50 strong, above 0.50 investigate.

**An IV of 0.87 on a bureau score. Leakage?**
No — a bureau score is itself a model trained on this outcome, so high IV is expected. But it creates single-variable dominance: your scorecard becomes a repackaging of the bureau's model, with its blind spots and none of its documentation.

**And it fails on which population?**
New-to-credit applicants, about 15% of retail originations, who have no bureau score. They need a separate scorecard on application and surrogate data, not an imputed score.

**Five reasons for WoE rather than raw values.**
Linearises against log-odds; missing becomes a bin with its own WoE; outliers absorbed by boundary bins; everything on one scale; monotonicity can be enforced.

**Your data refuses to be monotone. What do you do?**
Look before you smooth. Non-monotonicity is either a sample-size artefact or a real finding — a subpopulation hiding inside a band. Forcing it flat destroys the signal that something is wrong.

**Write the scaling formulas.**
Factor = PDO / ln 2. Offset = Base Score − (Factor × ln(Base Odds)). Score = Offset + Factor × ln(odds).

**Base score 600 at 30:1, PDO 20. Compute.**
Factor = 20 / 0.6931 = **28.85**. Offset = 600 − (28.85 × 3.4012) = **501.87**.

**Does scaling change model quality?**
No. It's arithmetic. A Gini of 0.42 is 0.42 on any scale.

**Why does reject inference exist?**
You only observe outcomes for accounts you approved, and that censoring was produced by your own prior rule — so the relationship is fitted over a compressed risk range and extrapolated below the cut-off, which is exactly where the marginal decisions are.

**Which method is strongest in India, and what's its limitation?**
Bureau performance on rejects who borrowed elsewhere, because it's observed outcome rather than inference. Its limitation is selection — they're the ones somebody else was willing to serve.

**What's the honest position on reject inference?**
No method creates information that doesn't exist. The only real solution is a small randomised approval below cut-off, which costs money by design, and almost nobody does it.

**KS versus Gini.**
KS is the maximum separation between the cumulative distributions — interpretable, single-point. Gini uses the whole curve. Gini = 2 × AUC − 1.

**Why is cross-model Gini comparison nearly meaningless?**
Different bad definitions, different populations — a tighter existing cut-off mechanically lowers measurable Gini — and different treatment of indeterminates.

**Discrimination versus calibration.**
Discrimination is whether the model ranks. Calibration is whether the predicted probabilities are right. Add ten points to every prediction and ranking is untouched while every probability is wrong.

**Which do you need for what?**
Ranking for a cut-off. Calibration for pricing, provisioning and capital, where the number itself enters an arithmetic.

**Hosmer–Lemeshow — which direction is a pass?**
**A high p-value is a pass.** The null is that predicted and observed agree; you're hoping to fail to reject it. A p-value near zero is a failure.

**Two caveats on that test.**
It's sensitive to sample size — on a very large sample almost anything fails — and to the number of groups chosen.

**PIT versus TTC.**
Point-in-time moves with the cycle and is what ECL needs. Through-the-cycle is averaged and is what capital conventionally uses so requirements don't swing procyclically.

**What should you notice if a firm's ECL PD and capital PD are identical?**
Something is wrong. Either no macro overlay is being applied to ECL, or a PIT estimate is being used as TTC.

**How do you prove a new scorecard is better?**
A swap set. Hold approval rate constant, look only where the two models disagree, and compare the bad rate of the swap-out group against the swap-in group. Gini is a property of the model; the swap set is a statement about the business.

**Recalibrate or redevelop?**
Rank-ordering intact but level wrong — a level error — recalibrate. Rank-ordering degraded, bands inverting — a shape error — redevelop.

**And the failure mode?**
Recalibrating a shape error fixes the average and leaves every individual decision wrong. That's concealment, not a fix.

**Which monitoring check do you lead with?**
Bad rate by score band on a matured cohort. If it isn't monotone the model has broken, and a Gini can stay respectable while two adjacent bands invert.

**What changed for model governance in June 2026?**
The RBI released draft Guidance on Regulatory Principles for Model Risk Management on 24 June 2026, comments closed 24 July. Board-approved framework, risk-based tiering, full inventory, three lines of defence, explicit bias and fairness testing — and where a model can't explain itself, compensating controls: enhanced validation, output verification, frequent monitoring, usage restrictions. **Still draft.**

---
