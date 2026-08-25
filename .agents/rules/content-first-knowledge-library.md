# Content-First Knowledge Library Rules

## 1. Repository Philosophy
- **Knowledge Over Applications**: This repository is a content-first knowledge system. The Notebook is a reading and retrieval library, NOT an application platform.
- **Radical Simplicity**: Learning usefulness is more important than application complexity. Git history preserves past application experiments (such as Credit Risk OS).
- **No Unsolicited Simulators**: Do not build large simulators, dashboards, interactive games, or operating systems unless explicitly requested by the user.
- **Standalone Artifacts**: Prefer excellent, self-contained HTML Field Cards and Markdown Mastery Manuals.

## 2. Content Ownership & Single Source of Truth
- **Canonical Root**: `content/` is the SINGLE source of truth for all knowledge assets.
  - HTML Field Cards live ONLY under `content/field_cards/<category>/`.
  - Markdown Mastery Manuals live ONLY under `content/manuals/<category>/`.
- **No `public/` Duplication**: Do NOT manually duplicate or copy Field Cards or Manuals into `public/`. Content is served dynamically and directly from `content/`.
- **No Manual Catalogs**: Do NOT manually maintain index files, registries, or hardcoded array manifests. The Notebook dynamically discovers content from the filesystem.

## 3. Mandatory Categories
Use ONLY the four major domain classifications:
```text
content/
├── field_cards/
│   ├── finance-risk/
│   ├── ai-data-tech/
│   ├── business-product/
│   └── general-reference/
└── manuals/
    ├── finance-risk/
    ├── ai-data-tech/
    ├── business-product/
    └── general-reference/
```
- Do NOT create additional top-level categories (such as `cheatsheets`, `architecture`, `sql`, `regulation`, `ifrs9`, `basel`, etc.). Map topics into the 4 major domains.
- Avoid deep folder nesting unless explicitly requested.

## 4. Note Creation Workflow
- **One Note at a Time**: Create knowledge artifacts sequentially, one at a time.
- **Standard Sequence**:
  ```text
  draft one note -> read/review completely -> identify gaps -> improve -> finish -> next note
  ```
- **No Speculative Mass Creation**: Do not batch-create large empty folder structures or speculative roadmap files.

## 5. Complexity Rule
Before proposing or building any new feature, evaluate:
> *"Does this materially improve reading, learning, retrieval, or search?"*

If the answer is no, do NOT build it.

## 6. Repository Safety & Surgical Edits
- Preserve unrelated portfolio code, pages, and components (`/work`, `/story`, `/connect`, core layout).
- Do not perform opportunistic refactors or dependency upgrades.
- Always check usages before deleting any code or file.
