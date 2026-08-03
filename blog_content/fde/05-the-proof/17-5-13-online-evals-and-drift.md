---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 17
title: "Online evals and drift"
slug: "5-13-online-evals-and-drift"
sectionNumber: "5.13"
part: "PART III — THE LIFECYCLE"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 912
status: "raw"
section: "§5.13"
summary: ""
enriched: false
---

## § 5.13 — Online evals and drift

*This is the section Marcus was asking for.*

Your golden set tests sixty curated cases. Production sees thousands of real, messy, unpredictable files you never imagined.

**Offline versus online — the complementary pair.** *Offline* evals run before deploy: controlled, comparable, catch known issue types — but **limited to what you thought to test.** *Online* evals score real production traffic continuously: they catch **unknown unknowns**, detect **drift**, and measure actual user-facing quality rather than proxy quality.

**You need both. Offline to ship safely, online to *stay* safe.**

### Scoring traffic with no ground truth

Real files arrive with no known-correct answer. So how do you score them?

**Reference-free judges.** *"Is every claim in this memo supported by the cited chunk?"* needs no ground truth — only the context and the answer. **Faithfulness works online.**

**Implicit signals.** Did the reviewer accept, edit, or reject? **At Meridian this is unusually strong**, because the gate produces an explicit human verdict on every single output. Most deployments would kill for this.

**Guardrail checks.** Programmatic: did the output contain an uncited number, leak data, violate a rule?

**Sampling for human review.** Score a random sample by hand — expensive, but ground truth, and it **calibrates** the automated scores.

The mix: cheap automated scoring on *all* traffic, human review on a *sample* to calibrate.

### Drift — the thing only online evals catch

**Model drift** — the provider updated the model behind your API. **Data drift** — inputs shift; a new loan product launches, a branch starts sending different scan quality. **Concept drift** — what counts as a good answer changes.

```
DISCREPANCY CATCH RATE — weekly, online, human-sampled
──────────────────────────────────────────────────────
w1   0.94  ████████████████████
w2   0.93  ███████████████████
w3   0.94  ████████████████████
w4   0.91  ██████████████████
w5   0.89  █████████████████        ⚠ below floor 0.90
w6   0.87  ████████████████         ⚠ ALERT — investigate
──────────────────────────────────────────────────────
edit rate  12% → 12% → 13% → 17% → 21% → 24%
```

**MENTAL TRACE.** Nothing changed in the code. No deploy happened between week one and week six.

The catch rate fell seven points and the edit rate doubled — **two independent signals moving together**, which is what makes this a real drift signal rather than noise in one metric.

Investigation finds the cause in the corpus, not the code: a branch that was digitising documents at 300 DPI switched to a cheaper scanner at 150 DPI in week three. OCR quality dropped, tax transcript figures started coming through garbled, and the discrepancy comparison began silently failing on files from that branch.

**No code change caused it. No offline eval could have caught it, because your golden set was built from the old scans.** This is exactly the failure Marcus was worried about, and the only thing that catches it is measuring production continuously.

### The flywheel

**Production failures become new golden cases.** Online eval finds a failure class → you add golden cases for it → your offline suite catches it → CI gates it → it never regresses.

**Online → offline → CI** is the flywheel that makes your eval coverage *grow toward reality*, driven by production itself. This is how mature systems get *more* reliable rather than rotting.

**THE DEPLOYMENT LENS — the monitoring plan, and one metric that isn't in any framework.**

Here's what you hand Marcus.

```
MERIDIAN MONITORING PLAN — v1, agreed with Model Risk

METRIC                        FLOOR   FREQ     ON BREACH
────────────────────────────────────────────────────────
discrepancy catch rate        0.90    weekly   investigate + notify MRM
citation integrity            1.00    daily    halt pipeline
uncited-number rate           0.00    daily    halt pipeline
underwriter edit rate         < 25%   weekly   investigate
underwriter reject rate       < 5%    weekly   investigate
refusal correctness           0.95    weekly   investigate
p95 latency                   < 20s   daily    investigate
cost per file                 < $0.06 weekly   notify
────────────────────────────────────────────────────────
FAIRNESS MONITORING           quarterly, run by MRM not by vendor
  flag rate by geography / applicant language, tested for
  statistically significant disparity across groups
────────────────────────────────────────────────────────
judge pinned: snapshot 2026-05-14   calibration 0.87
golden set: v7 (60 cases)           re-baseline on any judge change
```

Three things to say about that table.

**Citation integrity has a floor of 1.00 and halts the pipeline.** Not "investigate." Halt. An uncited number in a credit memo is not a quality dip, it's a defect that must not reach a human as though it were verified. **Some thresholds are not tunable, and knowing which is judgement.**

**Edit rate is monitored in both directions.** Too high means the system is unreliable. **Too low means the gate has stopped working** — the § 4.7 approval-fatigue failure, made measurable. A rubber-stamped gate produces beautiful numbers and no oversight.

**And the fairness row is the one that matters most, and the one no eval framework will give you.** Document 00 established that examiner findings land on disparate impact, and that a model can post identical overall accuracy while distributing its errors unevenly across groups. **Aggregate accuracy is silent about this by construction.**

So the flag rate gets sliced and tested for statistically significant disparity — and critically, **that test is run by Meridian's model risk function, not by you.** A vendor grading its own fair-lending exposure is not a control. Your job is to make the data available, cleanly sliced and reproducible, and then to stay out of the way of the people whose job it is to find problems in it.

**Proposing a monitoring control that you are structurally excluded from operating is the single most credible thing you can do in front of a validation team.** It is also correct.

---
