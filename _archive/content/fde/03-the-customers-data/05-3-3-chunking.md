---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 5
title: "Chunking"
slug: "3-3-chunking"
sectionNumber: "3.3"
part: "PART I — GETTING THE DOCUMENTS IN"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 951
status: "raw"
section: "§3.3"
summary: ""
enriched: false
---

## § 3.3 — Chunking

You can't embed a 240-page file as one vector — one pin can't hold 240 pages of meaning; the embedding averages into mush. You can't embed every sentence alone either — "It increased by 40%" means nothing without the sentence before it.

**Chunking** is deciding where to cut so each piece is small enough to have *one* clear meaning, big enough to *carry its own context*, and shaped so that when retrieved, it actually answers questions.

It looks like a preprocessing detail. It is, in practice, **the highest-leverage quality dial in most RAG systems.** Bad chunks poison everything downstream, and no reranker can resurrect a fact that got severed in half.

### The tension, named

Small chunks give precise retrieval — the vector means one thing — but starved generation, because the model receives fragments missing their context.

Large chunks give rich generation context but blurry retrieval — multi-topic chunks average their meanings, and a pin between two neighbourhoods is in neither — plus wasted window.

Every strategy below is a different resolution of this one tension. There is no universal best; there is best *for a corpus and a question style*, and the only way to know is to measure.

### The strategy ladder

**Fixed-size sliding window.** Cut every N tokens, say 500, with **overlap** of 50–100 so sentences straddling a boundary survive whole in at least one chunk. Dumb, fast, surprisingly hard to beat. Overlap is the load-bearing trick — duplicated storage is a cheap price for never severing a thought. Always measure in *tokens*, not characters.

**Recursive / separator-aware.** The sane default: try to split on paragraph breaks first, then sentences, then words, forcing mid-sentence cuts only as a last resort. Respects the document's own thought-boundaries. This is what every framework's `RecursiveCharacterTextSplitter` actually does — now you know its soul.

**Semantic chunking.** Cut where *meaning shifts*: embed sentences, walk the document, and when consecutive-sentence similarity drops below a threshold, that's a topic boundary. Elegant, costs embedding calls at ingestion, shines on flowing prose without clean structure. Overkill for well-structured documents.

**Structure-aware.** Exploit the document's skeleton — headers, sections, table boundaries, clause numbering. Chunk equals one section, and — the technique that pays forever — **prepend the heading path as context**, so a chunk that begins `tax_2025.pdf > Part I > Adjusted Gross Income:` carries its location in its own text. Both the embedding and the reader know where it came from.

**Parent-child (small-to-big).** The tension dissolved by refusing to choose: embed *small* chunks for precise search, but store a pointer to the *parent* section, and at query time retrieve by the small chunk while handing the model the big parent. Best of both, at the cost of bookkeeping. Remember this exists — it's the answer to an entire class of "my retrieval is precise but my answers lack context" complaints.

### The craft rules

**Never sever atomic units.** A table row from its header. A code block mid-function. A number from its label.

**Attach metadata at birth** — source file, page, document type, dates, tags. Retrieval filters need it later and it's nearly free now, expensive to retrofit.

**Eyeball twenty random chunks before embedding anything.** Thirty seconds of reading catches the mid-sentence massacres that no metric will explain politely.

### The Meridian horror story

Here is why chunking is not a detail in lending. Consider this line in a credit report summary:

```
Total monthly obligations (excluding mortgage): $2,840
```

Naive fixed-size chunking at a boundary that lands mid-line:

**CHUNK 41 (tail)**
```
...revolving accounts in good standing.
Total monthly obligations (excluding
```

**CHUNK 42 (head)**
```
mortgage): $2,840
Payment history shows two 30-day delinquencies...
```

**MENTAL TRACE — follow the damage.** Retrieval for "what are the monthly debt obligations" scores chunk 42 highly; it contains the number and the word "mortgage." Chunk 42 goes into the prompt. Chunk 41 does not.

The model reads `mortgage): $2,840` and produces: monthly debt obligations $2,840, **including** the mortgage — because a fragment beginning with `mortgage):` reads as though the mortgage is part of the figure. The word *excluding* is in the other chunk.

The system then adds the mortgage payment separately, computes DTI on an inflated debt figure, and the memo shows a borrower failing DTI policy who actually passes comfortably.

**Every downstream layer worked perfectly.** Embedding was fine. Search was fine. The model reasoned correctly from what it was given. A single cut in the wrong place produced a wrong lending assessment with a valid-looking citation.

Now the fix:

**CHUNK 41 — structure-aware, heading path prepended**
```
[credit_report.pdf > Section 3: Debt Summary > Monthly Obligations]
Revolving accounts in good standing.
Total monthly obligations (excluding mortgage): $2,840
Mortgage payment (first lien): $1,610
```

**MENTAL TRACE.** The cut now lands on a section boundary, so the qualifier and its number travel together. The heading path is *inside the chunk text*, which means it's part of what gets embedded — a query about "debt summary" now has something to match — and it's visible to the model and to the human reading the citation.

And the neighbouring line is present, so the model can compute both figures correctly rather than guessing which one the number refers to.

**THE DEPLOYMENT LENS.** Financial documents are dense with **qualified numbers**: excluding, net of, year-to-date, annualised, before adjustments. A chunking strategy that separates a qualifier from its figure doesn't produce a degraded answer — it produces a *precisely wrong* one, which is worse, because precisely wrong answers get acted on.

The rule at Meridian: **a number and its qualifying phrase never cross a chunk boundary.** That's a verify-stage assertion you'll enforce in code in § 3.15, not a hope.

---
