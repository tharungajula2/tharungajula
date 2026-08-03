---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 1
title: "The gap"
slug: "the-gap"
sectionNumber: null
part: null
kind: "scene"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 240
status: "raw"
section: ""
summary: ""
enriched: false
---

## The gap

Here is the thing nobody warns you about.

You have spent six months earning permission. Every gate said yes. And the system currently runs when you type `python -m memo_pipeline` in a terminal on a MacBook that goes to sleep at night.

Between here and 40,000 files a month there is: a server that runs continuously, a database that survives restarts, authentication against an identity provider you don't control, secrets that aren't in a `.env` file, a queue that doesn't lose work at 3 a.m., deployment into a cloud account where you have no admin rights, a change-management process with a two-week lead time, monitoring that pages someone who isn't you, and a rollback you have rehearsed.

**This is the 80%.** It is the least glamorous document in this set and the one that decides whether any of the previous six mattered. Fully-approved pilots die here constantly, and they die quietly — not from a technical failure but from four months of friction that nobody budgeted for.

One reframe before we start, and it's the difference between an FDE and a backend engineer: **you are not building infrastructure, you are building infrastructure inside someone else's constraints.** Their cloud. Their identity provider. Their network rules. Their deployment windows. Their DBA. Most of the decisions below are already made for you, and your job is to find out what they are before you build against the wrong assumption.

---
