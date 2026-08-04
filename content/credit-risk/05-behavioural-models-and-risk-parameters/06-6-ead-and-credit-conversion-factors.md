---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "05"
volumeSlug: "behavioural-models-and-risk-parameters"
volumeTitle: "BEHAVIOURAL MODELS AND RISK PARAMETERS"
order: 6
title: "EAD AND CREDIT CONVERSION FACTORS"
slug: "6-ead-and-credit-conversion-factors"
sectionNumber: "6"
part: null
kind: "narrative"
sourceFile: "CR_05_BEHAVIOURAL_MODELS_AND_RISK_PARAMETERS.md"
tags: []
hasSayThis: false
wordCount: 625
status: "raw"
section: "§6"
summary: ""
enriched: false
---

# §6 · EAD AND CREDIT CONVERSION FACTORS

## 6.1 Term loans — nearly solved

For an amortising loan, EAD at a future default date is the scheduled outstanding balance, adjusted for two things:

- **Prepayment**, which reduces it — and which, per §4.4, became more likely for floating-rate retail from January 2026.
- **Capitalised amounts**, which increase it. Note Document 02 §6.3: penal charges since 1 April 2024 are **charges, not capitalised interest**, which is precisely a rule about not letting EAD inflate on a deteriorating account.

This is the easy parameter and it rarely repays much modelling effort.

## 6.2 Revolving facilities — where the work is

📘 **Credit Conversion Factor.** The proportion of the currently **undrawn** limit expected to be drawn by the time of default.

> **EAD = Current drawn + ( CCF × Undrawn limit )**

🧮 **The assumption, from Document 03 §6.3.** A card with a ₹2,00,000 limit and ₹60,000 drawn has ₹1,40,000 undrawn. At a 40% CCF: EAD = ₹60,000 + (0.40 × ₹1,40,000) = **₹1,16,000** — nearly double the current balance.

🧮 **Now the realised outcome.** Suppose that account defaults twelve months later with ₹1,52,000 drawn. The realised CCF is:

> (₹1,52,000 − ₹60,000) / (₹2,00,000 − ₹60,000) = ₹92,000 / ₹1,40,000 = **65.7%**

⚠️ **A 40% assumption against a 65.7% outcome understates EAD by about ₹36,000 on a single account — roughly 31% of the assumed exposure.** And this is not an unlucky draw; it is the systematic direction of the error, because **a borrower heading into distress draws down.** The facility becomes a liquidity source of last resort precisely as the borrower's ability to repay collapses.

🔴 **Which produces the correlation that makes cards the most dangerous retail asset**, and it is worth being able to state in one line: **PD, LGD and EAD all move in the same adverse direction at the same time.** The borrower becomes more likely to default, less likely to be recoverable, and holds more exposure — all driven by the same underlying distress. Document 01 §2.5's observation that cards carry the highest capital charge and the highest deep-bucket delinquency is this correlation showing up in the data.

## 6.3 Estimating CCF

The standard method is a **fixed-horizon cohort approach**: take all accounts that were non-defaulted at a reference date, follow them for a defined horizon (usually 12 months), and for those that defaulted, compute realised CCF as above. Average within segments.

Three practical problems, each of which has a standard handling:

1. **Accounts already at or near full utilisation** have almost no undrawn limit, so the denominator approaches zero and realised CCF becomes unstable or undefined. Segment them out and treat separately.
2. **Limit changes during the observation window** — increases, decreases, blocks — break the arithmetic. The lender's own risk actions are part of the process being measured, which is §2.3's endogeneity problem in a different costume.
3. **CCF varies systematically with utilisation at observation.** A low-utilisation account has more headroom to draw and typically shows a higher CCF; a high-utilisation account shows a lower one because there is less left to take. **CCF should therefore be estimated by utilisation band**, not as a single portfolio number, and quoting one CCF for a card portfolio is a signal that this has not been done.

✅ **And the management lever this exposes**, which is the practically useful part: EAD is the one parameter a lender can **directly control**. You cannot make a borrower repay, and you cannot conjure a recovery market. You can cut an undrawn limit. Which is exactly why behavioural models feed limit management (§1.2), and why utilisation drift is both an early warning signal and an EAD driver — the same variable doing two jobs.

---
