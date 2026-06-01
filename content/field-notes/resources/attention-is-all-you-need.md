---
title: "Attention Is All You Need"
author: "Vaswani et al."
type: "resource"
status: "reading"
date: "2026-06-01"
updated: "2026-06-01"
relatedTrack: "transformers"
tags: ["resources", "transformers"]
visibility: "public"
summary: "The foundational paper introducing the Transformer architecture, replacing recurrent models with parallelized self-attention."
---

## Why it matters
Every modern LLM and generative model rests on the scaled dot-product attention and multi-head attention structures introduced here. Understanding this paper is a critical foundation for deep learning work.

## Related track
`transformers`

## My current note
Currently dissecting Section 3.2's mathematical scaling factor. Without dividing the query-key matrix multiplication by the square root of the key dimension, extreme dimension sizes push the softmax function into regions with tiny gradients, stalling backpropagation completely.
