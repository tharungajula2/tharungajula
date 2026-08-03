---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 3
title: "What makes an agent"
slug: "4-1-what-makes-an-agent"
sectionNumber: "4.1"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 718
status: "raw"
section: "§4.1"
summary: ""
enriched: false
---

## § 4.1 — What makes an agent

A chatbot is a brilliant consultant on a phone call: it can only *talk*. An agent is that consultant given hands, eyes, and permission to keep working — it can *do* something, *see* what happened, and decide what to do next, again and again until the job is done.

Four words are the entire field: **reason, act, observe, repeat.**

**Reason** — the model examines the goal plus everything gathered so far and decides the next move.

**Act** — the model emits a structured action: a tool call with arguments. The model *requests*; your code executes.

**Observe** — the tool's result is appended to the context. The world has now *talked back*, and this is the line separating agents from everything before it: a chatbot's context grows only with human turns; an agent's context grows with **reality's responses**.

**Repeat** — reason again with the observation in view, until the model decides the goal is met and emits a final answer instead of an action.

**Where you've already run this loop.** The multi-hop retrieval in § 3.12 *was* this loop with a single tool. You played the orchestrator by hand. This document automates the orchestrator and hands it a toolbox.

### The honest boundary

Formulas float around — model plus tools plus loop plus goal equals agent. The load-bearing ingredient is **the loop closing through the world.**

One tool call and done is a *function with an LLM inside*. Tools available but never looped is a chatbot with plugins. The agent property emerges when **the model's own outputs determine what the model sees next, iteratively, without a human between iterations.**

That autonomy is the source of everything this field celebrates — multi-step competence — and everything it fears. **The same loop that compounds progress compounds error.** Note the symmetry now; § 4.10 formalises it.

### The spectrum, not the binary

Real systems sit on a dial of autonomy.

A **workflow** is a fixed sequence of LLM calls your code orders. Reliable, rigid.

An **agentic workflow** has code-defined structure with model-decided branches.

A **full agent** decides everything each iteration. Flexible, unpredictable.

The engineering wisdom the whole industry converged on, and the single most useful sentence you can carry into any architecture conversation: **use the least autonomy that solves the task.**

Agents are what you reach for when the path genuinely cannot be known in advance — research, debugging, open-ended synthesis. Not a fashion statement wrapped around a three-step pipeline.

**One vocabulary landmine, defused.** "Agent" is used by marketing for everything from a prompt template to a robot. Your portable test: *does the model's output feed back into the model's next input via the world?* If yes, agent. If no — however clever — not yet.

**THE DEPLOYMENT LENS — and this determines the entire Meridian architecture.**

Place the Meridian system on the dial honestly. Then place it where it *should* be.

The memo pipeline is a **workflow**. Ingest, retrieve, extract, validate, render. Fixed sequence, no model-decided branching. That is correct and you should defend it against pressure to make it cleverer, because the whole regulatory position rests on the system being predictable enough to validate.

The **discrepancy investigation** is genuinely agentic — it's the multi-hop loop from § 3.12, where hop two's query cannot be written before hop one answers. That is a real case where the path cannot be known in advance, and it earns a loop.

Everything else is a workflow with a gate.

Here is what you say when someone — and it will be an enthusiastic engineer on Meridian's side, in week twelve — proposes letting the agent decide the whole process:

*"Autonomy is a cost, not a feature. Every decision we move from our code into the model is a decision Marcus has to validate as a behaviour rather than verify as a rule. We use the least autonomy that solves the task. Right now that's a fixed pipeline with one genuinely agentic step, and I can explain every branch in it to a committee. If we hand the model the wheel, I can explain the average case and nothing else."*

**Least autonomy is not conservatism. It is the thing that makes the system validatable**, and validatable is the difference between shipping this year and shipping never.

---
