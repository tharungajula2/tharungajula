---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 6
title: "The supply chain"
slug: "6-4-the-supply-chain"
sectionNumber: "6.4"
part: "PART I — THE MAP AND THE ATTACKS"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 368
status: "raw"
section: "§6.4"
summary: ""
enriched: false
---

## § 6.4 — The supply chain

You can armour perfectly against every prompt attack and still be owned, because the *dependency you installed* was already compromised.

**The traditional chain, still applies.** Your code depends on packages, which depend on more packages, dozens deep — and any of them, if compromised, runs in *your* process with *your* privileges. Typosquatting, compromised maintainer accounts, the benign-package-turned-malicious rug pull.

Defences: **pin versions**, audit and minimise the count, use lockfiles and hash verification, scan for known vulnerabilities.

**The AI-specific chain is stranger.**

*Poisoned models* — a model can be trained with a hidden trigger that makes it misbehave on a specific phrase, invisible in normal use. **You cannot inspect weights for backdoors** — they're inscrutable numbers — so trust must come from **provenance**, not inspection.

*Poisoned training data* — if you fine-tune on third-party data.

*Poisoned servers* — adding an MCP server extends *execution* trust.

*Poisoned retrieval sources* — a document planted in a corpus you index is a supply-chain attack on your **knowledge**.

**The unifying principle: trust is a decision, make it deliberately.** Minimise. Verify provenance. Pin. Isolate what you must use but don't fully trust. Monitor for the behavioural change that signals a dependency turned malicious.

**And the deepest version: assume any dependency could be compromised, and architect so that when one is, the damage is bounded.**

**THE DEPLOYMENT LENS.** At a bank you are *yourself* a supply-chain risk, and understanding that reframes the whole conversation.

Meridian's vendor management will assess you the way this section assesses a package: what does this dependency have access to, can it be pinned, what happens if it's compromised, and what's the exit path.

So answer those questions before they're asked. **Pin everything and be able to state what version of what is running in production.** Ship a dependency inventory. And have an honest answer to "what happens if your company disappears" — which for a bank is not a rude question, it's a required one.

The move that lands: *"Here's every dependency, every model, every version. It's all pinned. Nothing auto-updates. If you want to freeze the model version for a year, we can, and I'll tell you what you'd give up."*

---
