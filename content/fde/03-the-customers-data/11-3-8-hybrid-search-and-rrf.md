---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 11
title: "Hybrid search and RRF"
slug: "3-8-hybrid-search-and-rrf"
sectionNumber: "3.8"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 660
status: "raw"
section: "§3.8"
summary: ""
enriched: false
---

## § 3.8 — Hybrid search and RRF

Two scouts searched the library: one hears *meaning*, one sees *exact words*. Each returned a ranked list; each is blind where the other is sharp.

The naive merge — compare their scores — fails immediately. Cosine's 0.83 and BM25's 12.4 live on incommensurable scales; averaging them is adding rupees to kilometres.

The elegant fix: **ignore scores entirely, fuse the rankings.**

**RRF — Reciprocal Rank Fusion.** For each document, sum over every ranked list it appears in:

**RRF(d) = Σ 1/(rank_in_list + k)**, with k ≈ 60 by convention.

Rank 1 in one list contributes 1/61. Rank 5 contributes 1/65. Absent contributes 0. Sort by total. Done.

```python
def rrf_fuse(lists: list[list[str]], k: int = 60) -> list[tuple[str, float]]:
    scores: dict[str, float] = {}
    for ranked in lists:
        for position, doc_id in enumerate(ranked, start=1):
            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (position + k)
    return sorted(scores.items(), key=lambda pair: pair[1], reverse=True)

semantic = ["c7", "c2", "c9", "c4"]
keyword  = ["c4", "c7", "c11", "c2"]

for doc_id, score in rrf_fuse([semantic, keyword]):
    print(f"{doc_id}: {score:.6f}")
```

**OUTPUT**
```
c7: 0.032522
c4: 0.032018
c2: 0.031754
c9: 0.015873
c11: 0.015873
```

**MENTAL TRACE — walk it by hand, because this is a formula you should be able to compute in an interview.**

`enumerate(ranked, start=1)` walks a list giving both position and value, counting from 1 rather than 0 — so `c7` in the semantic list arrives as position 1.

**c7** appears at position 1 in semantic and position 2 in keyword: 1/61 + 1/62 = 0.016393 + 0.016129 = **0.032522**.

**c4** appears at position 4 in semantic and position 1 in keyword: 1/64 + 1/61 = 0.015625 + 0.016393 = **0.032018**.

**c2** appears at position 2 and position 4: 1/62 + 1/64 = **0.031754**.

**c9** appears only in semantic at position 3: 1/63 = **0.015873**. Same for **c11**, keyword only.

`scores.get(doc_id, 0.0)` returns the running total or zero if this is the document's first appearance — the `.get`-with-default habit from Document 01. `sorted(..., key=lambda pair: pair[1], reverse=True)` sorts by the second element of each pair, descending.

Now read the *result*, which is the actual lesson. **c7 wins without being ranked first by either scout** — it was 1 and 2, and that consensus beats c4's spectacular-then-mediocre 1 and 4. And everything appearing in only one list falls to the bottom regardless of its position there.

### The three properties

**Scale-free.** Only positions matter, so any two — or five — retrieval systems fuse without score-normalisation gymnastics.

**Consensus-rewarding.** A document ranked 3 by both scouts typically beats one ranked 1 by a single scout and invisible to the other. Which is exactly what you want when each scout has known blind spots.

**k is a diplomacy dial.** It flattens the difference between adjacent ranks — 1/61 versus 1/62 is tiny — preventing any single list's champion from steamrolling the consensus. Smaller k trusts top ranks harder; larger k is flatter and more democratic. Convention says 60. Test it rather than inherit it.

### The build

Upgrade `retrieve` into a three-path engine: semantic top-20, keyword top-20 (deliberately deep — fusion wants long lists to find consensus in), then fuse and truncate.

Keep all three modes callable: `retrieve(query, mode="hybrid" | "semantic" | "keyword")`. **A retrieval system you can't decompose is a retrieval system you can't debug** — every future incident will start with "which path missed this?"

**Two honest footnotes.** Hybrid isn't free: two searches per query, though both are fast and parallelisable with `asyncio.gather`. And **fusion quality is capped by candidate quality.** RRF re-orders what the scouts brought; it cannot summon a chunk neither found. Fixing that requires better queries or better chunks.

`[RECEIPT]` **`rrf_fuse` as a pure function with a hand-computed test suite**, plus the twelve-query comparison table across all three modes with success criteria written down *before* running. Testing a pure function is a pleasure, and the table is the kind of evidence that makes a technical interviewer sit up.

---
