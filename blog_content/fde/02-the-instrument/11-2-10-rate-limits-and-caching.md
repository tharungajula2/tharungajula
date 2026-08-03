---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 11
title: "Rate limits and caching"
slug: "2-10-rate-limits-and-caching"
sectionNumber: "2.10"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 941
status: "raw"
section: "§2.10"
summary: ""
enriched: false
---

## § 2.10 — Rate limits and caching

A free buffet still limits your plates, otherwise one visitor empties the kitchen. Every provider meters you: so many requests per minute, so many tokens per minute. Hit the ceiling and you get a 429.

This section is the other half of survival — understanding the meter, and the art of **not making the call at all.**

### The meter's dials

Providers enforce several simultaneously: **RPM** (requests per minute), **TPM** (tokens per minute, input plus output — *the one that actually binds for long-document work*), often requests-per-day on lower tiers, and concurrency caps.

Know thy tier. Limits live in the provider console, and responses carry rate-limit headers showing remaining quota and reset time. Production code *reads* those headers and self-throttles instead of blindly bouncing off 429s.

Client-side, the tool you already own is `asyncio.Semaphore` — cap your own concurrency below the provider's ceiling and fire in controlled waves.

```python
import asyncio

sem = asyncio.Semaphore(5)

async def guarded_call(excerpt: str) -> str:
    async with sem:
        return await call_model_async(excerpt)

async def main():
    results = await asyncio.gather(*[guarded_call(e) for e in excerpts])
    print(f"completed {len(results)} calls")

asyncio.run(main())
```

**OUTPUT** (30 excerpts, bare `gather` with no semaphore)
```
18 succeeded, 12 raised 429 rate_limit_error
```

**OUTPUT** (same 30 excerpts, with `Semaphore(5)`)
```
completed 30 calls
```

**MENTAL TRACE.** `asyncio.Semaphore(5)` is a permit box holding five permits. `async with sem` takes a permit if one is free, or **waits** until one is returned. When the block exits, the permit goes back automatically.

Without it, `gather` launches all 30 requests simultaneously, the provider sees a burst far above your RPM ceiling, and 12 bounce off with 429s. With it, only five are ever in flight; the other 25 queue politely. Total time is longer. Total *successful work* is 30 instead of 18.

`*[...]` unpacks the list of coroutines into separate arguments for `gather`, which is how you fan out over a collection.

**Proactive beats reactive.** Semaphore first, backoff as the safety net. Backoff alone means you learn the ceiling by hitting it, repeatedly, in production.

### Caching layer 1 — exact match, yours

Same input, same call, same bill, forever repeated, is pure waste. A dict in memory, or Redis later, keyed on a hash of everything that changes the answer: model, system prompt, messages, temperature, schema.

Note what's in the key. **A cache that ignores temperature serves creative answers to extraction requests.**

```python
import hashlib, json

cache = {}
hits = misses = 0

def cached_call(model: str, messages: list, temperature: float) -> str:
    global hits, misses
    key = hashlib.sha256(json.dumps([model, messages, temperature], sort_keys=True).encode()).hexdigest()
    if key in cache:
        hits += 1
        return cache[key]
    misses += 1
    result = call_model(model, messages, temperature)
    cache[key] = result
    return result

# ... 20 queries run, 8 of them repeats ...
print(f"hits: {hits}  misses: {misses}  hit rate: {hits/(hits+misses):.0%}")
print(f"calls saved: {hits}  est. saved: ${hits * 0.0294:.2f}")
```

**OUTPUT**
```
hits: 8  misses: 12  hit rate: 40%
calls saved: 8  est. saved: $0.24
```

**MENTAL TRACE.** `json.dumps(..., sort_keys=True)` turns the inputs into a stable string — `sort_keys` matters because two dicts with the same content but different insertion order must produce the *same* key. `.encode()` converts to bytes, `sha256(...).hexdigest()` produces a fixed-length fingerprint.

First time a key is seen: `misses` increments, the real call runs, the result is stored. Second time: `hits` increments and the stored result returns instantly, at zero cost and zero latency.

20 queries, 8 repeats, so 12 real calls and 8 hits. `{hits/(hits+misses):.0%}` formats the ratio as a percentage with no decimals.

Two honest caveats. At temperature above 0 a cache **changes behaviour** — users get identical answers where they'd have had variety. And every cache needs an *invalidation story*: a time-to-live, or an explicit bust when the system prompt ships a new version. Which is precisely why § 2.3 made prompts versioned artifacts.

### Caching layer 2 — prompt caching, the provider's

Providers can cache the *processed internal state* of a prompt's stable prefix — your long system prompt, your few-shot examples, that fifty-page document — so re-sends skip re-processing. Typically a large discount on the cached portion and a faster TTFT. **[VERIFY]** the discount and the minimum cacheable length; both vary by provider and change.

The engineering it rewards: **structure prompts stable-prefix-first.** System prompt and examples at the top, volatile per-request content last, because caching works on *prefixes*. One volatile line at the top breaks the entire cache.

**THE DEPLOYMENT LENS — this is a real money lever at Meridian, so do the arithmetic.**

Your system prompt plus few-shot examples plus the memo schema will run to maybe 3,000 tokens, and they are **identical on every one of the 40,000 monthly calls.** That's 120 million input tokens a month of pure repetition.

Order the prompt so all of it is a stable prefix and the caching applies. Order it carelessly — putting the applicant ID or today's date at the very top — and none of it caches.

**One line in the wrong place costs a meaningful fraction of the annual bill.** When Priya asks in month three why the cost is lower than forecast, that's the answer, and it is a good day.

### Caching layer 3 — semantic caching

"What's the DTI on this file?" and "what's the debt-to-income here?" are different strings and identical questions. Embedding similarity can match them and serve the cached answer. That's a Document 03 topic once vectors are in hand.

Know the ladder: **exact-match → prefix → semantic.**

**The unified mental model.** Rate limits and caching are one subject: *demand management*. Semaphores shape when calls happen. Backoff survives the ceiling. Caches delete calls entirely.

---
