---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "06"
volumeSlug: "ecl-ifrs9-and-capital"
volumeTitle: "ECL, IFRS 9 AND CAPITAL"
order: 2
title: "THE ECL FRAMEWORK"
slug: "2-the-ecl-framework"
sectionNumber: "2"
part: null
kind: "narrative"
sourceFile: "CR_06_ECL_IFRS9_AND_CAPITAL.md"
tags: []
hasSayThis: false
wordCount: 999
status: "raw"
section: "§2"
summary: ""
enriched: false
---

# §2 · THE ECL FRAMEWORK

## 2.1 The instrument 

**Reserve Bank of India (Commercial Banks – Asset Classification, Provisioning and Income Recognition) Directions, 2026** — circular **RBI/DOR/2026-27/398**, dated **27 April 2026**, in force **1 April 2027**. Issued with a Statement on Feedback Received, following draft directions of 7 October 2025.

**Scope.** Commercial banks excluding small finance banks, payments banks and local area banks; plus the corresponding new banks and SBI. **Co-operative banks are outside it.** All-India financial institutions have their own separate directions. NBFCs already operate under Ind AS 109 and their own IRACP Directions, 2025.

The final directions refined the draft on three points in particular: the **application of prudential floors**, ECL computation for **purchased or originated credit-impaired (POCI)** assets, and the determination of the **effective interest rate**.

**Scope of instruments covered** is broader than loans: debt securities not measured at fair value through profit or loss, trade and lease receivables, loan commitments, off-balance sheet exposures, and other financial assets with contractual cash flows.

## 2.2 The three stages

📘 The general approach, mirroring IFRS 9:

| Stage | Condition | Allowance | Interest recognised on |
|:--|:--|:--|:--|
| **Stage 1** | No significant increase in credit risk since initial recognition, or low credit risk | **12-month ECL** | Gross carrying amount |
| **Stage 2** | Significant increase in credit risk, but not credit-impaired | **Lifetime ECL** | Gross carrying amount |
| **Stage 3** | Credit-impaired | **Lifetime ECL** | **Net** carrying amount |

⚠️ **The interest-recognition line is not a footnote.** In Stage 3 interest accrues on the *net* carrying amount — gross less allowance — which is the accounting expression of Document 02 §11.1's rule that income ceases to be recognised on an NPA. **A rise in Stage 3 hits the P&L twice**, once through the allowance and once through reduced interest income, exactly as the IRAC framework did.

## 2.3 SICR — the trigger

The whole framework hinges on one determination made at every reporting date: **has credit risk increased significantly since initial recognition?**

📘 **"Since initial recognition" is the phrase that carries the weight.** SICR is a **relative** test, not an absolute one. A loan originated at a PD of 8% and now at 10% may not have suffered a SICR. A loan originated at 0.3% and now at 1.2% almost certainly has, despite being the far better credit. **This is the most common conceptual error in the whole subject**, and it has a direct operational consequence: **you must store each account's PD at origination, forever.** A bank that did not retain origination-date PDs cannot do quantitative SICR at all, and this is a real and expensive gap in a number of institutions right now.

**The criteria the Directions require banks to assess at each reporting date, using documented criteria:**

**Quantitative:**
- A **rebuttable presumption of SICR at 30 days past due.** Rebuttable means a bank may argue against it with evidence — and must document why.
- A **significant increase in lifetime PD since initial recognition.** The threshold is the bank's own, board-approved, and set within the RBI's guidance.

**Qualitative:**
- Restructuring or forbearance.
- Watchlist placement.
- Internal or external rating downgrade.
- Adverse sectoral or macroeconomic outlook.
- Fraud flags.

🔴 **The threshold design problem, and it is a genuinely hard one.** How much lifetime PD increase is "significant"? Absolute (1.2% − 0.3% = 0.9 points) or relative (a 4× increase)? Fixed or varying by origination PD?

An absolute threshold moves almost nothing in a prime book and everything in a subprime one. A relative threshold does the reverse — a 4× rule catches the prime loan above and misses the 8%-to-10% case entirely. **Most banks use both, with a relative test subject to an absolute floor**, and the calibration of that pair is one of the highest-impact judgements in the entire implementation, because it determines how much of the book sits in Stage 2 and therefore how large the provision is.

✅ **The transfer back.** SICR is symmetric — an account whose risk falls back below the threshold moves from Stage 2 to Stage 1, and the allowance reverts to 12-month. Note carefully that this is **not** the same as Document 02 §11.2's upgrade rule, which governs Stage 3 to Stage 1 and requires payment of the **entire** arrears. **Stage 2 to Stage 1 is a model determination; Stage 3 to Stage 1 is a rule.** Confusing the two is a clean way to reveal that you have read about the framework rather than worked in it.

## 2.4 The 12-month / lifetime split

Document 05 §4.4 built the arithmetic. Its five-year term structure gave a 12-month PD of 3.00% and a lifetime PD of 8.14% — **a factor of about 2.7**.

That factor is the Stage 1 to Stage 2 cliff. And it is **larger for longer-tenor products**: a mortgage with fifteen years of remaining life accumulates far more marginal hazard than a two-year personal loan, which is why commentary puts Stage 2 provisions at three to five times Stage 1 for long-tenor exposures.

⚠️ **Which produces the cliff-edge management problem.** A single account crossing the SICR threshold multiplies its allowance several-fold, instantaneously. Across a portfolio in a deteriorating environment, **Stage 2 migration is the dominant driver of provision volatility** — not Stage 3, and not the parameter estimates. A bank whose ECL swings unexpectedly should look first at its staging, not at its models.

## 2.5 Stage 3 and the retained 90-day rule

📘 **The 90-day NPA classification is retained.** The RBI kept the existing delinquency norm for identifying non-performing assets, so Stage 3 aligns broadly with NPA and continuity in stressed-asset identification is preserved.

But note the softening: the Directions define credit impairment with **qualitative deterioration indicators alongside** the days-past-due count, so the hard 90-day cliff becomes a floor rather than the sole test. An account can be credit-impaired before 90 days on qualitative grounds; it cannot avoid being credit-impaired after 90 days.

---
