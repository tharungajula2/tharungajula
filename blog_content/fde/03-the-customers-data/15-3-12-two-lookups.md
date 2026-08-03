---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 15
title: "Two lookups"
slug: "3-12-two-lookups"
sectionNumber: "3.12"
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "narrative"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 726
status: "raw"
section: "§3.12"
summary: ""
enriched: false
---

## § 3.12 — Two lookups

*"Does anything in the bank statements contradict the income the applicant stated?"*

No chunk answers that. The answer lives in **two** chunks connected by a fact: first find *what the applicant stated* (hop one), *then* search for *deposits consistent or inconsistent with that figure* (hop two — a query you could not have written until hop one answered).

Single-shot retrieval structurally cannot do this, no matter how good the ranking gets.

**Why it fails, precisely.** The query vector for the compound question is an average of both sub-questions' meanings — it lands *between* the two relevant neighbourhoods and retrieves neither well. Worse: hop two's query *contains information that doesn't exist yet*. Expansion rephrases what you know; it cannot inject what you've not yet learned.

**The line: decomposition means independent sub-queries, run in parallel. Multi-hop means dependent sub-queries, run in sequence, each hop's query built from the last hop's answer.**

### The mechanism — retrieve, read, retrieve

```
HOP 1
  sub-query: "applicant stated annual income"
  retrieved: [c7] application.pdf p3 — "Stated annual income: 120,000"
  bridging fact: stated income = 120,000  [cited: c7]

HOP 2  (query now writable, and not before)
  sub-query: "monthly deposits totals bank statements"
  retrieved: [c22] bank_stmt_apr.pdf p2 — "Total deposits 7,900"
             [c26] bank_stmt_may.pdf p2 — "Total deposits 6,410"
             [c29] bank_stmt_jun.pdf p2 — "Total deposits 8,050"
  bridging fact: avg monthly deposits ≈ 7,453 → ~89,400 annualised

FINAL
  Stated 120,000 [c7]; deposits support roughly 89,400 annualised
  [c22][c26][c29]. Discrepancy 25.5%. Flag: income_discrepancy.
```

**MENTAL TRACE.** Hop one is a plain retrieval and produces a *fact with a citation* — the citation matters, and § 3.13 explains why.

Hop two's sub-query could not have been written before hop one ran. You needed to know that a stated figure existed and roughly what it was in order to know what to compare against.

The final answer is composed over the **accumulated** evidence from both hops, with every claim traceable to the hop that produced it.

Now name what you just read. **An LLM deciding an action, acting, reading the result, deciding again.** That's the agent loop from § 2.7, with retrieval as the only tool. Multi-hop RAG is the bridge between retrieval and agents — Document 04 is this loop with more tools and more ambition.

### The costs and the guards

**Latency and money stack linearly per hop.** Set a **hop budget** — two or three covers nearly all real questions.

**Error propagation is the sharp one.** A wrong bridging fact at hop one poisons every later hop. The guard is grounding discipline *per hop*: each bridging fact must cite its chunk, applied mid-loop rather than only at the end. Plus honest per-hop refusal — a NOT FOUND at hop one should **stop** the loop, not send it hallucinating into hop two.

**When not to loop.** Most questions are single-hop, and running the loop wastes two LLM calls to conclude that one hop sufficed. Production systems *route*: a cheap classifier or heuristics — comparative phrasing, chained possessives, "the X of the Y that Z" — decide single-shot versus multi-hop.

**THE DEPLOYMENT LENS.** The single most valuable output of the Meridian system — the income discrepancy flag — **is a multi-hop question.** It requires finding the stated figure, then finding third-party evidence, then comparing.

Two consequences.

**The discrepancy analysis runs as an explicit multi-hop pipeline every time**, not as a hopeful general query. It is too important to leave to whether the phrasing happened to work.

**Every hop's bridging fact is logged with its citation.** When Marcus asks how the system concluded there was a discrepancy, the answer is a two-hop trace with a document and page at each step — not a narration. This is the provenance-not-narration principle from § 2.5, extended across a loop.

### The horizon

Multi-hop over a pile of chunks re-derives connections at query time, every time. When the connections themselves are the corpus's soul — entities and relationships — there's a structure that pre-computes them: a knowledge **graph**, walked rather than searched.

That's GraphRAG. At Meridian the natural graph is *applicant → employer → account → tradeline*, and it is genuinely useful for questions like "has this employer appeared in other applications?" — which is a fraud question, not a credit question, and therefore a phase-two conversation. Know it exists. Don't build it in the pilot.

---
