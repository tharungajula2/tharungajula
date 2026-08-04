---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 10
title: "Plans and second passes"
slug: "4-8-plans-and-second-passes"
sectionNumber: "4.8"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 528
status: "raw"
section: "§4.8"
summary: ""
enriched: false
---

## § 4.8 — Plans and second passes

Two patterns, compressed, because both are real and neither is the centre of gravity here.

### Plan-and-execute

Your agent is a pure **reactor**: ReAct decides one action at a time, forever. That has three structural costs.

**Myopia** — no step is chosen with the full journey in view, so globally suboptimal paths emerge from locally sensible choices.

**Goal drift** — over many steps, the original objective dilutes in a growing context.

**No cost preview** — you can't estimate a run's budget when even the agent doesn't know what it'll do next.

A **planner** writes the full sequence first, then executes it, replanning as reality intrudes. The plan pins the goal, enables a budget estimate before the run, and makes drift detectable — you can ask, of any action, *does this serve a remaining step?*

The hybrid is the usual answer: plan up front, react within steps, replan on surprise.

### Reflection

First drafts are bad — yours, mine, and the model's. **Generate, critique, revise.**

Two honest mechanisms explain why it works. **Evaluation is easier than generation** — recognising a flaw is a simpler task than producing flawlessly. And **fresh framing** — the critique call approaches the text as a reader, unanchored from the generator's in-flight commitments.

**The craft rule that makes or breaks it: critique against explicit criteria.** "Is this good?" yields vague nodding. A rubric yields actionable flaws.

**Reflexion** adds memory across attempts: when a whole attempt fails, a reflection call produces a **lesson** that's injected into the next attempt's context. The agent retries *informed* rather than blindly. It requires a **failure signal** — a test suite, an eval score, a gate rejection. No signal, no lesson; reflection without ground truth is just vibes squared.

**Two sharp caveats.**

**Cost** — every round doubles LLM calls. Reflection on a task the model nails first-pass is pure waste. Gate it by difficulty or trigger it only on failure signals.

**Self-critique inherits self-blindness.** The critic shares the generator's weights and therefore its blind spots. A model that doesn't know a fact can't critique the fact's absence, and models are systematically gentle judges of their own fluency.

The ordering to carry out of this section: **self-critique < cross-critique < ground truth.** The best systems wire in as much ground truth as the task affords.

**THE DEPLOYMENT LENS.** Meridian has *excellent* ground truth available, which makes reflection unusually worthwhile here — but only in one specific form.

The system's own citation validation from § 3.13 is a ground-truth signal: every claim must trace to a retrieved chunk. That's checkable mechanically, not by a model's opinion. So the reflection loop is: draft the memo, run the citation validator, and if any claim is uncited, revise with the specific failures named.

**Do not add a "critique the memo's quality" pass.** It doubles cost, it produces confident approval of its own work, and — the part that matters — an LLM's self-assessment of a credit memo is exactly the kind of unverifiable narration that § 2.5 told you never to put anywhere near a regulated artifact.

Reflect against the validator. Never against the model's own taste.

---
