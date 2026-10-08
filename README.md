# Tharun Gajula

A single, unified, mobile-first Web Application for Tharun Gajula — notes library, builds showcase, and writing.

## Unified Route Map
- `/` - **Home**: Logo hero, intro, contact links, AI notes spotlight, and entry cards.
- `/notes` - **Notes Library**: AI-first notes shelf, topic filtering, masterclass cards, and reading statistics.
- `/notes/[slug]` - **Note Reader**: Focus reading experience, Table of Contents sidebar, KaTeX rendering, Shiki code highlighting, and Mermaid diagrams.
- `/builds` - **Builds**: Flagship projects and interactive simulations showcase.
- `/builds/credit-risk-city` - **Credit Risk City**: Interactive 3D credit risk ecosystem simulation.
- `/writing` - **Writing**: Long-form posts and articles list.
- `/writing/[slug]` - **Post Reader**: Reading experience for posts.

## Core Rules & Architecture
1. **One App Only**: This repo is a single unified Next.js application. All legacy `/agent`, `/vault`, or separate subfolders are permanently deprecated and redirected.
2. **Notes Contract**: The notes processing engine lives exclusively in `lib/notes/` and `components/notes/`. Markdown source files live in `content/notes/`.
3. **Design Tokens**: Single canonical light-mode design system defined in `app/globals.css` using HSL/CSS custom variables (`#FAFAF9` canvas, `#0F172A` ink, `#2563EB` accent).

## Development
```bash
npm run dev    # Start Turbopack development server
npm run build  # Perform clean production build
```
