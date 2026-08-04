---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 3
title: "Why this rules everything"
slug: "5-1-why-this-rules-everything"
sectionNumber: "5.1"
part: "PART I — MEASURING"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 438
status: "raw"
section: "§5.1"
summary: ""
enriched: false
---

## § 5.1 — Why this rules everything

In normal software you write `assert add(2, 2) == 4`. It passes or fails, forever, deterministically.

Now test an AI: `assert summarise(file) == ???`

**The three walls.**

**Non-determinism.** Same input, different output each run. `assert output == expected` is meaningless when output legitimately varies.

**No single correct answer.** "Summarise this file," "is this memo useful," "did the system investigate properly" — correctness is a *quality judgement on a spectrum*, not an equality check.

**Behaviour emerges from prompts, not code.** You change a prompt and behaviour shifts in ways no unit test on the *code* would catch. The logic lives in natural language the compiler never sees.

Traditional software's entire quality apparatus — deterministic tests, coverage, type checking — measures the **scaffolding** while the actual behaviour goes unmeasured. Evals fill exactly that gap.

**What an eval actually is.** A measurement of output quality against a defined standard, on a *fixed* set of inputs, producing a score you can compare across versions.

Four components. A **dataset** — fixed inputs, so runs are comparable. A **task** — what the system should do. A **scorer** — how you turn an output into a number. A **metric** — the aggregate.

Run the same dataset through two versions and compare. That's how you know if a change helped, and it's the only honest way.

**The junior-versus-senior difference, stated plainly.** Junior engineers ship prompts and *hope* — they eyeball a few outputs, it looks good, they ship. Senior engineers ship prompts and *measure*.

The difference isn't intelligence. It's discipline, and **it's visible in the work**:

*"I improved the system"* — unfalsifiable.
*"I raised discrepancy catch rate from 0.87 to 0.94 on the 60-case golden set while holding p95 latency and cost per file"* — evidenced.

**THE DEPLOYMENT LENS.** At Meridian there is a second reason evals matter, and it's larger than quality.

**Evals are the artifact that makes the system validatable.** Marcus's function is required to independently validate before deployment and monitor on an ongoing basis with documented thresholds. That's not a quality request — it's a supervisory obligation he has to discharge whether you help or not.

So you have a choice. Build the eval apparatus yourself and hand it over — in which case you shape what gets measured and how. Or don't, and let a validation team invent its own measurements of your system, which will be worse, slower, and not designed to be improved.

**Build the instrument. Then hand someone else the keys to it.** That's the whole strategy of this document, and it's counterintuitive enough that most vendors get it backwards.

---
