---
title: "Neural Networks: Zero to Hero"
author: "Andrej Karpathy"
type: "resource"
status: "reading"
date: "2026-06-01"
updated: "2026-06-01"
relatedTrack: "ml-dl-core"
tags: ["resources", "ml-dl-core"]
visibility: "public"
summary: "An exceptional, building-from-scratch journey through multi-layer perceptrons, backpropagation, and language models."
---

## Why it matters
This series bypasses modern, heavy framework wrappers to build backpropagation engines and multi-layer perceptrons directly in raw Python. It forces you to construct mathematical neural arrays manually, giving a direct, deep physical understanding of weight matrices and gradients.

## Related track
`ml-dl-core`

## My current note
I am actively walking through the micrograd and makemore pipelines. Constructing the backpropagation DAG by hand has clarified how intermediate node variables store local derivatives, showing how simple mathematical additions and multiplications route gradient flow.
