---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 6
title: "Buying thinking with tokens"
slug: "2-5-buying-thinking-with-tokens"
sectionNumber: "2.5"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 839
status: "raw"
section: "§2.5"
summary: ""
enriched: false
---

## § 2.5 — Buying thinking with tokens

Ask someone "347 × 26?" and demand an instant answer — they'll blurt something wrong. Let them work it on paper and they'll nail it.

Models are the same. Forced to answer in one breath, they pattern-match. Given room to **write out intermediate steps**, accuracy on math, logic, and multi-constraint problems jumps. That's chain-of-thought.

**Why writing helps a next-token predictor.** The model computes each token from the visible context. When it writes "First, 347 × 20 = 6940…", that line *enters the context* and conditions everything after. The model's own reasoning becomes retrievable working memory instead of having to be carried implicitly in one forward pass. More generated tokens means more serial computation spent on the problem.

You are literally buying thinking with tokens.

**Three grades of the technique.**

*Magic words*: appending "Think step by step before answering." Embarrassingly effective on reasoning-shaped tasks.

*Structured CoT*: dictate the stages — "First list the figures found. Then check each against the others. Then compute." You're lending the model a *procedure*. Pair it with format separation: reasoning inside `<thinking>` tags, verdict inside `<answer>` tags, so downstream code parses only the verdict.

*Self-consistency*: sample the same prompt five times at temperature around 0.8 and take the majority answer. Reasoning paths differ, wrong paths scatter, right paths converge. Costs 5×; buys accuracy on genuinely hard problems.

```
[TASK] Work through this in <thinking> tags:
       1. List every income figure you can find, with its source.
       2. Note which are stated by the applicant and which are third-party verified.
       3. Compute the discrepancy between the highest stated and the verified figure.
       Then give only the final JSON inside <answer> tags.
```

**OUTPUT**
```
<thinking>
Income figures found:
- application.pdf p3: 120,000 (stated by applicant)
- tax_2025.pdf p1: 96,400 AGI (third-party, IRS transcript)
- bank_stmt_apr.pdf p2: deposits totalling 7,900 for the month (indirect)
Verified figure is the tax transcript: 96,400.
Discrepancy: (120,000 - 96,400) / 120,000 = 19.7% — above the 10% threshold.
</thinking>
<answer>
{"verified_income": 96400, "stated_income": 120000, "discrepancy_pct": 19.7, "flags": ["income_discrepancy"]}
</answer>
```

**MENTAL TRACE.** Everything inside `<thinking>` is generated text that lands in the context before the answer is produced — so by the time the model writes the JSON, the figure 96,400 and the 19.7% are already sitting in front of it as text it can copy rather than facts it must hold in one pass.

Your code then extracts only what's between `<answer>` tags and throws the rest away. Which raises the obvious question — if you throw it away, why generate it? Because generating it changed the answer. The thinking was never for you.

### The limits — and one of them is a compliance landmine

**CoT helps reasoning-shaped tasks and does roughly nothing for pure recall.** No amount of stepwise thinking retrieves a fact the weights don't hold. Worse: hallucinated *reasoning about* hallucinated facts just looks more convincing. Chain-of-thought over missing knowledge is more dangerous than a plain wrong answer, because it comes with a rationale.

**The transcript is not the process.** The visible steps are generated text — a plausible-looking rationale — not a readout of the actual computation. Models can reach right answers via written steps containing errors, and wrong answers via impeccable-looking steps. Treat CoT as *performance that tends to improve results*, never as proof.

**Cost and latency.** Thinking tokens are billed output tokens, and output tokens are the expensive ones. They're also slow.

**Reasoning models changed the economics.** Modern reasoning variants run extended CoT internally, so decorating them with "think step by step" adds little. The engineering decision moved up a level: route hard problems to a reasoning model and pay its latency, or keep a fast model and prompt CoT explicitly.

**THE DEPLOYMENT LENS — read this twice.**

Somebody at Meridian is going to see a `<thinking>` block and have an excellent, dangerous idea: *"This is the explanation. We can use this for adverse action notices."*

It is not, and you have to kill this early and clearly.

The reasoning transcript is generated text that *tends to correlate* with how the answer was produced. It is not an audit trail of the computation. A model can produce a clean, confident rationale for a number it got wrong. Attaching that text to a regulatory notice means attesting to reasons you cannot actually verify — and Document 00 established that lenders remain fully responsible for specific, accurate adverse action reasons regardless of model complexity.

What you say: *"The thinking text improves the output, so we keep it and we log it — it's genuinely useful for debugging and for Tom to sanity-check. But it's the model narrating, not the model reporting. It doesn't go in an adverse action notice, and it isn't the explanation of record. The explanation of record is the citation chain: this number came from this document, this page. That we can prove."*

That distinction — **narration versus provenance** — is the intellectual centre of this entire deployment. Provenance is defensible. Narration is not.

---
