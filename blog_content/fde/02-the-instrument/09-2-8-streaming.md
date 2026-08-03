---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 9
title: "Streaming"
slug: "2-8-streaming"
sectionNumber: "2.8"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 527
status: "raw"
section: "§2.8"
summary: ""
enriched: false
---

## § 2.8 — Streaming

Generation is token by token — so why wait for the whole answer before showing anything? Forty seconds of silence feels broken. The same forty seconds watching words flow feels alive.

**What changes on the wire.** Non-streaming: one request, one complete JSON response. Streaming: one request, then a held-open HTTP connection delivering a sequence of small events (the underlying standard is SSE, server-sent events), each carrying a chunk, with a final event carrying the finish reason and usage. SDKs wrap this as an iterator.

```python
import time

start = time.perf_counter()
ttft = None
pieces = []

with client.messages.stream(model="claude-sonnet-4-5", max_tokens=1000,
                            messages=[{"role": "user", "content": "Summarise this loan file."}]) as stream:
    for text in stream.text_stream:
        if ttft is None:
            ttft = time.perf_counter() - start
        print(text, end="", flush=True)
        pieces.append(text)

total = time.perf_counter() - start
answer = "".join(pieces)
print(f"\n\nTTFT: {ttft:.2f}s | Total: {total:.2f}s | chars: {len(answer)}")
```

**OUTPUT**
```
The applicant is a 41-year-old self-employed contractor requesting $85,000 over 60 months...
[text continues appearing word by word]

TTFT: 0.61s | Total: 8.72s | chars: 2140
```

**MENTAL TRACE.** `time.perf_counter()` returns a high-resolution timestamp; subtracting two of them gives elapsed seconds. `ttft` starts as `None`, and the `if ttft is None` guard means it's set exactly once — on the very first chunk.

The loop receives small strings as they arrive. `end=""` stops `print` adding a newline after each chunk, so the text flows as one paragraph. `flush=True` forces the terminal to display immediately rather than buffering — **without it, the whole effect disappears** and everything appears at once at the end.

`pieces.append(text)` accumulates, and `"".join(pieces)` reassembles the full answer at the end. You own reassembly now. If you need the full text for logging or for the next conversation turn, you must build it yourself.

**The two latency numbers, forever distinct in your vocabulary.** **TTFT** — time to first token, how fast it *feels*. **Total generation time** — how fast it *is*. Streaming doesn't speed generation at all; it collapses *perceived* latency from total-time down to TTFT. Users forgive long answers that start instantly; they abandon short answers that stall.

**What you inherit by streaming.** *Reassembly*, as above. *Mid-stream errors* — connections can die at token 500 of 800, so decide per product: retry from scratch, show partial with a warning, or resume. *Structure friction* — half-finished JSON doesn't parse, so real apps stream prose to the eye but buffer structured payloads to completion. *Tool-call interplay* — the stream may deliver a tool-call block instead of prose, and your loop must notice mid-stream.

**THE DEPLOYMENT LENS.** Meridian's system has two very different surfaces and they want opposite things.

The **batch pipeline** — 40,000 files a month, nobody watching — should not stream. There's no eye to please, and streaming adds reassembly complexity and mid-stream failure modes for zero benefit.

The **underwriter's screen**, where Tom pulls up a file and asks a follow-up question, absolutely should. That's where TTFT is the whole experience.

Same model, same gateway, different transport. Knowing *when not to stream* is the more useful half of this section, and the answer is: stream when a human is waiting, buffer when a machine is.

---
