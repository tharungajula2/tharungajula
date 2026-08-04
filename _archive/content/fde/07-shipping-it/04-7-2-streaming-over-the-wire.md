---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 4
title: "Streaming over the wire"
slug: "7-2-streaming-over-the-wire"
sectionNumber: "7.2"
part: "PART I — THE BACKEND"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 264
status: "raw"
section: "§7.2"
summary: ""
enriched: false
---

## § 7.2 — Streaming over the wire

Non-streaming is one request, one complete response. **Server-Sent Events** hold the connection open and deliver a sequence of small events.

```python
from fastapi.responses import StreamingResponse

@app.get("/memos/{task_id}/stream")
async def stream_memo(task_id: str, user=Depends(current_user)):
    async def events():
        async for chunk in memo_token_stream(task_id, tenant=user.tenant_id):
            yield f"data: {json.dumps({'text': chunk})}\n\n"
        yield "event: done\ndata: {}\n\n"
    return StreamingResponse(events(), media_type="text/event-stream")
```

**MENTAL TRACE.** `events()` is an **async generator** — it `yield`s pieces over time rather than returning once. `StreamingResponse` holds the HTTP connection open and pushes each yielded string as it arrives.

The SSE wire format is strict and worth memorising: `data: ` followed by the payload, then **two** newlines. The blank line is the event delimiter — one newline and the browser waits forever for the rest of the event. That's the classic first-time SSE bug.

The final `event: done` gives the client an explicit terminator rather than making it infer completion from a closed socket.

**THE DEPLOYMENT LENS.** Enterprise networks break SSE in ways that will consume a day.

Corporate proxies and load balancers **buffer** responses by default, which means your tokens arrive in one lump at the end and streaming silently becomes non-streaming. Idle-timeout settings kill long-held connections mid-stream. Some WAF configurations don't like `text/event-stream` at all.

**Test streaming through the actual production network path early**, not on localhost. And know the fallback: if streaming can't be made to work through their infrastructure, poll. The § 7.10 status endpoint gives you a working experience without a held connection, and shipping a polling UI beats spending three weeks negotiating a proxy configuration.

---
