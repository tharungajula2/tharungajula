# Ponder Showcase — Git Commit & PR Package

*This packaging guide contains the recommended Git branching strategy, commit parameters, pull request descriptions, and manual deployment checklist to integrate the showcase.*

---

## 🌿 1. Git Branch Details
*   **Suggested Branch Name:** `feature/ponder-agentic-rag-showcase`

---

## 💾 2. Commit Parameters
*   **Commit Header:** `feat: add Ponder high-observability agentic RAG showcase`
*   **Commit Body:**
    ```text
    feat: add Ponder high-observability agentic RAG showcase

- Implemented dedicated /ponder HUD console route utilizing cybernetic Bio-Scan Cyan visual aesthetic
- Rerouted homepage Spline 3D robot CTA from AIChatPanel drawer directly into /ponder
- Engineered client-side document intake system supporting Drag-and-Drop and text paste (up to 5 documents, 50,000 characters per document limit)
- Integrated sentence-sliding window chunking engine (4 sentences per chunk, 1-sentence overlap) with reactive char/word/chunk stats
- Wired server-side embedding API utilizing Vercel AI SDK and google.textEmbeddingModel('gemini-embedding-2')
- Created globalThis-safe in-memory vector store namespace isolated by client-generated sessionId for demo isolation
- Added collapsible semantic retrieval testing cockpit directly in center column
- Connected multi-step agent dialogue POST api (/api/ponder/chat) utilizing gemini-2.0-flash
- Created searchDocuments, analyzeChunks, and evaluateAnswer agent tool functions with active observability trace logging
- Integrated interactive citation badges with click-to-expand evidence context drawer
- Integrated faithfulness, relevance, and completeness model-generated self-evaluation scores on dialog response cards
- Added server-side vector deletion and session reset purging hooks (not a substitute for authentication or production tenancy)
- Created data/qa pre-packaged testing assets and completed end-to-end runtime verification passes
```

---

## 🚀 3. Pull Request (PR) Summary

### Objective
This PR introduces **Ponder**, a live, high-observability Agentic RAG HUD console integrated surgically into the portfolio application. Instead of basic chatbot wrappers, Ponder displays every phase of document ingestion, sentence chunking, vector embedding, and multi-step agent tool calling in a responsive dashboard. It acts as our flagship proof-of-work showcasing applied AI engineering, interface craft, and technical product design.

### Key Additions & Refinements
1.  **Isolated Routing & Safely Preserved CTAs:** Created `/ponder` route. Rerouted homepage Spline robot trigger without removing or modifying the original homepage chatbot files (`AIChatPanel.tsx`, `/api/chat`).
2.  **In-Memory Session Namespace:** Built a session-isolated, server-side in-memory vector store in `lib/ponder/vectorStore.ts`. Data is isolated per client-generated sessionId for demo isolation, and active delete actions purge vectors for the current session (not a substitute for authentication or production tenancy).
3.  **Resilient Embedded Pipeline:** Switched embedding configuration to utilize Google’s `gemini-embedding-2` model, resolving key compatibility blocks and compiling high-speed 3,072-dimensional vector math.
4.  **High Observability UI:** Added a sequential, elapsed-time trace log panel (`// REASONING_TRACE`) mapping the agent's inner planning, searching, analyzing, and self-evaluation states in real-time.
5.  **Offline QA Context Material:** Bundled three offline QA evaluation files under `data/qa/` to instantly test grounding, semantic matching, and contradictions.

---

## ✅ 4. Pre-Merge Quality Verification Checklist

### Compilation & Build
*   [ ] Run `npm run build` locally. Verify that the production static/dynamic bundles compile with **Exit code: 0**.
*   [ ] Verify that no API key credentials or secret environment variables leaked into the static frontend build folders.

### Layout & Navigation
*   [ ] Open `http://localhost:3000/`. Click the Spline robot "Talk to Me" CTA and verify it navigates cleanly to `/ponder`.
*   [ ] Verify that the `// RETURN_HOME` button inside `/ponder` navigates back to `/` successfully.
*   [ ] Inspect the mobile layout. Ensure that columns collapse gracefully and that the Document Panel, Dialogue feeds, and Trace timelines are accessible via mobile tabs.

### Context Ingestion & Vectorization
*   [ ] Upload `data/qa/ponder_product_strategy.txt`. Verify local character, word, and chunk stats compute instantly.
*   [ ] Click "EMBED". Verify that the status card transitions through `EMBEDDING...` and ends in a green `VECTOR_READY` state.
*   [ ] Click "TEST_VECTORS". Search `visible reasoning trust citations`. Confirm that it returns a similarity score and points to the correct strategy document.

### Dialogue Loop & Observability
*   [ ] Submit prompt: `What is the strongest product theme across these documents?`. Verify that the Reasoning Trace feeds planning, searching, analyzing, and evaluation states, and the assistant answer shows citations (`[1]`).
*   [ ] Click on citation badge `[1]`. Ensure the cited evidence drawer expands and highlights the matching chunk text.
*   [ ] Submit prompt: `Are there any contradictions between the documents?`. Ensure the agent outlines the database persistence conflict.
*   [ ] Submit prompt: `What is Tharun's previous work experience?`. Verify that the agent correctly refuses the answer, stating that the uploaded documents do not contain information regarding Tharun's work experience.

### Deletion & Session Cleanup
*   [ ] Delete `conflicting_product_memo.txt` by clicking the trash icon.
*   [ ] Open search cockpit. Search `permanent PostgreSQL database`. Verify that it returns **0 results**.
*   [ ] Ask the agent `Are there any contradictions between the documents?`. Verify that it reports no contradictions.
*   [ ] Refresh the page. Confirm that the client documents panel resets to empty, and previous session vectors are temporary and inaccessible from the new sessionId.
