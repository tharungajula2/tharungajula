# JARVIZ Live — Safety & Claims Checklist

To maintain utmost professional credibility during recruiter interviews and public launches, keep all presentation narratives and marketing copy bounded within these strict engineering constraints.

---

## ✅ Safe Claims (What You SHOULD Proudly Claim)
*   **Webcam Spatial Gesture Recognition**: Visitors can control page navigations entirely with their hands.
*   **In-Browser Computer Vision**: We use `@mediapipe/tasks-vision` GestureRecognizer executing entirely inside the browser's JavaScript sandbox.
*   **Tactile 3D LookAt Interaction**: The Spline robot head tracks hand movements by dispatching synthetic canvas pointer-move parameters.
*   **Zero-Latency Vocal Navigation**: Web Speech API is parsed locally with offline regex rules to toggle portfolio tabs instantly.
*   **Serverless Gemini Streaming**: Open-ended conversational queries are forwarded to a secure serverless Next.js edge endpoint streaming token-by-token using Gemini.
*   **Complete Teardown Lifecycle**: The system is engineered to cleanly release microphone inputs, webcam streams, synthesizers, and server fetches the moment the cockpit is closed.

---

## ❌ Unsafe Claims (What You MUST NOT Overclaim)
*   **NO "Offline AI Chatbot"**: The streaming Gemini bridge relies on active network connectivity.
*   **NO "Local LLM / On-Device Gemini"**: Gemini is not compiled to run in-browser; it runs securely on Google's cloud server-side.
*   **NO "Sign-Language Translation"**: MediaPipe classifications match 7 primary developer-defined gestures—it does not translate sign language.
*   **NO "Private / Off-grid Voice Transcriptions"**: Native voice transcription uses the browser's native SpeechRecognition APIs, which can rely on vendor-specific cloud engines.
*   **NO "Always-Listening Assistant"**: Voice listening is exclusively active when the mic icon in the cockpit is manually toggled on, and auto-suspends on command confirmations.
*   **NO "Camera Frames Uploaded to Gemini"**: The webcam stream is strictly processed locally. The camera frames never leave the user's computer. Only the text queries are securely proxied to the edge route.
