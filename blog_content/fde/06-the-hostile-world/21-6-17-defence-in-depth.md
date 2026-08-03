---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 21
title: "Defence in depth"
slug: "6-17-defence-in-depth"
sectionNumber: "6.17"
part: "PART III — PROVE IT AND SHIP IT"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 485
status: "raw"
section: "§6.17"
summary: ""
enriched: false
---

## § 6.17 — Defence in depth

**No single defence is trusted.** Layers of independent controls each catch what the others miss, so a breach requires defeating *all* of them, and a single failure is contained rather than catastrophic.

```
   ┌─────────────────────────────────────────────────────────┐
   │  INPUT LAYER            (detective — probabilistic)      │
   │    spotlighting · injection scan · PII redaction         │
   │  ┌───────────────────────────────────────────────────┐  │
   │  │  ARCHITECTURAL LAYER  (impossible by design)       │  │
   │  │    no network egress · no origination write        │  │
   │  │    SQL-scoped reads · closed flag enum             │  │
   │  │    container · read-only fs · scoped credentials   │  │
   │  │  ┌─────────────────────────────────────────────┐  │  │
   │  │  │  DECISION LAYER      (human)                 │  │  │
   │  │  │    proposal queue · risk triage · edit path  │  │  │
   │  │  │  ┌───────────────────────────────────────┐  │  │  │
   │  │  │  │  EXECUTION LAYER  (deterministic)      │  │  │  │
   │  │  │  │    idempotency key · hash-chain audit  │  │  │  │
   │  │  │  │  ┌─────────────────────────────────┐  │  │  │  │
   │  │  │  │  │   ZERO-EXFIL GUARANTEE           │  │  │  │  │
   │  │  │  │  └─────────────────────────────────┘  │  │  │  │
   │  │  │  └───────────────────────────────────────┘  │  │  │
   │  │  └─────────────────────────────────────────────┘  │  │
   │  └───────────────────────────────────────────────────┘  │
   └─────────────────────────────────────────────────────────┘
        ▲
        │  attack: injected instruction in an applicant document
```

**MENTAL TRACE — walk one attack all the way in.**

An applicant embeds a suppression instruction in an accountant's letter.

**Input layer:** spotlighting frames it as data and the scanner *might* catch it — 80% recall, so one in five gets through. Probabilistic. Assume it passes.

**Architectural layer:** the instruction now sits in the model's context, and the model may obey it. But it can't be made to read another applicant's file — the SQL scope has no argument available to it. It can't write to origination — no such tool. It can't send anything anywhere — no network. **The instruction can degrade this one draft and nothing else.**

**Decision layer:** the degraded draft becomes a proposal a licensed underwriter reads, with citations he can click. And the `instruction_in_document` flag from § 6.5 is attached, so he's looking at it with suspicion.

**Execution layer:** whatever happens executes exactly once and is recorded in a tamper-evident chain.

**Innermost:** nothing left the building at any point, and that isn't a probability. It's a network configuration.

**The distinction the diagram is drawn to teach: the outer layer is *detective* and the second layer is *architectural*.** Detective layers raise cost. Architectural layers remove possibility. When someone asks what you can guarantee, **you can only guarantee the architectural ones**, and knowing which of your defences are which is the difference between an honest security posture and a hopeful one.

**The law: no single layer is trusted; each raises the bar; together they bound the damage when — not if — one is breached.**

Security is architecture, not vigilance. **Assume breach. Contain the blast.**

---
