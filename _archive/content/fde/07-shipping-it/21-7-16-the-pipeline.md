---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 21
title: "The pipeline"
slug: "7-16-the-pipeline"
sectionNumber: "7.16"
part: "PART IV — KEEPING IT ALIVE"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 378
status: "raw"
section: "§7.16"
summary: ""
enriched: false
---

## § 7.16 — The pipeline

**Continuous integration** runs checks on every proposed change. **Continuous deployment** ships what passes.

```yaml
on: [pull_request]
jobs:
  verify:
    steps:
      - lint + typecheck                        #  12s
      - unit tests                              #  31s
      - eval:structural (60 golden, no judge)   #  38s   hard gate
      - injection suite (60 attacks)            #  52s   hard gate, zero-exfil
      - container build + CVE scan              #  90s   hard gate
      - eval:regression (judged)                # 6m12s  hard gate on critical
      - load smoke (demo mode, 50 users)        #  60s   soft gate
```

**MENTAL TRACE.** Seven stages, ordered cheapest-first so a syntax error fails in twelve seconds rather than after eight minutes of eval.

The injection suite from § 6.14 is a **hard gate with a zero-exfil assertion**. Any change that opens a network path fails the build — which is how § 6.6's architectural guarantee stays true after you leave.

The container CVE scan gates on *their* severity threshold, discovered in § 7.4, which means dependency problems surface on the pull request rather than at deployment review.

**Everything security and quality-related that you agreed to in Documents 05 and 06 is now a build step.** That's the point: agreements that live in documents decay, and agreements that live in a pipeline don't.

**THE DEPLOYMENT LENS.** Continuous deployment to production is often **not permitted**, and you should assume it isn't until told otherwise.

Meridian has change management. Production deploys need a change record, an approver, a scheduled window, a documented rollback plan, and sometimes a CAB meeting on Tuesdays.

**Don't fight this.** Design for it:

**Continuous deployment to staging, gated deployment to production.** Everything automated up to the boundary; a human triggers the last step.

**Make the change record mostly automatic** — generate it from the commit range, the eval report from § 5.17, and the rollback command. A change record that assembles itself is the difference between deploying weekly and deploying monthly.

**Batch small changes rather than shipping them individually**, because each deploy carries fixed process cost.

**And build feature flags**, so behaviour can change without a deploy. A flag flip is usually a different, lighter change class than a code release — which means the thing you need to adjust urgently at 4 p.m. on a Thursday can actually be adjusted.

---
