---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 4
title: "The golden dataset"
slug: "5-2-the-golden-dataset"
sectionNumber: "5.2"
part: "PART I — MEASURING"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 733
status: "raw"
section: "§5.2"
summary: ""
enriched: false
---

## § 5.2 — The golden dataset

An eval is only as good as its dataset, and **a bad dataset lies confidently**, which is worse than no eval.

```python
from pydantic import BaseModel
from typing import Literal

class ExpectedResult(BaseModel):
    required_facts: list[str]          # must appear, e.g. "income_discrepancy flagged"
    required_citations: list[str]      # doc+page that must be cited
    required_flags: list[str]
    forbidden_flags: list[str]         # must NOT appear — the false-positive guard
    must_refuse: bool = False          # honest NOT FOUND is the correct answer
    rubric: list[str]                  # judged criteria for the narrative

class GoldenCase(BaseModel):
    id: str
    input: str                         # the applicant file id + question
    category: str                      # the slice — error analysis uses these
    expected: ExpectedResult
    difficulty: Literal["easy", "medium", "hard", "adversarial"]
    notes: str                         # why this case exists, what it probes
```

**MENTAL TRACE.** The `expected` field is the subtle part. Your system's output has no single right answer, so `expected` holds **checkable criteria** rather than an exact string.

Notice `forbidden_flags`. Most golden sets only check that the right things appear. **A credit system that flags everything is as broken as one that flags nothing** — it just fails in a direction that looks conservative. `forbidden_flags` catches the false-positive direction, and without it you'd optimise the system into flagging every file and score beautifully while destroying its usefulness.

`must_refuse` makes honest failure a *testable expectation*. A case where the answer genuinely isn't in the file has one correct output: NOT FOUND. That's the § 1.7 principle, promoted to a test.

`category` is the field you'll be most grateful for in § 5.15, because aggregate scores hide *which kind* of case fails.

### Coverage — the design that makes it honest

Chosen to *cover the space*, not to be easy.

```
CATEGORY                        EASY  MED  HARD  ADV   TOTAL
------------------------------------------------------------
clean file, all figures present    6    2     -    -      8
income discrepancy present         2    6     4    -     12
thin file / missing documents      1    3     2    -      6
scanned / poor OCR quality         -    3     4    -      7
multilingual correspondence        -    3     3    -      6
conflicting figures across docs    -    2     5    -      7
superseded / amended documents     -    2     3    -      5
genuinely absent answer (refuse)   2    2     -    -      4
adversarial: injected instruction  -    -     -    5      5
------------------------------------------------------------
                                  11   23    21    5     60
```

**MENTAL TRACE.** Read the *shape*, not the total. Sixty cases weighted toward medium and hard, with the largest single category being the one that matters most commercially — income discrepancy.

The four refusal cases are load-bearing. Without them, a system that never says NOT FOUND scores identically to one that refuses appropriately, and the first one is dangerous.

The five adversarial cases are the § 2.12 hostile documents, promoted from a demo to a permanent test.

### The authorship discipline

**Build it before optimising.** A golden set built after seeing outputs quietly inherits the system's blind spots.

**Author expectations by hand.** *You* decide what good means for each case. This is human judgement, slow and irreplaceable, and it is the reason golden sets are precious.

**Source cases from reality.** Your labelled inspection sessions. Real questions underwriters asked. Known failures — every past bug becomes a case.

**Version it in the repo.** It's an artifact that evolves, and its changes get tracked.

**Label difficulty honestly**, so scores are interpretable. Eighty percent on easy cases is not eighty percent on adversarial ones.

**And the meta-check: run your current system and confirm it fails some cases.** A golden set nothing fails isn't measuring anything.

**THE DEPLOYMENT LENS.** Two moves here that are worth more than the dataset itself.

**Tom authors the expectations, not you.** You build the schema and the tooling; a licensed underwriter decides what a correct memo contains. This is not delegation of work — it's the difference between "the vendor's tests" and "our tests," and it determines whether Marcus treats the golden set as evidence or as marketing.

**Every rejected or edited memo from § 4.7 becomes a candidate case.** Tom is generating labelled ground truth as a byproduct of his job. That is the cheapest and highest-quality data source in the entire deployment, and it arrives at exactly the rate the system is used.

`[RECEIPT]` **A 60-case golden set for a real domain, authored with a domain expert, with a coverage table and an honest current-failure list.** The authorship is the hard part and the visible part. Almost nobody has one.

---
