# SYSTEM SCHEMAS & DATA CONTRACTS // THARUN HEALTH LAB
> **VERSION:** 1.0.0
> **PURPOSE:** The 4th MECE Document. This file defines the exact data structures, component contracts, and hardcoded logic required to achieve 100% pixel-perfect and logically accurate replication of the Tharun Health Lab OS by an AI Agent.

---

## 1. THE DATA SCHEMAS (TYPESCRIPT INTERFACES)

The application relies on strictly typed definitions to manage the Research Protocols and the Digital Garden Notes.

### A. The Protocol Schema (`lib/protocols.ts`)
Defines the hardcoded operating systems (N=1, Family, Cognition).

```typescript
export type ProtocolData = {
    slug: string;                     // "0_meta" | "n1" | "family" | "cognition"
    title: string;                    // e.g., "PROTOCOL N=1"
    subtitle: string;                 // e.g., "The Pursuit of Biological Optimization"
    color: string;                    // Tailwind text class (e.g., "text-violet-500", "text-emerald-500")
    bgColor: string;                  // Tailwind bg class (e.g., "bg-emerald-500")
    icon: any;                        // Lucide React Icon Component
    status: string;                   // "Active Research" | "Concept Phase"
    mission: string;                  // Detailed paragraph of the objective
    stack: { 
        name: string;                 // e.g., "Oura Ring", "Intelligence"
        icon: any                     // Lucide React Icon Component
    }[];
};
```

### B. The Markdown Frontmatter & Note Schema (`lib/posts.ts`)
Defines the structure of the `content/notes/*.md` files and how they are parsed by `gray-matter`.

```typescript
export type PostData = {
  id: string;                         // Clean slug filename (e.g., "why-i-started-this")
  title: string;                      // Display title
  date: string;                       // "YYYY-MM-DD"
  tag: string;                        // "META" | "N=1" | "Family" | "Cognition"
  protocol?: string;                  // Protocol ID: "0" | "1" | "2" | "3"
  noteId?: string;                    // "001", "002"
  status?: string;                    // "CONCEPT" | "DRAFT" | "POLISHED"
  excerpt: string;                    // Short description for cards
  content?: string;                   // The actual markdown body
  outboundLinks?: string[];           // Array of slugs this note links to
  inboundLinks?: Partial<PostData>[]; // Array of posts that link to this note (Backlinks)
};
```

**Markdown File Naming Convention (`scripts/new-note.js`):**
*   Regex Pattern: `slug.md`
*   Auto-increment logic parses the `noteId` from the existing files' frontmatter or fallback regex if migrating.

---

## 2. COMPONENT BLUEPRINTS & CONTRACTS

To accurately rebuild the UI, the exact logic of the components must be followed.

### A. Genesis Modal (`components/ui/genesis-modal.tsx`)
*   **Purpose:** The hidden dedication matrix.
*   **Trigger Logic:** User clicks the text "SYSTEM_STATUS" exactly 7 times in the Footer.
*   **Animation:** Uses Framer Motion. Modal wrapper requires a simple fade out. Contents slide up.
*   **Content:** Hardcoded timestamp "2026-02-21" and message dedicated to Parents & Friends who saved the user during the reboot.
*   **Aesthetic:** Matrix-green terminal text (`text-emerald-500`) on deep black. `font-mono`.

### B. L-Protocol Modal (`components/ui/l-protocol.tsx`)
*   **Purpose:** The hidden Layas affirmation.
*   **Trigger Logic:** User clicks the "Tharun Health Lab" Hexagon logo in the Navbar exactly 5 times. Prompts for a password.
*   **Password Constraint:** "LAYAS" (case-insensitive check).
*   **Aesthetic:** "Rose Gold" full-screen overlay. Theme relies heavily on `text-rose-500` and `bg-rose-500/10`.

### C. Digital Garden Search Engine (`components/notes/searchable-archive.tsx`)
*   **Behavior:** Client-side only. Expects an array of `PostData` passed as an initial prop from `app/notes/page.tsx`.
*   **State:** Uses React `useState` for the `searchQuery`. Maps over `initialPosts` and filters by checking if the `searchQuery` is included in the post's `title` or `excerpt` (case-insensitive).
*   **Shortcut:** Should implement a keyboard listener for `cmd+f` or `ctrl+f` to focus the stylized search input, blocking the default browser find functionality.

---

## 3. THE REPLICATION HACK (AI DIRECTIVES)

If an AI is tasked with rebuilding this app, feed it this file alongside `PROJECT_CONTEXT`, `TECHNICAL_ARCHITECTURE`, and `README`. 

**The Golden Directives for 100% Accuracy:**
1.  **Do Not Improvise Data Structures:** Always use the exact TypeScript types defined in this document for Protocols and Posts.
2.  **Respect the Triggers:** When building `Footer.tsx` or `Navbar.tsx`, implement the exact click-counting logic defined for Genesis and L-Protocol.
3.  **Adhere to the Markdown Pipeline:** The `scripts/new-note.js` node script is the absolute source of truth for file naming. Do not alter the regex or the `YYYY-MM-DD-notes-00X-slug.md` output structure.
