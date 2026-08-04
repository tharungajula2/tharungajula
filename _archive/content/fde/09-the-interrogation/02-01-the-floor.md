---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 2
title: "THE FLOOR"
slug: "01-the-floor"
sectionNumber: "01"
part: "PART I — FAST RECALL"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 1507
status: "raw"
section: "§01"
summary: ""
enriched: false
---

## 01 — THE FLOOR

**What are the three costs measured in tokens?**
Money (APIs bill per token, in and out), limits (the context window is measured in tokens), and latency (output generates token by token, so long answers are slow answers).

**Why subword tokens rather than letters or whole words?**
Letters make sequences brutally long and every position costs compute. A whole-word dictionary explodes into millions of entries and dies on typos and new words. Subword is the compromise: common words stay whole, rare words split, and anything is representable from small pieces.

**Explain the strawberry failure mechanically, using the word "opaque."**
The model may see `straw` + `berry` — two opaque bricks. It never sees the letters inside them. Counting letters is like asking someone how many atoms are in a chair.

**What's the architectural fix for the counting weakness?**
Give the model a counting tool and make it call that. Anything that must be counted is counted in code and handed to the model. A design rule, not a workaround.

**Why is conversation cost roughly quadratic in turns?**
The API is stateless, so every turn re-sends the entire history. Each turn adds a fixed step to the transcript, making the running total an arithmetic series — and the sum of an arithmetic series grows with the square of the number of terms.

**Define a language model in one sentence, precisely.**
A function that takes the text so far and outputs a probability distribution over every possible next token.

**Why is "just next-token prediction" enough for apparent reasoning?**
To predict the next word extremely well you are forced to model the world that produced the words. Prediction is the objective; understanding-shaped structure is the means the optimiser discovers, because it's the only way to keep loss low on hard text.

**Name two things a language model does not have, and one engineering practice each absence explains.**
No fact database → retrieval. No notion of true or false → grounding and citation.

**List five things that share the context window.**
System prompt, all prior turns, retrieved documents, tool definitions and results, and the tokens of the answer being generated.

**What is "lost in the middle" and what does it imply?**
Models recall the beginning and end of a long context better than the middle. Dumping 900k tokens in does not buy 900k tokens of attention quality — which means more context is not more attention.

**Extraction, code, JSON → temperature? Brainstorming → temperature?**
0–0.2 and 0.8–1.2. The first because you want the most probable answer and you want reruns to agree.

**Why can two temperature-0 runs still differ?**
Batching and floating-point nondeterminism in real serving stacks. Deterministic-ish, not notarised — so promise identical *substance*, measured by a test suite, not identical text.

**Explain why hallucination is the objective working as designed.**
The weights hold internet-frequent facts solidly and everything else weakly, but the model must still emit a next token, and the objective rewards fluent over silent. So it interpolates: text shaped like a real answer, unmoored from reality.

**Why is confidence uncorrelated with correctness?**
Generation feels identical from the inside whether the fact is solid or invented. There's no internal signal distinguishing them.

**Five high-risk hallucination zones.**
Specific citations and URLs; niche or private-domain facts; anything post-cutoff; precise numbers and dates; long reasoning chains where one early confabulation poisons everything downstream.

**What does grounding actually mean?**
Stop asking the weights to be the database. Put the true facts in the context and instruct: answer from these, say NOT FOUND if absent.

**What does an embedding model take in and put out, literally?**
Text in, a list of floats out — a point in high-dimensional space. The only operation that matters is distance, usually cosine similarity.

**Why cosine rather than plain distance?**
It ignores vector length and measures only orientation. Meaning lives in direction.

**Why are absolute similarity scores model-relative, and what does that forbid?**
0.7 on one model isn't 0.7 on another. Only rankings and contrasts within one model mean anything — so never hardcode a folklore threshold; derive it from your data.

**Walk Query, Key, Value on "the trophy didn't fit in the suitcase because it was too big."**
Each token computes a Query ("what am I looking for"), a Key ("what do I advertise"), and a Value ("what I carry"). "It" has a Query meaning *pronoun seeking its noun*, which scores highest against the Key of "trophy", so "it"'s updated representation becomes mostly trophy-flavoured.

**Why does attention cost grow quadratically, and what does that explain?**
Every token's Query is scored against every token's Key — all pairs. It explains why long context is expensive and slow.

**The lineage in one breath.**
Counts had no meaning → vectors had meaning but no context → recurrence had context but no reach and no parallelism → attention had reach, context, *and* parallelism, and parallelism is what let it eat the internet.

**Map each problem to its training stage: missing recent knowledge / wrong tone / unsafe judgement.**
Pretraining-scale, so use retrieval instead / fine-tuning / preference training.

**Give the ninety-second "should we fine-tune?" answer.**
Fine-tuning teaches style, not facts. It won't make the model know this applicant's income — only the document can, so we retrieve. And a fine-tuned model is a governed artifact needing its own validation and re-validation on every retrain. We'd be adding governance overhead to solve a problem retrieval already solves.

**State the iron law of the train/test split and its LLM-era echo.**
Never let test data influence any development decision. The echo: did the benchmark leak into pretraining?

**Define precision and recall from the confusion matrix, and give a domain that maximises each.**
Precision = TP/(TP+FP) — spam filtering. Recall = TP/(TP+FN) — cancer screening.

**Why is accuracy a lying metric on imbalanced data?**
A fraud model that always predicts "not fraud" is 99.9% accurate and 100% useless.

**In lending, what do the two error types cost?**
False negative — approved someone who defaulted — costs the loan. False positive — declined someone who'd have repaid — costs a good customer, and if it lands unevenly across groups, costs a fair-lending finding.

**Recite the four axes for reading any model landscape.**
Open-weights vs closed API. Frontier vs small. Modality and shape. How to read claimed rankings.

**What's the only benchmark that finally matters?**
Your own eval set on your own task.

**Two habits that survive every frontier reshuffle.**
Build model-agnostic — the model name lives in one config file. And trust only your own evals.

**What does `activate` mechanically do?**
Edits your shell's PATH so `python` and `pip` resolve to the copies inside `.venv`. Nothing more mystical.

**Why commit `requirements.txt` but gitignore `.venv/`?**
You commit the recipe, never the toolbox.

**`ModuleNotFoundError` on a server that worked locally — first two checks?**
Is the venv activated, and does the server's `requirements.txt` match yours.

**Name Git's three rooms.**
Working directory → `add` → staging area → `commit` → repository.

**Revert or reset — which for shared history, and why?**
`revert` for public history: it adds an anti-commit and the history stays true. `reset` moves the branch pointer and is only safe on private work.

**Read `data["items"][2]["meta"].get("tags", [])` aloud, naming each hop.**
Dict → list → index → dict → key → dict → `.get` with a default so a missing key returns an empty list instead of crashing.

**Which error tells you a `loads` is missing?**
`TypeError: string indices must be integers` — you're indexing a raw JSON string.

**What is `self`, and what does `__init__` do?**
`self` is "this particular object." `__init__` is the constructor and runs at creation.

**What is `if __name__ == "__main__":` for?**
Run this only when executed directly, not when imported. It's how one file is both a library and a script.

**IO-bound vs CPU-bound — which does async help, and why?**
IO-bound, where your code is idle waiting on network or disk. Async lets one thread juggle many tasks paused mid-wait.

**Name the two classic async bugs and their symptoms.**
Missing `await` → `RuntimeWarning: coroutine was never awaited` and a coroutine object printed instead of a result. A blocking call inside async code → the whole event loop freezes.

**What does `asyncio.Semaphore` buy you in production?**
Bounded concurrency below the provider's ceiling, so you fire in controlled waves instead of bouncing off rate limits.

**Pydantic's three superpowers.**
Validation — garbage stops at the border with a precise message. Coercion — sensible conversions happen for you. Serialisation — to and from dicts and JSON.

**How does one Pydantic model serve three jobs?**
It validates your data, documents your code, and exports JSON Schema that becomes the LLM's output contract and tool definition.

**Name the test trio every suite needs.**
Happy path, edge cases (empty, huge, unicode), and expected failures via `pytest.raises`.

**What is the regression ritual and what does it buy emotionally?**
Every bug you fix gets a test that reproduces it first. It buys bravery — you refactor fearlessly because the suite catches what you break.

---
