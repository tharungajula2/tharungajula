---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 5
title: "The judge"
slug: "5-3-the-judge"
sectionNumber: "5.3"
part: "PART I — MEASURING"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 638
status: "raw"
section: "§5.3"
summary: ""
enriched: false
---

## § 5.3 — The judge

Sixty cases with rubric expectations — but who *scores* the outputs? Doing it by hand every run doesn't scale, and you'll run evals hundreds of times.

```python
from pydantic import BaseModel
from typing import Literal

class JudgeVerdict(BaseModel):
    reasoning: str                              # WHY — written before the score
    per_criterion: dict[str, bool]              # granular, not just a number
    score: float                                # 0–1
    confidence: Literal["high", "medium", "low"]
```

**MENTAL TRACE — and the field order matters.**

`reasoning` comes **first** in the schema, so the model generates it before the score. That's § 2.5's mechanism aimed at judging: making the judge explain forces genuine evaluation rather than a gut number, and it produces an audit trail.

`per_criterion` is the difference between a debuggable eval and an opaque one. Not a mysterious 0.7, but `{"flagged_discrepancy": True, "cited_source_page": True, "no_uncited_numbers": False}`. **Granular scores point at fixes; aggregate scores point at nothing.**

`confidence` lets the judge flag its own uncertainty, which routes low-confidence verdicts to human review instead of silently averaging them into a number.

Temperature 0. You want consistent scoring.

### The calibration imperative — the step everyone skips

**An uncalibrated judge is a random number generator with good grammar.**

Before trusting *any* aggregate the judge produces, measure whether it agrees with you.

```
CALIBRATION RUN — 15 memos, hand-scored blind, then judged
──────────────────────────────────────────────────────────
case    human   judge   agree?
G-004    pass    pass     ✓
G-011    fail    pass     ✗   judge accepted an uncited DTI figure
G-017    pass    pass     ✓
G-023    fail    pass     ✗   judge accepted an uncited DTI figure
G-029    pass    fail     ✗   judge penalised a correct terse memo
G-031    fail    fail     ✓
...
──────────────────────────────────────────────────────────
agreement: 11/15 = 73%          ← BELOW THRESHOLD. Do not trust.
```

**MENTAL TRACE.** Seventy-three percent agreement means the judge disagrees with the domain standard roughly one time in four. Any aggregate it produces is fiction with a decimal point.

And notice the disagreements are **not random** — they cluster. Two of them are the same failure: the judge accepted a claim with no citation. One is the judge penalising terseness.

**That clustering is the diagnosis.** The rubric never told the judge that an uncited number is disqualifying, and it never told it to ignore length. Both are fixable in one edit:

```
Score 0 for the entire memo if ANY numeric claim lacks a citation, regardless of
whether the number is correct. Do not reward length, elaboration, or formatting.
A correct three-sentence memo scores higher than a correct three-paragraph one.
```

```
RE-CALIBRATION — same 15 cases
agreement: 13/15 = 87%          ← above threshold. Trust with eyes open.
```

**Report the agreement number alongside every eval.** An eval whose judge you haven't validated is a number you made up.

This is the single most important idea in this section: **the judge is a measurement instrument, and unvalidated instruments produce fiction.**

### Hybrid scoring — don't judge what a regex can verify

For objectively checkable expectations, **assert programmatically**. Cheaper, objective, no bias.

```
PROGRAMMATIC (no judge)              JUDGED
─────────────────────────────────────────────────────────────
every number has a citation          is the narrative coherent?
cited chunk ids were retrieved       is the risk framing appropriate?
required flags present               did it explain the discrepancy well?
forbidden flags absent               is the tone right for a credit committee?
output validates against schema
NOT FOUND when must_refuse
```

**MENTAL TRACE.** The left column is most of what matters at Meridian, and it costs nothing to check, never drifts, and has no bias.

Which is the real lesson: **the more structure you built in § 3.13, the less you need a judge at all.** Structured output didn't just make parsing easier — it moved half your quality criteria from the expensive, biased, unreliable column into the free, objective one.

The mature scorer is hybrid: programmatic for the checkable, judge for the qualitative, human review for the low-confidence and the high-stakes.

---
