# JARVIZ Live — Final Pre-Flight QA Checklist

Run through these verification tests to guarantee a bulletproof deployment.

---

## 🏗️ 1. Build & Type Safety
- [ ] **TypeScript Check**: `npx tsc --noEmit` compiles with 0 errors.
- [ ] **Production Next.js Build**: `npm run build` runs and outputs optimized files successfully.

## 🎛️ 2. Cockpit Lifecycle & Overlays
- [ ] **Initialization**: Clicking the **"Talk to Me"** button slides in the cinematic overlay.
- [ ] **Viewport Status**: Dynamic header display indicates correct active tab viewports (Thesis, Work, Story, Connect).
- [ ] **Command Manual**: Click manual; manual card displays correctly alongside the recruiter checklist grid.
- [ ] **Exit Teardown**: Closing the cockpit (or clicking Exit/Escape) instantly halts active streams, synthesizers, and media inputs.

## 🖐️ 3. Computer Vision & LookAt (VisionEngine)
- [ ] **Consent**: Camera prompt card appears and blocks rendering until confirmed.
- [ ] **Active Tracking**: PIP webcam output mirrors hand tracking successfully.
- [ ] **lookAt Swivel**: The 3D robot head swivels smoothly following hand positions.
- [ ] **Gesture Intent Navigation**:
    - [ ] *Swipe Right* navigates to Work section.
    - [ ] *Swipe Left* navigates to Story section.
    - [ ] *Point Up* navigates to Connect section.
- [ ] **Fist Pause**: Closed Fist pauses the tracking engine; hand tracking indicator updates.
- [ ] **Console Cleanliness**: Intercepts and blocks TensorFlow delegate logs in standard devtools console.

## 🗣️ 4. Voice Controls (VoiceEngine)
- [ ] **Mic Toggle**: Clicking the microphone toggles visual listening pulse states.
- [ ] **Deterministic Parsing**:
    - [ ] Saying *"go home"* returns to Thesis dashboard.
    - [ ] Saying *"show work"* loads Projects dashboard.
    - [ ] Intent logs print beautifully (e.g. `VOICE: "go home" → THESIS`).
- [ ] **Speech Confirmations**: Robot vocalizes actions (e.g. *"Returning to core thesis."*) using the optimal voice rate.

## 🧠 5. Gemini SSE Integration
- [ ] **Query Execution**: Asking a complex question (e.g., *"Why is this different?"*) streams tokens live.
- [ ] **Streaming Indicators**:
    - [ ] Dynamic blinking block cursor `█` flashes beside text streams.
    - [ ] FSM readouts show purple `GEMINI STREAM ACTIVE` pulse status.
- [ ] **Deterministic Override**: Typing/saying deterministic commands (e.g. *"go home"*) triggers instant local routing, bypassing Gemini edge fetches completely.
- [ ] **Direct Interrupt**: Clicking the crimson **Stop Response** button immediately terminates the edge route connection, aborts fetch controllers, and halts synthesizers.

## 📱 6. Mobile & Browser Support
- [ ] **Advisory Guard**: Displaying on small viewport screens (<1024px) reveals the yellow system advisory banner.
- [ ] **Keyboard fallback**: Inputs remain fully active, allowing full keyboard control of the virtual workspace on touch interfaces.
