---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 8
title: "Checkpointers"
slug: "4-6-checkpointers"
sectionNumber: "4.6"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 525
status: "raw"
section: "§4.6"
summary: ""
enriched: false
---

## § 4.6 — Checkpointers

Your agent is six steps into a ten-step task and the process dies. Without persistence: everything gone, start over, pay again. With a **checkpointer**: the run resumes at step seven as if nothing happened.

**The mechanism — a save file after every node.** Because state is explicit and steps are discrete, the framework serialises the *entire state* after each node and stores it, keyed by `(thread_id, checkpoint_n)`. In-memory for development; **Postgres for real** — and the same Postgres already holding your chunks can hold checkpoints. One database, another table.

**Threads — the identity primitive.** Every run carries a `thread_id`. Same thread means load the latest checkpoint and continue; new thread means fresh state.

That one primitive delivers three products. **Crash recovery** — re-invoke with the same thread id after any death. **Multi-session continuity** — a conversation that picks up tomorrow where it stopped today is just a thread resumed. **Concurrent users** — thread-per-user isolates state with no code from you.

```
$ python -m memo_agent run --file A-4417 --thread A-4417-run3
[node: retrieve]  ok
[node: extract]   ok
[node: validate]  1 problem — routing to repair
^C  (process killed)

$ python -m memo_agent resume --thread A-4417-run3
resuming from checkpoint 3 (after: validate)
[node: repair]    ok
[node: extract]   ok
[node: validate]  ok
[node: gate]      waiting for human verdict
```

**MENTAL TRACE.** Three nodes ran, each writing a checkpoint. The process was killed mid-run. On resume, the framework loads checkpoint 3 — the state as it existed after `validate` — and continues from the next node.

Retrieval did not re-run. Extraction did not re-run. **You did not pay for those tokens twice**, and on a 40,000-file-a-month pipeline that is not a rounding error.

**Time travel — the debugging superpower.** Checkpoints form a history. List them, inspect state at any past step, **fork** from an earlier checkpoint with edited state, and replay forward.

Practically: the run derailed at step 7 of 12. Instead of re-running the whole thing, rewind to checkpoint 6, fix the poisoned observation in state, resume. This is Git for your agent's mind — snapshots, branches, and reflog — and the metaphor is nearly exact.

### What checkpointing is *not*

**It persists state, not side effects.** If step 4 wrote a record and you rewind to step 3 and replay, the record does not un-write — and a naive replay writes it **twice**.

The idempotency question returns with force: durable execution demands that write-tools be idempotent, deduplicated, or gated.

**And checkpointing is not long-term memory.** A thread remembers *its own run*. Cross-thread knowledge is § 4.17's subject.

**THE DEPLOYMENT LENS.** The double-write scenario at Meridian is concrete and it is an audit finding, not a bug: a resumed run appends a second draft memo to the same loan file. Two memos, same applicant, slightly different timestamps, no indication which is authoritative.

The fix is the idempotency key from § 2.9 — every write carries an id derived from `(applicant_id, run_id, node)`, so the second attempt is recognised and discarded.

**Design this before you enable resume, not after.** Resume is exactly the feature that turns a theoretical double-write into a routine one.

---
