
# TECHNICAL ARCHITECTURE & ERROR LOG

> **USAGE INSTRUCTION:** READ THIS FIRST. This is a living document. Update it after every major architectural decision to prevent future bottlenecks.

---

## 1. PROJECT ANATOMY (FILE TREE ANALYSIS)

### **Core Directory: `app/`**
*   **`page.tsx` (Homepage):**
    *   **Role:** The Landing Page.
    *   **Components:** Hero (Cards), Operator Dossier (Manifesto), Three Protocols (Interactive), Quote Section.
    *   **Logic:** `framer-motion` for staggered reveals.

*   **`protocols/n1/page.tsx` (The Academy):**
    *   **Role:** Dedicated layout for Protocol N=1.
    *   **Architecture:** Custom Grid derived from Family OS but specialized for syllabus content (MX/NX/PX/DX).
    *   **Design:** Emerald Green Theme. Responsive headers (`ACADEMY_SYLLABUS // EXPLORATION_VECTORS`).

*   **`protocols/family_os/page.tsx` (Family OS):**
    *   **Role:** Research Page for Family Health Architecture. (Formerly 'Yukti').
    *   **Architecture:** Research Grid with Tags and Problem Spaces.
    *   **Design:** Orange Theme. Header: `RESEARCH_AREAS // EXPLORATION_VECTORS`.
    *   **Features:** Responsive Gradient Glow (Fixed in Phase 12).

*   **`protocols/clinical_os/page.tsx` (Clinical OS):**
    *   **Role:** Research Page for Clinical Operations. (Formerly 'Kriya').
    *   **Architecture:** Research Grid mirroring Family OS structure.
    *   **Design:** Blue Theme. Header: `RESEARCH_AREAS // EXPLORATION_VECTORS`.
    *   **Features:** Blue Gradient Glow.

*   **`notes/[id]/page.tsx` (The Lab Reader):**
    *   **Role:** Renders individual Markdown posts from `content/notes`.
    *   **Tech:** `react-markdown` with Dracula theme colors.

### **Core Directory: `components/`**
*   **`home/about-section.tsx`:** The "Operator Dossier" with Manifesto and Skill Matrix.
*   **`layout/navbar.tsx`:** Global navigation and Protocol L trigger (4 clicks).
*   **`layout/footer.tsx`:** Global footer and Genesis Block trigger (7 clicks).

---

## 2. THE "CLONE-FIRST" LAYOUT STRATEGY (THE GOLDEN RULE)

### **The Law**
When building a sibling page (e.g., Clinical OS) that needs to look like an existing page (Family OS), **NEVER start from scratch.**
1.  **Copy** the working page's entire DOM structure.
2.  **Paste** it into the new file.
3.  **Swap** only the data/colors/icons.

### **The Hero Asset (Do Not Lose)**
The specific Tailwind classes that create the "Signature Glow":
```tsx
// The Ambient Background Glow
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[COLOR]-500" />
```

---

## 3. DESIGN SYSTEM (THE VISUAL DNA)

### **Typography**
*   **Headings:** `font-heading` (Outfit).
*   **Body:** `font-body` (Inter).
*   **Data:** `font-mono` (JetBrains Mono).

### **Color Palette (Tailwind Specs)**
*   **Emerald (N=1):** `text-emerald-500` (Biological Optimization).
*   **Orange (Family OS):** `text-orange-500` (Family Health Security).
*   **Blue (Clinical OS):** `text-blue-500` (Clinical Operations).
*   **Rose (L-Protocol):** `text-rose-500` (Wholeness/Abundance).

### **Interaction Philosophy**
*   **Mobile Tactile Doctrine:** ALWAYS implement `active:` states for mobile (`active:scale-[0.98]`). Touch feedback is critical.

---

## 4. TROUBLESHOOTING & ERROR LOG (RECENT)

*   **Issue:** Gradient rendering failures in Family OS.
    *   **Root Cause:** Used arbitrary fixed pixel values that didn't scale.
    *   **Fix:** Aligned with N=1/Clinical OS structure (`w-[300px] md:w-[800px]`).

*   **Issue:** Homepage "Experiments & Learning" Alignment.
    *   **Root Cause:** Flex layout was trying to center on mobile but keep left on desktop with mixed alignment classes.
    *   **Fix:** Simplified to pure Left Alignment on all devices. Removed decorative pipe separator.

*   **Issue:** "Ghost Files" (Windows File Lock).
    *   **Root Cause:** OS locking `.md` files in dev server.
    *   **Fix:** "Soft Delete" logic in `lib/posts.ts` to ignore specific filenames.

*   **Issue:** Mobile Text Cutoff (Protocol L).
    *   **Fix:** Responsive font sizing (`text-5xl md:text-7xl`).

---

> **system_status: STABLE // DOCUMENTATION_LOCKED**
