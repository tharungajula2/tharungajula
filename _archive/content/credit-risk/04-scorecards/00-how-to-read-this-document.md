---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 0
title: "HOW TO READ THIS DOCUMENT"
slug: "how-to-read-this-document"
sectionNumber: null
part: null
kind: "front"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: true
wordCount: 777
status: "raw"
section: ""
summary: ""
enriched: false
---

*The application scorecard, end to end. Target definition, WoE and information value, binning, logistic regression, scaling, reject inference, discrimination and calibration — and the cut-off decision the whole apparatus exists to serve.*

**As-at date: 29 July 2026.** Tags per Document 00.

---

## HOW TO READ THIS DOCUMENT

Document 03 gave you the instruments for measuring a portfolio. This document builds the first **model** — and it is the one that most job descriptions in this field are actually about.

Read it in two passes. The first pass for the *sequence*: there are eleven steps from a raw table to a live cut-off, they happen in a fixed order, and most of the errors people make are order errors — doing step seven before step four. The second pass for the *arithmetic*: WoE, IV, the scaling formula, the discrimination measures. Those you should be able to reproduce on paper, because you will be asked to.

There is no code here. Document 07 handles implementation.

> **The one sentence that organises this document**
>
> A scorecard does not decide anything. It **ranks**. The cut-off decides — and the cut-off is a statement of business appetite, not a modelling output. Every confusion in this subject comes from forgetting which half of that sentence you are in.

---

## WHAT CHANGED SINCE DOCUMENT 03 — MODEL GOVERNANCE

One development, five days old at this document's as-at date, and it changes the frame for everything below.

`[DRAFT]` On **24 June 2026** the RBI released draft **Guidance on Regulatory Principles for Model Risk Management, 2026** (Press Release 2026-2027/528), open for public comment until **24 July 2026**. Comments have now closed; **finalisation is pending and unconfirmed** `[VERIFY]`.

Its lineage: the RBI's August 2024 draft on model risks *in credit* specifically, and the **August 2025 report of the Committee on Framework for Responsible and Ethical Enablement of Artificial Intelligence (FREE-AI)**. Once final it will supersede the model-risk portion of the RBI's 2002 Guidance Note on Credit Risk Management.

What the draft proposes, as reported:

- **Scope widened from credit models to all models** used by regulated entities — internally built, bought from third parties, or jointly developed. The definition of "model" is drawn broadly enough to include scoring algorithms, rule engines, AI and ML systems, and material spreadsheets that influence business decisions.
- **Applicability across eleven categories of regulated entity** — commercial, small finance, payments, regional rural and co-operative banks, NBFCs across all layers, AIFIs, ARCs and credit information companies.
- **A board-approved Model Risk Management Framework**, a complete model inventory, and **risk-based tiering** of models by business importance, customer impact, complexity, explainability and regulatory significance — with high-risk models requiring rigorous validation and approval by the board's risk management committee.
- **Three lines of defence**, with independent validation and internal audit as the third line.
- **Explainability thresholds with compensating controls** — where a model cannot explain itself, the entity must compensate with enhanced validation, output verification, more frequent monitoring and usage restrictions.
- **Explicit bias and fairness testing**, with an obligation to identify risks of discriminatory outputs in credit decisions and recalibrate or redesign where found.
- **Accountability for third-party models stays with the regulated entity.**
- Human oversight requirements and intervention mechanisms for AI systems.

🔴 **Why this belongs at the front of a scorecards document rather than in a governance appendix.** For twenty years the honest answer to "why does Indian retail still build logistic-regression scorecards when gradient boosting scores better?" was *inertia and explainability*. This draft turns the second half of that answer into a written regulatory principle: **an unexplainable model is permitted, but it costs you — enhanced validation, output verification, frequent monitoring and usage restrictions.**

That reframes the whole build. You are not choosing between accuracy and interpretability as a matter of taste. You are choosing between accuracy and a **compliance burden that has been made explicit**, and you should be able to say which side of that trade you would take and why.

**► SAY THIS**
> "The frame I'd use is that interpretability in Indian credit modelling stopped being a preference in June 2026. The RBI's draft model risk management guidance widens scope from credit models to all models including AI and ML, requires a board-approved framework with risk-based tiering and a full inventory, and — the part that matters for scorecard design — says that where a model can't explain itself you compensate with enhanced validation, output verification, more frequent monitoring and usage restrictions. It's still draft, comments closed on 24 July, so I'd check whether it's been finalised. But it's the reason logistic regression on weight-of-evidence isn't just legacy practice here."

---
