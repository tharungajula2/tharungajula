# OPERATIONAL WORKFLOW & REPOSITORY ARCHITECTURE

**Version: 1.0 — The "Zero-Lock" Protocol (2026-04-06)**

> [!IMPORTANT]
> **AI AGENT MANDATE:** This document is the primary operational source of truth. Before performing any filesystem mutations (move, rename, delete) in this repository, you MUST follow the **Manual Command Protocol** described below. **FAILURE TO DO SO LEADS TO SILENT REPOSITORY DRIFT.**

---

## 1. THE WINDOWS "DIRECTORY LOCK" BOTTLENECK

In this Windows environment, certain background processes (Next.js dev server, VS Code indexing, etc.) hold onto file handles. This frequently causes automated `move`, `mkdir`, and `rmdir` commands to:
1. Return a "Running" status without actually completing.
2. Fail silently without surfacing access-denied errors to the AI agent.
3. Leave the repository in an inconsistent state (falsely claimed success).

## 2. THE "ZERO-LOCK" EXECUTION PROTOCOL

When the user requests file/folder reorganization or deletion, every AI agent must follow this 3-step sequence:

### STEP 01: The Surgical Audit
- **Never guess**: Use `grep` and `list_dir` to confirm the exact files and their impact before proposing a move.
- **Check Imports**: Always check the `app/` and `components/` directories for imports to any files intended for the `/shelf`.

### STEP 02: THE MANUAL COMMAND BLOCK
- **Never background**: Do not rely on `run_command` for background filesystem operations.
- **Protocol**: Provide the user with a single, copy-pasteable terminal block (CMD or PowerShell) for all `mkdir`, `move`, and `rename` operations.
- **Visual Clarity**: Clearly separate the terminal commands from the code edits.

### STEP 03: POSITIVE VERIFICATION
- **Trust but Verify**: After the user runs the manual block, the AI agent must perform a fresh `list_dir` and `grep` audit to confirm the files have moved and no broken imports remain.

---

## 3. COMPONENT POLISH & DESIGN GUIDELINES

- **Editorial Tone**: All UI labels must remain "Calm and Clinical." Avoid technical underscores in navigation (e.g., use "Home" not "RETURN_TO_HOME").
- **Minimalist Aesthetic**: Prioritize high-performance, clear-typography surfaces. 
- **The "Shelf"**: The `/shelf` directory is the permanent home for all legacy modules. It is added to `.gitignore` and must never be "un-shelved" unless explicitly requested.

---

## 4. TROUBLESHOOTING CHECKLIST

If a build fails after a purge:
1. Check `components/layout/` for legacy imports.
2. Check `app/layout.tsx` and `app/page.tsx` for unused component references.
3. Ensure the `.next/` cache is not causing a stale reference.

## 5. ATLAS CONTENT CONTRACT

- **Blueprint**: `content/atlas/UNIVERSE_ARCHITECTURE.md` is the master blueprint for universe intent.
- **Metadata**: Every universe must have a `metadata.md` in `content/atlas/universes/[slug]/`.
- **Modules**: Module files (`.md`) must live in `content/atlas/modules/[universe-slug]/`.
- **Resilience**: The content loader in `lib/atlas/content.ts` is resilient to missing directories—always verify with `fs.access` before `readdir`.

---
**This document ensures a reliable, bottleneck-free development experience for Tharun Gajula.**
