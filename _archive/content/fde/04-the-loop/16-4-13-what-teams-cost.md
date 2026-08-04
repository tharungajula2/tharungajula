---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 16
title: "What teams cost"
slug: "4-13-what-teams-cost"
sectionNumber: "4.13"
part: "PART II — TEAMS AND PROTOCOLS"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 324
status: "raw"
section: "§4.13"
summary: ""
enriched: false
---

## § 4.13 — What teams cost

**The four multipliers over a solo agent.**

**Coordination overhead** — the orchestrator's own calls: routing, integration reasoning, replanning. Pure overhead the solo agent never paid.

**Context re-establishment** — every handoff re-packages context; every specialist starts its own scratchpad and often re-derives shared facts. Isolation's price. Nothing is shared for free.

**Redundant work** — parallel workers overlap; debating agents re-read each other's full answers every round. The team does *more total work* than the task's information content requires.

**Scratchpad growth, multiplied** — § 4.9's curve, now N integrals stacked.

**Rule of thumb: a naive multi-agent system costs 2–5× a solo agent for the same task. Debate pushes 5–15×.** These aren't laws, they're warnings. Measure your own.

**The counterintuitive win.** A well-tiered team can cost *less* than a solo frontier agent, because most of the team's calls run on cheap models — the router, the integration glue, the critique rubrics. Model routing is the lever that makes multi-agent economically viable at all.

**The unit-economics reframe — the senior move.** Stop thinking "tokens" and start thinking **cost per completed task** and **cost per unit of quality**. A team costing 3× that delivers a genuinely better outcome on a task worth 10× is *correct*. A team costing 3× for a 1.1× quality bump is *waste*.

**The decision to go multi-agent is incomplete without its price.** "Distinct specialties" justifies a team only if the specialisation's quality gain exceeds the coordination tax.

**The hidden costs nobody demos.** Latency compounds even when cost is hidden — sequential handoffs stack wall-clock, and a user waiting on a five-agent relay feels every baton pass. Debugging cost is real engineering time, since a multi-agent failure spans multiple traces. And operational cost: more prompts to maintain, more failure modes to guard, more surface to secure.

**The token bill is the visible tip. The total cost of ownership is larger, and the honest engineer prices all of it.**

---
