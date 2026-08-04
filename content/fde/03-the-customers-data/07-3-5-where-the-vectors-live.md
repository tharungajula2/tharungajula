---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 7
title: "Where the vectors live"
slug: "3-5-where-the-vectors-live"
sectionNumber: "3.5"
part: "PART I — GETTING THE DOCUMENTS IN"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 875
status: "raw"
section: "§3.5"
summary: ""
enriched: false
---

## § 3.5 — Where the vectors live

Finding the nearest vectors among a thousand is a for-loop. Among fifty million, a for-loop is a coffee break per query.

Vector databases answer one question — *which stored vectors are closest to this one?* — in milliseconds at any scale, and they all pay for that speed with the same currency: **a little bit of perfection.**

### Exact versus approximate

Brute force compares the query to *every* vector. It's **exact** — the true top-k, guaranteed — at a cost that grows linearly. Fine to around 100,000 vectors. Dead at millions.

Everything beyond is **ANN — approximate nearest neighbour**: structures that check a tiny fraction of vectors and *usually* find the true neighbours.

The honesty metric is **recall@k**: of the true k nearest, what fraction did the index return? Recall of 0.95 means 5% of the time a true neighbour was skipped.

**Speed and recall are a dial, not a fact of nature.** Every index exposes knobs that trade one for the other.

### Machine 1 — IVF, the postal system

At ingestion, cluster all vectors into, say, 1,000 neighbourhoods; each vector files into its nearest centroid's bucket. At query time, compare the query to the 1,000 centroids only, pick the nearest few neighbourhoods — that count is `nprobe`, the dial — and brute-force *inside just those buckets*. You searched about 1% of the data.

The failure mode is geometric and intuitive: **a true neighbour sitting just across a neighbourhood border gets missed** when `nprobe` is low. Raise `nprobe`, recall climbs, speed falls. Needs periodic retraining as data drifts.

### Machine 2 — HNSW, the highway system

A graph, not buckets. Every vector is a node linked to its near neighbours, arranged in *layers* — top layers sparse with long-range highway links, bottom layer dense with local streets.

Query: enter at the top, greedily hop toward the target (each hop moves to whichever neighbour is closest), drop a layer, repeat. Like flying city-to-city, then driving neighbourhood streets. Logarithmic-ish hops instead of linear scans.

This is the reigning default. Dials: `M` (links per node — more means a better graph and more memory) and `ef_search` (how wide the greedy beam is — the recall-versus-speed dial). Costs: the graph lives in RAM, and inserts are pricier because a new node must be wired into the graph. Fast reads, slower writes.

### Machine 3 — pgvector, the "you already have a database" answer

Not a new engine — an extension adding a `vector` column type to Postgres, plus distance operators and both index types above.

```sql
CREATE TABLE chunks (
  id bigserial PRIMARY KEY,
  content text,
  source  text,
  doc_type text,
  page    int,
  embedding vector(384)
);
CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);

SELECT content, source, page, 1 - (embedding <=> $query) AS similarity
FROM chunks
WHERE applicant_id = 'A-4417'          -- metadata filter, in the SAME query
ORDER BY embedding <=> $query          -- <=> is cosine distance
LIMIT 5;
```

**MENTAL TRACE.** `vector(384)` declares a column holding 384-dimensional vectors. The `hnsw` index makes nearest-neighbour lookups fast.

`<=>` is cosine *distance* — smaller means closer — so `ORDER BY embedding <=> $query` sorts nearest-first, and `1 - distance` converts it back to a similarity for display.

The `WHERE` clause is the part to notice. **Metadata filtering and vector search happen in one query plan** — the database restricts to one applicant's chunks *and then* ranks by similarity within them. § 3.10 is entirely about why that matters.

**Why engineers love it:** vectors live *next to* your relational data. One database, real transactions, SQL joins, metadata filtering for free.

**Why it isn't always the answer:** at very large scale — hundreds of millions of vectors, extreme query rates — dedicated distributed engines pull ahead.

The landscape in one breath: **pgvector** (SQL-native, pragmatic default for most products), **FAISS-style libraries** (raw index in your process, no server, you own persistence), **embedded stores** like Chroma (developer-friendly local default), **client-server engines** like Qdrant, Weaviate, Milvus, Pinecone (scale, ops features, money).

**One quiet superpower to bank:** a vector database stores *any* embeddings — text today, images or behaviour vectors tomorrow. The machine is "nearest neighbour at scale"; text search is merely its most famous customer. § 3.17 is customer number two.

**THE DEPLOYMENT LENS — and this one decides your architecture at Meridian.**

Meridian already runs Postgres. They have a DBA, backup procedures, an approved encryption-at-rest configuration, and a security review that Postgres has already passed.

Introducing a new datastore means: a vendor security review, a data residency question, a backup and disaster-recovery story, someone to operate it, and a line item. Introducing a Postgres *extension* means a change request.

**pgvector is the right answer here and the reason is organisational, not technical.** Say it plainly: *"We can do this inside the database you already run, backed up by the procedures you already have. That's not a performance argument — a dedicated vector engine would be faster at ten times this scale. It's a 'we can be live in six weeks instead of six months' argument."*

That sentence is FDE judgement in one line. The best technical option and the best *deployable* option are frequently different, and knowing which question you're answering is the whole skill.

---
