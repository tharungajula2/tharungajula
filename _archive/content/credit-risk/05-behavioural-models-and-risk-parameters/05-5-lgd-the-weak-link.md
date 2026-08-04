---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "05"
volumeSlug: "behavioural-models-and-risk-parameters"
volumeTitle: "BEHAVIOURAL MODELS AND RISK PARAMETERS"
order: 5
title: "LGD — THE WEAK LINK"
slug: "5-lgd-the-weak-link"
sectionNumber: "5"
part: null
kind: "narrative"
sourceFile: "CR_05_BEHAVIOURAL_MODELS_AND_RISK_PARAMETERS.md"
tags: []
hasSayThis: true
wordCount: 1295
status: "raw"
section: "§5"
summary: ""
enriched: false
---

# §5 · LGD — THE WEAK LINK

Document 03 §6.2 called LGD the weakest-evidenced component of every Indian retail ECL model. This section is why, and what to do about it.

## 5.1 The definition and the computation

> **LGD = 1 − Recovery Rate**, where the recovery rate is the **discounted, cost-net** recovery as a proportion of exposure at default.

Both adjectives carry weight.

🧮 **Worked — and the gap between the naive and correct answers is the point.**

An account defaults with **EAD of ₹5,00,000**. Recoveries: **₹1,50,000 at month 12** and **₹2,00,000 at month 30**. Workout costs of **₹40,000 at month 6**. Discount at the effective interest rate, **15%**.

**Discount factors:**
Month 6 (0.5 yr): 1 / 1.15^0.5 = 0.9325
Month 12 (1.0 yr): 1 / 1.15 = 0.8696
Month 30 (2.5 yr): 1 / 1.15^2.5 = 0.7051

**Present values:**
Recoveries: (₹1,50,000 × 0.8696) + (₹2,00,000 × 0.7051) = ₹1,30,440 + ₹1,41,020 = **₹2,71,460**
Costs: ₹40,000 × 0.9325 = **₹37,300**
Net: ₹2,71,460 − ₹37,300 = **₹2,34,160**

**Recovery rate = ₹2,34,160 / ₹5,00,000 = 46.8% → LGD = 53.2%**

**Now the naive version.** Undiscounted, ignoring costs: (₹1,50,000 + ₹2,00,000) / ₹5,00,000 = 70% recovery → **LGD = 30.0%**.

⚠️ **Thirty percent versus fifty-three percent — a 23-percentage-point difference, on identical cash flows.** Applied across a portfolio this is the difference between adequate and severely deficient provisioning, and it arises entirely from two adjectives. **A shop computing undiscounted, cost-gross recovery rates is not slightly wrong; it is wrong by a factor that would fail any validation.**

## 5.2 The bimodality, and why mean LGD is a bad summary

📘 **LGD distributions in retail are bimodal, not bell-shaped.** Accounts cluster at two ends: those that **cure** or are fully realised, with LGD near zero, and those that are effectively total losses, with LGD near one. Relatively few sit in the middle.

🔴 **So the arithmetic mean is a value that few individual accounts actually take**, and modelling LGD as a single conditional expectation throws away the structure.

✅ **The standard fix, and it is worth naming because it is what a well-run shop does:** model LGD in **two stages** —

> **LGD = P(no cure) × E[loss | no cure]**

A cure model — will this defaulted account come back? — and, conditional on it not curing, a severity model. This mirrors the collections structure of §3 exactly, and it makes both halves separately validatable. It also connects directly to Document 02 §11.2: the upgrade rule requiring **entire arrears** makes cure structurally harder in India than in jurisdictions with softer upgrade rules, which mechanically raises LGD.

## 5.3 LGD by realisation route

From Document 03 §6.1, now with the mechanism attached:

| Route | Product | Why LGD lands where it does |
|:--|:--|:--|
| **Pledge** | Gold | Lender already holds the asset; auction is fast and governed by the 2025 gold directions. Lowest LGD in retail |
| **Hypothecation** | Vehicles, durables | Repossession works but costs; resale market real but discounted. Moderate, and *observable* |
| **Mortgage** | Home, LAP | High collateral value, slow enforcement — SARFAESI notice, 60 days, then process. Low LGD, long tail |
| **Unsecured** | Personal loans, cards | No realisation route. Settlement only. Highest LGD |

⚠️ **The correlation that makes collateral less protective than it looks.** Collateral value and default probability are not independent. A property market downturn raises defaults **and** depresses realisation values simultaneously; a gold price correction does the same, which is exactly the exposure the RBI's June 2026 FSR flagged and which Document 01 §2.2 worked through. **LGD estimated in benign conditions systematically understates LGD in the conditions where it matters.** Which is the entire argument for §5.4.

## 5.4 Downturn LGD

📘 **Downturn LGD** is LGD estimated under stressed conditions rather than average ones, and it is required where LGD is materially cyclical — which in secured retail it always is.

The standard approaches: use observed LGD from the worst period available; regress LGD on macro or collateral-value indicators and evaluate at stressed values; or apply a conservative add-on where data is insufficient.

🔴 **In India the honest answer is usually the third**, and saying so is better than pretending otherwise. There is no observed retail downturn in which collateral values fell substantially and recovery data was cleanly captured. The pandemic period is contaminated by moratoria. **So downturn LGD in Indian retail is largely a judgemental add-on, and it should be documented as an assumption with a stated basis rather than presented as an estimate.**

## 5.5 The data problem, stated fully

LGD requires **completed workouts** — defaults whose recovery process has finished. Four compounding problems in an Indian retail book:

1. **Long workout periods.** A mortgage enforcement can run years, so the completed-workout population is old.
2. **Fast growth.** Document 01: the book roughly doubled in a few years, so the defaulted population is small relative to the current book and drawn from a different vintage.
3. **Truncation bias.** Excluding incomplete workouts biases the sample toward **fast** resolutions, which are systematically **better** ones. LGD is understated as a direct result.
4. **Policy change.** Recoveries realised under one enforcement regime do not predict recoveries under another.

✅ The partial defences: use **fixed-horizon LGD** — recoveries within a defined window, say 36 months, with a conservative assumption thereafter — rather than waiting for true completion; and report LGD with an explicit statement of what share of the sample was incomplete and how it was treated.

## 5.6 DLG and LGD 

Now the update from this document's opening lands in its proper place.

An NBFC may consider a **Default Loss Guarantee** in determining ECL across all stages, provided the DLG is **integral to the contractual terms of the loan** and is not recognised separately, per Ind AS. And because cover depletes on each invocation, **ECL must be recomputed as it does.**

📘 **In parameter terms: DLG reduces LGD; it does not reduce PD.** The borrower is exactly as likely to default. What changes is how much of that default the lender bears.

🔴 **Three things that make this harder than it sounds, and they are what an interviewer would push on:**

1. **The cover is finite and shared across a portfolio.** A DLG capped at a percentage of the pool protects the first losses and nothing beyond. So the LGD benefit is **not uniform across accounts** — it depends on where in the loss distribution the pool ends up sitting, which makes this a portfolio-level, not account-level, adjustment.
2. **It depletes.** Two accounts identical in every respect, defaulting six months apart, can face different residual cover. ECL is therefore path-dependent in a way that most retail parameter frameworks are not built for.
3. **Counterparty risk.** A guarantee is only worth the guarantor's ability to pay it. An LGD benefit recognised against a thinly capitalised LSP is an LGD benefit that will evaporate precisely when the portfolio needs it — because the same stress that triggers invocations is what impairs the guarantor.

**► SAY THIS**
> "LGD is where I'd expect to find the weakest evidence in an Indian retail book, and I'd say so rather than presenting a number with false confidence. Three reasons: it needs completed workouts, the book has grown too fast to have many, and excluding incomplete workouts biases toward fast resolutions which are the good ones — so LGD comes out understated. I'd also model it in two stages, cure probability and then severity given no cure, because the distribution is bimodal and the mean is a value few accounts actually take. And I'd flag that the upgrade rule requiring entire arrears makes cure structurally harder here than in other jurisdictions, which mechanically raises Indian retail LGD."

---
