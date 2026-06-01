# Field Notes Content Model

This document establishes the schema, taxonomies, and publishing rules for the static markdown files in the `content/field-notes/` directory.

---

## 1. Purpose of the Content Directory

The `content/field-notes/` folder houses the static-first public content foundation for Tharun Gajula's Field Notes digital garden page. These notes act as a living, public-facing record of learning, engineering research, and architecture decisions.

---

## 2. Controlled Vocabularies

To maintain indexing integrity across the application, all frontmatter tags and properties must strictly conform to these controlled lists.

### Note Types (`type`)
*   `concept`: Plain-language explanation of a single technical idea.
*   `build-log`: Dated record of changes, blockers, and choices in a real project.
*   `system-design`: Structural details, data flows, and trade-offs of an architecture.
*   `evals`: Custom evaluation workflows, metrics, and error analysis.
*   `rag`: Retrieval-augmented generation patterns, chunking, and search.
*   `agent-memory`: State management, tool usage loops, and agent architectures.
*   `ai-product`: Product judgment and trade-off decisions in probabilistic systems.
*   `code-pattern`: Reusable code snippets and implementation gotchas.
*   `prompt-workflow`: LLM prompting models and personal context strategies.
*   `resource`: Curation and personal takeaways on a specific reference or paper.
*   `mistake-log`: Documented technical errors, incorrect assumptions, and their fixes.
*   `glossary`: Short, single-paragraph core definitions.
*   `case-study`: Comprehensive project write-up detailing problems, trade-offs, and outcomes.

### Note Statuses (`status`)
*   `seed`: Initial stub or reminder-to-self containing minimal notes.
*   `draft`: Rough, unpolished draft in review.
*   `active`: Maintained, updated, and growing entry.
*   `published`: Finished, stable, and highly verified content.

### Confidence Levels (`confidenceLevel`)
*   `exploring`: Early-stage research with high variance and unverified assumptions.
*   `fairly-sure`: Supported by baseline research or simple functional code spikes.
*   `confident`: Supported by extensive testing, production implementation, or peer-reviewed literature.

### Controlled Tags (`tags`)
*   `ml-dl-core`
*   `transformers`
*   `rag`
*   `evals`
*   `agents`
*   `memory`
*   `ai-product`
*   `systems-design`
*   `portfolio`
*   `build-log`
*   `prompt-workflow`
*   `resources`
*   `glossary`

---

## 3. Frontmatter Schema (YAML)

Every markdown note must contain a YAML block matching these fields exactly:

```yaml
---
title: "Why I am studying AI systems from the foundations again"
slug: "why-foundations-again"
type: "concept"
status: "draft"
date: "2026-06-01"
updated: "2026-06-01"
tags: ["ml-dl-core", "ai-product"]
relatedTrack: "ml-dl-core"
relatedProject: "none"
visibility: "public"
summary: "Why returning to foundational ML mechanics matters more than collecting API wrapper demos."
sourceType: "original"
confidenceLevel: "fairly-sure"
---
```

---

## 4. Privacy & Security Safeguards

To prevent sensitive strategic or personal information from leaking onto public GitHub or production deployments, any file marked with `visibility: private` or located outside designated paths must remain untracked.

### Strict Privacy Boundaries
Do not write, draft, or stage the following details in any public or shared file in this repository:
1.  **Strategic Job Applications**: Target organizations, application timelines, recruitment processes, or mock interviews.
2.  **Financial Reality**: Financial runway, budget parameters, independent income, or rates.
3.  **Personal Family Context**: Names, personal health situations, family backgrounds, or private living situations.
4.  **Security Credentials**: Production API keys, databases credentials, environment configurations, or private URLs. (Use dummy keys and local-only config files).
5.  **Sensitive Intellectual Property**: Proprietary product specs or early-stage commercial architectures that have not been publicly announced.
