---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "05"
volumeSlug: "behavioural-models-and-risk-parameters"
volumeTitle: "BEHAVIOURAL MODELS AND RISK PARAMETERS"
order: 1
title: "THE SHIFT FROM DOOR TO BOOK"
slug: "1-the-shift-from-door-to-book"
sectionNumber: "1"
part: null
kind: "narrative"
sourceFile: "CR_05_BEHAVIOURAL_MODELS_AND_RISK_PARAMETERS.md"
tags: []
hasSayThis: false
wordCount: 412
status: "raw"
section: "§1"
summary: ""
enriched: false
---

# §1 · THE SHIFT FROM DOOR TO BOOK

## 1.1 The information advantage

At origination you know what the applicant told you and what the bureau says about them. Once the account is live you know what they have actually done with **your** money.

| | Application | Behavioural |
|:--|:--|:--|
| **Data** | Declared income, demographics, bureau at a point in time | 6–12 months of your own repayment record, utilisation, bounces, refreshed bureau |
| **Verifiability** | Assertions, partly verified | Observed facts |
| **Discrimination** | Moderate | Materially higher — a well-built behavioural model typically out-discriminates the application model on the same population |
| **Population** | Through-the-door applicants | Surviving accounts only |

📘 **Why behavioural models discriminate better, stated plainly:** past repayment behaviour on the same obligation is the closest available proxy for future repayment behaviour on that obligation. Nothing in an application file competes with it.

🔴 **And the correction that must come immediately after.** A behavioural model is built on **survivors** — accounts that made it past origination and past the early-mortality period. Its population is not the through-the-door population, its bad rate is lower, and **its Gini is not comparable to the application model's** even though people compare them constantly. Document 04 §9.2's warning about cross-model Gini comparison applies with particular force here.

## 1.2 Where behavioural output is used

Four uses, and they matter because each imposes different requirements:

1. **Limit management** — increases, decreases, blocks on revolving lines.
2. **Cross-sell eligibility and pre-approved offers.**
3. **Pre-delinquency intervention** — contacting an account before it misses, which is the highest-return collections activity there is.
4. **Ind AS staging — SICR determination.** `[FROM 01-04-2027 for banks]` Under the ECL Directions, significant increase in credit risk is assessed at each reporting date using documented criteria including a **rebuttable 30-DPD presumption** and a **significant increase in lifetime PD since origination**. That second criterion is a behavioural model output, compared against the same account's PD at origination.

⚠️ **Number four changes the model's status entirely.** A behavioural model used for limit-setting is a commercial tool; an error costs you a bad limit increase. The same model used for SICR determination feeds provisions and the audited accounts, which puts it squarely inside the model-governance regime of Document 04's opening — board-approved framework, risk tiering, independent validation. **Many institutions built their behavioural models as commercial tools and will find them promoted into regulatory models by April 2027.**

---
