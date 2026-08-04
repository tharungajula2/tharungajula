---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 20
title: "The failure-to-golden loop"
slug: "5-16-the-failure-to-golden-loop"
sectionNumber: "5.16"
part: "PART III — THE LIFECYCLE"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 419
status: "raw"
section: "§5.16"
summary: ""
enriched: false
---

## § 5.16 — The failure-to-golden loop

One phrase has recurred throughout: *every failure becomes a permanent test*. Here it becomes machinery.

**The loop.** A failure is found — anywhere: a dev run, error analysis, an online eval, a rejected memo, a trace you were reading. **It becomes a golden case** with its input, its now-understood expected behaviour, and its category. **It enters the versioned golden set.** **The regression suite guards it.** **CI gates on it.**

Result: **your eval coverage grows toward the shape of reality's failures.**

**Why this is the most important loop here.** Every other technique is a *snapshot* of quality. This is the **ratchet** that makes quality monotonically improve.

Without it: you fix a bug, it regresses months later, you fix it again. With it: you fix a bug once, it's guarded forever, and every future failure adds another permanent guard.

Over a year, your golden set becomes a dense map of **your system's actual failure modes** — not the ones you imagined at launch. **This is how mature systems become reliable: not by being perfect at launch, but by never repeating a failure.**

**The friction problem.** Turning a failure into a golden case must be *easy* or it won't happen. A loop with high friction doesn't spin.

```
$ python -m evals capture --from-trace memo_run_A3902 --category discrepancy

reading trace... found failure signature: needed tool not called
proposed expected behaviour:
  required_flags:     ["income_discrepancy"]
  required_citations: ["tax_2025.pdf p1", "application.pdf p3"]
  must_call:          search_file(is_third_party=true)
edit? [y/N] y
...
checking for duplicates against 60 existing cases...
  nearest: G-041 (similarity 0.71) — distinct root cause, keeping both
added as G-061 (hard, discrepancy). golden set v7 → v8.
regression suite now guards this failure.
```

**MENTAL TRACE.** One command from "found a failure" to "permanently guarded."

The tool reads the trace, identifies the signature, and **proposes** the expected behaviour — the model assists, you approve. That's the § 4.17 principle again: the agent proposes, the human disposes.

**Deduplication matters.** Adding ten golden cases for one root cause grows redundancy, not coverage. The similarity check against existing cases flags near-duplicates and asks. Here 0.71 is close but the root cause differs, so both stay.

And the version bumps, so every score from here forward is comparable only against v8 — which is why § 5.12's data versioning isn't bureaucracy.

**This loop connects everything.** Error analysis feeds it. Online evals feed it. Traces feed it. The harness runs the growing suite. CI enforces it.

**That's not a testing suite. It's a learning system for reliability.**

---
