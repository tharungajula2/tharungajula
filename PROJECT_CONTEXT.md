
# THE THARUN HEALTH LAB // MASTER CONTEXT

> **USAGE INSTRUCTION:** Feed this file to any new AI Agent to restore full context of the User, the Mission, and the Hidden Layers.

---

## 1. THE IDENTITY
*   **User:** Tharun Kumar Gajula (Builder, Engineer, Systems Thinker).
*   **Archetype:** "The Builder" // The Architect of Protocols.
*   **Background:** Bridge between Business Strategy and Technical Execution. Engineering, Finance, and Deep Learning.
*   **Philosophy:** "You do not rise to the level of your goals. You fall to the level of your systems."
*   **Mission:** Moving from finite "Projects" to infinite "Operating Systems" for Health, Family, and Clinical Ops.
*   **Aesthetic:** Futuristic Bio-Lab, Dark Mode, Neon Accents (Emerald/Orange/Blue), Glassmorphism, "Research Lab" Vibe.

---

## 2. THE PROTOCOL ECOSYSTEM (OPERATING SYSTEMS)
These are the core pillars of the user's life architecture. All are "Research Protocols" in active exploration.

### **[PROTOCOL N=1] // THE ACADEMY**
*   **Mission:** To decode the human organism and optimize biological performance through rigorous self-experimentation.
*   **Color Identity:** Emerald Green (`text-emerald-500`, `bg-emerald-500`).
*   **Status:** **ACTIVE // DEPLOYED**
*   **Focus:** Biological Optimization, Self-Quantification.
*   **Tech/Data Stack:**
    *   **Inputs:** Oura Ring (Sleep/HRV), CGM (Dexcom), Apple Watch, Blood Panels.
    *   **Architecture:** `app/protocols/n1/page.tsx` (Custom Syllabus Grid).
    *   **Header:** `01 // STARTING_SCOPE`.

### **[PROTOCOL FAMILY] // THE FAMILY OS**
*   **Mission:** To engineer the operating system for family health, logistics, and data ownership in India.
*   **Color Identity:** Orange (`text-orange-500`, `bg-orange-500`).
*   **Status:** **ACTIVE // LEARNING**
*   **Focus:** Family Health Security, Data Sovereignty, Logistics.
*   **Tech/Data Stack:**
    *   **Concept:** Context-aware health engine. Solving "The Broken Loop" of Indian Healthcare.
    *   **Architecture:** `app/protocols/family_os/page.tsx` (Custom Research Page).
    *   **Header:** `01 // STARTING_SCOPE`.

### **[PROTOCOL CLINICAL] // THE CLINICAL OS**
*   **Mission:** To research and solve the operational chaos of independent primary care clinics in India.
*   **Color Identity:** Blue (`text-blue-500`, `bg-blue-500`).
*   **Status:** **ACTIVE // LEARNING**
*   **Focus:** Clinical Operations, Documentation Debt, Patient Trust.
*   **Tech/Data Stack:**
    *   **Concept:** "The 3-Minute Reality" // Solving time-constraints in Indian clinics.
    *   **Architecture:** `app/protocols/clinical_os/page.tsx` (Custom Research Page).
    *   **Header:** `01 // STARTING_SCOPE`.

---

## 3. THE HIDDEN LAYERS (SECRETS - IMPLEMENTATION DETAIL)
These are easter eggs embedded in the application logic.

### **GENESIS BLOCK**
*   **Location:** Footer Component (`components/layout/footer.tsx`).
*   **Trigger Logic:**
    *   User clicks the text "SYSTEM_STATUS" (`handleStatusClick`).
    *   **Condition:** `clickCount === 7`.
*   **Payload:**
    *   Opens `GenesisModal`. A Matrix-style dedication to Parents & Friends who saved the user during the reboot.
    *   **Timestamp:** Hardcoded "2026-02-11".

### **PROTOCOL L (LAYAS)**
*   **Location:** Navbar Component (`components/layout/navbar.tsx`).
*   **Trigger Logic:**
    *   User clicks the "Tharun Health Lab" Logo/Hexagon (`handleLogoClick`).
    *   **Condition:** `logoClicks === 4` (5th click triggers).
*   **Security:**
    *   **Password:** "**LAYAS**" (Case-insensitive check).
*   **Payload:**
    *   A "Rose Gold" full-screen affirmation of wholeness.
    *   Theme: `text-rose-500`.

---

## 5. CONTENT PHILOSOPHY (LAB NOTES)
This is not a blog. It is a "Proof of Work" log.
*   **Format:** Raw Markdown (`YYYY-MM-DD-notes-00X-slug.md`).
*   **Cadence:** Daily (90-Day Streak).
*   **Mechanism:**
    *   **Creation:** `node scripts/new-note.js "Title" <Protocol_ID>` (Auto-numbers & timestamps).
    *   **Styling:** Gradient Tags based on Protocol (Emerald/Orange/Blue).
    *   **Archives:** Full chronological log at `/notes` (Archive Page).
*   **Goal:** To document the engineering of health.

---

## 6. THE CURRICULUM (N=1 DATA)
The academic structure extracted from `lib/n1-data.ts`.

### **MX (Medical Foundations)**
*   **Focus:** Understanding the fundamental systems of the human organism.
*   **Modules:** Anatomy, Physiology, Biochemistry, Neurobiology.

### **NX (Nutritional Chemistry)**
*   **Focus:** Moving beyond 'diet' into molecular fuel and signaling.

### **PX (Applied Performance)**
*   **Focus:** Engineering output through physics and programming.

### **DX (Diagnostics & Data)**
*   **Focus:** Verifying health through metrics, bloodwork, and correlation.

---

> **END OF MASTER CONTEXT**
