# ATLAS OS: Operational Workflow (The "Note Drop" Protocol)

This document defines the standardized procedure for adding or modifying content within the Atlas Knowledge Engine. By following this protocol, you ensure that the logic, metadata, and filesystem remain perfectly synchronized.

---

## 1. The "Note Drop" Sequence

This is the fastest path for moving raw thought into the Atlas index.

### Step 1: Manual Drop (User)
The User can directly drop any `.md` file into one of the canonical module folders:
- `/content/atlas/modules/wellness/`
- `/content/atlas/modules/cognition/`
- `/content/atlas/modules/reasoning/`
- `/content/atlas/modules/human-ecosystem/`
- `/content/atlas/modules/sandbox/`

### Step 2: Synchronization Trigger (AI Command)
The User asks the AI: **"Sync Atlas [Universe ID]"** or **"Audit the [id] track."**

### Step 3: AI Processing (Automated Audit)
The AI will then perform a surgical audit of that specific folder and execute the following:
1.  **Metadata Extraction**: Read the new files to identify core themes and update the `teaserTopics` in both `metadata.md` and `lib/atlas/data.ts`.
2.  **Registry Sync**: Update the `moduleCount` in `lib/atlas/data.ts` to reflect the new number of files.
3.  **Frontmatter Normalization**: Automatically apply/fix the following frontmatter in the new files:
    - `universe`: Matches the canonical ID.
    - `module_number`: Re-indexed based on the alphabetical order of the files.
    - `status`: Default to "live" unless specified.

---

## 2. Universe Maintenance

### Adding a New Universe
1.  **Physical**: Create `content/atlas/universes/[id]` and `content/atlas/modules/[id]`.
2.  **Identity**: Create `content/atlas/universes/[id]/metadata.md` (The "ID Card").
3.  **Registry**: Add the entry to the `ATLAS_UNIVERSES` array in `lib/atlas/data.ts`.

### Archiving a Track
1.  **Surgical Move**: Move the entire modules folder to `/shelf/atlas/modules/[id]_archive/`.
2.  **Status Update**: Change the status in the main registry (`data.ts`) and the universe `metadata.md` to "archived".

---

## 3. Guiding Principles
- **Monoculture Metadata**: The `metadata.md` in the `universes` folder is the single source of truth for the "ID Card" of that track.
- **Sequential Priority**: In the `wellness` track, files should be prefixed (e.g., `M01-`, `M02-`) to ensure a forced ladder progression.

---
*Protocol established: 2026-04-09*
