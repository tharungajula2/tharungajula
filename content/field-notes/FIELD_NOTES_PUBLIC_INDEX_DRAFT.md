# Field Notes Public Index Draft

This staging document maps out the visible contents, structure, and curation configurations for the future **Field Notes** digital garden view.

---

## 1. Current Active Focus
*   **Pushed Date**: `2026-06-01`
*   **Focus Tag**: `ML/DL Foundations & Evals`
*   **Status Readout**: *"I am building a neural network from scratch in Python, calculating backpropagation by hand, and writing basic tests to check if AI outputs are actually correct."*

---

## 2. Featured Notes (Recommended for Home Row)
These three notes showcase representative technical thinking and should be highlighted at the top of the feed:
1.  **Why I am studying AI systems from the foundations again** (`why-foundations-again.md`)
    *   *Type*: Concept | *Track*: ML/DL Core | *Status*: Draft | *Confidence*: Fairly-Sure
2.  **Why evals matter more than demos** (`why-evals-matter-more-than-demos.md`)
    *   *Type*: Evals | *Track*: Evals | *Status*: Draft | *Confidence*: Fairly-Sure
3.  **What I learned building JARVIZ Live** (`jarviz-live-build-log.md`)
    *   *Type*: Build Log | *Track*: Agents | *Status*: Active | *Confidence*: Confident

---

## 3. Active Learning Tracks & Filter Mappings
*   **ML/DL Core** (`ml-dl-core`):
    *   `why-foundations-again.md`
    *   `what-i-need-to-understand-about-transformers.md`
*   **RAG & Context Engineering** (`rag`):
    *   `what-rag-solves.md`
*   **Evals & Observability** (`evals`):
    *   `why-evals-matter-more-than-demos.md`
    *   `ai-pm-designing-for-uncertainty.md`
*   **Agents & Memory** (`agents`):
    *   `agents-memory-tool-calling.md`
    *   `jarviz-live-build-log.md`
*   **AI Product** (`ai-product`):
    *   `why-foundations-again.md`
    *   `prompt-engineering-vs-context-engineering.md`
    *   `parents-health-os-lessons.md`
    *   `quant-os-lessons.md`
    *   `daily-knowledge-commit-system.md`

---

## 4. Resource Index (Curated Inputs)
These high-signal papers and textbooks are cataloged under `/resources/` with personal reading statuses:
1.  **Neural Networks: Zero to Hero** (Karpathy) — *Status*: `reading`
2.  **Attention Is All You Need** (Vaswani et al.) — *Status*: `reading`
3.  **Creating Evals for Generative AI** (Hamel Husain) — *Status*: `reading`
4.  **Seven Failure Points in RAG Systems** (Barnett et al.) — *Status*: `reading`
5.  **Lost in the Middle** (Liu et al.) — *Status*: `reading`
6.  **Designing Machine Learning Systems** (Chip Huyen) — *Status*: `to-read`

---

## 5. Glossary Index (Drawer & Fast Reference)
Short, high-frequency definitions to act as search/context helpers:
1.  **Attention** (`attention.md`)
2.  **Embedding** (`embedding.md`)
3.  **Context Window** (`context-window.md`)
4.  **Retrieval-Augmented Generation (RAG)** (`rag.md`)
5.  **Evaluations (Evals)** (`evals.md`)
6.  **Agent Memory** (`agent-memory.md`)

---

## 6. Staging Visibility Policies
To maintain high credibility and absolute data privacy:
*   **V1 Public Visible Feed**: Focus heavily on *Draft*, *Active*, and *Published* nodes that directly document code calculations, real learning benchmarks, or live portfolio breakdowns.
*   **Under Review / Hidden Until Expanded**:
    *   `parents-health-os-lessons.md` (Keep hidden or as seed stub until personal family elements are audited and medical disclaimers are attached).
    *   `quant-os-lessons.md` (Keep hidden or as seed stub until quantitative equations are formatted and financial disclaimers are attached).
    *   *Chip Huyen's ML Systems* (Keep marked as `to-read` until the textbook notes are actively started).
