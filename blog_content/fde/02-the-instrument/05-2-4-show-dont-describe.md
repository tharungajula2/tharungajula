---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 5
title: "Show, don't describe"
slug: "2-4-show-dont-describe"
sectionNumber: "2.4"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 510
status: "raw"
section: "§2.4"
summary: ""
enriched: false
---

## § 2.4 — Show, don't describe

Try describing your company's exact memo tone in words: "professional but warm, concise but not curt…" — hopeless. Now paste three real memos and say "write like these." Instantly right.

That's few-shot prompting: **when describing is hard, demonstrate.** Three examples beat three hundred words of description, because models are pattern-continuers before they are instruction-followers.

**Why it works.** An LLM is a next-token predictor. Show it a run of input→output pairs and the overwhelmingly plausible continuation of the pattern is *another conforming pair*. You're not explaining the task; you're laying down rails.

**Where it's the right tool:** format contracts that must hold exactly; classification with fuzzy boundaries (your labelled examples *define* the boundary — show borderline cases, not easy ones); tone and style transfer; consistent handling of edge cases; and domain conventions no general description captures.

**Craft rules that separate pros from dabblers:**

Format examples exactly like the real turn — same delimiters, same labels, so the pattern is unmistakable.

Cover the space: a normal case, a hard case, and a null or edge case. The model generalises from the spread.

Order matters at the margin — models weight later examples slightly more, so put the most representative one last.

Beware copying disease: examples that are too similar teach surface features ("answers are always twenty words") instead of the rule. Vary the incidentals, hold the rule constant.

Mind the meter: examples ride in the context window on every call and are billed every call. Few-shot is a cost you pay per request.

And the trigger that matters: **when you need twenty-plus examples for acceptable quality, you've left prompting territory and entered fine-tuning territory.** That's the concrete version of Document 01's decision map.

### Examples as fake conversation history

Examples can live in the system prompt as text, or — often stronger — as *alternating user and assistant turns showing ideal exchanges*.

```python
messages = [
    {"role": "user", "content": "<excerpts>[doc: tax_2024.pdf, page: 1] AGI 84,000</excerpts>"},
    {"role": "assistant", "content": '{"verified_income": 84000, "source": {"doc": "tax_2024.pdf", "page": 1}, "fico": null}'},
    {"role": "user", "content": "<excerpts>[doc: application.pdf, page: 2] Applicant declined to state income.</excerpts>"},
    {"role": "assistant", "content": '{"verified_income": null, "source": null, "fico": null}'},
    {"role": "user", "content": "<excerpts>[doc: tax_2025.pdf, page: 1] Adjusted gross income 96,400</excerpts>"},
]
```

**OUTPUT**
```
{"verified_income": 96400, "source": {"doc": "tax_2025.pdf", "page": 1}, "fico": null}
```

**MENTAL TRACE.** The model reads this as a track record: two turns where a specific input produced a specific output shape, then a third input of the same shape. Continuing the pattern means producing the same output shape.

Look at what the second example bought you. It shows a case where the data is **absent** and the correct answer is `null`. Without that example, a model handed a file with no income figure will often produce a plausible number, because plausible-continuation is what it does. **One null example is worth more than three paragraphs of "do not guess."**

This is prefilling's cousin. You're forging a track record rather than issuing an instruction, and the model treats prior turns as established pattern.

---
