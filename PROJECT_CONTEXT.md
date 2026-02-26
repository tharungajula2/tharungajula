# THE THARUN LEARNING LAB // MASTER CONTEXT

> **USAGE INSTRUCTION:** Feed this file to any new AI Agent to restore full context of the User, the Mission, the Architecture, Design System, and Hidden Layers. This is the single source of truth.

---

## 1. THE IDENTITY
*   **User:** Tharun Kumar Gajula (Researcher, Engineer, Systems Thinker)
*   **Archetype:** "The Researcher" // The Student of Systems
*   **Background:** Bridging Business Strategy and Technical Execution. Engineering, Finance, and AI-ML.
*   **Philosophy:** "You do not rise to the level of your goals. You fall to the level of your systems."
*   **Mission:** Moving from finite "Projects" to infinite "Operating Systems". Decoding the 9 domains of real-world life mastery for the next generation.
*   **Tagline:** DECODING LIFE MASTERY.

---

## 2. THE DISHA OS DESIGN SYSTEM (CURRENT UI/UX DNA)

The entire site has been migrated to the **Disha OS** design system. All future components must follow these rules.

### Colors & Backgrounds
*   **Global Background:** `#020617` (Tailwind `slate-950`) applied in `app/globals.css`
*   **HUD Panel (Navbar/Footer):** `bg-slate-950/90 backdrop-blur-md border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]`
*   **Reactor Core Cards (Content):** `bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),_0_0_15px_rgba(0,240,255,0.12)] rounded-2xl`
*   **Grid Lines:** `rgba(255,255,255,0.07)` at 60px grid in `globals.css` body

### Typography
*   **Brand Heading (Navbar/Footer):** `font-heading text-lg/xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400`
*   **Hero H1:** `font-sans tracking-tight font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400` (fluid sizing: `text-5xl sm:text-7xl md:text-8xl lg:text-9xl`)
*   **Eyebrow / System Label:** `font-mono uppercase tracking-widest text-[10px] text-cyan-400`
*   **Nav / Metadata Links:** `font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 hover:text-cyan-400`
*   **Body Text:** `font-body text-sm leading-relaxed text-slate-300`

### Component Patterns
*   **Nav Links (Navbar & Footer):** `// NAME` prefix + 1px cyan underline slide-in on hover
*   **Logo Mark:** Custom SVG `TllLogo` (⅃ T L monogram) — cyan-to-white gradient, `stdDeviation 0.6` glow — in `components/ui/tll-logo.tsx`
*   **Brand Name:** "THARUN LEARNING LAB" in gradient text next to the logo mark (both Navbar and Footer)
*   **Hero Eyebrow:** `// RESEARCH_SANDBOX: ACTIVE` — mono, cyan, above the H1
*   **Hero H1:** `DECODING LIFE MASTERY.`
*   **Hero Description:** "I built this lab as an open sandbox to explore the cognitive collapse and map an escape hatch from rote-learning. This is my personal research engine—decoding the 9 domains of real-world life mastery for the next generation."
*   **Footer Description:** "A digital sandbox for decoding real-world systems and engineering life mastery."

---

## 3. THE ROUTING & PAGE MAP

| Route | Component | Description |
|---|---|---|
| `/` | `app/page.tsx` | Home: Navbar + HeroSection + NetworkActivity + QuoteSection + Footer |
| `/map` | `app/map/page.tsx` | Neural Map Knowledge Graph (react-force-graph-2d) |
| `/till-2026` | `app/till-2026/page.tsx` | Time Capsule / Personal Manifesto |
| `/notes/[id]` | `app/notes/[id]/page.tsx` | Individual Zettelkasten note (Markdown rendered) |
| `/protocols/[slug]` | `app/protocols/[slug]/page.tsx` | Dynamic Protocol detail page |
| `/protocols/biology_os` | Static page | Biology OS — Purple |
| `/protocols/family_os` | Static page | Family OS — Orange |
| `/protocols/cognition_os` | Static page | Cognition OS — Sky Blue |

**All page backgrounds:** `bg-slate-950` (unified site-wide)

---

## 4. THE PROTOCOL ECOSYSTEM

### [THE SANDBOX] // OVERARCHING ARCHITECTURE
*   **Mission:** "The overarching architecture, philosophy, and highest-level direction. The rules of the Infinite Game."
*   **Status:** ACTIVE_SYSTEM (Color: Zinc)

### [BIOLOGY OS] // THE LOGICAL BODY
*   **Mission:** "Explore the biological systems powering Protocol Family and Protocol Cognition."
*   **Status:** ACTIVE_RESEARCH (Color: Purple)

### [PROTOCOL FAMILY] // THE FAMILY OS
*   **Mission:** "Engineer the Fortress Architecture to protect N=1 and sustain Protocol Cognition."
*   **Status:** ACTIVE_RESEARCH (Color: Orange)

### [PROTOCOL COGNITION] // THE COGNITIVE OS
*   **Mission:** "Engineer the Cognitive Software to run N=1 and Protocol Family."
*   **Status:** CONCEPT_PHASE (Color: Sky Blue)

---

## 5. THE 4 MASTER ARCHITECTURE GRID (Homepage Cards)

These are the 4 Reactor Core glassmorphism cards displayed below the hero section:

| # | Title | Description |
|---|---|---|
| [1] | THE HARDWARE | Physical Resilience & Nervous System Regulation |
| [2] | THE SOFTWARE | Meta-Learning, Applied Logic & Information Hygiene |
| [3] | THE MULTIPLIERS | Financial Mechanics, Digital Engineering & Applied AI |
| [4] | THE HORIZON | Career Topography & The Uncharted Sandbox |

---

## 6. CONTENT / LAB NOTES (DIGITAL GARDEN)
*   **Format:** Raw Markdown (`.md`) in `/content/notes/`. Atomic naming.
*   **Frontmatter:** `id`, `title`, `date`, `tag`, `protocol?`, `status?`, `excerpt`, `outboundLinks?`, `inboundLinks?`
*   **Statuses:** `CONCEPT | DRAFT | POLISHED`
*   **Mechanism:** `npm run note "Title"` (Interactive CLI)
*   **Display:** `/notes/[id]` rendered with `ReactMarkdown`; also mapped on Neural Map `/map`
*   **Style Rules:** NO EM-DASHES (`—`), use hyphens (` - `). "AI-ML" not "Deep Learning".

---

## 7. TECHNICAL ARCHITECTURE

*   **Framework:** Next.js 16 (App Router) + Turbopack. Deployed on Vercel.
*   **Styling:** Tailwind CSS v4 (configured via `@import "tailwindcss"` in `globals.css`)
*   **Fonts:** Inter (`--font-inter`, `font-body`), Outfit (`--font-outfit`, `font-heading`), JetBrains Mono (`--font-mono`)
*   **Animation:** Framer Motion (spring physics `stiffness:300 damping:20`)
*   **Icons:** `lucide-react`
*   **Graph:** `react-force-graph-2d` on `/map`

### Key File Map
```
/app
  layout.tsx           — Root layout: fonts, bg-slate-950, Footer
  globals.css          — Grid bg, font vars
  page.tsx             — Home assembly
  /map/page.tsx        — Neural Map
  /till-2026/page.tsx  — Time Capsule
  /notes/[id]/page.tsx — Note viewer
  /protocols/
    [slug]/page.tsx    — Dynamic protocol page (reads from /lib/protocols.ts)
    biology_os/
    cognition_os/
    family_os/

/components
  /layout
    navbar.tsx         — HUD Panel bar, TllLogo + gradient brand text, // NAV LINKS
    footer.tsx         — HUD Panel, TllLogo, NAVIGATION + CONNECT columns
  /home
    hero-section.tsx   — Eyebrow + H1 + Description + 4 Reactor Core cards
    about-section.tsx  — About/CV Reactor Core grid
    network-activity.tsx
    quote-section.tsx
  /ui
    tll-logo.tsx       — Custom SVG ⅃ T L monogram logo
    genesis-modal.tsx  — Easter egg modal
    l-protocol.tsx     — Easter egg modal (LAYAS)

/lib
  posts.ts             — Markdown reader (gray-matter)
  protocols.ts         — Protocol data schema
```

---

## 8. THE HIDDEN LAYERS

### GENESIS BLOCK (`components/ui/genesis-modal.tsx`)
*   **Trigger:** Click the SYSTEM_STATUS area in the Footer exactly 7 times
*   **Note:** SYSTEM_STATUS badge has been removed from footer UI, but `handleStatusClick` still maps to the invisible `div` wrapping the footer brand description.
*   **Payload:** Matrix-style dedication to Parents & Friends (Timestamp: 2026-02-21)

### PROTOCOL L — LAYAS (`components/ui/l-protocol.tsx`)
*   **Trigger:** Navbar Logo clicked exactly 5 times
*   **Security:** Password "LAYAS" (case-insensitive)
*   **Payload:** "Rose Gold" full-screen affirmation modal

---

## 9. RECENT SHIPMENTS (CHRONOLOGICAL)

*   **[SHIP]** GitHub repo renamed from `tharun-health-lab` → `tharun-learning-lab`
*   **[SHIP]** Tharun Learning Lab Identity Overhaul (mission language + hero copy)
*   **[SHIP]** Master Architecture Grid (4 domains) deployed to Homepage
*   **[SHIP]** "Till 2026" Time Capsule page
*   **[SHIP]** Zettelkasten Knowledge Graph Neural Map
*   **[SHIP]** DISHA OS Visual Overhaul — complete (global bg, Reactor Core cards, HUD Panel nav/footer, typography system)
*   **[SHIP]** Custom TLL SVG monogram logo (`⅃ T L`) with cyan gradient + micro-glow
*   **[SHIP]** Hero text restructured: eyebrow `// RESEARCH_SANDBOX: ACTIVE` + H1 `DECODING LIFE MASTERY.`
*   **[SHIP]** Full background consistency pass — all pages now `bg-slate-950`
*   **[SHIP]** Footer nav links aligned to Navbar style (`// NAME` + cyan underline)
*   **[SHIP]** SYSTEM_STATUS badges removed from Hero and Footer
*   **[SHIP]** Grid lines visibility boosted (opacity `0.03` → `0.07`)

---

## 10. ENCODING RULES FOR AI AGENTS

1. **Never remove** Framer Motion animations. Upgrade spring physics if needed.
2. **Never use `bg-zinc-*` or `bg-purple-*`** for page backgrounds. Always `bg-slate-950`.
3. **Nav links always use** `// NAME` format in both Navbar and Footer.
4. **Logo is always** `<TllLogo />` from `components/ui/tll-logo.tsx` — not lucide icons.
5. **Brand name always uses** the cyan-to-white gradient text class.
6. **Glow is always subtle** — max `15px spread / 0.12 opacity` on Reactor Core cards.
7. **Grid lines live in `globals.css` body** — do not override them per-component.
