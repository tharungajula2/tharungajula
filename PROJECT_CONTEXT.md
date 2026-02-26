# THE THARUN LEARNING LAB // MASTER CONTEXT

> **USAGE INSTRUCTION:** Feed this file to any new AI Agent to restore full context of the User, the Mission, the Architecture, Schemas, and the Hidden Layers. This is the single source of truth (consolidated from prior MECE files).

---

## 1. THE IDENTITY
*   **User:** Tharun Kumar Gajula (Researcher, Engineer, Systems Thinker).
*   **Archetype:** "The Researcher" // The Student of Systems.
*   **Background:** Bridging Business Strategy and Technical Execution. Engineering, Finance, and AI-ML.
*   **Philosophy:** "You do not rise to the level of your goals. You fall to the level of your systems."
*   **Mission:** Moving from finite "Projects" to infinite "Operating Systems". Exploring the Operating Systems for Biology, Family, and Cognition.
*   **Aesthetic:** Futuristic Bio-Lab, Dark Mode, Neon Accents (Emerald/Orange/Sky), Glassmorphism, "Research Lab" Vibe.

---

## 2. THE PROTOCOL ECOSYSTEM (OPERATING SYSTEMS)

### **[THE SANDBOX] // OVERARCHING ARCHITECTURE**
*   **Mission:** "The overarching architecture, philosophy, and highest-level direction of the entire lab. The rules of the Infinite Game."
*   **Status:** **ACTIVE_SYSTEM** (Color: Zinc)

### **[BIOLOGY OS] // THE LOGICAL BODY**
*   **Mission:** "To explore the biological systems that power Protocol Family and Protocol Cognition."
*   **Status:** **ACTIVE_RESEARCH** (Color: Purple)

### **[PROTOCOL FAMILY] // THE FAMILY OS**
*   **Mission:** "To engineer the Fortress Architecture required to protect Protocol N=1 and sustain Protocol Cognition."
*   **Status:** **ACTIVE_RESEARCH** (Color: Orange)

### **[PROTOCOL COGNITION] // THE COGNITIVE OS**
*   **Mission:** "To engineer the Cognitive Software required to run Protocol N=1 and Protocol Family."
*   **Status:** **CONCEPT_PHASE** (Color: Sky Blue)

---

## 3. THE CURRICULUM (N=1 DATA)
*   **MX (Medical Foundations):** Understanding the fundamental systems of the human organism.
*   **NX (Nutritional Chemistry):** Moving beyond 'diet' into molecular fuel and signaling.
*   **PX (Applied Performance):** Engineering output through physics and programming.
*   **DX (Diagnostics & Data):** Verifying health through metrics, bloodwork, and correlation.

---

## 4. CONTENT PHILOSOPHY (LAB NOTES)
This is not a blog. It is a "Digital Garden" of "Living Concept Documents".
*   **Format:** Raw Markdown (`slug.md`). Atomic, sequence-free naming.
*   **Cadence:** Continuous Research.
*   **Mechanism:** `npm run note "Title"` (Interactive CLI). Note statuses: CONCEPT | DRAFT | POLISHED.
*   **Mapping:** Displayed on the interactive Neural Map Knowledge Graph at `/map`.
*   **Style Rules:** NO EM-DASHES (`—`), use hyphens (` - `). Use "AI-ML" instead of "Deep Learning".

---

## 5. TECHNICAL ARCHITECTURE & DATA FLOW
*   **Framework:** Next.js 16 (App Router) + Turbopack. Deployment: Vercel.
*   **System Setup:**
    *   `/app`: App router pages (`/map`, `/notes`, `/till-2026`).
    *   `/components`: UI (`Hero`, `Navbar`, `Footer`, `SearchableArchive`).
    *   `/content/notes`: Markdown files driven by gray-matter.
    *   `/lib`: Core logic (`posts.ts`, `protocols.ts`).

**Data Visualization & UI Patterns:**
*   **Neural Map Hero (`/map`):** Uses `react-force-graph-2d`. Maps Protocol IDs to neon node colors.
*   **Digital Garden Search Engine:** Client-side filtering (`SearchableArchive`), visually mapped to bio-lab aesthetics.
*   **Data Flow:** Local Markdown -> Git Push -> Vercel Build (SSG) -> Live UI.

---

## 6. SYSTEM SCHEMAS & DATA CONTRACTS

### A. The Protocol Schema (`lib/protocols.ts`)
```typescript
export type ProtocolData = {
    slug: string; title: string; subtitle: string;
    color: string; bgColor: string; icon: any;
    status: string; mission: string;
    stack: { name: string; icon: any }[];
};
```

### B. The Markdown Frontmatter Schema (`lib/posts.ts`)
```typescript
export type PostData = {
  id: string; title: string; date: string;
  tag: string; protocol?: string; status?: string;
  excerpt: string; content?: string;
  outboundLinks?: string[]; inboundLinks?: Partial<PostData>[];
};
```

---

## 7. THE HIDDEN LAYERS & COMPONENT BLUEPRINTS
Easter eggs embedded in the application logic.

### **GENESIS BLOCK (`components/ui/genesis-modal.tsx`)**
*   **Trigger:** User clicks "SYSTEM_STATUS" exactly 7 times in the Footer.
*   **Payload:** Matrix-style dedication to Parents & Friends (Timestamp: 2026-02-21).

### **PROTOCOL L (LAYAS) (`components/ui/l-protocol.tsx`)**
*   **Trigger:** Navbar Logo Hexagon clicked exactly 5 times.
*   **Security:** Password "LAYAS" (Case-insensitive check).
*   **Payload:** "Rose Gold" full-screen affirmation of wholeness.

---

## 8. RECENT SHIPMENTS / ROADMAP
*   **[SHIP]** Tharun Learning Lab Identity Overhaul & Legacy Protocol Archive.
*   **[SHIP]** Master Architecture Grid deployed to Homepage.
*   **[SHIP]** "Till 2026" Time Capsule integration.
*   **[SHIP]** Zettelkasten Knowledge Graph Neural Map.
*   **[SHIP]** Consolidated MECE Master Context.
