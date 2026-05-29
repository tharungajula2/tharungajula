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
