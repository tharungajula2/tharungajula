# PROTOCOL REPLACEMENT GUIDE (Standard Operating Procedure)

> **VERSION:** 1.0.0
> **PURPOSE:** To completely replace an existing Protocol (e.g., Clinical) with a New Protocol (e.g., Habitat) without breaking the build or leaving "ghost files."

---

## 1. THE PHILOSOPHY
Replacing a protocol is not just renaming a folder. It is a **System Migration**.
We must update the **Architecture**, **Data Layer**, **Routing Logic**, and **Documentation** simultaneously.

---

## 2. THE CHECKLIST (EXECUTION FLOW)

### PHASE 1: PREPARATION (SAFE MODE)
1.  [ ] **Backup:** Commit all current changes to Git (`git add . && git commit...`).
2.  [ ] **Identify Targets:** Clearly define:
    *   **OLD_PROTOCOL_ID:** (e.g., `clinical_os`, `n1`)
    *   **NEW_PROTOCOL_ID:** (e.g., `habitat`, `new_protocol`)
    *   **COLOR_THEME:** (Emerald, Orange, Blue, or New Color)

### PHASE 2: ARCHITECTURAL RESET
1.  [ ] **Create New Directory:**
    *   Action: Create `app/protocols/[NEW_PROTOCOL_ID]/page.tsx`.
    *   *Note: Do not delete the old folder yet.*
2.  [ ] **Scaffold New Page:**
    *   Action: Copy structure from a stable protocol (e.g., `n1/page.tsx`).
    *   Update: Header (`RESEARCH_AREAS`), Status (`CONCEPT_PHASE`), and Color Theme.

### PHASE 3: THE SWITCHOVER (CORE LOGIC)
1.  [ ] **Update Protocol Metadata (`lib/protocols.ts`):**
    *   Action: Replace the old ID entry with the new one.
    *   *Critical:* Ensure the `id` matches the new folder name exactly.
2.  [ ] **Update CLI Tools (`scripts/new-note.js`):**
    *   Action: Update the CLI mapping so new notes are created with the correct tag/color.
3.  [ ] **Update Content Headers (`components/layout/header.tsx` etc.):**
    *   Action: Search for hardcoded links or names in Navbars/Footers.

### PHASE 4: CLEANUP (DESTRUCTIVE ACTION)
**⚠️ CRITICAL STEP:** This is where we remove the traces.
1.  [ ] **Delete Old Directory:**
    *   *AI Action:* I will attempt `run_command: rmdir /s /q app/protocols/[OLD_ID]`.
    *   *User Action (Fallback):* If Windows locks the file (common with Dev Servers), I will ask you to delete the folder manually.
2.  [ ] **Search & Destroy (Ghost Hunting):**
    *   Action: `grep_search` for `[OLD_ID]` (e.g., `habitat`) across the entire `d:/...` directory.
    *   **Legacy Check:** Also search for `clinical_os` one last time to ensure no ancient artifacts remain.
    *   Fix: Replace any remaining imports, text references, or roadmap mentions.

### PHASE 5: DOCUMENTATION SYNC
1.  [ ] **Update Master Docs:**
    *   `PROJECT_CONTEXT.md`: Update Protocol name, mission, and status.
    *   `TECHNICAL_ARCHITECTURE.md`: Update directory map and color logic.
2.  [ ] **Update Notes (Optional):**
    *   Run a `sed` or replace command on existing markdown notes if tags need to change.

---

## 3. HOW TO REQUEST THIS TASK
When you want to replace a protocol, simply prompt:

> "Initiate Protocol Replacement: Replace [OLD_PROTOCOL] with [NEW_PROTOCOL]. Color: [COLOR]. Mission: [BRIEF_DESCRIPTION]."

I will then:
1.  Follow this guide step-by-step.
2.  Ask you to manually delete the folder if my tools fail (to protect safety).
3.  Verify the build before finishing.

---

**Status:** READY FOR FUTURE MIGRATIONS.
