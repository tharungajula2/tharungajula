# THE THARUN OS // MASTER PROJECT CONTEXT
**Version: 6.0 — The Terminal & Quant Redux (2026-03-05)**

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
| **Charlie Munger Quote** | "I constantly see people rise in life who are not the smartest, sometimes not even the most diligent, but they are learning machines..." (Full text in QuoteSection component) |

---

## 2. THE THARUN OS DESIGN SYSTEM (COMPLETE SPEC)

> This is the visual DNA. Every component must conform to these tokens to maintain the Apple-esque premium feel combined with high-tech quantitative terminal aesthetics.

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
- **Custom Scrollbar:** A sleek 6px transparent track with a styled thumb overrides webkit-scrollbar defaults globally.

### 2B. Surface Variants

**HUD Panel** (Navbar, Dock):
```
bg-slate-900/30 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),_0_0_20px_rgba(0,0,0,0.5)]
```

**Reactor Core Card** (UI elements, Comm cards):
```
bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all
```

### 2C. Typography System

| Role | Classes |
|---|---|
| **Brand / Page H1s** | `font-heading text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400` |
| **Eyebrow / System Label** | `font-mono uppercase tracking-widest text-xs font-bold text-cyan-400` |
| **Nav Links (Top HUD & Dock)** | `font-mono uppercase tracking-widest text-[8px] md:text-[10px] text-slate-400 hover:text-cyan-400` |
| **Body Text** | `font-body text-sm leading-relaxed text-slate-300` |
| **Terminal Navigation** | `font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 hover:text-cyan-400` |
| **Metadata/Date** | `font-mono text-xs text-zinc-500` |

### 2D. Font Variables (defined in `app/layout.tsx`)
```typescript
Inter       → variable: "--font-inter"  → className: font-body
Outfit      → variable: "--font-outfit" → className: font-heading
JetBrains   → variable: "--font-mono"   → className: font-mono
```

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
- Glow filter: `feGaussianBlur stdDeviation="0.6"`

---

## 4. ROUTING & PAGE MAP

The application eschews modal popups in favor of dedicated, full-screen Terminal pages for all core applications, achieving a continuous, unified aesthetic.

| Route | File | Background | Description |
|---|---|---|-----------|
| `/` | `app/page.tsx` | `bg-transparent` | Home Desktop: Navbar + 3D Reactor Core + Dock |
| `/map` | `app/map/page.tsx` | `bg-slate-950` | Neural Map Knowledge Graph (`react-force-graph-2d`) |
| `/profile` | `app/profile/page.tsx` | `bg-slate-950` | Dedicated App Page: Full Resume and capability injection |
| `/contact` | `app/contact/page.tsx` | `bg-slate-950` | Dedicated App Page: Communications relay / secure channels |
| `/notes/[id]` | `app/notes/[id]/page.tsx` | `bg-slate-950` | Individual Zettelkasten note rendered from Markdown (KaTeX enabled) |

---

## 5. COMPONENT ARCHITECTURE (COMPLETE)

### 5A. Layout Components

#### `components/layout/navbar.tsx`
- **Type:** Client Component (`use client`)
- **Position:** `fixed top-0 z-50`
- **Scale:** `h-10 md:h-16` with proportional responsive padding for mobile vs desktop. 
- **Style:** HUD Panel with True Glassmorphism
- **Logo:** `<TllLogo />` + `<span>THARUN OS</span>` scaled natively for mobile (`scale-75`).
- **Data Point:** Real-time Indian Standard Time (IST) clock ticker.
- **Easter Egg:** Logo click counter — 10 clicks triggers `LProtocol`. 

#### `components/layout/footer.tsx` (THE APP DOCK)
- **Type:** Client Component (`use client`)
- **Style:** Floating Pill HUD Panel (`fixed bottom-6 left-1/2 -translate-x-1/2`)
- **Mobile Logic:** `w-[85vw] justify-around` on mobile, `md:w-auto md:justify-center` on desktop for perfect spacing.
- **Items:** 3 Core App Pillars:
  1. `<Link href="/profile">` (icon: User)
  2. `<Link href="/map">` (icon: Network)
  3. `<Link href="/contact">` (icon: Mail)
- **Easter Egg:** `© 2026 Tharun Kumar Gajula.` copyright text in bottom right corner. Clicking exactly **7 times** opens `GenesisModal`.

### 5B. Core Desktop Components

#### `components/ui/ai-core.tsx`
- **Position:** Fixed full screen, `z-0`, behind all UI elements.
- **Role:** The 3D abstract screensaver for the OS.
- **Tech:** `@react-three/fiber` + `@react-three/drei`.
- **Geometry:** A wireframe `IcosahedronGeometry` rotating seamlessly on its axes utilizing `useFrame`, rendered as cyan lines (`#22d3ee`).

### 5C. Full-Page Terminal Views (`/profile`, `/contact`, `/map`)
- **Architecture:** Standardized header patterns (`← RETURN_TO_DESKTOP`) across all app views, entirely removing legacy macOS modal controls.
- **Profile Data Injector:** A direct transcription of the architect's CV spanning Work Experience, Technical Skills, Portfolio Projects, and Academics.
- **Contact Matrix:** Massive glassmorphism hyperlink cards for direct Email and LinkedIn routing.

### 5D. UI Components (Easter Eggs)

#### `components/ui/genesis-modal.tsx`
- **Trigger:** 7 clicks on the copyright label in `footer.tsx`.
- **Payload:** Typewriter animation dedication to Parents.

#### `components/ui/l-protocol.tsx`
- **Trigger:** 10 continuous clicks on the Navbar Logo.
- **Payload:** The Rose L Sparkle overlay dedication.

---

## 6. THE PROTOCOL ECOSYSTEM (`lib/protocols.ts`)

These map specific disciplines to the broader data model. Used in note tagging.

| Slug | Title | Mission Focus |
|---|---|---|
| `meta` | THE SANDBOX | OS Architecture & Infrastructure Documentation |
| `risk_os` | PREDICTIVE RISK | Quantitative Probability, Credit Scoring, Capital Models |
| `product_os` | PRODUCT STRATEGY | 0-to-1 Roadmaps, BRD/FRD, SDLC Execution |
| `data_os` | DATA ENGINEERING | ETL pipelines, ML architectures, Data Lakes |

---

## 7. CONTENT / LAB NOTES (ZETTELKASTEN DIGITAL GARDEN)

### The Quant Math Infrastructure (KaTeX)
The note rendering engine natively supports **LaTeX Mathematical Formulas** for complex quantitative finance models (e.g., Logistic Regression, TF-IDF calculation, XGBoost logic).
- Inline equations use `$` (e.g., `$E=mc^2$`).
- Block equations use `$$`.
- **Compilation:** `react-markdown` utilizes `remark-math` and `rehype-katex`.
- **Next.js Polyfill (`lib/katex-setup.ts`):** Next.js 16 / Turbopack drops the typical `__VERSION__` web-pack definition, causing KaTeX to crash. We intercept this and globally set `globalThis.__VERSION__ = '0.16.8'` prior to the Markdown module evaluation.

### Frontmatter Schema (`lib/posts.ts`)
```typescript
export type PostData = {
  id: string;        // filename without .md
  title: string;
  date: string;      // YYYY-MM-DD
  tag: string;       // e.g. "RISK", "AI-ML"
  protocol?: string; // "0" | "1" | "2" | "3"
  status?: string;   // "POLISHED", "DRAFT"
  excerpt: string;
  content?: string;  // full markdown body + KaTeX equations
  outboundLinks?: string[]; // Automated standard bidirectional linking
};
```

---

## 8. TECHNICAL ARCHITECTURE

### Stack
| Layer | Tech |
|---|---|
| Framework | Next.js 16.1.6 (App Router) + Turbopack |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in globals.css) |
| Animation | Framer Motion |
| 3D Engine | Three.js + React Three Fiber + Drei |
| Markdown Parser | `gray-matter` + `ReactMarkdown` + `remark-math` + `rehype-katex` |
| Graph UI | `react-force-graph-2d` |
| Deployment | Vercel |

### Directory Structure
```
/app
  layout.tsx                — Includes KaTeX stylesheet, global fonts, Footer mount
  page.tsx                  — Destkop OS Entry (Navbar + 3D Core + Suspense)
  /map/page.tsx             — Knowledge Graph 2D rendering
  /profile/page.tsx         — Full CV terminal application
  /contact/page.tsx         — Communications terminal application
  /notes/[id]/page.tsx      — Dynamic Zettelkasten note viewer with Math plugins
/components
  /layout/                  — Top HUD Navbar, App Dock Footer
  /notes/                   — Markdown search archive and Graph elements
  /ui/                      — Modals, Logo, 3D AiCore
/content/notes/             — Raw Markdown files
/lib/                       — Utility mapping (posts, protocols, katex-setup)
```

---

## 9. ENCODING RULES FOR AI AGENTS

> These are hard constraints. Violating them breaks the quantitative terminal design system.

1. **Background:** Always `bg-slate-950` on all standard pages.
2. **App Architecture:** Never generate modal overlay popups for applications. Always build dedicated `/appname` pages matching the `/map` terminal aesthetic.
3. **Typography Scaling:** Never use excessively massive tags (`text-7xl+`). Keep H1 text balanced between `text-3xl md:text-5xl` to maintain the premium dashboard feel.
4. **App Dock Modifications:** `footer.tsx` acts purely as an OS Application dock. Keep items symmetrical and cleanly distributed.
5. **Math Injection:** Any data science or actuarial code must utilize `$$` block math to render cleanly via KateX; never just print math as raw text.
6. **Tone:** The application must feel like an impressive, high-density quantitative dashboard utilized by an institutional risk team. No corporate fluff, just clean precision.
