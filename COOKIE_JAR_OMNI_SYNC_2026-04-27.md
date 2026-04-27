# OMNI-SYNC & RUTHLESS PURGE REPORT (OPERATION COOKIE JAR)
**Date**: 2026-04-27

## 1. Purge Log
The repository was deeply scanned for "life-lab" traces, old unused concepts, orphaned files, and dead imports. The following unused, non-rendering legacy files were deleted from the project:
- **`components/ui/ai-core.tsx`** (Orphaned component)
- **`components/ui/os-window.tsx`** (Orphaned concept)

*Note: References to the "life-lab" logic had already been minimized. `tll-logo.tsx` (Tharun Learning Lab logo) was retained as it is actively rendering within the `<TopStatusRail />` component.*

## 2. Component Blueprint (Architecture Mapping)
The exact structure of the active React components on the Home page (`/app/page.tsx`) and their nested children is structured as follows:

- **Root `<main>` Layout (`app/page.tsx`)**
  - `<TopStatusRail />`
    - `<TllLogo />`
  - `<Canvas>` (Fixed 3D background layer with `Stars`, `OrbitControls`, and multi-directional lighting)
  - **Scrollable Outreach Layer**:
    - `<HeroThesis data={content.hero} />`
    - `<ProfileTracks data={content.tracks} />`
    - `<SystemsArchive id="work" />`
    - `<SoftCTA data={content.softCTA} />`
      - `<SectionContainer />`

## 3. Design System State (Styling Audit)
The current core design tokens configured in `tailwind.config.ts` and `app/globals.css` are explicitly mapped below:

- **Core Colors**:
  - `background`: `#09090b` (Deep Void)
  - `body base`: `#020617` (Slate 950 base override in `globals.css`)
  - `primary`: `#06b6d4` (Bio-Scan Cyan)
  - `tharungajula`: `#f97316` (Blaze Orange)
  - `taste`: `#eab308` (Rich Gold)
  - `n1`: `#10b981` (Vitality Emerald)
- **Typography Fonts**:
  - `heading`: `var(--font-outfit)`
  - `body`: `var(--font-inter)`
  - `mono`: `var(--font-mono)`
- **Core Gradients/Backgrounds**: 
  - `grid-pattern`: `linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)`
- **Global CSS Utility Overrides**: 
  - `.glass-card`: `@apply bg-zinc-950/40 backdrop-blur-md border border-white/10`
  - Custom OS Scrollbar styling with Cyan (`rgba(34, 211, 238, 0.5)`) hover states.

## 4. Mobile Vulnerabilities (Viewport Audit)
A strict viewport audit was conducted to ensure absolute "mobile-first perfection." While most functional outreach components extensively utilize `sm:` and `md:` prefixes (such as spacing, grid layouts, and typography scaling), the following minor structural vulnerabilities lack explicit Tailwind viewport scaling:

- **`<main>` structural elements (`app/page.tsx`)**:
  - `<div className="fixed inset-0 z-0 pointer-events-none">`: Relies on absolute inset values instead of viewport-specific bounds.
  - `<div className="relative z-10 w-full">`: Uses `w-full` unconditionally without `md:max-w-*` scaling modifiers.
- **`<TllLogo />` (`components/ui/tll-logo.tsx`)**:
  - Contains strictly scaled SVG coordinates and relies entirely on parent property-passing (`size`) to calculate sizing (via standard CSS width overrides), lacking internal responsive adaptability via viewports (`sm:` or `md:`).
