---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 13
title: "JUDGEMENT DRILLS"
slug: "judgement-drills"
sectionNumber: null
part: "PART V — JUDGEMENT DRILLS"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 825
status: "raw"
section: ""
summary: ""
enriched: false
---

# PART V — JUDGEMENT DRILLS

*No single right answer. Reasoning that holds up, and reasoning that doesn't.*

**A customer wants the system to auto-approve loans under $10,000 to save underwriter time. The business case is strong. What do you say?**

*The reasoning that holds:* This crosses from decision-support to decision-making, which changes the regulatory object entirely — adverse action obligations, model risk scope, validation depth, and examiner attention. The business case for time saved doesn't touch any of that. I'd separate the questions: is auto-approval a thing you want to do at all — a credit policy decision owned by the Chief Credit Officer, not by me — and if so, does it need this system or a deterministic rule engine, which is far easier to validate. Most of the value they want is probably available from a rules-based auto-approve on clean files, with our system handling everything flagged.

*The reasoning that doesn't:* "We can add a confidence threshold." That's a technical answer to a governance question.

---

**Retrieval quality is good but underwriters aren't using it. What do you do first?**

*Holds:* Talk to six of the non-users individually, in person. Slice usage by person first so you know who to talk to — "tried once and stopped" is the group to prioritise, because they formed a judgement. The likely causes are workflow fit, speed on simple files, trust, or a manager's metric that the system makes worse — and none of those are visible in a dashboard or fixable by improving retrieval.

*Doesn't:* Improve the model. You've confirmed quality is good; the problem is elsewhere and more retrieval work is the comfortable thing rather than the useful one.

---

**Your eval shows the new prompt improves aggregate score by 4 points but breaks one refusal case. Ship?**

*Holds:* No. A fix that breaks a critical case is not a fix. The refusal case is critical because fabrication in a credit memo is categorically worse than a missed improvement, and the net gain doesn't buy you the right to introduce it. Fix the regression, re-run, then ship both.

*Doesn't:* "Net positive, ship it, we'll fix the refusal case next sprint." Critical cases don't have a next sprint.

---

**Their platform team mandates Kubernetes. You think a managed container service would be simpler and you're probably right. What do you do?**

*Holds:* Use Kubernetes. This is not your decision, being right doesn't make it yours, and spending credibility on infrastructure preference means having less for the fights that matter — like scoping, or a fairness finding. Ask for a manifest from a service they're happy with and copy their conventions. The learning curve is about a week for what an application team actually touches.

*Doesn't:* Build a case for the simpler option. You'll probably lose, and you'll have spent political capital on a decision that doesn't affect the outcome.

---

**Month six. The sponsor is replaced. The new one asks why the system doesn't make decisions. What do you do?**

*Holds:* Open the decision log and answer in ten seconds with the date, the alternatives considered, and the two named people who required it. Then offer to walk them through the regulatory reasoning properly if they want it. The log exists precisely for this, and it converts a week of relitigating into a five-minute conversation.

*Doesn't:* Re-explain from scratch, defensively. That reads as attachment to your own design rather than to a constraint someone else imposed.

---

**Two weeks before go-live you discover the system performs measurably worse on a subset that correlates with a protected characteristic. Timeline is public. What do you do?**

*Holds:* Surface it immediately to fair-lending counsel, before anyone asks, with the finding, the cause, and a recommendation — which is almost certainly to scope that subset out and route it to manual review until the gap closes. You lose volume and you keep the deployment. Finding it before an examiner does is worth vastly more than hitting a date.

*Doesn't:* Ship and fix it in the next release. The exposure isn't a bug backlog item; it's the thing that ends the programme and possibly the relationship.

---

**A customer engineer proposes splitting the system into five specialist agents. It would demo beautifully. How do you evaluate it?**

*Holds:* Run the test — what does each agent have that the others don't: distinct tools, distinct context, or genuine parallelism? If they'd share every tool and every document, what you're buying is five prompts instead of five sections in one prompt, at three to five times the cost, plus a reconciliation step that can itself be wrong. If one of them is genuinely distinct — fraud screening with different data sources and a different failure mode — that one is a real candidate and the rest aren't.

*Doesn't:* Agree because it's their engineer and it's collaborative. Least agents that solve the task, and the burden of proof is on many.

---
