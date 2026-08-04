---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "08"
volumeSlug: "the-forward-deployed-craft"
volumeTitle: "THE FORWARD-DEPLOYED CRAFT"
order: 13
title: "Handover"
slug: "8-9-handover"
sectionNumber: "8.9"
part: "PART III — THE BACK END"
kind: "narrative"
sourceFile: "FDE_08_THE_FORWARD_DEPLOYED_CRAFT.md"
tags: []
hasSayThis: false
wordCount: 517
status: "raw"
section: "§8.9"
summary: ""
enriched: false
---

## § 8.9 — Handover

<cite index="32-1">The handover is the test.</cite>

Four words, and they're the standard to hold yourself to. Not "does it work" — **can they run it, change it, and fix it without you.**

### The three levels

**Level 1 — they can operate it.** Restart it, check its health, respond to an alert, roll it back. This is a runbook and one rehearsed incident.

**Level 2 — they can extend it.** Add a document type, adjust a threshold, add a golden case, change a prompt and ship it through the eval gate. This requires that the *architecture is legible*, not just the code.

**Level 3 — they can debug it.** Something is wrong and nobody knows why. This requires the § 3.14 and § 4.10 diagnostic trees, the traces, and someone who has walked them with you.

**Most handovers achieve level 1 and stop.** Which is why systems freeze — the team can keep it alive but can't change it, so it slowly diverges from a business that keeps moving, and in eighteen months someone proposes replacing it.

### How to actually do it

**Stop being the fastest path.** The single biggest handover failure is that you're still faster than they are, so everything routes to you. **Deliberately stop answering directly.** When someone asks you a question, answer with where the answer lives, and then help them find it. It feels obstructive for two weeks and it's the only thing that works.

**Pair on real work, not on walkthroughs.** A walkthrough is theatre. Sitting with their engineer while *they* add a document type — with you not touching the keyboard — is the transfer.

**Let them handle an incident while you're still there.** Document 07's ending. The 2 a.m. path change was diagnosed by you but *fixed* by them, and they wrote the follow-up monitor. That's a level-3 handover event and it was worth more than a month of documentation.

**Write the decision log, not just the docs.** Code explains what. Docs explain how. **Only a decision log explains why**, and *why* is what someone needs in month nine when the business changes and they have to decide whether a constraint still applies.

**And write the honest limitations document.** Document 06's system card. What it can't do, what you'd fix first, what you'd be nervous about. **The temptation at handover is to leave on a high note; the professional move is to leave an accurate one.**

**THE DEPLOYMENT LENS.** In Document 05 Marcus asked whether they could run it without you, and you said: *"You could run it. You couldn't yet change it."*

That was honest and it was a level-1 handover. Closing the gap to level 2 took the last eight weeks of the engagement, and it consisted almost entirely of *not doing things* — not writing the code, not answering the question, not fixing the incident.

**Plan the last six weeks as handover weeks and protect them.** They will be the first thing sacrificed when a deadline slips, and sacrificing them is how a successful deployment becomes an abandoned one.

---
