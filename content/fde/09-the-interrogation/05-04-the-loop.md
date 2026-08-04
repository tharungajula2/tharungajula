---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 5
title: "THE LOOP"
slug: "04-the-loop"
sectionNumber: "04"
part: "PART I — FAST RECALL"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 1394
status: "raw"
section: "§04"
summary: ""
enriched: false
---

## 04 — THE LOOP

**Recite the four verbs and what makes it an agent.**
Reason, act, observe, repeat. The load-bearing ingredient is the loop closing through the world — the model's own outputs determine what it sees next, without a human between iterations.

**Give the portable agent test.**
Does the model's output feed back into its next input via the world? If yes, agent. If no, however clever, not yet.

**State the least-autonomy principle and defend it in two sentences.**
Use the least autonomy that solves the task. Every decision you move from your code into the model becomes a behaviour someone must validate rather than a rule they can verify — and validatable is what makes a system shippable.

**Name the four organs of a tool definition and who reads each.**
Name and description at decision time. Parameter schema at call-construction time. Return shape at observation time. Three of four readers are the model.

**What is the negative-space clause and what does it prevent?**
"Do NOT use for X." It prevents the wrong tool being chosen and tools being called when none was needed.

**State the tool granularity heuristic.**
One meaningful decision's worth of action — sized so choosing it is a sensible reasoning step and its observation is a sensible reasoning input.

**Why are error strings load-bearing?**
A failing tool must return a legible, actionable error, never raise into the void. The agent's resilience is the sum of its tools' error messages.

**Name the three safety classes.**
Read, write, dangerous. Tagging at design time is the difference between adding a gate and retrofitting one.

**What happens without a stop sequence, and why is it so instructive?**
The model hallucinates its own tool results and completes an entire multi-step investigation without calling anything, inventing plausible figures and reasoning correctly over them. One config line separates a working system from a hallucination engine that looks identical.

**Name the five mock tasks a bare agent needs.**
Single-tool, chained, error-recovery, malformed-output repair, and termination honesty.

**Define state, node, edge, reducer.**
State is the typed shared structure. A node is a function taking state and returning a partial update. Edges decide what runs next — conditional edges are where agency lives. A reducer defines how a key merges when written.

**Name the four properties graphs buy, and the one thing frameworks never buy.**
Cycles as first-class, inspectability, interruptibility, composability. They never buy intelligence inside the model.

**What does a checkpointer save, keyed by what, and what does it not save?**
The entire state after each node, keyed by thread id and checkpoint number. It does not save side effects — replay can double-execute a write.

**Name the three products the thread primitive delivers.**
Crash recovery, multi-session continuity, concurrent user isolation.

**Why is a checkpointer a hard prerequisite for interrupts?**
The pause *is* a persisted checkpoint. An interrupt without persistence is a crash with manners.

**Recite the three gate design decisions, leading with the failure mode.**
Approval fatigue is the gate's real failure mode, so gate selectively — writes and dangerous only. The rationale travels with the request, because what-without-why can't be judged. Rejection is an observation, not an exception.

**Deliver the human-as-tool reframe.**
The human is structurally one more tool whose observations steer the loop.

**Why does edit rate matter in both directions?**
Too high means the system is unreliable. Too low means the gate has stopped working — a rubber-stamped gate manufactures documented approval for an unreviewed decision.

**Name the two mechanisms that make reflection work.**
Evaluation is easier than generation. And a fresh call escapes the generator's in-flight commitments.

**State the critique ordering.**
Self-critique < cross-critique < ground truth. Wire in as much ground truth as the task affords.

**Draw the three-horizon memory map.**
Scratchpad — within one attempt, lives in context, dies at task end. Episodic — across attempts, lives in checkpoints or a lesson store. Long-term — across tasks, lives outside context in stores read and written deliberately.

**State the typed-state design heuristic.**
Facts the agent must not lose go in typed state. The narrative of how it found them can stay prose and be compressed.

**Reproduce the agent failure zoo by family.**
Loops — infinite loop, premature termination, goal drift. Tools — tool spam, wrong tool or malformed args, fantasy observations. Compounding — error cascade, context poisoning, multi-agent amplification.

**Why does a legible loop-breaker beat a bare max_steps?**
Max steps lets it burn ten identical calls and then die with no answer. The loop-breaker turns the repetition into information the agent can act on.

**Walk the agent diagnostic protocol.**
Read the transcript. Find the *first* wrong step, not the loudest — walk backward. Classify by family. Apply one named guard and rerun.

**Deliver the meta-observation about guards.**
Nearly every guard was something you'd already built — budgets, legible errors, citations, plans, gates, typed state. Good agent engineering isn't a safety layer bolted on; it's the same honest architecture, load-bearing twice.

**Why does an agent's cost curve climb within a run?**
Every step re-sends the growing scratchpad. The run total is the area under the growth curve, not steps × first-step cost.

**Why doesn't streaming fix agent latency, and what does?**
Steps are sequential, so wall-clock is the sum of calls. The medicine is progress visibility — stream the thoughts and actions so the user watches work.

**State the multi-agent null hypothesis and the burden of proof.**
One good agent with good tools usually wins. The burden is on *many*, always.

**Name the three honest reasons to go multi-agent.**
Genuinely distinct specialties with distinct toolboxes. Context isolation as a feature. Parallelism for latency.

**Give the diagnostic question that exposes a fake team.**
What does each agent have that the others don't — tools, context, or genuine parallelism? If the answer is "a different prompt," it's hype.

**Name the four cost multipliers of teams, with the rule of thumb.**
Coordination overhead, context re-establishment, redundant work, and stacked scratchpad growth. Two to five times solo; debate five to fifteen.

**Why can a well-tiered team cost less than a solo frontier agent?**
Most of the team's calls run on cheap models — routing, integration, critique rubrics.

**Why should parent and child subgraphs not share a state schema?**
Narrow interfaces buy independent development, independent testing, swappability, and reuse. Shared global state recreates the global-variable disease.

**Explain MCP's economic logic.**
M applications times N tools of bespoke integration collapses to M plus N: wrap each tool once as a server, implement the client once, any client talks to any server.

**Name MCP's three primitives and the two most people ignore.**
Tools, resources, prompts. Resources and prompts are the underused depth.

**What trust boundary does MCP move?**
From "is this user input safe" to "is this *server* safe, and is what it's telling my model safe."

**Explain tool poisoning and why the tool catalogue is a vicious vector.**
A malicious server's tool *description* contains instructions aimed at the model. Descriptions load into every decision the model makes.

**Walk the confused-deputy attack and name its cure.**
Your agent has legitimate authority; a malicious server aims that authority at the attacker's ends. The agent has every permission it uses — it's just been aimed wrong. The cure is capability minimalism.

**Name the three memory types with a one-line job each.**
Semantic — facts, the what-is. Episodic — events with time, the what-happened. Procedural — how to do things, the how-to, and the most overlooked.

**Why can't one table serve all three?**
Different lifecycles. Semantic facts update in place, episodic events accumulate and decay, procedural memories are rare and rarely deleted.

**Why is the null case essential to a memory extractor?**
Most conversation isn't memory-worthy. An extractor that hoards everything is a junk drawer with extra steps.

**Give the memory scoring formula and why similarity alone fails.**
Similarity plus importance plus recency, optionally usage. Similarity alone surfaces the similar-but-trivial over the crucial-but-differently-worded.

**Recite the forgetting spectrum.**
Decay, archival, compaction, hard deletion.

**Why must deletion be designed in rather than retrofitted?**
Once memories are embedded, summarised, and entangled in derived artifacts, deleting one fact means chasing its influence across everything it touched.

**Name the never-remember categories.**
Credentials, sensitive personal data, third-party data, and ephemeral emotional states misread as durable facts.

**Give the least-storage principle and its two siblings.**
Store the least that serves the purpose. Siblings: least privilege and least autonomy.

---
