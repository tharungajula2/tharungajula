---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "02"
volumeSlug: "the-loan-lifecycle"
volumeTitle: "THE LOAN LIFECYCLE"
order: 2
title: "STAGE 1 — SOURCING"
slug: "2-stage-1-sourcing"
sectionNumber: "2"
part: null
kind: "narrative"
sourceFile: "CR_02_THE_LOAN_LIFECYCLE.md"
tags: []
hasSayThis: true
wordCount: 769
status: "raw"
section: "§2"
summary: ""
enriched: false
---

# §2 · STAGE 1 — SOURCING

## 2.1 The decision

Which borrowers get approached, through which intermediary, with what offer. In practice this decision is made months before any credit officer sees a file, and it constrains everything downstream. **You cannot underwrite your way out of a bad sourcing mix.**

## 2.2 The channels and their failure modes

Document 01 §4 laid out the four channels. Here is what actually goes wrong in each.

**Branch and direct.** Failure mode is *volume pressure* — branch targets pushing marginal files through. Detectable as delinquency clustered by branch and by month-end.

**DSA / DMA.** The structural problem is that **commission is paid on disbursal, not on repayment.** The agent's economic interest ends the day the money moves. Failure modes: document coaching, income inflation, sourcing from a pool the lender did not intend to serve, and in the worst cases outright fabrication.

The control is not a rule, it is a measurement: **DSA-level vintage analysis with a live cut-off policy.** Every mature lender ranks its sourcing partners by 6-month or 12-month delinquency of the business they wrote, and switches off the tail. If you build one artefact in your first credit risk job, build this.

**Dealer and point-of-sale.** Auto, two-wheeler, consumer durables. Underwriting happens in a showroom with a customer waiting and a salesperson invested in the sale. Failure modes: inflated invoice values — which corrupts LTV and therefore LGD — and dealer-level collusion. Same control: dealer-level vintage tracking.

**Digital / LSP.** Fastest, cheapest, and the one where the borrower and the lender never meet. Failure modes: bot and synthetic applications, device farms, and the specific problem that a borrower who is *offered* credit behaves differently from one who *sought* it.

🔴 **The trap.** Channel is usually available in the data and almost always underused. A candidate who says "I'd look at the vintage curves" is fine. A candidate who says "I'd look at the vintage curves cut by sourcing partner, because the aggregate will hide a bad tail of DSAs inside a good average" is doing the job.

## 2.3 The rules 

Conduct at this stage was, until recently, scattered across the Fair Practices Code and a dozen circulars. It has now been **consolidated into the Responsible Business Conduct Directions, 2025** — issued as parallel sets for commercial banks, NBFCs, all-India financial institutions, RRBs, UCBs and local area banks. The NBFC set carries reference RBI/DOR/2025-26/362 dated 28 November 2025.

⚠️ **This consolidation is itself examinable.** If you cite "the Fair Practices Code circular" for something now sitting inside the RBC Directions, you are quoting a superseded instrument. The RBC Directions pull together, in one place: the Fair Practices Code, the Key Facts Statement requirement, penal charges regulation, floating-rate reset on EMI loans, pre-payment charge restrictions, release of property documents on closure, conduct in gold and silver lending, microfinance borrower protections, and DSA / DMA / recovery agent responsibilities.

What they require at the sourcing stage:

- **Board-approved policies** on fair practices, interest rate setting, grievance redressal and agent engagement.
- **Explicit consent** — no compulsory bundling of other financial products with a loan.
- **Mis-selling prevention and suitability assessment.**
- **Regulation of DSAs and DMAs**, with the lender obtaining an undertaking that agents will abide by the code of conduct, and the lender remaining accountable for their behaviour.
- **A prohibition on dark patterns** in digital interfaces.

`[DRAFT]` Further amendment directions expanding this — particularly around advertising, marketing, sale of financial products and recovery conduct — were issued in draft form on 12 February 2026 for several entity types and on 20 May 2026 for NBFCs, proposing an effective date of 1 July 2026. **That proposed date has now passed and I have not confirmed finalisation.** `[VERIFY — check whether the Second Amendment Directions were finalised, and on what date, before describing them as live.]`

And from Document 01 §4.1, still governing anything digital: the **Digital Lending Directions, 2025**, with the multi-lender LSP framework live since 1 November 2025 requiring an unbiased offer view and a consistent, documented matching mechanism.

**► SAY THIS**
> "Sourcing is where most credit outcomes are actually determined, because the mix you buy constrains what underwriting can do. The structural issue with DSA and dealer channels is that commission is paid on disbursal, so the intermediary's economics end at drawdown and the lender carries the next sixty months. That's not fixable by policy — it's fixable by measurement. I'd want vintage curves at sourcing-partner level with a standing cut-off rule, because the portfolio average will always conceal a tail of partners writing genuinely bad business."

---
