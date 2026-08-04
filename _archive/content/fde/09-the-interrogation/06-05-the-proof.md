---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 6
title: "THE PROOF"
slug: "05-the-proof"
sectionNumber: "05"
part: "PART I — FAST RECALL"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 1116
status: "raw"
section: "§05"
summary: ""
enriched: false
---

## 05 — THE PROOF

**Name the three walls that break traditional testing for AI.**
Non-determinism, no single correct answer, and behaviour emerging from prompts rather than code.

**Decompose "an eval" into four components.**
Dataset, task, scorer, metric. The dataset must be fixed or runs aren't comparable.

**State the junior-versus-senior difference concretely.**
"I improved the system" — unfalsifiable. "I raised discrepancy catch rate from 0.87 to 0.94 on the 60-case golden set while holding p95 and cost" — evidenced.

**Why does `forbidden_flags` belong in a golden case?**
A system that flags everything is as broken as one that flags nothing — it just fails in a direction that looks conservative.

**Why must a good golden set make your current system fail some cases?**
A set nothing fails isn't measuring anything.

**What does a judge verdict contain beyond a score, and why each?**
Reasoning first, because generating it before the score forces evaluation over gut-guessing and produces an audit trail. Per-criterion breakdown, because granular scores point at fixes. Confidence, so low-confidence verdicts route to humans.

**Explain the calibration procedure and the threshold.**
Hand-score a sample blind, run the judge on the same sample, compute agreement. Below roughly 80%, the judge is miscalibrated — fix the rubric and re-calibrate. Report the number with every eval.

**What does an uncalibrated judge produce?**
Fiction with a decimal point.

**Give the hybrid scoring rule.**
Programmatic assertions for the objectively checkable, judge for the qualitative, human review for low-confidence and high-stakes. Don't judge what a regex can verify.

**Name five judge biases and why each misleads systematically.**
Verbosity, position, self-preference, sycophancy toward confidence, formatting. Each is a systematic error, so optimising against it optimises the bias instead of the quality.

**Why is sycophancy-toward-confidence doubly dangerous?**
It's the exact failure you built the eval to catch, now present in the detector.

**Explain the version-pinning trap.**
The provider updates the model behind your judge's name, your scores shift, and you cannot tell whether the system got worse or the grader changed. Your baseline moved invisibly.

**What is re-baselining?**
Re-running past evals with the new judge to establish the offset, so old and new scores stay comparable.

**Name four things answer-only scoring misses.**
Efficiency, reliability (right answer by luck), right-answer-wrong-reason, and partial credit.

**Why does the path predict future behaviour when the answer doesn't?**
A run that succeeded by luck will fail next time; the process is the repeatable thing.

**Give the trajectory assertion principle.**
Find the one step whose absence is invisible in the output, and assert it in the trajectory. Most deployments have one.

**State the tool-use triad and the fix each points at.**
Right tool → fix descriptions. Right args → fix parameter descriptions and the reasoning that fills them. Right time → fix orchestration.

**Why can't a prompt regression test assert equality, and what does it assert?**
Non-determinism. It asserts the output still satisfies the same criteria on a frozen set of cases.

**Why is the flip list more valuable than the aggregate?**
An aggregate can rise while a critical case breaks. "Fixed the multilingual cases, broke the refusal case" is actionable; "+3" is not.

**State the ship rule.**
A fix that breaks a critical case is not a fix.

**Name the four AI-specific CI challenges and a mitigation each.**
Thresholds — set from baseline plus noise margin. Cost — tier fast programmatic checks on commit, judged suite on PR. Flakiness — temperature 0 and averaged runs. Judge drift — pin it.

**Why does over-strict gating backfire?**
It trains people to bypass gates. Same lesson as approval fatigue, at the CI layer.

**Define trace and span, and why a trace is a tree.**
A trace is one run; spans are nested timed units. Parent-child relationships mirror execution structure, so the tree *is* your architecture per run.

**What's the privacy constraint on tracing?**
Traces contain everything the model saw. Redact at the span boundary, not in the viewer — store document ids and citation spans, not full text.

**Recite the trace-reading protocol.**
Open the trace, don't re-run. Find the first wrong span by walking backward. Read its inputs and outputs. Classify: bad model decision, bad tool result, poisoned input, or orchestration error.

**Name four trace failure signatures.**
Wandering trajectory — long meandering tree. Loop — repeating span, a visual stutter. Poisoned cascade — one wrong span then everything downstream. Latency or cost culprit — one span dominating.

**Why p95 and p99 rather than the mean?**
Means hide tails, and the tail is what generates complaints. The mean describes a user who may not exist.

**Contrast offline and online evals.**
Offline is controlled and comparable but limited to what you thought to test. Online catches unknown unknowns and drift but has no ground truth.

**How do you score traffic with no ground truth?**
Reference-free judges, implicit signals, guardrail checks, and human review of a sample to calibrate the rest.

**Name the three types of drift.**
Model drift, data drift, concept drift.

**Explain the online → offline → CI flywheel.**
Production finds a failure class → it becomes golden cases → the offline suite catches it → CI gates it → it never regresses. Coverage grows toward reality.

**Why can't you A/B test prompt variants across applicants in lending?**
Systematically different treatment of otherwise-identical applicants is a fair-lending problem. Use shadow mode instead — run both, surface only one.

**Why does error analysis beat fixing failures one by one?**
Most failures cluster into a few root causes. Fix the dominant cluster and a large fraction vanishes at once.

**Why categorise by root cause rather than symptom?**
"Wrong answer" is a symptom shared by six different causes with six different fixes.

**Walk the five-step failure-to-golden loop.**
Failure found anywhere → becomes a golden case with expected behaviour and category → enters the versioned set → regression suite guards it → CI gates it.

**Snapshot versus ratchet — why is this the most important loop?**
Every other technique measures quality at a moment. This one makes quality monotonically improve, because a failure fixed is fixed forever.

**Why must failure capture be low-friction?**
A loop with high friction doesn't spin.

**Why deduplicate by root cause when adding cases?**
The loop should grow coverage, not redundancy.

**What does "the report certifies its own trustworthiness" mean?**
It carries the judge version, its calibration number, the prompt version, the golden-set version, the commit, and the exact command to reproduce.

**Why must the eval harness itself be tested?**
Buggy eval math produces confident lies, which makes the meta-tests the most important tests in the repo.

**Which eight fields make a reported number reproducible?**
Prompt version, retrieval config, model and snapshot, judge and snapshot, judge calibration, golden-set version, code commit, date.

---
