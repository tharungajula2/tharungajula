# Tharun Gajula

An enterprise-grade, open-source experimental lab and systems-thinking workspace built by **Tharun Kumar Gajula** (Learning Systems Builder). Engineered using Next.js 16, this application acts as the foundational headquarters for systems thinking, AI-native workflows, and experimental builds.

> **system_status: ACTIVE // V10.0 IDENTITY CONSOLIDATION**

---

## 📚 Core Documentation (READ FIRST)

To understand the overarching mission, the architectural constraints, the 3D Zettelkasten knowledge graph, and the component design system, all context has been rigidly aggregated into a single master document:

*   👉 **[PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)**: The Master Narrative & Engineering Manual. Contains the User Identity, Design System constraints, KaTeX implementations, routing maps, and architectural rules. **Feed this to any autonomous agent to maintain continuity.**

## 🚀 Key Features

- **Interactive Concept Maps**: A bidirectional, graph-mapped knowledge baseline (`/map`) that visualizes core concepts as a living 3D WebGL neural network. Includes a high-density, React-state powered Filter & Sort retrieval archive.
- **Terminal App Routing**: A unified, terminal browser aesthetic leveraging pure Next.js routes (`/map`, `/profile`, `/contact`) over messy modal popups.
- **Native Math Capabilities (KaTeX)**: Advanced mathematical formulas and cognitive framework equations (`$E=mc^2$`) render native to the markdown engine via KaTeX, circumventing Next.js Turbopack global compilation roadblocks via custom polyfilling.
- **3D Reactor Core Architecture**: Hardware-accelerated, continuously rotating geometric meshes powered by React Three Fiber operating as a fluid, zero-index background infrastructure for OS pages.
- **Pure Glassmorphism Design**: Complete adherence to a premium dark-mode UI utilizing highly translucent, shadow-inset styling mapping (`bg-slate-900/30 backdrop-blur-2xl border-white/10`).

## 🛠 Tech Stack

*   **Framework:** Next.js 16.1.6 (App Router + Turbopack)
*   **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` engine)
*   **3D Render Engine:** Three.js + `@react-three/fiber` + `@react-three/drei`
*   **Knowledge Graph UI:** `react-force-graph-2d`
*   **Markdown Parsing:** `gray-matter` + `react-markdown` + `remark-math` + `rehype-katex`
*   **Icons:** `lucide-react`
*   **Typography System:** Inter (body), Outfit (H1/Brand), JetBrains Mono (Terminal Tracking)

## ⚡ Deployment & Installation

First, pull the Tharun Gajula codebase:

```bash
git clone https://github.com/tharungajula2/tharungajula.git
cd tharungajula
```

Install packages and boot the local laboratory server:

```bash
npm install
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to initialize the OS.
