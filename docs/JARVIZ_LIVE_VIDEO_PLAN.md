# JARVIZ Live — Video Recording Blueprint

Follow this recording framework to capture high-fidelity demos for LinkedIn, Twitter/X, and portfolio integrations.

---

## 📐 Recording Guidelines
1.  **Environment**: Record in a quiet room with good lighting to ensure MediaPipe webcam hand-tracking performs flawlessly.
2.  **Screen Resolution**: Set recording context to a crisp 1080p desktop aspect ratio. Zoom browser viewport to `100%` or `110%` to ensure all cybernetic cockpit telemetry metrics read clearly on small mobile displays.
3.  **Capturing Audio**: Ensure your recording software captures both microphone audio (for voice inputs) and system audio (to record the robot's synthesized response voice confirmations).

---

## 🎞️ Option A: The 30-Second Micro-Teaser
*Ideal for rapid Twitter/X engagement and top-of-feed LinkedIn visual hooks.*

| Time | Visual State | Voiceover / Actions |
|---|---|---|
| **0:00-0:05** | Standard portfolio dashboard. | *"I rebuilt my portfolio so you don't just click it—you wave at it."* <br> **Action**: Click "Talk to Me". |
| **0:05-0:15** | Webcam PIP activates; 3D robot head tracks hand tracking. | *"Using on-device MediaPipe computer vision, the 3D Spline avatar swivels to track my hand, letting me transition pages with simple spatial gestures."* <br> **Action**: Swipe right to load Work dashboard. |
| **0:15-0:30** | Toggle voice mic; ask Gemini a question. | *"We can also ask open-ended questions streamed securely from Gemini."* <br> **Action**: Ask: *"Why is this different?"*. Watch text stream onto the panel and close cockpit on complete. |

---

## 🎞️ Option B: The 60-Second Feature Walkthrough
*Perfect for LinkedIn main posts and featured video panels.*

| Time | Visual State | Action & Narrative |
|---|---|---|
| **0:00-0:10** | Thesis dashboard. | *"Most web portfolios are static resumes. For my Agentic AI PM portfolio, I built JARVIZ Live—a multi-modal human-computer interaction layer."* <br> **Action**: Click "Talk to Me". |
| **0:10-0:25** | Webcam active. | *"By running local computer vision inside the browser context, the 3D Spline robot head tracks hand coordinates, driving routes completely gesture-free."* <br> **Action**: Swipe right (Work), then swipe left (Story). |
| **0:25-0:40** | Microphone toggled active. | *"We can navigate with offline voice command matching or say simple instructions."* <br> **Action**: Say *"Go home"*. Notice instant local response routing bypasses LLM latency. |
| **0:40-0:55** | Ask open question. | *"If I ask a complex question, the FSM forwards inputs to a serverless Gemini edge streaming router, showing text tokens line-by-line."* <br> **Action**: Type/Say: *"Who is Tharun?"*. Let response render. |
| **0:55-1:00** | Click Exit. | *"And the second you exit, a complete lifecycle teardown kills all webcam streams and speech buffers."* <br> **Action**: Click Exit Cockpit. |

---

## 🎞️ Option C: The 90-Second In-Depth Demo
*Recommended for your YouTube portfolio walkthrough link, shared directly with hiring managers.*

*   **0:00 - 0:15: The Hook**: Open cockpit, introduce the design system philosophy, and explain the multi-modal goal.
*   **0:15 - 0:35: Gesture Deep Dive**: Explain in-browser MediaPipe processing. Swipe right to Work, swipe left to Story, point up to Connect, fist to pause tracking. Showcase the LookAt vector coordinate swivels.
*   **0:35 - 0:55: Voice Integration**: Toggle the mic. Showcase how deterministic keyword parsing processes actions instantly without server roundtrips.
*   **0:55 - 1:20: Gemini Streaming & Speech**: Ask an open-ended questions (e.g. *"What are Tharun's core engineering skills?"*). Explain the Next.js edge proxy stream pipeline, show the dynamic blinking terminal cursor, and demonstrate the direct interrupt button stopping active voice/text.
*   **1:20 - 1:30: Recruiter Checklist**: Open the Command Manual and show the interactive recruiter checklist grid designed to guide live evaluations.
*   **1:30 - 1:45: Technical Summary**: Pitch the architectural cleanups (Webcam tracking closure, speech voice cancels, abort fetch controls) demonstrating clean resource lifecycle management.

---

## 🚫 Common Mistakes to Avoid
1.  **Poor Lighting**: If your hand isn't detected immediately, gesture recognition might lag. Ensure you have clear, direct light on your hand.
2.  **Speak Too Quickly**: Give SpeechRecognition a small moment to transcribe. Wait 0.5s after clicking the microphone before speaking.
3.  **Background Noise**: If your environment is noisy, use the typed terminal fallback instead of voice commands to ensure a perfect stream render during the recording!
