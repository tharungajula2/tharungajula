---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "05"
volumeSlug: "behavioural-models-and-risk-parameters"
volumeTitle: "BEHAVIOURAL MODELS AND RISK PARAMETERS"
order: 3
title: "COLLECTION SCORECARDS"
slug: "3-collection-scorecards"
sectionNumber: "3"
part: null
kind: "narrative"
sourceFile: "CR_05_BEHAVIOURAL_MODELS_AND_RISK_PARAMETERS.md"
tags: []
hasSayThis: false
wordCount: 454
status: "raw"
section: "§3"
summary: ""
enriched: false
---

# §3 · COLLECTION SCORECARDS

## 3.1 A different problem entirely

Document 02 §10.2 and Document 03 §4.2 established the economics: cure probability collapses from around 55% in the 1–30 bucket to 15% at 31–60 to 8% at 61–90, while cost per account pursued rises. Collections capacity is a hard constraint.

So the collection model's job is **not** to predict default. Most delinquent accounts will resolve one way or another regardless of what the model says. Its job is **allocation**: which accounts get which treatment, given that you cannot give every account every treatment.

📘 **The target is cure, not default** — the probability that an account in bucket *n* returns to current within a defined window. This is the mirror image of the application model's target, and getting the sign right is a surprisingly common stumble.

## 3.2 The distinction that separates a good collections model from a mediocre one

🔴 **Propensity is not the same as treatability, and optimising for the first wastes the budget.**

A model that ranks accounts by probability of cure will put at the top the accounts most likely to cure — which are disproportionately the accounts that would have cured **anyway**, without a call. Working those accounts produces excellent measured performance and close to zero incremental recovery.

What you actually want is the accounts where the **treatment changes the outcome** — the difference between cure-with-contact and cure-without-contact. That is an **uplift** or **incremental response** framing, and it requires something a pure propensity model does not: **variation in treatment**, ideally randomised, so the counterfactual is observable.

✅ **The practical consequence, and a strong answer to "how would you improve a collections operation":** hold out a small random sample from contact in each bucket. It feels like giving up recovery. It is the only way to know what your collections effort is actually buying, and without it you cannot distinguish a productive team from a team working the easy accounts.

## 3.3 The other outputs

Beyond allocation, a collections analytics function should produce:

- **Best time and channel to contact**, by segment.
- **Promise-to-pay kept rate** by agent, by segment — a direct measure of contact quality rather than contact volume.
- **Settlement versus pursuit** economics, feeding LGD — §5.
- **Roll-rate forecasts** by bucket for capacity planning, straight from Document 03 §4.

⚠️ And everything here operates inside the conduct constraints of Document 02 §10.4 — the Responsible Business Conduct Directions, 2025, and the draft Second Amendment on recovery agents whose finalisation remains unconfirmed. **A model that optimises contact intensity without a constraint on contact conduct is a compliance incident waiting to happen**, and the draft's proposed call-recording and agent-disclosure requirements make that more true, not less.

---
