---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 10
title: "CI gates"
slug: "5-8-ci-gates"
sectionNumber: "5.8"
part: "PART I — MEASURING"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 534
status: "raw"
section: "§5.8"
summary: ""
enriched: false
---

## § 5.8 — CI gates

A regression suite catches breakage *if you remember to run it*. CI gates remove the "if": **evals as merge blockers.**

Quality becomes structural, not optional. Same lesson as security: an architecture that can't ship a regression beats a team that intends not to.

### The AI-specific challenges

**Non-determinism versus pass/fail.** An eval produces a *score*, so the gate needs a **threshold** — and thresholds need judgement. Too strict blocks good changes on noise; too loose lets regressions through. Set them from your baseline plus a noise margin.

**Cost.** Evals cost money and time. Running the full suite on every commit is slow and expensive, so **tier**: fast programmatic checks on every commit, the full judge-scored suite on pull requests or nightly.

**Flakiness.** Non-determinism means an eval can fail once and pass on retry. Gates need noise tolerance — temperature 0, averaged runs for critical metrics, statistical thresholds. Never let a single flaky number decide a merge.

**Judge drift.** A floating judge makes the threshold meaningless over time. Pin it.

```
$ gh pr checks 214

✓  lint                                       4s
✓  pytest (unit)                             11s
✓  eval:structural  (60 cases, programmatic)  38s
✗  eval:regression  (60 cases, judged)       6m12s

    REGRESSED: G-007 (critical, must_refuse)
    discrepancy catch rate: 0.94 → 0.94   (hold)
    faithfulness:           0.91 → 0.89   (within noise, soft warn)
    judge: pinned snapshot 2026-05-14 | calibration 0.87

    ✗ merge blocked: critical-case regression
```

**MENTAL TRACE.** Four checks, tiered by cost. Lint and unit tests in seconds. The structural eval — every programmatic assertion over all sixty cases — in under a minute, because no judge is involved. The judged regression suite takes six minutes and runs only on pull requests.

The gate blocks on the critical-case regression. It **warns but doesn't block** on the faithfulness dip, because 0.02 is inside the noise margin and blocking on noise trains people to bypass gates.

And look at the last line: **the report states the judge version and its calibration number.** The eval certifies its own trustworthiness in the same output that gates the merge.

### The tiers

**Hard gates** block: critical-case regressions, structural failures, metric floors.

**Soft gates** warn: minor dips within noise, non-critical flips.

**Informational**: full dashboards on the PR so the reviewer *sees* the eval impact.

**The art is gating hard on what must not break while not blocking the whole team on noise.** Over-strict gates get bypassed — the approval-fatigue lesson from § 4.7, at the CI layer.

**THE DEPLOYMENT LENS.** The CI gate is a compliance control, and you should name it as one.

Marcus's framework requires that changes to a model in production go through review with documented thresholds. A merge-blocking eval gate **is** that control, implemented in a way that cannot be skipped or forgotten.

Which means the thresholds are not yours to set alone. **Set them with the validation team**, write them into the config file, and let the config file be the documented threshold. Then the control and its documentation are the same object and can't drift apart.

*"The thresholds live in a file in the repo. You approve changes to that file the same way you'd approve a policy change. Nobody can ship past them, including me."*

---
