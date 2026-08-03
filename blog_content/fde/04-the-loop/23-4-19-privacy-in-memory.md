---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 23
title: "Privacy in memory"
slug: "4-19-privacy-in-memory"
sectionNumber: "4.19"
part: "PART III — MEMORY"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 590
status: "raw"
section: "§4.19"
summary: ""
enriched: false
---

## § 4.19 — Privacy in memory

Everything this part built is powerful, and power over people's data is responsibility.

**The never-remember categories.** Some things must be filtered *before* storage, not cleaned up after.

*Secrets and credentials* — never persist, a security absolute. *Sensitive personal data* — health, financial, legal, sexual, religious, political — special-category data under privacy law, requiring explicit consent and often best not stored at all. *Third-party data* — things about *other* people the subject mentioned; you didn't get their consent. *Ephemeral states misread as durable facts.*

**The extractor is the first line of defence.** A privacy filter in the extraction prompt stops sensitive data at the door, which is far safer than storing-then-scrubbing. **You can't un-leak what you stored.**

**The user's rights, as architecture requirements.** *Access* — the store must be inspectable, not opaque. *Rectification* — a correction path. *Erasure* — the right to be forgotten, and it must **actually work.**

Here the § 4.18 warning comes due. Once a memory is embedded in a vector store, summarised into other memories, and woven into derived artifacts, "delete this one fact" becomes genuinely hard — the fact's influence is smeared across everything derived from it.

**A memory system that can't cleanly honour "forget me" is a legal and ethical liability.** The only reliable fix is designing for deletion from the start: provenance tracking so deleting a source triggers re-deriving what it touched, avoiding irreversible entanglement of sensitive data, and treating erasure as a first-class operation, tested like any other.

**The engineering imperatives.** Extract with a privacy filter. Encrypt at rest. Scope access so no cross-subject leakage. Design for deletion. **Minimise by default** — every fact not stored is a fact that can't leak. And audit: log what's remembered and why.

**THE DEPLOYMENT LENS — and this one is genuinely severe, so give it full weight.**

At Meridian, memory touches consumer financial data. Three constraints follow, and none is optional.

**Applicant data does not enter long-term memory. At all.** The system's memory holds *procedural* knowledge — how Meridian's underwriters want work done — and *semantic* knowledge about policy. It does not hold facts about applicants. Applicant facts live in the loan file, governed by the bank's existing retention schedule, and they reach the system through retrieval at query time, not through a memory store the system accumulated on its own.

That single architectural line removes an entire category of exposure. There is no second copy of consumer data with its own retention rules, its own deletion problem, and its own place in a breach.

**Procedural memories must not smuggle applicant data.** *"Do not flag disputed tradelines that have a resolution letter"* is a rule. *"Applicant A-4417 disputed a tradeline"* is a fact about a person that has escaped into a store that was never designed to hold it. The extraction filter must catch this, and you must **test it with adversarial fixtures** — a correction phrased in a way that would carry an applicant's details into the rule.

**Deletion must be demonstrable, not asserted.** When a consumer exercises a deletion right, someone has to be able to show it worked. Provenance on every memory, an erasure operation that follows the chain, and a test that proves a deleted fact stops surfacing even through derived memories.

The last thing to say, and to mean: **the least-storage principle is a sibling of least-privilege and least-autonomy.** Three forms of one idea, and that idea is most of what makes an AI system deployable inside an institution that will be examined.

---
