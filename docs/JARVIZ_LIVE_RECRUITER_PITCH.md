# JARVIZ Live — Recruiter Pitch Guide

This document prepares you for technical and product interviews by distilling JARVIZ Live into high-frequency pitches and architectural evidence.

---

## ⏱️ The 30-Second Elevator Pitch
> *"I built JARVIZ Live to showcase how we can transform standard web applications into interactive, embodied AI spaces. It sits on top of my Next.js 16 portfolio as a futuristic cockpit. Recruiters can wave their hands to trigger real-time 3D canvas LookAt responses and page navigations using local MediaPipe computer vision. They can also use native voice commands to move through pages with zero latency, and ask open-ended questions streamed directly from Gemini over a secure serverless Edge route. When they exit, a complete lifecycle teardown kills all background tracks to ensure absolute client-side efficiency."*

---

## ⏱️ The 2-Minute Deep Pitch
> *"Most AI features on web portfolios are simple, text-based chatbots bolted onto a sidebar. For JARVIZ Live, I wanted to design a cohesive, multi-modal human-computer interaction layer. The cockpit coordinates local, on-device capabilities with cloud-based generative intelligence. 
> 
> For navigation and interaction, we use `@mediapipe/tasks-vision` to process webcam frames locally within the browser, avoiding any video upload. We then translate those gestures into synthetic pointer movements to drive a 3D robot head LookAt swivel system, alongside instant route transitions. We combine this with native Web Speech grammar parsing so visitors can navigate vocally with zero API latency.
>
> When the user asks a natural question like 'Tell me about Tharun's background,' the state machine switches gears—forwarding the query to a secure server-side Next.js Edge route that streams token-by-token responses from Gemini using Server-Sent Events, complete with an interactive blinking cursor and real-time SpeechSynthesis voice confirmation.
>
> Crucially, as a systems architect, I engineered a robust, non-overlapping cleanup pipeline. When you close the cockpit, it instantly closes camera tracks, halts microphone listeners, flushes speech buffers, and aborts pending streams. This demonstrates not just AI integration, but real production-ready, resource-safe engineering."*

---

## 🚀 5 AI & Agentic Product Thinking Proofs
1.  **Intent-Driven Routing**: Uses a deterministic parsing system for immediate actions ("show work" routes locally with zero latency) and defers to Gemini only for unstructured queries, optimizing performance and cost.
2.  **Multimodal Synergy**: Integrates computer vision (MediaPipe) and voice (Web Speech API) into a single unified FSM state coordinate system.
3.  **Client-Side AI Decoupling**: Implements local spatial hand tracking entirely on-device, preserving user privacy.
4.  **Recruiter-Friendly Onboarding**: Includes a built-in "Command Manual" containing a live interactive checklist to guide first-time visitors through the demo steps.
5.  **User-Driven Intent Halting**: Provides a functional "Stop Response" interrupt button to instantly abort streaming fetches and speech synthesizer outputs.

---

## 💻 5 Technical Engineering Proofs
1.  **TypeScript Type Safety**: Built with robust interfaces and strictly typed FSM transitions, verified with zero compilation errors (`tsc --noEmit`).
2.  **Asynchronous Stream Cancellation**: Leverages standard JavaScript `AbortController` bindings inside client components to safely terminate pending streaming fetch events.
3.  **Low-Footprint Camera Loops**: Lazily imports `@mediapipe/tasks-vision` dynamically on-demand, keeping initial site bundle size exceptionally lightweight.
4.  **CPU Log Interception**: Implemented custom interceptors to suppress TensorFlow delegate warnings, keeping recruiter browser developer consoles completely clean.
5.  **React Memory Protection**: Uses clean-up hooks inside all engine components to fully terminate canvas anim loops, SpeechSynthesis utterances, and camera streams on unmount.

---

## 🎨 5 Product Design & UX Proofs
1.  **Cybernetic Glassmorphism Styling**: Uses custom glass boundaries, glowing cyan elements, and purple high-priority streaming banners to match the premium futuristic portfolio aesthetic.
2.  **Live Active Viewport indicators**: Features a dynamic header chip displaying the exact viewport state of the underlying application.
3.  **Cinematic Action Banners**: Displays sliding notifications when navigation is confirmed, making gestures feel tactile and responsive.
4.  **Blinking Terminal Cursor**: Features a flashing text cursor (`█`) inside the transcript console to visually signal active background generation.
5.  **Mobile Viewport Guard**: Automatically detects smaller screens, warning the user of the optimal desktop chrome layout while keeping typed commands fully accessible.
