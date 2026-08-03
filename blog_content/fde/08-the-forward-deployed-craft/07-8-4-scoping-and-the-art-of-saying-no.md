---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "08"
volumeSlug: "the-forward-deployed-craft"
volumeTitle: "THE FORWARD-DEPLOYED CRAFT"
order: 7
title: "Scoping, and the art of saying no"
slug: "8-4-scoping-and-the-art-of-saying-no"
sectionNumber: "8.4"
part: "PART II — THE FRONT END"
kind: "narrative"
sourceFile: "FDE_08_THE_FORWARD_DEPLOYED_CRAFT.md"
tags: []
hasSayThis: false
wordCount: 457
status: "raw"
section: "§8.4"
summary: ""
enriched: false
---

## § 8.4 — Scoping, and the art of saying no

Discovery tells you the real problem. Scoping decides what you actually build, and it's where technically strong engineers most reliably go wrong.

<cite index="30-1">Once the real problem is clear, the instinct for a technically strong engineer is to design the complete, elegant solution. Experienced FDEs resist this instinct deliberately. The MVP question isn't "what would fully solve this," it's "what's the smallest thing we can ship that proves this approach actually works, on this customer's real data, in front of real users."</cite>

And the reason, which is worth internalising: <cite index="30-1">customer trust in these engagements compounds through demonstrated results, not through architecture diagrams.</cite>

<cite index="30-1">Scoping the MVP too broadly almost always costs more time than it saves, since it guarantees at least one round of rebuilding once the real requirement surfaces.</cite>

### What you say no to, and how

You will say no more often than yes, and the *how* determines whether you're seen as difficult or as trustworthy.

**No, because it changes the regulatory posture.** *"Rendering the decision moves us from decision-support to an underwriting model. That's a different validation, a different timeline, and a different adverse-action obligation. I'd rather ship the assembly this quarter than the decision next year."*

**No, because the evidence isn't there yet.** *"We could add fraud detection. But we'd be adding a second unvalidated capability before the first one has production data. Let's earn the right with the discrepancy numbers first."*

**No, because you found a problem.** The § 6.15 move. *"I'm recommending we exclude Spanish-language files until extraction quality improves."* Volume you removed from your own project.

**And the hardest one — no, because it isn't an AI problem.** Sometimes the right answer is a database view, a form change, or telling someone their scanner setting broke a pipeline. **Saying that costs you scope and buys you enormous credibility**, because it demonstrates you're solving their problem rather than selling yours.

### The scoping artifact

Write it down, and keep it to one page:

**In scope** — the specific slice, with the success sentence from § 8.3. **Out of scope, explicitly** — the four things you said no to, each with its reason. **Assumptions** — what has to be true for this to work, which is where the data quality and access assumptions live. **Dependencies** — the IdP registration, the credential provisioning, the DBA allocation, each with a named owner and a date.

**The out-of-scope section is the most valuable part**, and most scoping documents don't have one. Scope creep isn't usually a big request; it's four small ones nobody wrote down. A list of explicit no's, agreed in month one, is what you point at in month five.

---
