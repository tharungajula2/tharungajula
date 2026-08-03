---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 7
title: "DOCUMENT 06 — ECL, IFRS 9 AND CAPITAL"
slug: "7-document-06-ecl-ifrs-9-and-capital"
sectionNumber: "7"
part: null
kind: "interrogation"
sourceFile: "CR_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 1081
status: "raw"
section: "§7"
summary: ""
enriched: false
---

# §7 · DOCUMENT 06 — ECL, IFRS 9 AND CAPITAL

**Name the instrument, its number, its date and its effective date.**
RBI (Commercial Banks – Asset Classification, Provisioning and Income Recognition) Directions, 2026 — RBI/DOR/2026-27/398, dated 27 April 2026, effective **1 April 2027**.

**Who is in scope and who isn't?**
Commercial banks excluding small finance banks, payments banks and local area banks, plus SBI and the corresponding new banks. Co-operative banks are outside. AIFIs have separate directions.

**Why does India's SA-only choice matter for everything you've learned?**
Because there's no IRB option, **your PD and LGD models don't touch regulatory capital.** They drive provisions, pricing and internal decisions; RWA comes from a prescribed table.

**Give the three stages and their allowances.**
Stage 1, no significant increase in credit risk — 12-month ECL. Stage 2, SICR but not credit-impaired — lifetime ECL. Stage 3, credit-impaired — lifetime ECL, and interest accrues on the net carrying amount.

**What's the single most common conceptual error about SICR?**
Treating it as an absolute test. It's **relative to origination**. A loan originated at 8% and now at 10% may not have suffered a SICR; one originated at 0.3% and now at 1.2% almost certainly has.

**And the operational consequence?**
You must retain each account's origination-date PD forever. A bank that didn't cannot do quantitative SICR at all.

**Name the SICR triggers.**
Quantitative: a rebuttable presumption at 30 days past due, and a significant increase in lifetime PD since initial recognition. Qualitative: restructuring, watchlist placement, rating downgrade, adverse outlook, fraud flags.

**Absolute or relative threshold for the PD increase?**
Most use both — a relative test with an absolute floor. Absolute alone moves nothing in a prime book; relative alone misses deterioration in an already-weak one.

**Stage 2 to Stage 1 versus Stage 3 to Stage 1 — what's the difference?**
Stage 2 to Stage 1 is a model determination and is symmetric. Stage 3 to Stage 1 is a rule and requires the entire arrears.

**What drives provision volatility most under ECL?**
Stage 2 migration, not Stage 3 and not the parameter estimates. Each migrating account's allowance multiplies by roughly 2.7 times, more for long tenor.

**Three scenarios: upside 70 at 10%, baseline 100 at 60%, downside 180 at 30%. Compute and interpret.**
7 + 60 + 54 = **₹121 crore**, against a ₹100 crore baseline — 21% higher. Because losses are **convex** in the macro variable, the average of the ECLs exceeds the ECL of the average scenario.

**So what does a bank running a single central forecast do?**
Systematically under-provisions, and worst in its most stressed segments, where convexity is greatest.

**Why are Indian macro overlays weakly evidenced?**
The only recent downturn is the pandemic, and it was so overlaid with moratoria and restructuring that a model fitted to it learns the policy response rather than the credit relationship.

**What makes an overlay defensible?**
Quantify it separately, state the trigger that would release it, and review it every period. One that persists unchanged for eight quarters is an unacknowledged model deficiency.

**State the EIR rules.**
For instruments originated on or after 1 April 2027, ECL uses the EIR determined at initial recognition; POCI assets use the credit-adjusted EIR. Opening ECL may use the contractual rate transitionally, with full migration to EIR by **31 March 2030**.

**State the two glide paths and don't merge them.**
EIR migration to **31 March 2030**. Provisioning and capital impact smoothing to **31 March 2031**.

**What does EIR do beyond discounting?**
It's an income recognition method — fees and transaction costs amortise over expected life. A processing fee stops being day-one income, which matters most for fast-growing lenders.

**What is a prudential floor and what does it signal?**
A minimum provision regardless of what the model says — Stage 1 around 0.40%, Stage 2 a minimum of 1%, Stage 3 by asset class and default duration, applied at product level. It's a statement about how far a bank may provision down on unvalidated models, not a claim about risk.

**Work the floor. Prime home loans, ₹10,000 crore Stage 1, PD 0.35%, LGD 20%.**
Modelled ECL 0.07% — ₹7 crore. Floor at 0.40% — ₹40 crore. **The floor binds at about 5.7 times the model.**

**And unsecured at PD 4%, LGD 85%?**
3.40% — ₹340 crore. The model binds comfortably.

**What follows for pricing?**
Use modelled expected loss for pricing and allocation; use the floor for reporting. Pricing off floored provisions mis-prices your best segments.

**Explain the transitional adjustment.**
The difference between ECL required at 1 April 2027 and provisions held at 31 March 2027, added back to CET1 and spread over four years to 31 March 2031 — to avoid a system-wide capital cliff from an accounting change.

**What does the transition not fix?**
Ongoing volatility. From April 2027 provisions are permanently model-driven. **The structural change is the variance, not the level.**

**Give the retail risk weights from 1 April 2027.**
Regulatory retail 75%, with the turnover threshold widened to ₹500 crore and the exposure cap to ₹10 crore. Personal loans as other retail 125%. Transactor credit cards 75%, revolvers 125% — down from a flat 150%.

**Define a transactor.**
An obligor who repaid the balance in full by the due date for the previous twelve months. Everyone else is a revolver, and a single day of DPD resets the clock.

**Why is that a measurement problem?**
It requires a rolling twelve-month customer-level repayment-in-full ledger. A bank that can't compute it carries 125% on customers who qualify for 75%.

**Housing risk weights from April 2027?**
Linked to LTV **and** the number of housing loans the borrower holds at banking-system level. First two loans 20–40% across LTV buckets; third onward 30–60%. Plus 5 percentage points where total outstanding is ₹3 crore or above. Residential real estate NPAs fixed at 100%.

**Why is that the sentence to have ready about the new capital directions?**
Because the system-wide housing loan count isn't in the bank's own systems — it's a bureau lookup. **The risk weight is now a function of data the bank must go and get, keep current, and evidence to a supervisor.**

**A ₹100 crore additional provision. What does it cost in capital?**
₹100 crore of CET1 straight off, against RWA relief of the risk weight applied to ₹100 crore — say ₹75 crore of RWA at 75%, releasing about ₹6.75 crore at a 9% requirement. **Net cost roughly ₹93 crore.** The numerator effect dominates about fourteen to one.

---
