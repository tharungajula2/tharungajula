---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 12
title: "Tracing"
slug: "5-9-tracing"
sectionNumber: "5.9"
part: "PART II — SEEING INSIDE"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 457
status: "raw"
section: "§5.9"
summary: ""
enriched: false
---

## § 5.9 — Tracing

Evals tell you *whether* the system is good. Tracing tells you **what it actually did** — the difference between a thermometer and an X-ray.

**Spans and traces.** A **trace** is the complete record of one run. It's composed of **spans** — nested timed units of work. A span wraps an operation and records start and end time, inputs and outputs, metadata, and **parent-child relationships**.

A trace is therefore a **tree** of spans mirroring your system's actual execution structure.

```
TRACE  memo_run  A-4417            8.41s   $0.031
├─ ingest_check                    0.02s
├─ retrieve                        1.84s
│  ├─ embed_query                  0.11s
│  ├─ vector_search                0.38s   340 of 4,200 chunks (filtered)
│  ├─ bm25_search                  0.09s
│  ├─ rrf_fuse                     0.00s
│  └─ rerank                       1.26s   20 → 4
├─ discrepancy_loop                4.90s   $0.019
│  ├─ hop1_reason                  1.10s   $0.004
│  ├─ hop1_tool  search_file       0.42s
│  ├─ hop2_reason                  1.31s   $0.005
│  ├─ hop2_tool  search_file       0.38s
│  └─ synthesise                   1.69s   $0.010
├─ validate_citations              0.03s   3 claims, 3 cited
└─ gate                            1.62s   safety=write → interrupt
```

**MENTAL TRACE.** Read the tree as architecture made visible per-run.

Child durations sit inside parent durations. `retrieve` takes 1.84s, of which `rerank` is 1.26s — **68% of retrieval time is the reranker**, which is the § 3.9 latency cost, now measured rather than estimated.

Cost is attributed per span. The discrepancy loop is $0.019 of a $0.031 run — most of the money is in the two-hop investigation, and `synthesise` alone is a third of it, because it carries the largest context.

And `validate_citations` shows three claims with three citations. That's the § 3.13 check, visible in the trace, which means **the audit evidence and the debugging evidence are the same artifact.**

**Instrumentation.** *Automatic* — tools hook into your LLM and framework calls and create spans for you. *Manual* — you wrap operations explicitly for precision.

The pragmatic mix: auto-instrument the standard stuff, **manually instrument your domain-specific operations** — a `discrepancy_loop` span, a `gate` span. The operations meaningful to *your* system's logic are the ones no auto-instrumenter knows about.

Nesting happens via **context propagation**: a span created inside another span's context becomes its child automatically.

**What to capture.** Timing. Tokens and cost per span. Inputs and outputs. Model and config version. The reasoning.

**And the privacy constraint, which at Meridian is severe.** Traces contain the actual content of consumer loan documents. A trace store is therefore a second copy of consumer financial data, with its own retention, its own access control, and its own place in a breach.

**Redact at the span boundary, not in the viewer.** Store document ids, page numbers, and citation spans — not full document text. The § 4.19 least-storage principle, applied to observability, and it's the difference between an observability tool and a compliance incident.

---
