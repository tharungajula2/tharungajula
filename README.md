# Tharun Gajula — Agentic AI PM & Systems Architect Portfolio

The personal portfolio and systems-thinking workspace of **Tharun Gajula** (Agentic AI PM & Systems Architect). Engineered using Next.js, this application serves as the primary showcase for his institutional B2B banking product ownership and workflow architecture experience, alongside functional concept prototypes shipped to master AI orchestration, spatial layout, and high-density logic.

> **system_status: ACTIVE // ARCHITECTURE ENGINE ONLINE**

---

## 📚 Core Documentation (READ FIRST)

To understand the overarching mission, the architectural constraints, and the canonical system structure, the core context has been aggregated:

*   👉 **[PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)**: The Master Narrative & Engineering Manual. Contains the User Identity, Design System constraints, and Operational Protocols.

---

## 🛠 Tech Stack

*   **Framework:** Next.js 16.1.6 (App Router + Turbopack)
*   **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` engine) & Vanilla CSS
*   **AI Engine:** Direct Gemini REST Edge Integration (`gemini-2.5-flash-lite`)
*   **3D Render Engine:** Three.js + `@react-three/fiber` + `@react-three/drei` + Spline (`SplineAvatar`)
*   **Typography System:** Inter (body), Outfit (H1/Brand), JetBrains Mono (Terminal Tracking)

---

## ⚡ Environment & Setup

To run the local chatbot or live features, configure your local environment variables.

Create a `.env.local` file in the project root:

```env
# Google Gemini API Credentials
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 💻 Running Locally

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/tharungajula2/tharungajula.git
    cd tharungajula
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Boot the local laboratory server:**
    ```bash
    npm run dev
    ```

4.  **Navigate to the app:**
    Open [http://localhost:3000](http://localhost:3000) for the main portfolio.

---

## 📦 Production Bundling

To test production optimizations and build the Next.js static/dynamic pages:

```bash
# Compile and build production packages
npm run build

# Start production server locally
npm run start
```

---

## JARVIZ Live — Embodied AI Portfolio OS

JARVIZ Live is an embodied AI interaction layer over my personal portfolio. Visitors can navigate with hand gestures, use browser voice commands, and ask open-ended questions answered through Gemini via a secure server route.

### 🌟 Key Features
*   **Computer Vision Gestures**: Webcam gesture recognition driving immersive Next.js route navigations and interactive components.
*   **Webcam Spatial LookAt**: Three-dimensional Spline avatar tracks the coordinates of your hand using real-time canvas pointer mapping.
*   **Web Speech Grammar Mappings**: Locally-parsed voice recognition routes deterministic intents instantly without latency.
*   **Edge-Streamed Gemini Integration**: Non-deterministic natural questions fallback to an external serverless stream via SSE using `gemini-2.5-flash-lite`.
*   **Abort & Cleanup Pipeline**: Instantly closes mic feeds, webcam tracks, speech buffers, and live Gemini streams when exiting the cockpit, leaving zero memory footprint.

### 🛠 Tech Stack
*   **Framework**: Next.js 16 (App Router + Edge Runtime)
*   **Styling**: Vanilla CSS & Tailwind v4
*   **Computer Vision**: `@mediapipe/tasks-vision` GestureRecognizer
*   **Browser Audio API**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
*   **Generative AI**: Google Gemini Edge SSE Route (`/api/chat`)

### 🛡 Privacy Principles
*   **In-Browser Processing**: Webcam frames are evaluated completely locally inside the browser. No video feed or camera data is ever transmitted or uploaded.
*   **Speech Transcription**: Voice commands are processed via browser-native APIs and may use standard OS/browser cloud speech features depending on browser vendor.
*   **Key Protection**: No API key is exposed client-side. Gemini streams are routed through a secure Next.js edge API router.

### 🗣 Exact Commands You Can Try
*   **Gestures**:
    *   *Open Palm* 🖐 -> Awake System / Greet
    *   *Swipe Right* ➡️ -> Navigate: Work / Neural
    *   *Swipe Left* ⬅️ -> Navigate: Story / Evolution
    *   *Point Up* ☝️ -> Navigate: Connect / Contact
    *   *Victory/Two Hands* ✌️ -> Toggle HUD Matrix Manual
    *   *Closed Fist* ✊ -> Pause Vision Engine
*   **Voice Triggers**:
    *   "show work", "show story", "connect", "go home", "commands", "pause"
    *   Ask any question: *"Why is this portfolio different?"* or *"Who is Tharun?"*

