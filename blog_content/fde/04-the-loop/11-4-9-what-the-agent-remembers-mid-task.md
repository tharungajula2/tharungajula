---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 11
title: "What the agent remembers mid-task"
slug: "4-9-what-the-agent-remembers-mid-task"
sectionNumber: "4.9"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 581
status: "raw"
section: "§4.9"
summary: ""
enriched: false
---

## § 4.9 — What the agent remembers mid-task

Solve long division in your head and you hold intermediate digits in a fragile buffer. Hand yourself paper and it becomes easy — not because you got smarter, but because **working memory moved outside the skull.**

The **scratchpad** is the agent's paper: everything it has thought, done, and observed *this task*, riding in the context window and conditioning every next decision. In § 4.4 it was the `transcript` list; in a graph it's the messages key in state.

### The three-horizon memory map — draw it once, own it forever

**Scratchpad** — *within one task attempt*. Lives in the context window. Dies when the task ends. *"What have I found so far?"*

**Episodic / cross-attempt** — *across attempts or sessions of one task*. Lives in checkpoints or a lesson store. *"What did last attempt teach?"*

**Long-term memory** — *across tasks, forever*. Lives outside the context in stores the agent reads and writes deliberately. *"What do I know about this user, this domain, this world?"*

**Confusing these horizons is the single most common muddle in agent conversations.** "Does your agent have memory?" is three different questions, and you now answer with a map.

### The disease — growth — and the treatment ladder

Every step appends; nothing removes. Tokens are money *and* attention — and lost-in-the-middle applies to the agent's own past too. Step 14's decision can miss step 2's crucial observation exactly as a generated answer misses chunk 6 of 12.

**Truncate raw, keep decisions.** Observations are the bulk, and their usefulness decays once distilled. After acting on an observation, replace it with the distilled finding: *"search returned 8 excerpts; relevant: AGI 96,400 at tax_2025.pdf p1."* The thought survives; the raw dump retires.

**Running summary.** Periodically compress the oldest scratchpad into a paragraph.

**Structured state over prose** — the deepest fix. Move critical facts *out of the message stream into typed state fields*, where they can't be lost-in-the-middle because nodes read them **explicitly**.

```
step   scratchpad tokens   cost this step
  1          1,240            $0.004
  3          4,890            $0.015
  6         11,320            $0.034
  9         19,740            $0.059
 12         28,100            $0.084
                    ─────────────────
                    run total: $0.51
```

**MENTAL TRACE.** Read the second column as the disease and the third as its price. Step 12 costs twenty-one times step 1 — not because it does more work, but because it re-sends everything that came before.

**The run total is not twelve times the first step. It's the area under that growth curve.** You are paying an integral, and § 4.11 makes that arithmetic explicit.

**The design heuristic worth its own line: facts the agent must not lose go in typed state; the narrative of how it found them can stay prose and be compressed.**

**THE DEPLOYMENT LENS.** At Meridian the facts that must not be lost are the **findings with their citations** — every extracted figure and where it came from.

Those live in a typed `findings: list[Finding]` state field, and the final synthesis node reads *only that field*. Not the message history.

The consequence is important and it's a security property, not just a quality one: **the memo can only contain facts that passed through a typed, cited structure.** Even if the message stream is compressed, truncated, or polluted by an injected instruction in a source document, the synthesiser has no path to put an uncited number in the memo — because it never reads prose.

That's the § 3.13 structure-enables-verification pattern, applied to an agent's own memory.

---
