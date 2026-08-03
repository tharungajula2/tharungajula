---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 9
title: "THE CRAFT"
slug: "08-the-craft"
sectionNumber: "08"
part: "PART I — FAST RECALL"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 902
status: "raw"
section: "§08"
summary: ""
enriched: false
---

## 08 — THE CRAFT

**How is FDE success measured?**
Production adoption, measurable workflow impact, and eval-driven feedback that changes product and model roadmaps.

**Why is it a loop rather than a pipeline?**
Adoption feeds discovery; deployment feeds your company's product. If your plan ends at "deploy," it's wrong by about half.

**Where do AI projects consistently fail, and what's the variable?**
The pilot-to-production transition. Same models, different outcomes — the variable is who was in the room when the pilot met reality.

**State the discovery exit condition.**
If you can't write "this system succeeds if it reduces X by Y, measured how," discovery isn't done.

**Name the four discovery techniques.**
Watch rather than ask. Ask what they do when it goes wrong. Follow the workarounds. Ask about the last three failures. And count things.

**Why is the exception path the highest-yield question?**
The happy path is documented. The exception path holds the institutional knowledge, and the answer names a person.

**What's the most common discovery failure?**
Stopping when the customer sounds confident. Confidence is not evidence.

**State the MVP question.**
Not "what would fully solve this" but "what's the smallest thing that proves this approach works, on real data, in front of real users."

**Why does scoping too broadly cost more time than it saves?**
It guarantees at least one round of rebuilding once the real requirement surfaces.

**Which section of a scoping document is most valuable, and why?**
Out-of-scope, explicitly, with reasons. Scope creep isn't one big request; it's four small ones nobody wrote down.

**What is a demo actually arguing?**
Not "look what it can do" but "look what it does to your work, and here's how you'd know if I'm lying."

**Name four demo craft moves.**
Let them pick the input. Show a failure on purpose. Make the domain expert the operator. End on the constraint, not the capability.

**How do you defuse the early executive demo?**
A sentence before you open the laptop, repeated in the follow-up email: this is a nine-day prototype on twenty files, here to show the shape and not the quality.

**Why is translation the most underestimated dimension?**
Engineers know what a model can do; operations know what the business needs. The distance between them is where projects quietly lose their way.

**Give the structure for explaining a compromise.**
What we did, what it costs, why the alternative was worse, and what would change the answer.

**How do you say "I don't know" professionally?**
What you don't know, what you'd need to find out, and when you'll come back. Trust follows calibration, not omniscience.

**Name four reasons pilots die after succeeding.**
The pilot's success conditions aren't production's. The pilot had you full time. Nobody owns it in the operating org. And the sponsor moved.

**What's the cheapest insurance in an engagement?**
A decision log — date, decision, alternatives, reason. Ninety seconds a week, and it answers the new sponsor's "why doesn't it just do X" in ten seconds.

**Name five reasons people don't use a working system.**
It doesn't fit their workflow. It's slower on the cases they care about. They don't trust it and nobody addressed that. It threatens them and nobody said otherwise credibly. Or a manager measures them on something it makes worse.

**Why slice adoption by person?**
Aggregate usage hides everything. "Tried once and stopped" is a much stronger signal than "never tried" — they formed a judgement.

**What are the three levels of handover?**
Operate it. Extend it. Debug it. Most handovers reach level one and stop, which is why systems freeze.

**What does closing to level two actually consist of?**
Not doing things. Not writing the code, not answering the question, not fixing the incident.

**Why does the decision log matter more than documentation at handover?**
Code explains what, docs explain how, only the log explains *why* — which is what someone needs when the business changes and they must decide whether a constraint still applies.

**Name four things that should flow back to your company.**
Product gaps you hand-built. Model failure patterns. Integration patterns. Objection patterns — and the anti-patterns, which generalise better than successes.

**Which two moves accelerate an FDE career fastest?**
Volunteer to onboard the next engagement. And build one reusable thing well enough to hand over without a conversation.

**Which two stakeholders will you miss?**
The person nobody mentions who knows how the old system works. And the person whose job the project makes worse — who won't object openly, and whose non-help stalls you in month five.

**What's the most damaging communication habit in this role?**
Reporting a wall as a slip, for months. A slip is "three more weeks." A wall is "this approach doesn't work."

**Give the ninety-second "should we fine-tune?" answer.**
It teaches style, not facts. It won't make the model know this file's contents — only the document can. And it's a governed artifact needing its own validation and re-validation. We'd be adding governance overhead to solve a problem retrieval already solves.

**What's the stance that survives every frontier reshuffle?**
Build model-agnostic, keep the swap a config change, and let your evals decide.

**Which four receipts are rarest and most convincing?**
The counterfactual fairness test, the error analysis with a fix, the fake-provider gateway test suite, and the honest limitations document.

**What do all four demonstrate?**
That you improve systems by evidence and report your own failures.

---
