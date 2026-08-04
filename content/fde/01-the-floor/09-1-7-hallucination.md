---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 9
title: "Hallucination"
slug: "1-7-hallucination"
sectionNumber: "1.7"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 678
status: "raw"
section: "§1.7"
summary: ""
enriched: false
---

## § 1.7 — Hallucination

Ask a model for a citation and it may invent a paper — plausible authors, plausible journal, plausible year — that has never existed. It isn't lying; lying requires knowing the truth. The model is doing the *only thing it ever does*: producing the most plausible-sounding continuation.

Usually plausible and true coincide. **Hallucination is what happens in the gap between them.**

**The mechanical cause — no lookup, only vibes.** An LM has no database and no truth-checker, only "likely next in text like this." Facts seen thousands of times in training are burned so deeply into the weights that the plausible continuation *is* the truth. Facts seen rarely — or a company's internals, or anything after training ended — have weak or no imprint. But the model *still must emit a next token*, and the objective rewards *fluent* over *silent*. So it interpolates: text shaped exactly like a real answer, unmoored from reality.

Crucially, generation feels identical from the inside whether the fact is solid or invented. Which is why confidence and correctness are uncorrelated, and why "it sounded so sure" is worth precisely nothing.

**The high-risk zones — learn to smell them:** specific citations, URLs, and case law; niche or private-domain facts; anything after the training cutoff; precise numbers and dates; long reasoning chains, where one early confabulation poisons everything downstream; and questions containing false premises, where the model would rather explain a fictional event than push back. Also: asking a model *why it* answered something — its introspection is itself just another plausible-sounding generation.

**Grounding — the fix that is architectural, not a prompt.** You cannot train hallucination away. The honest fix is to **stop asking the weights to be the database.** Put the true facts *into the context window* and instruct: answer from these documents; if it's not there, say not found. Grounded generation transforms the task from "recall from vibes" to "read and synthesise" — which models are dramatically better at.

**THE DEPLOYMENT LENS — this is the most dangerous section in this document.**

Precise numbers and dates are a high-risk zone. A credit file is *made of* precise numbers and dates. A hallucinated debt-to-income ratio in a credit memo is not an embarrassing anecdote. It is a lending decision made on a fabricated number, in a regulated institution, with a paper trail.

Three consequences that shape the entire deployment, and you should be able to state all three by Friday of week one:

**One — nothing ungrounded ships.** Every number in the generated memo must trace to a span in a source document. Not "the model is usually right about this." Traceable, or it doesn't appear.

**Two — the human stays in the loop, and that's a compliance position, not a courtesy.** The underwriter edits and signs. The system drafts. Which means the system is decision-*support*, and that distinction is worth an enormous amount when Marcus asks about model risk scope.

**Three — "I don't know" must be a first-class output.** The default failure mode of a language model is confident invention. Your system must make silence cheaper than guessing, and you must test for it — a golden case where the answer genuinely isn't in the file, and the correct output is *not found*.

What you say to Dan, the first time he raises this, and he will raise it in the first week:

*"It will make things up. That's not a defect we're going to patch out — it's what the technology does when it doesn't know. So we're not building it to know things. We're building it to read your documents and cite where every number came from, and we're testing specifically for whether it says 'not found' when the answer isn't there. If you catch it inventing a number in the pilot, that's not a surprise to me — it's a test case, and I want it."*

Dan has been told "it's very accurate" by four vendors. Nobody has said that to him. It is the single highest-leverage paragraph in this entire document.

---
