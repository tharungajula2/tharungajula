# THARUN GAJULA // MASTER PROJECT CONTEXT
**Version: 17.0 — The Life Lab Transition [STABLE] (2026-04-09)**

> [!IMPORTANT]
> **AI AGENT DIRECTIVE:** This is the absolute latest, 100% verified source of truth for the Tharun Gajula repository. This document is a "Master Blueprint" designed to allow any AI or human builder to replicate the entire project architecture, identity, and systems from scratch. 
> **MANDATORY:** If building a new feature or migrating to a new session, READ THIS ENTIRE DOCUMENT FIRST.

---

## 1. THE IDENTITY & MISSION

| Field | Value |
|---|---|
| **Identity** | Tharun Gajula |
| **Archetype** | Learning Systems Builder / Visionary Infrastructure Designer |
| **Mission** | I architect "Operating Systems" for human thought—platforms that bridge the gap between high-level conceptual knowledge and operational human potential. |
| **Core Philosophy** | **Symmetry in Thought. Coherence in Execution.** Every digital environment must look, feel, and function with clinical precision and premium resonance. |
| **Hero Tagline** | `Building Better Ways to Learn, Think, and Build.` |

---

## 2. REPOSITORY ARCHITECTURE (BIPARTITE MODEL)

The repository is divided into two distinct operating environments, optimized for professional outreach and private knowledge management.

### 2A. The Public Professional Index (`/#work`)
The Systems Index is integrated into the homepage as a high-signal professional showcase.
- **Quant OS**: Quantitative research & investment environments.
- **Yukti OS**: Cognitive infrastructure and Indian systems learning.
- **Life Lab**: First-principles investigation and active learning labs.
- **Analytics Portfolio**: Data-driven professional showcase.

### 2B. The Private Life Lab Engine (`/life-lab`)
A high-signal, clinical "Operating System" for personal health, cognition, and systems thinking. 
- **Canonical Model**: 5 Universes.
- **Structure**: Filesystem-based Markdown entries (Universes & Modules).
- **Access**: Unlinked from public navigation; strictly direct-access for private stability.

---

## 3. THE HUD 2.0 DESIGN SYSTEM (TOKENS)

### 3A. Aesthetic Baseline
- **Background**: `slate-950` (#020617) with an animated `64px` grid overlay (`white/3%`).
- **Refractive Environment**: Two persistent ambient orbs (`bg-cyan-600/20`, blur-3xl) create a consistent depth effect across the App Router layout.
- **Typography**: 
  - **Headings**: `font-heading` + High-contrast white/cyan gradients.
  - **Mono/Labels**: `font-mono tracking-[0.2em]` for HUD-style tactical clarity.
  - **Body**: `font-body` (Inter/Slate-300) for premium editorial readability.

### 3B. Surface Tokens
- **Glass Card**: `bg-slate-900/40 backdrop-blur-3xl border border-white/5`
- **HUD Status Rail**: Fixed top header with glassmorphism and cyan hover states.
- **Portal Gateways**: Large, uppercase typography with heavy tracking for "gateway" entrances.

### 3C. Design Guidelines
- **Editorial Tone**: All UI labels must remain "Calm and Clinical." Avoid technical underscores in navigation (e.g., use "Home" not "RETURN_TO_HOME").
- **Minimalist Aesthetic**: Prioritize high-performance, clear-typography surfaces.
- **The "Shelf"**: The `/shelf` directory is the permanent home for all legacy modules. It is added to `.gitignore` and must never be "un-shelved" unless explicitly requested.

---

## 4. SYSTEM MODULES & DATA REGISTRY

### 4A. Life Lab: Canonical 5-Universe Model
All Life Lab tracks are physically consolidated into namespaced directories.

| Universe | Canonical ID | Role | Physical Path | Status |
|---|---|---|---|---|
| **U1: Wellness** | `wellness` | Longitudinal health, preventive thinking, clinical interpretation. | `modules/wellness` | Live |
| **U2: Cognition** | `cognition` | Learning Science, Decision Quality, Reasoning Backbone. | `modules/cognition` | Live |
| **U3: Reasoning** | `reasoning` | Active structural practice for pattern recognition via drills. | `modules/reasoning` | Live |
| **U4: Ecosystem** | `human-ecosystem` | Systems of modern life (Institutions, Coordination, Incentives). | `modules/human-ecosystem`| Live |
| **U5: Sandbox** | `sandbox` | Rapid prototyping and exploratory territory (Mystery Box). | `modules/sandbox` | Live |

**Technical Strategy: Canonical Normalization**
- **Zero-Lock Compliant**: Mass moves are verified via the AI Auditor protocol.
- **Physical Unified**: Each universe resolves directly to `/content/life-lab/universes` and `/content/life-lab/modules`.
- **Logic Alignment**: `lib/life-lab/content.ts` and `lib/life-lab/data.ts` are synchronized with this physical structure.
- **Metadata Synchronization**: Module frontmatter is normalized to `universe: <canonical_id>`.

### 4B. The Professionals (Systems Index)
Refer to `data/systems.ts` for the latest registry.
- **Design Philosophy**: Large, full-width glass cards with Lucide icons and monochrome labels.
- **Routing**: Internal routes for local OS modules; External routes for quantitative portfolios.

---

## 5. TECHNICAL CONVENTIONS & STACK

- **Core**: Next.js 14/15, TypeScript 5, Tailwind CSS.
- **Content Engine**: `gray-matter` for Markdown frontmatter parsing.
- **Navigation**: Client-side `TopStatusRail` with high-performance responsive dropdowns.
- **State Management**: Zero-waste approach (useState for UI, Filesystem for data).
- **Directory Lock Protection**: All mass structural changes must follow the **Zero-Lock Protocol** (Manual Move -> AI Verification -> Code Update).

---

## 6. PRIVACY & SEO PROTOCOLS

- **Public Perimeter**: Homepage (`/`), Systems Index (`/#work`), and Professional Outreach are fully indexable.
- **Dark Perimeter**: Life Lab (`/life-lab`) is explicitly excluded from:
  - **Sitemap**: No `/life-lab` entries in `sitemap.ts`.
  - **Robots**: `Disallow: /life-lab` in `robots.txt`.
  - **Navigation**: Indirect or unlinked publicly (strictly for private stability).
  
---

## 7. RECENT PURGES (LEGACY CLEANUP)

### v17.0 (The Life Lab Transition)
1. **Identity Rebrand**: Surgical transition from "Curiosity OS" to "Life Lab" across all UI, metadata, and routing.
2. **Filesystem Migration**: Moved all `curiosity/` directories to `life-lab/` namespace via the Zero-Lock Protocol.
3. **Logic Refactor**: Updated internal types (`LifeLabUniverse`, `LifeLabModule`) and central data registries.

### v16.1 (Personal Identity Sync)
1. **Singular Identity Lock**: Purged "we/our" references. Switched to singular "I/my" voice (Tharun Gajula).

### v15.0 (Documentation Consolidation)
1. **Master Integration**: Merged `UNIVERSE_ARCHITECTURE.md`, `WORKFLOW.md`, and `ARCHITECTURAL_WORKFLOW.md` into this document.
2. **Root Cleanup**: Purged redundant documentation files from the root and `content/curiosity` to reduce clutter.
3. **Systems Consolidation**: Moved the Systems Index from a separate `/systems` route to the homepage (`/#work`) for a unified outreach experience.

---

## 8. OPERATIONAL WORKFLOW (ZERO-LOCK PROTOCOL)

### 8A. The Windows "Directory Lock" Bottleneck
In this Windows environment, background processes (Next.js, VS Code) often hold file handles, causing automated filesystem commands to fail silently or hang.

### 8B. The "Zero-Lock" Execution Sequence
Every AI agent must follow this 3-step sequence for filesystem mutations:
1.  **Step 01: Surgical Audit**: Confirm exact files and impacts (check imports) before proposing changes.
2.  **Step 02: Manual Command Block**: Provide the user with a single, copy-pasteable terminal block (CMD or PowerShell) for all operations. **Never background mass deletions.**
3.  **Step 03: Positive Verification**: Perform a fresh `list_dir` and `grep` audit after the user execution to confirm success.

---

## 9. LIFE LAB CONTENT PROTOCOL (NOTE DROP)

### 9A. The "Note Drop" Sequence
Fastest path for moving raw thought into the Life Lab index:
1.  **Manual Drop (User)**: Drop `.md` files into the appropriate `/content/life-lab/modules/[id]` folder.
2.  **Synchronization Trigger (AI)**: User asks: **"Sync Life Lab [Universe ID]"** or **"Audit the [id] track."**
3.  **AI Processing**: AI performs a surgical audit, normalizing frontmatter and updating registry strings.

### 9B. Universe Maintenance
- **Adding**: Create `universes/[id]` and `modules/[id]` paths; add to `LIFE_LAB_UNIVERSES` in `data.ts`.
- **Archiving**: Move modules to `/shelf/life-lab/modules/[id]_archive/` and update status to "archived".
- **Monoculture Metadata**: The `metadata.md` in the `universes` folder is the single source of truth for the track's identity.

---

## 10. REPLICATION & TROUBLESHOOTING

- **Verification**: Ensure `layout.tsx` background/grid patterns are intact.
- **Registry**: `lib/life-lab/data.ts` is the heart of the knowledge engine.
- **Build Failure Checklist**: 
  1. Check `components/layout/` for legacy imports.
  2. Check `app/layout.tsx` and `app/page.tsx` for unused references.
  3. Clear `.next/` cache if stale references persist.

---
*End of Master Context.*
*Revised: 2026-04-09 (Life Lab Transition Complete)*
