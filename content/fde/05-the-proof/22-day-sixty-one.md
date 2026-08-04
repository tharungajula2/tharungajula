---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 22
title: "Day sixty-one"
slug: "day-sixty-one"
sectionNumber: null
part: "PART III — THE LIFECYCLE"
kind: "scene"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 451
status: "raw"
section: ""
summary: ""
enriched: false
---

## Day sixty-one

The pilot ran on 1,840 files.

The report you present is four pages and you do not present a single screenshot of the product.

Discrepancy catch rate held at 0.93 against a 0.90 floor, with one week at 0.87 that triggered an alert, was investigated within two days, traced to a branch's scanner change, and recovered after the ingestion pipeline was adjusted. **You present the dip, not around it.** Marcus's team already knew — they got the alert too.

Edit rate settled at 19%, inside the band. Tom edited 340 memos and rejected 22. Every rejection is now a golden case; the set is at 94 cases from 60. Citation integrity: 1.00, every day, no exceptions.

Underwriter time per file dropped from an average of 61 minutes to 24.

Marcus asks his last question, and it's the one that means you've won:

*"If we wanted to run this ourselves — your team gone — could we?"*

You say: the eval harness runs from one command, the thresholds live in a config file his team already approves changes to, the golden set is authored by Tom and versioned in their repo, the monitoring alerts route to their on-call, and every number in every report carries the eight fields needed to reproduce it.

Then you say the honest part: *"You could run it. You couldn't yet change it. The pipeline's still shaped by decisions I made and haven't fully written down, and if you needed to add a new document type in month four, you'd be reverse-engineering me. That's the next thing I want to fix, and it's not an eval problem."*

He writes that down too.

The pilot converts to a full deployment on the personal loan book, 40,000 files a month, targeted for the end of the quarter.

Which means the system now has to survive being *real*: authentication against their identity provider, deployment into their cloud, a queue that doesn't drop files at 3 a.m., secrets that aren't in your laptop, an on-call rotation, a rollback plan, and a database that four other teams also depend on.

You have been building a very good pilot. Now you have to build a system.

---

**Wikilinks:** [[why-evals-rule]] · [[build-golden-dataset]] · [[build-eval-judge]] · [[judge-bias-pinning]] · [[trajectory-evals]] · [[tool-use-metrics]] · [[eval-frameworks-hands-on]] · [[prompt-regression-tests]] · [[ci-gates-for-ai]] · [[build-experiment-tracker]] · [[data-versioning-reproducibility]] · [[model-serving-patterns]] · [[build-tracing-instrumentation]] · [[reading-traces]] · [[online-evals]] · [[ab-testing-prompts]] · [[cost-latency-dashboards]] · [[build-eval-harness]] · [[error-analysis-practice]] · [[failure-to-golden-loop]] · [[synthesis-evals]] · [[classical-ml-fundamentals]] · [[rag-evals-intro]] · [[agent-failure-modes]]

*Next — Document 06: THE HOSTILE WORLD. Injection at production scale, the lethal trifecta, least-privilege tools, PII, proxy discrimination, and the compliance architecture that decides whether any of this is allowed to touch a real applicant.*
