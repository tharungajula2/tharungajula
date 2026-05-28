# THARUN GAJULA — PROJECT_CONTEXT.md
**Version: 33.0 — DEFAULT TO PRODUCT LAB AI SYSTEMS**
**Last Verified: May 26, 2026**
**Status: ACTIVE RELEASE (Stable & Optimized)**

> AGENT DIRECTIVE: This file is the single source of truth. It is rebuilt from full codebase scan, not from memory or assumption. Every detail here is verified against actual source files.

---

## 1. IDENTITY & MISSION
- **Owner**: Tharun Gajula
- **Archetype**: Agentic AI Product Manager & Systems Architect.
- **Focus**: Practical **Agentic AI Engineering** and cognitive architecture design balanced through a high-ownership Product Manager lens (avoiding purely academic framing).
- **Core Value**: Transforming complex, high-friction domains (Clinical, Quantitative, Institutional Finance) into highly aesthetic, logical, and production-grade product architectures.
- **Target Role Intent**: Seeking high-ownership Product Management (PM), AI PM, 0-to-1 PM, or Founder's Office roles at early-stage startups in Bengaluru.

---

## 2. EXACT TECH STACK & ENVIRONMENT (VERIFIED)
- **Framework**: Next.js App Router (Next.js 16)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **3D Interactive**: Spline (`SplineAvatar`)
- **Grid Layout**: Responsive CSS Grid (2 columns on desktop, 1 on mobile) with custom screenshots.
- **AI Integration**: Gemini 2.5 Flash-Lite via direct REST API with SSE streaming.
- **Environment Variables**: Requires `GEMINI_API_KEY` for the AI chat panel to function.
- **Removed (Purged Technical Debt)**:
  - Completely unmounted and permanently deleted `NeuralGraph.tsx` and `data/neuralData.ts`.
  - Removed `react-force-graph-2d` and all D3-physics overhead to ensure instant LCP speeds.

---

## 3. FOLDER ARCHITECTURE (VERIFIED)
```
/app
  /layout.tsx — Global ambient effects (cyan/purple orbs, grid patterns), custom fonts.
  /page.tsx — Main OS single-page shell controller; handles 3-tab sub-view state.
  /sitemap.ts — XML sitemap generator.
  /api/chat/route.ts — Gemini streaming endpoint.
/brain (LOCAL KNOWLEDGE BASE — Master Source of Truth Only)
  /Master_Source_of_Truth_Tharun_Gajula_V6.md — Single master profile file.
/shelf (GIT_IGNORED ARCHIVE)
  /strategy — Active offline CRM files (founder-target-list, outreach-notes).
  /brain_architecture_legacy.md — Legacy knowledge blueprints.
/components
  /ui
    AIChatPanel.tsx — Slide-up AI conversational interface.
  ConnectPage.tsx — Minimalist, high-impact CTA contact layout.
  EvolutionTimeline.tsx — Clinical HUD career timeline.
  SplineAvatar.tsx — 3D Robot Avatar with Chest HUD.
  WorkOverview.tsx — Capability pillar-based map.
  WorkGallery.tsx — Sleek responsive CSS grid rendering Product Lab and Analytics projects with screenshot card previews.
/lib
  ai-context.ts — Master AI knowledge base (`THARUN_CONTEXT` matching V6 positioning).
/data
  systems.ts — Static data for functional prototypes and analytics projects.
  /outreach
    homepage.ts — Structured marketing copywriting for outreach targets.
```

---

## 4. UI ARCHITECTURE & ROUTING (VERIFIED)
- **Public OS**: Single-page application (`app/page.tsx`) using state (`activeTab`) instead of Next.js routing.
- **Views**:
  - `thesis`: 3D Spline avatar with floating pill logo and AI "Talk to Me" trigger.
  - `neural`: Split view featuring the premium glassmorphic 3-Tab selector layout (**defaults to Tab 2 "Product Lab (AI Systems)" on toggle/click**):
    - **Tab 1: "Overview"**: Renders `WorkOverview.tsx` capability pillars and a sleek expandable Notion-style **"View Production Stack"** container.
    - **Tab 2: "Product Lab (AI Systems)"**: Renders `WorkGallery.tsx` with high-aesthetic screenshots of functional prototypes.
    - **Tab 3: "Analytics & Quant"**: Renders `WorkGallery.tsx` with clean description summaries of quantitative codebases.
  - `evolution`: Renders `EvolutionTimeline.tsx` chronicling the professional journey.
  - `connect`: Renders `ConnectPage.tsx` focusing purely on high-impact CTAs.
- **Branding & Scanlines**:
  - Scanline Overlay: CSS linear gradient scanlines (`opacity-20`).
  - Grid Overlay: 64px fixed-pattern background defined in `layout.tsx`.
  - Ambient Orbs: Cyan-600 & Purple-600 glows (`blur-[120px]`).
  - Glassmorphism: Standardized `bg-black/50` + `backdrop-blur-2xl` + `border border-white/10`.

---

## 5. BRANDING & DESIGN TOKENS (VERIFIED)
- **Primary Accent**: Bio-Scan Cyan (`#06b6d4` / `cyan-400`).
- **Typography**: 
  - Monospace: JetBrains Mono (`--font-mono` - Clinical/Technical/UI labels).
  - Headings: Outfit (`--font-outfit` - Premium/Modern).
  - Body: Inter (`--font-inter` - Clean/Readable).

---

## 6. MODULE STATUS
- **THESIS (HOME)**: WORKING (3D Spline + "Talk to Me" AI CTA).
- **WORK (TABS SYSTEM)**: WORKING (Perfect transition between Overview, Product Lab, and Analytics & Quant grids).
- **STORY (EVOLUTION)**: WORKING (Evolution Timeline with clean, non-retrospective milestone wording).
- **CONNECT**: WORKING (Minimalist CTA layout linking exclusively to `tharun.gajula.2@gmail.com`, LinkedIn, and GitHub — all legacy changelogs and build logs have been purged).
- **CHIRON TRACKER / VAULT**: REMOVED (Frontend UI and vault authentication have been purged).

---

## 7. WHAT WORKS PERFECTLY RIGHT NOW
- **Identity Consistency**: Every pixel and copy block aligns with the "Agentic AI PM & Systems Architect" archetype.
- **3D Infrastructure**: Spline avatar serves as the main thesis visual.
- **AI Chat Integration**: `AIChatPanel` streams responses correctly using Edge runtime and `THARUN_CONTEXT`.
- **Zero Retrospective 0-1 References**: Past history is strictly referred to as enterprise/institutional Product Ownership, Systems Architecture, and Quantitative Engineering. 0-to-1 is reserved only as an outbound career target.

---
*End of Master Context.*

---

## 8. PONDER AGENTIC RAG SHOWCASE (VERIFIED)
- **Status**: LIVE & INTEGRATED FLAGSHIP SYSTEM (DEMO READY).
- **Scope**: Dedicated `/ponder` console showcasing high-observability cognitive workflows.
- **Routing**: Homepage Spline robot CTA `talk to me` now routes directly to `/ponder` (promoting immersive RAG instead of standard drawer chatbot). Old `AIChatPanel.tsx` remains completely preserved but safely bypassed on homepage click.
- **Tech Pipeline**: 
  - **Phase A (Ingest)**: Client-side doc drag-drop & paste manager (.txt/.md formats up to 5 documents, 50,000 char cap per document).
  - **Phase B (Chunking)**: Local chunking using 4-sentence sliding window with 1-sentence overlaps.
  - **Phase C (Embed)**: Server embeddings using `gemini-embedding-2` generating 3072-dimensional vector math.
  - **Phase D (Memory)**: in-memory session-isolated vector namespace (`vectorStore.ts`). 
  - **Phase E (Agent Loop)**: Multi-step agent loop running on `gemini-2.0-flash` with dynamic tools (`searchDocuments`, `analyzeChunks`, `evaluateAnswer`).
  - **Observability UI**: Trace timeline logs, model-generated faithfulness/relevance/completeness self-evaluation scores, direct citation badges, cited source highlights, and similarity matching cockpit.
- **Privacy Assurance**: Active delete actions purge session vectors; refreshing resets the client session state (vectors are temporary and naturally reset on server cold starts or redeploys).
- **Limitations**: In-memory storage, no permanent database persistence, plain-text/markdown files, and subject to Gemini free-tier rate caps (handled gracefully via countdown alert widgets).
