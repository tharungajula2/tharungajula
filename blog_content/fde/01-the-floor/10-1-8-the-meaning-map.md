---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 10
title: "The meaning map"
slug: "1-8-the-meaning-map"
sectionNumber: "1.8"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 407
status: "raw"
section: "§1.8"
summary: ""
enriched: false
---

## § 1.8 — The meaning map

Imagine a map where every word, sentence, and document is a *pin*, and the rule of the map is: **things with similar meaning are pinned close together.** "King" is near "queen." "My laptop won't turn on" is near "computer fails to boot" — even though they share almost no words. An **embedding** is the coordinates of a pin on that map. Meaning, turned into numbers you can measure distance between.

**What it literally is.** An embedding model takes text in and outputs a vector — a list of, say, 768 or 1536 numbers. That vector is a point in a 768-dimensional space. You cannot picture 768 dimensions and neither can anyone else. Picture the 2D map and trust that the maths generalises. The only operation that matters is *distance*, or its twin, similarity — usually **cosine similarity**, which scores direction-alignment between two vectors from −1 to 1, in practice about 0 to 1 for text.

**Where the geometry comes from.** Embedding models train on enormous piles of text pairs under one simple pressure: texts appearing in similar contexts, or marked related by humans, get pushed close; unrelated texts get pushed apart. Squeeze billions of examples through that pressure and the space *organises itself* — topic neighbourhoods, tone directions, language bridges (the English and Spanish sentences for "I love dogs" land close). Nobody assigns coordinates. The geometry condenses out of training.

**The killer application: search by meaning.** Keyword search finds *strings*; embedding search finds *meanings*. Embed every document once, store the vectors. At query time, embed the question and find the **nearest neighbours**. Those documents are about the same thing even with zero word overlap. This is semantic search, and it is the beating heart of retrieval. Vector databases are simply purpose-built engines for "store millions of vectors, return nearest neighbours fast."

**Embeddings vs the LM.** Same family, different job. The LM outputs *the next token*. The embedding model outputs *a location*. You will constantly use both in one system: embeddings to *find* the right knowledge, the LM to *write* with it.

That language bridge is not a footnote at Meridian. It means Spanish correspondence and English correspondence about the same thing land near each other in the space — so a search for "disputed charge" can surface a Spanish letter that never contains those words. That is a genuinely useful property and you'll build on it in Document 03.

---
