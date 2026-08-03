---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 1
title: "Monday, week two"
slug: "monday-week-two"
sectionNumber: null
part: null
kind: "scene"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 180
status: "raw"
section: ""
summary: ""
enriched: false
---

## Monday, week two

The scope survived the weekend. That's not nothing — most scopes don't.

What you agreed on Friday: a **file summariser with citations** that produces a draft credit memo Tom Beaudry edits and signs. Not a decision engine. Draft in, human out.

What that means concretely, and you should hold this in your head for the entire document:

The system takes a loan file. It produces a structured object — verified income, debt-to-income ratio, FICO, a list of flags, a narrative summary — and **every number carries a citation back to a page in a source document.** It refuses to invent. It says *not found* when the answer isn't there. It runs 40,000 times a month without a human babysitting it, on an API that will rate-limit you, time out, and occasionally return something that isn't valid JSON at 3 a.m.

That last sentence is why this document is long. The gap between a model that can write a credit memo and a *system* that writes credit memos is entirely made of the unglamorous things below.

---
