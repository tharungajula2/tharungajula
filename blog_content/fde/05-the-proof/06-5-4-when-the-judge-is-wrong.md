---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 6
title: "When the judge is wrong"
slug: "5-4-when-the-judge-is-wrong"
sectionNumber: "5.4"
part: "PART I — MEASURING"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 658
status: "raw"
section: "§5.4"
summary: ""
enriched: false
---

## § 5.4 — When the judge is wrong

Your judge is an LLM, which means it has all the biases of an LLM, now pointed at *grading*.

### The known biases

**Verbosity bias** — favours longer, more detailed answers even when terse is better.

**Position bias** — when comparing two answers, favours whichever comes first or last regardless of quality.

**Self-preference** — favours outputs in its own style or from its own model family.

**Sycophancy toward confidence** — confidently-stated wrong answers score higher than hedged correct ones. **Doubly dangerous, because this is exactly the failure mode you're trying to detect**, now present in the detector.

**Formatting bias** — nice markdown scores higher than plain text of equal substance.

**Leniency and scale compression** — scores cluster in the middle, compressing the range you're trying to measure.

Each is a **systematic** error, not random noise. Which means **it biases your optimisation**. If the judge rewards verbosity, you'll "improve" the system by making it verbose — measuring the bias instead of the quality.

```
BIAS BATTERY — paired probes, our judge
────────────────────────────────────────────────────────────────
probe                              A       B      verdict
verbose vs terse, equal substance  0.81   0.64    verbosity bias, strong
correct-first vs correct-second    0.79   0.71    position bias, mild
confident-wrong vs hedged-right    0.74   0.58    sycophancy, strong ⚠
markdown vs plain, equal substance 0.77   0.72    formatting bias, mild
────────────────────────────────────────────────────────────────
```

**MENTAL TRACE.** Row three is the one that should stop you. Given a memo stating a wrong figure confidently and one stating the right figure with an appropriate hedge, **the judge preferred the wrong one by a wide margin.**

If you optimise against this judge without correcting for that, you will systematically train the system toward confident wrongness — the exact failure you built the eval to catch.

The mitigation is a rubric clause naming the bias: *"Reward calibrated uncertainty. A hedge that accurately reflects thin evidence is correct behaviour, not weakness."* Then re-run the battery and confirm the gap narrows.

### Mitigations, in ascending strength

Calibration. Bias-aware rubrics that name the bias to counter it. Order randomisation for comparisons. A **different judge model** than the system under test. Multiple judges for high-stakes. And **ground truth wherever possible — the undefeated move**, because a programmatic check has no bias.

**The meta-principle: the judge is a fallible instrument. Treat its scores as measurements-with-error, not truth, and characterise the error before trusting the measurement.**

### Version pinning — the subtler discipline

Here's the trap that ruins eval programmes.

Your judge is some model name. The provider updates the model behind that name. Your eval scores shift — **and you cannot tell whether your system got worse or the judge changed.** Your entire measurement baseline moved under you, invisibly.

**Pin the judge's version** to a specific dated snapshot. **Record which judge version produced which scores**, in the report. And when you must upgrade, **re-baseline** — re-run past evals with the new judge to establish the offset, so old and new scores stay comparable.

**Unpinned judges make eval history meaningless.** A score from March and a score from June aren't comparable if the judge changed between them.

**THE DEPLOYMENT LENS.** This is a compliance requirement at Meridian, not a nicety.

Marcus's framework requires monitoring against documented thresholds. A threshold is meaningless if the measuring instrument silently changes. If your discrepancy catch rate drops below the agreed floor and the cause turns out to be a judge update, you have triggered an incident, spent a validation team's week, and — worse — established that your numbers can move for reasons unrelated to the system.

**Pin the judge. Log the version in every report. Re-baseline explicitly and document it.** Say it in the meeting: *"The grader is version-pinned. If we ever change it, we re-run history with the new grader and show you both curves before we use it for anything."*

That sentence buys you more credibility than any accuracy figure, because it demonstrates you understand what he's actually worried about.

---
