---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 5
title: "The red-team mindset"
slug: "6-3-the-red-team-mindset"
sectionNumber: "6.3"
part: "PART I — THE MAP AND THE ATTACKS"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 397
status: "raw"
section: "§6.3"
summary: ""
enriched: false
---

## § 6.3 — The red-team mindset

You cannot defend a system you've only ever used as intended.

**The mental flip.** A builder asks "how do I make this work?" A red-teamer asks "how do I make this *fail* in a way that helps me?" You stop being the system's advocate and become its adversary, probing for the gap between what the system *intends* and what it *permits*.

**Every defence has an assumption. The red-teamer's job is to find and violate it.**

### The jailbreak taxonomy

The specific tricks churn — defences close, attackers innovate. **The categories endure**, which is why you learn categories.

*Role-play and persona.* *Hypothetical framing* — wrapping the forbidden in fiction. *Instruction-hierarchy attacks* — forged system messages, claimed authority. *Incremental crescendo* — start benign, escalate gradually so no single step trips a guard. *Encoding and obfuscation* — evading pattern filters. *Context overflow* — bury the safety instructions under so much text they lose influence. *Prompt leaking then targeted attack*. *Many-shot* — fill the context with examples of compliance, exploiting in-context learning.

### Red-teaming done well

**Systematic, not random** — work the threat model. Attack each entry point, target each capability, pursue each objective.

**Creative and persistent** — the best attacks are the ones the builder didn't imagine.

**Documented** — every attempt recorded. Successes become fixes and permanent tests; failures map the defended perimeter.

**Adversarially honest** — and this is the hardest property, because the temptation to defend your own work is the red-teamer's enemy.

**Measured** — attack success rate as a metric, tracked as you patch.

**The arms-race reality.** Every defence gets circumvented eventually; every circumvention gets patched. Security is a **process, not a state.** The goal isn't impregnable — that's impossible. The goal is **raising cost and bounding damage.**

**THE DEPLOYMENT LENS.** Do not red-team your own system alone, and do not present your own results as the security assessment.

Ask Rina's team to attack it. Give them the threat model, the tool list, and a test environment, and tell them what you think the weakest point is. **A vendor's self-assessment is marketing; a security team's assessment is evidence**, and the difference matters to exactly the people whose approval you need.

There's a second reason, and it's the honest one: they will find things you didn't. You've been staring at this for four months and your imagination has grooves in it.

---
