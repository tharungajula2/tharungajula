---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 9
title: "The gate"
slug: "4-7-the-gate"
sectionNumber: "4.7"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 951
status: "raw"
section: "§4.7"
summary: ""
enriched: false
---

## § 4.7 — The gate

*This is the most important section in this document, and it is the reason a regulated lender will let you deploy at all.*

An agent that pauses mid-graph, presents its intended action to a human, waits — minutes or days — and proceeds, modifies, or aborts based on the verdict.

Six words: **an agent that stops and asks.**

**The mechanism.** A node calls `interrupt()` with a payload — the question for the human. Execution **stops**, the current state checkpoints, and the graph returns control to the caller carrying the payload. The human answers whenever they answer. Resumption: invoke the graph again on the same thread with the verdict; the interrupted node receives it and execution continues.

Understand what this architecture buys: **the wait is free.** No process blocking, no polling loop burning a server. The agent is parked in the database until the verdict arrives. A human taking three days to approve costs three days of nothing.

**No checkpointer, no interrupt.** An interrupt without persistence is just a crash with manners.

```python
def gate(state) -> dict:
    action = state["pending_action"]
    if TOOLS[action.tool].safety == "read":
        return {"approved": True}                    # reads flow freely — no gate spam
    verdict = interrupt({
        "proposed": action.tool,
        "args": action.args,
        "rationale": state["last_thought"],          # WHY — the reasoning excerpt
        "citations": state["supporting_chunks"],     # the evidence
        "options": ["approve", "edit", "reject"],
    })
    return resolve(verdict)
```

**MENTAL TRACE.** The node reads the pending action out of state. If its safety tag is `read`, it returns immediately with approval — no human involved.

Otherwise `interrupt()` fires with a payload containing four things: what the agent wants to do, with what arguments, **why**, and **the evidence**. Execution stops here and the state checkpoints.

Whenever a verdict arrives, `resolve` handles three paths. Approve passes the original arguments through. Edit passes the *human's* arguments through. Reject returns an observation — `"denied: [reason]"` — that flows back to the reasoning node.

### Three design decisions, each load-bearing

**Selectivity.** Gate only write and dangerous tools. **Gate everything and humans rubber-stamp from fatigue within a day** — approval fatigue is the gate's real failure mode, and selectivity is its only medicine.

**The rationale travels with the request.** A human shown *what* without *why* cannot meaningfully judge. Shipping the agent's reasoning and its citations turns approval from a coin-flip into review.

**Rejection is an observation, not an exception.** "Denied: you're citing the superseded transcript, use the amended one" feeds back into reasoning and the agent *adapts*.

Write this reframe down, because it reorganises how you see the whole pattern: **the human is, structurally, one more tool whose observations steer the loop.**

### The edit path — the underrated verdict

Approve-reject is a binary gate. **Edit is a collaboration**: the human corrects the arguments and the corrected action executes.

Implementing it forces the right data shape — the pending action must round-trip through the human as **structured data, not prose** — and it changes the human's role from bouncer to co-pilot.

### Verification

Mock the human with a scripted verdict provider. Assert: read tools never interrupt. Write tools always do. Approve executes the original arguments. Edit executes the *edited* arguments. Reject's reason appears in the next reasoning prompt and the agent visibly adapts.

And the durability test that proves the architecture: **interrupt, kill the process, restart, resume the same thread with a verdict, action executes.**

**OUTPUT**
```
tests/test_gate.py ......                                 [100%]
6 passed in 0.61s
```

That last test is the whole section in one assertion.

**THE DEPLOYMENT LENS — this is where the deployment is won.**

The gate at Meridian is not a safety feature bolted onto an autonomous system. **It is the product.** The system drafts; Tom signs. That's the entire regulatory position from Document 00, expressed as architecture.

Four things follow, and each one is a conversation you will have:

**Tom is the gate, and his screen is the interrupt payload.** Proposed memo, the reasoning, and every citation clickable. He approves, edits, or rejects. The whole UI in Document 07 is a rendering of this one data structure.

**Approval fatigue is the pilot's biggest risk, and it is not a technical risk.** If every memo needs forty seconds of careful review and Tom has ninety files a week, he will start approving on autopilot by week three — and a rubber-stamped gate is *worse than no gate*, because it manufactures a documented human approval for an unreviewed decision. Selectivity is the medicine: gate the memo, never the retrieval; surface only the fields the system is *unsure* about for close reading; make the confident fields skimmable. **Measure edit rate. If it approaches zero, the gate has stopped working, regardless of what the logs say.**

**The edit path is the highest-value feature in the system and it will not be in the requirements document.** Tom will rarely reject outright. He will constantly correct — a figure the system read from the wrong column, a flag that doesn't apply because he knows the tradeline was resolved. Those edits are the deployment's most valuable data, and § 4.17 explains what to do with them.

**Rejection reasons are the answer to Tom's question.** *"What happens on the ones you don't catch?"* — the honest answer is that you don't catch them, **he** does, and the system's job is to make his catch cheap and to never make the same mistake twice. That's a much better answer than a claimed accuracy number, and it happens to be true.

`[RECEIPT]` **The gate with the kill-and-resume durability test.** Interrupt, kill Python, walk away, come back, resume, approve, executes. That single test demonstrates checkpointing, interrupts, state serialisation, and durable execution in one assertion, and it is the most senior-looking small test you can show.

---
