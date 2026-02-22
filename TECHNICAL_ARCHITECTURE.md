# TECHNICAL ARCHITECTURE // THARUN HEALTH LAB
> **VERSION:** 1.0.2
> **FRAMEWORK:** Next.js 16 (App Router) + Turbopack
> **DEPLOYMENT:** Vercel (Production)

---

## 1. HIGH_LEVEL_OVERVIEW
A personal "Vision OS" built as a high-performance web application. It combines a "Futuristic Bio-Lab" aesthetic with a rigorous content management system for research notes. The architecture is designed for **speed**, **visual impact** (glassmorphism/glow), and **ease of publication**. The core mission is **decoding** the Operating Systems for Biology, Family, and Cognition.

---

## 2. DIRECTORY STRUCTURE (KEY MAP)

```bash
/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root Layout (Fonts, Metadata, Global Styles)
│   ├── page.tsx                # Homepage (Hero, About, Latest Notes, Trinity Viz)
│   ├── notes/                  # Lab Notes Engine
│   │   ├── page.tsx            # Archive Page (Full Grid + Search Placeholder)
│   │   └── [id]/               # Dynamic Note Renderer (Markdown + Code Highlighting)
│   └── protocols/              # Research Vectors
│       ├── n1/                 # Protocol N=1 (Custom Page)
│       ├── family_os/          # Protocol Family (Custom Page)
│       ├── cognition_os/       # Protocol Cognition (Custom Page)
│       └── [slug]/             # Dynamic Fallback (Legacy/Sub-protocols)
│
├── components/                 # React Components
│   ├── home/                   # Homepage-specific (Hero, About, Quote)
│   ├── layout/                 # Global (Navbar, Footer)
│   └── ui/                     # Reusable (GenesisModal, L-Protocol)
│
├── content/                    # Data Layer
│   └── notes/                  # Markdown Files (YYYY-MM-DD-notes-00X-slug.md)
│
├── lib/                        # Utilities
│   ├── posts.ts                # Markdown Parsing (gray-matter) & Sorting Logic
│   ├── protocols.ts            # Protocol Metadata (Static Data)
│   └── utils.ts                # Tailwind Helper (cn)
│
└── scripts/                    # Automation
    └── new-note.js             # CLI Tool: `npm run note "Title" <ProtocolID>`
```

---

## 3. CORE SYSTEMS

### A. THE CONTENT ENGINE (LAB NOTES)
A file-based CMS optimized for developer velocity.

1.  **Creation:**
    *   **Command:** `npm run note "Title" <Protocol_ID>`
    *   **Logic:** Auto-increments ID (001, 002...), adds Date Stamp, generates Slug, and pre-fills Frontmatter with Protocol Color logic.
    *   **Metadata:** `title`, `date`, `tag` (e.g., N=1), `protocol` (ID), `status` (CONCEPT/DRAFT/POLISHED).
    *   **Filename:** `YYYY-MM-DD-notes-00X-slug.md`

2.  **Processing (`lib/posts.ts`):**
    *   Uses `fs` to read `content/notes`.
    *   Uses `gray-matter` to parse Frontmatter.
    *   Uses `remark` / `react-markdown` to render body content (supports code blocks, tables).

3.  **Rendering:**
    *   **Homepage:** `LatestNotes` component fetches top 3 sorted by date.
    *   **Archive:** `/notes` rendered statically (`force-dynamic` fallback).
    *   **Individual Note:** `/notes/[id]` renders the full article with custom components for headers, logs, and code.

### B. DATA VISUALIZATION (UI PATTERNS)
The UI uses specific patterns to convey "System Status".

1.  **Status Badges (Inline Logic):**
    *   Implemented in `NotesArchive` and `NotePage`.
    *   **Logic:** Checks `protocol` ID to assign color (Emerald/Orange/Sky).
    *   **Visual:** Border + Low-opacity Background + Monospace Font.
    *   **Metadata Badge:** `[STATUS]` (e.g., [CONCEPT]) displayed if present in frontmatter.

2.  **Digital Garden Header:**
    *   **Label:** `// DIGITAL_GARDEN`
    *   **Title:** `LIVING_CONCEPT_DOCUMENTS`
    *   **Philosophy:** "No SEO > Pure Signal".
    *   **Search Engine:** Client-side filtering (`SearchableArchive`) for instant "Bio-Lab" feel.
    *   **Components:** `searchable-archive.tsx` (Interactive Grid), `latest-notes.tsx` (Home Feed).

2.  **The Protocol Engine:**
    *   **N=1 (Emerald):** `app/protocols/n1` (12-System Biological Stack).
    *   **Family (Orange):** `app/protocols/family_os` (12-Vector Fortress Architecture).
    *   **Cognition (Sky):** `app/protocols/cognition_os` (6-Vector Cognitive Architecture).

### C. VISUAL SYSTEM (TAILWIND CONFIG)
The "Bio-Lab" aesthetic is enforced via `tailwind.config.ts`.

*   **Colors (Semantic):**
    *   `bg-background` (`#09090b` / Deep Void) -> The deep background.
    *   **Custom Brand Colors:** `primary` (Bio-Scan Cyan), `yukti` (Blaze Orange), `taste` (Rich Gold), `n1` (Vitality Emerald).
    *   **Protocol Colors (Tailwind Defaults):** `n1` (Emerald-500), `family` (Orange-500), `cognition` (Sky-500).
*   **Typography:**
    *   `font-heading`: **Outfit** (Futuristic, Clean).
    *   `font-body`: **Inter** (Readable, Standard).
    *   `font-mono`: **JetBrains Mono** (Data, Code, HUD elements).

---

## 4. DATA FLOW

1.  **User** runs `npm run note` -> **Markdown File** created in `content/notes`.
2.  **Git Push** triggers Vercel Build.
3.  **Next.js** builds static pages (SSG) for Notes and Protocols.
4.  **Client** receives optimized HTML + JSON.
5.  **Dynamic Updates:** Archive page re-fetches on request (if `force-dynamic`) or rebuild.

---

## 5. EASTER EGGS / HIDDEN LOGIC

1.  **Genesis Modal:**
    *   Trigger: Footer "SYSTEM_STATUS" (7 clicks).
    *   Component: `components/ui/genesis-modal.tsx`.
    *   Payload: Dedication to Parents & Friends (Matrix Style).

2.  **Protocol L (Layas):**
    *   Trigger: Navbar Logo (5 clicks).
    *   Password: "LAYAS".
    *   Component: `components/ui/l-protocol.tsx`.
    *   Payload: "Rose Gold" affirmation theme.

---

## 6. DEPLOYMENT & CI/CD
*   **Platform:** Vercel.
*   **Build Command:** `next build`.
*   **Environment:** Production (Main Branch).
