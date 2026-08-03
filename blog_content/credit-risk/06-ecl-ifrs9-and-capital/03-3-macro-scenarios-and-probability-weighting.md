---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "06"
volumeSlug: "ecl-ifrs9-and-capital"
volumeTitle: "ECL, IFRS 9 AND CAPITAL"
order: 3
title: "MACRO SCENARIOS AND PROBABILITY WEIGHTING"
slug: "3-macro-scenarios-and-probability-weighting"
sectionNumber: "3"
part: null
kind: "narrative"
sourceFile: "CR_06_ECL_IFRS9_AND_CAPITAL.md"
tags: []
hasSayThis: true
wordCount: 814
status: "raw"
section: "§3"
summary: ""
enriched: false
---

# §3 · MACRO SCENARIOS AND PROBABILITY WEIGHTING

## 3.1 What the Directions require

ECL must incorporate **forward-looking information**, including macroeconomic forecasts. Specifically:

- A bank shall use **multiple scenarios**, each representing the relationship between the key components of ECL and the relevant macroeconomic variables.
- The **probability weight** assigned to each scenario is determined by the bank, taking into account **historical experience and expert judgement**, subject to oversight under the bank's approved governance framework.
- Assumptions, scenario choices, weights and overlays must be documented and defensible as **reasonable and supportable**.

## 3.2 Why probability-weighting is not the same as running a central case

🧮 **Worked, and this is the single most valuable piece of arithmetic in this document.**

A segment's modelled ECL under three scenarios:

| Scenario | Weight | ECL (₹ crore) | Contribution |
|:--|--:|--:|--:|
| Upside | 10% | 70 | 7.0 |
| Baseline | 60% | 100 | 60.0 |
| Downside | 30% | 180 | 54.0 |
| **Probability-weighted ECL** | | | **₹121 crore** |

**The baseline alone gives ₹100 crore. The probability-weighted answer is ₹121 crore — 21% higher.**

📘 **Why, and the reason is structural rather than a quirk of these numbers.** Losses are **convex** in the macroeconomic variable: they rise faster in a downturn than they fall in an upturn. Defaults have a floor near zero but no ceiling. So the **average of the ECLs across scenarios exceeds the ECL computed at the average scenario.**

🔴 **The consequence, which is exactly what the multiple-scenario requirement exists to force:** a bank that computes ECL on a single central forecast **systematically under-provisions**, and the shortfall grows with the degree of convexity — meaning it is worst in the most stressed segments, precisely where under-provisioning is most dangerous. This is why the requirement is for scenarios, plural, and not for a "best estimate" of the macro path.

✅ If you take one thing from this document into a room, take this: **run the scenarios, not the average of the scenarios.** It is a two-line explanation that demonstrates you understand why the rule is written the way it is.

## 3.3 The Indian evidence problem, stated honestly

Estimating the relationship between macro variables and default rates requires observing several cycles.

⚠️ **India's retail book does not have them.** Document 01 established that the book roughly doubled in a few years and that entire products were reshaped by regulation. The only recent downturn is the pandemic — and that period was so heavily overlaid with **moratoria, restructuring frameworks and standstill provisions** that the observed default series does not reflect underlying borrower behaviour at all. A model fitted to it will learn the policy response, not the credit relationship.

**So macro overlays in Indian retail ECL rest on thin evidence.** The defensible responses are: use longer corporate or system-level series where the relationship is better observed and map across with documented judgement; use expert-judgement scenarios with explicit, stated assumptions rather than fitted coefficients; and disclose the uncertainty rather than presenting a fitted number with false precision.

🔴 **And say this plainly if asked.** The Directions explicitly permit expert judgement in scenario weighting, subject to governance. That is not a loophole — it is the regulator acknowledging that the data does not support pure estimation. **A candidate who claims a robustly fitted macro-to-default model for Indian retail is either working with data nobody else has or has not thought about it.**

## 3.4 Overlays

📘 **A management overlay** is an adjustment to modelled ECL for a risk the model does not capture — a known event too recent to be in the data, a data quality issue, a model limitation.

Overlays are legitimate, necessary, and the most-scrutinised number in any ECL disclosure, because they are where judgement enters unconstrained. Three disciplines make them defensible: **quantify them separately** rather than folding them into the model output; **state the trigger** that would release them; and **review them every period**, because an overlay that persists unchanged for eight quarters is no longer an overlay, it is an unacknowledged model deficiency.

**► SAY THIS**
> "The part of the ECL framework I'd expect to be tested on is scenario weighting, because it's where the arithmetic is counter-intuitive. Losses are convex in the macro variable — they rise faster in a downturn than they fall in an upturn — so the probability-weighted average of the ECLs is higher than the ECL of the average scenario. On a simple three-scenario set that gap can easily be twenty percent, and a bank running a single central forecast systematically under-provisions, worst in its most stressed segments. I'd also be honest that the macro-to-default relationship is weakly evidenced in Indian retail, because the only recent downturn was overlaid with moratoria and restructuring, so a model fitted to it learns the policy response rather than the credit relationship."

---
