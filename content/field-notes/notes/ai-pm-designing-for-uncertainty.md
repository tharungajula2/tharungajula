---
title: "AI PM notes: designing for uncertainty"
slug: "ai-pm-designing-for-uncertainty"
type: "ai-product"
status: "draft"
date: "2026-06-01"
updated: "2026-06-01"
tags: ["ai-product", "evals"]
relatedTrack: "ai-product"
relatedProject: "none"
visibility: "public"
summary: "Traditional software is binary; AI products are statistical. This requires a complete rethink of fallbacks and user trust."
sourceType: "original"
confidenceLevel: "fairly-sure"
---

Normal software is right or it's a bug. AI products are right most of the time, and "most" is a product decision. This is how I'm learning to design for that. We have to design interface architectures that degrade gracefully when predictions drop in confidence.

## What this note is for
To collect design patterns and interface fallbacks that handle model uncertainty, turning unpredictable outputs into clear product metrics.

## What I need to understand
- How to determine the exact threshold of confidence where an automated AI path should hand off to a fallback route or direct human choice.
- Effective UI micro-copy that communicates system uncertainty without breaking trust.
- How to collect implicit user correction signals to feed back into our offline evaluation datasets.

## Next update
List 3 concrete interface patterns (such as confidence thresholds and diagnostic logs) that manage probabilistic failures.
