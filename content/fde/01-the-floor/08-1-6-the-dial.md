---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 8
title: "The dial"
slug: "1-6-the-dial"
sectionNumber: "1.6"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 465
status: "raw"
section: "§1.6"
summary: ""
enriched: false
---

## § 1.6 — The dial

The model outputs *probabilities* for the next token. But a probability list isn't a word — someone must **pick**. The picking rule is called sampling, and its two dials are **temperature** and **top-p**. Same prompt, different settings, and you get a lawyer or a poet. This is why the same question gives different answers on different runs.

**The choice at every token.** After "The sky is" the model might say: "blue" 60%, "clear" 20%, "dark" 10%, "falling" 2%, and thousands of tinier ones. You can always take the top token (**greedy**, temperature near 0) — maximally predictable, but repetitive, and one early bad pick locks in a bad path. Or you sample randomly according to the probabilities — livelier, riskier.

**Temperature** reshapes the distribution before sampling. Low (0–0.3) sharpens it; the rich get richer, "blue" climbs toward certainty, output becomes focused and deterministic-ish. High (1.0–1.5) flattens it; underdogs like "falling" get real chances, output becomes creative, surprising, and increasingly unhinged. Cold = crystallised, hot = molecules bouncing everywhere.

**Top-p (nucleus sampling)** is a different philosophy: instead of reshaping, *cut the tail*. Sort tokens by probability, keep the smallest set whose probabilities sum to p (say 0.9), sample only within that nucleus. Its virtue is adaptivity — when the model is confident, the nucleus is one or two tokens and output stays tight; when the model is genuinely uncertain, the nucleus widens and creativity is allowed *exactly where the uncertainty is real*.

**The settings table. Commit it to memory:**

- Extraction, classification, code, JSON output, math → **temperature 0–0.2.** You want the most probable answer and you want reruns to agree.
- General assistant → **0.5–0.7.**
- Brainstorming, fiction, naming → **0.8–1.2.**

Convention: tune temperature *or* top-p, not both aggressively.

And the fine print that bites people: **temperature 0 still doesn't guarantee bit-identical outputs** across runs on real serving stacks, because of batching and floating-point nondeterminism. Deterministic-ish, not notarised.

**THE DEPLOYMENT LENS.** Everything Meridian does runs at temperature 0–0.2. Not because low temperature is better in general — because Dan will run the same loan file twice and compare. If the two credit memos differ in substance, the system is dead in that meeting, regardless of whether both were correct.

And when he catches a small difference anyway — he will, because of the nondeterminism above — you need the honest answer ready rather than improvised: *"At our settings the model takes the highest-probability path almost every time, but the serving infrastructure isn't bit-for-bit reproducible. So we don't promise identical text. We promise identical* substance*, and we measure that with a test suite that runs the same files every night and flags when substance moves."*

That is a real commitment, it's one you can keep, and it's Document 05.

---
