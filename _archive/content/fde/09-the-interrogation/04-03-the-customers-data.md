---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 4
title: "THE CUSTOMER'S DATA"
slug: "03-the-customers-data"
sectionNumber: "03"
part: "PART I — FAST RECALL"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 1171
status: "raw"
section: "§03"
summary: ""
enriched: false
---

## 03 — THE CUSTOMER'S DATA

**Name the three diseases retrieval treats, and why they're architecture problems.**
Hallucination on thin knowledge, staleness, and no provenance. A better model shrinks none of them fundamentally — the knowledge is in the wrong place.

**Make the retrieval-versus-fine-tuning case in one line.**
Fine-tune for behaviour, retrieve for knowledge, and they compose.

**What new failure surface does retrieval buy?**
Retrieval can miss, and grounded-in-garbage is still garbage. The system is only as good as its worst layer.

**State the chunking tension.**
Small chunks give precise retrieval and starved generation. Large chunks give rich context and blurry retrieval.

**Why is overlap load-bearing in fixed-size chunking?**
A sentence straddling a boundary survives whole in at least one chunk.

**What does parent-child chunking dissolve, and what does it cost?**
The size tension — embed small for precision, retrieve the large parent for context. It costs bookkeeping.

**Give the credit-specific chunking rule.**
A number and its qualifying phrase never cross a chunk boundary. Financial documents are dense with *excluding*, *net of*, *year-to-date* — separating a qualifier from its figure produces a precisely wrong answer, which is worse than a vague one.

**Define recall@k and why every ANN index is a dial.**
Of the true k nearest, what fraction the index returned. Every index exposes knobs trading speed against recall.

**Explain IVF's failure mode and name its dial.**
A true neighbour just across a cluster border gets missed. `nprobe`.

**Explain HNSW and name both dials.**
Layered graph, greedy hops from sparse highways down to dense local links. `M` for links per node, `ef_search` for beam width.

**Make the case for pgvector in one sentence, and against it in one.**
Vectors live next to your relational data, so you get one database, real transactions, and metadata filtering in the same query plan. Against: at hundreds of millions of vectors and extreme query rates, dedicated engines pull ahead.

**Why is pgvector often right at a bank for a non-technical reason?**
They already run Postgres with a DBA, backups, and a passed security review. An extension is a change request; a new datastore is a vendor review.

**Recite the five verbs of a retrieval pipeline.**
Ingest, chunk, embed and store, retrieve, answer.

**Justify each clause of the grounded prompt.**
Strict context fights hallucination. NOT FOUND makes honest failure visible and testable. Bracket citations preview structured attribution. Delimiters are injection hygiene.

**State the single most important operational habit in retrieval.**
When the answer is wrong, look at the chunks first.

**Name three query types where keyword search structurally beats semantic.**
Exact identifiers, jargon and codes, and names. Embeddings compress meaning, and compression discards exact identity.

**Recite BM25's three stacked intuitions.**
Saturating term frequency, inverse document frequency so rare words carry the query, and length normalisation.

**Why is score-averaging across retrievers broken, and what replaces it?**
Cosine and BM25 live on incommensurable scales — it's adding rupees to kilometres. RRF fuses rankings instead: sum of 1/(rank + k).

**Name RRF's three properties.**
Scale-free, consensus-rewarding, and k is a diplomacy dial flattening adjacent ranks.

**What can fusion never do?**
Summon a chunk neither retriever found. It re-orders; it doesn't discover.

**Bi-encoder versus cross-encoder — what does each see?**
Bi-encoder embeds query and document separately; they never meet, which is what makes million-scale search possible and what caps quality. Cross-encoder feeds both together with full attention and outputs one relevance score.

**Map recall and precision onto the two retrieval stages.**
Stage one is engineered for recall — don't miss the answer. Stage two for precision — rank it first.

**What can reranking structurally not fix?**
What the net never caught. No interview saves a candidate who never applied.

**Demonstrate post-filter starvation.**
Retrieve top-10, filter to one document type, nine were other types — you're left with one chunk. Pre-filtering restricts the search space first and always returns k if the slice holds k.

**State the filter-misfire mitigations and the design principle.**
Show the active filters and the filtered slice size. Fall back to unfiltered on an empty result and say so. **Never let structure make the system dumber than no structure.**

**Name the four query medicines and the disease each treats.**
Expansion — vocabulary mismatch. Conversational rewriting — context-dependence in chat. Decomposition — compound independent questions. HyDE — the question-versus-answer form asymmetry.

**Explain HyDE via the decoy metaphor, and where hallucination is safe.**
Generate a fake answer, embed *that*, and retrieve with it. The facts are garbage but the form matches real answer-documents, so it lands in the right neighbourhood. Hallucination is safe for locating a neighbourhood and forbidden in the final answer.

**Draw the decomposition/multi-hop line.**
Decomposition is independent sub-queries, run in parallel. Multi-hop is dependent sub-queries, sequential, each built from the last hop's answer.

**Why does single-shot fail on multi-hop, for two independent reasons?**
The query vector averages both sub-questions and lands between neighbourhoods. And hop two's query contains information that doesn't exist yet.

**What is multi-hop, in agent vocabulary?**
The agent loop with retrieval as the only tool.

**Why claims-with-ids rather than prose brackets?**
The structure makes verification mechanical. Schemas aren't parsing convenience — they're what makes downstream checking possible at all.

**Recite the three citation validation checks.**
Referential integrity — every cited id was actually retrieved. Existence — every claim has at least one citation. Support — does the cited chunk actually contain support.

**Make the enterprise argument for visible refusal.**
A system that visibly declines beats one that quietly invents, every time. Silence is testable; invention is not.

**Reproduce the retrieval failure taxonomy by stage.**
Ingestion — bad parsing, stale index. Retrieval — vocabulary miss, bad chunks, ranked out, filter misfire. Generation — lost in the middle, unfaithful generation, refusal miscalibration.

**Why is stale index uniquely insidious?**
Nothing looks wrong. The citation checks out — against the old chunk.

**Walk the diagnostic protocol for "answer is wrong, chunks look right."**
Fact present in context → check ranking, mid-pack of many suggests lost-in-the-middle → check whether it's cited, uncited suggests unfaithful generation → check whether the claim follows from the cited chunk.

**Explain content-hash idempotency and the disease it cures.**
Hash each chunk's content and skip unchanged chunks on re-runs. It makes re-indexing nearly free, which cures stale-index disease — you re-run often *because* it's cheap.

**State the two-organ principle.**
Retrieval and generation fail independently, so measure them separately. An end-to-end score is diagnostic mush.

**Define all four retrieval metrics as arrows.**
Context recall and precision are context↔question. Faithfulness is answer↔context. Answer relevance is answer↔question.

**Context recall versus recall@k — the trap.**
Same word, different referee. recall@k measures against geometric truth — the actual nearest vectors. Context recall measures against semantic truth — chunks a human says are needed.

**Why is a false hit the worst failure in semantic caching?**
A wrong answer is served confidently and silently, for free. A miss merely costs a normal call. Precision-first, always.

**Why is applicant-scoped semantic caching dangerous?**
The same question has a different correct answer per file. Cache the policy corpus; never the applicant corpus.

---
