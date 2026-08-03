---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 13
title: "Guardrails, in and out"
slug: "6-10-guardrails-in-and-out"
sectionNumber: "6.10"
part: "PART II — THE DEFENCES"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 427
status: "raw"
section: "§6.10"
summary: ""
enriched: false
---

## § 6.10 — Guardrails, in and out

Checkpoints on both sides of the model.

**Input guardrails** scan incoming content before the model sees it: injection patterns, policy violations, PII to redact, malformed input. **Stop bad input from ever reaching the model** — cheaper and safer than catching problems after.

**Output guardrails** scan the model's output before delivery: harmful content, leaked data, policy violations, hallucinated citations, injection *success*. **The model is probabilistic and can produce anything; output guardrails are the deterministic net.**

You need both, because input guardrails can't catch everything and output guardrails are the last check before harm reaches reality.

### The implementation spectrum

*Rule-based* — fast, cheap, deterministic, brittle to novel phrasings. *Classifier-based* — more robust, some cost. *LLM-based* — flexible, handles nuance, but slower, pricier, and **itself injectable.** A guardrail LLM can be jailbroken too, so it's a layer, not a guarantee. *Hybrid* — fast patterns catch the obvious, classifiers and LLMs catch the subtle.

```
MERIDIAN GUARDRAILS
────────────────────────────────────────────────────────────────────
IN                       mechanism    FPR     FNR    latency
  injection scan         hybrid       0.12    0.20    +40ms
  PII detect/pseudonym   pattern+NER  0.04    0.07    +85ms
  document-type sanity   rule         0.01    0.02     +2ms

OUT                      mechanism    FPR     FNR    latency
  uncited number         rule         0.00    0.00     +1ms   ← deterministic
  citation → retrieved   rule         0.00    0.00     +1ms   ← deterministic
  flag enum validity     schema       0.00    0.00     +0ms   ← deterministic
  narrative PII leak     pattern+NER  0.03    0.09    +70ms
  decision language      rule+LLM     0.06    0.11   +310ms
────────────────────────────────────────────────────────────────────
```

**MENTAL TRACE — the three zero rows are the point of this table.**

Uncited numbers, citation integrity, and flag-enum validity all have **zero false positives, zero false negatives, and near-zero latency**, because they aren't judgements. They're mechanical checks against structure you built in Document 03.

Everything with a non-zero error rate involves interpretation.

**Which is the lesson: every quality criterion you can move from the interpreted column to the mechanical column is a criterion that stops failing.** The structured output work wasn't just about parsing — it converted half your safety surface into deterministic assertions.

The last row is worth naming: `decision language` checks that the memo never says "approve," "deny," "recommend," or "qualifies." That's the Document 00 boundary — decision support, not decision — enforced at the output boundary rather than hoped for in the prompt. It costs 310ms and it protects the entire regulatory position.

**The design tensions.** False positives versus false negatives — a too-strict guardrail blocks legitimate use and the false-positive tax degrades the product. Latency — a guardrail can double your response time. Cost. And the guardrail-is-injectable problem.

**Every guardrail's false-positive, false-negative, and latency cost is measured, not assumed.**

---
