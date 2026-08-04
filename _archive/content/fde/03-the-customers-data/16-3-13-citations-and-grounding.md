---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 16
title: "Citations and grounding"
slug: "3-13-citations-and-grounding"
sectionNumber: "3.13"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 792
status: "raw"
section: "§3.13"
summary: ""
enriched: false
---

## § 3.13 — Citations and grounding

Two systems give the same correct answer. One says it. The other says it *and points at the tax transcript, page 1*.

Only the second is shippable to a bank, because only the second lets a human **verify without trusting**.

### Citations as structure, not prose

Asking for "[3]" in text was rung one of the § 2.6 ladder. The real build is structured output with per-claim attribution.

```python
from pydantic import BaseModel

class Claim(BaseModel):
    text: str
    chunk_ids: list[int]              # which retrieved chunks support THIS claim

class GroundedAnswer(BaseModel):
    claims: list[Claim]
    not_found: bool = False           # honest failure, promoted to a FIELD
```

The prompt instructs: decompose your answer into claims; for each claim list the ids of chunks that support it; **a claim with no supporting chunk must not appear.**

The decomposition into claims isn't cosmetic. It's what makes the next part possible.

### The validation layer

Model-emitted citations are model output, and the boundary law applies: **untrusted until validated.** Three checks, escalating in strictness.

```python
def validate(answer: GroundedAnswer, retrieved_ids: set[int]) -> list[str]:
    problems = []
    for i, claim in enumerate(answer.claims):
        bad = [cid for cid in claim.chunk_ids if cid not in retrieved_ids]
        if bad:
            problems.append(f"claim {i}: cites chunks not retrieved: {bad}")
        if not claim.chunk_ids:
            problems.append(f"claim {i}: no citation")
    return problems

retrieved_ids = {7, 14, 22, 41}
answer = GroundedAnswer(claims=[
    Claim(text="Verified income is 96,400.", chunk_ids=[7]),
    Claim(text="The applicant has no delinquencies.", chunk_ids=[]),
    Claim(text="Employment verified since 2019.", chunk_ids=[99]),
])
for p in validate(answer, retrieved_ids):
    print(p)
```

**OUTPUT**
```
claim 1: no citation
claim 2: cites chunks not retrieved: [99]
```

**MENTAL TRACE.** `enumerate` gives each claim an index. The comprehension `[cid for cid in claim.chunk_ids if cid not in retrieved_ids]` collects any cited id that wasn't in the set you actually provided.

Claim 0 cites chunk 7, which is in `retrieved_ids`. Clean, no output.

Claim 1 has an empty `chunk_ids` list. `if not claim.chunk_ids` is true for an empty list, so it's flagged. **This is an uncited assertion — the model asserting something no document supports** — and it is exactly the failure that must never reach a credit memo.

Claim 2 cites chunk 99, which was never retrieved. You provided four chunks and it cited a fifth. **A hallucinated citation is instantly catchable garbage**, and catching it mechanically is worth more than any amount of prompt tuning.

Both problems feed the repair loop from § 2.6: show the model its own errors, ask for a corrected answer, cap the retries, fail loudly.

**The third check, the hard one:** does the cited chunk *actually contain support* for the claim? A cheap heuristic now — claim keywords intersected with chunk text, crude but it catches the worst offenders. The real machinery is faithfulness scoring in § 3.16, and **this field structure is exactly what it will consume.**

Write down the design note, because it generalises far beyond RAG: **you structured the output so that verification became mechanical.** Schemas aren't just parsing convenience. They're what makes downstream *checking* possible at all.

### Rendering — the human contract

Each claim followed by its sources as `[tax_2025.pdf p1 > Part I > Adjusted Gross Income]`. **A citation naming the section is verifiable in seconds; one naming just a file is homework.** That's the heading-path metadata from § 3.3, cashing in.

And the refusal path renders *proudly, not apologetically*: `NOT FOUND — no supporting content in this file for that question.`

**In enterprise retrieval, a system that visibly declines beats one that quietly invents, every single time.**

**THE DEPLOYMENT LENS.** This section *is* the Meridian deployment. Everything else is scaffolding around it.

Recall § 2.5: the explanation of record is the citation chain, not the model's narration. Here's what that means operationally.

**Every number in the memo is clickable.** Tom clicks the DTI and lands on page 3 of the credit report with the figure highlighted. Verification takes four seconds, not four minutes.

**An uncited number is rendered as a visible defect**, in red, not silently omitted. The system must make its own gaps loud.

**The citation, not the reasoning, is what gets logged for audit.** Chunk id, source document, page, exact quoted span, retrieval mode, timestamp, model version. That record is reconstructable years later — which is precisely what the emerging reconstructability requirements from Document 00 demand, and almost nothing produces it by default.

`[RECEIPT]` **The claims-with-citations pipeline plus the validation layer plus the click-through session.** Take eight real questions, read every cited chunk, and grade every citation as supports / partially / doesn't. Publish the honest tally. If you find a "doesn't" — and you will — that's the finding, not a failure. You caught, with your own instrument, the exact failure class that faithfulness metrics measure at scale.

---
