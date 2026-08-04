---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "02"
volumeSlug: "the-loan-lifecycle"
volumeTitle: "THE LOAN LIFECYCLE"
order: 5
title: "STAGE 4 — CREDIT ASSESSMENT"
slug: "5-stage-4-credit-assessment"
sectionNumber: "5"
part: null
kind: "narrative"
sourceFile: "CR_02_THE_LOAN_LIFECYCLE.md"
tags: []
hasSayThis: true
wordCount: 1259
status: "raw"
section: "§5"
summary: ""
enriched: false
---

# §5 · STAGE 4 — CREDIT ASSESSMENT

The heart of the lifecycle, and the stage every model in Documents 04 through 07 is ultimately about.

## 5.1 The decision, broken into its four real questions

**1. Is the applicant eligible at all?** Policy rules — age, residency, employment category, geography, negative lists, minimum income, existing relationship status. Binary, absolute, and applied before anything else. A policy rejection is not a scorecard decision and should never be blended into one.

**2. What is the applicant's credit history?** The bureau pull.

**3. What can they afford?** Income assessment and obligation ratios.

**4. What is the residual, unexplained risk?** The scorecard.

📘 **The order matters, and the reason is subtle.** Policy rules encode things the institution has decided not to do regardless of score — regulatory constraints, appetite decisions, known-bad segments. A scorecard encodes probability. If you let a high score override a policy rule, you have quietly delegated your risk appetite to a model. Every well-run lender keeps these layers separate and can tell you the rejection rate attributable to each. **"What's your policy-decline rate versus your score-decline rate?" is a question that instantly reveals whether a shop is run properly.**

## 5.2 The bureau pull

Four CICs, statutory reporting under CICRA 2005, and as of **1 July 2026** the data behind them refreshes on four reference dates a month rather than two — Document 01 §7.2.

What a lender actually reads off a consumer bureau report:

- **The score** — a three-digit number, typically 300 to 900 in the Indian convention.
- **Trade lines** — every credit facility, its lender, sanction amount, outstanding, and payment history month by month.
- **DPD history** — the string that shows how many days past due the account was in each reporting period.
- **Enquiries** — who has pulled this file, and when. Enquiry velocity is one of the strongest single fraud and distress signals available.
- **Written-off and settled flags** — and these persist for years.

🔴 **The trap on "settled".** A settlement — where the lender accepts less than the full outstanding in closure — is reported as *settled*, not *closed*, and that status stays on the bureau record for a long period, commonly stated as up to seven years. Borrowers routinely accept settlements believing they have cleared their record. For a risk analyst, the practical point is the reverse: **"settled" is a strong negative predictor, and a portfolio with a high settled-flag incidence in its approved population has an underwriting policy problem.**

⚠️ **The stacking problem, and why the reporting change matters so much.** Under fortnightly reporting, a borrower could take loans from four lenders inside the reporting gap and none of the four would see the other three. This is the mechanism behind the microfinance over-leverage cycle in Document 01 §3.3 and behind much of the small-ticket unsecured stress. Halving the window halves the blind spot. It does not close it, and near-real-time reporting is where the RBI has said it wants to go.

## 5.3 Income assessment — the real dividing line in Indian retail

This is the single biggest structural difference between lender types in this market, and Document 01 §2.1 showed it playing out in the affordable housing share data.

**Documented income.** Salary slips, Form 16, income tax returns, bank statements showing salary credit. Fast, verifiable, and available for the roughly formal-sector share of the workforce. This is what banks underwrite.

**Assessed or surrogate income.** Where no reliable documentation exists — the self-employed, the informal, the seasonal. Methods include:

- **Banking surrogate** — average bank balance and credit turnover.
- **Business vintage and premises assessment** — a physical visit, an estimate of turnover from observable activity.
- **Cash-flow underwriting** from Account Aggregator feeds, which turns bank statement data into a structured, verified series rather than a PDF the borrower supplies.
- **GST filings** for small businesses.
- **Bureau-based surrogates** — inferring capacity from the size and performance of existing obligations.

📘 **The two ratios you must be able to state and compute.**

**FOIR / DBR** — Fixed Obligation to Income Ratio, or Debt Burden Ratio. Total monthly obligations, including the proposed EMI, divided by monthly income. Lenders set caps that vary by income band, and the caps are lower at lower incomes because the absolute residual matters more than the ratio at subsistence levels.

**LTV** — Loan to Value. Loan amount over collateral value. Document 01 §2.2 covered the gold-loan tiering and the bullet-repayment measurement change in detail; the same concept governs mortgages and vehicles.

🧮 **Worked — why FOIR caps tighten at low incomes.** Two borrowers, both at a 50% FOIR. The first earns ₹2,00,000 a month and services ₹1,00,000 of obligations, leaving ₹1,00,000 to live on. The second earns ₹20,000 and services ₹10,000, leaving ₹10,000. The ratio is identical; the resilience is not remotely comparable. One shock — a medical bill, a month of lost work — pushes the second into default and leaves the first unaffected. **This is the arithmetic behind Document 01's ticket-size gradient**, and it is why sound policy sets FOIR caps as a schedule against income rather than a single number.

## 5.4 ULI and the direction of travel

Document 01 §7.4 introduced the **Unified Lending Interface** — a consent-based exchange with standardised APIs pulling from Aadhaar e-KYC, PAN validation, state land records, GST filings, Account Aggregator feeds and the bureaus, so a lender integrates once rather than building a connection to each source. Not a data repository; a controlled channel.

Its significance for Stage 4 is precise: **it attacks the cost of assessment, not the quality of the credit.** The borrowers it is designed to reach — small farmers, tenant farmers, thin-file MSMEs — are not unbankable because they are bad credits. They are unbankable because verifying them costs more than the loan earns. Standardised, consented data access changes that arithmetic.

`[VERIFY]` National rollout scale remains unconfirmed to me. Do not quote a lender count or disbursement volume you have not checked.

## 5.5 Where the scorecard sits

The scorecard's job is what remains after policy and affordability: **the residual, unexplained probability that this applicant will default.**

Its inputs are demographic, bureau, and — where available — behavioural and alternative data. Its output is a probability, usually rendered as a score band. Its use is to rank-order applicants so a cut-off can be set at the point where the marginal loan's expected return equals its expected loss.

That is the whole logic, and it is worth saying plainly because it gets lost: **a scorecard does not decide anything. It ranks. The cut-off decides, and the cut-off is a business decision about appetite, not a modelling output.** Document 04 builds scorecards properly — WoE and IV, logistic regression, binning, Gini and KS, the whole apparatus. Here you need only the placement.

**► SAY THIS**
> "Underwriting is four decisions, not one: eligibility on policy rules, credit history from the bureau, affordability from income and FOIR, and then the scorecard for the residual risk. I'd keep those layers separate and I'd want the decline rate attributable to each, because if a good score can override a policy rule you've handed your risk appetite to a model. And the affordability layer is where the Indian market actually differs — banks underwrite documented income, HFCs and NBFCs underwrite inferred income through banking surrogates, business vintage and cash-flow data from Account Aggregator. That difference is what produces the delinquency spread between lender types, and it's a capability difference before it's a quality difference."

---
