---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 7
title: "Structured output"
slug: "2-6-structured-output"
sectionNumber: "2.6"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 1006
status: "raw"
section: "§2.6"
summary: ""
enriched: false
---

## § 2.6 — Structured output

Your code needs `{"verified_income": 96400}`. The model offers: "Great question! After reviewing the documents, I'd say the verified income appears to be around $96,400. Let me know if you'd like more detail!"

Useless to a parser. The gap between *chat* and *software component* closes exactly here.

### The escalation ladder, weakest to strongest

**Rung 1 — ask nicely.** The FORMAT bone: "Respond with only a JSON object, no prose, no code fences." Works about 90% of the time at temperature 0. The famous failures: replies wrapped in triple-backtick fences, or a cheerful preamble.

**Rung 2 — ask and demonstrate.** Add a few-shot example of the exact desired output. Examples pin format harder than any description.

**Rung 3 — prefill.** Start the assistant turn with `{`. Kills preambles dead, as § 2.2 showed.

**Rung 4 — native structured output.** Modern APIs accept a **JSON Schema** and enforce it during generation. Constrained decoding masks invalid tokens at sampling time, so the output *cannot* violate the schema — this is enforcement at the token level, not a request. **[VERIFY]** — the exact parameter name and availability per provider.

And where does the schema come from? **Your Pydantic model**, via `model_json_schema()`. Define the shape once: it documents your code, validates your data, and constrains the model. One schema, three jobs.

### The Meridian schema

```python
from pydantic import BaseModel, Field
from typing import Literal

class Citation(BaseModel):
    doc: str
    page: int = Field(ge=1)
    quote: str

class CreditMemo(BaseModel):
    applicant_id: str
    stated_income: int | None = None
    verified_income: int | None = None
    verified_income_source: Citation | None = None
    fico: int | None = Field(default=None, ge=300, le=850)
    monthly_debt: int | None = None
    dti_pct: float | None = Field(default=None, ge=0, le=200)
    flags: list[Literal["income_discrepancy", "thin_file", "disputed_tradeline", "insufficient_docs"]] = []
    summary: str

memo = CreditMemo(
    applicant_id="A-4417",
    stated_income=120000,
    verified_income=96400,
    verified_income_source=Citation(doc="tax_2025.pdf", page=1, quote="Adjusted gross income 96,400"),
    fico=712,
    monthly_debt=2840,
    dti_pct=35.4,
    flags=["income_discrepancy"],
    summary="Verified income materially below stated. FICO acceptable. DTI within policy on verified figures.",
)
print(memo.verified_income_source.doc, memo.verified_income_source.page)
print(memo.model_dump()["flags"])
```

**OUTPUT**
```
tax_2025.pdf 1
['income_discrepancy']
```

**MENTAL TRACE.** Two Pydantic models, one nested inside the other. `Citation` is a small object holding a document name, a page number constrained to be at least 1, and the literal quoted text. `CreditMemo` has a field whose *type is that model* — so a citation isn't a loose string, it's a validated object.

`Literal[...]` on `flags` is doing quiet heavy lifting: it means the list may only contain those four exact strings. A model that invents a fifth flag category gets rejected at the border rather than silently introducing a flag nobody defined.

`Field(ge=300, le=850)` on FICO means an out-of-range score can't enter. `Field(default=None, ge=0, le=200)` on DTI allows absence but bounds the value if present.

The two prints just show that the nested object is real — `.verified_income_source.doc` walks into the nested model — and that `.model_dump()` turns the whole thing back into an ordinary dict for storage or transmission.

**Schema design tips that raise hit-rate.** Flat beats deeply nested. Enums for closed choices constrain far better than free strings. Allow `null` for absent data and pair it with a "do not guess" instruction. And put *descriptions* in the schema — the model reads them as instructions.

### Parse defensively anyway — the law of the boundary

Even with native structured output modes, the model boundary is an **untrusted input boundary**. Values can be wrong even when the shape is right. Fallback providers may not enforce schemas. Older code paths may not use them.

The professional pattern, and you will write this a hundred times:

```python
from pydantic import ValidationError

def strip_code_fences(raw: str) -> str:
    s = raw.strip()
    if s.startswith("```"):
        s = s.split("\n", 1)[1]            # drop the ```json line
        s = s.rsplit("```", 1)[0]          # drop the trailing fence
    return s.strip()

def extract_memo(excerpts: str, retries: int = 2) -> CreditMemo | None:
    prompt = EXTRACT_PROMPT + excerpts
    for attempt in range(retries + 1):
        raw = call_model(prompt)
        cleaned = strip_code_fences(raw)
        try:
            return CreditMemo.model_validate_json(cleaned)
        except ValidationError as e:
            print(f"attempt {attempt+1}: validation failed")
            prompt = (EXTRACT_PROMPT + excerpts
                      + f"\n\nYour last reply failed validation: {e}\nReply with ONLY corrected JSON.")
    return None
```

**OUTPUT** (a run where the model first returns a fenced reply with an out-of-range FICO)
```
attempt 1: validation failed
attempt 2: validation failed
```
```
None
```

**MENTAL TRACE.** Attempt one: `call_model` returns something wrapped in triple backticks with `"fico": 1200`. `strip_code_fences` sees the leading fence, splits off the first line, cuts the trailing fence, and returns bare JSON. `model_validate_json` parses it, hits the `le=850` constraint on FICO, and raises `ValidationError`.

The `except` block does the clever part: it **shows the model its own error** by appending the validation message to the prompt, then loops. Attempt two fails the same way — the model didn't fix it. Attempt three would run, and here it also failed, so the loop exits and returns `None`.

Read the last line carefully. **`return None` is a feature.** Explicit failure beats silent garbage. A function that returns a half-populated memo when it couldn't parse the response is how a fabricated number reaches a credit committee.

`strip_code_fences` walks: `s.split("\n", 1)` splits on the first newline only and returns two pieces; `[1]` takes everything after it. `s.rsplit("```", 1)` splits on the *last* occurrence of the fence; `[0]` takes everything before it.

**THE DEPLOYMENT LENS.** Cap the retries and *log every failure*. At 40,000 files a month, a 2% unparseable rate is 800 files. Those 800 need to land in a queue a human looks at, not vanish into a `None` nobody counted. **The failure path needs a destination, not just a return value.** Design it now; you'll build the queue in Document 07.

`[RECEIPT]` **Build the extractor with the full defensive ladder and a test suite covering happy path, null-field case, out-of-range value, fenced output, and total failure returning `None`.** This is the single most portfolio-legible artifact in the whole document, because it demonstrates you think about the failure path — which is what separates people who've shipped from people who've demoed.

---
