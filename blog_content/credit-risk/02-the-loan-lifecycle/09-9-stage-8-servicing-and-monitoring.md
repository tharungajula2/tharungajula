---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "02"
volumeSlug: "the-loan-lifecycle"
volumeTitle: "THE LOAN LIFECYCLE"
order: 9
title: "STAGE 8 — SERVICING AND MONITORING"
slug: "9-stage-8-servicing-and-monitoring"
sectionNumber: "9"
part: null
kind: "narrative"
sourceFile: "CR_02_THE_LOAN_LIFECYCLE.md"
tags: []
hasSayThis: true
wordCount: 896
status: "raw"
section: "§9"
summary: ""
enriched: false
---

# §9 · STAGE 8 — SERVICING AND MONITORING

## 9.1 The decision

Is this account performing, and is it about to stop? Everything here is about **detecting deterioration before it becomes classification.**

## 9.2 The SMA framework 

📘 **SMA — Special Mention Account.** The RBI's mandatory pre-NPA warning classification. Applies to **all loans including retail, irrespective of exposure size**, with agricultural advances governed separately by crop-season norms.

| Classification | Principal or interest overdue for |
|:--|:--|
| **SMA-0** | 1 – 30 days |
| **SMA-1** | 31 – 60 days |
| **SMA-2** | 61 – 90 days |
| **NPA** | more than 90 days |

**Three rules about how this actually operates, all of which are examinable:**

**1. It runs at day-end, every day.** An account is flagged overdue as part of the **day-end process for the due date**, irrespective of when that process is run. Classification into SMA or NPA is likewise done at day-end, and the SMA or NPA date is the calendar date for which that process ran. This ended the older practice of month-end or quarter-end recognition, and it is why the RBI's November 2021 clarification is a landmark rather than a footnote.

**2. Classification is at borrower level, not account level.** Overdue in any one facility results in the **borrower** being reported as SMA or NPA. A borrower with a clean home loan and a defaulted personal loan is a defaulted borrower.

**3. Appropriation follows FIFO.** The oldest outstanding dues are cleared first, which is what determines the age of the oldest unpaid amount and therefore the classification.

🧮 **Worked — the day-end walk, using the RBI's own illustration structure.**

An EMI falls due on **31 March 2026** and is not paid.

| Day-end process for | Status |
|:--|:--|
| 31 March 2026 | Flagged overdue → **SMA-0** |
| 30 April 2026 | **SMA-1** |
| 30 May 2026 | **SMA-2** |
| 29 June 2026 | **NPA** |

Note that the borrower is an NPA on a specific, computable calendar date — not "in Q1" and not "after three months." Being able to walk this table cold, with dates, is a standard test.

## 9.3 Floating-rate resets 

Under the August 2023 instruction, now carried in the RBC Directions, when a benchmark rate moves on an EMI-based floating-rate personal loan the lender must give the borrower the option to switch to a fixed rate, and must offer a choice between **increasing the EMI, extending the tenor, or a combination** — with the implications communicated clearly and elongation not permitted to result in negative amortisation.

📘 **The risk consequence.** Tenor extension is the path of least resistance for a borrower and it is where hidden risk accumulates: a book that has absorbed a rate cycle through tenor elongation has quietly lengthened its behavioural life, raised its lifetime interest burden and increased its sensitivity to the next shock — **without any of that appearing in the delinquency numbers.** A monitoring pack that does not track cumulative tenor extension is missing a real exposure.

## 9.4 The monitoring stack

Ordered by how early the signal arrives:

| Signal | Lead time | What it tells you |
|:--|:--|:--|
| **NACH / mandate bounce** | Same day | Liquidity failure at the due date |
| **Bureau refresh** — now four times a month | Days | Borrower has taken new debt, or is deteriorating elsewhere |
| **Enquiry velocity** | Days | Borrower is seeking credit — often distress |
| **Utilisation drift** on revolving lines | Weeks | Card or overdraft utilisation climbing toward limit |
| **SMA-0** | 1–30 days | Overdue, formally |
| **SMA-1 / SMA-2** | 31–90 days | Hardening |
| **NPA** | 90+ days | Too late to be a warning |

⚠️ **This is where Document 01 §7.2 becomes operational.** The move to weekly bureau reporting from 1 July 2026 upgrades the second and third rows of that table materially — a lender now learns that its performing borrower has taken debt elsewhere within days rather than up to a fortnight. It also, as flagged, changes the meaning of every velocity-based bureau attribute in every model built before that date.

## 9.5 Behavioural scorecards

The model that lives at this stage. Where an application scorecard uses what was known at origination, a **behavioural scorecard** uses what the account has done since — payment pattern, utilisation, bounce history, bureau refresh — to re-estimate default probability on the live book.

Its uses are limit management, cross-sell eligibility, pre-emptive collections targeting, and it is a direct input to Ind AS staging, because a significant increase in credit risk is precisely what a behavioural model is built to detect. Document 05 handles it properly.

**► SAY THIS**
> "Monitoring is a race between the lender's information and the borrower's deterioration, and the SMA framework is the regulatory floor, not the tool. SMA runs at day-end every day, at borrower level, with FIFO appropriation — so an account with an EMI due 31 March becomes SMA-0 that night and an NPA at day-end on 29 June, on a computable date. But by SMA-1 you're already late. The signals I'd manage from are mandate bounce, which is same-day, and bureau refresh, which since 1 July 2026 arrives four times a month instead of twice."

---
