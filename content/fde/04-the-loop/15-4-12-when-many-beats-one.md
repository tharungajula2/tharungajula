---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 15
title: "When many beats one"
slug: "4-12-when-many-beats-one"
sectionNumber: "4.12"
part: "PART II — TEAMS AND PROTOCOLS"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 553
status: "raw"
section: "§4.12"
summary: ""
enriched: false
---

## § 4.12 — When many beats one

The industry is drunk on multi-agent systems. Some of it is real engineering; much of it is one agent wearing five hats and a marketing budget.

**The null hypothesis, stated first and defended hard: one good agent with good tools usually wins.**

A single agent with a well-designed toolbox is simpler to build, debug, price, and reason about. Every agent you add multiplies cost, multiplies failure surface, and adds a *new* failure class solo agents cannot have: **coordination failure** — handoffs dropping context, agents disagreeing, the orchestrator misrouting.

**The burden of proof is on *many*, always.** "Least agents that solve the task" is the least-autonomy principle, one level up.

### The three honest reasons

**Genuinely distinct specialties with distinct tools and context.** When subtasks need *different toolboxes, different system prompts, different failure modes*, one agent juggling all of it suffers **context interference**: its scratchpad mixes everything, its tool catalogue balloons (more tools means worse selection), and one system prompt can't be optimal for three jobs.

The test is **distinctness, not merely "multiple steps."** Multiple steps is a job for one agent's loop.

**Context isolation as a feature.** Sometimes you *want* walls. A critic that must not see the generator's rationalisations — fresh eyes require an unpolluted context, enforced by architecture rather than hoped for. A sub-agent handling untrusted content, quarantined from one holding secrets. **Isolation you'd have to fake inside one agent is free across two.**

**Parallelism for latency.** Independent subtasks running concurrently genuinely cut wall-clock. But parallelism cuts *latency*, never *cost*, and only *independent* work parallelises.

### The hype tells

Agents that could be functions — a "summariser agent" making one LLM call is a *tool*, not an agent. "Roles" that are just personas on the same context: five hats, one head. Coordination overhead exceeding the work. And the tell-tale demo that would be simpler and better as one agent with five tools.

**The diagnostic question for any proposed team: what does each agent have that the others don't — tools, context, or genuine parallelism?** If the answer is "a different prompt," it's hype.

**THE DEPLOYMENT LENS.** Meridian gets **one agent**, and you should be ready to defend that against a proposal for a "team of specialist underwriter agents" — which someone will propose, because it demos beautifully.

Run the test. An income specialist, a credit specialist, a fraud specialist: do they have different toolboxes? No — they'd all call `search_file`. Different context needs? No — they all read the same loan file. Genuine parallelism? Marginally, and the file is small enough that it doesn't matter.

**They'd have different prompts. That's the hype tell.**

What you'd actually get is three times the cost, three times the failure surface, and a new problem: three confident partial views that an orchestrator has to reconcile, each arriving with the authority of a completed subtask.

*"We could split this into specialists. They'd share every tool and every document, so what we'd be buying is three prompts instead of one section in a prompt — and paying three times for it, plus a reconciliation step that can itself be wrong. If we find one genuinely distinct specialty later — fraud screening has different data sources and a different failure mode — that's a real candidate. Underwriting sub-topics aren't."*

---
