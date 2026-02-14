# TECHNICAL ARCHITECTURE // THARUN HEALTH LAB
> **VERSION:** 1.0.0
> **FRAMEWORK:** Next.js 16 (App Router) + Turbopack
> **STYLING:** Tailwind CSS + Framer Motion

---

## 1. HIGH_LEVEL_OVERVIEW
A personal "Vision OS" built as a high-performance web application. It combines a "Futuristic Bio-Lab" aesthetic with a rigorous content management system for research notes. The architecture is designed for **speed**, **visual impact** (glassmorphism/glow), and **ease of publication**. The core mission is **decoding** the operating systems of Biology, Family, and Clinical Operations.

---

## 2. DIRECTORY STRUCTURE (KEY MAP)

```bash
/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root Layout (Fonts, Metadata, Global Styles)
│   ├── page.tsx                # Homepage (Hero, About, Latest Notes, Trinity Viz)
│   ├── notes/                  # Lab Notes Engine
│   │   ├── page.tsx            # Archive Page (Full Grid)
│   │   └── [id]/               # Dynamic Note Renderer (Markdown)
│   └── protocols/              # Research Vectors
│       ├── n1/                 # Protocol N=1 (Custom Page)
│       ├── family_os/          # Protocol Family (Custom Page)
│       ├── clinical_os/        # Protocol Clinical (Custom Page)
│       └── [slug]/             # Dynamic Fallback (Legacy/Sub-protocols)
│
├── components/                 # React Components
│   ├── home/                   # Homepage-specific (Hero, About, Quote)
│   ├── layout/                 # Global (Navbar, Footer)
│   └── ui/                     # Reusable (Cards, Modals, Visuals)
│
├── content/                    # Data Layer
│   └── notes/                  # Markdown Files (YYYY-MM-DD-notes-00X-slug.md)
│
├── lib/                        # Utilities
│   ├── posts.ts                # Markdown Parsing (gray-matter)
│   ├── protocols.ts            # Protocol Metadata (Static Data)
│   └── utils.ts                # Tailwind Helper (cn)
│
└── scripts/                    # Automation
    └── new-note.js             # CLI Tool for Note Creation
```

---

## 3. CORE SYSTEMS

### A. THE CONTENT ENGINE (LAB NOTES)
A file-based CMS optimized for developer velocity.

1.  **Creation:**
    *   **Command:** `node scripts/new-note.js "Title" <Protocol_ID>`
    *   **Logic:** Auto-increments ID (001, 002...), adds Date Stamp, generates Slug, and pre-fills Frontmatter with Protocol Color logic.
    *   **Filename:** `YYYY-MM-DD-notes-00X-slug.md`

2.  **Processing (`lib/posts.ts`):**
    *   Uses `fs` to read `content/notes`.
    *   Uses `gray-matter` to parse Frontmatter (Title, Date, Tag, Protocol ID).
    *   Uses `remark` / `react-markdown` to render body content.

3.  **Rendering:**
    *   **Homepage:** `LatestNotes` component fetches top 3 sorted by date.
    *   **Archive:** `/notes` rendered statically (`force-dynamic` fallback).
    *   **Individual Note:** `/notes/[id]` renders the full article with custom components for images/code.

### B. THE PROTOCOL ENGINE
A hybrid approach using **Custom Pages** for primary protocols and a **Dynamic Route** for scalability.

1.  **Primary Protocols (Custom):**
    *   **N=1 (Emerald):** `app/protocols/n1` (12-System Biological Stack).
    *   **Family (Orange):** `app/protocols/family_os` (6-Vector Operational Domains).
    *   **Habitat (Blue):** `app/protocols/habitat` (6-Vector Engineering Architecture).
    *   *Why Custom?* Each requires unique layout logic, visualizations, and "vibe" tuning.

2.  **Protocol Metadata (`lib/protocols.ts`):**
    *   Central source of truth for Title, Mission, Stack, and Colors.
    *   Used by dynamic components or for reference.

### C. VISUAL SYSTEM (TAILWIND CONFIG)
The "Bio-Lab" aesthetic is enforced via utility classes.

*   **Colors (Semantic):**
    *   `bg-void` (Zinc-950) -> The deep background.
    *   **Protocol Colors:**
        *   `emerald-500` (N=1 / Biology)
        *   `orange-500` (Family / Logistics)
        *   `blue-500`  (Clinical / Operations)
*   **Typography:**
    *   `font-heading`: **Outfit** (Futuristic, Clean).
    *   `font-body`: **Inter** (Readable, Standard).
    *   `font-mono`: **JetBrains Mono** (Data, Code, HUD elements).

---

## 4. DATA FLOW

1.  **User** runs script -> **Markdown File** created in `content/notes`.
2.  **Git Push** triggers Vercel Build.
3.  **Next.js** builds static pages (SSG) for Notes and Protocols.
4.  **Client** receives optimized HTML + JSON.
5.  **Dynamic Updates:** Archive page re-fetches on request (if `force-dynamic`) or rebuild.

---

## 5. EASTER EGGS / HIDDEN LOGIC

1.  **Genesis Modal:**
    *   Trigger: Footer "SYSTEM_STATUS" (7 clicks).
    *   Component: `components/ui/genesis-modal.tsx`.

2.  **Protocol L (Layas):**
    *   Trigger: Navbar Logo (5 clicks).
    *   Password: "LAYAS".
    *   Component: `components/ui/l-protocol.tsx`.

---

## 6. DEPLOYMENT & CI/CD
*   **Platform:** Vercel.
*   **Build Command:** `next build`.
*   **Environment:** Production (Main Branch).
