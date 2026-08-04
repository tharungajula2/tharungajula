---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "03"
volumeSlug: "the-measurement-layer"
volumeTitle: "THE MEASUREMENT LAYER"
order: 0
title: "HOW TO READ THIS DOCUMENT"
slug: "how-to-read-this-document"
sectionNumber: null
part: null
kind: "front"
sourceFile: "CR_03_THE_MEASUREMENT_LAYER.md"
tags: []
hasSayThis: false
wordCount: 973
status: "raw"
section: ""
summary: ""
enriched: false
---

*The instruments. Vintage curves, roll rates, transition matrices, flow analysis, loss curves and the segmentation discipline — the four analyses named in Document 01 §8.2, built properly.*

**As-at date: 29 July 2026.** Tags per Document 00.

---

## HOW TO READ THIS DOCUMENT

Document 01 gave you the book. Document 02 gave you the machine that produces it. This document gives you the instruments you read the machine with — and it is the first document in this set that is mostly **technique** rather than mostly **fact**.

That changes how you should study it. Documents 01 and 02 you read to know things. This one you read to be able to *do* something: given a portfolio and a question, know which cut answers it and which cut will mislead you. Every section here ends in a decision you could actually take.

There is no code in this document. Document 07 handles implementation. What you need first is to understand what each instrument measures, what it hides, and when it lies.

> **The one sentence that organises this document**
>
> You cannot observe credit risk. You can only observe its **shadow** — accounts that have already gone bad — and the entire measurement layer exists to reconstruct a forward-looking quantity from a backward-looking observation, on a portfolio whose composition is changing underneath you while you do it.

---

## CORRECTIONS AND CLOSURES SINCE DOCUMENT 00

Three open items from earlier documents have now resolved, and one of them **materially updates Document 01 §6**. Read this before anything else in this document.

### ✅ Closed — the ECL framework has a name, a number and a date 

The **Reserve Bank of India (Commercial Banks – Asset Classification, Provisioning and Income Recognition) Directions, 2026** — circular RBI/DOR/2026-27/398, dated **27 April 2026**, effective **1 April 2027**. Issued after draft directions of 7 October 2025, together with a statement of feedback received.

Scope: commercial banks excluding small finance banks, payments banks and local area banks, plus SBI and the corresponding new banks. Co-operative banks are outside it. All-India financial institutions get their own separate directions.

The mechanics track IFRS 9: the three-stage model, the 12-month versus lifetime ECL split, a **rebuttable 30-days-past-due presumption for significant increase in credit risk**, and the 90-day line retained for credit impairment. India-specific additions: **product-wise prudential floors on Stage 1 and Stage 2 provisions**, applied at product level; Stage 3 floors keyed to product type and duration of default and set so ECL cannot produce a lower provision than the existing IRAC schedule; mandatory board-level model governance, model inventories and structured validation.

The transitional adjustment — the difference between ECL required at 1 April 2027 and provisions held under the old norms at 31 March 2027 — is added back to CET1 and amortised, with the glide running to 31 March 2031. That reconciles with the two glide paths Document 00 flagged.

**And the sentence that makes this document necessary:** the directions name ECL's components as **segmentation, PD, LGD and EAD**. Segmentation is a first-class regulatory requirement, not a modelling preference. §8 is about that.

### ✅ Closed — Basel III Master Circular superseded 

The **RBI (Commercial Banks – Capital Charge for Credit Risk – Standardised Approach) Directions, 2026**, issued the same day, 27 April 2026, effective 1 April 2027. This isolates credit risk capital from the wider capital adequacy framework and rewrites how RWA is computed under the standardised approach — described by practitioners as India's transposition of the Basel III endgame.

### ⚠️ **This updates Document 01 §6** — the risk weights change from 1 April 2027

Document 01 left the 125% consumer credit and 150% credit card weights tagged `[VERIFY]`. Here is the resolution.

**Until 31 March 2027, the November 2023 position stands** — consumer credit 125%, bank credit card receivables 150%. Document 01 §6 remains correct as a description of the FY26 book.

**From 1 April 2027, the taxonomy is rebuilt:**

| Exposure | New treatment |
|:--|:--|
| Regulatory retail portfolio | **75%** — with eligibility widened, turnover threshold to ₹500 crore from ₹50 crore and exposure cap to ₹10 crore from ₹7.5 crore |
| Personal loans, as "other retail" | **125%** — excluding education loans meeting regulatory retail criteria, transactor credit card receivables, loans fully secured by real estate, vehicle loans and microfinance loans |
| **Transactor** credit card receivables | **75%** — down from 150% |
| **Revolver** credit card receivables | **125%** — down from 150% |
| Home loans and loan against property | Reductions, with treatment banded by ticket size |

📘 **A transactor is an obligor who has repaid the balance in full by the due date for the previous twelve months.** Everyone else is a revolver.

🔴 **Why this belongs in *this* document rather than the capital document, and why it is the best single illustration of its thesis.** The transactor/revolver split is **behavioural classification, not product classification.** To apply it, a bank must maintain a rolling twelve-month, customer-level ledger of repayment-in-full — and a single day of DPD resets the clock. New customers default to revolver until twelve months of history accrues.

**A capital requirement now depends directly on a measurement capability.** A bank that cannot compute that ledger accurately cannot claim the 75% weight, and will carry 125% on customers who genuinely qualify. Measurement infrastructure has become a balance-sheet item. That is the entire argument of this document, handed to you by the regulator.

### Still open

- The exact current name of the **NBFC Ind AS prudential floor** circular after consolidation.
- **Recovery-agent Second Amendment Directions** — draft, proposed 1 July 2026, finalisation unconfirmed (Document 02 §10.4).
- **KYC periodic-updation backstop of 30 June 2026** — expired, consequence unconfirmed (Document 02 §3.3).
- ULI rollout scale; RDCL issuance volumes; SARFAESI thresholds for NBFCs and HFCs.

---
