---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "03"
volumeSlug: "the-measurement-layer"
volumeTitle: "THE MEASUREMENT LAYER"
order: 9
title: "THE MONITORING PACK"
slug: "9-the-monitoring-pack"
sectionNumber: "9"
part: null
kind: "narrative"
sourceFile: "CR_03_THE_MEASUREMENT_LAYER.md"
tags: []
hasSayThis: false
wordCount: 333
status: "raw"
section: "§9"
summary: ""
enriched: false
---

# §9 · THE MONITORING PACK

What the measurement layer looks like when assembled. This is roughly what a retail portfolio review runs on, ordered by frequency.

| Frequency | What | Answers |
|:--|:--|:--|
| **Daily** | Mandate bounce rate on presentations due | Is liquidity failing at the due date? |
| **Weekly** | Bucket balances and gross flow; collections productivity | Is the operation keeping up? |
| **Monthly** | Full transition matrix by segment; terminal roll and implied NPA formation; net flow by bucket; approval and deviation rates; PSI and CSI | Is the flow deteriorating, and is the model still valid? |
| **Quarterly** | Vintage curves by cohort, channel, score band and ticket; static pool loss curves; segment-level PD/LGD backtesting | Is the business we're writing getting better or worse? |
| **Annually** | Full model validation; segmentation review; LGD recalibration on completed workouts | Does the apparatus still hold? |

📘 **The ordering principle.** Frequency should follow **decision latency**, not data availability. Bounce data is daily because a same-day signal supports a same-week collections action. Vintage curves are quarterly because they inform policy changes that take a quarter to enact and two quarters to show. Running vintage analysis monthly produces noise and the illusion of activity; running roll rates quarterly throws away the leverage §4.4 quantified.

✅ **The one-page version, if you are ever asked what five numbers you would put in front of a credit committee:**

1. **Gross flow into the 1–30 bucket**, this month against last, with the terminal-roll conversion to expected NPA formation.
2. **The 1–30 to 31–60 roll rate** by segment.
3. **MOB 6 cumulative 90+ for the three most recent mature cohorts**, by channel.
4. **Approval rate and deviation rate** by approving authority.
5. **PSI and CSI** on the live scorecard.

Two of those are flow, one is cohort, one is origination discipline, and one is model validity. Nothing on that list is a stock number, and that is deliberate.

---
