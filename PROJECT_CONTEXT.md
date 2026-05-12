# THARUN GAJULA — PROJECT_CONTEXT.md
**Version: 27.0 — ETHOS LIFE PIVOT & ARCHITECTURAL SIMPLIFICATION**
**Last Verified: May 12, 2026**
**Status: ACTIVE BUILD (Stable)**

> AGENT DIRECTIVE: This file is the single source of truth. It is rebuilt from full codebase scan, not from memory or assumption. Every detail here is verified against actual source files.

---

## 1. IDENTITY & MISSION
- **Owner**: Tharun Gajula
- **Archetype**: AI Product Manager & 0-1 Systems Architect.
- **Mission**: Building **ETHOS LIFE**, a personal health OS designed for high-agency daily action.
- **Core Value**: Transforming complex, high-friction data (Medical, Credit, Analytics) into production-grade, intuitive interfaces.
- **Active Engine**: Offline CRM Tracking (The frontend CHIRON Dashboard has been entirely removed).

---

## 2. EXACT TECH STACK & ENVIRONMENT (VERIFIED)
- **Framework**: Next.js App Router
- **Runtime**: Edge Runtime (for `/api/chat` to prevent Vercel timeouts).
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **3D/Interactive**: 
  - Spline (`SplineAvatar`)
  - `react-force-graph-2d` (`NeuralGraph`)
- **Data Layer**: Static TypeScript data files (`data/neuralData.ts`, `data/systems.ts`) replacing server-side Markdown parsing for the UI.
- **AI Integration**: Gemini 2.5 Flash-Lite via direct REST API with SSE streaming.
- **Environment Variables**: Requires `GEMINI_API_KEY` for the AI chat panel to function.

---

## 3. FOLDER ARCHITECTURE (VERIFIED)
/app
  /layout.tsx — Global ambient effects (cyan orbs, grid patterns), custom fonts.
  /page.tsx — Main OS single-page shell controller with tab state.
  /api/chat/route.ts — Gemini streaming endpoint.
/brain (GIT_IGNORED — Local Knowledge Base)
  /raw/strategy — Active offline CRM files (`founder-target-list.md`, `outreach-notes.md`).
/components
  /ui/AIChatPanel.tsx — Slide-up AI conversational interface.
  NeuralGraph.tsx — 2D force-directed project network.
  EvolutionTimeline.tsx — Clinical HUD career timeline.
  SplineAvatar.tsx — 3D Robot Avatar with Chest HUD.
  ConnectPage.tsx — Unified contact/links interface.
  WorkOverview.tsx — Pillar-based capability map.
/lib
  ai-context.ts — Master AI knowledge base (`THARUN_CONTEXT`).
/data
  neuralData.ts — Graph node definitions for NeuralGraph.
  systems.ts — Static data for systems/projects archive.

---

## 4. UI ARCHITECTURE & ROUTING (VERIFIED)
- **Public OS**: Single-page application (`app/page.tsx`) using state (`activeTab`) instead of Next.js routing.
- **Views**:
  - `thesis`: 3D Spline avatar with floating pill logo and AI "Talk to Me" trigger.
  - `neural`: Split view controlled by `workView` state (`overview` = WorkOverview, `graph` = NeuralGraph).
  - `evolution`: Career timeline.
  - `connect`: Unified socials.
- **Global Effects**: 
  - Scanline Overlay: CSS linear gradient scanlines (`opacity-20`).
  - Grid Overlay: 64px fixed-pattern background defined in `layout.tsx`.
  - Ambient Orbs: Cyan-600 glows (`blur-[120px]`).
- **Glassmorphism**: Standardized `bg-black/50`, `bg-black/40` or `bg-black/60` + `backdrop-blur-2xl` + `border-white/10`.

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
- **WORK (GRAPH/OVERVIEW)**: WORKING (Dual-view: 2D Architectural graph or Pillar Overview).
- **STORY (EVOLUTION)**: WORKING (Evolution Timeline).
- **CONNECT**: WORKING (Unified socials + CTA).
- **CHIRON TRACKER / VAULT**: REMOVED (Frontend UI and vault authentication have been purged).

---

## 7. WHAT WORKS PERFECTLY RIGHT NOW
- **Identity Consistency**: The entire site matches the "Ethos Life" pivot.
- **3D Infrastructure**: Spline avatar serves as the main thesis visual.
- **AI Chat Integration**: `AIChatPanel` streams responses correctly using Edge runtime and `THARUN_CONTEXT`.

---

## 8. NEXT LOGICAL BUILD PRIORITIES
1. **Ethos Life Alpha**: Build the first interactive data module for the Health OS.
2. **Wiki Expansion**: Map the "90-Day Product Lab" prototypes deeper into the knowledge graph.
3. **Mobile Polish**: Final pass on typography and glassmorphism panels for small screens.

---
*End of Master Context.*
