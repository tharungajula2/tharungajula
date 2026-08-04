---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 20
title: "Caching by meaning"
slug: "3-17-caching-by-meaning"
sectionNumber: "3.17"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 502
status: "raw"
section: "§3.17"
summary: ""
enriched: false
---

## § 3.17 — Caching by meaning

§ 2.10 left the top rung of the caching ladder empty. You lacked the tool. You've now spent sixteen sections building it.

**Semantic caching: cache lookups by embedding similarity.** Store past query-response pairs with the query embedded. On a new query, embed it and search the cached queries; above a similarity threshold τ, serve the cached response at near-zero cost and latency. Below, generate and cache.

Every part is familiar — an embedding model, a vector store, nearest-neighbour with a threshold. The only new idea is *what's being searched*: **not documents, your own past answers.** Customer number two for the nearest-neighbour machine.

**τ is the whole game, and it's precision and recall again.** Too loose and "verified income?" matches "stated income?" — a **false hit**, a wrong answer served confidently from cache, which is the worst failure in caching because the user got stale-wrong for free and silently. Too tight and the cache degenerates toward exact-match: all cost, no savings.

Set it **empirically on labelled pairs**, precision-first, because a false hit is served silently while a miss merely costs a normal call.

**Invalidation — three clocks, not one.** Time-to-live. Prompt-version busts. And the sharp one for retrieval systems: **the corpus clock.** A cached answer is stale the moment its source document changes, even though the *query* space didn't move.

The clean design: cached entries carry the chunk ids they were built from — **your citations, cashing in again** — and the sync pipeline, on updating chunks, purges cache entries citing them.

Follow that chain and admire it: **citations → invalidation by provenance → a cache that heals itself on sync.** Systems built from honest parts compose like this.

**Where it doesn't apply.** Personalised or filter-dependent answers, where the same words plus different active filters mean different correct answers — the filter state must join the cache key or those queries must bypass. Time-sensitive queries. And cache on the *rewritten standalone* query, never the raw follow-up, or "what about his other debts?" collides across conversations about different applicants.

**THE DEPLOYMENT LENS.** At Meridian, semantic caching is **mostly wrong**, and knowing when *not* to deploy a technique is worth as much as knowing how.

Every question is scoped to a specific applicant's file. "What's the verified income?" has a different correct answer for every one of 40,000 files. A cache keyed on query text alone would be a catastrophe generator — and the failure would be silent, confidently serving one applicant's income figure for another's file.

Where it *does* apply: policy questions. "What's our maximum DTI for unsecured personal loans?" is applicant-independent, asked constantly, and answered from a stable policy document.

So the design is: **semantic cache the policy corpus, never the applicant corpus.** Two retrieval paths, one cached and one not, split on whether the answer is applicant-scoped.

That's the whole judgement, and it took one paragraph of thinking to avoid a class of bug that would have been nearly impossible to detect in testing.

---
