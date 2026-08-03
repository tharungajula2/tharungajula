---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 18
title: "The ingestion pipeline"
slug: "3-15-the-ingestion-pipeline"
sectionNumber: "3.15"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 741
status: "raw"
section: "§3.15"
summary: ""
enriched: false
---

## § 3.15 — The ingestion pipeline

Everything so far ingested files with a script you ran by hand and trusted on faith. Production retrieval lives or dies at ingestion — poisoned-at-birth failures are unfixable downstream — and Meridian's corpus is 40,000 new files a month, forever.

### The five stages

**Stage 1 — Parse.** Walk the source; per file, parse *structure*: document type, page boundaries, header tree, table boundaries (atomic — never split), and the domain-specific entities you'll want later (account numbers, dates, monetary figures with their qualifiers).

**Stage 2 — Chunk.** Structure-aware, heading-path prepended, atomic units respected, token-budget ceiling with recursive sub-splitting and overlap for oversized sections, junk dropped. **"Clean" is enforced, not hoped.**

**Stage 3 — Embed, batched and resumable.** And here's where a real pipeline diverges from a script: **content-hash idempotency.** Per chunk, compute a hash of the content and store it. On re-runs, *skip unchanged chunks.*

Re-embedding 4,000 untouched chunks because one document changed is amateur hour. This single design choice makes the pipeline safely re-runnable forever, and it is the direct cure for stale-index disease: **re-run often because re-running is nearly free.**

**Stage 4 — Store.** Batched upserts keyed on source plus chunk-index. The pipeline *updates*, never blindly duplicates. Deleted or superseded documents get their chunks purged — staleness works in both directions.

**Stage 5 — Verify, and fail loudly.**

```python
def verify(chunks: list[Chunk]) -> None:
    for c in chunks:
        assert MIN_TOKENS <= c.token_count <= MAX_TOKENS, f"{c.id}: {c.token_count} tokens"
        assert c.source and c.page and c.doc_type, f"{c.id}: missing metadata"
        assert not c.content[:1].islower(), f"{c.id}: starts mid-sentence"
        assert qualifier_intact(c.content), f"{c.id}: qualifier severed from figure"
```

**OUTPUT** (a bad run)
```
AssertionError: c4412: qualifier severed from figure
```

**MENTAL TRACE.** `assert CONDITION, MESSAGE` raises `AssertionError` with that message when the condition is false, and does nothing when it's true. Four checks per chunk.

The token bounds catch both severed fragments and unsplit giants. The metadata check catches chunks that would produce unverifiable citations. `c.content[:1].islower()` takes the first character and asks whether it's lowercase — a crude but effective signal that the chunk begins mid-sentence.

And the fourth is the Meridian-specific one from § 3.3: `qualifier_intact` scans for a monetary figure whose qualifying phrase — *excluding*, *net of*, *year-to-date* — appears within the same chunk. Chunk 4412 has a dollar figure whose qualifier got cut away, so the pipeline **stops** rather than embedding a chunk guaranteed to produce a wrong DTI.

**Pipeline QA as code that fails loudly, rather than eyeballs that get tired.** The whole run halts; nothing poisoned enters the index.

Plus a **retrieval smoke test**: three known query-to-chunk pairs must hit at rank 3 or better, or the seed is declared bad.

### The report

```
$ python -m meridian_ingest sync --source ./extract --verify

files seen ................ 200
files changed .............. 1
chunks new ................. 0
chunks updated ............. 3
chunks skipped ......... 4,197
chunks purged .............. 0
verify ................... PASS (4,200 chunks, all assertions)
smoke test ............... PASS (3/3 at rank ≤ 3)
elapsed .................. 0.9s
```

**MENTAL TRACE.** One document changed. The content hashes for 4,197 chunks matched what's already stored, so they were skipped entirely — no re-embedding, no database write. Three chunks were re-embedded and upserted.

Nine-tenths of a second, versus the several minutes a full re-embed would take. **That's the idempotency design paying for itself**, and it's what converts re-indexing from a scary batch job into something you run casually and often.

**THE DEPLOYMENT LENS.** This report is an operational artifact, and it's also a compliance one.

Stale-index disease at Meridian has a specific shape: a document is amended — a corrected tax transcript arrives — and the memo continues citing the superseded version. **The citation checks out. The page exists. The number is simply obsolete.** That's a wrong lending decision with a perfect audit trail pointing at it, which is arguably worse than no audit trail at all.

Two requirements follow. **Ingestion runs on document arrival, not on a schedule** — a nightly sweep means up to 24 hours of confidently citing superseded documents. And **every chunk carries an `ingested_at` timestamp and a `superseded` flag**, so a memo can state which version of a document it read.

`[RECEIPT]` **The idempotent pipeline with the verify stage and the sync report.** The screenshot of `4,197 skipped, 0.9s` is the trophy. It demonstrates you think about pipelines as operable systems rather than scripts, which is exactly the distinction the 80% is made of.

---
