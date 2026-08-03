---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 1
title: "The thing you didn't say in the demo"
slug: "the-thing-you-didnt-say-in-the-demo"
sectionNumber: null
part: null
kind: "scene"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 174
status: "raw"
section: ""
summary: ""
enriched: false
---

## The thing you didn't say in the demo

Here is what happened in rehearsal, and it is the reason this document is the longest in the set.

File A-3902. The applicant stated $140,000. The tax transcript showed $88,000 — a 37% gap, the single most material fact in the file. Your system produced a clean, well-formatted, fully cited memo that said nothing about it.

Nothing was broken. The model performed perfectly. It read the five chunks it was given and summarised them faithfully. The chunk containing the tax transcript figure was never retrieved, so from the model's point of view the discrepancy did not exist.

**Grounded in garbage is still garbage.** And this failure has a property that should frighten you more than a crash: **the output looked identical to a correct one.** No error, no warning, no malformed field. A confident memo with real citations, missing the thing that mattered.

That is the shape of every serious RAG failure, and the rest of this document is the engineering that catches it.

---
