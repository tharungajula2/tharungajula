---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 7
title: "Scoring the path"
slug: "5-5-scoring-the-path"
sectionNumber: "5.5"
part: "PART I — MEASURING"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 438
status: "raw"
section: "§5.5"
summary: ""
enriched: false
---

## § 5.5 — Scoring the path

So far you've scored *answers*. But a system that loops takes a **path** — and two runs can reach the same answer, one by a clean three-step route and one by a chaotic twelve-step flail. Answer-only scoring calls them equal.

**What answer-only scoring misses.**

**Efficiency.** Same answer, wildly different bill.

**Reliability.** A run that got the right answer *by luck* — a wrong tool that happened to work — will fail next time. **The process predicts future behaviour; the answer doesn't.**

**The right-answer-wrong-reason trap.** Correct output from flawed reasoning passes your answer eval and explodes in production on a case where the flawed reasoning matters.

**Partial credit.** A run that investigated excellently and botched the final synthesis scores zero on answer-eval — but knowing its trajectory was mostly right tells you exactly what to fix.

**The trajectory is where true quality lives. The answer is just its last token.**

### The dimensions

*Path efficiency* — steps, tool calls, tokens versus optimal. *Tool-use correctness* — § 5.6. *Reasoning quality* — were the intermediate thoughts sound or did it get lucky? *Goal adherence* — did it drift? *Recovery* — when a step failed, did it adapt or spiral? *Error patterns* — any specimen from § 4.10's zoo?

Some are programmatic — step counts, tool sequences, redundant-call detection. Some need the judge, pointed at the *path* rather than the answer.

**Trajectory evals depend on tracing.** You need the full record of every step. That's why this document pairs them, and it's why § 5.9 exists.

**The subtlety: paths are more variable than answers.** Many good paths reach one answer, and non-determinism compounds over steps. So trajectory scoring **tolerates path diversity while catching path pathology** — you're not demanding the one true path, you're catching flails, loops, and wrong-reasons.

**THE DEPLOYMENT LENS.** Meridian's discrepancy investigation is a two-hop loop, and there is one trajectory failure that matters more than all the others.

**Did hop two actually run?**

If hop one finds a stated income and the loop terminates without seeking third-party evidence, the system produces a memo that says nothing about a discrepancy — and it looks *exactly* like a memo for a file that genuinely has no discrepancy.

**The answer eval cannot distinguish those two cases.** Only the trajectory can.

So there's a reference trajectory for every discrepancy case: *must call `search_file` with `is_third_party=true` before terminating.* That assertion is programmatic, free, and it catches the single most expensive silent failure in the system.

**Find the one step whose absence is invisible in the output. Assert it in the trajectory.** Most deployments have one.

---
