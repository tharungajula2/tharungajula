---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "08"
volumeSlug: "the-forward-deployed-craft"
volumeTitle: "THE FORWARD-DEPLOYED CRAFT"
order: 9
title: "Translation"
slug: "8-6-translation"
sectionNumber: "8.6"
part: "PART II — THE FRONT END"
kind: "narrative"
sourceFile: "FDE_08_THE_FORWARD_DEPLOYED_CRAFT.md"
tags: []
hasSayThis: false
wordCount: 526
status: "raw"
section: "§8.6"
summary: ""
enriched: false
---

## § 8.6 — Translation

<cite index="31-1">The dimension of the role that tends to be most underestimated is translation. Engineers and data scientists understand what a model can do. Operations teams understand what the business needs to do. Those two things are not automatically the same, and the distance between them is where a large share of AI projects quietly lose their way. A Forward Deployed Engineer works both sides of that gap and owns the outcome across both.</cite>

**Translation is not simplification.** Simplifying means dropping the hard parts. Translating means finding the version of the truth that survives in the other person's frame.

### The four registers

You will say the same thing four different ways in one week, and all four must be true.

**To Priya (business):** *"About twelve hundred a month on the strong model, a hundred on the cheap one. I'm recommending neither — we route by complexity and land near three hundred."* Money, decision, recommendation.

**To Dan (domain):** *"It will make things up. That's what the technology does when it doesn't know. So we're not building it to know things — we're building it to read your documents and cite where every number came from."* His frame is risk and defensibility, so speak in risk and defensibility.

**To Marcus (governance):** *"The grader is version-pinned. If we change it, we re-run history with the new grader and show you both curves before we use it for anything."* His frame is reproducibility and control.

**To their engineers (technical):** *"Retrieval is hybrid with RRF fusion and a cross-encoder rerank. The discrepancy sweep is a structural guarantee on metadata, not a ranking dependency, because we could not tolerate a probabilistic miss on the one flag that matters."* Full detail, no softening.

**The failure mode is using the wrong register**, and it's usually the technical one aimed at a business audience. Describing RRF fusion to Priya isn't rigorous, it's a failure to do your job — and it reads to her as either evasion or arrogance.

### Two specific translation skills

**Explaining a compromise without watering it down.** Friday's task. The structure that works: *what we did, what it costs us, why the alternative was worse, and what would change the answer.*

*"We're excluding Spanish files from automation. That's about 20% of volume, so the time savings are lower than we projected. The alternative was processing them at measurably worse quality, which is a fair-lending exposure I'm not willing to carry and neither should you. If extraction quality on Spanish documents improves — and it's a solvable problem — we revisit it."*

Four sentences. No jargon, no hedging, no hiding the cost.

**Saying "I don't know" well.** Engineers either bluff or over-apologise. The professional form is: *what you don't know, what you'd need to find out, and when you'll come back.* *"I don't know what their retention schedule requires for derived data. I'll find out from your records team this week and bring you the answer Thursday."*

**A trusted person is not someone who's always right. It's someone whose confidence is calibrated**, and calibration is only visible when you say "I don't know" out loud.

---
