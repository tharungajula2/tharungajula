---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 13
title: "Reading traces"
slug: "5-10-reading-traces"
sectionNumber: "5.10"
part: "PART II — SEEING INSIDE"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 538
status: "raw"
section: "§5.10"
summary: ""
enriched: false
---

## § 5.10 — Reading traces

Having traces is useless if you can't read them, and reading a trace to find why a run failed is a distinct, learnable skill.

### The protocol

**Open the trace, don't re-run.** Re-running a non-deterministic system may not reproduce the bug and wastes money. The trace *captured* the actual failing run.

**Find the first wrong span.** Walk the tree and locate where reality diverged from intent. **Cascades mean the visible failure is downstream of the cause** — walk backward.

**Read that span's inputs and outputs.** What did this step receive, what did it produce, where's the mismatch?

**Classify.** A bad model decision (prompt problem). A bad tool result (tool problem). A bad input (poisoned by an upstream span — walk further back). An orchestration error (wrong span ran, or in the wrong order).

### A real one

```
TRACE  memo_run  A-3902            6.02s   ⚠ no discrepancy flagged
├─ retrieve                        1.71s
│  └─ rerank            20 → 4     top: [c14 c41 c9 c88]
├─ discrepancy_loop                2.98s
│  ├─ hop1_reason       "find stated income"
│  ├─ hop1_tool         search_file {query: "income information"}   ← ⚠
│  │                    returned 8 excerpts, all from application.pdf
│  ├─ hop2_reason       "I have income data; sufficient"            ← ⚠
│  └─ synthesise        "Stated income 140,000. No conflicting figure found."
├─ validate_citations              3 claims, 3 cited      ✓ passed
└─ gate                            approved by T.Beaudry  ✓
```

**MENTAL TRACE — walk it properly.**

Start at the visible failure: no discrepancy flagged on a file that has a 37% gap.

Now walk backward. `validate_citations` passed — every claim is cited, so the citation layer is *not* the problem. `synthesise` faithfully reported what it was given. `hop2_reason` concluded it had enough and terminated.

**The first wrong span is `hop1_tool`.** The query was `"income information"` — vague — and it returned eight excerpts *all from the application*, the applicant's own self-reported document. The tax transcript was never touched.

So hop two reasoned over a set containing only stated income, correctly concluded there was no conflict *within that set*, and terminated.

**Classification: argument correctness.** Right tool, poor query value — precisely the 19% from § 5.6's scorecard. Not a retrieval failure, not a reasoning failure, not a prompt failure in the synthesis.

And note what the trace also reveals: **the trajectory assertion from § 5.5 would have caught this** — `is_third_party=true` was never requested. The eval that would have caught it exists; it just wasn't running on this file yet.

**The trace turned "the system missed a discrepancy" — unactionable — into "hop one's query was too vague to reach third-party documents, and the third-party assertion isn't enforced in the loop" — two specific fixes.**

### Field guide to signatures

*The wandering trajectory* — many spans drifting from the goal, a long meandering tree. *The loop* — the same span repeating, a visual stutter. *The poisoned cascade* — one wrong span, then every downstream span building on it. *The silent tool failure* — a tool span returned an error or empty result the system didn't handle. *The latency culprit* — one span dominating wall-clock. *The cost spike* — usually a bloated-context call.

**This is why observability is a senior skill: it's the difference between debugging by guessing and debugging by seeing.**

---
