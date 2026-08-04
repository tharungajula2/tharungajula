---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 11
title: "THE CUT-OFF"
slug: "11-the-cut-off"
sectionNumber: "11"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 498
status: "raw"
section: "§11"
summary: ""
enriched: false
---

# §11 · THE CUT-OFF

The decision the entire apparatus exists to support — and, as the opening of this document insisted, not a modelling output.

## 11.1 What the cut-off actually trades

At each candidate score, four quantities:

- **Approval rate** — volume.
- **Expected bad rate** of the approved population.
- **Expected loss**, via PD × LGD × EAD (Document 03 §6).
- **Expected revenue** — yield on the approved book.

The economically correct cut-off is where the **marginal** loan's expected return equals its expected loss plus its cost of capital and servicing. Not the average loan's. The marginal one.

🧮 **The marginal logic, which is the part usually skipped.** At a candidate cut-off, the relevant question is about the *next* band of applicants you would let in, not about the book as a whole. If the next band down has a 9% expected bad rate against a portfolio yield of 18% and an LGD of 80%, its expected loss is roughly 9% × 80% = 7.2% against 18% of revenue — which, before servicing costs, cost of funds and cost of capital, still looks viable. Push one band further and the arithmetic reverses. **The cut-off is the point where that comparison turns, and it moves whenever pricing, funding costs or LGD move — none of which are modelling variables.**

## 11.2 Swap set analysis

📘 The technique for comparing a new scorecard against the incumbent, and the one that actually persuades a credit committee.

Hold the approval rate constant. Then classify every applicant by what the two models do:

| | Old approves | Old declines |
|:--|:--|:--|
| **New approves** | Both approve | **Swap-in** |
| **New declines** | **Swap-out** | Both decline |

The two diagonal cells are irrelevant to the comparison — both models agree. **The entire value of the new model sits in the two swap sets**, and the question is simple: is the observed bad rate of the swap-**out** group higher than that of the swap-**in** group?

If yes, the new model is declining worse business and approving better business at the same volume, and the gap between those two bad rates is the model's value expressed in the only currency that matters.

✅ **This is the right answer to "how would you demonstrate a new scorecard is better?"** Not "the Gini improved from 0.38 to 0.44." Gini is a property of the model; the swap set is a statement about the business, and it converts directly into rupees of avoided loss and rupees of captured revenue.

## 11.3 The other levers

A cut-off is not the only response to a score. Mature shops also use **score bands** to set price, limit, tenor, documentation requirements and referral routing. A borderline applicant does not have to be a binary — they can be approved at a lower limit, a higher price, or with additional verification. **The single-cut-off model is the simplest use of a scorecard, not the best one.**

---
