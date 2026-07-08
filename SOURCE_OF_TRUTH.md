---
# SOURCE OF TRUTH: Tharun Gajula - Portfolio Architecture
**Last Updated:** 2026-07-08

## 1. VISION & SYSTEM OVERVIEW
- **Core Purpose:** A highly interactive, multimodal portfolio designed to showcase product management, AI integration, and engineering capabilities. The system acts not just as a resume, but as a live demonstration of advanced UI/UX principles, 3D rendering, and conversational AI.

## 2. ARCHITECTURAL BLUEPRINT
- **Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Spline (3D), Google Gemini AI.
- **Directory Topology:**
  - `app/`: Next.js App Router structural core (page definitions, API routes like `/api/chat`).
  - `components/`: Modular React components (UI panels, 3D wrappers).
    - `components/ui/`: Reusable primitive components and standalone complex panels like `AIChatPanel`.
  - `lib/`: Utility functions and context providers.
  - `public/`: Static assets.
- **Data Pipeline:** Client-side interaction triggers state changes (e.g., opening Chat). Chat UI communicates with the Next.js API route (`/api/chat`), which interfaces with the Gemini AI model to stream back responses, providing a dynamic conversational layer over the static portfolio data.

## 3. FUNCTIONAL INVENTORY
- `app/page.tsx`: The master layout and orchestrator. Handles top-level navigation state, tab rendering (`home`, `work`, `story`, `connect`, `blog`), and absolute positioning of the multimodal UI overlay.
- `components/SplineAvatar.tsx`: Integrates the Spline 3D model, manages the "AI EXPLORER" HUD, and triggers the conversational UI.
- `components/ui/AIChatPanel.tsx`: A glassmorphic, slide-up chat interface featuring Markdown rendering, system status indicators, and streaming AI response handling.
- `components/WorkGallery.tsx` & `WorkOverview.tsx`: Display components for case studies and analytical work, categorized by tab state.
- `components/EvolutionTimeline.tsx`: A stylized chronological narrative of professional history.
- `components/BlogPage.tsx`: A placeholder "Coming Soon" page mimicking system updates for future technical field notes.
- `app/api/chat/route.ts`: Server-side endpoint routing user prompts to the Gemini model with specific system prompts governing the persona.
---
