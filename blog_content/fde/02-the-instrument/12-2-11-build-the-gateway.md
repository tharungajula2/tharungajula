---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 12
title: "Build: the gateway"
slug: "2-11-build-the-gateway"
sectionNumber: "2.11"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 853
status: "raw"
section: "§2.11"
summary: ""
enriched: false
---

## § 2.11 — Build: the gateway

A hospital doesn't depend on one power line. Grid fails, generator engages, the surgery continues.

Your system must treat model providers the same way. This build assembles everything from § 2.1 to § 2.10 into one piece of infrastructure — a small gateway you build yourself, so that off-the-shelf routing tools become conveniences you understand rather than magic you rent.

### The spec

One function to rule them all: `gateway.complete(messages, schema=None, stream=False) -> Completion`. Callers never know which provider answered.

**1. The provider abstraction.** A base class with subclasses per provider, each translating the shared message format into its own dialect and back. A Pydantic `Completion` is the universal currency.

```python
from pydantic import BaseModel

class Completion(BaseModel):
    text: str
    model_used: str
    provider: str
    input_tokens: int
    output_tokens: int
    latency_ms: int
    cached: bool = False

class Provider:
    name: str
    def complete(self, messages: list) -> Completion:
        raise NotImplementedError

class AnthropicProvider(Provider):
    name = "anthropic"
    def complete(self, messages: list) -> Completion:
        ...   # translate, call, wrap in Completion

class FallbackProvider(Provider):
    name = "fallback"
    def complete(self, messages: list) -> Completion:
        ...
```

**MENTAL TRACE.** `Provider` is a **base class** that defines the contract and refuses to do the work — `raise NotImplementedError` means "a subclass must implement this." Each subclass sets its own `name` and provides a real `complete`.

Because every subclass returns the same `Completion` object, the calling code never branches on provider. That's the entire value of inheritance here: **one interface, many dialects.** Designing that common interface is also how you learn what's essential versus incidental in every provider's API — which is a genuinely FDE skill, because you'll be asked to integrate with things nobody has wrapped yet.

**2. The fallback chain.** An ordered list of providers. Per provider: attempt with the full § 2.9 armour. Exhausted, log the fall and move to the next. All exhausted, raise one clean `AllProvidersFailedError` carrying every attempt's history.

The nuance that separates real from naive: **non-retryable errors skip straight to the next provider.** A 401 on provider one will not heal — don't waste fifteen seconds backing off, jump. Retryables get their full backoff *within* the provider first.

**3. Demand management.** A per-provider semaphore, because each has its own ceiling. An exact-match cache in front of everything, keyed on provider-set plus messages plus temperature plus schema.

**4. The meter.** Every completion logs to a ledger: timestamp, provider, model, tokens in and out, latency, cache hit, estimated cost — priced by the calculator you built in Document 01, now doing production work.

```python
print(gateway.report())
```

**OUTPUT**
```
=== Gateway report — 2026-07-29 ===
anthropic     412 calls   98.1%   avg 1840ms   $12.11
fallback        8 calls    1.9%   avg 2210ms    $0.19
cache hits    167         28.9% of requests    saved ~$4.90
failures        0
```

**MENTAL TRACE.** 420 real provider calls, of which 8 fell through to the backup — meaning the primary failed 8 times in a way that survived retries. 167 requests never reached a provider at all because the cache answered them, so total requests were 587 and the cache-hit rate is 167/587, about 29%.

This ledger is the embryo of real observability, and you build it properly in Document 05.

**5. Verification with fake providers.** This is the part most people skip and it's the part that proves you can engineer.

Write a pytest suite using **scripted fake providers** — subclasses of `Provider` that fail on command:

- Primary throws 401 → next provider used, *no backoff wasted*.
- Primary throws 429 twice then succeeds → same provider recovers, chain never advances.
- Primary hard-down → graceful fall to the third.
- All down → `AllProvidersFailedError` with complete history.
- Repeated request → cache hit, zero provider calls.
- Ledger arithmetic correct across a scripted sequence.

**OUTPUT**
```
tests/test_gateway.py ......                              [100%]
6 passed in 0.31s
```

**MENTAL TRACE.** Every one of those six scenarios is nearly impossible to trigger reliably against a live API — you cannot make a real provider return a 401 on demand and then heal. With fakes, all six run in a third of a second, deterministically, on every commit.

That is the testing philosophy from Document 01, at full strength: **you test your logic against controlled inputs, not against the world.**

`[RECEIPT]` **The gateway with its fake-provider test suite.** This is the strongest single artifact in the set so far. It demonstrates interface design, error taxonomy, concurrency control, caching, cost accounting, and testability — in one small readable package. Every later build calls this gateway instead of raw SDKs.

**THE DEPLOYMENT LENS.** Two reasons this matters more at a bank than at a startup.

**Procurement.** Meridian's vendor management will ask what happens if your provider has an outage, and "we'd wait" is not an answer that gets through. A documented fallback chain is a procurement artifact.

**Model swap without a migration.** When the frontier shuffles — and § 1.13 established that it shuffles constantly — the model name changes in one config file. You then re-run your evals, show Marcus the comparison, and swap. Without the gateway, the model name is in forty places and every upgrade is a project.

---
