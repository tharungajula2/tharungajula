---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 12
title: "The failure zoo"
slug: "4-10-the-failure-zoo"
sectionNumber: "4.10"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 610
status: "raw"
section: "§4.10"
summary: ""
enriched: false
---

## § 4.10 — The failure zoo

Retrieval got a taxonomy. Agents need one more, because the loop that compounds progress compounds error.

### Family 1 — Loop pathologies

**The infinite loop.** Same action repeating. Classic cause: an observation the agent can't interpret as progress, so it retries the only move it knows. *Signature:* repeated near-identical tool calls in the transcript.

*Guards, layered:* `max_steps` is the crude floor. **Repetition detection** is the one that actually works — dispatch keeps a hash-set of `(tool, args)` this run, and on a repeat injects an observation:

```
Observation: you have already tried this exact call and the result will not change.
Try a different approach, or conclude that the information is unavailable.
```

**MENTAL TRACE.** The bare `max_steps` guard lets the agent burn ten identical calls and then die with no answer. The loop-breaker turns the repetition itself into *information* — the agent reads it, updates, and either varies its approach or terminates honestly. **Legible feedback beats a hard stop**, and this is the same philosophy as § 4.3's error strings.

**Premature termination.** The mirror twin — answering before verifying, from vibes. *Signature:* a final answer with claims no observation supports. *Guard:* citation integrity as a termination condition — a claim with no Finding cannot ship.

**Goal drift.** The agent wanders. A question about income verification becomes a tour of the applicant's employment history. *Signature:* late-transcript actions that serve no plan step. *Guards:* plan structure, a replan check as drift detector, scratchpad compression keeping the goal's share of attention high.

### Family 2 — Tool pathologies

**Tool spam.** Calling tools when none is needed, or scattershot calls hoping something sticks. *Cause:* usually descriptions without negative space, or a missing direct-answer path. *Guards:* description craft, a `none` route, and per-run tool budgets **with the remaining count visible in the prompt** — "you have 3 tool calls remaining" changes behaviour, because scarcity legibly stated does.

**Wrong tool, malformed arguments.** Guards all built: naming consistency, argument validation at dispatch, legible error observations, the repair loop.

**Fantasy observations.** The no-stop-sequence bug from § 4.4, and its subtler cousin — confidently "remembering" a result it never obtained. *Signature:* observations in the transcript that dispatch never produced, which is **auditable, because your transcript is ground truth.** *Guards:* stop sequences mechanically, and the typed-findings exoskeleton.

### Family 3 — Compounding pathologies

**Error cascade.** One bad observation poisons every downstream decision. *Guards:* per-hop grounding so findings carry quotes — provenance as antibody — plus the gate catching consequential actions born of poisoned reasoning before they touch the world.

**Context poisoning.** The adversarial cascade: indirect injection meeting an agent's tool access. **Injection is an induced error cascade**, and the defences unify.

**Multi-agent amplification.** A specialist's confident-wrong result enters the parent's context with the *authority of a completed subtask*. The boundary that enables independence also launders uncertainty. *Guard:* results carry confidence and gaps fields, and the orchestrator treats specialist outputs as **observations to reason over, not facts to relay.**

### The diagnostic protocol

**Read the transcript** — the scratchpad is ground truth, and every pathology above has a transcript signature.

**Locate the *first* wrong step, not the loudest.** Cascades mean the visible failure is downstream of the cause. Walk backward.

**Classify by family.** Didn't stop right → loops. Acted badly → tools. Was fine then rotted → compounding.

**Apply the named guard, one change, rerun.**

**And the meta-observation worth ending on:** nearly every guard in this zoo is something you had already built before it was named — budgets, legible errors, citations, plans, gates, typed state. **Good agent engineering isn't a safety layer bolted on. It's the same honest architecture, load-bearing twice.**

---
