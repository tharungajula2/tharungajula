---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "03"
volumeSlug: "the-measurement-layer"
volumeTitle: "THE MEASUREMENT LAYER"
order: 3
title: "VINTAGE ANALYSIS"
slug: "3-vintage-analysis"
sectionNumber: "3"
part: null
kind: "narrative"
sourceFile: "CR_03_THE_MEASUREMENT_LAYER.md"
tags: []
hasSayThis: true
wordCount: 1121
status: "raw"
section: "§3"
summary: ""
enriched: false
---

# §3 · VINTAGE ANALYSIS

The most important technique in retail credit risk. If you master one thing in this document, master this.

## 3.1 What it is

📘 **Vintage analysis.** Group accounts by the month they were originated — the **cohort** or **vintage** — and track the cumulative proportion that has gone bad as a function of **months on book (MOB)**, not calendar time.

The two axis choices are the whole idea:

- **Grouping by origination month** holds underwriting policy, pricing and sourcing mix approximately constant within a cohort.
- **Plotting against months on book rather than calendar date** puts every cohort on the same starting line, so a cohort originated in January 2025 and one originated in January 2026 can be compared at the same age.

**This is what removes seasoning and growth dilution from the picture.** It is the only standard technique that does.

## 3.2 How it is constructed

Four decisions, each of which must be stated whenever you present a vintage chart:

**1. The cohort definition.** Origination month is standard. Quarterly cohorts where monthly volumes are thin.

**2. The bad definition.** Cumulative ever-90+, ever-60+, ever-30+, or ever-NPA. "Ever" matters — once an account touches the threshold it stays counted in that cohort's numerator even if it later cures. This is deliberate: the question is how much bad business you wrote, not how much is bad today.

**3. The denominator.** Accounts or value, fixed at origination. Fixing it at origination is what makes the curve monotone and comparable — a **static pool.**

**4. The observation window.** How many MOB you can show. A cohort originated last month has one point; a cohort from two years ago has twenty-four.

## 3.3 Reading the curves

🧮 **Worked — four cohorts, cumulative ever-90+ by months on book.**

| Cohort | MOB 3 | MOB 6 | MOB 9 | MOB 12 |
|:--|--:|--:|--:|--:|
| Jan 2025 | 0.4% | 1.5% | 2.4% | 2.9% |
| Apr 2025 | 0.5% | 1.7% | 2.7% | 3.2% |
| Jul 2025 | 0.7% | 2.4% | 3.8% | — |
| Oct 2025 | 1.1% | 3.5% | — | — |

Three things to read off it, in order.

**1. The level, at a common MOB.** Compare down the MOB 6 column: 1.5%, 1.7%, 2.4%, 3.5%. The July and October cohorts are decisively worse than January's at the same age. **This is a clean underwriting-quality signal, uncontaminated by seasoning or growth.** Something changed in Q3 2025 — policy, cut-off, channel mix, or pricing into a worse segment.

**2. The shape.** Every cohort's curve rises steeply to around MOB 6–9 and then flattens. That flattening is **seasoning**: most retail accounts that will go bad do so within the first year, and the marginal risk of a survivor falls with age. The MOB at which the curve flattens is the product's **maturity point**, and it defines the minimum performance window for any scorecard built on that product.

**3. The steepness in the early months.** The October cohort at MOB 3 is 1.1% against January's 0.4% — nearly triple. Very early-MOB deterioration has a specific signature: **first-payment and early-payment default, which points at fraud or channel compromise rather than at credit quality** (Document 02 §4.1, §8). A cohort that is worse only from MOB 6 onward is a credit problem; one that is worse from MOB 2 is probably a fraud or sourcing problem.

🔴 **The distinction between level and shape is the highest-value diagnostic in this document.** Two cohorts can end at the same MOB 12 loss with completely different curves — one that goes bad immediately and one that degrades slowly — and they demand different responses. A change in *level* with unchanged *shape* usually means you moved down the credit spectrum. A change in *shape* means something structural changed: the product, the channel, or the honesty of the applications.

## 3.4 The cuts that make it useful

A single portfolio vintage chart is nearly useless, because the aggregate will always conceal a bad tail inside a good average. The cuts that matter, in rough order of diagnostic power:

1. **By sourcing partner** — DSA, dealer, LSP. Document 02 §2.2. This is where the tail lives.
2. **By score band** — validates that the scorecard is still rank-ordering. If MOB 12 bad rates are not monotone across score bands, the model has broken.
3. **By ticket band** — Document 01 §1.2's gradient, cohort-corrected.
4. **By product and sub-product.**
5. **By geography** — down to state, and in practice to pincode cluster.
6. **By deviation flag** — Document 02 §6.1. Approved-with-deviation cohorts against clean-approval cohorts is a direct test of whether the override authority is being used well.

✅ **The single most valuable chart a junior analyst can produce**, and one that almost always finds something: MOB 6 cumulative 90+ by sourcing partner, by origination quarter, with partners ranked and volume shown alongside. It surfaces both the bad partners and the ones whose volume is growing fastest — and those two lists overlap more often than anyone expects.

## 3.5 The limitations, which you should volunteer before being asked

**1. It is slow.** A twelve-month view of a cohort requires twelve months. Vintage analysis will tell you what happened; it cannot tell you what is happening. This is why the flow view in §5 exists.

**2. It confounds cohort with environment.** A cohort originated just before a shock will look badly underwritten. Distinguishing "we wrote worse loans" from "the world got worse" requires comparing multiple cohorts' behaviour at the same *calendar* date as well as the same MOB — an analysis sometimes set out as a vintage-by-calendar grid.

**3. Small cohorts are noisy.** A monthly cohort of 300 accounts with a 2% bad rate contains six bad accounts. Do not read a trend off that.

**4. It assumes the cohort is homogeneous**, which it is not unless you have cut it properly. §8.

**► SAY THIS**
> "Vintage analysis is the only standard technique that separates underwriting quality from seasoning and growth dilution, because it groups by origination month and plots against months on book rather than calendar time. I'd read three things off it: the level at a common MOB, which is the clean quality signal; the shape, because a cohort that's worse from MOB 2 is a fraud or sourcing problem while one that's worse from MOB 6 is a credit problem; and the maturity point where it flattens, which sets the minimum performance window for any scorecard on that product. And I'd never look at it at portfolio level — the cut that earns its keep is MOB 6 bad rate by sourcing partner, ranked, with volume alongside."

---
