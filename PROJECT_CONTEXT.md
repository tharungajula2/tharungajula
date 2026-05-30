# THARUN GAJULA — PROJECT_CONTEXT.md
**Version: 35.0 — INTEGRATED JARVIZ LIVE MULTIMODAL EMBODIED COCKPIT**
**Last Verified: May 30, 2026**
**Status: ACTIVE RELEASE (Phase 4.5 Stable, Optimized & Scrollable)**

> AGENT DIRECTIVE: This file is the single source of truth. It is rebuilt from full codebase scan, not from memory or assumption. Every detail here is verified against actual source files.

---

## 1. IDENTITY & MISSION
- **Owner**: Tharun Gajula
- **Archetype**: Agentic AI Product Manager & Systems Architect.
- **Focus**: Practical **Agentic AI Engineering** and cognitive architecture design balanced through a high-ownership Product Manager lens (avoiding purely academic framing).
- **Core Value**: Transforming complex, high-friction domains (Clinical, Quantitative, Institutional Finance) into highly aesthetic, logical, and production-grade product architectures.
- **Target Role Intent**: Seeking high-ownership Product Management (PM), AI PM, 0-to-1 PM, or Founder's Office roles at early-stage startups in Bengaluru.

---

## 2. EXACT TECH STACK & ENVIRONMENT (VERIFIED)
- **Framework**: Next.js App Router (Next.js 16)
- **Styling**: Tailwind CSS v4 & Vanilla CSS
- **Animation**: Framer Motion
- **3D Interactive**: Spline (`SplineAvatar` / `SplineController`)
- **Computer Vision**: MediaPipe GestureRecognizer (`@mediapipe/tasks-vision@0.10.35`) via CDN & single-flight loader.
- **Speech API**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) with safe async queue controls.
- **AI Integration**: Gemini 2.5 Flash-Lite via direct REST API proxy running on Vercel Edge Runtime with Server-Sent Events (SSE).
- **Interactivity**: Fully optimized layout for dual-responsive modes: desktop widescreen grid systems and adaptive scrolling glassmorphic overlays for laptops and mobile.
- **Environment Variables**: Requires `GEMINI_API_KEY` for the edge endpoint `/api/chat` to function.

---

## 3. FOLDER ARCHITECTURE (VERIFIED)
```
/app
  /layout.tsx — Global ambient effects (cyan/purple orbs, grid patterns), custom fonts.
  /page.tsx — Main OS single-page shell controller; handles activeTab routing.
  /sitemap.ts — XML sitemap generator.
  /api/chat/route.ts — Vercel Edge Runtime Gemini streaming proxy route.
/components
  /ui
    AIChatPanel.tsx — Slide-up portfolio AI chatbot interface.
  /jarviz
    JarvizCockpit.tsx — Master Cinematic Cockpit overlay container & FSM coordinator.
    VisionEngine.tsx — Client-side camera stream manager & MediaPipe CV parser.
    VoiceEngine.tsx — Native SpeechRecognition intent listener.
    SplineController.ts — Synthetic LookAt coordinate dispatcher.
    RobotLivenessOverlay.tsx — Expressive SVG HUD character visualization layer.
    /hud
      HudFrame.tsx — Glassmorphic tech borders and scanline overlay.
      ConsentCard.tsx — Multimodal connectivity and consent gate.
      StatusReadout.tsx — Real-time state machine diagnostic readout.
      GestureTelemetry.tsx — Webcam picture-in-picture stream & tracking meter.
      TranscriptPanel.tsx — Dynamic SSE response renderer & terminal input.
      CommandMap.tsx — Interactive Command Manual and recruiter demo checklist.
  ConnectPage.tsx — Minimalist, high-impact CTA contact layout.
  EvolutionTimeline.tsx — Clinical HUD career timeline.
  SplineAvatar.tsx — 3D Robot Avatar with Chest HUD.
  WorkOverview.tsx — Capability pillar-based map.
  WorkGallery.tsx — Sleek responsive CSS grid rendering project cards.
/lib
  /jarviz
    useJarvizStore.ts — Lightweight Zustand-like central state bus & FSM.
    speech.ts — SpeechSynthesis queue controller.
    commands.ts — Local command dictionary and intent parsers.
  ai-context.ts — Master AI knowledge base (matching V6 profile).
/data
  systems.ts — Static data for prototypes and quantitative projects.
```

---

## 4. UI ARCHITECTURE & ROUTING (VERIFIED)
- **Public OS**: Single-page application (`app/page.tsx`) using state (`activeTab`) instead of standard Next.js directory routing.
- **Views**:
  - `thesis`: 3D Spline avatar with floating pill logo and "Talk to Me" trigger (slides in the immersive **JARVIZ Live cinematic cockpit overlay**).
  - `neural`: Split view featuring the premium glassmorphic 3-Tab selector layout (**defaults to Tab 2 "Product Lab (AI Systems)" on toggle/click**):
    - **Tab 1: "Overview"**: Renders `WorkOverview.tsx` capability pillars and an expandable **"View Production Stack"** container.
    - **Tab 2: "Product Lab (AI Systems)"**: Renders `WorkGallery.tsx` with high-aesthetic screenshots of functional prototypes.
    - **Tab 3: "Analytics & Quant"**: Renders `WorkGallery.tsx` with quantitative codebase cards.
  - `evolution`: Renders `EvolutionTimeline.tsx` chronicling journey milestones.
  - `connect`: Renders `ConnectPage.tsx` focusing purely on high-impact CTAs.

---

## 5. BRANDING & DESIGN TOKENS (VERIFIED)
- **Primary Accent**: Bio-Scan Cyan (`#06b6d4` / `cyan-400`).
- **Secondary Accent**: Neural Purple (`#a855f7` / `purple-500`).
- **Typography**: 
  - Monospace: JetBrains Mono (`--font-mono` - Technical labels, logs, code, telemetry).
  - Headings: Outfit (`--font-outfit` - Modern, clean PM/Architect posture).
  - Body: Inter (`--font-inter` - Readable content blocks).

---

## 6. MODULE STATUS
- **THESIS (HOME)**: WORKING (3D Spline + Fully operational cinematic **JARVIZ Live Embodied Cockpit Overlay**).
- **WORK (TABS SYSTEM)**: WORKING (Perfect tab transitions between Overview, Product Lab, and Analytics grids).
- **STORY (EVOLUTION)**: WORKING (Evolution Timeline with clean, non-retrospective milestone wording).
- **CONNECT**: WORKING (Minimalist CTA layout linking exclusively to LinkedIn, GitHub, and email).

---

## 7. JARVIZ LIVE SYSTEM IMPLEMENTATION DETAILS (VERIFIED)
- **Webcam Hand Tracking**: Renders a PiP window (`GestureTelemetry.tsx`) running real-time, on-device gesture analysis. Extracts normalized MCP indexes to trigger synthetic mouse positions, swiveling the 3D robot head seamlessly.
- **Local Intent Parsing**: Processes speech inputs locally with zero-latency regex matching (e.g. `"show work"`, `"go home"`) to trigger instant activeTab transitions.
- **Gemini SSE streaming**: Open-ended queries automatically stream text tokens into the HUD terminal via server-sent events, featuring a realistic terminal cursor block (`█`) and a dedicated **Stop Response** interrupt controller.
- **Embodied Character HUD**: Layered SVG elements expand, contract, glow, and change colors to clearly convey the robot's real-time state transitions (`WAKING`, `LISTENING`, `THINKING`, `SPEAKING`, `PAUSED`).
- **Adaptive Layout & Scroll**: Combines static glassmorphic overlay frames with `min-h-full` scrollable panels, guaranteeing perfect visibility, zero clipping, and full click interactivity on laptop screens, split-screen browsers, and mobile devices.

---

## 8. WHAT WORKS PERFECTLY RIGHT NOW
- **Identity Consistency**: Every pixel and copy block aligns with the "Agentic AI PM & Systems Architect" archetype.
- **Multimodal Control**: Users can completely drive and navigate the portfolio using hand gestures, voice commands, or typed commands inside the cinematic cockpit overlay.
- **Zero Retrospective 0-1 References**: Past history is strictly referred to as enterprise/institutional Product Ownership, Systems Architecture, and Quantitative Engineering. 0-to-1 is reserved only as an outbound career target.
- **Perfect Build Pipelines**: All code compiles cleanly and builds successfully in production environments.

---
*End of Master Context.*
