# LIFE LAB: Content Contract

This directory contains the source-of-truth markdown files for the Life Lab clinical repository.

## Directory Structure

```text
content/life-lab/
├── universes/
│   └── [universe-id]/
│       └── metadata.md        <-- Universe Hero Title & Description
└── modules/
    └── [universe-id]/
        └── M01-my-module.md   <-- Long-form Module Content
```

## 1. Universe Metadata (`metadata.md`)

Each universe folder must contain a `metadata.md` file with at least these fields:

```markdown
---
id: foundations-of-human-health
title: Foundations of Human Health
moduleCount: 12
status: active
contentType: Masterclass
---
# Description body (optional fallback)
```

## 2. Module Frontmatter Schema

New modules should follow this schema to ensure correct ingestion and SEO:

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | **Required**. Display title of the module. |
| `slug` | `string` | **Required**. URL slug (without /). |
| `module_number` | `number` | **Required**. Used for ordering (e.g. 1, 2, 3). |
| `universe` | `string` | **Required**. Matches the universe folder name. |
| `summary` | `string` | Recommended. Used for SEO meta-description. |
| `reading_time` | `number` | Reading time in minutes. |
| `status` | `string` | `draft` or `published`. |
| `difficulty` | `string` | `beginner`, `intermediate`, `advanced`. |
| `public` | `boolean` | Set to `false` to hide from sitemap/listings. |

## 3. Validation

Before committing new content, run the validation script from the root:

```bash
node scripts/validate-life-lab.mjs
```

The system will fail to build if any module has a duplicate `slug` or `module_number` within the same universe.
