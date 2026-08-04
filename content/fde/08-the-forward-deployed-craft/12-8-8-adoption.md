---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "08"
volumeSlug: "the-forward-deployed-craft"
volumeTitle: "THE FORWARD-DEPLOYED CRAFT"
order: 12
title: "Adoption"
slug: "8-8-adoption"
sectionNumber: "8.8"
part: "PART III — THE BACK END"
kind: "narrative"
sourceFile: "FDE_08_THE_FORWARD_DEPLOYED_CRAFT.md"
tags: []
hasSayThis: false
wordCount: 607
status: "raw"
section: "§8.8"
summary: ""
enriched: false
---

## § 8.8 — Adoption

<cite index="32-1">They deploy. And then comes the part most engagements skip: they drive adoption. They run the workshops, they debug the workflow when it does not fit how people actually operate, they flag the blocker before it becomes the reason the project quietly dies. They train the internal champions who keep it alive after the engagement ends.</cite>

**Adoption is a separate problem from deployment and it has its own failure modes.** A system can be live, correct, fast, and used by nobody.

### Why people don't use it

**It doesn't fit how they actually work.** The memo is excellent and it opens in a separate tab, so using it means alt-tabbing between two systems forty times a day. Nobody said this in a meeting; they just stopped using it.

**It's slower for the cases they care about.** Your system saves 37 minutes on a complex file and adds 20 seconds to a simple one. Sixty percent of files are simple. Guess what they notice.

**They don't trust it and nobody addressed that.** Tom trusts it because he watched it get built and his corrections changed it. The other thirty-eight watched a training video.

**It threatens them and nobody said otherwise, credibly.** *"This won't replace you"* from a vendor is worthless. From their own Chief Credit Officer, with a reason, it means something.

**Or a manager measures them on something the system makes worse.** If underwriters are measured on files-per-day and the system encourages more careful review of flagged files, you have built something that damages their numbers. This happens constantly and it is invisible from the outside.

### What actually works

**Instrument adoption from day one and slice it by person.** Aggregate usage hides everything.

```
ADOPTION — week 6 post-rollout, 38 underwriters
──────────────────────────────────────────────────────
usage tier              n     memos/wk   edit rate
heavy (daily)           7        22        14%
regular (2-3/wk)       11         9        21%
occasional              9         3        34%
tried once, stopped     8         0         —      ⚠
never opened            3         0         —      ⚠
──────────────────────────────────────────────────────
```

**MENTAL TRACE.** Aggregate usage looks acceptable — 27 of 38 have used it. That number would go in a status report and everyone would be pleased.

**The two bottom rows are the whole story.** Eleven people out of thirty-eight are not using a system that is live and working, and eight of them *tried it and stopped*, which is a much stronger signal than never trying. They formed a judgement.

And look at the edit-rate column: it *rises* as usage falls. The occasional users edit a third of memos. Either they're getting worse outputs — plausible, if they handle different file types — or they trust it less and check harder. **Both are diagnosable and neither is visible in an aggregate.**

**Go talk to the eight.** Not a survey. Individually, in person, and ask what happened. The answers will be specific, mundane, and fixable — it opens too slowly, it doesn't handle commercial files, my manager told me to stick with the old process. **You will learn more in six conversations than in six weeks of dashboards.**

**Find and equip champions.** Tom is one. You need three or four more, distributed across teams and shifts, and what they need from you is not training — it's *access*. A direct channel to you, early sight of changes, and their feedback visibly acted on. Champions are made by being taken seriously.

**And fix the workflow, not just the tool.** If the real blocker is that the memo lives in a separate tab, the fix is an integration, not a better memo. <cite index="32-1">Debug the workflow when it does not fit how people actually operate.</cite>

---
