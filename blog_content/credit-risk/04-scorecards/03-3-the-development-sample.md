---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 3
title: "THE DEVELOPMENT SAMPLE"
slug: "3-the-development-sample"
sectionNumber: "3"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: true
wordCount: 567
status: "raw"
section: "§3"
summary: ""
enriched: false
---

# §3 · THE DEVELOPMENT SAMPLE

## 3.1 How much data

The constraint is **defaults, not accounts.** A million accounts with 300 defaults supports nothing.

Practitioner rules of thumb, and they are rules of thumb rather than law: **a minimum in the low thousands of bads** for a stable application scorecard, with 1,500 to 2,000 often cited as a working floor. Below that, coefficient standard errors are wide enough that fine binning becomes noise-fitting and out-of-time performance degrades unpredictably.

⚠️ **The Indian complication.** Document 01 established that the healthiest segments have the fewest defaults. A prime mortgage book with PAR 91–180 at 0.2% needs an enormous account base to accumulate a usable bad population — which is precisely why mortgage scorecards lean on bureau attributes and on longer windows, and why the small-ticket unsecured book, for all its problems, is the easiest place in this market to build a well-evidenced model.

## 3.2 The three splits

| Split | What it is | What it tests |
|:--|:--|:--|
| **Training** | Typically 70% of the sample, randomly drawn | Fits the model |
| **Holdout / in-time validation** | The remaining 30%, same origination period | Overfitting |
| **Out-of-time (OOT)** | A *later* origination period, held out entirely | Whether the relationship survives time |

🔴 **The OOT split is the one that matters, and the ranking of the two is a genuine test of understanding.** A random holdout drawn from the same period as the training data shares its population, its policy regime, its channel mix and its economic conditions. It detects overfitting and nothing else.

**Out-of-time is the only split that answers the question production actually asks**, which is whether this relationship holds on applicants who arrive later. Document 03 §8 established that populations drift; OOT is where drift shows up before it costs you.

✅ **The diagnostic that follows.** A large gap between in-time and OOT performance is not primarily an overfitting signal — it is a **population instability** signal, and the response is to investigate what moved, using CSI (Document 03 §8.3), rather than to regularise harder.

And the case worth being ready for: **OOT performance that is *better* than in-time.** It happens, it looks like an error, and it usually is not. The common causes are a more favourable economic period, a policy tightening between the two windows that removed marginal applicants, or a bad-rate difference between the windows that changes the base against which discrimination is measured. **Investigate it; do not celebrate it and do not assume it is a bug.**

**► SAY THIS**
> "Before touching data I'd fix four things: the bad definition, the performance window, the sample window and the exclusions. The bad definition I'd set from evidence rather than convention — build the roll-rate matrix and put it at the point of no return, where cure probability has collapsed. The performance window I'd set to the product's maturity point off the vintage curves, which for Indian unsecured retail is usually twelve to eighteen months. Exclusions matter more than people expect, especially confirmed fraud and first-payment defaults, because first-party fraud in the bad population trains the model to predict something that isn't credit risk. And I'd hold out out-of-time, not just a random split — a random holdout only catches overfitting, and the question production asks is whether the relationship survives a population that has moved."

---
