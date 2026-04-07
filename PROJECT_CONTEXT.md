# THARUN GAJULA // MASTER PROJECT CONTEXT
**Version: 13.0 — Atlas OS 6-Universe Stabilization [STABLE] (2026-04-07)**

> **AI AGENT DIRECTIVE:** This is the absolute latest, 100% verified source of truth for the Tharun Gajula repository. Feed this file to any new AI agent to fully replicate the project—its current state, identity, design system, and component implementations. If building a new feature or migrating to a new chat, READ THIS ENTIRE DOCUMENT.

---

## 1. THE IDENTITY & MISSION

| Field | Value |
|---|---|
| **Name** | Tharun Gajula |
| **Archetype** | Learning Systems Builder / Visionary Infrastructure Designer |
| **Philosophy** | Building systems that amplify thought. I bridge the gap between complex knowledge architectures and lifelong human potential. |
| **Hero Tagline** | `Building Better Ways to Learn, Think, and Build.` |

---

## 2. THE DESIGN SYSTEM & UI TOKENS

### 2A. Global Background & Grid
```css
/* Custom Global Background defined in app/layout.tsx */
background-color: #020617;  /* Tailwind slate-950 base */
/* Grid overlay: */
background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 64px 64px; 
min-height: 100vh;
```
- **Refractive Orbs:** In `layout.tsx`, two ambient blurred orbs (`bg-cyan-600/20`) live at the top-left and bottom-right to create uniform glassmorphism refractions.
- **Transparent Surfaces:** All sections use `bg-transparent` so that the global animated grid shines through unblocked over the entire application.

### 2B. Surface Variants

**HUD Panel** (Top Status Rail):
```
bg-slate-900/30 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),_0_0_20px_rgba(0,0,0,0.5)]
```

**Glowing Gateway Window** (The Portal Card):
```
bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl
```

### 2C. Typography System
| Role | Classes |
|---|---|
| **H1s/Hero** | `font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400` |
| **Body Text** | `font-body text-sm leading-relaxed text-slate-300` |

---

## 3. ROUTING & CURRENT ARCHITECTURE

The repository is a single-entry hub optimized for high-performance and future app integration.

| Route | File | Background | Description |
|---|---|---|-----------|
| `/` | `app/page.tsx` | `bg-transparent` | Home: Hero Outreach + Star Field background. |
| `/atlas` | `app/atlas/page.tsx` | `bg-transparent` | Atlas OS: 6-Universe Knowledge Hub (Health & Auxiliary). |
| `/atlas/[universe]` | `app/atlas/[u]/page.tsx` | `bg-transparent` | Universe Index: Charter Block & Module list (Live/Locked states). |
| `/atlas/[u]/[m]` | `app/atlas/[u]/[m]/page.tsx` | `bg-transparent` | Module Reader: Premium editorial long-form. |

---

## 4. COMPONENT MAP

### 4A. Layout Components

#### `components/layout/TopStatusRail.tsx`
- **Branding:** `THARUN GAJULA`.
- **System Tray:** A live IST (Indian Standard Time) clock ticker with an emerald pulsing dot.

### 4B. Outreach Components
- `HeroThesis`: Direct impact headline and core subheadline.
- `ProfileTracks`: Multi-track background (Corporate, Analytics, Product, Craft).
- `AlignmentMatrix`: High-level FOXO mission and builder alignment points.
- `SoftCTA`: Final direct contact hub (LinkedIn/Email).

---

## 5. RECENT PURGES

### v13.0 (Atlas OS Stabilization)
1. **6-Universe Foundation**: Established the full roadmap (U1-U6) with corrected statuses (U1, U4-U6 Live/Open; U2-U3 Locked).
2. **Charter Model Expansion**: Introduced rich metadata (Learning Modes, Content Styles, Future Intent) for each universe.
3. **Resilient Loading**: Patched `lib/atlas/content.ts` to gracefully handle missing module directories (ENOENT fix).
4. **Build Optimization**: Excluded `shelf` directory from TypeScript compilation in `tsconfig.json`.
5. **Architectural Reference**: Created `content/atlas/UNIVERSE_ARCHITECTURE.md` as the master blueprint for universe intent.

### v12.1 (Workflow Standard)
1. **Architectural Protocol**: Integrated `ARCHITECTURAL_WORKFLOW.md` as the standard for filesystem operations.
2. **Build Fix**: Shelved remaining legacy `footer.tsx` and `navbar.tsx` components to resolve build errors.

### v12.0 (The Great Purge)
1. **Simulation Archival**: Moved all `/simulation` routes, components, and data to `/shelf` (Git ignored).
2. **Legacy Cleanup**: Shelved `components/3d` and all legacy simulation documentation.
3. **UI Truncation**: Removed the "Proof of Work" gateway from the home page.
4. **Atlas OS Foundation**: Fully established the filesystem-based clinical reading system.

### v11.1 (Zero-Waste)
1. **Route Deletion:** Removed legacy `/profile` and `/contact`.
2. **Component Cleanup:** Deleted redundant outreach sections.

---

## 6. ENCODING RULES FOR AI AGENTS (IN NEW CHATS)

If you have just arrived in a new chat thread and have been fed this document:
1. **READ ARCHITECTURAL_WORKFLOW.md FIRST**: This document mandates the "Zero-Lock Protocol" for all filesystem moves, renames, and deletions.
2. **You are in "Tharun Gajula", a personal builder's headquarters.**
3. **Never build modal popups.** Maintain the full-page, terminal-like architecture.
4. **Respect the color palette:** Slate-950 background, Cyan highlights, white/10 border/refractions.
5. **Current State:** The project is in a high-performance, minimalist state centered around Atlas OS and professional outreach.
6. **Objective:** You now possess the 100% complete and verified context of this repository. Ask the user what feature they wish to build next upon this builder's headquarters.
