---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 3
title: "DOCUMENT 02 — THE LOAN LIFECYCLE"
slug: "3-document-02-the-loan-lifecycle"
sectionNumber: "3"
part: null
kind: "interrogation"
sourceFile: "CR_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 1050
status: "raw"
section: "§3"
summary: ""
enriched: false
---

# §3 · DOCUMENT 02 — THE LOAN LIFECYCLE

**Name the ten stages.**
Sourcing; application and identity; fraud screening; credit assessment; decision and pricing; sanction and documentation; disbursal; servicing and monitoring; collections; classification, recovery and write-off.

**State the upstream principle.**
The cost of fixing a problem rises by roughly an order of magnitude at each stage downstream. Almost every collections problem is an underwriting problem that arrived late, and almost every underwriting problem is a sourcing problem that arrived late.

**What is structurally wrong with DSA sourcing?**
Commission is paid on disbursal, so the agent's economic interest ends the day the money moves while the lender carries the next sixty months.

**How do you control it?**
Not with a rule — with measurement. DSA-level vintage analysis with a standing cut-off policy.

**V-CIP versus OTP-based e-KYC — what's the difference and why does it matter?**
V-CIP is treated on par with face-to-face onboarding. OTP e-KYC is not — it carries transaction limits and requires the relationship to be regularised. It's a real constraint on what a digital lender can write.

**Why is KYC a credit risk topic and not just compliance?**
The identity record is the join key to the bureau, to deduplication, and to collections reachability. Weak identifiers produce low bureau hit rates, undetected duplicate exposure and unreachable accounts — which present as model problems and are onboarding problems.

**Distinguish credit risk, first-party fraud and third-party fraud.**
Credit risk: intended to repay, couldn't. First-party fraud: never intended to repay. Third-party fraud: someone else used the identity.

**Why must first-party fraud be stripped from a PD development sample?**
Because it trains the model to predict a behaviour that was never contemplated. The standard proxy for removing it is first-payment and early-payment default.

**What did *SBI v. Rajesh Agarwal* establish, and where does it now sit?**
That a fraud classification, having severe consequences, cannot be made ex parte. The July 2024 Fraud Risk Management Directions now expressly require compliance with natural justice — a reasoned show-cause notice and a fair hearing — before classifying anyone as fraud.

**Give the four decisions inside underwriting, in order.**
Eligibility on policy rules; credit history from the bureau; affordability from income and FOIR; and the scorecard for residual risk.

**Why must those layers stay separate?**
Because if a good score can override a policy rule, you have delegated your risk appetite to a model. A well-run shop can tell you its policy-decline rate and its score-decline rate separately.

**Why do FOIR caps tighten at lower incomes?**
Because the ratio ignores the absolute residual. Someone earning ₹2,00,000 at 50% FOIR keeps ₹1,00,000 to live on; someone earning ₹20,000 keeps ₹10,000. Same ratio, incomparable resilience.

**What is the earliest signal that underwriting discipline is slipping?**
Deviation rate by approving authority, tracked monthly. It appears at origination rather than at month six.

**Penal charges or penal interest?**
Penal charges. Since 1 April 2024, penalty for default must be a charge, not added to the rate, and must not be capitalised — because penal interest compounds on a balance the borrower already cannot service.

**What does the Key Facts Statement exist to do?**
Disclose the all-in annualised cost — the APR — so a 14% loan with a ₹5,000 fee can be compared with a 16% loan with none. A charge not in the KFS cannot be levied.

**Pre-payment charges — state the rule and its date.**
The Pre-payment Charges on Loans Directions, 2025, apply to loans sanctioned or renewed on or after 1 January 2026. No pre-payment charges on floating-rate loans to individuals, and now also to individuals and micro and small enterprises for business purposes.

**Why does that matter to a risk team rather than a conduct team?**
It removes the friction holding good borrowers in place. Balance transfer velocity rises, behavioural life shortens against contractual tenor, the residual book adversely selects, and prepayment modelling becomes a live ECL input.

**Pledge, hypothecation, mortgage — why does the distinction matter?**
Because "secured" is three different loss profiles. Under a pledge the lender already holds the asset. Under hypothecation it must repossess from someone who has it. Under a mortgage it must enforce through a legal process.

**What is the earliest signal in the whole lifecycle?**
The mandate bounce. A NACH presentation failing on the due date is same-day information about an account that won't be an NPA for another ninety days.

**Walk the SMA ladder with dates. EMI due 31 March 2026, unpaid.**
Day-end 31 March: flagged overdue, SMA-0. Day-end 30 April: SMA-1. Day-end 30 May: SMA-2. Day-end 29 June: NPA.

**Three rules about how SMA classification operates.**
It runs at day-end, every day, for the relevant calendar date. It is at borrower level, not account level. And appropriation follows FIFO — oldest dues cleared first.

**When can an NPA be upgraded to standard?**
Only on payment of the **entire** arrears of interest and principal — per the clarification of 12 November 2021. Partial payment doesn't do it, and the DPD count falling below 90 doesn't do it. Restructuring and DCCO cases follow their own instructions.

**Why does that rule explain Document 01's stuck deep buckets?**
Because NPAs leave the book by being paid in full, recovered, sold or written off — rarely by curing. So the pools sit there until someone takes the charge.

**Technical write-off versus waiver.**
A technical write-off removes the asset from the balance sheet; the borrower's liability continues and recovery action continues. A waiver extinguishes the claim. Most Indian write-off headlines are the first.

**Why does collections capacity concentrate in early buckets?**
Because cure probability collapses as the account ages while cost per account rises. A Bucket 1 account is mostly a timing problem; a Bucket 3 account is mostly an ability problem.

**What's wrong with "the fintech takes first loss, so our underwriting can be lighter"?**
That is precisely the structure the DLG framework exists to prevent. The regulated entity remains lender of record, classifies and provisions on its own books, and cannot use the guarantee to justify weaker underwriting.

**What replaced the Fair Practices Code?**
The Responsible Business Conduct Directions, 2025 — parallel sets for banks, NBFCs, AIFIs, RRBs, UCBs and LABs, consolidating the FPC, KFS, penal charges, floating-rate reset, pre-payment charges, gold lending conduct, microfinance protections and DSA/DMA/recovery agent responsibilities.

---
