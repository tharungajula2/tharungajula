---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 3
title: "The three roles"
slug: "2-2-the-three-roles"
sectionNumber: "2.2"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 552
status: "raw"
section: "§2.2"
summary: ""
enriched: false
---

## § 2.2 — The three roles

A play has a script with speaker labels: DIRECTOR (instructions the audience never hears), ACTOR, AUDIENCE. An LLM conversation is a script with three labels — **system**, **user**, **assistant** — and the model was *trained* to treat these labels with different authority.

Whoever writes the system prompt directs the play.

```python
messages = [
    {"role": "system", "content": "You are a support agent for Vizier. Answer only from provided docs. If unsure, say so. Never discuss competitors."},
    {"role": "user", "content": "Hey, what's your refund policy?"},
    {"role": "assistant", "content": "Our policy is..."},   # prior turns get re-sent
    {"role": "user", "content": "And for annual plans?"}
]
```

**MENTAL TRACE.** Read this as a transcript being handed to the model fresh, every single call. The system line is the standing instruction. Then the conversation alternates user and assistant. The final user message is the new question. The model reads the whole thing top to bottom and continues it.

The assistant turn in the middle is *your record* of what it said last time. You are replaying its own words back to it, because it doesn't remember them.

**Dialect note, and it matters.** Providers spell this differently. Some take `system` as a top-level parameter rather than a message in the array. Some call the assistant role `model`. Same three-role concept, different JSON. This is exactly why § 2.11 builds a gateway that papers over the dialects.

### Why the system prompt steers everything

Three reasons, and knowing them tells you when it will and won't hold.

**Training.** In RLHF, models were explicitly rewarded for obeying system-role text over conflicting user-role text. The hierarchy is baked into the weights — it is not enforced by the server.

**Position.** It typically sits first in the context, framing everything after.

**Persistence.** Your app re-sends it every turn, so it's the one voice that never scrolls away.

This is where products put persona, scope, format rules, tone, and safety policy. The entire behavioural difference between a generic model and a branded product is often *just this string*, which is why companies treat system prompts as trade secrets.

**The honest caveat that shapes § 2.12.** The hierarchy is *learned*, therefore *probabilistic*, therefore *pressurable*. A sufficiently crafted user message can sometimes drag the model off its system instructions. That's prompt injection, and it is not a bug that gets patched.

### Prefilling — the sneaky third role

You may write words into the *assistant* role yourself and let the model continue from them. The model behaves as though it already started answering.

```python
messages = [
    {"role": "user", "content": "Extract the FICO score from: 'Applicant FICO 712, verified.'"},
    {"role": "assistant", "content": "{"}          # ← prefill
]
```

**OUTPUT** (the model's continuation)
```
"fico": 712}
```

**MENTAL TRACE.** The model sees a transcript where it has apparently already typed `{`. The overwhelmingly plausible continuation of an assistant turn that begins with an open brace is *the rest of a JSON object*. So it never writes "Sure! Here's the JSON:" — that preamble is now implausible, because it would have to come *after* the brace.

You didn't ask it not to add a preamble. You made the preamble unlikely. That distinction — steering by plausibility rather than instruction — is the most underused technique in this document.

---
