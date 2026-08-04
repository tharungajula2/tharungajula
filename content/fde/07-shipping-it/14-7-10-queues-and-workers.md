---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 14
title: "Queues and workers"
slug: "7-10-queues-and-workers"
sectionNumber: "7.10"
part: "PART III — DOING THE WORK"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 480
status: "raw"
section: "§7.10"
summary: ""
enriched: false
---

## § 7.10 — Queues and workers

A memo takes 45 seconds. An HTTP request can't wait that long — it'll time out, tie up the server, and leave the user watching a spinner.

**The solution: accept the task fast, run it slow in the background.** The API enqueues and returns a task id immediately. A **worker** — a separate process — picks it up, runs it, and stores the result. The user polls status or gets notified.

**The architecture.** A durable **queue** holds pending tasks, surviving crashes, shared between the API that enqueues and the workers that dequeue. **Workers** consume: pull a task, execute, store the result, repeat.

**Scaling is beautiful here:** more load means more workers, sharing the queue. And workers are independent — one crashing doesn't stop the others.

**Why agents are exactly this workload.** *Duration* — they take real time. *Retries* — a failed task retries via the queue, idempotently. *Scaling* — load spikes absorb by adding workers. *Isolation* — a runaway task is contained to its worker rather than blocking the API. *Progress* — the worker can stream updates as it runs.

```
$ curl -X POST /memos -d '{"applicant_id":"A-4417"}'
{"task_id":"t_8812","status":"queued"}                          ← returns in 40ms

$ curl /tasks/t_8812
{"task_id":"t_8812","status":"running","step":"retrieve","pct":35}

$ curl /tasks/t_8812
{"task_id":"t_8812","status":"awaiting_review","memo_id":"m_4417_03"}
```

**MENTAL TRACE.** The POST returns in 40 milliseconds having done nothing but write a row to the queue. The actual work — retrieval, extraction, validation, the discrepancy loop — happens in a worker process the client never sees.

Status transitions are visible, which is what makes the UI honest: the underwriter sees *retrieve, 35%* rather than a spinner.

And the terminal state is `awaiting_review`, not `done`. **The system's job ends at the proposal queue from § 6.8.** "Done" would imply an output that's finished, and nothing here is finished until a human signs it.

**The production concerns.** Status tracking. **Idempotency** — a retried task doesn't double-execute. Result storage. Failure handling with backoff. Worker health, so dead workers are detected and stuck tasks reclaimed. And **concurrency limits**, so workers don't overwhelm the model API's rate limits or your budget.

**THE DEPLOYMENT LENS.** Two things at Meridian that a generic architecture misses.

**Files arrive in bursts, not smoothly.** Applications cluster at end of day and end of month. Your queue depth will look flat for six hours and then spike 8× in ninety minutes. **Autoscale on queue depth, not CPU** — CPU looks fine while a thousand files wait, because the workers are blocked on model API latency, not computing anything.

**And the priority question is a product decision, not a technical one.** When 800 files are queued and an underwriter opens a specific file and wants it now, that file needs to jump. Build two queues — batch and interactive — from the start. Retrofitting priority into a single FIFO queue when Tom is waiting and complaining is a bad week.

---
