---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "02"
volumeSlug: "the-loan-lifecycle"
volumeTitle: "THE LOAN LIFECYCLE"
order: 6
title: "STAGE 5 — DECISION, PRICING AND DEVIATION"
slug: "6-stage-5-decision-pricing-and-deviation"
sectionNumber: "6"
part: null
kind: "narrative"
sourceFile: "CR_02_THE_LOAN_LIFECYCLE.md"
tags: []
hasSayThis: true
wordCount: 984
status: "raw"
section: "§6"
summary: ""
enriched: false
---

# §6 · STAGE 5 — DECISION, PRICING AND DEVIATION

## 6.1 The approval matrix and the deviation

A retail lender does not approve loans one at a time by committee. It sets an **approval matrix**: which combinations of score band, ticket size, product and channel can be auto-approved, which require a credit officer, and which require escalation.

**The deviation is the control point.** A deviation is an approval granted outside standing policy — a FOIR above cap, an LTV above norm, a score below cut-off — with a documented reason and a named authority.

📘 **Why deviations are the most informative single field in an origination dataset.** Deviations are, by construction, the loans the policy said not to write. Their subsequent performance is a direct test of whether the policy is too tight or the override authority is too loose. Every well-run credit shop tracks **deviation rate and deviation-cohort delinquency by approving authority.** A rising deviation rate is the earliest available signal that growth pressure is overwhelming credit discipline — earlier than any DPD number, because it appears at origination rather than at month six.

✅ If you are ever asked "how would you detect underwriting discipline slipping before it shows in the book," the answer is: deviation rate by authority and by channel, tracked monthly, alongside the approval-rate trend. Both move before delinquency does.

## 6.2 Pricing

**Banks** price floating-rate retail loans off an **external benchmark** — the policy repo rate or a treasury bill yield — plus a spread. That construction is why repo movements transmit to home loan EMIs, and why Document 01 noted rate-cut transmission supporting Q4 FY26 home loan origination.

**NBFCs and HFCs** price off their own cost of funds plus a risk-adjusted spread. This is the mechanical reason NBFC pricing is higher and why NBFCs are pushed toward segments where the yield supports the funding cost — which in turn is why they hold the small-ticket, higher-delinquency end of every product.

**Risk-based pricing** ties the spread to the score band. It is standard in unsecured and increasingly present in secured.

## 6.3 Penal charges — the rule to get right 

The RBI's fair-lending instruction on penal charges, issued 18 August 2023 and effective for new loans from 1 April 2024, made one change that is conceptually important:

> **Penalty for default must be levied as a *penal charge*, not as *penal interest* added to the rate of interest — and it must not be capitalised.**

📘 **Why this is not cosmetic.** Penal interest compounds. Adding two percentage points of penal interest to a defaulting borrower's rate, on a balance that is already unpaid, mechanically accelerates the borrower toward a position from which recovery is arithmetically impossible — and it does so in a way that grows the lender's *accrued income* on an asset that is deteriorating. The rule breaks that loop: a charge is a charge, disclosed and quantified, and it does not enter the interest computation.

It also requires the charges to be **reasonable, non-discriminatory within a loan category, and disclosed** in the loan agreement, the Key Facts Statement, and on the lender's website.

## 6.4 The Key Facts Statement 

Mandated by the circular of 15 April 2024 and now carried inside the RBC Directions. A standardised, plain-language summary given to the borrower before signing, setting out the sanctioned amount, the tenor, the interest rate and its basis, all fees and charges, the repayment schedule, the recovery and grievance mechanism — and critically the **Annual Percentage Rate**, the all-in annualised cost.

The APR is the point. It exists so that a borrower comparing a 14% loan with a ₹5,000 processing fee against a 16% loan with none can actually compare them. A charge not disclosed in the KFS cannot be levied.

## 6.5 Pre-payment charges 

The **RBI (Pre-payment Charges on Loans) Directions, 2025**, issued 2 July 2025, applying to all loans and advances **sanctioned or renewed on or after 1 January 2026.**

- **No pre-payment charges** on floating-rate loans to individuals for non-business purposes, with or without co-obligants.
- Extended to **floating-rate loans to individuals and Micro and Small Enterprises for business purposes**, subject to defined institutional categories and limits — this was the genuinely new part, since individual non-business floating-rate loans had been protected since circulars of 2012 and 2014.
- Applies to commercial banks excluding payment banks, co-operative banks, NBFCs, and all-India financial institutions.
- **Irrespective of the source of funds**, whether part or full repayment, and **with no minimum lock-in period**. No charge even where the lender initiates the pre-payment.
- Where a loan is *not* covered, any pre-payment charge must be stated in the sanction letter, the loan agreement and the KFS. **Retrospective or undisclosed charges are prohibited.**

⚠️ **The risk-management consequence, which is what an interviewer would actually probe.** Removing foreclosure friction on floating-rate retail raises **balance transfer velocity** — the rate at which good borrowers refinance to a cheaper lender. That does three things to a book: it shortens **behavioural life** relative to contractual tenor, which changes ECL and pricing assumptions; it **adversely selects** the residual portfolio, because the borrowers who can refinance are the ones with options; and it makes **prepayment modelling** a live requirement rather than an academic one, particularly in mortgages where the effect is largest.

**► SAY THIS**
> "The pre-payment directions took effect for loans sanctioned or renewed from 1 January 2026, and they extended the no-foreclosure-charge protection from individual non-business floating-rate loans out to individual and MSE business loans. The consumer framing is borrower mobility. The risk framing is that you've removed the friction holding good borrowers in place — so behavioural life shortens against contractual tenor, the residual book adversely selects because the ones who leave are the ones with options, and prepayment modelling stops being optional. In a mortgage book that's a material ECL and pricing input, not a conduct footnote."

---
