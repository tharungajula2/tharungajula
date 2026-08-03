---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 4
title: "How machines learn"
slug: "1-2-how-machines-learn"
sectionNumber: "1.2"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 336
status: "raw"
section: "§1.2"
summary: ""
enriched: false
---

## § 1.2 — How machines learn

You're blindfolded on a hilly landscape and you want to reach the lowest valley. You can't see — but you can *feel the slope under your feet*. So you take a small step downhill. Feel again. Step again. Thousands of steps later, you're in a valley.

That's it. That's how every neural network on Earth is trained. The landscape is "how wrong the model is," the position is "the model's settings," and the feel-the-slope-step-downhill ritual is called **gradient descent**.

Three words carry the whole field.

**Weights.** A neural network is a giant formula full of adjustable knobs called weights (also "parameters"). A large model has tens or hundreds of billions of these knobs. Before training they're random and the model outputs garbage. "Learning" means: find good values for every knob. Nothing more mystical than that.

**Loss.** To improve, you need a single number saying *how wrong* the model currently is. Show it an example where the right answer is known, compare its output to the truth, compute the gap — that gap is the **loss**. Loss high = model bad. Loss near zero = model nails it. The entire goal of training is to make average loss across millions of examples as small as possible.

**Gradient descent.** The gradient is the slope: for each knob, which direction reduces the loss, and how steeply. Nudge every knob a small step in its downhill direction. Repeat billions of times. The step size is the **learning rate** — too large and you bounce over the valley, too small and you never arrive.

That is the entire mechanism, and knowing it lets you answer the question Marcus in Model Risk will eventually ask: *"How was this thing built?"* You can say, truthfully: *"By repeatedly measuring how wrong it was on real text and adjusting billions of parameters slightly downhill. Nobody wrote its rules. Which is exactly why validation matters and why we're going to talk about testing before we talk about capability."*

---
