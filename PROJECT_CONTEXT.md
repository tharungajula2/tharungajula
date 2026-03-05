# THE THARUN OS // MASTER PROJECT CONTEXT
**Version: 5.0 — The Analytics & Risk Portfolio Pivot (2026-03-05)**

> **AI AGENT DIRECTIVE:** This is the single source of truth for the Tharun OS project. Feed this file to any new AI agent to fully replicate the project — its identity, design system, architecture, data schemas, component implementations, hidden layers, and encoding rules. All information has been verified against the live codebase.

---

## 1. THE IDENTITY & MISSION

| Field | Value |
|---|---|
| **Name** | Tharun Kumar Gajula |
| **Archetype** | AI-Native Product & Risk Architect |
| **Location** | Bengaluru, India |
| **Background** | Engineering × Finance × AI-ML |
| **Philosophy** | "You do not rise to the level of your goals. You fall to the level of your systems." |
| **Site Mission** | A world-class Analytics, Data Science, ML, and Product Management portfolio specializing in Banking, Finance, and Risk Management. Engineered as an 'Operating System' to provide recruiting managers with a premium, high-density overview of capabilities. |
| **Hero Tagline** | `ARCHITECTING RISK & INTELLIGENCE.` |
| **Hero Eyebrow** | `// RISK_MANAGEMENT_OS: ACTIVE` |
| **Hero Description** | "I built this OS to bridge the gap between complex regulatory frameworks and scalable AI execution. This is my digital brain—mapping 0-to-1 product strategy, predictive credit modeling, and data engineering for modern finance." |
| **Footer Description** | "A digital OS for architecting scalable risk models and intelligent financial products." |
| **Charlie Munger Quote** | "I constantly see people rise in life who are not the smartest, sometimes not even the most diligent, but they are learning machines..." (Full text in QuoteSection component) |

---

## 2. THE THARUN OS DESIGN SYSTEM (COMPLETE SPEC)

> This is the visual DNA. Every component must conform to these tokens to maintain the Apple-esque premium feel.

### 2A. Global Background & Grid
```css
/* app/globals.css — body */
background-color: #020617;  /* Tailwind slate-950 */
background-image: linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px);
background-size: 60px 60px;
min-height: 100vh;
```
- All page-level `<main>` wrappers use `bg-slate-950` (or `bg-transparent` to inherit)
- **Never** use `bg-black`, `bg-zinc-*`, or `bg-purple-*` for page backgrounds

### 2B. Surface Variants

**HUD Panel** (Navbar, Footer):
```
bg-slate-950/90 backdrop-blur-md border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]
```

**Reactor Core Card** (Hero grid, About section):
```
bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10
shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),_0_0_15px_rgba(0,240,255,0.12)] rounded-2xl
```

### 2C. Typography System

| Role | Classes |
|---|---|
| **Brand / Hero H1** | `font-sans tracking-tight font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400` |
| **Brand Name (Navbar/Footer)** | `font-heading text-lg/xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400` |
| **Eyebrow / System Label** | `font-mono uppercase tracking-widest text-[10px] text-cyan-400` |
| **Nav Links (both bars)** | `font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 hover:text-cyan-400` |
| **Body Text** | `font-body text-sm leading-relaxed text-slate-300` |
| **Section Headers** | `font-mono text-sm font-bold text-white tracking-wider` |
| **Metadata/Date** | `font-mono text-xs text-zinc-500` |

### 2D. Font Variables (defined in `app/layout.tsx`)
```typescript
Inter       → variable: "--font-inter"  → className: font-body
Outfit      → variable: "--font-outfit" → className: font-heading
JetBrains   → variable: "--font-mono"   → className: font-mono
```

### 2E. Navigation Link Pattern (BOTH Navbar & Footer)
- **Format:** `// NAME` prefix on all nav items
- **Hover:** 1px `bg-cyan-400` underline slides from `w-0` to `w-full` (duration 300ms)
- **Class:** `group relative font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 transition-colors hover:text-cyan-400`

### 2F. Animation Rules
- **Framer Motion spring:** `transition={{ type: "spring", stiffness: 100 }}`
- **Section entrance:** `staggerChildren: 0.2, delayChildren: 0.3`
- **Item entrance:** `{ y: 20, opacity: 0 } → { y: 0, opacity: 1 }`
- **Never remove** existing Framer Motion animations
- **`whileInView`** used for about-section cards with `viewport={{ once: true }}`

---

## 3. THE CUSTOM LOGO (`components/ui/tll-logo.tsx`)

**Concept:** Three geometric strokes forming the monogram: `⅃ T L`

| Stroke | Shape | Coordinates |
|---|---|---|
| **⅃** (Flipped-L, left bracket) | Vertical stem + foot extending right | `(14,6)→(14,38)` + `(14,38)→(24,38)` |
| **T** (Centre mark) | Crossbar + vertical stem | `(20,10)→(44,10)` + `(32,10)→(32,42)` |
| **L** (Standard-L, right bracket) | Vertical stem + foot extending left | `(50,6)→(50,38)` + `(40,38)→(50,38)` |

**SVG Spec:**
- ViewBox: `0 0 64 48`
- Stroke: `url(#tll-grad)` (linear gradient)
- Gradient: `#67e8f9` (cyan-300) → `#ffffff` (white), diagonal
- Stroke-width: `4`, Stroke-linecap: `square`
- Glow filter: `feGaussianBlur stdDeviation="0.6"`
- Props: `size` (default 40), `className`

**Usage in Navbar:** `<TllLogo size={40} />` beside brand name
**Usage in Footer:** `<TllLogo size={32} />` beside brand name
**Export PNG:** `TLL_LOGO_1080x1080.png` in project root (1080×1080, transparent bg)

---

## 4. ROUTING & PAGE MAP

| Route | File | Background | Description |
|---|---|---|-----------|
| `/` | `app/page.tsx` | `bg-transparent` (inherits body) | Home: Navbar + HeroSection + NetworkActivity + QuoteSection + Footer |
| `/map` | `app/map/page.tsx` | `bg-slate-950` | Neural Map Knowledge Graph (react-force-graph-2d) |
| `/till-2026` | `app/till-2026/page.tsx` | `bg-transparent` | Mounts Navbar + AboutSection (the CV/About page) |
| `/notes/[id]` | `app/notes/[id]/page.tsx` | `bg-slate-950` | Individual Zettelkasten note rendered from Markdown |
| `/protocols/[slug]` | `app/protocols/[slug]/page.tsx` | `bg-slate-950` | **Only** protocol page. Reads slug from `lib/protocols.ts` and renders dynamically |
| `/brain` | Static | — | Internal notes/brain page |
| `/robots.txt` | Generated | — | SEO robots |
| `/sitemap.xml` | Generated | — | SEO sitemap |

---

## 5. COMPONENT ARCHITECTURE (COMPLETE)

### 5A. Layout Components

#### `components/layout/navbar.tsx`
- **Type:** Client Component (`use client`)
- **Position:** `fixed top-0 z-50 h-16`
- **Style:** HUD Panel
- **Logo:** `<TllLogo size={40} />` + `<span>THARUN OS</span>` gradient text
- **Nav Links:** `[{ HOME, / }, { NEURAL MAP, /map }, { TILL 2026, /till-2026 }]`
- **Link format:** `// HOME`, `// NEURAL MAP`, `// TILL 2026`
- **Mobile:** Hamburger → Dropdown (`bg-black/95 backdrop-blur-xl`)
- **Easter Egg:** Logo click counter — 5 clicks within 2-second windows triggers `LProtocol`. Counter resets after 2s inactivity.
- **State:** `isOpen`, `logoClicks`, `showLProtocol`

#### `components/layout/footer.tsx`
- **Type:** Client Component (`use client`)
- **Style:** HUD Panel
- **Grid:** `md:grid-cols-3` — BRAND | NAVIGATION | CONNECT
- **Brand column:** `<TllLogo size={32} />` + gradient brand name "THARUN OS" + description text
- **Navigation links:** `footerLinks = [Home(/), Neural Map(/map), // TILL 2026(/till-2026)]`
- **Social links (active):** GitHub (`https://github.com/tharungajula2`), LinkedIn (`https://linkedin.com/in/tharungajula`), Email (`tharun.gajula.2@gmail.com`)
- **Social links (commented out):** YouTube, Twitter
- **Dedication text:** "This journey is dedicated to my Parents."
- **Bottom row:** `© 2026 Renaforge Systems. All rights reserved.` | `Built with Next.js, Tailwind & Coffee.`
- **Easter Egg:** Invisible click zone on the footer brand description area — `handleStatusClick` increments `clickCount`. At 7 clicks, opens `GenesisModal`. State: `clickCount`, `showModal`

### 5B. Home Page Components

#### `components/home/hero-section.tsx`
- **Section id:** `protocols`
- **Layout:** Full viewport, centered, `flex-col items-center justify-center`
- **Animation:** `containerVariants` (stagger) + `itemVariants` (spring y-20 entrance)
- **Eyebrow:** `// RISK_MANAGEMENT_OS: ACTIVE` — `font-mono uppercase tracking-widest text-[10px] text-cyan-400`
- **H1:** `ARCHITECTING RISK & INTELLIGENCE.` — gradient text, fluid sizing (`text-5xl sm:text-7xl md:text-8xl lg:text-9xl`)
- **Description:** "I built this OS to bridge the gap between complex regulatory frameworks and scalable AI execution..."
- **4-Card Grid (The Core Pillars):** `md:grid-cols-2 gap-4 max-w-4xl` — all Reactor Core style:
  - `[1] PREDICTIVE RISK` — Credit Scoring, PD/LGD Modeling & Stress Testing.
  - `[2] PRODUCT STRATEGY` — 0-to-1 Roadmaps, Requirement Gathering (BRD) & UAT.
  - `[3] DATA ENGINEERING` — Python scale, ETL pipelines & PowerBI Analytics.
  - `[4] APPLIED AI & ML` — LLM Integration, RAG Architectures & Convex Optimization.

#### `components/home/network-activity.tsx`
- **Section id:** `notes`
- **Type:** Server Component (no `use client`)
- **Data:** `getSortedPostsData().slice(0, 5)` — shows top 5 most recent notes
- **Style:** Terminal list — `bg-zinc-900` hover, dotted separator, date + arrow
- **Protocol tag colors:**
  - `protocol: "0"` → zinc (THE SANDBOX)
  - `protocol: "1"` → purple (RISK OS)
  - `protocol: "2"` → orange (PRODUCT OS)
  - `protocol: "3"` → sky (DATA OS)
  - default → primary
- **CTA:** `ACCESS_FULL_MAP →` links to `/map`

#### `components/home/quote-section.tsx`
- **Type:** Client Component
- **Quote:** Charlie Munger on being a "learning machine"
- **Animation:** `whileInView scale 0.9→1, opacity 0→1`
- **Decoration:** Cyan sparkle divider lines

#### `components/home/about-section.tsx`
- **Route:** Rendered at `/till-2026`
- **Style:** Reactor Core glassmorphism grid cards (`md:grid-cols-12`)
- **Sections:** The Architect's Manifesto, Experience, Education/Certifications, Capability Matrix (Banking/Risk focus), Project Archive.
- **Animation:** All cards use `whileInView` with staggered delays

### 5C. UI Components

#### `components/ui/tll-logo.tsx`
(See Section 3)

#### `components/ui/genesis-modal.tsx`
(See Section 8A)

#### `components/ui/l-protocol.tsx`
(See Section 8B)

---

## 6. THE PROTOCOL ECOSYSTEM (`lib/protocols.ts`)

> **Architecture Note:** All protocol pages are served via a **single dynamic route** `/protocols/[slug]`. `generateStaticParams()` in `[slug]/page.tsx` reads all slugs from `lib/protocols.ts` at build time.

### Schema
```typescript
export type ProtocolData = {
    slug: string;
    title: string;
    subtitle: string;
    color: string;      // Tailwind text-* class (used on icon + status badge)
    bgColor: string;    // Tailwind bg-* class (used for ambient glow div)
    icon: any;          // lucide-react icon component
    status: string;     // Human-readable status string
    mission: string;    // Full mission statement paragraph
    stack: { name: string; icon: any }[]; // Up to 4 stack items
};
```

### Protocols Registry (Version 5.0)

| Slug | Title | Color | Status | Icon |
|---|---|---|---|---|
| `meta` | THE SANDBOX | `text-zinc-400` / `bg-zinc-400` | Active System | `Database` |
| `risk_os` | PREDICTIVE RISK | `text-purple-500` / `bg-purple-500` | Production | `LineChart` |
| `product_os` | PRODUCT STRATEGY | `text-orange-500` / `bg-orange-500` | Production | `Briefcase` |
| `data_os` | DATA ENGINEERING | `text-sky-500` / `bg-sky-500` | Production | `Layers` |

**`meta` subtitle:** "The OS Architecture"
**`meta` mission:** "To document the systemic approach, logical frameworks, and baseline infrastructure driving this portfolio."

**`risk_os` subtitle:** "Probability & Capital Management"
**`risk_os` mission:** "To engineer robust risk frameworks. Focuses on PD Scorecards, Asset Liability Management (ALM), and Regulatory Stress Testing. Bringing statistical rigor to retail and institutional credit decisions."

**`product_os` subtitle:** "Execution & Lifecycle"
**`product_os` mission:** "Translating complex business requirements into shipping code. Bridging stakeholders, engineering teams, and regulatory constraints to deliver viable 0-to-1 banking products."

**`data_os` subtitle:** "Pipelines & Intelligence"
**`data_os` mission:** "Structuring unstructured finance. Building the data pipelines, ETL flows, and ML integrations required to power predictive models and LLM agents at scale."

### Protocol Tag Colour Mapping (used in `network-activity.tsx`)

Note-level `protocol` field maps to display tag colours:

| Frontmatter `protocol` value | Protocol | Tag Colour |
|---|---|---|
| `"0"` | THE SANDBOX | `text-zinc-400 border-zinc-400/30 bg-zinc-400/10` |
| `"1"` | RISK OS | `text-purple-500 border-purple-500/30 bg-purple-500/10` |
| `"2"` | PRODUCT OS | `text-orange-500 border-orange-500/20 bg-orange-500/10` |
| `"3"` | DATA OS | `text-sky-500 border-sky-500/20 bg-sky-500/10` |
| *(unset/default)* | — | primary colour |

---

## 7. CONTENT / LAB NOTES (ZETTELKASTEN DIGITAL GARDEN)

### Philosophy
A "Digital Garden" of living concept documents, bridging technical data science notes with product management frameworks. Atomic, non-linear, sequence-free.

### Frontmatter Schema (`lib/posts.ts`)
```typescript
export type PostData = {
  id: string;        // filename without .md
  title: string;
  date: string;      // YYYY-MM-DD
  tag: string;       // e.g. "RISK", "PRODUCT", "DATA", "STRATEGY"
  protocol?: string; // "0" | "1" | "2" | "3" → maps to protocol tag colors
  status?: string;   // "CONCEPT" | "DRAFT" | "POLISHED"
  excerpt: string;
  content?: string;  // full markdown body
  outboundLinks?: string[];
  inboundLinks?: Partial<PostData>[];
};
```

### Content Rules
- Files: `content/notes/*.md`
- **NO EM-DASHES** (`—`), use hyphens (` - `)
- "AI-ML" not "Deep Learning"
- CLI: `npm run note "Title"` → interactive prompt
- WikiLinks: `[[Title]]` → auto-converted to `/notes/slug`
- Displayed in `NetworkActivity` (latest 5) and on `Neural Map` at `/map`

---

## 8. THE HIDDEN LAYERS (EASTER EGGS)

### 8A. THE GENESIS BLOCK (`components/ui/genesis-modal.tsx`)
**Trigger:** Click the footer brand section (invisible clickable div wrapping the brand description) exactly **7 times** in rapid succession.
**Payload:** Typewriter animation dedication to Parents.

### 8B. PROTOCOL L — THE LAYAS PROTOCOL (`components/ui/l-protocol.tsx`)
**Trigger:** Click the Navbar Logo exactly **5 times** within 2-second windows. Enter password "ASALY".
**Payload:** The Rose L Sparkle overlay dedication.

---

## 9. TECHNICAL ARCHITECTURE

### Stack
| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) + Turbopack |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in globals.css) |
| Animation | Framer Motion |
| Icons | `lucide-react` |
| Font Loading | `next/font/google` (Inter, Outfit, JetBrains Mono) |
| Graph | `react-force-graph-2d` (Neural Map) |
| Markdown | `gray-matter` + `ReactMarkdown` + `remark-gfm` |
| Deployment | Vercel (`https://th-lab.vercel.app`) |

### File Map
```
/app
  layout.tsx                — Root layout: font vars, bg-slate-950, Footer mounted globally
  globals.css               — Grid background, font vars, .glass-card utility
  page.tsx                  — Home assembly page
  /map/page.tsx             — Neural Map page (SSR)
  /till-2026/page.tsx       — Navbar + AboutSection
  /notes/[id]/page.tsx      — Note detail with ReactMarkdown
  /protocols/[slug]/page.tsx— Dynamic protocol page (reads lib/protocols.ts)

/components
  /layout
    navbar.tsx              — HUD navbar, TllLogo, gradient brand, L-Protocol trigger
    footer.tsx              — HUD footer, TllLogo, 3-col grid, Genesis trigger
  /home
    hero-section.tsx        — Eyebrow + H1 + Desc + 4 Reactor Core architecture cards
    network-activity.tsx    — Top 5 recent notes (server component)
    quote-section.tsx       — Charlie Munger quote with cyan sparkle ornaments
    about-section.tsx       — Full About/CV rendered at /till-2026
  /ui
    tll-logo.tsx            — Custom SVG ⅃ T L monogram (cyan gradient + glow)
    genesis-modal.tsx       — Easter egg: typewriter dedication modal (7-click trigger)
    l-protocol.tsx          — Easter egg: Layas Protocol (5-click + password "ASALY")

/lib
  posts.ts                  — Markdown reader (getAllPostIds, getPostData, getSortedPostsData)
  protocols.ts              — Protocol data registry (4 protocols)
  utils.ts                  — cn() utility (clsx + tailwind-merge)

/content/notes/             — All markdown .md files (Zettelkasten notes)

/public                     — Static assets
TLL_LOGO_1080x1080.png      — Exported 1080×1080 transparent PNG of the logo
```

---

## 10. SEO & METADATA (`app/layout.tsx`)

```typescript
metadataBase: new URL('https://th-lab.vercel.app')
title.default: "Tharun OS | Product & Risk Architect"
title.template: "%s | Tharun OS"
description: "A premium portfolio OS for Data Science, Risk Management, and applied AI."
keywords: ["Risk Management", "Product Strategy", "Data Science", "AI", "Bangalore", "Tharun OS", "Credit Scoring"]
authors: [{ name: 'Tharun Kumar Gajula', url: 'https://th-lab.vercel.app' }]
openGraph: { type: 'website', locale: 'en_US', siteName: 'Tharun OS' }
robots: { index: true, follow: true }
```

---

## 11. ENCODING RULES FOR AI AGENTS

> These are hard constraints. Violating them breaks the design system.

1. **Background:** Always `bg-slate-950` on all pages/surfaces. Never `bg-black`, `bg-zinc-*`, or any light background.
2. **Logo:** Always `<TllLogo />` from `components/ui/tll-logo.tsx`. Never replace with a lucide icon.
3. **Brand Name:** Always renders with `bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400`.
4. **Nav links:** Always prefixed with `// ` in both Navbar and Footer. Uses underline hover animation.
5. **Glow:** Max `15px spread / 0.12 opacity` on Reactor Core cards. SVG logo glow max `stdDeviation 0.6`.
6. **Animations:** Never remove Framer Motion. Spring physics `stiffness: 100` for item variants.
7. **Grid lines:** Live in `globals.css` body selector ONLY. Never add per-component grid duplicates.
8. **Content rules:** No em-dashes (`—`). Use ` - ` instead. "AI-ML" not "Deep Learning".
9. **Easter eggs:** Both triggers (Genesis Block & L-Protocol) must remain functional whenever Footer or Navbar is modified.
10. **Tone:** The application must feel like an impressive, high-density Apple "OS" aimed at Banking/Finance recruiters. Keep copy sharp and professional.
