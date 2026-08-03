---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 22
title: "Retrieval and forgetting"
slug: "4-18-retrieval-and-forgetting"
sectionNumber: "4.18"
part: "PART III — MEMORY"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 314
status: "raw"
section: "§4.18"
summary: ""
enriched: false
---

## § 4.18 — Retrieval and forgetting

Two questions make a store *useful* instead of merely *full*: which memories surface when, and which fade.

**Why similarity alone fails.** Documents get ranked by semantic similarity and that's fine. Memories have properties documents don't: some are *more important*, some are *more recent*, some have *proven useful*. A score ignoring these surfaces the similar-but-trivial over the crucial-but-differently-worded.

**score = α·similarity + β·importance + γ·recency (+ δ·usage)**

*Similarity* — is this memory about what's being discussed. *Importance* — a salience score assigned at extraction, so crucial memories outrank trivia at equal similarity. *Recency* — usually an **exponential decay** of age, so influence fades smoothly and fresh context beats stale. *Usage* — memories retrieved and confirmed useful get boosted, though careful, this can entrench.

**Recency as decay is soft forgetting.** Old memories don't vanish; they lose pull unless importance or repeated relevance keeps them alive. It mirrors human memory well, and it solves a real problem — without decay, a store full of years of memories retrieves ancient irrelevancies with the same force as yesterday's crucial fact.

**The forgetting spectrum.** *Decay* — influence fades, memory remains, reversible. *Archival* — cold memories move to slow storage, out of the hot path but recoverable. *Compaction* — merge many specific memories into one general one, forgetting *detail* while keeping *essence*. *Hard deletion* — gone, and required for privacy, corrections, and hygiene.

**The design imperative: a memory store must support deletion by design.** Retrofitting "forget this specific thing" onto a system that assumed permanence — especially once memories are embedded, summarised, and entangled — is a nightmare, and § 4.19 makes you feel it.

**Why forgetting is a feature.** A system that remembers everything forever is not smarter. It's slower, noisier, more expensive, and a privacy liability. **The goal is not maximal recall; it's optimal relevance** — and that requires letting go.

---
