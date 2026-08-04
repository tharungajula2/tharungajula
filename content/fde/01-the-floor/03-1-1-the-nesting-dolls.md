---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 3
title: "The nesting dolls"
slug: "1-1-the-nesting-dolls"
sectionNumber: "1.1"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 616
status: "raw"
section: "§1.1"
summary: ""
enriched: false
---

## § 1.1 — The nesting dolls

When Priya says "AI," she means something she saw in a demo. When Dan says it, he means "an unauditable thing that will get us fined." When Rina says it, she means "an outbound data flow." None of them mean the same thing, and none of them are wrong.

The map, so you can place any claim anyone makes:

Imagine Russian nesting dolls. The biggest doll is **AI**: any machine doing something that looks smart. Open it and you find **Machine Learning**: machines that get smart by *studying examples* instead of following hand-written rules. Inside that, **Deep Learning**: machine learning done with huge layered networks loosely inspired by brains. Inside that, **Generative AI**: models that don't just *classify* things but *create* them — text, images, code. And the smallest, newest doll is **Agentic AI**: generative models that can *take actions* — call tools, browse, write files — in a loop, to pursue a goal.

The distinctions that actually matter to an engineer:

**Rules vs learning.** Classical AI is `if/else` at heroic scale: chess engines with hand-coded evaluation, expert systems with thousands of human-written rules. It breaks the moment the world presents a case nobody wrote a rule for. Machine Learning flips the arrow. Instead of *rules + data → answers*, you feed the machine *data + answers → rules*. The machine derives the rules itself, as numbers.

**Why deep learning ate everything.** Pre-deep-learning ML required humans to design "features" — a human decided that for spam detection, the useful signals are "number of exclamation marks" and "mentions of money." Deep learning's superpower is that the network *learns its own features* from raw data. Feed it raw pixels or raw text; early layers discover edges or word-parts, middle layers discover shapes or phrases, late layers discover faces or meaning. Nobody designs the ladder — it emerges from training.

**What makes a model "generative."** A classifier maps input → label (default / no default). A generative model learned the *distribution* of the data deeply enough to produce new samples from it. For language models: given text so far, produce a plausible next piece — repeated, this *writes*.

**What elevates a generative model to an "agent."** One thing: **the loop**. A chatbot is one pass — prompt in, text out, done. An agent takes the model's output, treats parts of it as *actions* (call this API, run this search), executes them, feeds the *results* back in, and asks again — until the goal is met. Model + tools + loop + goal = agent.

The nesting is strict: every agent uses GenAI, all serious GenAI is deep learning, all deep learning is ML, all ML is AI. Every reverse direction is false.

**THE DEPLOYMENT LENS.** Meridian already runs machine learning. Their existing credit scorecard is ML — it just isn't called that, because it was built in 2016 by a statistician and lives in a SAS process. This matters enormously and almost every vendor misses it: **you are not bringing AI to a company that has none.** You are bringing a *different kind* of AI to a company with fifteen years of governance built around the old kind. Dan's objections are not fear of the new; they are a request that the new thing meet the standard the old thing already meets.

Say it like this in the room: *"You've been doing machine learning since your first scorecard. What's new here isn't learning from data — it's that this kind reads and writes language. So the governance question isn't whether we can govern it. It's which of your existing controls transfer and which need new versions."*

That sentence buys you Dan.

---
