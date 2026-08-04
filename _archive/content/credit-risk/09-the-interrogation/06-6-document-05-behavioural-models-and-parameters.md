---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 6
title: "DOCUMENT 05 — BEHAVIOURAL MODELS AND PARAMETERS"
slug: "6-document-05-behavioural-models-and-parameters"
sectionNumber: "6"
part: null
kind: "interrogation"
sourceFile: "CR_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 833
status: "raw"
section: "§6"
summary: ""
enriched: false
---

# §6 · DOCUMENT 05 — BEHAVIOURAL MODELS AND PARAMETERS

**Why does a behavioural model out-discriminate an application model?**
Past repayment behaviour on the same obligation is the best available proxy for future repayment on it. Nothing in an application file competes.

**Why can't you compare their Ginis?**
The behavioural model is built on survivors — a different population with a lower base rate.

**What kind of variable dominates a behavioural model?**
Change, not level. Utilisation drift beats utilisation. DPD trend beats maximum DPD. New-trade velocity beats trade count. Which is also why they map naturally onto SICR, a change concept.

**What is endogeneity in this context?**
If a good score triggers a limit increase and the limit changes utilisation, the model is partly predicting the consequences of its own decisions. Partial defence: a small randomised group exempt from score-driven actions.

**What's the target of a collections scorecard?**
Cure, not default.

**Why is a propensity ranking the wrong tool?**
Because the top of it is accounts that would have cured anyway. You want uplift — where the treatment changes the outcome — which needs variation in treatment, ideally a randomised no-contact holdout.

**Convert a score of 660 to a PD, using Offset 501.87 and Factor 28.85.**
ln(odds) = (660 − 501.87) / 28.85 = 5.4811. Odds ≈ 240. PD = 1/241 = **0.415%**.

**And a score of 580?**
ln(odds) = 78.13 / 28.85 = 2.708. Odds = 15. PD = 1/16 = **6.25%**.

**What does that pair tell a business audience?**
Eighty points of score is a fifteen-fold difference in risk. Score is linear in log-odds and exponential in risk.

**What is central tendency and why is it hard in India?**
The long-run average default rate the model should average to. It's hard because much of the Indian retail book has no long run — it doubled in a few years and whole products were reshaped by regulation.

**Marginal versus cumulative PD.**
Marginal is the probability of default in year t conditional on surviving to it — a hazard rate. Cumulative is the probability of having defaulted by the end of year t.

**Given marginals of 3.0, 2.2, 1.5, 1.0 and 0.7 percent, what's the lifetime PD?**
About **8.14%**, against a 12-month PD of 3.00% — roughly 2.7 times.

**Why isn't it 15%?**
Because you can only default once. Marginal hazards apply to survivors, and they decline with seasoning.

**What does "lifetime" actually mean?**
Expected behavioural life, not contractual tenor — which is why the January 2026 pre-payment directions, by shortening behavioural life, reduce lifetime PD and Stage 2 provisions.

**Compute LGD: EAD ₹5,00,000, recoveries ₹1,50,000 at month 12 and ₹2,00,000 at month 30, costs ₹40,000 at month 6, discount 15%.**
PV recoveries ₹2,71,460; PV costs ₹37,300; net ₹2,34,160. Recovery rate 46.8%, **LGD 53.2%**.

**And the naive answer?**
Undiscounted and cost-gross: 70% recovery, **LGD 30%**. A 23-point error from two adjectives.

**Why is mean LGD a poor summary?**
The distribution is bimodal — accounts cluster near zero loss or near total loss. The mean is a value few accounts actually take.

**So how do you model it?**
Two stages: probability of no cure, times expected loss given no cure.

**Why is cure structurally harder in India?**
The upgrade rule requires the entire arrears. That mechanically raises Indian retail LGD relative to jurisdictions with softer rules.

**Why is LGD the weakest-evidenced parameter here?**
It needs completed workouts. Workouts run long, the book grew fast, and excluding incomplete workouts biases the sample toward fast resolutions — which are the good ones. So LGD comes out understated.

**Does a DLG reduce PD or LGD?**
LGD. The borrower is exactly as likely to default; what changes is how much the lender bears.

**Three complications with recognising it.**
The cover is finite and shared across a pool, so the benefit isn't uniform per account. It depletes on invocation, making ECL path-dependent. And it carries counterparty risk — the same stress that triggers invocations impairs the guarantor.

**Compute a realised CCF: limit ₹2,00,000, drawn ₹60,000 at observation, ₹1,52,000 at default.**
(1,52,000 − 60,000) / (2,00,000 − 60,000) = 92,000 / 1,40,000 = **65.7%**. Against a 40% assumption, EAD is understated by about ₹36,000.

**Why should CCF be estimated by utilisation band?**
Because a low-utilisation account has more headroom to draw and shows a higher CCF. Quoting one CCF for a card portfolio signals it hasn't been done.

**What makes revolving credit the most dangerous retail asset?**
PD, LGD and EAD all move adversely at once, driven by the same distress — the borrower becomes more likely to default, less recoverable, and holds more exposure.

**Which parameter can a lender actually control?**
EAD, through limit management. You can't make a borrower repay or conjure a recovery market, but you can cut an undrawn limit.

**Name the five ways ECL differs from Basel EL.**
PIT versus TTC PD; 12-month versus lifetime horizon; expected versus downturn LGD; discounted at EIR versus undiscounted; probability-weighted across scenarios versus single. Plus the prudential floors.

---
