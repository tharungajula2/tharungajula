# ARCHIVED TEXTBOOKS

This directory contains reference textbooks taken out of the build on **2026-08-04**.

## Contents
- `_archive/content/credit-risk/`: 18 volumes of Indian Retail Credit Risk textbook content.
- `_archive/content/fde/`: 10 volumes of Forward Deployed Engineering textbook content.
- `_archive/routes/library/`: Library route components (`/notebook/library`).

## How to Restore to Build

To restore the textbooks and library routes back into the Next.js production build:

1. **Move content back to `content/`**:
   ```bash
   git mv _archive/content/credit-risk content/credit-risk
   git mv _archive/content/fde content/fde
   ```

2. **Move routes back to `app/notebook/library`**:
   ```bash
   git mv _archive/routes/library app/notebook/library
   ```

3. **Update Next.js Redirects**:
   In `next.config.ts`, remove or comment out the `/notebook/library` redirect rules.

4. **Update `tsconfig.json`**:
   Remove `"_archive"` from the `exclude` array in `tsconfig.json`.

5. **Re-run Build**:
   ```bash
   npm run build
   ```
