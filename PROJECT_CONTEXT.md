# THARUN GAJULA // MASTER PROJECT CONTEXT
**Version: 14.0 — Canonical 5-Universe Stabilization [STABLE] (2026-04-07)**

> [!IMPORTANT]
> **AI AGENT DIRECTIVE:** This is the absolute latest, 100% verified source of truth for the Tharun Gajula repository. This document is a "Master Blueprint" designed to allow any AI or human builder to replicate the entire project architecture, identity, and systems from scratch. 
> **MANDATORY:** If building a new feature or migrating to a new session, READ THIS ENTIRE DOCUMENT FIRST.

---

## 1. THE IDENTITY & MISSION

| Field | Value |
|---|---|
| **Identity** | Tharun Gajula |
| **Archetype** | Learning Systems Builder / Visionary Infrastructure Designer |
| **Mission** | Architecting "Operating Systems" for human thought—platforms that bridge the gap between high-level conceptual knowledge and operational human potential. |
| **Core Philosophy** | **Symmetry in Thought. Coherence in Execution.** Every digital environment must look, feel, and function with clinical precision and premium resonance. |
| **Hero Tagline** | `Building Better Ways to Learn, Think, and Build.` |

---

## 2. REPOSITORY ARCHITECTURE (BIPARTITE MODEL)

The repository is divided into two distinct operating environments, optimized for professional outreach and private knowledge management.

### 2A. The Public Professional Index (`/systems`)
A calm, high-contrast index for professional systems and quantitative portfolios.
- **Quant OS**: Quantitative research & investment environments.
- **Yukti OS**: Cognitive infrastructure and Indian systems learning.
- **Curiosity OS**: First-principles investigation and active learning labs.
- **Analytics Portfolio**: Data-driven professional showcase.

### 2B. The Private Knowledge Engine (`/atlas`)
A high-signal, clinical "Operating System" for personal health, cognition, and systems thinking. 
- **Canonical Model**: 5 Universes (The 6-Universe model is officially retired).
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

---

## 4. SYSTEM MODULES & DATA REGISTRY

### 4A. Atlas OS: Canonical 5-Universe Model
All Atlas tracks are now physically consolidated into namespaced directories.

| Universe | Canonical ID | Role | Physical Path |
|---|---|---|---|
| **U1: Wellness** | `wellness` | Health Masterclass & Longitudinal Vitality | `modules/wellness` |
| **U2: Cognition** | `cognition` | Mental Models & Decision Quality | `modules/cognition` |
| **U3: Reasoning** | `reasoning` | Applied Logic & Daily Drills | `modules/reasoning` |
| **U4: Ecosystem** | `human-ecosystem` | Institutions, Incentives, & Society | `modules/human-ecosystem`|
| **U5: Sandbox** | `sandbox` | Rapid Life-Systems Prototyping | `modules/sandbox` |

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

- **Public Perimeter**: Homepage (`/`), Systems Index (`/systems`), and Professional Outreach are fully indexable.
- **Dark Perimeter**: Atlas OS (`/atlas`) is explicitly excluded from:
  - **Sitemap**: No `/atlas` entries in `sitemap.ts`.
  - **Robots**: `Disallow: /atlas` in `robots.txt`.
  - **Navigation**: Indirect or unlinked publicly (unless specified).
  
---

## 7. RECENT PURGES (LEGACY CLEANUP)

### v14.0 (The Normalization)
1. **6-Universe Archival**: Purged all references to the legacy "6-universe" model.
2. **Wellness Consolidation**: Physically merged `foundations`, `applied`, and `longitudinal` health folders into the single `wellness` canonical directory.
3. **Logic Simplification**: Removed all transitional "compatibility layers" for health tracks in `content.ts`.
4. **Systems Pivot**: Replaced the "Proof of Work" landing area with a direct professional `/systems` index.

---

## 8. REPLICATION GUIDE (FOR AI/PEOPLE)

1. **Verify `layout.tsx`**: Ensure the bg-slate-950 and grid pattern are persistent.
2. **Setup `lib/atlas/data.ts`**: This is the heart of the knowledge engine. Register universes here first.
3. **Markdown Architecture**: Place content in `content/atlas/modules/[canonical-id]/*.md`.
4. **HUD Integrity**: Ensure `TopStatusRail` remains the only global sticky nav.
5. **Ethics**: Maintain a neutral, high-value, "clinical" builder persona in all copy.

---
*End of Master Context.*
*Revised: 2026-04-07*
