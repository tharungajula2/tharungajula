---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "01"
volumeSlug: "the-indian-retail-book"
volumeTitle: "THE INDIAN RETAIL BOOK"
order: 8
title: "HOW THIS BOOK IS ACTUALLY MEASURED"
slug: "8-how-this-book-is-actually-measured"
sectionNumber: "8"
part: null
kind: "narrative"
sourceFile: "CR_01_THE_INDIAN_RETAIL_BOOK.md"
tags: []
hasSayThis: false
wordCount: 505
status: "raw"
section: "§8"
summary: ""
enriched: false
---

# §8 · HOW THIS BOOK IS ACTUALLY MEASURED

Four measurement systems run over the same loans and produce four different numbers. Confusing them is the most common technical error in this field.

## 8.1 The four systems

| System | Owner | Unit | Trigger | Netting |
|:--|:--|:--|:--|:--|
| **PAR** | Credit bureaus | Portfolio value in DPD buckets | Pure days past due | None — write-offs may persist |
| **NPA / GNPA** | RBI prudential norms | Advances | 90 days past due, with product-specific rules | Measured after write-off |
| **Ind AS / IFRS 9 stages** | Accounting standard | Exposure | Stage 2 on significant increase in credit risk; Stage 3 on credit-impairment | Expected credit loss, forward-looking |
| **Basel EL** | Capital framework | Exposure at default | PD × LGD × EAD, through-the-cycle | Regulatory, not accounting |

📘 The single sentence that keeps these straight: **PAR describes what is overdue, NPA describes what is classified, staging describes what is expected, and Basel EL describes what must be capitalised.** Four questions, four answers, one loan.

`[FROM 01-04-2027]` The **expected credit loss framework for banks** is the change that will dominate Indian credit risk work for the next several years, with the transitional glide paths noted in Document 00 — EIR migration to 31 March 2030 and provisioning-impact smoothing to 31 March 2031. Document 06 handles it in full; you need only know here that the measurement regime for banks is about to move from incurred loss to expected loss, and that this is why Ind AS staging vocabulary is already the language of the market.

## 8.2 The four analyses a retail credit risk team actually runs

Everything in §1 to §7 exists to feed these four. Document 03 builds them properly; this is the orientation.

**1. Vintage analysis.** Group loans by origination month, track cumulative delinquency by months-on-book. The only technique that separates *underwriting quality* from *portfolio seasoning*. A rising overall PAR in a fast-growing book may simply be an ageing mix; vintage curves tell you whether the loans you wrote last quarter are worse than the ones you wrote a year ago. **If you learn one thing in retail portfolio analytics, learn this.**

**2. Roll-rate and flow analysis.** The probability that an account in one DPD bucket moves to the next next month. It converts a static snapshot into a forward-looking loss estimate and it is what makes §5.3's observations actionable — a stable PAR 180+ next to falling early buckets is a roll-rate statement.

**3. Segment cuts.** Product × ticket band × lender type × geography × channel. §1.2 showed the ticket gradient; §2 showed lender and geographic dispersion. The job is finding the cell where growth and delinquency are both above average — Andhra Pradesh in housing, Bihar in personal loans, NBFC auto sourcing.

**4. Early warning.** PAR 1–30, bounce rates, utilisation drift on revolving lines, bureau enquiry velocity, consumer durable origination as a leading indicator for personal loans.

---
