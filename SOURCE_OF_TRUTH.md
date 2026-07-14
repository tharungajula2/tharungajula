---
# SOURCE OF TRUTH: Tharun Gajula - Portfolio Architecture
**Last Updated:** 2026-07-14

## 1. VISION & SYSTEM OVERVIEW
- **Core Purpose:** A highly interactive, multimodal portfolio designed to showcase product management, AI integration, and engineering capabilities. The system acts not just as a resume, but as a live demonstration of advanced UI/UX principles, 3D rendering, and conversational AI.

## 2. ARCHITECTURAL BLUEPRINT
- **Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Spline (3D), Google Gemini AI.
- **Directory Topology:**
  - `app/`: Next.js App Router structural core, containing static/dynamic route page definitions (`/`, `/work`, `/story`, `/connect`, `/blog`) and server-side API endpoints (`/api/chat`).
  - `components/`: Modular React components (UI panels, 3D wrappers, pages).
    - `components/ui/`: Reusable primitive components and standalone complex panels like `AIChatPanel`.
  - `lib/`: Utility functions, helper scripts, and context providers (e.g., `LayoutContext.tsx`).
  - `public/`: Static assets and image previews.
- **Data Pipeline:** Client-side interaction triggers state changes (e.g., opening Chat). Chat UI communicates with the Next.js API route (`/api/chat`), which interfaces with the Gemini AI model to stream back responses, providing a dynamic conversational layer over the static portfolio data.

## 3. FUNCTIONAL INVENTORY
- `app/layout.tsx`: Root wrapper containing font configurations, global styles, viewport-wide background grids, and the `LayoutProvider`.
- `app/ClientLayout.tsx`: The primary layout orchestrator. Manages header/brand links, bottom navigation dock, work sub-tab bar, AI Chat panel, scanlines, and client-side view states.
- `app/page.tsx`: Landing view hosting `SplineAvatar`.
- `app/work/page.tsx`: Renders Capability Overview or the dynamic project galleries.
- `app/story/page.tsx`: Houses `EvolutionTimeline`.
- `app/connect/page.tsx`: Houses `ConnectPage`.
- `app/blog/page.tsx`: Renders the blog/placeholder screen.
- `components/SplineAvatar.tsx`: Integrates the Spline 3D model, manages the "AI EXPLORER" HUD, and triggers the conversational UI.
- `components/ui/AIChatPanel.tsx`: A glassmorphic, slide-up chat interface featuring Markdown rendering, system status indicators, and streaming AI response handling.
- `components/WorkGallery.tsx` & `WorkOverview.tsx`: Display components for case studies and analytical work, categorized by tab state.
- `components/EvolutionTimeline.tsx`: A stylized chronological narrative of professional history.
- `components/BlogPage.tsx`: A placeholder "Coming Soon" page mimicking system updates for future technical field notes.
- `app/api/chat/route.ts`: Server-side endpoint routing user prompts to the Gemini model with specific system prompts governing the persona.
---
