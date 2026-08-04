---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 23
title: "Types and Pydantic"
slug: "1-20-types-and-pydantic"
sectionNumber: "1.20"
part: "PART II — THE ENGINEER'S FLOOR"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 633
status: "raw"
section: "§1.20"
summary: ""
enriched: false
---

## § 1.20 — Types and Pydantic

Python happily lets you pass a string where a number belongs, and crashes at 2 a.m. in production instead of at noon in development. **Type hints** are labels that catch mistakes early. **Pydantic** turns those labels into an enforced border checkpoint: data that doesn't match the schema *does not enter*.

And here's the twist that makes this section secretly enormous: schemas are also how you make *LLMs* return reliable structured output.

**Type hints** are documentation that tools can check: `def chunk(text: str, size: int = 500) -> list[str]:`. Syntax to recognise on sight: `list[dict]`, `str | None` (maybe-a-string), `Optional[str]` (older spelling of the same). Python doesn't enforce hints at runtime — editors and checkers do — which is exactly why Pydantic exists for the borders of your system.

**Pydantic** is classes that *validate*:

```python
from pydantic import BaseModel, Field

class LoanFileRecord(BaseModel):
    applicant_id: str
    status: str = "pending"                        # default
    fico: int = Field(ge=300, le=850)              # constraint: 300–850
    flags: list[str] = []

good = LoanFileRecord(applicant_id="A-4417", fico="712")
print(good)
print(good.fico, type(good.fico))
```

**OUTPUT**
```
applicant_id='A-4417' status='pending' fico=712 flags=[]
712 <class 'int'>
```

**MENTAL TRACE.** You passed `fico` as the *string* `"712"`. Pydantic saw the declared type `int`, judged the conversion sensible, and **coerced** it — so `good.fico` is the integer 712, proven by `type()`. You never passed `status` or `flags`, so the defaults filled in. And `Field(ge=300, le=850)` checked that 712 sits between 300 and 850 before letting it through.

Now the same model with garbage:

```python
bad = LoanFileRecord(applicant_id="A-4418", fico=1200)
```

**OUTPUT**
```
pydantic_core._pydantic_core.ValidationError: 1 validation error for LoanFileRecord
fico
  Input should be less than or equal to 850 [type=less_than_equal, input_value=1200, input_type=int]
```

**MENTAL TRACE.** 1200 is an integer, so the type is fine — but it fails the `le=850` constraint. Pydantic refuses to build the object at all and raises a `ValidationError` that names **the exact field**, **the exact rule broken**, and **the exact value that broke it**. Compare that to the alternative: a FICO of 1200 flowing silently into your pipeline and producing a nonsense risk assessment forty minutes later with no clue where it came from.

**Three superpowers:** **validation** (garbage stops at the border with a precise message), **coercion** (sensible conversions happen for you), and **serialization** (`.model_dump()` gives a dict, `.model_validate_json(s)` reads a JSON string). Dict plumbing, now with a bouncer.

**The professional pattern:** define Pydantic models at every *boundary* — API in, API out, file load, database row. The messy outside world is validated once, and everything inside works with guaranteed-clean objects.

**The AI payoff.** A Pydantic model auto-exports **JSON Schema** via `.model_json_schema()`, and JSON Schema is the language of structured LLM output — "respond matching this schema" — and of tool definitions in agent frameworks. Define the shape once: validate your data with it, *and* hand it to the model as the contract, *and* validate what the model sends back. Document 02 will feel like a reunion.

**THE DEPLOYMENT LENS.** Meridian's loan data extract will be dirty. Not might be — will be. Dates in three formats, FICO scores of `0` meaning "no score" rather than "worst score," free-text income fields containing `"~85k"`, and at least one field the schema document describes incorrectly.

**Validate at the boundary and the dirt announces itself on day one with the field name attached.** Skip it and the dirt surfaces in week six as a wrong number in a credit memo, which is a trust event rather than a bug report.

There's a second, quieter benefit. When you can hand Marcus a schema file that states exactly what the system accepts and rejects at its border, you have handed him a validation artifact. He is required to produce documentation like that. You just made his job easier, which makes him your ally rather than your gate.

---
