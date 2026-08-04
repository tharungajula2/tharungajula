---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 2
title: "A model is a function you call"
slug: "2-1-a-model-is-a-function-you-call"
sectionNumber: "2.1"
part: null
kind: "narrative"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 917
status: "raw"
section: "§2.1"
summary: ""
enriched: false
---

## § 2.1 — A model is a function you call

Everything you did in a chat window, a program can do with one HTTPS request. That is the whole revelation: **a model is a function you call.** Text goes in over the wire, text comes back, and the moment it's a function you can compose it — into loops, pipelines, products.

**What an API call actually is.** An HTTP POST to a provider's endpoint with three things: your **API key** in a header (your identity and your bill), a **JSON body** (model name, messages, settings like temperature and max output tokens), and back comes a **JSON response** (the generated text plus metadata).

The SDK is a polite wrapper around that POST. Never forget the HTTP underneath, because when things break, the truth is in the raw request and response — and on a deployment, "the truth is in the raw response" is the difference between debugging in ten minutes and debugging for a day.

```python
import anthropic

client = anthropic.Anthropic()          # reads ANTHROPIC_API_KEY from the environment

resp = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=200,
    messages=[
        {"role": "user", "content": "Explain tokens in one sentence."}
    ],
)
print(resp.content[0].text)
```

**OUTPUT**
```
Tokens are the sub-word chunks a language model actually reads and generates, and they're the unit that every price, context limit, and latency figure is measured in.
```

**MENTAL TRACE.** `anthropic.Anthropic()` builds a client object. It looks for `ANTHROPIC_API_KEY` in the environment — the same mechanism as `export ANTHROPIC_API_KEY=...` from Document 01. Nothing about the key appears in the code.

`client.messages.create(...)` assembles a JSON body and POSTs it. `messages` is a list of dicts with `role` and `content` — the shape you'll see in some form on every provider.

The response comes back as an object. `resp.content` is a **list**, and `[0]` takes the first item, and `.text` pulls the string out of it. That indexing is not decoration — hold on to it, because § 2.7 is going to explain why the response was ever a list in the first place.

**[VERIFY]** — the exact SDK method names, parameter names, and current model identifiers. Check `https://docs.claude.com/en/api/overview` before writing production code. The *shape* below — key in a header, messages in, content blocks out — is stable across providers and years. The spellings are not.

### The three laws of API keys

Violating law one has cost real people real money.

**Keys live in environment variables or a `.env` file that is in `.gitignore`.** Never in code, never in a commit. Git history is forever — a key committed and then "removed" in the next commit is still sitting in the history, and scrapers watch public repos for exactly this.

**One key per project**, so a leak is containable.

**Rotate any key you even suspect leaked.** Suspicion is sufficient grounds. Rotation is cheap; a compromised key on someone else's bill is not.

**THE DEPLOYMENT LENS.** At Meridian, credentials will not be yours to manage. Rina's team will issue a key, and it will live in whatever secret store the bank already uses. Two habits from day one: **never let a key touch your laptop's filesystem in plaintext if the customer has a vault**, and **never put a customer's key in a screenshot** — including the terminal screenshot you paste in Slack to show something working. That one has ended engagements.

### Inspect the raw response

`resp.content[0].text` is convenience sugar. The real assignment is to print the whole object once and label every field, because these fields are your instrumentation forever.

```python
print(resp.model_dump())
```

**OUTPUT** (shape illustrative; field names [VERIFY])
```
{'id': 'msg_01X...', 'type': 'message', 'role': 'assistant',
 'model': 'claude-sonnet-4-5',
 'content': [{'type': 'text', 'text': 'Tokens are the sub-word chunks...'}],
 'stop_reason': 'end_turn',
 'usage': {'input_tokens': 14, 'output_tokens': 33}}
```

**MENTAL TRACE.** Four things matter here and you will use all four.

`content` is a **list of blocks**, each with a `type`. Today there's one block of type `text`. Later there will be blocks of type `tool_use`. That's why it was ever a list.

`stop_reason` tells you *why generation ended*. `end_turn` means the model finished naturally. A different value means it hit your `max_tokens` cap and got cut off mid-sentence. **Check this field before trusting output that looks truncated** — an unchecked stop reason is how half a credit memo gets stored as if it were a whole one.

`usage` gives you the real token counts. Reconcile these against your Document 01 estimator on the same text and note the delta. That delta is how you learn where your heuristic bends.

### Statelessness, witnessed

Make two calls in a row. First: "My name is Tharun." Second: "What's my name?"

```python
r1 = client.messages.create(model="claude-sonnet-4-5", max_tokens=100,
        messages=[{"role": "user", "content": "My name is Tharun."}])
print(r1.content[0].text)

r2 = client.messages.create(model="claude-sonnet-4-5", max_tokens=100,
        messages=[{"role": "user", "content": "What's my name?"}])
print(r2.content[0].text)
```

**OUTPUT**
```
Nice to meet you, Tharun.
I don't have any information about your name — this is the start of our conversation as far as I can see. What should I call you?
```

**MENTAL TRACE.** The first call sends one message and gets a friendly reply. The second call sends **a completely fresh list containing only the new question.** The model has no memory of call one. It isn't being coy; nothing carried over.

This is Document 01's whiteboard truth, now demonstrated by your own code. Every "conversation" you build from here is *you* re-sending history manually. That's not a limitation you'll route around — it's the thing that makes the quadratic cost arithmetic from § 1.4 true.

---
