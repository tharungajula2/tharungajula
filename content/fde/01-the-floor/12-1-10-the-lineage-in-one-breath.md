---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 12
title: "The lineage, in one breath"
slug: "1-10-the-lineage-in-one-breath"
sectionNumber: "1.10"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 349
status: "raw"
section: "§1.10"
summary: ""
enriched: false
---

## § 1.10 — The lineage, in one breath

Every ancestor of the Transformer died of a specific disease, and the Transformer inherited every cure. Walk the tree once and the architecture stops being a miracle and becomes an inevitability.

**Gen 1 — words as counts. TF-IDF.** Represent a document by word counts, weighted so words frequent *in this document* but rare *across all documents* score highest. Powered a generation of search engines, and its descendant BM25 is still a respectable keyword baseline — you'll use it inside hybrid search. **The disease: no meaning.** "Car" and "automobile" are as unrelated as "car" and "banana." Word order discarded entirely.

**Gen 2 — words as vectors. Word2Vec, 2013.** The insight: *a word is known by the company it keeps*. Train a small network to predict a word from its neighbours across billions of sentences, and the vectors arrange themselves by meaning. This is § 1.8's embedding idea at birth. **The disease: one frozen vector per word.** "Bank" gets a single vector awkwardly averaging riverbank and finance. Context can't move meaning.

**Gen 3 — reading in order. RNNs and LSTMs, 2014–2017.** Recurrent networks read token by token carrying a running memory; LSTMs added learned gates deciding what to keep and forget. Now context exists. **Two diseases:** distant information still faded, and strict sequential reading made training unparallelisable — you cannot throw ten thousand GPUs at a model that must finish word 4 before touching word 5. Scale hit a wall.

**Gen 4 — everyone looks at everyone. Transformers, 2017.** Recurrence deleted. Every token attends to every token directly, no decay across distance. All positions compute in parallel, so the GPU wall falls. And every word's representation is rebuilt *from context* at every layer — so "bank" finally means the right thing in each sentence, curing Gen 2's disease too.

**Say it out loud:** counts had no meaning → vectors had meaning but no context → recurrence had context but no reach and no parallelism → attention had reach, context, *and* parallelism, and parallelism is what let it eat the entire internet.

---
