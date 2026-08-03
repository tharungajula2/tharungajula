---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 17
title: "The failure taxonomy"
slug: "3-14-the-failure-taxonomy"
sectionNumber: "3.14"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 739
status: "raw"
section: "§3.14"
summary: ""
enriched: false
---

## § 3.14 — The failure taxonomy

Your system answered wrong. Where do you even look?

A retrieval system is a chain of six-plus stages, any of which can silently fail while every other stage works perfectly — and **the final answer looks identical in all cases: fluent, confident, wrong.**

This section is the diagnostic taxonomy. After it, debugging stops being archaeology and becomes differential diagnosis.

### Ingestion failures — poisoned at birth

**Bad parsing.** PDFs mangling tables into token soup, headers merged into body text, columns collapsed. Garbage entered the index looking like content; no downstream stage can un-mangle it. *Symptom:* retrieved chunks that are visibly broken text. *Fix:* parse-stage QA, format-aware parsers.

**Stale index.** The document changed; the index didn't. *Symptom:* answers correct *for last month*. Uniquely insidious, because nothing looks wrong — the citation checks out against the old chunk. *Fix:* re-indexing as a *process*, with index timestamps in metadata so staleness is at least visible.

Note the pattern worth saying out loud: retrieval cured weight-staleness and created index-staleness. **Every cure breeds its own disease at the new layer.**

### Retrieval failures — the right page never arrived

**Vocabulary miss.** Query words aren't corpus words. *Fix:* § 3.11.

**Bad chunks.** The fact exists but was severed mid-thought, or buried in a multi-topic chunk whose averaged embedding matches nothing well. *Symptom:* retrieval returns the right *document's* wrong *pieces*. *Fix:* re-chunk.

**Ranked out.** Retrieved at rank 7; the prompt takes top-4. Present, then discarded. *Fix:* rerank, or widen k.

**Filter misfire.** A metadata filter excluded the very partition holding the answer. *Symptom:* great answers without the filter, NOT FOUND with it.

### Generation failures — right page, wrong reading

**Lost in the middle.** The answer sat in chunk 6 of 12 stuffed chunks. Retrieval succeeded; *attention* failed. *Symptom:* the inspection window shows the fact plainly present in context, and the answer ignores it. *Fix:* fewer and better chunks, rerank then truncate hard, order by relevance with the best chunks first and last — and **resist the "just stuff more" reflex. More context is not more attention.**

**Unfaithful generation.** The model answers from its weights *despite* the provided context, or blends context with confabulation. Your citation validation catches its crudest form; only measurement catches it reliably.

**Refusal miscalibration.** Over-refusal — context was sufficient, model said NOT FOUND anyway, usually a too-strict prompt. Under-refusal — context insufficient, model winged it. The second is the worse sin.

### The diagnostic protocol

Order matters. Write this once and it's yours forever.

```
Answer is wrong.
│
├─ STEP 1: Look at the retrieved chunks.  ← always first, splits the tree
│
├─ Fact ABSENT from retrieved context
│   ├─ Is it in the index at all? (search the store directly)
│   │   ├─ NO  → ingestion failure or stale index
│   │   └─ YES → which path missed it?  (run mode=semantic / mode=keyword separately)
│   │       ├─ both missed  → vocabulary miss, or bad chunks
│   │       ├─ found but low → ranked out → rerank / widen k
│   │       └─ filter active → check slice size → filter misfire
│
└─ Fact PRESENT in retrieved context
    ├─ Ranked where? mid-pack of many → lost in the middle
    ├─ Cited? no → unfaithful generation
    └─ Cited but claim doesn't follow → faithfulness failure
```

**MENTAL TRACE of the rehearsal failure at the top of this document**, walked through the tree:

Answer wrong. Step 1: look at the chunks. The tax transcript figure is **absent**. Is it in the index? Yes — searching the store directly finds it. Which path missed it? Running both modes separately: semantic ranked it 6, keyword didn't find it. So it was **found but ranked out**.

Diagnosis: ranked out. Fixes available: rerank (§ 3.9 promoted it to rank 1), or the structural guarantee (§ 3.10 makes it unmissable).

Four steps from symptom to named cause to specific fix, with no guessing. **That's what a taxonomy buys you.**

**THE DEPLOYMENT LENS.** Print the tree. Put it in the repo. Walk Meridian's engineers through it before handover, because in month nine you will be gone and somebody will get a wrong memo at 4pm on a Friday.

The team that has this tree resolves it in twenty minutes. The team that doesn't opens a ticket saying "the AI is wrong" and nobody can act on it. **The difference between those two outcomes is a diagram you drew once.**

---
