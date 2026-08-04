---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 9
title: "DOCUMENT 08 — THE ANALYST'S DESK"
slug: "9-document-08-the-analysts-desk"
sectionNumber: "9"
part: null
kind: "interrogation"
sourceFile: "CR_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 585
status: "raw"
section: "§9"
summary: ""
enriched: false
---

# §9 · DOCUMENT 08 — THE ANALYST'S DESK

**Name the three modes of the job and which one makes your reputation.**
Run, Build, Answer. Answer — the fast, correct, well-framed response to a hard question. The monthly pack is expected; that isn't.

**What is the most expensive data failure in a lending institution?**
Holding only current-state delinquency instead of monthly snapshots. Without point-in-time history there's no vintage curve, no transition matrix, no backtest and no stability index — and it can't be reconstructed later.

**Why is modelling with current attributes against historical outcomes dangerous?**
Silent leakage. The underwriting decision used the old value; querying today gives the new one. It produces suspiciously good models.

**Why must your total tie to finance's total?**
Because if the total is wrong the composition is probably wrong too, and every subsequent risk number gets questioned — correctly.

**Name the five numbers for a credit committee.**
Gross flow into the 1–30 bucket with its terminal-roll conversion; the 1–30 to 31–60 roll by segment; MOB 6 cumulative 90+ for the three newest mature cohorts by channel; approval and deviation rate by authority; PSI and CSI on the live scorecard.

**What do CIMS and DAKSH do?**
CIMS is the RBI's returns platform, with statutory and supervisory returns migrated in phases through 2023–2025; it also carries digital lending app reporting. DAKSH is the advanced supervisory monitoring system, carrying payment fraud reporting through CPFIR.

**Give the five-sentence finding structure.**
What changed. How much it matters in money. Why. What that means. What you recommend and what you need.

**Which sentence do people skip and why does it cost them?**
The money sentence. "1.9% to 2.4%" sounds small; "₹190 crore of additional annual NPA formation" does not.

**Apply the "so what" test.**
If this number moved the other way, would anyone do anything differently? If not, it's context, not a finding — and a pack full of unactionable numbers trains the room to stop reading it.

**Give the investigation order for a delinquency spike.**
Rule out artefacts. Check the numerator in rupees. Cut by origination month at common MOB to separate cohort from flow. Segment — sourcing partner first. Read the shape by MOB. Cross-check approval, deviation, PSI and CSI. Then quantify and recommend.

**Why never start with segment cuts?**
Because you may be chasing a denominator effect, a seasonality effect or a data artefact, and you'll find a spurious segment story if you look for one.

**Aggregate deterioration — what is it usually?**
A small number of identifiable, addressable pockets. The aggregate is the alarm, not the finding.

**What does a missing limitations section in a model document tell a validator?**
Either the developer didn't look or they're hiding something. Write your own limitations first.

**Which validation step is most skipped and most productive?**
Implementation testing. A correct model wrongly implemented is invisible in every performance statistic, because document and system are each internally consistent. Score a sample by hand from the points table and compare.

**How do you present uncertainty without becoming useless?**
Point estimate, range, driver, trigger. "Central case 3.2%, plausible range 2.6 to 4.5, width driven by LGD where we have 140 completed workouts, and if the 1–30 roll exceeds 3% for two months I'd move to the upper half."

**Translate "PSI 0.31" for a board.**
We are using a tool built for a different market.

**What do you do in your first ninety days?**
Map, data, reproduce, one finding. And do not build a model in month one.

---
