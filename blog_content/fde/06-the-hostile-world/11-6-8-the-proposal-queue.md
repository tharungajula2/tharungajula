---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 11
title: "The proposal queue"
slug: "6-8-the-proposal-queue"
sectionNumber: "6.8"
part: "PART II — THE DEFENCES"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 346
status: "raw"
section: "§6.8"
summary: ""
enriched: false
---

## § 6.8 — The proposal queue

You built the gate as a technique and promoted it to policy. This hardens it into production infrastructure.

**From gate to queue.** When the system wants to take a consequential action, it doesn't execute — it **creates a proposal** in a database table: the intended action, its arguments, the rationale, a risk assessment, and a status.

**Execution is decoupled from decision.** The proposal sits durably in the queue, surviving crashes, waiting indefinitely, until a human reviews it.

The security win: **no consequential action executes without passing through the queue**, and the queue is a durable, auditable, policy-enforced chokepoint.

### Risk-policy triage

Not every action needs human review — **approval fatigue kills gates.**

*Auto-approve* low-risk actions: reads, reversible actions, actions within pre-approved bounds.

*Require review* for medium and high risk: writes, external sends, irreversible actions.

*Auto-reject* forbidden actions: policy violations, rejected without even asking, because policy already decided.

```
PROPOSAL  #48211
  action        save_draft
  applicant     A-4417
  risk          MEDIUM   (write, reversible, internal, human-reviewed downstream)
  triage        REVIEW
  rationale     "Verified income 96,400 vs stated 120,000; 19.7% gap exceeds
                 10% threshold; flagging income_discrepancy."
  citations     tax_2025.pdf p1 · application.pdf p3
  flags         income_discrepancy · instruction_in_document ⚠
  payload       {editable structured fields}
  status        pending → awaiting T.Beaudry
```

**MENTAL TRACE.** The reviewer sees what, why, and the evidence — the § 4.7 principle, now durable and database-backed rather than living in a paused process.

The second flag is the § 6.5 spotlighting rule paying off. The document contained instruction-shaped text; the system didn't obey it, flagged it, and now a human sees it attached to this specific applicant.

And `payload` is **structured, editable data**, not prose. That's what makes the edit path possible.

**Payload editing — the human as collaborator.** The reviewer isn't just approve or reject; they can **edit the payload before execution.** This catches not just *malicious* actions but *mistaken* ones — the system's honest errors, caught before they land.

And **edit rate becomes a signal**: high edit rate on an action type means the system is generating that action badly. A fix pointer, for free.

---
