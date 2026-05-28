# Tharun Gajula — Agentic AI PM & Systems Architect Portfolio

The personal portfolio and systems-thinking workspace of **Tharun Gajula** (Agentic AI PM & Systems Architect). Engineered using Next.js, this application serves as the primary showcase for his institutional B2B banking product ownership and workflow architecture experience, alongside functional concept prototypes shipped to master AI orchestration, spatial layout, and high-density logic.

> **system_status: ACTIVE // PONDER COGNITIVE RAG FLAGSHIP ONLINE**

---

## 📚 Core Documentation (READ FIRST)

To understand the overarching mission, the architectural constraints, and the canonical system structure, all context has been rigidly aggregated:

*   👉 **[PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)**: The Master Narrative & Engineering Manual. Contains the User Identity, Design System constraints, and Operational Protocols.
*   👉 **[docs/PONDER_SHOWCASE_BRIEF.md](./docs/PONDER_SHOWCASE_BRIEF.md)**: Technical breakdown of Ponder's in-memory RAG loop, embeddings config, and agent tools.
*   👉 **[docs/PONDER_3_MIN_DEMO_SCRIPT.md](./docs/PONDER_3_MIN_DEMO_SCRIPT.md)**: Step-by-step speaker and screen walkthrough script for recording a product video.

---

## 🤖 Flagship Feature: Ponder — Agentic RAG Console (`/ponder`)

Ponder is a high-observability research console that ingests raw documents, generates 3,072-dimensional embeddings via Google Gemini (`gemini-embedding-2`), indexes them in a session-isolated in-memory vector namespace, and initiates a multi-step agent reasoning loop (`gemini-2.0-flash`) with dynamic planning, citation grounding, self-evaluation, and an interactive trace timeline.

### Why this matters
In an era of black-box AI interfaces, building user trust requires transparency. By exposing the agent's internal sliding-window chunking, similarity matching math, multi-step tool calls, and model-generated self-evaluation grades, Ponder demonstrates how complex RAG systems can be made observable and verifiable. It shifts the paradigm from "blind reliance" to "interactive evidence," presenting an interface that is both mathematically grounded and highly intuitive.

### Real-world Demo flow:
1.  **Ingest:** Drag-and-drop or paste up to 5 `.txt` or `.md` files into the Document panel (stats compile locally in real-time, up to 50,000 characters per document limit).
2.  **Embed:** Click **EMBED ALL CONTEXT** to vectorize the chunks using server-side Gemini embeddings and map them into the session-isolated in-memory vector namespace.
3.  **Analyze (Retrieval Test):** Open the collapsible **TEST_VECTORS** cockpit to run direct cosine similarity queries against matching chunks.
4.  **Dialogue:** Ask complex questions. Watch the **REASONING_TRACE** timeline execute planning, searching, analyzing, and model-generated self-evaluation audits. Click inline citation badges (`[1]`) to expand the cited evidence context drawer.
5.  **Grounding Check:** Ask a question outside the document scope (e.g., *"What is Tharun's work history?"*). See the agent identify the information gap and refuse rather than hallucinate.
6.  **Purge:** Active delete calls purge the session's vectors. Refreshing the browser resets the client session state; old vectors are temporary and naturally reset on server cold starts or redeploys.

---

## 🛠 Tech Stack

*   **Framework:** Next.js 16.1.6 (App Router + Turbopack)
*   **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` engine) & Vanilla CSS
*   **AI SDK:** Vercel AI SDK Core (`ai`, `@ai-sdk/google`)
*   **Models:** `gemini-2.0-flash` (Agent Reasoner), `gemini-embedding-2` (Vectorization)
*   **3D Render Engine:** Three.js + `@react-three/fiber` + `@react-three/drei` + Spline (`SplineAvatar`)
*   **State Management:** Zustand (Document intake & UI states)
*   **Typography System:** Inter (body), Outfit (H1/Brand), JetBrains Mono (Terminal Tracking)

---

## ⚡ Environment & Setup

To run Ponder locally, you must configure your local environment variables.

Create a `.env.local` file in the project root:

```env
# Google Gemini API Credentials
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Override default agent reasoner model
PONDER_MODEL=gemini-2.0-flash
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
    Open [http://localhost:3000](http://localhost:3000) for the main portfolio, or [http://localhost:3000/ponder](http://localhost:3000/ponder) to open the RAG console directly.

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

## 🛡️ Limitations & Quotas (Developer Notes)
*   **Session Isolation:** All vectors and text chunks are stored in active server memory isolated by your client-generated `sessionId` for demo isolation. Refreshing the browser resets the client session state; old vectors are temporary and naturally reset on server cold starts or redeploys.
*   **Free-Tier Quotas:** Ponder runs on Gemini's free-tier API plan. Rapidly submitting questions may trigger a rate limit (`429 Quota Exceeded`). The UI degrades gracefully with a red notice countdown widget—wait for the timer to reset and resubmit.
