---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 8
title: "Tool-use metrics"
slug: "5-6-tool-use-metrics"
sectionNumber: "5.6"
part: "PART I — MEASURING"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 348
status: "raw"
section: "§5.6"
summary: ""
enriched: false
---

## § 5.6 — Tool-use metrics

Zooming into the most consequential thing on the path.

**Right tool** — *selection accuracy*. Failures: wrong tool chosen (usually a description problem), tool called when none was needed, **needed tool not called** — the system answered from vibes when it should have searched.

**Right args** — *argument correctness*. Failures: malformed args (schema violations, should be caught by validation), **wrong values** — right tool, bad query — and hallucinated parameters. This is where a "smart" system quietly fails: it picks the right tool and feeds it a bad query.

**Right time** — *sequencing*. Failures: premature calls before enough context, out-of-order calls where B needs A's output, and redundant calls — the loop signature.

```
TOOL-USE SCORECARD — 60 golden cases
────────────────────────────────────────────────────────
selection accuracy .................... 94%
  wrong tool chosen ...................  2%
  needed tool not called ..............  4%   ← the expensive one
argument correctness .................. 81%   ← weakest dimension
  malformed (caught by validation) ....  0%
  valid but poor query value .......... 19%
redundant-call rate ...................  3%
unnecessary-call rate ................. 11%
tool-error recovery rate .............. 88%
────────────────────────────────────────────────────────
```

**MENTAL TRACE — and this is the diagnostic payoff.**

Selection is strong at 94%. Arguments are the weak dimension at 81%, and the breakdown localises it precisely: **zero malformed arguments** (schema validation is doing its job) but **19% valid-but-poor query values.** The model picks `search_file` correctly and then asks it for "income information" instead of "adjusted gross income."

**Each dimension points at a different fix.** Bad selection would mean fixing tool descriptions. Bad arguments means fixing the *parameter* descriptions and the reasoning that fills them. Bad timing would mean orchestration guards.

Here the fix is a better parameter description and a few-shot example of good queries — a twenty-minute change, identified by a number, aimed at the right place. Without the decomposition you'd have "tool use is bad" and no idea where to start.

The 4% "needed tool not called" is small and it is the row that should worry you most, because it's the § 5.5 failure: the loop terminated early and the output looks fine.

---
