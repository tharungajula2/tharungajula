---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "03"
volumeSlug: "the-measurement-layer"
volumeTitle: "THE MEASUREMENT LAYER"
order: 4
title: "ROLL RATES AND THE TRANSITION MATRIX"
slug: "4-roll-rates-and-the-transition-matrix"
sectionNumber: "4"
part: null
kind: "narrative"
sourceFile: "CR_03_THE_MEASUREMENT_LAYER.md"
tags: []
hasSayThis: true
wordCount: 1003
status: "raw"
section: "§4"
summary: ""
enriched: false
---

# §4 · ROLL RATES AND THE TRANSITION MATRIX

Vintage analysis is the cohort view and it is slow. The flow view is fast, and this is it.

## 4.1 What a roll rate is

📘 **Roll rate.** The proportion of accounts (or balance) in a given delinquency bucket at the start of a period that has moved to the next bucket by the end of it. Computed monthly in retail, because the buckets themselves are 30-day units.

The complementary quantity is the **cure rate** — the proportion that moved back toward current. And the remainder **stays put**, which in a monthly cycle means the borrower paid exactly one instalment and stood still.

⚠️ **The point people miss: an account that neither rolls nor cures has not "stayed the same."** It has paid one EMI in a month in which one EMI fell due. It is treading water at a fixed depth, and in an amortising loan that is a slow-motion failure, because it is accruing charges it is not clearing.

## 4.2 The transition matrix

Generalise the roll rate across every pair of states and you get the **transition matrix** — the workhorse of retail portfolio measurement.

🧮 **Worked — a monthly transition matrix for a small-ticket unsecured book.** Rows are the state at the start of the month, columns the state at the end. Rows sum to 100%.

| From ↓ / To → | Current | 1–30 | 31–60 | 61–90 | NPA (90+) |
|:--|--:|--:|--:|--:|--:|
| **Current** | 97.5% | 2.5% | — | — | — |
| **1–30** | 55% | 10% | 35% | — | — |
| **31–60** | 15% | — | 10% | 75% | — |
| **61–90** | 8% | — | — | 7% | 85% |
| **NPA** | 3% | — | — | — | 97% |

Read the cells that matter: **2.5% of the performing book falls into delinquency each month**; of accounts in the 1–30 bucket, **55% cure and 35% roll forward**; by the 61–90 bucket, **85% roll into NPA and only 8% cure.**

That gradient — cure probability collapsing from 55% to 15% to 8% as the account ages — is the arithmetic behind everything in Document 02 §10.2. It is why collections capacity concentrates in early buckets, and it is why the Bucket 1 to Bucket 2 roll rate is the metric a collections floor actually runs on.

## 4.3 Turning the matrix into a forward loss estimate

This is what makes the matrix worth building.

🧮 **The terminal roll.** Of ₹100 entering the 1–30 bucket this month, the proportion that eventually reaches NPA, holding the matrix constant, is the product along the forward path:

> 0.35 × 0.75 × 0.85 = **0.223**, or **22.3%**

So roughly **22 rupees in every 100 that enters early delinquency ends up as an NPA.**

Now chain it to the front of the book. The performing portfolio flows into the 1–30 bucket at 2.5% a month, and 22.3% of that reaches NPA:

> 2.5% × 22.3% = **0.56% of the performing book per month**, or roughly **6.7% annualised NPA formation.**

**This is a forward-looking loss estimate built entirely from one month of observed data.** No cohort needs to mature. That is the flow view's entire advantage over the cohort view.

## 4.4 Sensitivity — and why one cell matters so much

Change a single cell. Suppose the 1–30 to 31–60 roll deteriorates from 35% to **45%**, everything else held:

> 0.45 × 0.75 × 0.85 = **28.7%** terminal roll
> 2.5% × 28.7% = **0.72% per month**, roughly **8.6% annualised**

**A ten-percentage-point move in one early-bucket cell moved annualised NPA formation by about 1.9 percentage points.** On a ₹10,000 crore book that is roughly ₹190 crore of additional NPA formation a year — visible this month, from a metric that has nothing to do with the 90+ number.

🔴 **This is the answer to "how would you know the book is turning before delinquency shows it."** Not the NPA ratio, which is ninety days late by construction. Not even SMA-2. **The 1–30 to 31–60 roll rate**, tracked monthly, with the terminal-roll calculation attached so that a movement in it is immediately expressed in rupees of expected loss.

## 4.5 The assumptions, which you must state

**1. Markov.** The matrix assumes the next state depends only on the current state, not on how the account got there. This is false: an account in the 31–60 bucket that has been there before behaves worse than a first-time entrant. Practitioners handle it by segmenting on delinquency history — "never-delinquent" versus "previously-delinquent" matrices.

**2. Stationarity.** Chaining the matrix forward assumes it holds next month and the month after. It does not, particularly through a turning point. **The chained estimate is a nowcast under current conditions, not a forecast.**

**3. Homogeneity.** One matrix for a mixed portfolio is an average of populations that behave differently. §7.

**4. No absorbing-state leakage.** The NPA row shows a 3% cure, which is deliberate — Document 02 §11.2's upgrade rule makes cure from NPA rare but not impossible, and it requires payment of the *entire* arrears. If your matrix shows a large cure rate out of NPA, either your data is wrong or your upgrade practice is.

**► SAY THIS**
> "The transition matrix is how you get a forward loss number without waiting for a cohort to mature. In a typical unsecured book, around 2.5% of the performing portfolio falls into early delinquency each month, and the product of the forward rolls — say 35%, then 75%, then 85% — means about 22% of what enters early delinquency ends as NPA. Chain those and you're at roughly 0.56% of the performing book a month. The reason I'd watch the first roll obsessively is leverage: moving that one cell from 35% to 45% takes annualised NPA formation from about 6.7% to 8.6%, and you see it this month rather than ninety days from now."

---
