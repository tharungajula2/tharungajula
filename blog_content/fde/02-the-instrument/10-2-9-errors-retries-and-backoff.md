---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 10
title: "Errors, retries, and backoff"
slug: "2-9-errors-retries-and-backoff"
sectionNumber: "2.9"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 653
status: "raw"
section: "§2.9"
summary: ""
enriched: false
---

## § 2.9 — Errors, retries, and backoff

Your script worked beautifully for a week, then died at 3 a.m. on a single failed network call and lost the whole overnight batch.

The gap between demo code and production code is exactly this: **assuming every API call can fail, and engineering the survival.** Networks flicker, providers overload, quotas exhaust. None of it is exceptional. All of it is Tuesday.

### Read the status code — it tells you what to do

**400** bad request, malformed input — or **404**, wrong model name. *Your bug.* Retrying is insanity; fix the code.

**401 / 403** bad or unauthorised key. *Config problem.* Retrying is useless; check environment variables, rotate keys.

**429** rate limited. *Slow down.* Retry with backoff.

**500 / 503** provider-side error or overload. *Not your fault, usually brief.* Retry with backoff.

**Timeouts and connection errors**, with no status at all. Network gremlins. Retry with backoff — and **always set a timeout**. The default "wait forever" is how scripts hang for six hours.

**The law of the table: retry only what can transiently succeed.** Retrying a 400 hammers a wall. Failing fast on a 503 wastes a working system.

### Exponential backoff plus jitter

Naive retry — instantly, in a tight loop — turns you into your own denial-of-service attack. And when a provider is overloaded, a thundering herd of synchronised retries *keeps* it overloaded.

The fix: wait 1s, then 2s, 4s, 8s (exponential, giving real outages room to heal), capped, with **jitter** — a random fraction so a thousand clients don't all retry in the same instant.

```python
import random, time

def call_with_retries(fn, max_attempts=4, base=1.0, cap=30.0):
    for attempt in range(max_attempts):
        try:
            return fn()
        except RETRYABLE as e:                       # 429/5xx/timeout — the table, encoded
            if attempt == max_attempts - 1:
                raise                                # loud failure, never silent
            delay = min(cap, base * 2 ** attempt) * random.uniform(0.5, 1.5)
            print(f"attempt {attempt+1} failed ({e}); sleeping {delay:.1f}s")
            time.sleep(delay)
 # NON-retryable exceptions fall through and raise immediately — by design
```

**OUTPUT** (a call that returns 429 twice, then succeeds)
```
attempt 1 failed (429 rate_limit_error); sleeping 1.4s
attempt 2 failed (429 rate_limit_error); sleeping 2.3s
```
```
<successful response object>
```

**MENTAL TRACE.** Attempt 0 (printed as 1): `fn()` raises a retryable error. It's not the last attempt, so we compute a delay. `base * 2 ** 0` is 1.0, `min(30, 1.0)` is 1.0, multiplied by a random factor between 0.5 and 1.5 gives 1.4. Sleep, loop.

Attempt 1 (printed as 2): fails again. `base * 2 ** 1` is 2.0, jittered to 2.3. Sleep, loop.

Attempt 2: succeeds. `return` exits immediately.

Now trace the other paths. If attempt 3 had also failed, `attempt == max_attempts - 1` would be true and `raise` would propagate the error loudly — no silent `None`, no swallowed failure. And a **non-retryable** error like a 401 never enters the `except` block at all, because `RETRYABLE` doesn't match it; it flies straight out on the first try. That's deliberate: fifteen seconds of backing off a bad API key is fifteen seconds wasted.

**Two production garnishes.** *Log every attempt* with status, attempt number, and delay — future-you debugging at 3 a.m. will weep with gratitude. *Idempotency awareness*: retrying a **read** is free; retrying a **write** can double it. The reflex to install today is the question **"is this safe to run twice?"** before every retry you add.

**THE DEPLOYMENT LENS.** At Meridian the write question is not academic. If your pipeline retries a step that appends a memo to a loan record, a transient timeout produces two memos on one file. In a regulated origination system, duplicated records are an audit finding, not a cosmetic bug.

The fix is **idempotency keys** — every write carries a unique ID derived from the work, so the second attempt is recognised and discarded. You'll build it properly in Document 07. The habit of asking the question starts here.

---
