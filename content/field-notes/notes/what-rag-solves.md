---
title: "What RAG actually solves — and what it does not"
slug: "what-rag-solves"
type: "rag"
status: "draft"
date: "2026-06-01"
updated: "2026-06-01"
tags: ["rag", "systems-design"]
relatedTrack: "rag"
relatedProject: "none"
visibility: "public"
summary: "RAG is sold as a hallucination fix. Here is what it really does and where its boundaries lie."
sourceType: "synthesis"
confidenceLevel: "fairly-sure"
---

RAG gets sold as the fix for hallucination. It isn't, exactly. The Barnett et al. paper puts it plainly — RAG aims to "reduce the problem of hallucinated responses," link sources to answers, and skip manual metadata — but reducing is not removing. Here's what it actually does and where it still fails.

## What this note is for
To establish a clear engineering boundary for RAG systems, breaking away from marketing claims to document factual performance capabilities.

## What I need to understand
- How to measure retrieval failure versus generation failure in RAG pipelines.
- Trade-offs between keyword-based retrieval (BM25) and dense semantic embedding search.
- The precise cost-to-latency ratio when injecting larger chunks into the model context versus running multiple narrower calls.

## Next update
Analyze and diagram the 7 failure points of RAG systems as defined in recent literature.
