---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 25
title: "Friday, 4:15 p.m."
slug: "friday-415-pm"
sectionNumber: null
part: "PART II — THE ENGINEER'S FLOOR"
kind: "scene"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 559
status: "raw"
section: ""
summary: ""
enriched: false
---

## Friday, 4:15 p.m.

You spent two days sitting with Tom Beaudry.

Here is what you learned that nobody told you, and what wasn't in the statement of work.

Tom is not making decisions slowly. Tom makes the actual credit judgement in about ten minutes and he is very good at it — 22 years of pattern recognition that no model in this document is going to replicate. What takes him 40 to 90 minutes is **everything before the judgement**: opening a 240-page file, finding the four bank statements that matter, reconciling three different stated income figures, checking whether the disputed tradeline was resolved, digging out a Spanish letter from the applicant's accountant, and then writing it all up in the memo format the credit committee requires.

**The bottleneck is not the decision. It is assembling and summarising the file.**

That distinction is the entire deployment, and it changes four things at once:

**The scope shrinks and gets much better.** You are not automating underwriting. You are building a file summariser with citations that produces a draft memo Tom edits and signs.

**The regulatory exposure collapses.** A system that drafts a summary for a human who makes and owns the decision is a fundamentally different object from a system that renders a credit decision. That distinction is worth an enormous amount when Marcus scopes model risk, and it is the difference between a six-week validation and a six-month one.

**The technical architecture is now obvious** rather than guessed. Retrieval over long documents, structured output into a fixed memo format, citations on every number, human in the loop by design, temperature near zero, bilingual from day one. Everything Documents 02 through 07 build is now determined by a fact you learned by sitting next to someone for two days.

**And Tom is no longer the person whose job you're threatening.** He's the person whose worst three hours of the week you're deleting. That is not a communications strategy — it's just what's true now, and it's true *because* you scoped it this way.

On Monday Priya asked how long until it's making decisions. Here is the answer you give on Friday, and notice that it is a better answer than the one she wanted:

*"It isn't going to make decisions. Tom's judgement is the most valuable thing in your underwriting process and it's not what's slow. What's slow is that he spends an hour assembling a file before he can spend ten minutes judging it. We're going to build the assembly. He keeps the judgement, he keeps the signature, and you get most of the throughput you were promised without moving your decision-making into a black box. That's also the version Marcus can validate this year rather than next."*

That is what a Forward Deployed Engineer does in week one. Everything else in this set is execution.

---

**Wikilinks:** [[map-of-ai]] · [[how-machines-learn]] · [[what-is-a-language-model]] · [[tokens]] · [[embeddings-intuition]] · [[attention-transformers]] · [[training-pipeline]] · [[context-windows]] · [[sampling-controls]] · [[hallucination]] · [[model-landscape]] · [[classical-ml-fundamentals]] · [[nlp-transformer-lineage]] · [[python-environments]] · [[python-data-shapes]] · [[python-classes-modules]] · [[python-async]] · [[python-typing-pydantic]] · [[git-mastery]] · [[terminal-fluency]] · [[python-craft-professional]] · [[build-token-cost-calculator]]

*Next — Document 02: THE INSTRUMENT. The scope is set. Now you have to make a model actually do it, reliably, in a format a credit committee will accept, without falling over when the API rate-limits you mid-batch.*
