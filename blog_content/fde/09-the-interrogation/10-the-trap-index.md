---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 10
title: "THE TRAP INDEX"
slug: "the-trap-index"
sectionNumber: null
part: "PART II — THE TRAP INDEX"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 694
status: "raw"
section: ""
summary: ""
enriched: false
---

# PART II — THE TRAP INDEX

*Error message → cause → fix. Scan monthly.*

**`TypeError: unsupported operand type(s) for /: 'str' and 'int'`** → dividing text instead of its length → `len(text) / 4`.

**`KeyError: 'x'`** → asked a dict for a key it doesn't have; keys are exact and case-sensitive → use `.get(key, default)` at boundaries.

**`TypeError: string indices must be integers`** → indexing a raw JSON string; you forgot `json.loads` → parse before indexing.

**`0.30000000000000004`** → binary floating point; harmless for estimates, wrong for billing → integer cents or `Decimal`.

**`AttributeError: 'X' object has no attribute 'y'`** → a constructor parameter was never assigned to `self` → add `self.y = y` in `__init__`.

**`RuntimeWarning: coroutine 'f' was never awaited`** → you called an async function without `await`; you have a plan, not a result → add `await`.

**Async code runs sequentially despite `gather`** → a blocking call inside async froze the event loop → use async-native libraries or `asyncio.to_thread`.

**`ValidationError: Input should be less than or equal to 850`** → Pydantic caught out-of-range data at the border → good; this is the system working. Route it to the repair loop or the review queue.

**`ModuleNotFoundError` on a server that works locally** → venv not activated, or `requirements.txt` mismatch → check both, in that order.

**Model returns text wrapped in triple backticks** → rung-one structured output → strip fences, then escalate: few-shot, prefill, native schema.

**Model invents a citation id you never provided** → hallucinated citation → referential-integrity check catches it mechanically; feed the error back.

**Model completes a whole multi-step run without calling any tool** → missing stop sequence; it generated its own observations → `stop=["Observation:"]`.

**Agent repeats the same tool call forever** → an observation it can't interpret as progress → repetition detection with a legible loop-breaker observation, not just max_steps.

**Retrieval returns four mediocre chunks with tightly clustered scores** → nothing matched strongly; likely a vocabulary miss → check both retrieval modes separately, then query rewriting or HyDE.

**Correct answer, missing the one fact that mattered** → the chunk was retrieved and ranked out, or never retrieved → walk the diagnostic tree; consider a structural guarantee rather than a ranking dependency.

**Answer is wrong but the chunks look right** → lost in the middle, or unfaithful generation → fewer and better chunks, rerank then truncate hard; check citations.

**NOT FOUND on a question you know is covered** → filter misfire, or genuine absence — they look identical → print the filtered slice size, and fall back to unfiltered.

**Eval scores shifted with no code change** → judge drift, or golden-set version change → pin the judge, version the dataset, re-baseline explicitly.

**Aggregate score rose but a critical case broke** → you read the total instead of the flip list → gate on critical-case regression, not net.

**Two memos on one file after a resume** → checkpoint replay re-executed a write → idempotency key derived from intent, checked and recorded atomically.

**Audit chain verification fails at record N** → record N−1 was altered after being written → correct behaviour; everything downstream is unverifiable, and that's the guarantee.

**Query returns other tenants' rows** → forgotten `WHERE tenant_id` → RLS with `FORCE`, so the database isolates regardless.

**JWT accepted despite being unsigned** → algorithm read from the token header → pin `algorithms=[...]` in code, and check audience and issuer.

**Streaming arrives in one lump at the end** → a proxy is buffering, or `flush=True` is missing → test through the real network path; fall back to polling.

**Every pod restarts during a brief database blip** → liveness probe depends on a downstream dependency → liveness checks the process; readiness checks the dependency.

**Latency flat, throughput flat, errors climbing under load** → a saturated resource, usually the connection pool → raise within the DBA's allocation, shorten hold time, add a circuit breaker.

**Cost per file trending up with no deploy** → context growth, or a broken cache prefix → check prompt assembly order and scratchpad size.

**Catch rate falling week over week with no code change** → data drift — the inputs changed → check ingestion volume by source; something upstream moved.

---
