---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 7
title: "Graphs: state, nodes, edges"
slug: "4-5-graphs-state-nodes-edges"
sectionNumber: "4.5"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 616
status: "raw"
section: "§4.5"
summary: ""
enriched: false
---

## § 4.5 — Graphs: state, nodes, edges

Your bare loop is one while-loop with one brain deciding everything. Now imagine wanting a routing step here, a validation step there, a quality check that can send work *back*. Bolting that onto a while-loop breeds spaghetti.

**The move: stop hiding the control flow inside a loop — draw it.** An agent becomes a *graph*. Nodes are work steps, edges are what happens next, and one shared **state** object flows through everything.

**State** — a typed, shared structure every node reads from and writes to. It carries message history, intermediate results, counters, flags. State is *the* single source of truth for a run.

**Nodes** — plain Python functions with the signature `def node(state) -> dict`. Take the state, do work, return a *partial update* to merge in. A node is just a function; there is no magic in a node.

**Edges** — what runs next. *Fixed edges* encode workflow structure. **Conditional edges** — a function reading state and returning the next node's name — encode decisions. **Conditional edges are where agency lives in a graph.**

```
        ┌──────────────┐
        │  retrieve    │
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │   extract    │
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │   validate   │
        └──────┬───────┘
               │ conditional edge
       ┌───────┴────────┬─────────────┐
       ▼                ▼             ▼
   ┌────────┐      ┌─────────┐   ┌────────┐
   │ repair │      │  gate   │   │  END   │
   └───┬────┘      └────┬────┘   └────────┘
       │                │
       └───► extract    └───► save_draft ───► END
```

**MENTAL TRACE.** Read the conditional edge after `validate`. It's a function that reads state and returns a node name: if validation found problems and retries remain, return `"repair"`; if the memo needs a write, return `"gate"`; otherwise return `"END"`.

The cycle `extract → validate → repair → extract` is the repair loop from § 2.6, now visible as structure rather than buried in a `for`.

**Reducers — the one subtle primitive.** When a node returns `{"messages": [new_msg]}`, should that *replace* the existing messages or *append*? Each state key declares its merge rule. Messages append. A counter might sum. A flag replaces.

Reducers matter doubly in parallel execution: when two branches both write a key, the reducer defines how their writes combine. A while-loop never forced you to answer that precisely; graphs do.

### Why graphs won

**Cycles are first-class.** Agent loops need iteration; DAG-shaped pipeline tools can't express "go back and try again."

**Inspectability.** The graph is drawable — literally, it renders itself — and a drawn system is a debuggable, explainable, onboardable system.

**Interruptibility.** Because state is explicit and steps are discrete, execution can pause between any two nodes. That's the foundation of the next two sections. A while-loop's state lives in local variables and dies with the process.

**Composability.** A graph can be a node in a bigger graph.

Notice the pattern in those reasons: **none of them is "the LLM gets smarter."** Frameworks buy you engineering properties *around* the model, never intelligence *inside* it.

**The honest cost.** A framework is a dependency with opinions. Versions move, abstractions leak, and debugging sometimes means reading framework source. The mitigation is exactly § 4.4 — you can always drop below the abstraction, because you built what's under it.

**THE DEPLOYMENT LENS.** That rendered diagram is a compliance artifact.

Marcus's validation function needs to document what the system does. A hand-written description of a while-loop is a document that drifts from the code within a month. **A diagram the code generates cannot drift, because it *is* the code.**

Put graph rendering in CI. When the architecture changes, the diagram in the validation pack changes with it, automatically. That's a five-line change that removes an entire category of documentation debt — and it's the kind of thing that makes a validation team decide you're competent.

---
