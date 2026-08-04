---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 6
title: "Embeddings, in your hands"
slug: "3-4-embeddings-in-your-hands"
sectionNumber: "3.4"
part: "PART I — GETTING THE DOCUMENTS IN"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 525
status: "raw"
section: "§3.4"
summary: ""
enriched: false
---

## § 3.4 — Embeddings, in your hands

Document 01 gave you the map-of-meaning as intuition. Now it becomes numbers.

**What you get.** An embedding model takes text and returns a plain list of floats. `len(vector)` is the dimension. That is all an embedding physically is.

**Cosine similarity by hand**, once, with no library doing the thinking:

```python
import math

def cosine(a: list[float], b: list[float]) -> float:
    dot   = sum(x*y for x, y in zip(a, b))
    len_a = math.sqrt(sum(x*x for x in a))
    len_b = math.sqrt(sum(x*x for x in b))
    return dot / (len_a * len_b)

v1 = [1.0, 2.0, 0.0]
v2 = [2.0, 4.0, 0.0]      # same direction, different length
v3 = [0.0, 0.0, 5.0]      # perpendicular

print(round(cosine(v1, v2), 4))
print(round(cosine(v1, v3), 4))
print(round(cosine(v1, v1), 4))
```

**OUTPUT**
```
1.0
0.0
1.0
```

**MENTAL TRACE.** `zip(a, b)` pairs up corresponding elements — `(1.0, 2.0)`, `(2.0, 4.0)`, `(0.0, 0.0)`. The generator `sum(x*y for x, y in zip(a, b))` multiplies each pair and totals them: 2 + 8 + 0 = 10. That's the **dot product**.

`math.sqrt(sum(x*x for x in a))` is the vector's length: √(1+4+0) = √5 ≈ 2.236. For `b`: √(4+16+0) = √20 ≈ 4.472. Dividing: 10 / (2.236 × 4.472) = 10/10 = **1.0**.

`v2` is `v1` doubled — same direction, twice the length — and cosine returns 1.0, ignoring the length entirely. That's the whole point: **meaning lives in direction, not magnitude.**

`v3` points along a different axis with no overlap, so the dot product is 0 and cosine is 0. And any vector compared to itself gives 1.0 — which makes a useful sanity test in your suite.

**Two practical notes to bank.** Many embedding models ship vectors pre-normalised to length 1, and then cosine similarity *equals* the raw dot product — cheaper, one multiply-add per dimension, which is why vector databases often talk about "inner product."

And: **absolute similarity numbers are model-relative.** 0.7 on one model is not 0.7 on another. Only *rankings and contrasts within one model* mean anything. **Never hardcode a "0.8 means related" threshold from folklore.** Derive thresholds from your own data.

### The asymmetry that shapes real systems

Questions and answers are *different kinds of text*. "What's the verified income?" and "Adjusted gross income 96,400" share meaning but share almost no form.

Good retrieval embeddings are trained on question↔passage pairs so these land close anyway. Some models go further and want a task prefix — `query:` versus `passage:` — to embed each side appropriately. **Read your model's card.** Using a query-style embedding for passages, or ignoring a required prefix, is a silent quality killer that no error message will ever report.

**THE DEPLOYMENT LENS.** At Meridian this asymmetry has a specific and expensive form: **underwriters ask in underwriter language and documents speak in document language.**

Tom asks "is he stretched?" The document says "aggregate revolving utilisation 87%." Those are the same question and the same answer and they share not one word. That gap is what § 3.7 and § 3.11 exist to close, and it's why measuring on *Tom's actual phrasing* — not on questions you invented — is the only measurement that counts.

---
