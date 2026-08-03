---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 2
title: "THE DESIGN DECISIONS, BEFORE ANY DATA"
slug: "2-the-design-decisions-before-any-data"
sectionNumber: "2"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 857
status: "raw"
section: "§2"
summary: ""
enriched: false
---

# §2 · THE DESIGN DECISIONS, BEFORE ANY DATA

Four decisions taken before a line of analysis. Getting them wrong invalidates everything downstream, and unlike modelling errors they are usually irrecoverable without starting again.

## 2.1 The bad definition

📘 **The target.** What counts as "bad"? Standard Indian retail practice: **ever 90+ days past due within 12 months of origination.** But every element of that is a choice.

**Which threshold?** 30+, 60+, 90+, or NPA. The argument for 90+ is that it aligns with the regulatory default definition (Document 02 §9.2) and with the point past which cure becomes rare — Document 03 §4.2's matrix showed cure probability collapsing to 8% by the 61–90 bucket.

**Ever, or at?** *Ever* 90+ counts an account that touched the threshold even if it later cured. *At* month 12 counts only accounts delinquent at that instant. **Ever is standard**, because the question is how much bad business you wrote, not how much is bad on one arbitrary date.

**Over what window?** §2.2.

✅ **The evidence-based way to choose the threshold, which is what separates a considered answer from a recited one.** Build the roll-rate matrix from Document 03 §4.2 and find the bucket at which the probability of eventual default becomes high and the probability of cure becomes low. **The bad definition should sit at the point of no return, and that point is measurable rather than conventional.** In a book where the 31–60 to 61–90 roll is 75%, an account at 60 days is already mostly determined, and a case can be made for a 60+ definition — which buys you a shorter performance window and therefore fresher data.

🔴 **Indeterminates.** Accounts that are neither clearly good nor clearly bad — say, ever 30+ but never 60+. Standard practice is to **exclude them from the development sample** so the model learns a clean contrast, then score them in production like anyone else. Two things to know: excluding them raises apparent discrimination, so a Gini computed on a sample with indeterminates removed is not comparable to one computed on the full population; and if indeterminates are more than a small share of the sample, your bad definition is probably badly placed.

## 2.2 The observation point and the performance window

Two dates, and the gap between them.

- **Observation point** — when the decision was made and the data was as-at. For an application scorecard, origination.
- **Performance window** — how long you then watch the account.

📘 **How long should the performance window be? Document 03 §3.3 already answered it: to the product's maturity point** — the months-on-book at which the vintage curve flattens. Shorter and you are labelling accounts "good" that simply have not gone bad yet. Longer and you are needlessly delaying the model.

For most Indian unsecured retail this lands at **12 to 18 months**. For mortgages it is considerably longer, which is one reason mortgage scorecards are rebuilt less often and rely more heavily on bureau data that carries its own longer history.

⚠️ **The consequence, restated because it governs everything:** a scorecard built today is built on accounts originated at least 12 to 18 months ago, under the policy, pricing and mix of that time. **You are always modelling the past.** Document 02 §12 introduced this; here it becomes an operational constraint on how fresh your model can possibly be.

## 2.3 The sample window

Which origination months feed the development sample. Two competing pressures:

- **Wider** gives more defaults, which is the binding sample-size constraint.
- **Narrower** gives homogeneity — Document 03 §7 — because policy, pricing and channel mix change.

✅ **The rule: never pool across a policy regime boundary without testing whether you should.** In this market the November 2023 risk-weight action is a genuine boundary, and so is any material change in your own cut-off, channel mix or product terms. Pooling across one produces a model fitted to a mixture that no longer exists.

## 2.4 Exclusions

Removed from the development sample, always with the count and rationale documented:

| Exclusion | Why |
|:--|:--|
| **Confirmed fraud accounts** | Document 02 §4.1 — a fraud is not a credit event, and leaving them in trains the model to predict a behaviour that was never contemplated |
| **First-payment and early-payment defaults** | The standard proxy for unconfirmed fraud |
| **Staff and related-party loans** | Different behaviour entirely |
| **Deceased and disputed accounts** | Not credit decisions |
| **Policy declines that were force-approved** | Keep them separately — Document 02 §6.1's deviation cohort is a diagnostic in its own right |

🔴 **The fraud exclusion is the one that gets skipped, and it is expensive.** First-party fraud sits inside the default population and looks like extreme credit risk. Leave it in and the model over-weights whatever correlates with fraud — typically thin files and certain channels — and under-weights genuine repayment capacity. You end up with a model that is excellent at rejecting fraud and mediocre at ranking credit, which is not what you built it for, and which will fail the moment your fraud controls improve.

---
