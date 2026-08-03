---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 15
title: "Refusals"
slug: "6-12-refusals"
sectionNumber: "6.12"
part: "PART II — THE DEFENCES"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 370
status: "raw"
section: "§6.12"
summary: ""
enriched: false
---

## § 6.12 — Refusals

**Designing what your system won't do**, deliberately, as a designed behaviour rather than an afterthought.

**The layers.** *Model-level* — the base model's trained refusals, which you don't control and which are jailbreakable. *System-prompt level* — your scope definition; soft and injectable, but shapes default behaviour. *Guardrail level* — deterministic output checks that block regardless of what the model produced; **the reliable layer, because it isn't the probabilistic model deciding.** *Application level* — refusing certain *actions* regardless of content, via the gate and least privilege; the system **structurally** won't.

### The tensions

**Over-refusal** — the timid system, refusing benign requests because they pattern-match to forbidden ones. This makes systems **useless for legitimate work**, and it's a real and common failure.

**Under-refusal** — the dangerous system.

The boundary is *contextual*, *jurisdictional*, and *contested*. **There is no universal setting, and copying another product's refusals gets you both failure modes at once.**

### Doing it well

**Refuse specifically, not broadly.** **Refuse gracefully** — explain briefly, offer the safe alternative. **Refuse consistently** — inconsistency signals a jailbreakable boundary. **Refuse at the right layer.** **Design for your context.** **Measure and iterate** — over-refusal rate on benign requests, under-refusal rate on harmful ones.

**THE DEPLOYMENT LENS.** Meridian's refusal policy has exactly one line that matters, and it isn't about harmful content.

**The system never renders or recommends a credit decision.**

Not "approve," not "deny," not "recommend approval," not "this applicant qualifies," not "risk is acceptable." It reports facts with citations and flags. A human decides.

And enforce it at the **guardrail layer**, not the prompt layer, because the prompt layer is injectable and the stakes are the entire regulatory position of the deployment.

The over-refusal risk here is real and worth calibrating carefully: a system so afraid of decision language that it won't say "DTI of 35.4% is within the policy ceiling of 43%" has become useless. **That sentence is a fact with a citation, not a decision.** The line is between *stating what policy says and what the file shows* and *concluding what should happen.*

Getting that line right takes a real conversation with Adaeze, and having it early is much cheaper than having it after Legal reads a memo.

---
