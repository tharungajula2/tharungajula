---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 11
title: "Attention, and why the machine is shaped this way"
slug: "1-9-attention-and-why-the-machine-is-shaped-this-way"
sectionNumber: "1.9"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 415
status: "raw"
section: "§1.9"
summary: ""
enriched: false
---

## § 1.9 — Attention, and why the machine is shaped this way

Read this: *"The trophy didn't fit in the suitcase because **it** was too big."*

What does "it" mean? You resolved that instantly, because your brain let "it" *look back at* every earlier word and decide which ones matter — "trophy": very relevant; "suitcase": relevant; "the": ignore.

**Attention** is exactly that, as maths: every word gets to look at every other word and take a weighted vote on what matters for understanding it. The **Transformer** is the architecture built around doing this, in parallel, at massive scale. It's the T in GPT.

**The problem it solved.** Before 2017, language models read text strictly left-to-right, squeezing everything seen so far into one running memory. Two fatal flaws: long-range links faded (by word 500, word 3 is mush), and one-word-at-a-time reading can't be parallelised, so training crawled. The 2017 paper *"Attention Is All You Need"* threw away sequential reading entirely.

**How attention works, one level down.** For each token, the model computes three vectors: a **Query** ("what am I looking for?"), a **Key** ("what do I contain, as an advertisement?"), and a **Value** ("what information do I actually carry?"). Every token's Query is scored against every other token's Key — high score means "you're relevant to me." The scores become weights, and each token's new representation is the weighted blend of everyone's Values.

For "it": the Query "I'm a pronoun seeking my noun" matches hardest with the Key of "trophy," so "it"'s updated meaning becomes mostly trophy-flavoured.

This all-pairs matching is why attention cost grows with the **square** of sequence length. That single fact is the reason long context is expensive, and it's the same quadratic you met in § 1.5.

**Stacking makes understanding.** One attention pass is one round of "every word refines itself by consulting every other word." Transformers run many attention **heads** in parallel per layer, each learning a different relationship type — one tracks pronouns, one tracks syntax, one tracks rhyme — and stack dozens of layers. Early layers resolve grammar; deep layers hold plot, logic, code semantics. Add feed-forward layers between attention layers and positional information so word order isn't lost, and that's the Transformer.

**Why it took over.** Parallelism: all tokens process simultaneously, so training scales to GPU clusters and internet-sized data. Long range: word 5000 attends to word 1 as easily as to word 4999. Generality: the same architecture, unchanged, mastered text, images, audio, and protein folding.

---
