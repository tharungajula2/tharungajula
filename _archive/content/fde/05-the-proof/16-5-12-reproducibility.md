---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "05"
volumeSlug: "the-proof"
volumeTitle: "THE PROOF"
order: 16
title: "Reproducibility"
slug: "5-12-reproducibility"
sectionNumber: "5.12"
part: "PART III — THE LIFECYCLE"
kind: "narrative"
sourceFile: "FDE_05_THE_PROOF.md"
tags: []
hasSayThis: false
wordCount: 361
status: "raw"
section: "§5.12"
summary: ""
enriched: false
---

## § 5.12 — Reproducibility

A step sideways into the broader MLOps discipline, because "AI engineer" means knowing the lifecycle foundations, not just prompting.

**The problem experiment tracking solves.** Run with one configuration, get 0.85. Change three things, get 0.87. Change five more, get 0.83 — and now you cannot reconstruct which combination gave 0.87, or reproduce it.

The fix: every run logs its **parameters** (what you configured), **metrics** (what resulted), **artifacts** (outputs, plots), and **code version** — so every result is reproducible and comparable. It's version control for *experiments* rather than code.

**MLflow's four pillars.** *Tracking* — log params, metrics, artifacts per run. *Projects* — package code for reproducible runs. *Models* — a standard save/load format. *Registry* — a versioned store with lifecycle stages: staging, production, archived.

**Why this matters for LLM work.** Your **eval runs are experiments.** Log the prompt version, the golden-set version, the judge version, the retrieval config, and the resulting scores as a tracked run, and you get reproducible, comparable eval history for free.

And the registry concept maps directly onto prompt versioning with lifecycle stages.

**Data versioning.** The golden set is data. It changes. A score against v3 of the golden set is not comparable to a score against v7, and if you don't version the dataset you will eventually compare them and draw a wrong conclusion.

**THE DEPLOYMENT LENS.** This section is what turns your eval numbers into evidence rather than assertions.

Marcus's team may need to reproduce a result you reported. Not because they distrust you specifically — because independent reproducibility is what "independent validation" means.

**What must be pinned and logged with every reported number:** the prompt version, the retrieval config, the model and its snapshot, the judge and its snapshot, the judge's calibration, the golden-set version, the code commit, and the date.

That's eight fields. If they're all in the report, a validation analyst can re-run your number in six months and get the same answer, and the whole relationship changes.

*"Every number we give you carries the eight things needed to reproduce it. If you can't reproduce one, that's a bug in our tooling and I want to know."*

---
