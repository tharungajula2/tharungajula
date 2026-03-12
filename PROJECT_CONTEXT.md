# CURIOSITY OS // MASTER PROJECT CONTEXT
**Version: 7.0 — The Learning Lab Pivot (2026-03-12)**

> **AI AGENT DIRECTIVE:** This is the single source of truth for the Tharun OS project. Feed this file to any new AI agent to fully replicate the project — its identity, design system, architecture, data schemas, component implementations, hidden layers, and encoding rules. All information has been verified against the live codebase.

---

## 1. THE IDENTITY & MISSION

| Field | Value |
|---|---|
| **Name** | Tharun Kumar Gajula |
| **Archetype** | Curriculum Architect & Builder |
| **Location** | Bengaluru, India |
| **Background** | Engineering × Education × AI Symbiosis |
| **Philosophy** | "AI is a million times better at following recipes. The human mind must evolve to command the machine rather than compete with it." |
| **Site Mission** | "Tharun Learning Lab" — A digital brain and open-source R&D hub serving as the foundation for CURIOSITY OS. Built to replace industrial-era rote memorization with First Principles thinking, AI orchestration, and cognitive engineering for the next generation. |
| **Hero Tagline** | `Rewiring the Future of Education.` |
| **Hero Description** | "Welcome to Tharun Learning Lab. I am building CURIOSITY OS—a radical ecosystem replacing industrial-era memorization with AI symbiosis, cognitive engines, and human resilience. These are my daily experiments." |

---

## 2. THE THARUN OS DESIGN SYSTEM (COMPLETE SPEC)

> This is the visual DNA. Every component must conform to these tokens to maintain the Apple-esque premium glassmorphic feel combined with high-tech quantitative terminal aesthetics.

### 2A. Global Background & Grid
```css
/* app/layout.tsx & globals.css */
background-color: #020617;  /* Tailwind slate-950 base */
/* Grid overlay */
background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 32px 32px;
min-height: 100vh;
```
- All page-level wrappers use `bg-slate-950` (or `bg-transparent` to inherit base layout)
- Two ambient refractive orbs exist in `layout.tsx`: `bg-cyan-600/20` at the top-left and bottom-right to create uniform glassmorphism refractions.
- **Custom Scrollbar:** A sleek 6px transparent track with a cyan hover styled thumb overrides webkit-scrollbar defaults globally.

### 2B. Surface Variants

**HUD Panel** (Navbar, Dock):
```
bg-slate-900/30 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),_0_0_20px_rgba(0,0,0,0.5)]
```

**Reactor Core Card** (UI elements, Comm cards):
```
bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all
```

### 2C. Typography System

| Role | Classes |
|---|---|
| **Brand / Page H1s** | `font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400` |
| **Eyebrow / System Label** | `font-mono uppercase tracking-widest text-xs font-bold text-cyan-400` |
| **Nav Links (Top HUD & Dock)** | `font-mono uppercase tracking-widest text-[8px] md:text-[10px] text-slate-400 hover:text-cyan-400` |
| **Body Text** | `font-body text-sm leading-relaxed text-slate-300` |

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
| `/` | `app/page.tsx` | `bg-transparent` | Home Desktop: Navbar + Hero Text + Dock |
| `/map` | `app/map/page.tsx` | `bg-slate-950` | Neural Map Knowledge Graph + Filtering/Sorting Retrieval Archive |
| `/profile` | `app/profile/page.tsx` | `bg-slate-950` | Dedicated App Page: The Manifesto and Architect Capabilities |
| `/contact` | `app/contact/page.tsx` | `bg-slate-950` | Dedicated App Page: Communications relay / secure channels |
| `/notes/[id]` | `app/notes/[id]/page.tsx` | `bg-slate-950` | Individual Zettelkasten note rendered from Markdown (KaTeX enabled) |

---

## 5. COMPONENT ARCHITECTURE (COMPLETE)

### 5A. Layout Components

#### `components/layout/navbar.tsx`
- **Type:** Client Component (`use client`)
- **Position:** `fixed top-0 z-50`
- **Scale:** `h-14 md:h-16` with proportional responsive padding for mobile vs desktop.
- **Components:** `<TllLogo />`, `THARUN OS` brand, `<Home />` icon, and Real-time Indian Standard Time (IST) clock ticker with pulsing Emerald status dot.

#### `components/layout/footer.tsx` (THE APP DOCK)
- **Position:** Floating Pill HUD Panel (`fixed bottom-6 left-1/2 -translate-x-1/2`)
- **Items:** 4 Core App Pillars:
  1. `<Link href="/">` (HOME)
  2. `<Link href="/profile">` (ABOUT)
  3. `<Link href="/map">` (MAP)
  4. `<Link href="/contact">` (CONTACT)
- **Easter Egg:** `© 2026 Tharun Kumar Gajula.` copyright text in bottom right corner. Clicking exactly **7 times** opens `GenesisModal` (a typewriter dedication).

### 5B. UI Components (Abstract Displays)

#### `components/ui/ai-core.tsx`
- **Role:** The 3D abstract screensaver for the OS (utilized in experimental flows).
- **Tech:** `@react-three/fiber` + `@react-three/drei`.
- **Geometry:** A wireframe `IcosahedronGeometry` rotating seamlessly on its axes utilizing `useFrame`, rendered as cyan lines (`#22d3ee`).

---

## 6. CONTENT / LAB NOTES (ZETTELKASTEN OVERHAUL)

The entire OS is powered by a locally hosted, Markdown-driven Digital Brain housed in `content/notes/`. The application converts these isolated text files into a living, interconnected 3D Neural Map.

### The Quant Math Infrastructure (KaTeX)
The note rendering engine natively supports **LaTeX Mathematical Formulas** for complex cognitive and educational models.
- Inline equations use `$` (e.g., `$E=mc^2$`).
- Block equations use `$$`.
- **Compilation:** `react-markdown` utilizes `remark-math` and `rehype-katex`.

### Frontmatter Schema (`lib/posts.ts`)
```typescript
export type PostData = {
  id: string;        // filename without .md
  title: string;
  date: string;      // YYYY-MM-DD
  tag: string;       // e.g. "COGNITIVE", "CYBERNETIC", "SANDBOX"
  status?: string;   // "EXPERIMENT", "VERIFIED", "CORE_NODE"
  excerpt: string;   // Clean 1-sentence descriptor for the UI cards
  content?: string;  // full markdown body + KaTeX equations
  outboundLinks?: string[]; // Automated standard bidirectional linking extracted via [[WikiLinks]]
};
```

---

## 7. TECHNICAL ARCHITECTURE

### Stack
| Layer | Tech |
|---|---|
| Framework | Next.js 16.1.6 (App Router) + Turbopack |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in globals.css) |
| Icons | `lucide-react` |
| 3D Engine | Three.js + React Three Fiber + Drei |
| Markdown Parser | `gray-matter` + `ReactMarkdown` + `remark-math` + `rehype-katex` |
| Graph UI | `react-force-graph-2d` |
| Deployment | Vercel |

### Directory Structure
```
/app
  layout.tsx                — Includes KaTeX stylesheet, global fonts, twin cyan ambient orbs, grid, Footer mount
  page.tsx                  — Destkop OS Entry (Hero Text)
  /map/page.tsx             — Knowledge Graph 2D rendering + Retrieval Archive
  /profile/page.tsx         — Manifesto & Core Capabilities
  /contact/page.tsx         — Communications terminal application
  /notes/[id]/page.tsx      — Dynamic Zettelkasten note viewer with Math plugins
/components
  /layout/                  — Top HUD Navbar, App Dock Footer
  /notes/                   — Markdown search archive (with Filter/Sort mapping) and Graph elements
  /ui/                      — Modals, Logo, 3D AiCore
/content/notes/             — Curiosity OS Master Templates (First Principles, Dopamine Defense, Commander Prompts)
/lib/                       — Utility mapping (posts, protocols, katex-setup)
```

---

## 8. ENCODING RULES FOR AI AGENTS

> These are hard constraints. Violating them breaks the quantitative terminal design system.

1. **Background:** Always `bg-slate-950` on all standard pages.
2. **App Architecture:** Never generate modal overlay popups for core applications. Always build dedicated `/appname` pages matching the `/map` terminal UI.
3. **App Dock Modifications:** `footer.tsx` acts purely as an OS Application dock. Keep items symmetrical and cleanly distributed.
4. **Zettelkasten Parsing:** The `post.ts` lib dynamically reads the `[[WikiLinks]]` from the body of markdown files. Never hardcode links; always use the double bracket syntax to trigger the graph node edges.
5. **Tone:** The application must feel like an impressive, high-density dashboard utilized by an institutional R&D team. No corporate fluff, just precision elements supporting First-Principles educational structures.
