---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "05"
volumeSlug: "behavioural-models-and-risk-parameters"
volumeTitle: "BEHAVIOURAL MODELS AND RISK PARAMETERS"
order: 8
title: "VALIDATING THE PARAMETERS"
slug: "8-validating-the-parameters"
sectionNumber: "8"
part: null
kind: "narrative"
sourceFile: "CR_05_BEHAVIOURAL_MODELS_AND_RISK_PARAMETERS.md"
tags: []
hasSayThis: false
wordCount: 375
status: "raw"
section: "§8"
summary: ""
enriched: false
---

# §8 · VALIDATING THE PARAMETERS

Document 04 §12 validated a scorecard's ranking. Parameters need different tests, because a parameter is a *level* claim, not a ranking claim.

## 8.1 PD backtesting

**The test:** within each rating grade or score band, compare predicted PD against realised default rate over the outcome period.

**The instrument:** a binomial test per grade, asking whether the realised count is consistent with the predicted probability given the number of accounts. Supplemented by the calibration tests of Document 04 §10.2 — and remember the direction: **a high Hosmer–Lemeshow p-value means the model passes.**

⚠️ **The power problem, which you should volunteer.** In a grade with a predicted PD of 0.4% and 2,000 accounts, the expected default count is eight. The binomial test has almost no power to distinguish 0.4% from 0.6% at that sample size. **PD backtesting in high-quality grades is statistically weak, and a "pass" there means very little.** Multi-period tests that accumulate evidence across years are the standard partial remedy.

## 8.2 LGD and EAD backtesting

Harder, for reasons §5.5 established. Realised LGD is observable only on completed workouts, and there are few of them. Realised CCF only on accounts that actually defaulted, and only where the undrawn denominator was meaningful.

✅ **So the validation discipline shifts from statistical testing to three other things**, and naming them is a better answer than pretending the tests are strong:

1. **Benchmarking** against external data and peer disclosures.
2. **Sensitivity analysis** — how much does the reported ECL move if LGD is 5 points higher? If it moves a lot and the LGD evidence is thin, that is a disclosure-worthy uncertainty rather than a number to state flatly.
3. **Qualitative override with documented rationale**, which is what the model governance regime of Document 04's opening exists to control.

## 8.3 The governance wrapper 

Both the ECL Directions and the June 2026 draft model risk guidance require a model inventory, risk-based tiering, independent validation and board oversight. **Parameter models are squarely in scope, and they are typically tiered high** — because they feed the audited accounts and the capital computation directly. A behavioural scorecard used only for limit-setting might sit at a lower tier; the same model used for SICR does not.

---
