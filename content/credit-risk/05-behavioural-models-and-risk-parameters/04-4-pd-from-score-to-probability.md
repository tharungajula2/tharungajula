---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "05"
volumeSlug: "behavioural-models-and-risk-parameters"
volumeTitle: "BEHAVIOURAL MODELS AND RISK PARAMETERS"
order: 4
title: "PD — FROM SCORE TO PROBABILITY"
slug: "4-pd-from-score-to-probability"
sectionNumber: "4"
part: null
kind: "narrative"
sourceFile: "CR_05_BEHAVIOURAL_MODELS_AND_RISK_PARAMETERS.md"
tags: []
hasSayThis: false
wordCount: 1038
status: "raw"
section: "§4"
summary: ""
enriched: false
---

# §4 · PD — FROM SCORE TO PROBABILITY

Document 04 produced a score. This section turns it into a number that can enter an arithmetic.

## 4.1 The inversion

Document 04 §7.2 scaled log-odds into points. Reverse it:

> **ln(odds) = ( Score − Offset ) / Factor**
> **PD = 1 / ( 1 + odds )**

🧮 **Worked, using Document 04's parameters** — Offset 501.87, Factor 28.85, from a base score of 600 at 30:1 odds with a PDO of 20.

**At a score of 660:**
ln(odds) = (660 − 501.87) / 28.85 = 158.13 / 28.85 = 5.4811
odds = e^5.4811 = **240.0** → PD = 1 / 241 = **0.415%**

**At a score of 580:**
ln(odds) = (580 − 501.87) / 28.85 = 78.13 / 28.85 = 2.708
odds = e^2.708 = **15.0** → PD = 1 / 16 = **6.25%**

📘 **The thing to notice, and it is the whole reason scaling exists.** Eighty points of score — a linear difference — is a **fifteen-fold** difference in PD. Score is linear in log-odds, so it is exponential in risk. **A credit officer who thinks of an 80-point gap as "somewhat better" has misread the instrument by an order of magnitude**, and this is the single most useful thing to explain when a scorecard is handed to a business audience.

## 4.2 Anchoring to central tendency

The PD that falls out of the model reflects the **development sample's** bad rate. That sample covered particular years, a particular economy, a particular policy regime.

📘 **Central tendency** is the long-run average default rate for the segment — the level the PD should average to across a full cycle. Calibration shifts the intercept so the portfolio-weighted average PD equals the chosen central tendency, leaving the ranking untouched.

🧮 Document 04's development sample had a **5.0%** bad rate. If the long-run average for that segment is **3.5%**, deploying the model uncalibrated over-provisions by roughly 43% in relative terms. The fix is a shift in the offset, not a rebuild — Document 04 §12.2's **level error, so recalibrate.**

⚠️ **And the judgement nobody can remove: what *is* the long-run average?** Document 01 established that the Indian retail book has roughly doubled in a few years, and that whole products have been transformed by regulation. **There is no long run to average over for much of this portfolio.** The honest position is that central tendency in fast-growing Indian retail segments is an assumption with wide uncertainty, and it should be documented as such and sensitivity-tested — not presented as an observed constant.

## 4.3 PIT and TTC, properly

Document 04 §10.3 introduced the distinction. Here is the mechanism.

| | Point-in-time | Through-the-cycle |
|:--|:--|:--|
| **Reflects** | Current conditions | Cycle average |
| **Behaviour** | Moves with the cycle | Stable |
| **Used for** | **IFRS 9 / ECL** — provisions | **Basel capital** |
| **Why** | ECL asks what will actually happen | Capital should not swing procyclically |

**Conversion in practice** is not a formula; it is a choice about how much of a macroeconomic overlay to apply. A PIT PD is typically a TTC PD adjusted by a scalar derived from current and forecast macro conditions — unemployment, GDP growth, sectoral stress — usually estimated by regressing observed default rates on macro variables over history.

🔴 **The consequence to be ready for: the same portfolio legitimately carries two different PDs, and they should differ.** If a firm's ECL PD and its capital PD are identical, either it is applying no macro overlay to ECL, or it is treating a PIT estimate as TTC in its capital computation. Both are errors, and a candidate who spots the identity as suspicious is showing they have worked with both frameworks.

⚠️ **And the Indian-specific weakness**: estimating a macro-to-default relationship requires observing several cycles. India's retail book barely has one usable downturn — the pandemic — and that one was so heavily overlaid with moratoria and restructuring that the observed default series does not reflect underlying behaviour. **Macro overlays in Indian retail ECL rest on thin evidence, and that should be said rather than hidden.**

## 4.4 The term structure of PD

A 12-month PD is not enough once ECL enters, because Stage 2 requires **lifetime** ECL.

📘 **Marginal PD** — probability of default in year *t*, conditional on having survived to the start of year *t*. Also called the hazard rate.
📘 **Cumulative PD** — probability of having defaulted by the end of year *t*.

🧮 **Worked — a five-year term structure.**

| Year | Marginal PD (conditional) | Survivors entering | Defaults in year | Cumulative PD |
|:--|--:|--:|--:|--:|
| 1 | 3.00% | 100.00% | 3.000% | **3.000%** |
| 2 | 2.20% | 97.00% | 2.134% | **5.134%** |
| 3 | 1.50% | 94.87% | 1.423% | **6.557%** |
| 4 | 1.00% | 93.44% | 0.934% | **7.491%** |
| 5 | 0.70% | 92.51% | 0.648% | **8.139%** |

Two readings, both important.

**The lifetime PD is 8.14% against a 12-month PD of 3.00% — about 2.7 times.** That ratio is the arithmetic behind the Stage 1 to Stage 2 provision jump. Document 03 noted commentary putting Stage 2 provisions at three to five times Stage 1 for longer-tenor loans; this table shows exactly where that multiple comes from, and why it is larger for long-tenor products.

**The marginal PD declines with age.** This is Document 03 §3.3's seasoning, expressed as a hazard rate: survivors are progressively better credits, because the weak ones have already defaulted. It is also why **a lifetime PD is not the 12-month PD multiplied by the number of years** — that error would give 15% here instead of 8.1%, an overstatement of nearly double.

🔴 **The behavioural-time subtlety that catches people.** "Lifetime" means expected behavioural life, not contractual tenor. Document 02 §6.5: the pre-payment directions removed foreclosure friction for floating-rate retail from January 2026, which **shortens behavioural life** — and a shorter life means a smaller lifetime PD and a smaller Stage 2 provision. A change that reads as consumer protection has a direct, quantitative ECL consequence, and almost nobody connects the two.

---
