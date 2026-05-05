# BRAIN ARCHITECTURE — The Complete Beginner's Guide

**Last Updated:** May 5, 2026  
**Purpose:** Understand every folder, file, and connection inside this portfolio's intelligence layer.

---

## 1. THE BIG PICTURE — What Is The Brain?

The `brain/` folder is the **centralized intelligence layer** of this portfolio website. Think of it like a personal Wikipedia — it stores everything about Tharun Gajula's career, projects, skills, and experience in structured markdown files.

But it's not just a dump of files. It's a **compilation pipeline**:

```
RAW SOURCE DOCUMENTS (messy, unstructured)
        ↓ [compiled via SCHEMA.md rules]
WIKI PAGES (structured, interlinked)
        ↓ [consumed by]
DATA FILES (TypeScript) → COMPONENTS (React) → LIVE WEBSITE
```

The brain exists to solve one problem: **how do you take a messy pile of career documents and turn them into a structured, navigable, interactive portfolio?**

---

## 2. FOLDER TREE — Every Folder & File

```
brain/
├── SCHEMA.md                          ← The rulebook for compiling wiki pages
├── .obsidian/                         ← Obsidian app config (for local graph viewing)
│   ├── app.json
│   ├── appearance.json
│   ├── core-plugins.json              ← Which Obsidian plugins are active
│   ├── graph.json                     ← Physics settings for Obsidian's graph view
│   └── workspace.json                 ← Obsidian window/tab layout
│
├── raw/                               ← THE INPUT LAYER (messy source documents)
│   ├── analytics/                     ← 8 detailed analytics project writeups
│   │   ├── lending-club.md            (68KB — flagship, 2437 lines)
│   │   ├── bank-churn.md              (32KB)
│   │   ├── cartpole-rl.md             (29KB)
│   │   ├── employee-retention.md      (29KB)
│   │   ├── socio-economic.md          (39KB)
│   │   ├── twitter-sentiment.md       (37KB)
│   │   ├── antidiabetic-forecast.md   (26KB)
│   │   └── nifty100-portfolio.md      (25KB)
│   │
│   ├── education/                     ← Education placeholders (skeleton files)
│   │   ├── griet-btech.md             (80B — empty template)
│   │   ├── iisc-deep-learning.md      (87B — empty template)
│   │   └── nibm-pgdm.md              (77B — empty template)
│   │
│   ├── experience/                    ← Work experience placeholders
│   │   ├── jana-bank.md               (81B — empty template)
│   │   ├── lentra-ai.md               (81B — empty template)
│   │   ├── freelance-consulting.md    (92B — empty template)
│   │   └── yadnya-academy.md          (86B — empty template)
│   │
│   ├── products/                      ← Omni-Dive reports for each product
│   │   ├── yukti-os-context.md        (8KB — full technical deep-dive)
│   │   ├── quant-os-context.md        (8KB)
│   │   ├── curiosity-os-context.md    (8KB)
│   │   ├── mila-context.md            (8KB)
│   │   └── pause-context.md           (8KB)
│   │
│   ├── profile/                       ← Master identity documents
│   │   ├── master-source-v4.md        (27KB — THE master source of truth)
│   │   ├── linkedin-profile.md        (14KB — scraped LinkedIn)
│   │   └── resume-latest.md           (5KB — current resume text)
│   │
│   └── strategy/                      ← Job search strategy (placeholders)
│       ├── founder-target-list.md     (40B — empty)
│       └── outreach-notes.md          (35B — empty)
│
└── wiki/                              ← THE OUTPUT LAYER (compiled, structured)
    ├── index.md                       ← Master index linking ALL wiki pages
    │
    ├── entities/                      ← People & organizations (7 pages)
    │   ├── tharun-gajula.md           (3.5KB — central hub page)
    │   ├── jana-small-finance-bank.md (1.6KB)
    │   ├── lentra-ai.md               (1.7KB)
    │   ├── yadnya-academy.md          (1.1KB)
    │   ├── iisc-bangalore.md          (1.2KB)
    │   ├── nibm-pune.md               (1.3KB)
    │   └── griet-hyderabad.md         (1.2KB)
    │
    ├── projects/                      ← One page per project (13 pages)
    │   ├── lending-club.md            (2.8KB)
    │   ├── bank-churn.md              (2.3KB)
    │   ├── cartpole-rl.md             (2.8KB)
    │   ├── employee-retention.md      (2.3KB)
    │   ├── socio-economic.md          (2.1KB)
    │   ├── twitter-sentiment.md       (2.4KB)
    │   ├── antidiabetic-forecast.md   (2.2KB)
    │   ├── nifty100-portfolio.md      (2.5KB)
    │   ├── yukti-os.md                (2.6KB)
    │   ├── quant-os.md                (2.9KB)
    │   ├── curiosity-os.md            (2.8KB)
    │   ├── mila.md                    (3.0KB)
    │   └── pause.md                   (2.5KB)
    │
    ├── concepts/                      ← Reusable ideas/skills (7 pages)
    │   ├── credit-risk-modeling.md    (2.7KB)
    │   ├── knowledge-graphs.md        (2.5KB)
    │   ├── ai-native-products.md      (2.7KB)
    │   ├── reinforcement-learning.md  (2.1KB)
    │   ├── time-series-forecasting.md (1.9KB)
    │   ├── modern-portfolio-theory.md (2.1KB)
    │   └── nlp-text-classification.md (1.9KB)
    │
    └── syntheses/                     ← Cross-cutting narrative pages (2 pages)
        ├── career-narrative.md        (5.1KB — the 3-act career arc)
        └── capability-map.md          (5.8KB — the God-Mode Stack)
```

**Total wiki pages: 29** (7 entities + 13 projects + 7 concepts + 2 syntheses)

---

## 3. THE RAW FOLDER — What Goes In

### 3.1 What "Raw" Means

The `raw/` folder holds **original, unprocessed source documents**. These are the messy real-world files — resumes, LinkedIn scrapes, project notebooks, product context reports. They are NOT meant to be clean or structured. They are the **input** to the compilation process.

### 3.2 The Six Raw Subfolders

| Subfolder | What It Contains | Status |
|-----------|-----------------|--------|
| `raw/analytics/` | Full technical writeups of all 8 analytics projects. These are massive (25-68KB each) detailed notebooks explaining every algorithm, every decision, every line of code. | **RICH** — fully populated |
| `raw/products/` | "Omni-Dive" context reports for each of the 5 product OS systems. Generated by AI extraction, covering architecture, algorithms, psychology, business model. | **RICH** — fully populated |
| `raw/profile/` | The 3 master identity documents: `master-source-v4.md` (the God-Mode master source of truth), `linkedin-profile.md` (scraped), `resume-latest.md`. | **RICH** — fully populated |
| `raw/education/` | Placeholder skeleton files for IISc, NIBM, GRIET. Just headers, no content yet. | **EMPTY** — templates only |
| `raw/experience/` | Placeholder skeleton files for Jana Bank, Lentra AI, Yadnya, Freelance. Just headers. | **EMPTY** — templates only |
| `raw/strategy/` | Placeholder files for job search targets and outreach notes. | **EMPTY** — templates only |

### 3.3 The Key Raw Files (The Important Ones)

**`raw/profile/master-source-v4.md`** (27KB) — This is THE master file. It contains:
- Positioning direction (what to emphasize, what to suppress)
- All work experience with confirmed scope and positioning notes
- Complete analytics track summary with all 8 projects detailed
- Complete product builder track with all 5 OS systems detailed
- Spatial architecture capabilities
- The God-Mode Stack (full skills inventory)
- Education and certifications
- The "₹1 Crore Pitch" professional summary

**`raw/analytics/lending-club.md`** (68KB, 2437 lines) — The largest raw file. A complete beginner-friendly writeup of the entire credit risk pipeline (PD → LGD → EAD → Expected Loss → CECL → Stress Testing). This is the "flagship" project.

**`raw/products/yukti-os-context.md`** (8KB) — Example of an Omni-Dive report. Covers: Executive Identity, Technical Architecture, Math/Algorithm Logic, Psychology/Domain Reality, Philosophical Red Lines, Core Workflows, Business Model, Builder Proof Points.

### 3.4 How Raw Files Get Used

Raw files are **read by an LLM** (or by hand) and **compiled into wiki pages** following the rules in `SCHEMA.md`. The raw file is cited as the `source` in the wiki page's YAML frontmatter. Example:

```yaml
# In wiki/projects/lending-club.md:
sources:
  - brain/raw/analytics/lending-club.md    ← compiled FROM this raw file
  - brain/raw/profile/master-source-v4.md  ← and this one
```

---

## 4. THE SCHEMA — The Compilation Rulebook

`brain/SCHEMA.md` is the **instruction manual** for turning raw files into wiki pages. It defines:

### 4.1 Four Page Types

| Type | Purpose | Example |
|------|---------|---------|
| `entity` | A person, company, or institution. ONE page per entity. | `jana-small-finance-bank.md` |
| `project` | A single project. ONE page per project. | `lending-club.md` |
| `concept` | A reusable idea, skill, or framework. | `credit-risk-modeling.md` |
| `synthesis` | Cross-cutting narrative pulling from MULTIPLE pages. | `career-narrative.md` |

### 4.2 Required Structure Per Type

**Every page** must have YAML frontmatter:
```yaml
---
title: [Page Title]
type: [entity | concept | project | synthesis]
created: [date]
updated: [date]
sources: [list of raw files this was compiled from]
---
```

**Project pages** must include: what it is, the problem, technical approach, key metrics, links, tags.

**Entity pages** must include: what it is, Tharun's role, what was built, skills demonstrated.

**Concept pages** must include: plain-language definition, how Tharun applied it, which projects demonstrate it.

**Synthesis pages** must: pull insights from MULTIPLE wiki pages and create cross-cutting narratives.

### 4.3 The Wikilink Rule

Pages connect to each other using `[[wikilinks]]`. Example from `career-narrative.md`:
```markdown
At [[Jana Small Finance Bank]], as Manager — Credit Risk Analytics,
engineering analytics frameworks... cemented fluency in [[Credit-Risk Modeling]]
```

This creates a **bidirectional link** — when you open either page in Obsidian, you see the connection.

### 4.4 The Golden Rules
- Never invent information — only compile what exists in `raw/`
- Always cite which raw source file the information came from
- If information conflicts between sources, flag it clearly
- Keep each page focused on ONE thing

---

## 5. THE WIKI — What Comes Out

### 5.1 The Index (wiki/index.md)

This is the **master table of contents**. It lists all 29 wiki pages organized by type:
- 7 Entities (Tharun, Jana Bank, Lentra, Yadnya, IISc, NIBM, GRIET)
- 5 Products (Yukti OS, Quant OS, Curiosity OS, Mila, Pause)
- 8 Analytics projects
- 7 Concepts
- 2 Syntheses

### 5.2 How Wiki Pages Are Interlinked

Every wiki page has a `## Connected Pages` section at the bottom listing its links. Here's how the connections work:

```
                    ┌─────────────────┐
                    │  tharun-gajula  │ (central hub)
                    └────────┬────────┘
           ┌─────────┬──────┼──────┬──────────┐
           ▼         ▼      ▼      ▼          ▼
      [Jana Bank] [Lentra] [IISc] [NIBM]   [GRIET]
           │                  │      │
           ▼                  ▼      ▼
    [Lending Club]←──→[Credit-Risk Modeling]←──→[NIBM Pune]
           │
           ▼
      [Quant OS]←──→[Knowledge Graphs]←──→[Curiosity OS]
                                              │
                                              ▼
                                    [AI-Native Products]
                                     │    │    │    │
                                     ▼    ▼    ▼    ▼
                              [Yukti][Mila][Pause][Quant OS]
```

**Key pattern:** Concepts act as **bridges** between projects and entities. For example:
- `credit-risk-modeling` connects Lending Club (project) ↔ Jana Bank (entity) ↔ NIBM (entity)
- `knowledge-graphs` connects Quant OS (project) ↔ Curiosity OS (project)
- `ai-native-products` connects all 5 product OS systems

### 5.3 The Two Synthesis Pages

These are the most valuable pages because they weave everything together:

**`career-narrative.md`** — The Three-Act Arc:
- Act 1 (2019-2022): Institutional Foundation at Jana Bank + Lentra
- Act 2 (2022-2025): The Wilderness Years — independent skill acquisition + 8 analytics projects
- Act 3 (2026+): The 90-Day Sprint — 5 product OS systems

**`capability-map.md`** — The God-Mode Stack organized into 3 tracks:
- Track 1: Institutional Credit-Risk & Systems Foundation
- Track 2: Analytics / Quant / ML
- Track 3: Product Builder / Operating Systems

---

## 6. THE OBSIDIAN CONNECTION

The `brain/.obsidian/` folder makes the entire `brain/` directory openable as an **Obsidian vault**. Obsidian is a local-first note-taking app that renders `[[wikilinks]]` as a visual graph.

### 6.1 What This Means Practically

You can open the `brain/` folder in Obsidian and immediately see:
- All 29 wiki pages as navigable notes
- A **visual graph view** showing all connections between pages
- Backlinks (which pages link TO this page)
- A file explorer for raw and wiki folders

### 6.2 Graph Physics (graph.json)

The Obsidian graph view uses physics simulation settings:
```json
{
  "centerStrength": 0.518,    // How strongly nodes pull toward center
  "repelStrength": 10,        // How strongly nodes push apart
  "linkStrength": 1,          // How strongly connected nodes pull together
  "linkDistance": 250          // Default distance between linked nodes
}
```

This creates a force-directed layout where connected pages cluster together — similar to the Neural Graph on the live website.

### 6.3 Core Plugins Enabled

Key Obsidian plugins: `graph` (visual graph), `backlink` (see what links here), `outgoing-link`, `tag-pane`, `page-preview`, `daily-notes`, `templates`, `outline`.

---

## 7. HOW THE NEURAL GRAPH IS FORMED (The Live Website Graph)

The Neural Graph on the portfolio website is **separate** from the Obsidian graph. It's built from `data/neuralData.ts` and rendered by `components/NeuralGraph.tsx`.

### 7.1 The Data Source: neuralData.ts

This file defines two things:

**NODES** (22 total) — Each node has:
```typescript
{
  id: string,          // unique identifier ("lending", "yukti", etc.)
  name: string,        // display label ("Lending Club", "Yukti OS")
  group: number,       // color cluster (0-4)
  val: number,         // visual size (6-25)
  description?: string // popup text when clicked
  link?: string        // external URL (GitHub or live prototype)
}
```

**LINKS** (24 total) — Each link connects two nodes:
```typescript
{ source: "core", target: "analytics" }  // Tharun → Analytics cluster
{ source: "lending", target: "jana" }    // Lending Club → Jana Bank
```

### 7.2 The Five Groups (Color Clusters)

| Group | Name | Color | Nodes |
|-------|------|-------|-------|
| 0 | Core | White `#FFFFFF` | Tharun Gajula (center) |
| 1 | Analytics & Quant | Cyan `#00FFFF` | Analytics hub + 8 project nodes |
| 2 | Products | Emerald `#10B981` | Products hub + 5 OS nodes |
| 3 | Foundation | Slate `#64748B` | Foundation hub + Jana, Lentra, IISc, NIBM |
| 4 | Adaptive Craft | Purple `#A855F7` | Adaptive Craft (standalone) |

### 7.3 The Link Structure (How Nodes Connect)

**Tier 1 — Core to Hubs (4 links):**
```
core → analytics
core → product
core → foundation
core → adaptive
```

**Tier 2 — Hubs to Children (16 links):**
```
analytics → lending, churn, retention, socioeconomic, twitter, cartpole, antidiabetic, nifty
product → yukti, quantos, curiosity, mila, pause
foundation → jana, lentra, iisc, nibm
```

**Tier 3 — Cross-Links (4 links):**
These are the most interesting — they show connections ACROSS clusters:
```
lending → jana           (project proved by institutional experience)
cartpole → iisc          (project taught at IISc programme)
churn → iisc             (neural networks from IISc Deep Learning)
nifty → nibm             (portfolio theory from NIBM Finance)
quantos → lending        (Quant OS showcases Lending Club)
quantos → cartpole       (Quant OS showcases CartPole RL)
curiosity → quantos      (Curiosity OS parallels Quant OS graph architecture)
```

### 7.4 The Rendering Engine: NeuralGraph.tsx

The graph is rendered using `react-force-graph-2d` (dynamically imported with `ssr: false`).

**Physics tuning:**
```typescript
fgRef.current.d3Force('charge').strength(-250);  // nodes repel each other
fgRef.current.d3Force('link').distance(80);       // linked nodes stay ~80px apart
```

**Visual rendering (Canvas API):**
Each node is drawn as:
1. An **outer glow** (shadow with node's cluster color)
2. A **solid inner circle** (size based on `val * 0.4`)
3. A **precision targeting ring** (thin stroke circle)
4. A **monospace label** (only visible when zoomed in past 1.5x)

**Animated particles:**
Links show directional particles (2 per link, speed 0.006) colored by the source node's group. This creates the "data flowing through the network" effect.

**Interactions:**
- Click a node → `onNodeClick` fires → popup HUD appears with description + link
- Drag nodes → repositions them in the physics simulation
- Zoom/pan → full 2D navigation

### 7.5 The Popup HUD (app/page.tsx)

When a node is clicked, `activeNode` state is set, and a glassmorphic popup appears showing:
- Node name in uppercase with tracking
- Description text
- "OPEN PROTOTYPE →" or "VIEW ON GITHUB →" button (if the node has a `link`)

---

## 8. HOW THE DATA PIPELINE WORKS END-TO-END

Here's the complete flow from raw documents to pixels on screen:

```
┌──────────────────────────────────────────────────────────┐
│  LAYER 1: RAW SOURCES (brain/raw/)                       │
│  Messy documents: resume, LinkedIn, project notebooks,   │
│  Omni-Dive reports, master source v4                     │
└──────────────────────┬───────────────────────────────────┘
                       │ Compiled via SCHEMA.md rules
                       ▼
┌──────────────────────────────────────────────────────────┐
│  LAYER 2: WIKI (brain/wiki/)                             │
│  29 structured markdown pages with [[wikilinks]]         │
│  Viewable in Obsidian as a visual knowledge graph        │
└──────────────────────┬───────────────────────────────────┘
                       │ Key facts extracted into
                       ▼
┌──────────────────────────────────────────────────────────┐
│  LAYER 3: DATA FILES (data/)                             │
│  neuralData.ts → nodes + links for the graph             │
│  systems.ts → project cards for WorkOverview             │
│  buildlog.ts → daily build diary entries                 │
│  lib/ai-context.ts → full context for AI chatbot         │
└──────────────────────┬───────────────────────────────────┘
                       │ Imported by
                       ▼
┌──────────────────────────────────────────────────────────┐
│  LAYER 4: COMPONENTS (components/)                       │
│  NeuralGraph.tsx → renders the 2D force graph            │
│  WorkOverview.tsx → renders the 4-pillar capability cards │
│  EvolutionTimeline.tsx → renders career timeline         │
│  ProjectArc.tsx → renders mission control dashboard      │
│  ConnectPage.tsx → renders contact page                  │
│  SplineAvatar.tsx → renders 3D avatar                    │
└──────────────────────┬───────────────────────────────────┘
                       │ Assembled by
                       ▼
┌──────────────────────────────────────────────────────────┐
│  LAYER 5: APP SHELL (app/page.tsx)                       │
│  Single-page OS with tab navigation:                     │
│  THESIS (3D avatar) | WORK (Overview + Graph) |          │
│  STORY (Timeline) | CONNECT (Contact)                    │
│  + AI Chat Panel (powered by lib/ai-context.ts)          │
└──────────────────────────────────────────────────────────┘
```

---

## 9. THE OTHER DATA FILES (Outside Brain)

### 9.1 data/neuralData.ts
Defines the graph structure. 22 nodes, 24 links. Interfaces: `NeuralNode`, `NeuralLink`, `NeuralData`. This is the ONLY file the Neural Graph reads from.

### 9.2 data/systems.ts
Defines 6 project cards used by `WorkOverview.tsx`. Each has: id, title, label, description, status, href, ctaLabel, tags. Statuses: "Live Concept Prototype", "Live Archive", "Archive".

### 9.3 data/buildlog.ts
A 5-entry daily build diary tracking the portfolio's construction. Each entry: day number, date, title, what was learned, tags.

### 9.4 lib/ai-context.ts
A massive 155-line string constant (`THARUN_CONTEXT`) containing EVERYTHING the AI chatbot needs to know. This is essentially the brain/wiki content flattened into a single prompt. Sections: Professional Summary, Work Experience, Education, Products Built, Analytics Portfolio, Technical Skills, What Tharun Is Looking For, Contact.

### 9.5 lib/utils.ts
Single `cn()` helper combining `clsx` + `tailwind-merge` for conditional CSS classes.

---

## 10. THE APP SHELL — How Everything Renders

### 10.1 app/layout.tsx
- Loads 3 Google Fonts: Inter (body), Outfit (headings), JetBrains Mono (monospace)
- Sets metadata for SEO
- Creates the ambient background: two cyan glowing orbs + a 64px grid overlay
- Loads KaTeX CSS for math rendering

### 10.2 app/page.tsx (The OS Controller)
This is the **main brain** of the website. It manages:

**State:**
- `activeTab`: 'thesis' | 'neural' | 'evolution' | 'connect'
- `activeNode`: currently clicked graph node (or null)
- `isChatOpen`: AI chat panel visibility
- `workView`: 'overview' | 'graph' (sub-view within WORK tab)

**Rendering logic:**
- `thesis` → SplineAvatar (3D robot, fixed position, touch-none)
- `neural` + overview → WorkOverview (4-pillar cards)
- `neural` + graph → NeuralGraph (2D force graph)
- `evolution` → EvolutionTimeline (scrollable career timeline)
- `connect` → ConnectPage (contact info)

**UI Elements:**
- Sticky header with gradient "THARUN GAJULA" logo (resets to thesis on click)
- Work view toggle (Overview / Graph switcher)
- Floating "SYSTEM: ONLINE" pill (masks Spline watermark on desktop)
- "talk to me" CTA on thesis page
- Reset View button on graph subview
- Bottom navigation dock (WORK / STORY / CONNECT + ASK AI)
- Scanline overlay effect (subtle CRT monitor lines)
- AI Chat Panel (sliding panel)

---

## 11. THE SHELF — Legacy/Archive Storage

The `shelf/` folder stores **archived code** from previous iterations. Structure:
```
shelf/
├── app/simulation/          ← Old simulation feature
├── atlas/modules/           ← Old atlas/module system
├── components/
│   ├── 3d/                  ← Old 3D components
│   ├── layout/              ← Old layout components
│   ├── simulation/          ← Old simulation components
│   └── ui/                  ← Old UI components
├── data/simulation/         ← Old simulation data
├── docs/                    ← FOXO simulation docs
│   ├── FOXO_SIMULATION_MASTER_REFERENCE.md
│   └── SIMULATION_FOUNDER_WALKTHROUGH.md
└── types/simulation.ts      ← Old simulation types
```

This is NOT active code. It's kept for reference in case old features need to be resurrected.

---

## 12. OTHER ROOT FILES

| File | Purpose |
|------|---------|
| `PROJECT_CONTEXT.md` | The AI agent's single source of truth. Tech stack, folder architecture, UI architecture, design tokens, module status, replication guide. |
| `COOKIE_JAR_OMNI_SYNC_2026-04-27.md` | Audit report from "Operation Cookie Jar" — purge log, component blueprint, design system state, mobile vulnerabilities. |
| `README.md` | Public-facing project description for GitHub. |
| `base_library/` | Contains one research report on personal career OS systems. Reference material, not code. |
| `.gitignore` | Excludes node_modules, .env, .next, etc. |
| `.env.local` | Environment variables (55 bytes — likely just an API key). |

---

## 13. WHAT'S POPULATED vs WHAT'S EMPTY

### ✅ Fully Built
- `raw/analytics/` — All 8 project writeups (massive, detailed files)
- `raw/products/` — All 5 Omni-Dive reports
- `raw/profile/` — Master source, LinkedIn, Resume
- `wiki/` — All 29 pages compiled and interlinked
- `data/neuralData.ts` — Complete graph with 22 nodes, 24 links
- `lib/ai-context.ts` — Full AI chatbot context
- All active components

### ⚠️ Skeleton/Empty
- `raw/education/` — 3 files with headers only, no content
- `raw/experience/` — 4 files with headers only, no content
- `raw/strategy/` — 2 files with titles only
- `content/` — Empty directory
- `scripts/` — Empty directory

### 🗄️ Legacy/Archived
- `shelf/` — Old simulation and atlas code
- `components/layout/`, `components/outreach/`, `components/ui/` — Legacy folders
- `data/outreach/` — Legacy outreach data
- `types/outreach.ts` — Legacy type definitions

---

## 14. HOW TO ADD NEW CONTENT (The Workflow)

### Adding a new project:
1. Write a detailed raw file → `brain/raw/analytics/new-project.md` or `brain/raw/products/new-product.md`
2. Compile a wiki page → `brain/wiki/projects/new-project.md` (following SCHEMA.md rules)
3. Add `[[wikilinks]]` in the new page to connect to existing pages
4. Update `brain/wiki/index.md` to include the new page
5. Add a node + links in `data/neuralData.ts`
6. Update `lib/ai-context.ts` with the new project info
7. Optionally update `data/systems.ts` for the WorkOverview cards

### Adding a new concept:
1. Create `brain/wiki/concepts/new-concept.md`
2. Link it from all relevant project and entity pages
3. Update `brain/wiki/index.md`

### Filling empty raw files:
The education and experience skeleton files (`raw/education/`, `raw/experience/`) are ready to be populated. Each has section headers. Fill in the details, then the wiki pages (which already exist) can be enriched.

---

*End of Brain Architecture Documentation.*
