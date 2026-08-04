---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 9
title: "Regression tests"
slug: "5-7-regression-tests"
sectionNumber: "5.7"
part: "PART I — MEASURING"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 360
status: "raw"
section: "§5.7"
summary: ""
enriched: false
---

## § 5.7 — Regression tests

You tune a prompt to perfection. Weeks later you tweak it to fix one edge case — and silently break three that used to work. You won't notice until someone else does.

**The regression problem, AI edition.** You can't `assert output == frozen_string`. So a prompt regression test **freezes behaviour differently**: it asserts the output still *satisfies the same criteria* on a *frozen set of cases*, catching when a change drops a previously-passing case below its bar.

**Your golden set is your regression suite.** Baseline. Re-run everything on any change. **Diff against baseline.** Ship only if the net is positive *and* no critical case regressed.

```
REGRESSION DIFF — prompt v11 → v12
────────────────────────────────────────────────────────────
aggregate: 51/60 → 54/60   (+3)

FIXED (failing → passing)
  G-018  multilingual  Spanish employment letter now parsed
  G-022  multilingual  Spanish accountant letter now parsed
  G-034  scan quality  low-contrast statement now read
  G-041  conflicting   three income sources reconciled

REGRESSED (passing → failing)              ⚠
  G-007  refusal       now fabricates a DTI when file has no debt data
────────────────────────────────────────────────────────────
VERDICT: BLOCKED. G-007 is a critical case (must_refuse).
Net +3 does not authorise shipping a fabrication regression.
```

**MENTAL TRACE.** The aggregate went **up** by three. A team reading only the aggregate ships this change and feels good about it.

The per-case flip list says something else entirely. Four multilingual and scan-quality cases were fixed — a real win. And one refusal case broke: the system now invents a debt-to-income ratio for a file containing no debt data.

**That is the worst possible failure in this system, and it is hiding inside a net improvement.**

**The key output isn't the aggregate score. It's the flip list.** "This change fixed the three multilingual cases but broke the refusal case" is actionable. "+3" is not.

And the ship rule follows: **a fix that breaks a critical case is not a fix.**

**Freeze the deterministic parts hard.** Does it still return valid JSON? Does every number still carry a citation? Does it still refuse the out-of-scope case? These are assertable, cheap, and fast. A good regression suite is mostly cheap programmatic freezes plus a few judge-scored quality checks.

---
