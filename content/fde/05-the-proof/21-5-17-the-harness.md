---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 21
title: "The harness"
slug: "5-17-the-harness"
sectionNumber: "5.17"
part: "PART III — THE LIFECYCLE"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 415
status: "raw"
section: "§5.17"
summary: ""
enriched: false
---

## § 5.17 — The harness

Everything above is pieces. The harness is the **integrated system** that runs all of them with one command and produces a complete report.

```
$ python -m evalharness run --target memo-pipeline --golden v8

╔══════════════════════════════════════════════════════════╗
║  MEMO PIPELINE — QUALITY REPORT                          ║
║  2026-07-29 · commit a3f81c2 · golden v8 (61 cases)      ║
╚══════════════════════════════════════════════════════════╝

ANSWER QUALITY
  overall pass rate ................ 56/61   (92%)
  discrepancy catch rate ........... 0.94    floor 0.90   ✓
  faithfulness ..................... 0.91
  citation integrity ............... 1.00    floor 1.00   ✓
  refusal correctness .............. 0.95    floor 0.95   ✓

BY DIFFICULTY          easy 11/11   med 22/23   hard 18/21   adv 5/6
BY CATEGORY (worst 3)  scan quality 4/7 · conflicting 5/7 · multiling 5/6

TRAJECTORY
  third-party call asserted ........ 61/61   ✓
  mean steps ....................... 4.2     (optimal 4)
  redundant-call rate .............. 3%

TOOL USE
  selection ........ 96%    args ....... 89%    timing ..... 97%

REGRESSION vs baseline (commit 71bd0e4)
  fixed 4 · regressed 0 · net +4                            ✓

COST & LATENCY
  mean cost/case ... $0.029      p95 latency ...... 13.9s

PROVENANCE
  model claude-sonnet-4-5 (snapshot pinned) · prompt v12
  judge snapshot 2026-05-14 · calibration 0.87
  reproduce: evalharness run --commit a3f81c2 --golden v8
```

**MENTAL TRACE.** One command, complete picture — and read the *structure* of the report, because that's the design lesson.

The aggregate is first, and it's the least useful number. **The breakdowns are where the information is**: scan quality at 4/7 is the weakest category, which is the OCR problem from § 5.15 still only partially fixed.

The trajectory section confirms the third-party assertion now fires on all 61 cases — the § 5.10 failure is structurally impossible now, not merely unlikely.

Regression shows four fixed, zero regressed. Ship.

And the **provenance block certifies the report's own trustworthiness**: what model, what prompt, what judge, what calibration, and the exact command to reproduce every number. A validation analyst can re-run this in six months.

### The engineering standards

Every eval component behind a clean interface, so you can swap judges or add metrics without rewiring. Config-driven. **Reproducible — pin everything and log it.** Tiered so it's fast enough to run often. And **itself tested**, because an eval harness with buggy math produces confident lies, which makes the meta-tests the most important tests in the repo.

`[RECEIPT]` **The harness with a one-command report and a real problem it found.** An un-evaluated complex system always has issues; the harness proving its worth by surfacing one is the artifact. Ship the report, the finding, the fix, and the re-verification.

---
