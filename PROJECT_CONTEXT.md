# THARUN GAJULA — PROJECT_CONTEXT.md
**Version: 22.0 — Post-Cohesion Audit**
**Last Verified: April 30, 2026**
**Status: DEPLOYED (Stable)**

> AGENT DIRECTIVE: This file is the single source of truth. It is rebuilt from full codebase scan, not from memory or assumption. Every detail here is verified against actual source files.

---

## 1. IDENTITY & MISSION
- **Owner**: Tharun Gajula
- **Archetype**: 0-1 Systems Architect & Quantitative Modeler.
- **Narrative**: A transition from institutional credit-risk analytics (Jana Small Finance Bank, Lentra AI) to full-stack, AI-native product building.
- **Core Value**: Turning high-friction, dense technical problems into usable, premium digital prototypes.
- **Aesthetic**: Minimalist HUD, Interactive 2D/3D, and Tactile Glassmorphism.

---

## 2. EXACT TECH STACK (VERIFIED)
- next: 16.1.6
- react: 19.2.3
- react-dom: 19.2.3
- typescript: ^5
- tailwindcss: ^4
- framer-motion: 12.34.0
- @splinetool/react-spline: 4.1.0
- @splinetool/runtime: 1.12.90
- react-force-graph-2d: ^1.25.10 [PIVOT]
- three: 0.165.0
- lucide-react: 0.563.0
- clsx: 2.1.1
- tailwind-merge: 3.4.0
- gray-matter: 4.0.3
- react-markdown: 10.1.0
- remark-gfm: 4.0.1
- @react-three/fiber: 9.5.0
- @react-three/drei: 10.7.7

---

## 3. FOLDER ARCHITECTURE (VERIFIED)
/app
  /layout.tsx — Root layout managing fonts, ambient background effects, and grid patterns.
  /page.tsx — Main OS controller managing `activeTab` state and rendering the shell + tab views.
  /globals.css — CSS variables and utility overrides (scrollbars, glass-card).
/brain [NEW] — Centralized Intelligence Layer.
  /raw — Messy original source files (Resume, LinkedIn, Specs).
  /wiki — Compiled structured markdown pages.
  /site-data — Compiled JSON files powering the UI.
  SCHEMA.md — Protocols for data synthesis.
/components
  SplineAvatar.tsx — 3D Hero Avatar (Client, Dynamic SSR:false).
  NeuralGraph.tsx — 2D Force Graph for project visualization [ARCHITECTURAL PIVOT].
  EvolutionTimeline.tsx — Scroll-triggered career timeline (Clinical HUD style).
  ProjectArc.tsx — "Arc Reactor" mission control dashboard (Glassmorphic Terminal).
  /layout/ — [LEGACY] Unused.
  /outreach/ — [LEGACY] Unused.
  /ui/ — [LEGACY] Unused.
/data
  neuralData.ts — Core database for projects, nodes, and graph connections.
  systems.ts — [LEGACY] Unused.
/lib
  utils.ts — standard `cn` helper.
/types
  outreach.ts — [LEGACY] Unused.

---

## 4. UI ARCHITECTURE (VERIFIED)
- **Model**: Single-page OS shell (`h-[100svh]`, `overflow-hidden`).
- **State Controller**: `activeTab` variable in `app/page.tsx`.
- **Reset Logic**: "THARUN GAJULA" logo triggers full state reset to 'thesis'.
- **Bottom Navigation**: Glassmorphic floating dock (`z-70`).
- **Header**: Persistent sticky header (`h-16`, `backdrop-blur-2xl`).
- **Global Effects**: 
  - Scanline Overlay: `fixed inset-0` div (`z-10`).
  - Spline Mask: Floating pill at `bottom-5 right-5` on Desktop to hide watermark.
  - Scroll Lock: `touch-none` applied to Spline container when active.
- **Glassmorphism Engine**: Unified `bg-black/50` (or 60/80) + `backdrop-blur-2xl` + `border-white/10`.

---

## 5. BRANDING & DESIGN TOKENS (VERIFIED)
- **Primary Accent**: Bio-Scan Cyan (`#06b6d4` / `cyan-400`).
- **Secondary**: Pure White (#FFFFFF) and Deep Teal (#0F766E).
- **Background**: Deep Void (`#09090b`) / Slate 950 (`#020617`).
- **Fonts**: 
  - Heading: Outfit (`var(--font-outfit)`)
  - Body: Inter (`var(--font-inter)`)
  - Mono: JetBrains Mono (`var(--font-mono)`) [CLINICAL STANDARD]
- **Clinical Standard**: Use `text-white/70` for body text; `font-mono` for all metadata and tags.

---

## 6. EACH MODULE — DETAILED STATUS

### MODULE: THESIS (Tab value: "thesis")
- Status: WORKING.
- Scroll-Lock: ACTIVE (Fixed/touch-none).
- Masking: ACTIVE (Desktop bottom-right pill).

### MODULE: NEURAL_MAP (Tab value: "neural")
- Status: WORKING [2D PIVOT].
- Library: `react-force-graph-2d`.
- Aesthetic: Blueprint/Architectural. Directional cyan particles.
- Palette: White (Core), Cyan (Product/Analytics), Teal (Foundation).

### MODULE: EVOLUTION (Tab value: "evolution")
- Status: WORKING.
- Aesthetic: Clinical HUD.
- Features: Ambient cyan/purple glow background (`blur-[120px]`).

### MODULE: ARC (Tab value: "arc")
- Status: WORKING.
- Aesthetic: Glassmorphic macOS Terminal.
- Layout: 5:7 Grid with increased padding (`p-10`) and gap (`gap-20`).

---

## 7. PROJECT DATA REGISTRY (VERIFIED)
*See neuralData.ts for authoritative node/link definitions.*

---

## 8. ENVIRONMENT VARIABLES REQUIRED
- None.

---

## 9. KNOWN BROKEN OR INCOMPLETE ITEMS
- **Legacy Bloat**: Unused `/components/outreach`, etc.
- **Static Dashboard**: `ProjectArc.tsx` remains hardcoded.
- **TODO**: None in core logic.

---

## 10. WHAT WORKS PERFECTLY RIGHT NOW
- **Universal Glassmorphism**: All cards and HUDs use the unified filter strategy.
- **Clinical Typography**: Strict adherence to `font-mono` and `text-white/70`.
- **2D Neural Map**: High-performance architectural project visualization.
- **Watermark Masking**: Spline logo successfully eclipsed on Desktop.

---

## 11. NEXT LOGICAL BUILD PRIORITIES
1. **Surgical Purge**: Remove all [LEGACY] folders and files.
2. **Arc Data Integration**: Move Terminal/Roadmap data to `data/arcData.ts`.
3. **Responsive Dock**: Optimize navigation labels for iPhone SE.
4. **Case Study Modals**: Expand HUD popup into full "System Deep Dive" modals.

---

## 12. REPLICATION GUIDE (FOR NEW SESSION RECOVERY)
1. **SSR:false Mandate**: Always use `ssr: false` for Spline and ForceGraph.
2. **Pill Style**: Corner masks must match nav bar aesthetic (rounded-full, floating).
3. **Clinical Body**: Never use pure white for large paragraph text; use `text-white/70`.
4. **Logo Reset**: Ensure the header logo is an active reset trigger.
5. **2D Canvas**: Use `nodeCanvasObject` for high-performance sharp circles in Neural Map.

---
*End of Master Context.*
