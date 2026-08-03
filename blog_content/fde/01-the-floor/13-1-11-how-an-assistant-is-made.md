---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 13
title: "How an assistant is made"
slug: "1-11-how-an-assistant-is-made"
sectionNumber: "1.11"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 453
status: "raw"
section: "§1.11"
summary: ""
enriched: false
---

## § 1.11 — How an assistant is made

How do you make a helpful assistant? Same way you make a doctor. Twenty years of general education (pretraining). Med school (fine-tuning). Residency with feedback (RLHF).

**Stage 1 — Pretraining.** Next-token prediction on trillions of tokens of internet text, books, and code. Months on thousands of GPUs; the tens-of-millions-of-dollars stage. Output: a **base model** — a magnificent autocomplete containing compressed world knowledge, but with no manners and no notion of dialogue. Ask a base model "What is the capital of France?" and it may reply "What is the capital of Germany? What is the capital of Italy?" — because quiz lists are a likely continuation of quiz questions. Knowledge vast, assistant behaviour absent.

**Stage 2 — Supervised Fine-Tuning.** Continue training the base model — same gradient descent, tiny data: tens or hundreds of thousands of hand-crafted examples of ideal assistant behaviour. The weights shift from "continue any document" to "play the assistant character." Days, not months. The same technique aimed at a domain is how specialists are made.

**Stage 3 — RLHF.** SFT teaches format; RLHF teaches *taste*. Generate multiple answers per prompt, have humans rank them, train a separate **reward model** to predict those preferences, then optimise the assistant against the reward model. This is the stage that produces helpful-harmless-honest behaviour — and the stage blamed for sycophancy and over-refusal when the reward signal is imperfect. A common simpler alternative, DPO, skips the separate reward model and optimises on preference pairs directly.

**Why you must know the recipe.** Because it tells you which tool fixes which problem, and this is a weekly decision on the job:

- Model lacks *knowledge*? That's pretraining-scale. You will not fix it. Use retrieval.
- Model has wrong *format, style, or domain voice*? Fine-tuning territory.
- Model has wrong *judgement or values*? Preference-training territory.

**THE DEPLOYMENT LENS.** Within three weeks somebody at Meridian — usually a technical person trying to be helpful — will ask: *"Shouldn't we fine-tune it on our loan files?"*

The answer is almost always no, and you need it in ninety seconds:

*"Fine-tuning teaches style, not facts. It won't make the model know this applicant's income — only the document can do that, so we retrieve. And a fine-tuned model is a new model: it needs its own validation, its own version control, and re-validation every time we retrain. We'd be adding a governed artifact to Marcus's inventory to solve a problem retrieval already solves. If we find later that the memo format won't hold without it, we'll revisit — with a cost-and-governance case, not as a default."*

That answer is technically correct, it speaks Marcus's language, and it saves you four months.

---
