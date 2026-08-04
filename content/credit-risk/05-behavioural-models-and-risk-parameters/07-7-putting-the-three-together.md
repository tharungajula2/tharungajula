---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "05"
volumeSlug: "behavioural-models-and-risk-parameters"
volumeTitle: "BEHAVIOURAL MODELS AND RISK PARAMETERS"
order: 7
title: "PUTTING THE THREE TOGETHER"
slug: "7-putting-the-three-together"
sectionNumber: "7"
part: null
kind: "narrative"
sourceFile: "CR_05_BEHAVIOURAL_MODELS_AND_RISK_PARAMETERS.md"
tags: []
hasSayThis: false
wordCount: 354
status: "raw"
section: "§7"
summary: ""
enriched: false
---

# §7 · PUTTING THE THREE TOGETHER

## 7.1 The identity, and what it is not

> **Expected Loss = PD × LGD × EAD**

This is the Basel formulation: a single-period, through-the-cycle, regulatory quantity.

**ECL under IFRS 9 and the 2026 Directions is a different object built from the same three parts:**

| | Basel EL | IFRS 9 / ECL |
|:--|:--|:--|
| PD | Through-the-cycle | **Point-in-time**, forward-looking |
| Horizon | 12 months | **12 months (Stage 1) or lifetime (Stages 2 and 3)** |
| LGD | Downturn | Expected, unbiased |
| Discounting | None | **Discounted at the effective interest rate** |
| Scenarios | Single | **Probability-weighted across multiple macro scenarios** |
| Floors | — | **Product-wise prudential floors** |

🔴 **So "we already compute PD, LGD and EAD for Basel, so ECL is a small extension" is wrong in five distinct ways**, and being able to enumerate them is a clean demonstration of understanding both frameworks. The three parameters are inputs to both; almost nothing else is shared.

## 7.2 The three numbers that must reconcile

At any reporting date, a bank running the full apparatus produces three different loss figures on the same book:

1. **The IRAC provision** — rule-based, from Document 02 §11.1's ladder.
2. **The ECL** — modelled, forward-looking, subject to prudential floors.
3. **The Basel expected loss** — through-the-cycle, for capital.

**These will not be equal, and they are not supposed to be.** What matters is being able to explain the differences, and the explanation is almost always some combination of: horizon (12-month against lifetime), PIT against TTC, discounting, scenario weighting, and where the floors bind.

⚠️ **The floor is the one that surprises people.** In a high-quality, low-PD segment, a modelled Stage 1 ECL can come out *below* the prudential floor — so the reported provision is the floor, and the model's output never touches the accounts. **In your best segments, the model may be decorative.** That is a deliberate regulatory design choice, and understanding it stops you from over-investing modelling effort where it cannot change the answer.

---
