---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 3
title: "THE INSTRUMENT"
slug: "02-the-instrument"
sectionNumber: "02"
part: "PART I — FAST RECALL"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 1252
status: "raw"
section: "§02"
summary: ""
enriched: false
---

## 02 — THE INSTRUMENT

**Three components of every LLM API call at the HTTP level.**
Key in a header, JSON body with model and messages and settings, JSON response with generated text plus metadata.

**Three laws of API keys.**
Environment variables or a gitignored `.env`, never in code or a commit. One key per project. Rotate anything you even suspect leaked.

**Why is response content a list of blocks rather than a string?**
Because a reply can mix text and tool-call blocks. It's the design that anticipates tool use.

**What does `stop_reason` tell you and why check it?**
Why generation ended. A value other than natural completion means it hit your token cap and got cut off — so half a memo can be stored as though it were whole.

**Name the three roles and why the system prompt dominates.**
System, user, assistant. Training — RLHF rewarded obeying system text. Position — it sits first. Persistence — it's re-sent every turn.

**Why is the role hierarchy "learned, not enforced," and what lives in that gap?**
It's a property of the weights, not the server, so it's probabilistic and therefore pressurable. Prompt injection lives there.

**What is prefilling and why does it kill preambles?**
You write the opening of the assistant turn yourself. Starting with `{` makes a chatty preamble implausible, because it would have to come after the brace. You steer by plausibility, not instruction.

**Name the four bones of the prompt skeleton and each one's job.**
Role sets vocabulary and priorities. Context loads the whiteboard deliberately, delimited. Task is the precise verb. Format is the shape of the deliverable.

**Which bone kills rambling, and which clause kills guessing?**
Format. And "if a value is absent, return null — do not estimate."

**Why delimit context — give both reasons.**
Quality: instructions and data can't smear together. Security: it's the frame that makes injection legible as an attack.

**Explain few-shot mechanically.**
An LLM is a pattern continuer. Show it input→output pairs and the plausible continuation is another conforming pair. You're laying rails, not explaining.

**What's the single most valuable few-shot example, and why?**
The null case — input where the answer is absent and the correct output is `null`. One null example beats three paragraphs of "do not guess."

**When do you stop prompting and start fine-tuning?**
When you need twenty-plus examples for acceptable quality.

**Explain why written reasoning steps improve accuracy.**
Generated text enters the context and conditions everything after, so the model's own reasoning becomes retrievable working memory rather than something carried implicitly in one forward pass.

**State the two hardest limits of chain-of-thought.**
It does nothing for pure recall — no amount of stepwise thinking retrieves a fact the weights don't hold. And the transcript is not the process; it's a plausible-looking rationale, not a readout of the computation.

**Why is reasoning-over-missing-knowledge more dangerous than a plain wrong answer?**
It arrives with a convincing rationale attached.

**Narration versus provenance — state the distinction.**
Narration is the model describing how it might have reasoned. Provenance is a traceable link from a claim to a document and page. Narration is not audit-grade; provenance is. Only provenance goes near a regulated artifact.

**Recite the structured-output escalation ladder.**
Ask nicely → ask and demonstrate → prefill → native schema enforcement via constrained decoding.

**Why parse defensively even with native schema modes?**
The model boundary is an untrusted-input boundary. Values can be wrong even when shape is right, and fallback providers may not enforce.

**Walk the validate-and-repair loop from memory.**
Call, strip fences, validate. On failure, append the validation error to the prompt and retry. Cap retries. Return an explicit failure — never silent garbage.

**State what the model never does in tool calling.**
It never executes anything. It requests; your code executes.

**Four steps of the tool loop.**
Send messages plus tool definitions. Model returns a structured tool-call request. Your code validates args and executes. Result is appended as a tool-result message and the model reads it.

**Why are tool descriptions "the real programming language"?**
The model chooses tools by reading them and nothing else. Bad descriptions cause the wrong tool, tools called when none was needed, and needed tools ignored.

**TTFT versus total time — which does streaming improve?**
Streaming collapses perceived latency to time-to-first-token. It doesn't speed generation at all.

**When should you not stream?**
When a machine is waiting rather than a human. Batch pipelines gain nothing and inherit reassembly complexity and mid-stream failure modes.

**Reproduce the status-code decision table.**
400/404 → your bug, don't retry. 401/403 → config problem, don't retry. 429 → retry with backoff. 500/503 → retry with backoff. Timeout → retry with backoff, and always set a timeout.

**State the law of the table.**
Retry only what can transiently succeed.

**Why exponential, why jitter, why a cap?**
Exponential gives real outages room to heal. Jitter stops a thousand clients retrying in the same instant. A cap stops the delay growing absurd. Then fail loudly.

**Which question must you ask before retrying any write?**
Is this safe to run twice?

**Name the meter's dials and which binds for long-document work.**
Requests per minute, tokens per minute, requests per day, concurrency. TPM binds.

**Proactive versus reactive throttling — which tool is each?**
Semaphore is proactive; backoff is the safety net. You want both, in that order.

**What belongs in an exact-match cache key?**
Everything that changes the answer: model, system prompt, messages, temperature, schema — and tenant.

**State prompt caching's prefix rule and the habit it rewards.**
Caching works on prefixes, so put the stable system prompt and examples first and volatile content last. One volatile line at the top breaks the whole cache.

**Why do non-retryable errors skip providers while retryables back off in place?**
A 401 won't heal, so backing off wastes fifteen seconds — jump to the next provider. A 429 will heal, so recover in place before advancing.

**What did fake providers let you test that live keys never could?**
Auth failure, rate-limit recovery, full-chain exhaustion, and ledger arithmetic — deterministically, in under a second, on every commit.

**Root cause of prompt injection in one sentence.**
The context is a single token stream with no hardware boundary between instruction and data — only a learned, therefore pressurable, role hierarchy.

**Direct versus indirect injection — why is the second the dangerous one?**
Direct, the attacker is the user and mostly damages their own session. Indirect, instructions hide in content processed on someone else's behalf; the victim never sees the payload, the model does.

**State the nightmare formula.**
Injection plus tools equals attacker-directed actions.

**Name the defence layers and the deepest one.**
Delimiting and framing, privilege minimalism, human gates, output validation, detection, assume-breach design. **Privilege minimalism is deepest — capability design, not prompt design.**

**Four vision-model weaknesses.**
Counting many similar objects, precise spatial claims, tiny or blurry text, and visual hallucination.

**Why is an image untrusted input?**
Text inside an image is an indirect-injection channel invisible to anyone scanning the file list.

**Recite the three long-document moves with each one's curse.**
Stuffing — cost and lost-in-the-middle. Retrieval — a new failure surface, and it can miss. Summarising — lossy by design.

**Why is one eval run worthless as evidence?**
Sampling variance, and inputs vary. "Looked better to me once" is astrology.

**Why must a golden set be written before tinkering?**
One built after seeing outputs inherits the system's blind spots.

**What's more informative than aggregate scores?**
The per-case flip list — which specific rows changed.

---
