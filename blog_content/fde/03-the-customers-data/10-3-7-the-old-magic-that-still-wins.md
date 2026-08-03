---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 10
title: "The old magic that still wins"
slug: "3-7-the-old-magic-that-still-wins"
sectionNumber: "3.7"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 729
status: "raw"
section: "§3.7"
summary: ""
enriched: false
---

## § 3.7 — The old magic that still wins

Plot twist for a document about vectors: the search technology from *before* embeddings — matching literal words, scored cleverly — still beats semantic search outright on a huge class of queries. Every serious RAG system ships both.

**Where vectors go blind.** Embeddings compress meaning, and compression discards *exact identity*. Search for an account number, a tradeline ID, an error string, a version, a person's name — semantic search retrieves things *about the same topic* while missing the chunk containing the literal token. In meaning-space, two account numbers are neighbours, which is precisely wrong when you asked for one of them.

Flip side: keyword search is the one blind to "is he stretched?" versus "revolving utilisation 87%."

**Two blindnesses, perfectly complementary.** Hold that for one section.

### BM25, demystified

Three intuitions stacked. This is TF-IDF's direct descendant, alive and winning.

**Term frequency, saturating.** A chunk mentioning your query word three times beats one mentioning it once — but fifty mentions isn't seventeen times better than three. BM25's frequency term flattens out, which is what made it robust where raw counting was spammable.

**Inverse document frequency.** Rare words carry the query. In a corpus of loan files, `payment` matches everything and is worth almost nothing; `forbearance` matches three chunks and is worth gold. Weight is proportional to rarity across the corpus.

**Length normalisation.** A 2,000-word chunk gets more word-lottery tickets by sheer size, so BM25 penalises length — a tight 100-word chunk containing your terms beats a rambling giant that mentions them in passing.

Score equals the sum over query terms of saturating-TF × IDF × length-norm. That's the whole king. Decades old, brutally fast via an inverted index (word → list of chunks containing it, exactly like a book's index page), zero GPU, and **interpretable** — you can always see exactly why a chunk matched, a debugging luxury vectors never grant.

**In practice.** Postgres ships full-text search natively: `tsvector` (text processed into stemmed, stop-worded lexemes — "running", "runs", "ran" all become `run`), `tsquery` (the parsed query), a GIN index for speed, `ts_rank` for scoring.

Which means — pgvector callback — **one Postgres serves both modalities on the same table.** A `tsvector` column beside your `vector(384)` column. That co-location is what makes the next section clean, and it's a real architectural argument you can now articulate.

**Stemming's sharp edge.** The same normalisation that unifies run/running/ran can mangle identifiers and codes. Stop-word lists can eat meaningful short tokens. For a corpus full of account numbers and reference codes, configure keyword search to preserve them, or index both raw and stemmed. A tiny config detail with outsized consequences.

### The duel

Eight queries against the Meridian corpus, four rigged for each side:

```
QUERY                                          SEMANTIC   BM25
-------------------------------------------------------------
tradeline reference 4471-88203                    rank 9   rank 1
"forbearance" mentions in this file               rank 4   rank 1
account ending 6142                              not found  rank 1
FICO                                              rank 6   rank 1
is the applicant overextended                     rank 1   not found
can he afford another payment                     rank 1   rank 8
any sign of income instability                    rank 2   not found
does anything here contradict the application     rank 3   not found
-------------------------------------------------------------
```

**MENTAL TRACE.** A clean four-four split along exactly the predicted lines.

Every keyword win is an **exact identifier** — a reference number, a specific term, a code. Semantic search put `4471-88203` at rank 9 because in meaning-space all tradeline reference numbers look alike; it found *reference-number-shaped* chunks, not *that* reference number.

Every semantic win is a **conceptual question in different vocabulary**. BM25 returns nothing for "is the applicant overextended" because that exact phrase appears nowhere in a credit file. There's no word to match. Zero results, not bad results.

Look at row 3 in particular: semantic search **did not find it at all**, not even at rank 20. That's not a ranking problem you can tune away. It's a structural blindness.

**THE DEPLOYMENT LENS.** Loan files are *dense* with exact identifiers — account numbers, tradeline references, loan numbers, employer EINs, dates, dollar figures.

**A semantic-only system at Meridian would fail on roughly half of what an underwriter actually asks**, and it would fail silently, returning topically-plausible chunks with confident scores.

Any vendor pitching pure vector search over financial documents has not tested on real underwriter questions. That's a useful thing to know when Priya forwards you a competitor's deck.

---
