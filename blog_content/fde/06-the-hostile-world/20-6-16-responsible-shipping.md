---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 20
title: "Responsible shipping"
slug: "6-16-responsible-shipping"
sectionNumber: "6.16"
part: "PART III — PROVE IT AND SHIP IT"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 413
status: "raw"
section: "§6.16"
summary: ""
enriched: false
---

## § 6.16 — Responsible shipping

**What you owe.** *Safety* — it won't harm users. *Honesty* — users know they're using AI, know its limitations, aren't deceived about its reliability. *Privacy*. *Security*. *Fairness*. *Accountability* — when the system causes harm, there is recourse and **a human responsible.**

### The pre-deployment checklist

*Evaluated* — you measured, you know how it performs and fails. *Red-teamed* — you attacked it and fixed what broke. *Guarded* — input and output guardrails live. *Scoped* — least privilege and refusals bound what it can do. *Monitored* — you'll watch it in production. *Documented* — capabilities, limits, and appropriate use are stated. *Reversible* — you can turn it off, roll back, handle incidents. *Honest to users*.

**A system that can't check these boxes isn't ready for real users, and shipping it anyway makes you responsible for the harm.**

### The harder questions

**Failure modes and their human cost.** A wrong recipe is annoying. **A wrong loan decision is unjust**, and the stakes of your system's errors determine the care it demands.

**Dual use.** Could it be misused, and have you designed against it?

**Automation and accountability.** As the system takes more autonomous action, who is responsible when it acts wrongly? **The answer must never be "the AI did it"** — which is *why* the gate and the audit trail exist: to keep a human accountable.

**Honesty about limitations — the deepest one.** A system deployed as more capable and reliable than it is causes harm through **misplaced trust**. If users trust the confident-wrong system because you presented it as authoritative, **the harm is partly yours.**

**THE DEPLOYMENT LENS.** The system card you write for Meridian has one section that matters more than the rest, and it's the shortest.

**WHAT THIS SYSTEM CANNOT DO.**

It cannot make credit decisions. It cannot count reliably without a tool. It cannot read poor scans. **It performs measurably worse on Spanish-language documents.** It will sometimes miss a discrepancy — here is the measured rate. It cannot explain its own reasoning in a way suitable for adverse action; the citation chain serves that purpose.

Every one of those sentences costs you something. All of them are true.

**And writing them down is what makes the rest of the document trustworthy.** A system card that lists only capabilities is a brochure. One that leads with limitations is an engineering document, and the people who have to sign off can tell the difference from across the room.

---
