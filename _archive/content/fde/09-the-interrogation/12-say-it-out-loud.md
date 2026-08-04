---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 12
title: "SAY IT OUT LOUD"
slug: "say-it-out-loud"
sectionNumber: null
part: "PART IV — SAY IT OUT LOUD"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 884
status: "raw"
section: ""
summary: ""
enriched: false
---

# PART IV — SAY IT OUT LOUD

*The standard questions, answered in roughly ninety seconds. Rehearse until boring.*

**"How do you secure an AI agent?"**

The shallow answer is "sanitise inputs." The real answer is layered, and the load-bearing layer is architectural.

Catastrophic breaches need three things together: access to private data, exposure to untrusted input, and a path to send data out. Remove any one and the catastrophe becomes impossible rather than unlikely. So the first question isn't how to secure the agent — it's where to decompose it so no single component holds all three.

Around that: spotlight untrusted content and frame it as data. Scan for injection, knowing it's probabilistic. Give the agent the minimum capability — absent tools, not forbidden ones. Gate consequential actions through a durable queue a human reviews. Make writes idempotent and log them tamper-evidently. Sandbox with no network egress.

The distinction that matters: the scanner is detective and will fail sometimes. The missing network path is architectural and doesn't. **I can only guarantee the second kind.**

---

**"How do you know it's working?"**

Not by looking at outputs. A fixed golden set with expected behaviour authored by a domain expert, scored by a hybrid of programmatic assertions and a calibrated judge — and I report the judge's agreement with human scoring alongside every number, because an uncalibrated judge is a random number generator with good grammar.

Measured separately for retrieval and generation, because they fail independently and an end-to-end score is diagnostic mush. Gated in CI so a regression can't merge. Monitored online, because production sees inputs my golden set never imagined and quality drifts without any code change.

And every failure we ever find becomes a permanent golden case. The suite grows toward reality, so a bug fixed is fixed forever rather than returning three refactors later.

---

**"Why not just fine-tune it on our data?"**

Fine-tuning teaches style, not facts. It won't make the model know what's in this specific document — only the document can do that, so we retrieve.

And a fine-tuned model is a new governed artifact: its own validation, its own versioning, re-validation on every retrain. We'd be adding permanent governance overhead to solve a problem retrieval already solves in seconds per document.

If we later find the format won't hold without it, we revisit — with a cost and governance case, not as a default.

---

**"What happens when it's wrong?"**

It will be wrong, and I can tell you roughly how often and on which kinds of case, because we test on a fixed set that includes the hard ones.

When it's wrong, the reviewer sees it — every number is cited and clickable, so verifying takes seconds, and an uncited number renders as a visible defect rather than a silent one. Nothing consequential happens without a human approving it.

And when they correct one, that correction becomes a permanent test case. So the things it misses in six months will be different from the things it misses today, and I can show you the list of what it learned.

---

**"Can you prove it doesn't discriminate?"**

Not with an accuracy number — a model can post identical overall accuracy while distributing its errors very unevenly, and aggregate accuracy is silent about that by construction.

What I can do is counterfactual testing: run the same files twice with the financials held identical and only identity attributes varied, and measure whether outputs shift. When we ran it we found two things — neighbourhood references surviving redaction, which was a bug, and measurably worse extraction on non-English documents, which is a capability gap that produces a disparate outcome regardless of cause.

We scoped out the second until it's fixed. And the fairness analysis is run by your model risk team on a quarterly cadence, not by us — a vendor grading its own fair-lending exposure isn't a control.

---

**"Why is this so much more expensive than a chatbot?"**

It isn't, per call. It's a loop, and a loop re-sends its whole history every step, so the run cost is the area under a growing curve rather than steps times the first step.

The levers are all in hand: route cheap models for classification and routing and frontier only where quality compounds, keep the stable prefix first so provider caching applies, distil observations rather than accumulating raw ones, and cap spend strictly so the system refuses rather than overruns.

But the number that actually matters here isn't cost per call — it's cost per file against the alternative. Ours is cents. The manual process is 40 minutes of underwriter time.

---

**"Could we run this without you?"**

Right now you could operate it — restart it, respond to an alert, roll back in four minutes, and the runbook has all three.

Extending it is the gap. The pipeline is still shaped by decisions I made and haven't fully written down, so adding a document type in month four would mean reverse-engineering me. That's what the last six weeks are for, and it consists mostly of me not doing things — not writing the code, not answering the question directly, not fixing the incident.

The test isn't documentation. It's your engineer handling a real incident while I'm still here.

---
