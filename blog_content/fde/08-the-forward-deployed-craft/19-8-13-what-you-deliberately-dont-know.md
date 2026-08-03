---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "08"
volumeSlug: "the-forward-deployed-craft"
volumeTitle: "THE FORWARD-DEPLOYED CRAFT"
order: 19
title: "What you deliberately don't know"
slug: "8-13-what-you-deliberately-dont-know"
sectionNumber: "8.13"
part: "PART V — THE CAREER"
kind: "narrative"
sourceFile: "FDE_08_THE_FORWARD_DEPLOYED_CRAFT.md"
tags: []
hasSayThis: false
wordCount: 411
status: "raw"
section: "§8.13"
summary: ""
enriched: false
---

## § 8.13 — What you deliberately don't know

Document 00 cut most of Volume 10 to awareness level. Here is that awareness, and — more usefully — **the ninety-second answers**, because your job with these is to recognise them and know when to say no.

**Fine-tuning, LoRA, QLoRA.** Adapts *behaviour and format*, not knowledge. It's a governed artifact requiring its own validation, its own versioning, and re-validation on every retrain. *"Fine-tuning teaches style, not facts. It won't make the model know this applicant's income — only the document can. And we'd be adding a validated artifact to solve a problem retrieval already solves. If the memo format won't hold without it, we revisit — with a governance case, not as a default."*

**Local and open-weight models.** Real answer to data residency and cost at scale. You own GPUs, serving, upgrades, and evaluation. *"It's the right answer if data cannot leave your network. It's an infrastructure commitment, not a config change, and quality is measured on our evals, not their benchmarks."*

**Reasoning models and test-time compute.** Spend more output tokens for better performance on hard problems. A routing decision: pay latency and cost for depth where it earns it. *"We route hard cases to it and measure whether it moves our numbers."*

**GraphRAG.** Pre-computes entity relationships instead of re-deriving them per query. Genuinely useful when relationships *are* the question — at Meridian, applicant-to-employer-to-account, which is a fraud question and therefore phase two.

**Computer-use and browser agents.** Real, improving, and the highest-blast-radius thing you could put in a regulated environment. Everything in Document 06 applies with the volume turned up.

**Voice.** Two converters bolted onto the pipeline you already understand: speech to text, your system, text to speech. Cascade for control, native speech-to-speech for latency and naturalness.

**The stance to hold across all of these:** the frontier moves, your customer will forward you an article, and the right response is always the same. **Build model-agnostic, keep the swap a config change, and let your evals decide.** That answer was true in 2024 and it will be true in 2029.

**And the one habit worth keeping:** read enough to recognise names and know what problem each thing solves. You do not need to be able to build them. **An FDE who can say "yes that exists, here's what it's for, and here's why it isn't the answer to your problem" in ninety seconds is more valuable than one who can implement it.**

---
