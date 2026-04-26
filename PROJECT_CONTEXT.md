# THARUN GAJULA // MASTER PROJECT CONTEXT
**Version: 18.0 — Foundation Cleanup [STABLE] (2026-04-26)**

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

## 2. REPOSITORY ARCHITECTURE (SINGLE-PAGE CORE)

**Architectural Mandate:** Strictly Mobile-First, Single-Page Portfolio Core.

The repository is now a hyper-focused, single-page, mobile-optimized weapon. It is designed to act as a high-signal professional showcase with zero distractions.

### The Public Professional Index (`/`)
The Systems Index is integrated into the homepage as a high-signal professional showcase.
- **Quant OS**: Quantitative research & investment environments.
- **Yukti OS**: Cognitive infrastructure and Indian systems learning.
- **Analytics Portfolio**: Data-driven professional showcase.

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
- **Mobile-First Optimizations**: Use scalable typography (`sm` and `md` breakpoints in Tailwind) and ample breathing room for padding/margins to ensure a flawless mobile experience.
- **Editorial Tone**: All UI labels must remain "Calm and Clinical." Avoid technical underscores in navigation (e.g., use "Home" not "RETURN_TO_HOME").
- **Minimalist Aesthetic**: Prioritize high-performance, clear-typography surfaces.

---

## 4. SYSTEM MODULES & DATA REGISTRY

### The Professionals (Systems Index)
Refer to `data/systems.ts` for the latest registry.
- **Design Philosophy**: Large, full-width glass cards with Lucide icons and monochrome labels.
- **Routing**: Internal routes for local OS modules; External routes for quantitative portfolios.

---

## 5. TECHNICAL CONVENTIONS & STACK

- **Core**: Next.js 14/15, TypeScript 5, Tailwind CSS.
- **Navigation**: Client-side `TopStatusRail` with high-performance responsive dropdowns.
- **State Management**: Zero-waste approach (useState for UI).

---

## 6. PRIVACY & SEO PROTOCOLS

- **Public Perimeter**: Homepage (`/`), Systems Index (`/#work`), and Professional Outreach are fully indexable.
  
---

## 7. RECENT PURGES (LEGACY CLEANUP)

### v18.0 (Foundation Cleanup)
1. **Life Lab Purge**: Complete surgical removal of the `life-lab` module. Deleted all physical routes (`app/life-lab`), components (`components/life-lab`), content (`content/life-lab`), and references to ensure a razor-sharp, distraction-free environment.
2. **Architectural Mandate Updated**: Realigned the architecture to a "Strictly Mobile-First, Single-Page Portfolio Core."
3. **Mobile Aesthetic Optimization**: Fine-tuned the Home Page (`/`) for `sm` viewports (better typography scaling, optimal component stacking, flawless padding/margins).

### v17.0 (The Life Lab Transition)
1. **Identity Rebrand**: Surgical transition from "Curiosity OS" to "Life Lab" across all UI, metadata, and routing. (Now purged).

### v16.1 (Personal Identity Sync)
1. **Singular Identity Lock**: Purged "we/our" references. Switched to singular "I/my" voice (Tharun Gajula).

### v15.0 (Documentation Consolidation)
1. **Root Cleanup**: Purged redundant documentation files from the root and `content/curiosity` to reduce clutter.
2. **Systems Consolidation**: Moved the Systems Index from a separate `/systems` route to the homepage (`/#work`) for a unified outreach experience.

---

## 8. REPLICATION & TROUBLESHOOTING

- **Verification**: Ensure `layout.tsx` background/grid patterns are intact.
- **Build Failure Checklist**: 
  1. Check `components/layout/` for legacy imports.
  2. Check `app/layout.tsx` and `app/page.tsx` for unused references.
  3. Clear `.next/` cache if stale references persist.

---
*End of Master Context.*
*Revised: 2026-04-26 (Foundation Cleanup Complete)*
