---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "08"
volumeSlug: "the-analysts-desk"
volumeTitle: "THE ANALYST'S DESK"
order: 7
title: "MODEL DOCUMENTATION AND VALIDATION"
slug: "7-model-documentation-and-validation"
sectionNumber: "7"
part: null
kind: "narrative"
sourceFile: "CR_08_THE_ANALYSTS_DESK.md"
tags: []
hasSayThis: false
wordCount: 411
status: "raw"
section: "§7"
summary: ""
enriched: false
---

# §7 · MODEL DOCUMENTATION AND VALIDATION

## 7.1 The model document

Required under the ECL Directions' governance provisions and, pending finalisation, the draft Model Risk Management Guidance of June 2026 (Document 04's opening). Contents:

- **Purpose and use** — what decision this model supports, and explicitly what it must not be used for.
- **Data** — sources, period, exclusions with counts and rationale, quality assessment.
- **Target definition** — and the evidence for choosing it (Document 04 §2.1).
- **Methodology** — transformations, binning, selection, estimation, with alternatives considered and rejected.
- **Performance** — in-time, out-of-time, by segment.
- **Calibration** — and the Hosmer–Lemeshow direction stated correctly (Document 04 §10.2).
- **Limitations** — stated by the developer, not left for the validator to find.
- **Monitoring plan** — metrics, thresholds, escalation.
- **Fairness assessment** (Document 04 §6.2).

🔴 **The limitations section is the one that signals professional maturity.** A model document with no stated limitations tells a validator either that the developer did not look or that they are hiding something. **Write your own limitations before someone else writes them for you** — it is also, practically, the fastest way to shorten a validation cycle.

## 7.2 The validation report

Independent — a genuine second line, not the developer's colleague. Covers conceptual soundness, data quality, outcomes analysis and backtesting, benchmarking against alternatives, implementation testing (**does the production code compute what the document describes?**), and ongoing monitoring adequacy. Findings are rated and tracked to closure.

⚠️ **Implementation testing is the most-skipped and most-productive step.** A correct model incorrectly implemented is a wrong model, and the discrepancy is invisible in every performance statistic because both the document and the production system are internally consistent. **Score a sample of live cases by hand from the points table and compare against what the system produced.** It takes an afternoon and it finds real defects more often than anyone expects.

## 7.3 The model inventory

Every model, its owner, its tier, its last validation, its next validation, its monitoring status, its open findings.

📘 Under the June 2026 draft, "model" is defined broadly enough to include scoring algorithms, rule engines, AI and ML systems, **and material spreadsheets that influence business decisions**. `[DRAFT — finalisation unconfirmed]`

That last category is where most institutions discover an inventory problem. **The spreadsheet that computes a pricing grid, maintained by one person, unversioned and unvalidated, is in scope.** Finding those is genuinely useful work and nobody wants to do it.

---
