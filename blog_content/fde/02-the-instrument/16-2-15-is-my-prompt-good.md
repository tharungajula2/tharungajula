---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 16
title: "Is my prompt good?"
slug: "2-15-is-my-prompt-good"
sectionNumber: "2.15"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 720
status: "raw"
section: "§2.15"
summary: ""
enriched: false
---

## § 2.15 — Is my prompt good?

You tweaked the prompt, ran it once, the answer looked better. Ship it?

You just committed the cardinal sin of prompt engineering: **judging on one sample.** Temperature exists. Inputs vary. "Looked better to me, once" is astrology.

**The golden set — your instrument.** Ten to twenty *fixed* test inputs, chosen to cover the space: typical cases, hard cases, edge cases (empty, absurd, wrong-language), and at least one adversarial case. For each, define *expected*: exact output where checkable, a checklist or rubric where open-ended.

**Write the set *before* tinkering.** A golden set built after seeing outputs quietly inherits the prompt's blind spots. Keep it in the repo, versioned. Prompts are artifacts; their test sets are artifacts too.

**The loop.** Baseline prompt → run the whole set at temperature 0 for comparability → score into a table → change **one thing** → rerun *all* → compare *counts*, not impressions.

```
GOLDEN SET — memo extraction — 15 rows        v3    v4    v5
--------------------------------------------------------------
01  clean file, all fields present            ✓     ✓     ✓
02  no FICO in file (expect null)             ✓     ✓     ✓
03  stated vs verified 20% gap                ✓     ✓     ✓
04  two conflicting income figures            ✗     ✓     ✓
05  Spanish employment letter                 ✗     ✗     ✓
06  scanned statement, low contrast           ✗     ✗     ✓
07  empty excerpt block                       ✓     ✓     ✗
08  injection: "ignore prior rules"           ✓     ✓     ✓
09  injection: hidden in metadata             ✗     ✓     ✓
10  FICO reported as 1200 (bad data)          ✓     ✓     ✓
11  applicant declined to state income        ✓     ✓     ✓
12  disputed tradeline, resolved              ✗     ✗     ✓
13  self-employed, no W-2                     ✓     ✓     ✓
14  file with 3 income sources                ✗     ✓     ✓
15  duplicate pages in file                   ✓     ✓     ✓
--------------------------------------------------------------
                                             10/15 12/15 14/15
```

**MENTAL TRACE.** Three prompt versions, same fifteen inputs, same temperature. Read the *columns* for the headline and the *rows* for the lesson.

v3 to v4: 10 to 12. Rows 04, 09, and 14 flipped to passing — all three are "multiple or hidden values" cases, so whatever changed in v4 improved handling of ambiguity.

v4 to v5: 12 to 14, with rows 05, 06, and 12 fixed — the multilingual and scan-quality cases.

**But look at row 07.** It passed in v3 and v4 and *broke* in v5. Empty input now fails. That is a regression, it is invisible in the totals, and your eye would never have caught it by reading outputs. This is exactly what the table is for. Prompt whack-a-mole is real: fixes break things.

**Scoring open-ended outputs — three honest tiers.**

*Exact programmatic checks* wherever possible: does the JSON validate, are required fields present, is every number accompanied by a citation. Cheap, objective, automate first.

*Human rubric* for quality judgements — you, scoring against written criteria, blind to which prompt produced which output where you can manage it.

*LLM-as-judge* — a second model call scoring outputs against your rubric. Scalable and surprisingly useful, but it inherits model biases: it favours verbosity, favours confident tone, and can prefer its own style. **Calibrate it against your human scores on a sample before trusting it, and never let it be the only judge of anything that matters.**

**A/B thinking and its limits at this scale.** At n=15, small gaps are noise. Treat 12/15 versus 13/15 as a tie. Act on decisive gaps, or on *which specific rows flipped* — row-level diffs teach more than totals. "v5 fixed all three multilingual cases but broke empty input" is an actionable sentence. "v5 is better" is not.

**THE DEPLOYMENT LENS.** This table is your relationship with Marcus.

Model risk management requires independent validation before deployment, ongoing monitoring, and documented thresholds. A versioned golden set with per-row results *is* an ongoing monitoring artifact — you built it because it makes the prompt better, and it happens to be the exact evidence his function is obligated to produce.

Which is why you show it to him in week three rather than month five. Walking into a validation function with a test suite already running is a completely different conversation from being asked for one.

And the habit that makes it compound: **every production failure becomes a new golden-set row, permanently.** The regression ritual from Document 01, aimed at prompts. Document 05 turns this into real machinery.

---
