---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 13
title: "Engineering the bill"
slug: "4-11-engineering-the-bill"
sectionNumber: "4.11"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 611
status: "raw"
section: "§4.11"
summary: ""
enriched: false
---

## § 4.11 — Engineering the bill

Agents are the most expensive artifacts you will build. A chatbot turn is one call. An agent run is a loop of calls, each re-sending a growing scratchpad.

**The anatomy of the bill.** Per step, input equals system prompt plus tool catalogue plus *the entire scratchpad so far* plus the new observation. Output is the thought and action. The scratchpad grows every step, so **per-step cost climbs through a run** — a 12-step run doesn't cost 12× step one, it costs the area under the growth curve.

Add the surcharges: reflection doubles calls per round, replanning adds checks and replans, multi-agent adds the orchestrator's calls *around* every specialist's, and reasoning-mode models multiply output tokens precisely when tasks get hard.

**Latency mirrors cost with a twist: steps are sequential.** Wall-clock is the sum of calls plus tools, and no streaming trick hides a 40-call run. Streaming treats the perceived latency of *one* call. Agents need different medicine: **progress visibility** — stream the thoughts and actions as they happen, so the user watches work instead of a spinner.

### The budget stack

**Hard caps.** Max steps, max iterations per plan step, max tool calls, max total tokens, max wall-clock — **and a max spend in currency, computed live from the ledger.** The run halts at the cap gracefully, returning partial findings plus gaps rather than dying. Budget exhaustion as an *honest outcome*, which is the NOT FOUND philosophy applied to money.

**Model routing — the biggest lever.** Cheap models for routing, replan checks, repetition breaking, and critique rubrics. Frontier models for planning and synthesis where quality compounds. The gateway makes per-call routing a parameter rather than a refactor. Typical production splits put most calls on cheap models.

**Scratchpad economics.** § 4.9's ladder *is* cost engineering — distill-and-replace and typed state flatten the growth curve you're paying the integral of.

**Prompt caching, and check yours today.** An agent's re-sent prefix is huge and identical every step. Stable system prompt and tool catalogue first, volatile scratchpad last. **This is the single cheapest large win available**, and it's an assembly-order question, not a feature.

**Parallelism for latency.** Independent steps and parallel tool calls via `gather` — latency falls, cost doesn't. Know which problem you're solving.

### Budget as product design

A budget isn't a limp constraint. It's a **contract with the user**. "Quick summary — 30 seconds, shallow" and "full investigation — 8 minutes, cited" are different products from the same agent at different budget settings.

Showing estimated cost *before* the run and actual cost after is trust-building of the same species as citations.

**THE DEPLOYMENT LENS.** At Meridian the interesting number isn't the token bill. It's **cost per file against the alternative.**

Tom spends 40 to 90 minutes assembling a file. At a fully-loaded underwriter cost, that's real money per file, times 40,000 files. Your system's marginal cost per file is measured in cents.

Which means: **the correct budget is generous, not tight.** Spending 4× on a file to catch one more discrepancy is trivially worth it, and arguing for cheapness here would be optimising the wrong variable by three orders of magnitude.

But — and this is the FDE part — **you must be able to show the arithmetic**, because Priya's finance review will ask for cost per file and a competitor's deck will quote a lower one. The answer that wins is: *"Ours costs more per file than theirs and saves forty minutes of underwriter time per file. Here's the per-file ledger line and here's the loaded hourly rate. The comparison that matters isn't vendor against vendor, it's either of us against the status quo."*

---
