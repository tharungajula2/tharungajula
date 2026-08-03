---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 12
title: "Reranking"
slug: "3-9-reranking"
sectionNumber: "3.9"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 684
status: "raw"
section: "§3.9"
summary: ""
enriched: false
---

## § 3.9 — Reranking

You don't deep-interview all 500 applicants. You skim resumes to a shortlist of 20, *then* interview those carefully.

Retrieval so far has been resume-skimming: fast, cheap, over the whole corpus, roughly right. **Reranking is the interview.**

### Bi-encoder versus cross-encoder

Your retrieval embeddings are a **bi-encoder**: query and document embedded *separately* — documents at ingestion, query at question time — and compared only afterward by cosine. **They never meet.**

That separation is precisely what makes million-scale search possible, and precisely what caps quality: each side is compressed to a single vector *with no knowledge of the other*. Nuance about *this query against this document* is unrepresentable.

A **cross-encoder** feeds query and document *together* into one transformer — full attention between every query token and every document token — and outputs one relevance score. It can see that the document mentions your exact identifier, that it answers the question's specific angle rather than its general topic, or that it merely name-drops the subject in passing.

Dramatically better judgements, at a cost that forbids first-pass use: it runs *per query-document pair*, so scoring a million documents means a million transformer passes.

Hence the architecture the whole industry converged on: **wide cheap net over everything → cross-encoder deep-reads the top 20–50 → final top-k goes to the LLM.**

Recall first, precision second. Those are exactly the words from § 1.12: stage one is engineered for high recall (don't miss the answer), stage two for precision (rank it first).

### The results

Extending the twelve-query table with a fourth column:

```
QUERY                                  SEM  KEY  HYBRID  +RERANK
-----------------------------------------------------------------
is the applicant overextended            1    -      1        1
tradeline reference 4471-88203           9    1      1        1
income instability signs                 2    -      2        1
can he afford another payment            1    8      2        1
does anything contradict the app         3    -      4        2
verified vs stated income                6    5      5        1
-----------------------------------------------------------------
rerank overhead: +180ms p50 per query
```

**MENTAL TRACE.** Look at the last row — "verified vs stated income." Semantic put the tax transcript chunk at rank 6, keyword at rank 5, hybrid fused them to 5. **All three of those are outside a top-4 prompt.** The chunk was retrieved and then thrown away.

The reranker promoted it to rank 1. Why? The cross-encoder read the query *and* the chunk together and saw that a chunk containing "adjusted gross income 96,400" directly answers a question about verified income — a judgement neither the bi-encoder nor BM25 could make, because neither ever saw both texts at once.

That single promotion is the difference between the rehearsal failure at the top of this document and a correct memo.

### What it fixes, and what it can't

**Fixes:** near-miss ordering (right chunk at rank 7, and rank 7 doesn't fit your prompt); topical-but-useless results (mentions the subject, answers nothing); fusion ties.

**Cannot fix: what the net never caught.** Reranking is re-ordering. No interview saves a candidate who never applied. Widen the net — retrieve 50 to rerank, not 10 — or fix queries, or fix chunks.

**The menu**, axes not brands: local open cross-encoders (free, private, milliseconds per pair on CPU for small models), hosted reranker APIs (stronger, per-call cost), and LLM-as-reranker (flexible, slowest, priciest — and note it's LLM-as-judge wearing a retrieval hat, biases included).

**The knobs:** how many to rerank (20–50 is the sweet spot), and whether to rerank at all. For keyword-exact queries where BM25's top result is definitionally correct, an interview adds latency and nothing else.

**Retrieval quality is a ladder you climb as far as the query needs** — hybrid, then rerank, then query surgery — each rung paid for by evidence, never by fashion.

**THE DEPLOYMENT LENS.** 180ms is nothing when Tom is waiting for one file. Multiply by 40,000 files a month with several retrievals each and it becomes a real latency and compute budget.

The answer is **routing**: rerank the conceptual queries where it earns its keep, skip it for identifier lookups where it doesn't. And the way you decide is not intuition — it's the per-query-class measurement in § 3.16.

---
