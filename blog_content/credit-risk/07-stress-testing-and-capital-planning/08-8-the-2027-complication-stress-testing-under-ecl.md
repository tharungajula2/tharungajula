---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "07"
volumeSlug: "stress-testing-and-capital-planning"
volumeTitle: "STRESS TESTING AND CAPITAL PLANNING"
order: 8
title: "THE 2027 COMPLICATION — STRESS TESTING UNDER ECL"
slug: "8-the-2027-complication-stress-testing-under-ecl"
sectionNumber: "8"
part: null
kind: "narrative"
sourceFile: "CR_07_STRESS_TESTING_AND_CAPITAL_PLANNING.md"
tags: []
hasSayThis: false
wordCount: 426
status: "raw"
section: "§8"
summary: ""
enriched: false
---

# §8 · THE 2027 COMPLICATION — STRESS TESTING UNDER ECL

Everything in §4 changes character on 1 April 2027, and this section is where Documents 06 and 07 fuse.

## 8.1 The new dominant channel

Under IRAC, a stress scenario hit capital through **NPA formation** — accounts crossing 90 days, attracting provisions on the classification ladder. Slow, rule-bound, and lagging by construction.

Under ECL, the dominant channel becomes **Stage 2 migration**, and it is faster and larger.

🔴 **Why. Three compounding reasons:**

1. **SICR triggers at 30 DPD** as a rebuttable presumption — sixty days earlier than NPA classification.
2. **It also triggers on a significant increase in lifetime PD**, which in a deteriorating macro scenario happens to accounts that are **fully current**. No delinquency required at all.
3. **Each migrating account's allowance multiplies by 2.7× or more** on the Document 06 §2.4 arithmetic, and by more again for long-tenor exposures.

📘 **Put together: under ECL, provisions rise before any account misses a payment.** A worsening macro forecast raises lifetime PDs, pushes accounts across the SICR threshold, and multiplies their allowances — on a book that is still performing perfectly.

⚠️ **This is the structural change stress testing must absorb**, and it is why Document 06 §6.3 insisted the real change in April 2027 is the **variance**, not the level. A stress model built on the IRAC transmission chain — macro to NPA to provision — will materially understate the speed and size of the capital impact under ECL, because it models the wrong channel.

## 8.2 What a post-2027 stress model must therefore include

- **Projected staging distribution** under each scenario, not just projected NPAs. The Stage 1 / Stage 2 / Stage 3 split becomes a primary output.
- **The SICR threshold itself as a modelled quantity**, because it determines migration volume — and Document 06 §2.3 noted that this single calibration moves the provision more than any parameter refinement.
- **Scenario-conditional lifetime PDs**, not just 12-month PDs.
- **The prudential floors**, which cap the downside of the model in benign states and therefore change the *distance travelled* under stress.

✅ **And the counter-intuitive consequence worth carrying**, following Document 06 §8.2: the **floors are counter-cyclical**. By forcing provisions above the model in good times, they reduce how far provisions must rise in bad times. **A floored book has a smaller stress impact than an unfloored one**, which is a genuine and under-appreciated argument in the floors' favour and a good thing to be able to say when someone criticises them as blunt.

---
