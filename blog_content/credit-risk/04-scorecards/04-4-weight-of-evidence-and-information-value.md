---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 4
title: "WEIGHT OF EVIDENCE AND INFORMATION VALUE"
slug: "4-weight-of-evidence-and-information-value"
sectionNumber: "4"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 872
status: "raw"
section: "§4"
summary: ""
enriched: false
---

# §4 · WEIGHT OF EVIDENCE AND INFORMATION VALUE

The core arithmetic of the discipline. Learn to reproduce this table on paper.

## 4.1 The definitions

For a bin *i* of some characteristic, with the sample split into goods and bads:

> **WoEᵢ = ln( %Goodᵢ / %Badᵢ )**

where %Goodᵢ is that bin's share of **all goods** in the sample, and %Badᵢ its share of **all bads**. Note carefully: these are **distribution shares, not rates.** Each column sums to 100%.

> **IVᵢ = ( %Goodᵢ − %Badᵢ ) × WoEᵢ**
> **IV = Σ IVᵢ**

🔴 **The sign-convention trap, and it catches people constantly.** With ln(%Good / %Bad), a **positive WoE means the bin is better than average** and the fitted coefficient is negative when modelling the probability of bad. Many shops use ln(%Bad / %Good), which flips every sign in the table and in the interpretation. **Neither is wrong. Not stating which you are using is.** If you are ever handed a WoE table with no stated convention, check the sign on the worst bin before you read anything else.

## 4.2 Worked — a full WoE and IV table

Sample of **100,000** accounts: **5,000 bad** (5.0%) and **95,000 good**. Characteristic: bureau score band.

| Band | Total | Bad | Good | Bad rate | % of bads | % of goods | WoE | IV contribution |
|:--|--:|--:|--:|--:|--:|--:|--:|--:|
| Below 650 | 15,000 | 2,250 | 12,750 | 15.00% | 45.00% | 13.42% | **−1.2098** | 0.3820 |
| 650–700 | 20,000 | 1,400 | 18,600 | 7.00% | 28.00% | 19.58% | **−0.3577** | 0.0301 |
| 700–750 | 30,000 | 900 | 29,100 | 3.00% | 18.00% | 30.63% | **+0.5317** | 0.0672 |
| 750–800 | 22,000 | 330 | 21,670 | 1.50% | 6.60% | 22.81% | **+1.2402** | 0.2010 |
| 800+ | 13,000 | 120 | 12,880 | 0.92% | 2.40% | 13.56% | **+1.7317** | 0.1933 |
| **Total** | **100,000** | **5,000** | **95,000** | **5.00%** | **100%** | **100%** | | **IV = 0.8736** |

Work one row so the mechanics are yours. For the 750–800 band: 330 bads out of 5,000 is 6.60% of bads; 21,670 goods out of 95,000 is 22.81% of goods. WoE = ln(22.81 / 6.60) = ln(3.456) = **+1.2402**. IV contribution = (0.2281 − 0.0660) × 1.2402 = 0.1621 × 1.2402 = **0.2010**.

## 4.3 Reading it

**The WoE column is monotone** — strictly increasing as the band improves. For an ordered characteristic this is what you want, and its absence is a finding, not a nuisance. §5.2.

**IV contribution is not proportional to bad rate.** The below-650 band contributes 0.3820 because it holds a large share of bads *and* a small share of goods — separation requires both. A bin that is terrible but tiny contributes almost nothing.

## 4.4 IV thresholds

| IV | Conventional reading |
|:--|:--|
| Below 0.02 | Not predictive — drop |
| 0.02 – 0.10 | Weak |
| 0.10 – 0.30 | Medium |
| 0.30 – 0.50 | Strong |
| Above 0.50 | Suspiciously strong — investigate |

⚠️ **The IV of 0.8736 above illustrates the last row, and the interpretation is the teaching point.** For a **raw application variable**, an IV near 0.9 would demand immediate investigation for **leakage** — a variable that encodes the outcome. Classic culprits: a field populated after the decision, a collections flag, a status code that only exists for accounts that went bad.

For a **bureau score**, an IV of this magnitude is entirely plausible, because a bureau score is itself the output of a model trained to predict exactly this outcome. That is not leakage; it is a legitimately powerful predictor.

🔴 **But it creates a different problem you must be ready to discuss: single-variable dominance.** If one characteristic carries most of the model's information, the scorecard is largely a repackaging of the bureau's model, with all of that model's blind spots, none of its documentation, and a dependency on a third party's methodology changing without notice. **It also collapses on the segment you most need to serve** — the roughly 15% of Indian retail originations that are new-to-credit and have no bureau score at all (Document 01, Document 03 §7.3).

✅ Which is why NTC applicants generally need a **separate scorecard built on application and surrogate data**, not an imputed bureau score. That is a segmentation decision (Document 03 §7), and it is the right answer to "how would you underwrite a borrower with no credit history?"

## 4.5 Why WoE rather than raw values

Five reasons, and they compound:

1. **It linearises the relationship** with the log-odds, which is exactly what logistic regression assumes. A characteristic with a U-shaped relationship to risk — age is the standard example — becomes usable without polynomial terms.
2. **Missing becomes a bin** with its own WoE, computed from its own actual behaviour. No imputation, no assumption.
3. **Outliers are absorbed** by the boundary bin.
4. **Everything lands on one scale**, so coefficient magnitudes are comparable.
5. **Monotonicity can be enforced**, which is how business logic gets built into the model structure rather than bolted on afterwards.

---
