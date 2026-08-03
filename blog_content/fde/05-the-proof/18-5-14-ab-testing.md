---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 18
title: "A/B testing"
slug: "5-14-ab-testing"
sectionNumber: "5.14"
part: "PART III — THE LIFECYCLE"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 345
status: "raw"
section: "§5.14"
summary: ""
enriched: false
---

## § 5.14 — A/B testing

You have two prompt versions and offline evals say B is slightly better. But offline evals use *your* golden set and *your* judge. The real question is whether B is better on real traffic.

**The proxy gap.** Offline evals are approximations — your golden set approximates real files, your judge approximates real quality. A change that improves golden-set faithfulness might *hurt* real outcomes.

**The mechanism.** *Split traffic* randomly — randomisation is essential or the assignment confounds the result. *Define the metric before running*, or you'll cherry-pick after. *Run until significant* — small samples can't detect small effects. *Decide by data.*

**AI-specific subtleties.** Non-determinism adds variance, so you need larger samples. **Metric choice is genuinely hard** because quality isn't directly observable in production. Interaction effects — a change might help simple files and hurt complex ones, so segment your analysis. And **guardrails on the experiment itself**: a bad variant is harming real users while the test runs. Cap exposure, monitor for harm, kill a clearly-bad variant early. Don't damage users for statistical purity.

**The full stack.** *Offline evals* filter changes before they ship. *A/B* verifies the survivors actually help. *Online evals* monitor the winner for drift.

**THE DEPLOYMENT LENS.** A/B testing at Meridian is constrained in a way that's worth understanding rather than working around.

You cannot randomly assign *applicants* to prompt variants. Two applicants with identical files receiving systematically different treatment because of an experimental assignment is a fair-lending problem, and no amount of statistical rigour makes it acceptable.

What you *can* do: **shadow mode.** Run variant B on the same files as A, in parallel, and compare outputs — but only A's output reaches a human. Nobody's application is affected by which variant "won." You get the comparison; the applicant gets one consistent process.

**When the standard technique is constrained by the domain, find the version that preserves the measurement and removes the exposure.** Shadow evaluation costs double the inference and buys you the entire experiment safely, which at $0.03 a file is not a close call.

---
