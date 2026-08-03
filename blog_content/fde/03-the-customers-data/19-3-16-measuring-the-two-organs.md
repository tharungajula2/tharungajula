---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 19
title: "Measuring the two organs"
slug: "3-16-measuring-the-two-organs"
sectionNumber: "3.16"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 824
status: "raw"
section: "§3.16"
summary: ""
enriched: false
---

## § 3.16 — Measuring the two organs

For fifteen sections you've judged this system by reading answers and nodding. Informed nodding, inspection-window nodding — but nodding.

**A retrieval system has two distinct organs, each failing independently. Therefore it needs two distinct thermometers.**

An end-to-end "was the answer good?" score is diagnostic mush. A bad answer with great retrieval is a generation problem. A bad answer with bad retrieval says nothing about generation at all. **Measurement mirrors architecture** — evals decompose along the same joints your diagnostic tree walks, and that's not a coincidence, it's the point.

### The retrieval thermometers

**Context recall.** Of the chunks *needed* to answer this question, what fraction did retrieval actually fetch?

This is the single most important retrieval number, because **a miss here caps everything downstream.** The model cannot use what never arrived.

**Context precision.** Of the fetched chunks, what fraction was actually relevant? Low precision means a noisy prompt, wasted window, and lost-in-the-middle risk.

Both need ground truth: *which chunks are the right ones per question*. Which is why golden sets for retrieval must label **expected chunks**, not just expected answers.

**One trap you're now immune to:** the recall@k from § 3.5 measures against *geometric* truth — the actual nearest vectors. Context recall measures against *semantic* truth — chunks a human says are needed. Same word, different referee.

### The generation thermometers

**Faithfulness.** Decompose the answer into claims — your § 3.13 schema did this *structurally, in advance* — and per claim ask: is it supported by the retrieved context? Faithfulness equals supported claims over total claims.

This measures precisely the crime of answering-from-weights-despite-context. **A system at 0.7 faithfulness is inventing 30% of what it says while holding the correct pages.**

**Answer relevance.** Faithful-but-evasive is also failure. "The context discusses income" is 100% faithful and 0% useful.

The duality worth writing down: **faithfulness is answer↔context. Relevance is answer↔question. Context recall and precision are context↔question.** Three arrows, four metrics, whole system covered.

### Worked example

```
Q: "Does the file show any income discrepancy?"

Human-labelled needed chunks:  {c7, c14}
Retrieved top-5:               {c7, c33, c41, c9, c88}

  context recall    = 1/2  = 0.50     ← c14 never arrived
  context precision = 1/5  = 0.20     ← four of five were noise

Answer claims:
  1. "Stated income is 120,000."          supported by c7   ✓
  2. "No discrepancy is evident."         supported by ---  ✗
  3. "Employment is verified since 2019." supported by c41  ✓
  4. "Credit utilisation is moderate."    supported by ---  ✗

  faithfulness = 2/4 = 0.50
```

**MENTAL TRACE — and notice the diagnosis this enables.**

Context recall of 0.50 says retrieval fetched half of what was needed; c14, the tax transcript chunk, never arrived. Context precision of 0.20 says four of the five chunks that *did* arrive were irrelevant.

Faithfulness of 0.50 says two of four claims are unsupported by anything provided.

Now the crucial reading: **claim 2 is the dangerous one.** "No discrepancy is evident" is not merely unsupported — it's an assertion of *absence* drawn from an incomplete retrieval. The model concluded there was no discrepancy because the contradicting chunk wasn't there.

Without decomposed metrics you'd log this as "answer was wrong." With them you know: retrieval is the primary failure (recall 0.5), generation compounded it by asserting absence rather than declining, and precision is separately poor, meaning the prompt is noisy too.

**Three distinct fixes, identified from four numbers.** That's why the two-organ principle matters.

### Who judges

Programmatic checks where possible — your citation validation is already a crude faithfulness floor. Humans for gold-standard labels: slow, small n, the calibration source. **LLM-as-judge** for scale, with the iron caveat: calibrate against human labels on a sample *before* trusting it, watch its known biases toward verbosity and confidence, and never let it be the sole judge of anything that matters.

### What the numbers are for

Not dashboards. **Decisions.**

Does reranking earn its 180ms? → context precision before and after. Did HyDE help *this* corpus? → context recall on the vocabulary-miss slice. Is the new chunking better? → both retrieval metrics, same golden set, one change at a time.

**And the regression ritual, now for pipelines: every failure you ever diagnose becomes a golden-set row, forever.**

**THE DEPLOYMENT LENS.** One metric matters more than the rest at Meridian, and it isn't faithfulness.

**Context recall on the discrepancy slice.** Specifically: across a labelled set of files that genuinely contain an income discrepancy, how often does the system retrieve the chunk that proves it?

That number is the answer to Dan's real question. Not "how accurate is the AI" — *"how often does this thing miss the one thing I care about?"*

Report it as its own line. Track it over time. And when it moves, treat it as an incident. **Choosing the one metric the customer actually cares about, and elevating it above the ones that are easier to measure, is judgement that no framework will do for you.**

---
