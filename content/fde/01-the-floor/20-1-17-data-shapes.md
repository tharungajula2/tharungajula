---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 20
title: "Data shapes"
slug: "1-17-data-shapes"
sectionNumber: "1.17"
part: "PART II — THE ENGINEER'S FLOOR"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 631
status: "raw"
section: "§1.17"
summary: ""
enriched: false
---

## § 1.17 — Data shapes

Every AI system is plumbing for one substance: **structured data flowing as dicts and JSON**. An API request is a dict. The response is nested dicts. A retrieved chunk, an agent's tool call, a config file — dicts, dicts, dicts. Master four shapes and you can read 90% of AI code on sight.

**The two containers.** A `list` is an ordered sequence addressed by position (`msgs[0]`, `msgs[-1]` for last). A `dict` is labelled shelves addressed by key (`msg["role"]`). Real AI data is *nested* — lists of dicts of lists — and fluency means walking nests without blinking.

```python
response = {
  "model": "claude-sonnet-4-6",
  "content": [{"type": "text", "text": "Hello!"}],
  "usage": {"input_tokens": 12, "output_tokens": 4}
}
text = response["content"][0]["text"]         # walk: dict → list → dict
cost_in = response["usage"]["input_tokens"]
safe = response.get("stop_reason", "unknown") # .get = no crash if key absent
print(text, cost_in, safe)
```

**OUTPUT**
```
Hello! 12 unknown
```

**MENTAL TRACE.** Walk the first line hop by hop. `response` is a dict. `response["content"]` returns the list. `[0]` takes the first item of that list, which is a dict. `["text"]` pulls `"Hello!"` out of it. Three hops, three types.

Second line: `response["usage"]` is a dict, `["input_tokens"]` is 12.

Third line is the important one. `response` has no key `"stop_reason"`. Writing `response["stop_reason"]` would crash with `KeyError`. But `.get("stop_reason", "unknown")` says "give me that key if it exists, otherwise give me this fallback" — so `safe` becomes `"unknown"` and nothing breaks. **Every API response you ever handle has optional fields. `.get` with a default is how professionals handle them,** and it is the difference between a pipeline that survives a provider adding a field and one that dies at 3 a.m.

**Functions as contracts.** Read `def cost(tokens: int, price_per_m: float = 3.0) -> float:` as a contract: takes these shapes, returns that shape. Default values, keyword arguments (`cost(tokens=500)`), and returning dicts or tuples cover most real signatures you'll meet.

**JSON — the wire format.** JSON is the universal *text* representation of dicts and lists, and every API speaks it. Two verbs, cold: `json.dumps(obj)` turns a dict into a string to *send*; `json.loads(s)` turns a string into a dict to *receive*.

```python
import json

data = {"applicant_id": "A-4417", "flags": ["thin_file"]}
wire = json.dumps(data)
print(wire)
print(type(wire))

back = json.loads(wire)
print(back["flags"][0])
```

**OUTPUT**
```
{"applicant_id": "A-4417", "flags": ["thin_file"]}
<class 'str'>
thin_file
```

**MENTAL TRACE.** `json.dumps` walks the dict and builds a single string of characters. The printed line *looks* like a dict, which is exactly the trap — `type(wire)` proves it's a string. Then `json.loads` parses those characters back into a real dict, so `back["flags"][0]` works and gives `"thin_file"`.

The classic beginner crash lives right here:

```python
wire = json.dumps({"a": 1})
print(wire["a"])
```
```
TypeError: string indices must be integers
```

That message means exactly one thing: **you forgot `loads` and are indexing a raw string.** Recognise it instantly and you'll save yourself twenty minutes every time.

**The comprehension idiom** rounds out fluency: `[m["text"] for m in messages if m["role"] == "user"]` — filter and extract in one line, everywhere in AI code.

```python
messages = [
    {"role": "user", "text": "What's the DTI?"},
    {"role": "assistant", "text": "38%."},
    {"role": "user", "text": "And the FICO?"},
]
user_texts = [m["text"] for m in messages if m["role"] == "user"]
print(user_texts)
```

**OUTPUT**
```
["What's the DTI?", 'And the FICO?']
```

**MENTAL TRACE.** Read it right to left. `for m in messages` walks the list one dict at a time. `if m["role"] == "user"` keeps only the ones where role is user — that drops the assistant's "38%." Then `m["text"]` on the left says what to collect from each survivor. Result: a list of two strings. Python's printing uses double quotes for the first because the string itself contains an apostrophe — cosmetic, not meaningful.

---
