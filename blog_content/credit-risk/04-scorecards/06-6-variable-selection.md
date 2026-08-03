---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 6
title: "VARIABLE SELECTION"
slug: "6-variable-selection"
sectionNumber: "6"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: true
wordCount: 554
status: "raw"
section: "§6"
summary: ""
enriched: false
---

# §6 · VARIABLE SELECTION

## 6.1 The sequence

1. **Screen on IV.** Drop anything below roughly 0.02. This is a coarse filter, not a decision.
2. **Check correlation.** Where two characteristics are highly correlated, keep the one that is more stable, more interpretable, and less dependent on a third party — not simply the one with higher IV.
3. **Check variance inflation.** Multicollinearity destabilises coefficients, which matters enormously here because the coefficients become the points table.
4. **Apply business logic.** Every surviving variable must have a defensible causal story about why it relates to repayment. "It came out significant" is not a reason, and it is precisely the kind of variable that fails out of time.
5. **Check availability at the decision point.** A variable that is not reliably populated at the moment of scoring is unusable regardless of its IV. This is where a surprising number of promising variables die.
6. **Check stability.** Compute CSI (Document 03 §8.3) for each candidate between the development and out-of-time windows. **A powerful but unstable variable is worse than a weaker stable one**, because you will be applying it to a population it was not measured on.

## 6.2 Fairness and proxies 

The June 2026 draft guidance makes **bias and fairness testing explicit**: entities must proactively identify risks of discriminatory output, particularly unfair treatment of customer groups in credit decisions, run fairness assessments, and recalibrate or redesign where problems are found.

The practical content for a scorecard builder:

- **Excluding a protected attribute does not exclude its effect.** Pincode, occupation category, and institution-of-education fields can act as proxies for religion, caste, gender or region, and a model that never sees the attribute can still discriminate on it.
- **The test is on outcomes, not on inputs.** Run the model, then compare approval rates and score distributions across groups. A model with no protected attribute in it can still produce a disparate outcome, and only an outcome test will find it.
- **The counterfactual check** — hold financial characteristics constant, vary the demographic attribute, and observe whether the score moves — is the cleanest single diagnostic, and it is worth knowing by name.

⚠️ Note the distinction that matters legally and practically: a disparity in outcome and a disparity caused by the model are different things, and the *fix* depends entirely on which you have. But the obligation to look does not depend on the cause.

## 6.3 How many variables

A typical Indian retail application scorecard ends with **10 to 20 characteristics**. Beyond that, marginal IV contribution flattens, correlation problems multiply, the points table stops being readable, and each additional variable is another thing that can drift.

**► SAY THIS**
> "I'd screen on information value but I wouldn't select on it. The three filters that actually decide are business logic — every variable needs a defensible story about why it relates to repayment — availability at the decision point, which kills more good variables than anything else, and stability, because a powerful variable that drifts is worse than a weaker one that doesn't. And I'd run fairness testing on outcomes rather than inputs, because excluding a protected attribute doesn't exclude its effect when pincode and occupation can proxy for it. The June 2026 draft guidance makes that an explicit expectation rather than good practice."

---
