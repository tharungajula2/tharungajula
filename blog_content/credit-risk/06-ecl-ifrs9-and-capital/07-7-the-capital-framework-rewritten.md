---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "06"
volumeSlug: "ecl-ifrs9-and-capital"
volumeTitle: "ECL, IFRS 9 AND CAPITAL"
order: 7
title: "THE CAPITAL FRAMEWORK, REWRITTEN"
slug: "7-the-capital-framework-rewritten"
sectionNumber: "7"
part: null
kind: "narrative"
sourceFile: "CR_06_ECL_IFRS9_AND_CAPITAL.md"
tags: []
hasSayThis: false
wordCount: 957
status: "raw"
section: "§7"
summary: ""
enriched: false
---

# §7 · THE CAPITAL FRAMEWORK, REWRITTEN

## 7.1 The instrument 

**RBI (Commercial Banks – Capital Charge for Credit Risk – Standardised Approach) Directions, 2026**, issued **27 April 2026**, effective **1 April 2027** — the same day as the ECL Directions, which is not a coincidence.

Under the earlier regime credit risk capital sat inside a wider capital adequacy framework. The new directions **isolate and standardise it**, adding explicit due diligence requirements, alignment with internal risk assessment, and enhanced documentation. Practitioners describe it as India's transposition of the Basel III endgame.

And per §1: **India remains Standardised-Approach only.** There is no IRB option, so the global debate about the 72.5% output floor on internal models does not arise here.

## 7.2 Retail

| Exposure | From 01-04-2027 |
|:--|--:|
| **Regulatory retail portfolio** | **75%** |
| Personal loans as "other retail" | **125%** |
| **Transactor** credit card receivables | **75%** |
| **Revolver** credit card receivables | **125%** |

**Regulatory retail eligibility widened substantially**: the turnover threshold rises to **₹500 crore from ₹50 crore**, and the exposure cap to **₹10 crore from ₹7.5 crore**. `[VERIFY — the granularity criterion I have not confirmed]`

**The 125% "other retail" bucket excludes**: education loans meeting regulatory retail criteria, transactor credit card receivables, loans fully secured by real estate, vehicle loans, and microfinance loans.

📘 **Read that exclusion list against Document 01 §6's November 2023 list and the continuity is striking.** The regulator has consistently ring-fenced housing, education, vehicle and microfinance from the punitive weight, and has consistently held the line at 125% on unsecured personal credit. **The message has not changed across three years and two frameworks: unsecured consumption credit is the exposure the RBI wants capitalised.**

## 7.3 The transactor split, revisited

Document 03's opening established this and it is worth restating in its capital home. A **transactor** repaid the balance in full by the due date for the previous twelve months; everyone else is a **revolver**. Cards move from a flat 150% to 75% or 125% depending on behaviour.

🔴 **Behavioural classification, requiring a rolling twelve-month customer-level repayment-in-full ledger, reset by a single day of DPD, with new customers defaulting to revolver until history accrues.** A bank that cannot compute it carries 125% on customers who qualify for 75%.

## 7.4 Housing — the biggest structural change

Risk weights for individual housing loans are now linked to **two** things: the **loan-to-value ratio**, and the **number of housing loans the borrower holds at the banking-system level**.

| Borrower's housing loan count | Risk weight range across LTV buckets |
|:--|:--|
| First and second housing loan | **20% – 40%** |
| Third onward, excluding fully repaid loans | **30% – 60%** |

Plus an additional **5 percentage points** where the total loan outstanding is **₹3 crore or above**.

Also: **claims secured by residential property where repayment comes from the economic activity financed** are weighted by counterparty — an individual qualifying loan at 75%, otherwise 125%, MSME at 85%. And **NPA treatment is aligned to the Stage 3 concept**, with a concession withdrawn: **residential real estate NPAs are now fixed at 100%.**

✅ **And here the whole set converges.** To apply this table, a bank must know **how many housing loans its borrower holds across the entire banking system.** That is not in its own core banking system. **It is a bureau lookup.**

So: a capital requirement now depends on bureau data quality and freshness — the same bureau infrastructure whose reporting cadence moved to four reference dates a month on **1 July 2026** (Document 01 §7.2, Document 03 §8.4). Between the transactor ledger and the housing loan count, **two of the largest retail risk-weight determinations in the new framework are measurement problems before they are capital problems.**

🔴 That is the sentence to have ready when someone asks what the new capital directions mean in practice. **Not "risk weights changed." Rather: the risk weight is now a function of data the bank must go and get, keep current, and be able to evidence to a supervisor.**

## 7.5 The rest, briefly

- **Corporate**: greater rating sensitivity. BBB-rated exposures move to **75% from 100%**. The penal threshold for large unrated exposures rises to **₹500 crore from ₹200 crore**.
- **Off-balance sheet**: credit conversion factors tightened — which is Document 05 §6 arriving in the capital framework, and it means undrawn commitments cost more capital than before.
- **Equity**: a three-way split — general equity exposures **250%**, speculative unlisted equity **400%**, subordinate debt and other capital instruments **150%**.
- **Funds and AIFs**: the flat approach replaced by a hierarchy of look-through, mandate-based and fallback deduction treatments.
- **Credit risk mitigation**: recognised only subject to **legal certainty** — documentation binding on all parties and enforceable in all relevant jurisdictions — with prescribed haircuts. Document 02 §7's point that an unenforceable claim has an LGD of 100% now has a capital analogue: an unenforceable security has no capital value either.

🧮 **Worked, illustratively.** A ₹50 lakh first housing loan against a property valued at ₹80 lakh — LTV 62.5%, below the ₹3 crore threshold.

If the applicable weight moves from an illustrative **35%** under the old framework to **30%** under the new LTV table, RWA falls from ₹17.5 lakh to ₹15.0 lakh. At a 9% capital requirement that is roughly **₹22,500 of capital released on a single loan** — about 14%. `[VERIFY — the specific LTV bucket boundaries; the arithmetic is the point, not the rates.]`

Scale that across a ₹44 lakh crore national housing book (Document 01 §1.1) and the direction is clear: **the new framework releases capital in housing and holds it in unsecured consumption.** Which is, once again, exactly the message of the last three years.

---
