---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 12
title: "Exactly once, and provably"
slug: "6-9-exactly-once-and-provably"
sectionNumber: "6.9"
part: "PART II — THE DEFENCES"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 658
status: "raw"
section: "§6.9"
summary: ""
enriched: false
---

## § 6.9 — Exactly once, and provably

Two builds, and at a regulated lender both are non-negotiable.

### Idempotency

An operation is **idempotent** if doing it twice has the same effect as doing it once.

The guard: every critical action carries an **idempotency key** — a unique identifier for *that specific intended action*. Before executing, check whether an action with this key already executed. If yes, don't re-execute; return the previous result. If no, execute and **record the key and result atomically**.

**Atomicity is the whole game.** If check-and-record isn't a single transaction, two concurrent attempts both check "not executed," both execute, and idempotency fails.

**Why agents need this acutely.** Traditional software retries carefully; agent systems retry *constantly and unpredictably* — the loop retries, the gateway retries, checkpoint replays re-run steps, a crash-and-resume re-attempts a pending action. **Every one is a double-execution risk for writes.**

```python
key = sha256(f"{applicant_id}|{run_id}|save_draft".encode()).hexdigest()
```

**MENTAL TRACE.** The key is derived from *what the action is*, not from when it happened. A retry of the same intended action for the same applicant in the same run produces the **same key** — which is exactly what makes the second attempt recognisable and discardable.

If the key included a timestamp or a random value, every retry would look like a new action and the guard would do nothing. **The key must be a function of intent.**

### The tamper-evident audit trail

**Append-only** — records are never modified or deleted, only added.

**Tamper-evident** — the log is structured so that *any alteration is detectable*, via **hash chaining**: each record includes a hash of the previous record. Change any past record and every subsequent hash breaks.

```
$ python -m audit verify --from 2026-07-01

record 48209  ✓
record 48210  ✓
record 48211  ✗  HASH MISMATCH
                 stored prev_hash: 9f3c1a...
                 computed        : 4b81e7...
                 record 48210 was altered after being written

chain broken at 48211; records 48211–51044 unverifiable
```

**MENTAL TRACE.** Record 48210 was edited. Its own hash therefore changed. Record 48211 stored the *original* hash of 48210 as its `prev_hash`, so recomputing the chain produces a mismatch at 48211 — **one record after the tampering.**

Everything downstream is now unverifiable, which is the correct and desirable behaviour: **the chain doesn't tell you what was changed, it tells you that something was, and that's enough.** An audit trail that can be silently edited proves nothing.

**Why tamper-evidence matters.** You need to *prove* what the system did, and hash chaining makes the record trustworthy **even against someone with database access.**

**THE DEPLOYMENT LENS.** This section is the difference between "we log things" and "we can prove what happened," and at Meridian the second is a requirement, not a nicety.

Document 00 established the emerging expectation that decisions be **reconstructable and justifiable after the fact**, and that most systems weren't designed to produce those artifacts on demand.

Here is what a reconstruction needs, and it's worth committing to memory because it's the same list at every regulated customer:

**Which documents were read** — ids, versions, ingestion timestamps, and whether any were superseded. **What was extracted** — every figure with its citation span. **Which model and prompt version** produced the draft. **What the human saw** — the exact proposal payload. **What the human did** — approve, edit with the diff, or reject with the reason. **When, by whom**, and **the chain hash proving none of it moved since.**

If you can produce that for any file, on demand, three years later, you have solved a problem that most institutions have not solved for their *existing* systems. **That's not a compliance burden — it's a genuine competitive advantage, and you should say so out loud.**

`[RECEIPT]` **The idempotency guard with the concurrent-race test, plus the hash-chained audit log with a working tamper-detection demo.** The race test is the hard one and the tamper demo is the memorable one. Both are small, both are provable, and almost nobody building AI systems has either.

---
