---
title: "Notes on agents, memory, and tool calling"
slug: "agents-memory-tool-calling"
type: "agent-memory"
status: "seed"
date: "2026-06-01"
updated: "2026-06-01"
tags: ["agents", "memory"]
relatedTrack: "agents"
relatedProject: "none"
visibility: "public"
summary: "Investigating agentic systems, short-term state, and long-term memory architectures using CoALA as a core map."
sourceType: "synthesis"
confidenceLevel: "exploring"
---

Agents fall apart in two places: how they remember and how they use tools. I'm starting from the CoALA framing — a short-term working memory plus long-term episodic, semantic, and procedural memory — and working out where each one breaks.

## What this note is for
To organize theoretical structures for agent memory systems and track how state is passed and maintained across complex multi-step loops.

## What I need to understand
- How to implement semantic memory structures that can be queried during runtime without exploding the context budget.
- The reliability threshold of model tool calling when schemas expand beyond a small handful of functions.
- The role of procedural memory in guiding multi-agent task chains toward stable outcomes.

## Next update
Diagram a basic agent state architecture detailing short-term working memory boundaries.
