---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 24
title: "Week fourteen — the review"
slug: "week-fourteen-the-review"
sectionNumber: null
part: "PART III — MEMORY"
kind: "scene"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 418
status: "raw"
section: ""
summary: ""
enriched: false
---

## Week fourteen — the review

Marcus's model risk review runs two hours. You do not present the model.

You present the **architecture**, and the architecture is an argument.

The system is a fixed pipeline with one agentic step, and you show the generated graph diagram to prove it. Every write goes through a gate that a licensed underwriter operates, and you show the interrupt payload he sees. Every number carries provenance to a document and a page, and you demonstrate a click-through. The system has a bounded toolbox with no write access to the origination system, and you show the tool definitions with their safety tags. Nothing about a consumer is retained outside the loan file. Every correction Tom makes becomes a regression test, and you show the growing list.

Marcus asks one question you don't have a clean answer to: *"How do you know it's still doing all that in six months?"*

You say you have a golden set and a diagnostic protocol. He says that's how you know it's *accurate*. He's asking how he knows it hasn't *drifted* — how anyone detects, in month nine, that a prompt change quietly degraded the discrepancy catch rate, when there is no human in the loop for that particular metric.

He is describing continuous validation, and he is right that you don't have it.

*"You're right. What I have is a test suite that runs when we change something. What you're asking for is something that runs whether or not we change something, and alerts when the numbers move. I don't have that yet. I'd like to build it with your validation team, because you know what the thresholds should be and I don't."*

He writes that down too.

The pilot is approved for sixty days on a limited book, conditional on an agreed monitoring plan before general rollout.

Which means the next document isn't optional and isn't a nice-to-have. It's the condition of the deployment.

---

**Wikilinks:** [[what-makes-an-agent]] · [[react-by-hand]] · [[designing-tools]] · [[build-agent-from-scratch]] · [[langgraph-state]] · [[langgraph-checkpointers]] · [[hitl-interrupts]] · [[plan-and-execute]] · [[reflection-patterns]] · [[subgraphs]] · [[scratchpads-working-memory]] · [[agent-failure-modes]] · [[cost-latency-budgets]] · [[when-many-beats-one]] · [[token-economics-of-teams]] · [[mcp-fundamentals]] · [[mcp-security]] · [[protocol-landscape]] · [[build-memory-taxonomy]] · [[retrieval-and-decay]] · [[privacy-in-memory]] · [[tool-calling]] · [[multi-hop-retrieval]] · [[injection-first-look]]

*Next — Document 05: THE PROOF. Golden datasets, LLM-as-judge and its biases, trajectory evals for agent runs, tracing, CI gates, and the monitoring plan Marcus is waiting for. This is the document that turns "it works" into something a bank can keep believing.*
