
# THE THARUN HEALTH LAB // MASTER CONTEXT

> **USAGE INSTRUCTION:** Feed this file to any new AI Agent to restore full context of the User, the Mission, and the Hidden Layers.

---

## 1. THE IDENTITY
*   **User:** Tharun Kumar Gajula (Engineer, Finance, Deep Learning Researcher).
*   **Archetype:** "The Builder" // Systems Thinker.
*   **Background:** Bridge between Engineering, Finance, and AI Research.
*   **Philosophy:** "Systems. Biology. Code." -> The belief that biology is just another codebase to be optimized.
*   **Mission:** Engineering a High-Performance Life. Moving from finite "Projects" to infinite "Operating Systems."
*   **Aesthetic:** Futuristic Bio-Lab, Dark Mode, Neon Accents (Emerald/Orange/Gold), Glassmorphism.

---

## 2. THE PROTOCOL ECOSYSTEM (OPERATING SYSTEMS)
These are the core pillars of the user's life architecture.

### **[PROTOCOL N=1] // THE ACADEMY**
*   **Mission:** To decode the human organism and optimize biological performance through rigorous self-experimentation.
*   **Color Identity:** Emerald Green (`text-emerald-500`, `bg-emerald-500`).
*   **Status:** **ACTIVE_LEARNING**
*   **Tech/Data Stack:**
    *   **Inputs:** Oura Ring (Sleep/HRV), CGM (Dexcom/Abbott), Apple Watch Ultra, Comprehensive Blood Panels.
    *   **Analysis:** Python/Excel for correlation.
    *   **Architecture:** Next.js Hardcoded Layout (`app/protocols/n1/page.tsx`) with a custom radial gradient hero.

### **[PROTOCOL YUKTI] // THE FAMILY OS**
*   **Mission:** To build a verified knowledge base and decision support system for family health.
*   **Color Identity:** Orange (`text-orange-500`, `bg-orange-500`).
*   **Status:** **BUILDER**
*   **Tech/Data Stack:**
    *   **Concept:** Context-aware health engine.
    *   **Architecture:** Dynamic Route (`app/protocols/[slug]/page.tsx`).

### **[PROTOCOL MIND] // THE COGNITIVE OS**
*   **Mission:** To engineer a mind capable of high-leverage decision making and restore mental clarity.
*   **Color Identity:** Gold (`text-yellow-500`, `bg-yellow-500`).
*   **Status:** **CONCEPT_PHASE**
*   **Tech/Data Stack:**
    *   **Tools:** Mental Models, Problem Solving Frameworks, Knowledge Management.
    *   **Architecture:** Hardcoded Layout (`app/protocols/mind/page.tsx`) mirroring the Yukti structure.

---

## 3. THE HIDDEN LAYERS (SECRETS - IMPLEMENTATION DETAIL)
These are easter eggs embedded in the application logic.

### **GENESIS BLOCK**
*   **Location:** Footer Component (`components/layout/footer.tsx`).
*   **Trigger Logic:**
    *   User clicks the text "SYSTEM_STATUS" (`handleStatusClick`).
    *   State `clickCount` increments.
    *   **Condition:** `clickCount === 7`.
*   **Payload:**
    *   Opens `GenesisModal` (`components/ui/genesis-modal.tsx`).
    *   Content: A Matrix-style dedication to Parents & Friends who saved the user during the reboot.
    *   **Timestamp:** Hardcoded "2026-02-11".

### **PROTOCOL L (LAYAS)**
*   **Location:** Navbar Component (`components/layout/navbar.tsx`).
*   **Trigger Logic:**
    *   User clicks the "Tharun Health Lab" Logo/Hexagon (`handleLogoClick`).
    *   State `logoClicks` increments. Reset timer (2s) clears count if inactive.
    *   **Condition:** `logoClicks === 4` (5th click triggers).
*   **Security:**
    *   Input Field (`components/ui/l-protocol.tsx`).
    *   **Password:** "**LAYAS**" (Case-insensitive check).
*   **Payload:**
    *   A "Rose Gold" full-screen affirmation of wholeness and abundance.
    *   Theme: `text-rose-500`.

---

## 4. THE CURRICULUM (N=1 DATA)
The academic structure extracted from `lib/n1-data.ts`.

### **MX (Medical Foundations)**
*   **Focus:** Understanding the fundamental systems of the human organism.
*   **Modules:** Anatomy/Physiology (101), Biochemistry (102), Endocrinology (103), Neurobiology (104).

### **NX (Nutritional Chemistry)**
*   **Focus:** Moving beyond 'diet' into molecular fuel and signaling.
*   **Modules:** Macronutrients (201), Micronutrients (202), Supplements (203), Metabolic Flexibility (204).

### **PX (Applied Performance)**
*   **Focus:** Engineering output through physics and programming.
*   **Modules:** Exercise Phys (301), Resistance Training (302), Cardio (303), Weight Mgmt (304).

### **DX (Diagnostics & Data)**
*   **Focus:** Verifying health through metrics, bloodwork, and correlation.
*   **Modules:** Bloodwork (401), Genetics (402), Wearables (403), CGM (404), Longevity Metrics (405).

---

> **END OF MASTER CONTEXT**
