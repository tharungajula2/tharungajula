---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 13
title: "Metadata and filters"
slug: "3-10-metadata-and-filters"
sectionNumber: "3.10"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 719
status: "raw"
section: "§3.10"
summary: ""
enriched: false
---

## § 3.10 — Metadata and filters

*"What did the tax transcript say about income — not the application, not the bank statements?"*

Half that question is meaning. Half is **structure**: a document type. Vector similarity cannot see structure. A filter cannot see meaning. Real retrieval is both at once.

**Metadata at birth, cashed in now.** Extend `Chunk`: `applicant_id`, `doc_type`, `page`, `source`, `heading_path`, `doc_date`, `is_third_party`.

That last field is quietly the most valuable one in the Meridian schema. **`is_third_party` distinguishes documents the applicant produced from documents an independent institution produced** — application forms and self-written letters versus IRS transcripts, bureau pulls, and bank-issued statements. The entire discrepancy analysis is a comparison across that boundary, and it's nearly free to record at ingestion and expensive to retrofit.

### Pre-filter versus post-filter

**Post-filter:** retrieve top-k by similarity over everything, then discard non-matching.

Broken in an obvious-once-you-see-it way. Retrieve top-10, filter to `doc_type="tax_transcript"`, and if 9 of 10 came from bank statements you're left holding one chunk. Or zero. **The filter starved the retrieval.**

**Pre-filter:** restrict the search space *first*, then rank top-k within the slice. Always yields k results if the slice holds k chunks.

```
POST-FILTER
  search all 4,200 chunks → top 10
  → 9 are bank statements, 1 is a tax transcript
  → filter to doc_type=tax_transcript
  → 1 chunk survives   ← you asked for 10

PRE-FILTER
  restrict to doc_type=tax_transcript → 340 chunks
  → rank by similarity within those → top 10
  → 10 chunks           ← correct
```

**MENTAL TRACE.** Post-filtering applies the constraint *after* the ranking has already spent all ten slots. The similarity search had no idea you only wanted tax transcripts, so it filled the list with whatever was globally nearest — and the filter then deleted most of it.

Pre-filtering shrinks the candidate pool to 340 chunks *before* ranking, so all ten slots are spent inside the slice you actually asked for.

In your brute-force store this is trivial: filter the list, then run cosine. In pgvector it's the `WHERE` clause plus `ORDER BY` in one query plan, exactly as § 3.5 showed. In dedicated engines it's a filter parameter.

**One deep footnote worth knowing:** pre-filtering *inside* an ANN index is genuinely hard — a filtered-out HNSW node still sits on the graph path — and engines handle it with varying grace. If your filters are very selective and your index is HNSW, measure rather than assume.

### The trap, and the mitigation

A wrong or over-tight filter silently excludes the answer's partition, and **the symptom looks identical to genuine absence.** NOT FOUND either way.

Two cheap mitigations:

**Visibility.** `--show-work` prints the active filters and the *size of the filtered slice*: `searching 340 of 4,200 chunks where doc_type=tax_transcript`. An over-tight filter is then seen, not suspected.

**Fallback honesty.** When a filtered search returns nothing, automatically re-run unfiltered and report: *"nothing in tax transcripts; found this elsewhere:"*

**Never let structure make the system dumber than no structure.** Write that sentence down; it has a long life.

**THE DEPLOYMENT LENS — and this is the fix for the rehearsal failure.**

Recall the § 2.14 architectural decision: retrieve aggressively, *with a deliberate rule that all income-bearing excerpts co-retrieve regardless of the query.*

Here's how it's implemented. Tag every chunk containing a monetary figure in an income context with `income_bearing=true` at ingestion. Then the memo pipeline doesn't run one retrieval — it runs the ordinary hybrid retrieval **plus a guaranteed sweep of `income_bearing=true AND is_third_party=true` chunks for this applicant**, and unions the results.

The discrepancy can now only be missed if the *ingestion* tagging failed, not if the *query* happened to be phrased unluckily. You have converted a probabilistic failure into a deterministic one — and deterministic failures are the kind you can test for.

**That move — replacing a ranking dependency with a structural guarantee for the one fact you cannot afford to miss — is the most transferable idea in this document.** Every deployment has one or two facts like that. Find them, and don't leave them to similarity scores.

### The horizon

Who *sets* the filters? Today, you, explicitly. In products, an LLM parses "what did the tax transcript say about income?" into `{doc_type: "tax_transcript"}` — structured output aimed at query parsing. It's called self-query retrieval, and it's how filters reach users who'll never write one.

---
