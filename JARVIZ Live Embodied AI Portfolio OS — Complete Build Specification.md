# JARVIZ Live: Embodied AI Portfolio OS — Complete Build Specification

> **How to use this document:** Paste this entire spec into a fresh AI coding assistant chat. It assumes no prior context. The IDE agent has full access to Tharun Gajula's existing Next.js 16 portfolio source and will match the UI/UX precisely; this spec governs product architecture, interaction design, technical feasibility, exact build scope, and concrete code patterns. Build it phase-by-phase; do not break the existing portfolio.

---

## 1. Executive Summary
JARVIZ Live is a full-screen "cockpit" interaction layer for Tharun Gajula's existing Next.js 16 portfolio. The "Talk to Me" CTA on the homepage thesis view (which currently opens a cinematic "Coming Soon" modal) instead launches a cockpit overlay that keeps the existing Spline robot visible and surrounds it with a webcam gesture-control panel, a voice interface, a live HUD, and gesture/voice telemetry.

Two pillars must be bulletproof: **(A)** webcam hand-gesture navigation of the portfolio with the robot visibly reacting, and **(B)** a browser voice interface (SpeechRecognition + SpeechSynthesis). The robot's "brain" for natural language is the **EXISTING** Gemini 2.5 Flash-Lite integration at `/api/chat` (SSE streaming, `GEMINI_API_KEY`). There is **NO** local/on-device LLM, **NO** RAG build, **NO** `.litertlm`/WebGPU model hosting.

The hard technical risk — that the IDE agent cannot edit the Spline scene — is solved with a layered "robot liveness" system that works on the current published embed: synthetic-pointer head tracking that hijacks Spline's existing Look At behavior, CSS canvas effects, and HUD overlays, with optional editor-event triggers as an upgrade path.

## 2. Why This Is a Flagship vs a Chatbot
A chatbot is a text box in front of an LLM; hundreds of portfolios have one. JARVIZ Live is an embodied, multimodal computer-vision + voice interface where the visitor controls the portfolio with their hands and voice, and a 3D robot reacts in real time. It demonstrates PM-relevant skills a chatbot cannot: multimodal interaction design, on-device CV, latency budgeting, a deterministic-vs-probabilistic command architecture, graceful degradation, and privacy-by-design. The Gemini layer is a fallback for open-ended questions, not the headline. The headline is: "wave your hand to navigate a portfolio, and the robot follows you."

## 3. Product Positioning
- **Tagline:** "An embodied AI operating system for a portfolio — drive it with your hands and your voice."
- **Audience:** AI/Product hiring managers, recruiters, fellow builders.
- **Positioning vs. peers:** most AI portfolios bolt on a chatbot; JARVIZ Live is an interaction-design artifact that proves embodied/multimodal product thinking.
- **Core promise:** works instantly on desktop Chrome, degrades gracefully everywhere else, never sends your camera to a server.

## 4. Full User-Experience Map / Journey
1. Visitor lands on homepage thesis view; Spline robot follows cursor as today. The "Talk to Me" CTA pulses.
2. Click "Talk to Me" → cockpit overlay fades/scales in over the thesis view (Framer Motion). Robot remains visible, recentered; HUD frame, status readout, and two entry affordances appear: "Enable Camera" and "Enable Voice" (plus "Type a command").
3. **Consent + camera:** explicit privacy copy → on accept, `getUserMedia({video})` → MediaPipe model lazy-loads → small self-view PiP appears with skeleton overlay. Status: `VISION ONLINE`.
4. Hand appears → robot head tracks the hand (synthetic pointer hijack). Gesture telemetry panel shows live detected gesture + confidence.
5. Visitor performs a gesture (e.g., swipe right) → after debounce/cooldown the command confirms → `activeTab` switches to `'neural'` (Work) → robot plays an acknowledge reaction (scale pulse + cyan glow) → HUD logs the command.
6. **Voice:** on enabling voice, continuous listening with interim transcript in HUD. "Show story" → deterministic match → `activeTab='evolution'`. "Why is Tharun good for AI PM roles?" → no deterministic match → routed to `/api/chat` Gemini → streamed answer shown in HUD and spoken via SpeechSynthesis; robot enters `RESPONDING`.
7. **Exit:** "Go home" / fist / Esc / close button → overlay fades out, webcam tracks stopped, recognition aborted, model retained in memory for fast re-entry (or disposed on full unmount).

## 5. Mode Definitions
- **Passive Mode (default):** No camera/mic. Robot follows cursor (existing behavior). Cockpit chrome idle. Zero new permissions, zero CV cost. Also the fallback when CV/voice unsupported.
- **Vision Mode:** Webcam on, MediaPipe running, robot head tracks hand, gestures drive navigation. The flagship pillar A.
- **Command Mode:** The deterministic interpreter layer (shared by gesture and voice) mapping recognized inputs to `activeTab` actions and robot reactions. Fast, offline, no LLM.
- **Voice Mode:** SpeechRecognition listening + SpeechSynthesis responses. Deterministic command grammar first; Gemini fallback for open-ended NL. Pillar B.
- **Accessibility-inspired Gesture Mode:** A discoverable "command map" (two-hands gesture or HUD button) showing all gestures and actions, framed as accessibility-inspired hands-free navigation. NOT sign-language translation.
- **(Explicitly removed) Local Brain Mode:** No on-device LLM. Out of scope.

## 6. Exact Gesture Grammar with Geometric Heuristics

### 6.1 Landmark model
MediaPipe Hand Landmarker/Gesture Recognizer returns **21 landmarks per hand**. Per the Google AI Edge Gesture Recognizer Web guide: *"The x and y coordinates are normalized to [0.0, 1.0] by the image width and height… The z coordinate represents the landmark depth, with the depth at the wrist being the origin. The smaller the value, the closer the landmark is to the camera."* Index map: 0 = WRIST; thumb 1–4 (CMC, MCP, IP, TIP); index 5–8 (MCP, PIP, DIP, TIP); middle 9–12; ring 13–16; pinky 17–20. The TIP of each finger is the last of its four; the PIP is the second. (The hand-landmark model was trained on ~30K real-world images per Google's docs.)

### 6.2 Finger-extended test
For the four non-thumb fingers, a finger is "extended" if its TIP is farther from the wrist (landmark 0) than its PIP joint:
`extended(finger) = dist(tip, wrist) > dist(pip, wrist) * 1.1` (Euclidean on x,y; the 1.1 margin reduces flicker). A simpler camera-upright variant `tip.y < pip.y` works upright but breaks on rotation — prefer the wrist-distance form.

### 6.3 Thumb special case
The thumb curls sideways. Use lateral displacement: thumb extended if `dist(thumbTip(4), indexMCP(5)) > dist(thumbIP(3), indexMCP(5)) * 1.1`; for "thumbs up" specifically also require `thumbTip.y` well above all other tips while the other four are curled.

### 6.4 Gesture definitions (rule-based, per frame)
Compute a 5-bool finger vector `[thumb, index, middle, ring, pinky]`:
- **Open palm:** `[1,1,1,1,1]` → wake/greet.
- **Fist:** `[0,0,0,0,0]` → pause / exit.
- **Thumbs up:** `[1,0,0,0,0]` AND `thumbTip.y < wrist.y` → highlight flagship capability.
- **Point:** `[0,1,0,0,0]` → context action (open Connect when pointing at CTA region).
- **Victory (optional):** `[0,1,1,0,0]` → open command map.
- **Two hands visible:** `results.landmarks.length === 2` → open command map.
- **Swipe left/right:** track wrist (landmark 0) x over a rolling buffer of N=8 frames; if `wristX[t] - wristX[t-7] > 0.18` (normalized) within < 400 ms → swipe right; `< -0.18` → swipe left. Require a roughly open hand during the swipe. Mirror the video with CSS `scaleX(-1)` and decide swipe direction in screen space so motion feels natural (MediaPipe assumes a selfie cam and mirrors handedness).

### 6.5 Confidence, debounce, smoothing, state machine
- Ignore frames with detection/hand-presence confidence < 0.6.
- **Temporal smoothing:** same gesture for K=5 consecutive frames (~150 ms @ 30 fps) → CANDIDATE.
- **Confirmation:** CANDIDATE → CONFIRMED fires the action once.
- **Cooldown:** after a CONFIRMED gesture, ignore new discrete gestures for **1.2 s**. Continuous head tracking is exempt.
- Swipes use the velocity buffer (not the K-frame hold) and their own 1.2 s cooldown.

### 6.6 Recommendation: use MediaPipe GestureRecognizer for the canned set, HandLandmarker math for swipes
MediaPipe's **GestureRecognizer** ships a canned classifier for exactly these categories (confirmed verbatim in Google AI Edge docs): `1 - Closed_Fist, 2 - Open_Palm, 3 - Pointing_Up, 4 - Thumb_Down, 5 - Thumb_Up, 6 - Victory, 7 - ILoveYou` (plus `0 - Unknown`/None). **Recommendation:** use GestureRecognizer as the primary engine — it returns both the gesture category AND the 21 landmarks in one call — map its categories directly to the static gestures, and compute swipe-left/right yourself from the returned wrist-landmark buffer. This removes most custom finger-math risk while still giving raw landmarks for head tracking and swipes.

### 6.7 Gesture → action map (drives existing `activeTab`)
- Open palm → wake/greet (no tab change)
- Swipe right → `activeTab='neural'` (Work)
- Swipe left → `activeTab='evolution'` (Story)
- Point (at CTA) / Pointing_Up → `activeTab='connect'`
- Thumbs up → highlight flagship capability on current view
- Fist → pause vision / exit
- Two hands or Victory → open command map overlay

## 7. Voice Command Grammar + Gemini Fallback Bridge

### 7.1 Browser support reality (2026)
Per LambdaTest's Speech Recognition API browser-support guide: *"It works in Chrome 25+, Edge 87+, Safari 14.1+ on macOS, Safari 14.5+ on iOS, and Samsung Internet 4+, while Firefox keeps it behind a flag"* (the flag `dom.webspeech.recognition.enable` in `about:config`, never enabled for end users). SpeechRecognition remains `webkit`-prefixed. Edge 87+ *"uses Azure Cognitive Services, so audio leaves the device for processing in Microsoft's cloud."* SpeechSynthesis is broadly supported (Chrome, Edge, Firefox, Safari). **Therefore: voice input is a Chrome/Edge/Safari feature with a typed fallback for Firefox; voice output works almost everywhere.**

### 7.2 Recognition setup
`const SR = window.SpeechRecognition || window.webkitSpeechRecognition;` Feature-detect; if absent, show typed input. Configure `continuous = true`, `interimResults = true`, `lang = 'en-US'`, `maxAlternatives = 1`. Show interim transcript live in the HUD. Recognition stops on tab blur and on errors — implement an `onend` handler that restarts recognition while Voice Mode is active, with a short backoff to avoid rapid `no-speech` restart loops.

### 7.3 Deterministic command grammar (parsed first, offline)
Normalize transcript to lowercase, strip punctuation, then match intents by keyword/regex:
- "show work" / "open work" / "projects" / "show ai projects" → `activeTab='neural'`
- "open story" / "story" / "your journey" / "evolution" → `activeTab='evolution'`
- "connect" / "contact" / "get in touch" → `activeTab='connect'`
- "go home" / "home" / "thesis" → `activeTab='thesis'`
- "what can you do" / "help" / "commands" → open command map
- "pause" / "stop listening" → Voice Mode off
Each matched command triggers the action, a short spoken confirmation, and a robot acknowledge reaction.

### 7.4 Gemini fallback bridge
If no deterministic intent matches AND the utterance looks open-ended (heuristic: contains a question word, "?", or > ~4 words with no command keyword), route the final transcript to the EXISTING `/api/chat` endpoint, reusing its SSE streaming exactly as the existing chat does. The route already injects THARUN_CONTEXT and uses `gemini-2.5-flash-lite`. As tokens stream in, append to the HUD; at the first sentence boundary, begin SpeechSynthesis so speech starts before the full answer completes. Set the robot to `ROBOT_RESPONDING` during streaming.

Client SSE consumption pattern (reuse the existing chat helper if present):
```ts
const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'},
  body: JSON.stringify({ message: transcript }) });
const reader = res.body!.getReader();
const decoder = new TextDecoder();
let buf = '';
for (;;) {
  const { value, done } = await reader.read();
  if (done) break;
  buf += decoder.decode(value, { stream: true });
  // parse SSE 'data:' lines exactly as the existing chat component does,
  // extract candidates[0].content.parts[0].text deltas, append to HUD, feed TTS sentence-by-sentence
}
```
The server already uses `:streamGenerateContent?alt=sse` (the `alt=sse` param is required for true SSE chunking rather than a buffered JSON array). **No server changes needed** beyond confirming the route accepts a plain message and returns the SSE stream (it does today for the existing chat).

### 7.5 SpeechSynthesis (robot voice)
- Load voices asynchronously: `getVoices()` may be empty on first call; subscribe to `speechSynthesis.onvoiceschanged` and cache.
- Voice selection: prefer a local en-US voice (`localService === true`, `lang.startsWith('en')`); pick a crisp Google/Microsoft neural en-US voice when present; else default.
- Robotic-but-pleasant feel: `rate ≈ 1.05`, `pitch ≈ 0.9`, `volume = 1`. Keep pitch/rate within 0.1–2 for cross-browser safety. iOS requires `speak()` from a user gesture; Chrome throttles synthesis in background tabs — re-queue on `visibilitychange`. Call `speechSynthesis.cancel()` before speaking a new utterance.

### 7.6 Typed fallback
When SpeechRecognition is unavailable (Firefox) or mic denied, render a mono-styled text input ("Type a command…") wired to the SAME command parser + Gemini bridge. Guarantees the feature works in every browser.

## 8. The Complete Spline Robot Liveness Solution (layered)

The IDE agent cannot open the Spline editor; the scene is an effectively fixed published embed loaded by `SplineAvatar.tsx`. The runtime API (`@splinetool/runtime` via `@splinetool/react-spline`) still exposes powerful controls on a published scene without editor access. Layered system, in priority order:

### Layer 1 — Head tracking via synthetic-pointer hijack (PRIMARY; confirmed mechanism)
The head currently follows the cursor via Spline's built-in **Look At** event, which reads native pointer coordinates (`clientX`/`clientY`) from the element the runtime listens on. The runtime exposes `setGlobalEvents(global: boolean)` — `false` = events listened on the **canvas**, `true` = events listened on **window**. The maintainer-endorsed pattern (splinetool/react-spline issues **#145** and **#161**) for "make Look At respond to pointer movement anywhere" is `spline.setGlobalEvents(true)` in `onLoad`.

**Mechanism:** feed the existing Look At a SYNTHETIC pointer position derived from the detected hand. On load call `setGlobalEvents(true)`, then each MediaPipe frame map the hand position (index-finger MCP or palm center) from normalized webcam coords to viewport pixels and dispatch a synthetic event to window:
```ts
function onLoad(spline){ splineRef.current = spline; spline.setGlobalEvents(true); }
// per detected hand position (hx,hy normalized, already mirrored to screen space):
const rect = canvasEl.getBoundingClientRect();
const clientX = rect.left + hx * rect.width;
const clientY = rect.top  + hy * rect.height;
window.dispatchEvent(new PointerEvent('pointermove', { clientX, clientY, bubbles:true }));
window.dispatchEvent(new MouseEvent('mousemove',   { clientX, clientY, bubbles:true })); // fallback path
```
The existing Look At (with its damping) then drives the head toward the hand automatically — reusing the robot's current behavior, no editor changes. **IMPORTANT:** the synthetic-event step is inferred from Spline's documented event architecture (the maintainer-blessed fix is `setGlobalEvents`; a published working demo of synthetic dispatch was not found). **Phase 0 MUST validate it** by logging inside a Look At listener / observing head motion. If rejected, fall through to Layer 2.

### Layer 2 — Direct object rotation (FALLBACK for head tracking)
`@splinetool/runtime` exposes `findObjectByName`/`findObjectById` returning an `SPEObject` with mutable `position {x,y,z}`, `rotation {x,y,z}`, `scale {x,y,z}`, `visible`, `intensity`. Confirmed verbatim by the official `@splinetool/runtime` README "Move Cube" example: `const obj = spline.findObjectByName('Cube'); ... obj.position.x += 10;`. So if the head/robot object is individually addressable, drive `head.rotation.y/x` toward the hand in a `requestAnimationFrame` loop, using `renderMode:'continuous'` or `spline.requestRender()` to force redraws.
**CAVEAT (from runtime research):** if Look At is still ACTIVE on the same object, manual rotation and Look At fight (jitter, Reset-If spring-back); manual rotation is clean only when Look At is not active on that object — which generally needs an editor change. Layer 2 is therefore a fallback only if Layer 1 is rejected AND the head object is addressable AND Look At does not override it.

### Layer 3 — CSS canvas manipulation (ALWAYS available, no runtime dependency)
Wrap the Spline canvas and apply Framer Motion / CSS transforms and filters:
- Wake/acknowledge: scale pulse 1.0→1.04→1.0 (200–300 ms).
- Listening/active: `filter: brightness(1.1) saturate(1.2)` + cyan `drop-shadow` glow.
- Cyan "scan" state: `filter: hue-rotate()` toward cyan + brightness.
- Thinking/responding: subtle continuous breathing scale + glow loop.
- Error/paused: `filter: grayscale(0.6) brightness(0.8)`.
100% reliable, GPU-cheap, on-brand with Bio-Scan Cyan.

### Layer 4 — HUD overlay reactions (ALWAYS available)
HTML/CSS/Framer-Motion overlays on top of the robot: a chest-HUD status label (augmenting "PRODUCT MANAGER" with live states like `LISTENING` / `TRACKING` / `RESPONDING`), a reticle/scan-line over the head pointing at the tracked hand, a waveform while speaking, a command log. This carries most of the perceived "liveness" regardless of scene access.

### Layer 5 — Editor-event triggers (OPTIONAL upgrade if Tharun gets editor access)
`emitEvent` only meaningfully triggers events DEFINED in the editor's Events panel — it plays that event's configured state transition (first→last). The built-in name union includes `lookAt`/`follow`, but emitting them does **not** feed coordinates (confirmed not to work for driving Look At in issue #161). If Tharun opens the scene, the highest-value additions are 3–4 named state events triggerable via `splineRef.current.emitEvent('eventName', 'ObjectName')`:
- **wake** — head lift + eyes brighten (cockpit open / open-palm)
- **nod** / **acknowledge** — quick nod (confirmed command)
- **listen** — lean-in + glow (Voice Mode active)
- **respond** — light/mouth pulse loop (during Gemini speech)
Nice-to-have, not required for the flagship demo.

### Does Tharun need to re-export the scene?
**No.** Everything in Layers 1–4 works with the current published `.splinecode` embed/URL. Re-export/editor access is only needed for Layer 5. If CORS issues ever appear, self-host the downloaded `.splinecode` in `/public` — per the splinetool/react-spline README: *"If you are experiencing CORS issues, you can download the .splinecode file and self-host it; this will fix any CORS issue."*

## 9. Full Technical Architecture (all layers)
- **Presentation:** `JarvizCockpit` overlay (full-screen, glassmorphism) mounted over the thesis view; preserves cyan/black design tokens.
- **Spline bridge:** `SplineController` wrapping the existing `SplineAvatar`'s `onLoad` to capture the `Application` ref, call `setGlobalEvents(true)`, and expose head-track + reaction methods (Layers 1–2) plus canvas-effect class toggles (Layer 3).
- **Vision Engine:** `VisionEngine` owns `getUserMedia`, the MediaPipe GestureRecognizer, the rAF detect loop (`recognizeForVideo`/`detectForVideo` with `performance.now()` timestamps), the gesture state machine, and emits `{gesture, confidence, handPosition, twoHands}`.
- **Gesture interpreter:** maps gesture events → command intents (shared with voice).
- **Voice Engine:** `VoiceEngine` owns SpeechRecognition (continuous + interim), the command parser, the Gemini SSE bridge, and SpeechSynthesis output.
- **Command bus:** a single dispatch that both engines call; applies cooldowns and routes to the `setActiveTab` setter + robot reactions.
- **State store:** a lightweight store (see §14) holding mode, FSM state, last gesture, transcript, permissions, errors.
- **Integration shim:** passes the existing `activeTab`/`setActiveTab` from `app/page.tsx` into the cockpit.

## 10. Browser Compatibility Matrix
| Browser | Spline/WebGL | MediaPipe CV | SpeechRecognition | SpeechSynthesis | Verdict |
|---|---|---|---|---|---|
| **Desktop Chrome (target #1)** | ✓ | ✓ (GPU delegate) | ✓ (Chrome 25+, cloud) | ✓ | Full — build & demo here |
| **Desktop Edge** | ✓ | ✓ | ✓ (87+, Azure cloud) | ✓ | Full |
| **Desktop Safari 14.1+** | ✓ | ✓ | ✓ (audio to Apple, permission modal) | ✓ | Supported w/ caveats |
| **Firefox** | ✓ | ✓ | ✗ (flag only) | ✓ | Gesture + voice-output + **typed fallback** |
| **iOS Safari / Chrome Android** | ✓ | ✓ (CPU-heavy) | iOS 14.5+ | ✓ (needs user-gesture trigger) | "Best on desktop" notice; keep Passive + voice-out + typed |

## 11. Exact Dependency List
- **`@mediapipe/tasks-vision`** — v0.10.35 (latest stable, published Apr 27, 2026), **0 dependencies, 34.8 MB install size, Apache-2.0** per the npm/socket.dev registry listing (a nightly `0.10.36-rc` also exists). HandLandmarker/GestureRecognizer for Web. **REQUIRED, new.** WASM tree-shaken and loaded on demand.
- **`@splinetool/runtime`** and **`@splinetool/react-spline`** — almost certainly ALREADY present (the existing `SplineAvatar` uses react-spline). Confirm in `package.json`; the runtime provides `setGlobalEvents`/`findObjectByName`/`emitEvent`. No new dep if present.
- **`framer-motion`** — ALREADY present. Reuse for overlay + canvas effects.
- **`zustand`** (optional, ~1KB) — recommended for the cockpit store (see §14). If Tharun prefers zero new deps, `useReducer` + Context is acceptable.
- Web Speech API, `getUserMedia`, Web Workers — native, no package.
- Gemini — no SDK; reuse the existing `/api/chat` fetch. No new dep.

MediaPipe WASM + `.task` model are loaded from CDN (`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm`) or self-hosted in `/public`; see §12/§17.

## 12. Spline Integration Plan — Concrete Code Patterns
Capture the app and enable global events:
```tsx
import type { Application, SPEObject } from '@splinetool/runtime';
const splineRef = useRef<Application|null>(null);
const headRef = useRef<SPEObject|undefined>();
function onSplineLoad(app: Application){
  splineRef.current = app;
  app.setGlobalEvents(true);                       // Layer 1 enabler (issues #145/#161)
  headRef.current = app.findObjectByName('Head');  // Layer 2 fallback; exact name TBD by agent
}
```
Head tracking (Layer 1 primary):
```ts
function trackHand(hx:number, hy:number, canvas:HTMLCanvasElement){
  const r = canvas.getBoundingClientRect();
  const clientX = r.left + hx * r.width, clientY = r.top + hy * r.height;
  window.dispatchEvent(new PointerEvent('pointermove',{clientX,clientY,bubbles:true}));
  window.dispatchEvent(new MouseEvent('mousemove',{clientX,clientY,bubbles:true}));
}
```
Head tracking (Layer 2 fallback, only if Look At not overriding):
```ts
function trackHandDirect(hx:number){
  const head = headRef.current; if(!head) return;
  const targetY = (hx - 0.5) * 0.8;                       // map to yaw radians
  head.rotation.y += (targetY - head.rotation.y) * 0.15;  // damped lerp
  splineRef.current?.requestRender();
}
```
Discrete reaction (Layer 5, only if editor events exist):
```ts
splineRef.current?.emitEvent('nod','Robot');   // only works if 'nod' is defined in the editor
```
Reaction via CSS (Layer 3, always works) — toggle a class on the canvas wrapper; Framer Motion/Tailwind animates brightness/scale/hue.

## 13. Existing-Portfolio Integration Plan (preserve design + activeTab)
- **Trigger swap:** Replace the "Coming Soon" modal handler behind "Talk to Me" with `setCockpitOpen(true)`. Keep the CTA, styling, and chest-HUD intact.
- **Overlay, not route:** Render `<JarvizCockpit>` as a portal/overlay above the thesis view so the Spline robot and ambient orbs stay mounted (no reload, no homepage LCP regression). Single-page `activeTab` architecture is preserved.
- **activeTab wiring:** `app/page.tsx` already owns `activeTab` with views `'thesis'|'neural'|'evolution'|'connect'`. Pass `activeTab` and `setActiveTab` into the cockpit (prop or store). The command bus calls `setActiveTab(...)` exactly as the existing nav buttons do — no new routing, no changes to view components.
- **Design tokens:** Reuse Bio-Scan Cyan (`#06b6d4`/cyan-400), `bg-black/50` + `backdrop-blur-2xl` + `border-white/10` glassmorphism, scanline overlay, 64px grid, blur-120px cyan/purple orbs. Typography: JetBrains Mono for HUD/telemetry labels, Outfit for headings, Inter for body/answers.
- **Non-breaking:** All new code is additive; if JARVIZ fails to load (CV/voice unsupported), the cockpit shows Passive Mode and the portfolio is fully usable.

## 14. Proposed File/Folder Structure Additions
```
/app
  page.tsx                      // add cockpitOpen state; pass setActiveTab to cockpit
/components
  jarviz/
    JarvizCockpit.tsx           // full-screen overlay shell + layout + consent gates
    VisionEngine.tsx            // webcam + MediaPipe loop + gesture FSM
    GestureEngine.ts            // pure gesture math/grammar (testable, no React)
    VoiceEngine.tsx             // SpeechRecognition + parser + Gemini bridge + TTS
    SplineController.ts         // wraps Spline app: setGlobalEvents, head-track, reactions
    hud/
      HudFrame.tsx              // cyan/mono frame, scanlines
      StatusReadout.tsx         // FSM state label
      GestureTelemetry.tsx      // live gesture + confidence + skeleton PiP
      TranscriptPanel.tsx       // interim/final transcript + Gemini stream
      CommandMap.tsx            // gesture/voice cheat-sheet overlay
      ConsentCard.tsx           // camera/mic privacy copy
  ui/ (existing)                // reuse buttons/cards
/lib
  jarviz/
    useJarvizStore.ts           // zustand store (mode, fsm, transcript, perms, errors)
    commands.ts                 // intent grammar + gesture→action map (shared)
    geminiClient.ts             // SSE consumer reusing /api/chat
    speech.ts                   // voice selection + speak() helpers
    mediapipe.ts                // model init, worker bootstrap, cleanup
/public
  models/hand (optional self-hosted .task + wasm)
/workers
  vision.worker.ts              // optional: MediaPipe off main thread
```
**State store recommendation:** Use **zustand** (~1KB, store lives outside the React tree, minimal re-renders, best DX for a small interaction store). If avoiding new deps, `useReducer` + Context is acceptable for this scope. Model the FSM as a discriminated union of states in either case.

## 15. Detailed Phased Implementation Plan
**Phase 0 — Feasibility spikes (½–1 day):** (a) Confirm `@splinetool/runtime` present; capture the `Application` ref; verify `setGlobalEvents(true)` + synthetic `pointermove` moves the robot head (the one unproven link). If it fails, validate Layer 2 (`findObjectByName` + rotation) or commit to Layers 3–4. (b) Stand up MediaPipe GestureRecognizer in a throwaway client component; confirm ≥ 24–30 fps on desktop Chrome and that gesture categories + landmarks return. Decide main-thread vs worker. **Gate:** head reacts to hand by some method + gestures detected.

**Phase 1 — Flagship Vision demo (2–3 days):** Cockpit overlay with consent gate; webcam PiP + skeleton; GestureRecognizer loop; gesture FSM (smoothing, cooldown); head tracking live; swipe-left/right + open-palm + fist wired to `setActiveTab` + CSS robot reactions + HUD telemetry. **THIS ALONE is a flagship-feeling demo.** Target desktop Chrome.

**Phase 2 — Voice pillar (2 days):** SpeechRecognition continuous + interim in HUD; deterministic command grammar → `setActiveTab` + spoken confirmations + robot reactions; SpeechSynthesis voice selection; typed fallback. **Gate:** full hands-free + voice navigation.

**Phase 3 — Gemini bridge (1 day):** Route non-command questions to `/api/chat` SSE; stream into `TranscriptPanel`; speak sentence-by-sentence; `RESPONDING` robot state. Reuse existing endpoint untouched.

**Phase 4 — Polish & robustness (1–2 days):** Full FSM with all states/labels; command map; error/permission UX; performance pass (lazy-load model on camera enable, dispose on exit); mobile/Firefox graceful degradation; accessibility copy.

**Phase 5 — Packaging (½ day):** README section, LinkedIn post, demo recording, success-criteria check.

## 16. Risk Register with Mitigations
- **Spline synthetic-pointer hijack doesn't drive Look At (medium/high):** validate in Phase 0; fallbacks = direct rotation (Layer 2) or CSS+HUD-only liveness (Layers 3–4), which still feel alive.
- **MediaPipe FPS/jank on weaker machines:** GPU delegate, 720p input, lite model, optional Web Worker; cap detect rate; "best on desktop" notice.
- **SpeechRecognition unsupported (Firefox) / mic denied:** typed fallback parser; voice output still works.
- **False-positive gestures:** K-frame smoothing + confidence floor + 1.2 s cooldown + state machine.
- **TTS quirks (iOS user-gesture, background throttle, async voices):** gesture-triggered `speak()`, `visibilitychange` re-queue, `onvoiceschanged` caching.
- **Gemini latency/cost:** Flash-Lite is low-latency, low-cost ($0.10/$0.40 per 1M in/out tokens), invoked only on true NL fallback; stream + speak early. Existing key/route reused.
- **LCP/perf regression on homepage:** overlay lazy via `next/dynamic({ssr:false})`; model loads only on camera enable; Passive Mode default.
- **Privacy concern:** all CV in-browser; explicit consent; camera indicator.

## 17. Performance Considerations
- Lazy-load `JarvizCockpit` and MediaPipe via `next/dynamic({ ssr:false })`; the `.task` model + WASM fetch **ONLY after** the user enables the camera, preserving homepage LCP.
- Inference: GestureRecognizer in VIDEO/LIVE_STREAM mode with `performance.now()` timestamps; 720p video (models internally downscale to ~256², so higher res just burns CPU). Use the GPU delegate. ~24–30 fps target.
- **Main thread vs worker:** `detect()`/`recognizeForVideo()` block the thread. **RECOMMENDATION for this portfolio: start on the main thread for simplicity** (acceptable at 30 fps on desktop Chrome with GPU delegate); move to a Web Worker only if profiling shows jank. (`@mediapipe/tasks-vision` in a classic worker needs the `importScripts` workaround.)
- Cleanup on cockpit close/unmount: stop all MediaStream tracks (`getTracks().forEach(t=>t.stop())`), cancel rAF, `recognition.abort()`, `speechSynthesis.cancel()`, and optionally `spline.dispose()` only on full route change (keep for fast re-open).
- Spline render: prefer default `renderMode:'auto'`; use `'continuous'` only during active head tracking, revert when idle.

## 18. Privacy & Consent Copy
**Camera (ConsentCard, shown before `getUserMedia`):**
> "JARVIZ Live uses your camera for hand-gesture control. All video is processed privately on your device, in your browser — frames are never uploaded, stored, or sent to any server. Turn it off anytime by closing the cockpit or making a fist. **[Enable Camera] [Use voice/typing instead]**"

**Microphone (before SpeechRecognition):**
> "Voice commands use your browser's speech recognition. On Chrome and Edge, audio is sent to the browser's speech service to transcribe it (the same as any voice search); on Firefox, type your command instead. Nothing is recorded or stored by this site. **[Enable Voice] [Type instead]**"

**Persistent indicator:** while camera/mic active, show a cyan "● LIVE — on-device" chip in the HUD.

## 19. Accessibility Cautions
- Do **NOT** claim sign-language recognition or translation — the system recognizes a small set of generic hand poses (open palm, fist, point, thumbs up, swipe), not any sign language. Frame as "accessibility-inspired hands-free navigation."
- Provide full keyboard/typed parity (typed command box); every gesture/voice action must be reachable via the existing nav buttons. The cockpit is an enhancement, never the only path.
- Respect `prefers-reduced-motion` for the canvas pulse/glow loops. Provide visible text labels for all states (not color-only).

## 20. Interaction State Machine
States, labels (cyan/mono HUD), transitions, cooldowns:

| State | HUD label | Entered when | Exits to |
|---|---|---|---|
| `IDLE` | `SYSTEM: STANDBY` | Cockpit open, no camera/mic | CAMERA_PERMISSION_PENDING / LISTENING |
| `CAMERA_PERMISSION_PENDING` | `AWAITING CAMERA…` | User clicks Enable Camera | VISION_ONLINE / ERROR |
| `VISION_ONLINE` | `VISION ONLINE` | Stream + model ready, no hand | HAND_DETECTED / PAUSED |
| `HAND_DETECTED` | `TRACKING` | ≥1 hand, head tracking active | GESTURE_CANDIDATE / VISION_ONLINE |
| `GESTURE_CANDIDATE` | `READING GESTURE…` | Same gesture K frames | COMMAND_CONFIRMED / HAND_DETECTED |
| `COMMAND_CONFIRMED` | `✓ <COMMAND>` | Gesture/voice intent fires | ROBOT_RESPONDING / HAND_DETECTED (after 1.2s cooldown) |
| `LISTENING` | `LISTENING…` | Voice Mode on | COMMAND_CONFIRMED / ROBOT_RESPONDING / PAUSED |
| `ROBOT_RESPONDING` | `RESPONDING` | Spoken confirmation / Gemini stream | previous active state |
| `PAUSED` | `PAUSED` | Fist / "pause" | VISION_ONLINE / LISTENING |
| `ERROR` | `<reason>` | Permission denied / unsupported / model fail | IDLE (with fallback affordance) |

Cooldowns: 1.2 s after `COMMAND_CONFIRMED`. Failure/fallback: any unsupported-API or denied-permission path lands in `ERROR` and surfaces the typed fallback / Passive Mode without crashing.

## 21. README Positioning + LinkedIn Post Copy
**README section:**
> ### JARVIZ Live — Embodied AI Portfolio OS
> A webcam + voice interaction layer over my portfolio. Navigate with hand gestures (MediaPipe Hand/Gesture recognition, 100% on-device), talk to it (Web Speech API), and a Spline 3D robot reacts in real time — its head literally tracks your hand. Open-ended questions are answered by Gemini 2.5 Flash-Lite. Built with Next.js 16, Tailwind v4, Framer Motion. Computer vision never leaves the browser.

**LinkedIn post:**
> I rebuilt my portfolio so you don't click it — you wave at it. 👋
> JARVIZ Live adds a webcam gesture layer + voice interface on top of my site. Swipe to navigate, point to open Contact, and the 3D robot's head tracks your hand in real time. Ask it an open question and it answers in Gemini's voice. All the computer vision runs on-device — no frames ever leave your browser.
> Built as an exercise in embodied, multimodal product design: deterministic command parsing first, LLM fallback only when needed; graceful degradation to voice/typing; privacy-by-default. Next.js 16 · MediaPipe · Web Speech API · Spline · Gemini. Try it on desktop Chrome 👇

## 22. What to Build First
The **Phase 1 Vision demo on desktop Chrome**: cockpit overlay + camera consent + GestureRecognizer loop + head tracking + swipe/open-palm/fist driving `activeTab` + CSS robot reactions + HUD telemetry. This is the smallest thing that already feels flagship-level.

## 23. What to Avoid / Overclaim Warnings
- No on-device LLM, no `.litertlm`/WebGPU model hosting, no RAG — out of scope by decision.
- Don't claim sign-language translation.
- Don't claim "offline AI" — Gemini and (Chrome/Edge) speech recognition are cloud calls; only the CV is on-device.
- Don't gate the whole portfolio behind camera/voice; always keep Passive Mode + nav.
- Don't block homepage LCP — lazy-load everything CV-related.
- Don't fight Spline Look At with manual rotation on the same object simultaneously.

## 24. Exact Success Criteria
- On desktop Chrome, from "Talk to Me" click → camera-on → first gesture-driven tab switch in **< 10 s**.
- Gesture recognition **≥ 24 fps**; confirmed-gesture false-positive rate low enough that the 6-gesture demo runs clean **5×**.
- Head visibly tracks the hand with **< ~150 ms** perceived lag.
- All four `activeTab` views reachable by **BOTH** gesture and voice.
- Open-ended question streams from Gemini and is spoken, starting **< 2 s** after the query.
- Firefox: typed fallback + voice output + gesture mode all function; no crash.
- Camera light turns off on exit; no console errors; homepage LCP unchanged vs. today.

## 25. Confirmations
- **Target desktop Chrome first:** **YES.** Build and demo on Chrome; treat Edge/Safari as supported, Firefox as typed-fallback.
- **Ship CV before voice:** **YES.** Vision (Phase 1) is the flagship pillar and the harder differentiator; voice is Phase 2.
- **Talk-to-Me: modal vs cockpit:** **COCKPIT.** A full-screen cinematic overlay that keeps the Spline robot visible and adds HUD/camera/telemetry/voice around it — not a small modal, and not a separate `/jarviz` route (preserves the single-page `activeTab` architecture and homepage LCP).
- **Definitive Spline control answer:** You can control a PUBLISHED Spline embed from React without editor access via `@splinetool/runtime`: `findObjectByName`/`findObjectById` → mutate `position`/`rotation`/`scale`; `setVariable`/`getVariable`; `emitEvent` (ONLY for events defined in the editor); `setGlobalEvents` to widen event capture from canvas to window. **Make the head follow the detected hand by calling `setGlobalEvents(true)` and dispatching synthetic pointer/mouse events with computed `clientX`/`clientY` to hijack the existing Look At (PRIMARY; validate in Phase 0).** Fallbacks: direct rotation via `findObjectByName` (only if Look At isn't overriding) and CSS/HUD liveness (always available). `emitEvent('lookAt')` does **NOT** drive Look At (confirmed, react-spline issue #161). Editor access is optional and only unlocks discrete state events (wake/nod/listen/respond).
- **Smallest demo that already feels flagship-level:** Desktop Chrome: open cockpit → enable camera → robot head follows your hand → swipe to switch between Work/Story and open-palm to greet, with the robot pulsing cyan and the HUD logging each command. Vision-only, no voice, no Gemini — already unmistakably "embodied."