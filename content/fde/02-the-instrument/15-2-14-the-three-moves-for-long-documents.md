---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 15
title: "The three moves for long documents"
slug: "2-14-the-three-moves-for-long-documents"
sectionNumber: "2.14"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 611
status: "raw"
section: "§2.14"
summary: ""
enriched: false
---

## § 2.14 — The three moves for long documents

A 240-page loan file and a question about it. You have exactly three moves, and every "chat with your documents" product on Earth is one of them or a hybrid.

**Move 1 — Stuffing.** Everything in context, ask directly.

*For it:* zero infrastructure, zero retrieval risk. The model sees *all* of it, so cross-document connections come free — "compare the stated income on page 3 with the deposits in appendix C" works without you engineering anything.

*Against it:* the twin ghosts from § 1.5. Cost — you pay for every token on *every question*. And lost-in-the-middle: attention quality sags mid-context, so stuffed does not equal attended. Latency grows too, since prefill time scales with input.

*Mitigation that changes the math:* prompt caching. Stable-prefix the document once and pay a fraction on re-sends. For a document questioned repeatedly in one session, stuffing plus caching is shockingly viable.

*Verdict:* small corpus, many cross-cutting questions, session-shaped usage.

**Move 2 — Retrieval.** Index once as chunks plus embeddings; per question, fetch the top-k relevant pieces into context.

*For it:* per-question cost is tiny and *flat* regardless of corpus size. It is the only move that scales to gigabytes. Focused context also dodges lost-in-the-middle.

*Against it:* real infrastructure, and a new failure surface — **retrieval can miss, and the model cannot use what wasn't fetched.** Garbage retrieved, garbage grounded. Cross-document synthesis suffers when the relevant pieces don't co-retrieve.

*Verdict:* large or growing corpus, many users, pointed questions.

**Move 3 — Summarising.** Compress in stages: chunk, summarise each, summarise the summaries. Or *refine*: a running summary updated chunk by chunk.

*For it:* handles corpora beyond any window, and produces a durable artifact — the summary itself has value. It's also exactly how chat memory works.

*Against it:* **lossy by design.** The detail your question needed may be the detail compression discarded, and hierarchical summaries compound small distortions. Slow, and costs LLM calls up front.

*Verdict:* the task *is* synthesis or overview, or the corpus dwarfs everything.

**The architect's decision axes** — commit the axes, not the answers. Corpus size versus window. Question type: pointed lookup wants retrieval, global synthesis wants stuffing if it fits. Query volume: one-off wants stuffing, thousands a day wants retrieval's flat cost. Freshness: a corpus changing hourly wants retrieval with re-indexing. Budget.

And the answer that's usually correct: **hybrids.** Retrieve *then* stuff generously — top-fifty chunks, not top-five, into a big window. Summarise *then* retrieve over the summaries and drill into originals. The three moves are ingredients, not rivals.

**THE DEPLOYMENT LENS — the Meridian decision, made explicitly.**

Run the axes. Corpus: 240 pages per file, 40,000 files a month, growing forever. Question type: pointed lookups ("what's the verified income") *plus* one genuinely cross-cutting question ("does anything in this file contradict anything else"). Volume: enormous. Freshness: every file is new.

**Retrieval wins on cost and scale, and it is not close** — § 1.5 showed stuffing one file is ~128,000 input tokens *per turn*.

But note honestly what retrieval costs you: the contradiction question is exactly the kind that suffers when relevant pieces don't co-retrieve. Stated income on page 3 and the tax transcript on page 180 must land in the same context for the discrepancy to be found — and that's your single most valuable output.

So the answer is a **hybrid**, and you should be able to say why in one breath: *retrieve aggressively into a large window, with a deliberate rule that all income-bearing excerpts co-retrieve regardless of the query.*

That's a real architectural decision, made from axes rather than fashion, and it's the design brief for Document 03.

---
