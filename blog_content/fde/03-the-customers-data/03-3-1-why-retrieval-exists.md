---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 3
title: "Why retrieval exists"
slug: "3-1-why-retrieval-exists"
sectionNumber: "3.1"
part: "PART I — GETTING THE DOCUMENTS IN"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 651
status: "raw"
section: "§3.1"
summary: ""
enriched: false
---

## § 3.1 — Why retrieval exists

Two exams.

**Closed-book:** you answer from memory. Fast, fluent, and where memory is thin you improvise confidently — sound familiar?

**Open-book:** you find the right page first, then answer *from the page*. Slower, but checkable, and when the book doesn't cover it you can honestly say so.

A bare LLM is a closed-book savant. **RAG — Retrieval-Augmented Generation — is handing it the open book.** The entire domain is the engineering of *finding the right page.*

### The three diseases it treats

Be precise about these, because customers and interviewers will both probe them.

**Hallucination on thin knowledge.** The weights hold internet-frequent facts solidly and everything else as vibes. Meridian's loan files, their credit policy, this applicant — the model has literally never seen them, but will still generate memo-shaped text on request.

**Staleness.** Training ended at a cutoff; the world didn't. Weights cannot learn tomorrow's file.

**No provenance.** Even a *correct* closed-book answer can't point at its source. And enterprise, legal, medical, and lending use cases don't merely *prefer* citations — they're unshippable without them.

Notice what all three share. **They are not model-quality problems.** A better model shrinks none of them fundamentally. They're *architecture* problems: the knowledge is in the wrong place.

That sentence is worth memorising, because every six months a customer will ask whether the newest model makes retrieval unnecessary. It doesn't, and this is why.

### The move, precisely

**Offline — ingestion.** Take the knowledge, split it into chunks, embed each chunk, store text plus vector in something built for nearest-neighbour search.

**Online — query time.** Embed the question, retrieve the top-k nearest chunks, build a skeleton prompt — system rules, retrieved chunks delimited as untrusted data, the question, and "answer only from the provided context; say NOT FOUND if absent; cite which chunk supports each claim" — and generate.

The generation task transforms: from *recall from weights* to *read and synthesise from context*. Models are dramatically better at the second. **That transformation is the whole magic.**

### Versus the alternatives

**Versus fine-tuning.** Fine-tuning shapes *behaviour* — tone, format, domain voice. It's a terrible knowledge store: expensive per update (retrain to add one document?), no provenance, and it doesn't reliably stop hallucination — the model learns your style of being wrong. RAG updates by re-indexing one file, in seconds, and every answer carries receipts.

The mature answer, and the one to give in the room: **fine-tune for behaviour, retrieve for knowledge, and they compose.**

**Versus long-context stuffing.** You already ran this decision in § 2.14. Stuffing wins for small, session-shaped corpora. Retrieval's flat per-query cost and focused context win at scale. RAG is Move 2, industrialised.

### The honest cost — say it before anyone asks

Retrieval adds an entire new failure surface. If retrieval misses, the model answers from a wrong or empty page. **The system is now only as good as its worst layer** — chunking, embedding, search, prompt.

That's not a reason to avoid it. It's the reason this document has seventeen sections instead of three, and why measurement is not optional.

**THE DEPLOYMENT LENS.** Dan will ask, in some form: *"So this thing reads the file?"* The honest answer, and it lands better than you'd expect:

*"It reads a few pages of the file — the ones a search step decided were relevant. That search is a component, it has an accuracy, and it can be wrong independently of the model being right. Most of what I'm going to spend the next six weeks on is that search step, not the AI part. When you see a memo that's missing something, the first question is never 'did the model understand' — it's 'did the right page arrive'."*

You have just given a credit officer an accurate mental model of the system's failure mode, in four sentences, without jargon. That is most of the job.

---
