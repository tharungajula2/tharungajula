---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "08"
volumeSlug: "the-analysts-desk"
volumeTitle: "THE ANALYST'S DESK"
order: 6
title: "THE INVESTIGATION PLAYBOOK"
slug: "6-the-investigation-playbook"
sectionNumber: "6"
part: null
kind: "narrative"
sourceFile: "CR_08_THE_ANALYSTS_DESK.md"
tags: []
hasSayThis: false
wordCount: 510
status: "raw"
section: "§6"
summary: ""
enriched: false
---

# §6 · THE INVESTIGATION PLAYBOOK

A worked diagnosis, in order. This sequence is the most transferable thing in this document.

**The trigger.** The monthly pack shows personal loan **PAR 31–90 up from 1.9% to 2.4%.**

### Step 1 — Is it real?

Before anything else, rule out artefacts.

- Did the **book shrink**? A falling denominator raises a ratio with no new stress (Document 03 §2.2). **Check the rupee numerator.**
- Did the **DPD calculation** or a system change? Ask.
- Did a **reporting cadence** change? Document 03 §8.4 — from 1 July 2026 bureau data refreshes four times a month, and any velocity-based attribute or bureau-sourced delinquency view changes meaning at that boundary.
- Is it **seasonality**? Document 02 §2.4 — check the same month last year, not just last month.

### Step 2 — Numerator or denominator?

Decompose the ratio. If the numerator in rupees is flat and the ratio rose, the story is about the denominator and there is no credit finding.

### Step 3 — Cohort or flow?

Cut delinquency **by origination month at a common months-on-book**.

- **Concentrated in recent cohorts** → underwriting or sourcing. Continue to Step 4.
- **Spread evenly across all cohorts** → collections or environment. Continue to Step 6.

This single cut answers the question everyone in the room is actually arguing about, and it should be the first chart you produce.

### Step 4 — Which segment?

Cut the affected cohorts, in this order of usual yield: **sourcing partner**, score band, ticket band, geography, deviation flag. Document 03 §3.4.

### Step 5 — Read the shape

Within the affected segment, at which MOB does it appear?

- **MOB 1–3** → first-payment and early-payment default → **fraud or channel compromise** (Document 02 §4.1).
- **MOB 6+** → genuine credit deterioration.

🔴 This distinction determines who owns the problem and what the fix is, and getting it wrong sends the whole organisation in the wrong direction for a quarter.

### Step 6 — Cross-check the front end

- **Approval rate** and **deviation rate** for the affected origination months (Document 02 §6.1). Did discipline slip?
- **PSI and CSI** — did the applicant population shift, and which characteristic moved (Document 03 §8.3)?
- **Score distribution** of the affected cohorts against the development sample.

### Step 7 — Quantify and recommend

Convert to rupees through the terminal roll (Document 03 §4.3). Then the five sentences of §5.2.

✅ **The illustrative resolution:** the rise was concentrated in one DSA, in two consecutive origination months, appearing at MOB 2–3, in cohorts whose deviation rate was double the portfolio average. That is not a credit cycle. **That is a sourcing partner writing business the policy would have declined, approved through overrides, and it stops with a phone call rather than with a model rebuild.**

📘 **The general lesson, and it is Document 02 §1's upstream principle arriving in practice:** most "portfolio deterioration" resolves, on investigation, into a small number of identifiable, addressable pockets. **The aggregate is almost never the finding. The aggregate is the alarm.**

---
