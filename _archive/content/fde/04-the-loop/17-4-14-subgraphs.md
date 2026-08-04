---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 17
title: "Subgraphs"
slug: "4-14-subgraphs"
sectionNumber: "4.14"
part: "PART II — TEAMS AND PROTOCOLS"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 296
status: "raw"
section: "§4.14"
summary: ""
enriched: false
---

## § 4.14 — Subgraphs

A company doesn't run as one giant brain; it runs as teams coordinated through narrow interfaces. **Agents made of agents.**

**The mechanism.** A compiled graph exposes the same interface as a node function: state in, state update out. So build a focused graph, compile it, and mount it as one node inside a parent. When the parent reaches that node, the child runs *its entire internal process* and returns its result as a single state update.

**The state boundary is where the design lives.** Parent and child need not share a state schema — and *should not*. The child declares its own state; the interface is a **mapping at the boundary**: parent passes in what the child needs, child returns what the parent needs.

This is encapsulation, and it buys exactly what encapsulation always buys: the child is independently developable, independently testable, swappable, and reusable.

**The anti-pattern to name and shun:** one giant shared state that every subgraph reads and writes freely. That recreates the global-variable disease — spooky action between "independent" teams, untestable in isolation, unswappable forever. **Narrow interfaces or pain; there is no third option.**

**What each subgraph keeps private:** its internal nodes and edges, and — subtle and important — **its own scratchpad.** A specialist's messy search trail must not pollute the orchestrator's clean routing context. That separation is half the reason multi-agent systems stay coherent at all.

**And an interrupt fired *inside* a subgraph pauses the whole stack and resumes into the right depth.** Gates work at any level of nesting.

**When not to reach:** a linear pipeline with no specialty boundaries — a subgraph wrapping one node is ceremony. Or premature decomposition of a system you don't understand yet. **Least architecture that solves the task.**

---
