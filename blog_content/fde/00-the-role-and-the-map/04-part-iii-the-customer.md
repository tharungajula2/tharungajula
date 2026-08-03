---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "00"
volumeSlug: "the-role-and-the-map"
volumeTitle: "THE ROLE AND THE MAP"
order: 4
title: "PART III — THE CUSTOMER"
slug: "part-iii-the-customer"
sectionNumber: null
part: "PART III — THE CUSTOMER"
kind: "scene"
sourceFile: "FDE_00_THE_ROLE_AND_THE_MAP.md"
tags: []
hasSayThis: false
wordCount: 463
status: "raw"
section: ""
summary: ""
enriched: false
---

## PART III — THE CUSTOMER

### Meridian Credit — the brief

Everything in this set happens here. Read this once; every later document assumes it.

**Meridian Credit** is a mid-sized US consumer lender. Roughly $4B in assets. They originate personal loans and small-business term loans, mostly $5,000 to $150,000. Around **40,000 applications a month**. They are a state member bank, which means they sit squarely inside federal banking supervision, which means everything they do with a model is examined.

**The people you will meet, repeatedly:**

- **Priya Raghavan, VP of Lending.** Your executive sponsor. Wants faster decisions and fewer underwriter hours per file. She asks about money and about time, and she is the person who can save or kill the project. She is not technical and does not need to be.
- **Dan Whitfield, Chief Credit Officer.** Owns the loss rate. Deeply sceptical. His entire career is built on the idea that credit decisions should be explainable and stable. Every instinct he has is correct, and he will be your hardest and most valuable reviewer.
- **Marcus Oyelaran, Head of Model Risk.** The validation function. Independent by design — he is *supposed* to try to break your system, and if he approves something that later fails an exam, it is his neck. Treat him as an ally, because he is the one who tells you what will actually be required.
- **Rina Castellanos, Security Architect.** Controls production credentials. Will ask where data goes, who can see it, and what happens when the vendor is breached. She is the reason the 80% is 80%.
- **Tom Beaudry, Senior Underwriter, 22 years.** The person whose job you are perceived to be threatening. Knows things about loan files that exist in no documentation anywhere. If he trusts the system, it succeeds; if he doesn't, it dies quietly regardless of how good it is.

**The problem, as stated by the salesperson:** "Automate underwriting with AI."

**The problem, as it actually is:** an underwriter opens a loan file containing a credit bureau pull, bank statements, tax documents, a business plan if commercial, and a folder of correspondence — often several hundred pages, roughly 30% of it in Spanish. They spend 40–90 minutes assembling a picture and writing a credit memo. Then a second person reviews it. The bottleneck is not the *decision*. The bottleneck is **assembling and summarising the file**, and nobody at Meridian has articulated that distinction yet. Finding it is Document 01's job.

**The slice you will eventually ship:** not an underwriting model. A **file summariser with citations** that produces a draft credit memo a human underwriter edits and signs. That distinction — decision-support versus decision-maker — is worth tens of millions of dollars in regulatory exposure, and Document 06 explains exactly why.

---
