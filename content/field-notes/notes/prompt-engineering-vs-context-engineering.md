---
title: "Prompt engineering vs context engineering"
slug: "prompt-engineering-vs-context-engineering"
type: "prompt-workflow"
status: "seed"
date: "2026-06-01"
updated: "2026-06-01"
tags: ["prompt-workflow", "ai-product"]
relatedTrack: "ai-product"
relatedProject: "none"
visibility: "public"
summary: " cosmetic prompt adjustments vs structural context manipulation."
sourceType: "original"
confidenceLevel: "exploring"
---

Prompt engineering is wording. Context engineering is deciding what the model sees at all. The second one matters more, and I want to get the difference straight. If the underlying context retrieval is noisy or incomplete, no amount of prompt styling will make the system's output reliable.

## What this note is for
To document the architectural boundary between prompt design (instructions, formatting, tone) and context engineering (chunk retrieval, semantic search limits, dynamic runtime pruning).

## What I need to understand
- How to measure the direct performance difference between prompt optimizations and contextual grounding adjustments.
- The latency impact of loading large context packages versus compressed semantic vectors.
- Systematic failure points in context engineering where irrelevant data pushes critical instructions out of the model's active window.

## Next update
Add comparative evaluation metrics for a standard system when context is altered versus when the system prompt is rewritten.
