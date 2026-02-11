
# TECHNICAL ARCHITECTURE & ERROR LOG

> **USAGE INSTRUCTION:** READ THIS FIRST. This is a living document. Update it after every major architectural decision to prevent future bottlenecks.

---

## 1. PROJECT ANATOMY (FILE TREE ANALYSIS)

### **Core Directory: `app/`**
*   **`page.tsx` (Homepage):**
    *   **Role:** The Landing Page.
    *   **Components:** Hero Section (Cards), About Section (Operator Dossier), Protocols Section.
    *   **Logic:** Uses `framer-motion` for staggered reveals of the "Operating Systems".

*   **`protocols/[slug]/page.tsx` (The Dynamic Master):**
    *   **Role:** The standardized template for all Protocol pages (primarily used by **Yukti**).
    *   **Key Feature:** Dynamic routing based on `lib/protocols.ts`.
    *   **Design:** `max-w-5xl` centered container with ambient background glow.

*   **`protocols/n1/page.tsx` (The Academy Dashboard):**
    *   **Role:** Dedicated layout for Protocol N=1.
    *   **Architecture:** **CUSTOM GRID** derived from Yukti but specialized for syllabus content.
    *   **Features:**
        *   Mobile-First "Active" States (`active:scale-[0.98]`) for tactile feedback.
        *   Responsive headers (`flex-col md:flex-row`).
        *   Displays the 4-Pillar Curriculum (MX, NX, PX, DX).

*   **`protocols/mind/page.tsx` (The Cognitive OS):**
    *   **Role:** Dedicated layout for Protocol Mind.
    *   **Architecture:** **HARDCODED CLONE** of the Yukti layout (Yellow Theme).
    *   **Content:** Conceptual placeholders (Mental Models, Problem Solving).

*   **`notes/[id]/page.tsx` (The Lab Reader):**
    *   **Role:** Renders individual Markdown posts from `content/notes`.
    *   **Tech:** Uses `react-markdown` with specific overrides for code blocks (Dracula theme colors) and typography.

### **Core Directory: `components/`**
*   **`layout/navbar.tsx`:**
    *   **Role:** Global navigation and Protocol L trigger.
    *   **Logic:** Tracks `logoClicks`. If `clicks === 5` within 2s, triggers `LProtocol` modal.

*   **`layout/footer.tsx`:**
    *   **Role:** Global footer and Genesis Block trigger.
    *   **Logic:** Tracks `clickCount` on "System Status". If `clicks === 7`, triggers `GenesisModal`.

*   **`ui/genesis-modal.tsx`:** The "Matrix-style" typed dedication component.
*   **`ui/l-protocol.tsx`:** The password-protected "Rose Gold" secret vault.

---

## 2. THE "CLONE-FIRST" LAYOUT STRATEGY (THE GOLDEN RULE)

### **The Incident (Structural Drift)**
*   **Context:** We attempted to build `n1/page.tsx` from scratch while trying to visually match `Yukti`.
*   **Result:** Failure. Misaligned gradients, broken `z-index`, inconsistent padding. Hours wasted debugging CSS.

### **The Law**
When building a sibling page (e.g., N=1 or Mind) that needs to look like an existing page (Yukti), **NEVER start from scratch.**
1.  **Copy** the working page's entire DOM structure (from `[slug]/page.tsx`).
2.  **Paste** it into the new file.
3.  **Swap** only the data/colors/icons.

### **The Hero Asset (Do Not Lose)**
The specific Tailwind classes that create the "Signature Glow":
```tsx
// The Ambient Background Glow
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[COLOR]-500" />
```

---

## 3. COMPONENT LOGIC & STATE

### **Navbar (Protocol L Trigger)**
*   **State:** `const [logoClicks, setLogoClicks] = useState(0);`
*   **Timer:** `useEffect` resets count to 0 if inactive for 2000ms.
*   **Trigger:** `logoClicks === 4` (0-indexed logic implies 5th click).

### **Footer (Genesis Trigger)**
*   **State:** `const [clickCount, setClickCount] = useState(0);`
*   **Trigger:** `clickCount === 7` (Direct comparison).
*   **Reset:** Resets to 0 immediately after triggering modal.

### **Lab Notes Engine**
*   **Path:** `app/notes/[id]/page.tsx`
*   **Library:** `react-markdown`
*   **Styling:**
    *   `prose-invert`: Dark mode typography.
    *   `code` blocks: Custom renderer with `bg-zinc-900` and specific syntax highlighting colors.

    *   **Styling:**
    *   `prose-invert`: Dark mode typography.
    *   `code` blocks: Custom renderer with `bg-zinc-900` and specific syntax highlighting colors.
    *   **Automation:** `npm run note "Title"` trigger via `scripts/new-note.js` for daily "Proof of Work".
    *   **Security:** `lib/posts.ts` includes a "Ghost File Protocol" to filter out specific corrupt files (e.g., `hello-world.md`).

---

## 4. DESIGN SYSTEM (THE VISUAL DNA)

### **Typography**
*   **Headings:** `font-heading` (Outfit) - Used for all "PROTOCOL" titles.
*   **Body:** `font-body` (Inter) - Used for long-form text and descriptions.
*   **Data:** `font-mono` (JetBrains Mono) - Used for Status Badges, System Logs, and Code.

### **Color Palette (Tailwind Specs)**
*   **Emerald (N=1):** `text-emerald-500`, `bg-emerald-500` (Optimization/Biology).
*   **Orange (Yukti):** `text-orange-500`, `bg-orange-500` (Family/Warmth).
*   **Yellow (Mind):** `text-yellow-500`, `bg-yellow-500` (Clarity/Intellect).
*   **Rose (L-Protocol):** `text-rose-500`, `bg-rose-500` (Love/Abundance).

### **Animations & Interaction (Framer Motion)**
*   **Input:** `whileHover={{ rotate: 90 }}` on the Navbar Hexagon.
*   **Reveal:** `animate-pulse` on "System Status" dot.
*   **Transition:** `backdrop-blur-xl` extensively used for Glassmorphism.

### **The "Mobile Tactile" Doctrine**
*   **Problem:** Hover states (`hover:`) are invisible on touch devices.
*   **Solution:** ALWAYS implement `active:` states for mobile.
*   **Code:** `active:scale-[0.98] active:bg-[COLOR]/10 transition-all`.
*   **Result:** A "clicky", responsive feel that mimics native apps.

---

## 5. TROUBLESHOOTING & ERROR LOG

*   **Issue:** Gradient rendering failures in N=1.
    *   **Root Cause:** Conflicting `z-index` stacking contexts and arbitrary width values.
    *   **Fix:** Switched to the Standard Yukti DOM structure (`absolute top-0 w-[800px]`).

*   **Issue:** Mobile text cutoff on Protocol L.
    *   **Root Cause:** Font size `text-9xl` was too large for mobile viewports.
    *   **Fix:** Changed to responsive `text-5xl md:text-7xl` and added `px-4`.

*   **Issue:** Build Fail (TypeScript) in Protocol L.
    *   **Root Cause:** Inline Ref callback `ref={(input) => input && input.focus()}` returned `void`.
    *   **Fix:** Implemented `useRef` and `useEffect` for type-safe auto-focus.

*   **Issue:** "Dead" feeling interactions on Mobile.
    *   **Root Cause:** Relying solely on `hover:` states which don't trigger on touch.
    *   **Fix:** Added `active:` states (`active:scale`, `active:border`) to all interactive cards.

*   **Issue:** Text Wrapping/Squeezing on Mobile Headers.
    *   **Root Cause:** Flex row layout with fixed-width declarative lines forced text to wrap.
    *   **Fix:** Switched to `flex-col md:flex-row` and hid decorative lines on mobile (`hidden md:block`).

*   **Issue:** Ghost Files / Undeletable Content (Windows File Lock).
    *   **Root Cause:** Next.js dev server or Windows OS locking `.md` files, preventing deletion.
    *   **Fix:** Implemented a "Soft Delete" filter in `lib/posts.ts` (`&& fileName !== 'hello-world.md'`) to ignore specific files at the code level, regardless of physical existence.

    *   **Root Cause:** Flex row layout with fixed-width declarative lines forced text to wrap.
    *   **Fix:** Switched to `flex-col md:flex-row` and hid decorative lines on mobile (`hidden md:block`).

*   **Issue:** Ghost Files / Undeletable Content (Windows File Lock).
    *   **Root Cause:** Next.js dev server or Windows OS locking `.md` files, preventing deletion.
    *   **Fix:** Implemented a "Soft Delete" filter in `lib/posts.ts` (`&& fileName !== 'hello-world.md'`) to ignore specific files at the code level, regardless of physical existence.

---

> **system_status: STABLE // DOCUMENTATION_LOCKED**
