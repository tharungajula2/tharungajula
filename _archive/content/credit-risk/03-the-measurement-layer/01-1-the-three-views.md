---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "03"
volumeSlug: "the-measurement-layer"
volumeTitle: "THE MEASUREMENT LAYER"
order: 1
title: "THE THREE VIEWS"
slug: "1-the-three-views"
sectionNumber: "1"
part: null
kind: "narrative"
sourceFile: "CR_03_THE_MEASUREMENT_LAYER.md"
tags: []
hasSayThis: true
wordCount: 488
status: "raw"
section: "§1"
summary: ""
enriched: false
---

# §1 · THE THREE VIEWS

Almost every disagreement in a credit risk meeting is two people looking at the same portfolio through different instruments without saying which. There are exactly three, and naming them is half the skill.

| View | Question it answers | Instrument | Unit of analysis |
|:--|:--|:--|:--|
| **Cohort** | Is the business we are *writing* getting better or worse? | Vintage curves | Origination month |
| **Flow** | What is *happening right now*, and what does it imply? | Roll rates, transition matrices | Movement between states |
| **Stock** | What do we *hold* today, and what is it worth? | Snapshot delinquency, IRAC classification, provisions | Balance at a point in time |

📘 **The rule: the stock view can never diagnose, only report.** A snapshot delinquency number is a fact about today that confounds three things — the quality of what you wrote, how long it has had to go bad, and how much new business has diluted it. It cannot separate them. Every genuine diagnostic question requires the cohort view or the flow view.

🧮 **The worked example that proves it, and it is the most important arithmetic in this document.**

A lender's book at 31 March:

- **Seasoned portfolio**: ₹1,000 crore written more than a year ago, delinquency **4.0%** — ₹40 crore.
- **New business**: ₹600 crore written in the last six months, delinquency **0.5%** — ₹3 crore, because these accounts have barely had time to miss a payment.

Aggregate: ₹43 crore on ₹1,600 crore = **2.7%**.

A year earlier the same lender was at 4.0% on the seasoned book alone. The portfolio delinquency has "improved" from 4.0% to 2.7%.

**Nothing improved.** Underwriting could have deteriorated sharply and this number would still have fallen, because a fast-growing book is continuously diluted by accounts too young to default. This is the **growth-dilution effect**, and it is the single most common way a retail portfolio's true condition is concealed — usually without anyone intending to conceal it.

⚠️ Now read Document 01 §1.1 again with this in mind. Gold loans grew 50.4% and show a PAR 31–180 of 1.2%. Consumer durables grew 20.8% at 1.7%. **Both numbers are flattered by growth, and the faster the growth the more flattered they are.** The correct response to any improving delinquency ratio in a fast-growing book is: *show me the vintage curves.*

**► SAY THIS**
> "I'd want to know which view someone is quoting before I react to a number. A snapshot delinquency ratio confounds underwriting quality, seasoning and growth dilution, and it can't separate them — in a book growing 50% a year, delinquency can fall while underwriting deteriorates, purely because new accounts haven't had time to go bad. So for diagnosis I'd go to vintage curves for the cohort question and roll rates for the flow question, and treat the snapshot as reporting rather than analysis."

---
