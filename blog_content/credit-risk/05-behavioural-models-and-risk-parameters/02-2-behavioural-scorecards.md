---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "05"
volumeSlug: "behavioural-models-and-risk-parameters"
volumeTitle: "BEHAVIOURAL MODELS AND RISK PARAMETERS"
order: 2
title: "BEHAVIOURAL SCORECARDS"
slug: "2-behavioural-scorecards"
sectionNumber: "2"
part: null
kind: "narrative"
sourceFile: "CR_05_BEHAVIOURAL_MODELS_AND_RISK_PARAMETERS.md"
tags: []
hasSayThis: true
wordCount: 846
status: "raw"
section: "§2"
summary: ""
enriched: false
---

# §2 · BEHAVIOURAL SCORECARDS

## 2.1 The design decisions

The same four as Document 04 §2, but two of them change shape.

**The observation point** is no longer origination. It is a chosen point in the account's life — typically a month-end — at which you snapshot everything known about it.

**The observation window** is the period *before* the observation point over which behavioural variables are computed. Conventionally **6 or 12 months**. This is new; an application model has no such window because there is no prior behaviour.

**The outcome window** is the period *after* the observation point over which the target is measured. Typically **12 months**, shorter than for an application model because a live account's risk horizon is shorter and its data refreshes continuously.

**The target** is usually ever-90+ within the outcome window, as before. But note the subtlety: accounts that are *already* delinquent at the observation point need separate treatment — either excluded, or modelled separately, because predicting default for an account already at 60 DPD is a different problem with a different base rate.

🧮 **The timeline, which is worth being able to draw:** an account originated in January 2024, observed at 31 December 2024, with behavioural variables computed over January–December 2024 and outcome measured over January–December 2025. To build such a model today you need accounts originated by end-2023 — so a behavioural model, like an application model, is fitted on history. The difference is that it is **re-scorable every month** on the current book, which an application model is not.

## 2.2 The variables that actually earn their place

In rough order of power:

**1. Delinquency history within the observation window.** Maximum DPD, number of times 30+, DPD in the most recent month, and the *trend*. The single strongest family.

**2. Mandate bounce history.** Document 02 §7.4 established the bounce as the earliest signal in the lifecycle. As a behavioural variable it is powerful and, importantly, **available even for accounts that never went delinquent** — a borrower whose NACH failed and who then paid manually is not delinquent but is different.

**3. Utilisation, for revolving lines.** Level, and more importantly **drift**. A card at 40% utilisation for a year and a card that has gone from 15% to 40% over three months are entirely different risks, and only the second is a warning.

**4. Payment behaviour on revolving lines.** Minimum-due payers versus full payers — which, from Document 03's opening, is now also the **transactor/revolver** distinction that determines a capital charge from 1 April 2027.

**5. Refreshed bureau attributes.** New trades opened elsewhere, enquiry velocity, delinquency on other lenders' facilities. Document 01 §7.2 and Document 03 §8.4: this data now refreshes four times a month rather than twice, which materially sharpens every velocity attribute — and changes their meaning against any model built before 1 July 2026.

**6. Account age and seasoning.** Which is really a control rather than a predictor.

✅ **The pattern worth internalising: the strongest behavioural variables are almost all about *change*, not *level*.** Utilisation drift beats utilisation. DPD trend beats maximum DPD. New-trade velocity beats trade count. This is because level is largely already captured at origination, whereas change is precisely the new information the account has generated since — and SICR, by definition, is a change concept.

## 2.3 The two traps specific to behavioural models

🔴 **Endogeneity — the model changes the behaviour it predicts.** If a good behavioural score triggers a limit increase, and a higher limit changes utilisation and spending, then next period's behavioural variables have been affected by the model's own prior output. The model is partly predicting the consequences of its own decisions. This is real, it is underappreciated, and the partial defences are to keep a small **randomised control group** exempted from score-driven actions, and to include the action itself as a variable so its effect can be estimated rather than absorbed.

🔴 **The self-selecting good book.** As a portfolio matures, good accounts prepay and leave — and Document 02 §6.5 noted that the pre-payment directions of January 2026 made leaving frictionless for floating-rate borrowers. So the surviving population adversely selects over time. A behavioural model calibrated on a book with one prepayment regime will drift when the regime changes, and the drift will look like credit deterioration when it is partly composition.

**► SAY THIS**
> "A behavioural model beats an application model on the same population because past repayment on the same obligation is the best available proxy for future repayment — but I'd be careful not to compare their Ginis, because the behavioural model is built on survivors with a lower base rate. The variables that carry it are almost all change rather than level: utilisation drift rather than utilisation, DPD trend rather than maximum DPD, new-trade velocity rather than trade count. And the trap I'd watch is endogeneity — if a good score triggers a limit increase and the limit changes utilisation, the model is partly predicting its own decisions, which is why I'd want a small randomised holdout exempt from score-driven action."

---
