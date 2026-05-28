# Ponder Showcase — Deployment & Demo Day Checklist

*Follow this comprehensive roadmap to configure your production host (Vercel) and run a high-impact, bug-free presentation during client or recruitment demo sessions.*

---

## 🏗️ 1. Pre-Deployment Integrity Checks

Execute these commands in your local shell to verify build stability before pushing changes:

```powershell
# 1. Clean verify dependencies and run compilation
npm run build

# 2. Check for any static analysis or type failures
# (Resolve any warnings/errors that occur only within /ponder)
```

*   **Secrets Exposure Scan:** Ensure that no `GEMINI_API_KEY` or development credentials are hardcoded inside standard client-side components (`app/ponder/page.tsx`, `components/ponder/*`). All API queries must go through the Vercel Serverless Function `/api/ponder/embed` and `/api/ponder/chat`.
*   **Routing Check:** Verify that the main homepage CTA successfully targets `/ponder` in the production-compiled layout, and that all static image/spline assets compile.

---

## 🚀 2. Vercel Hosting Configuration

When deploying the codebase repository on Vercel, configure the following settings:

1.  **Framework Preset:** `Next.js`
2.  **Root Directory:** `./`
3.  **Environment Variables:**
    *   Add **`GEMINI_API_KEY`** (or **`GOOGLE_GENERATIVE_AI_API_KEY`**) containing your production Gemini API Key.
    *   *(Optional)* **`PONDER_MODEL`** (defaults to `"gemini-2.0-flash"` if not set).
    > [!IMPORTANT]
    > **API Key Safety:** Never use the `NEXT_PUBLIC_` prefix for these keys. This ensures they remain strictly on the secure server-side execution layer and are never exposed to the client browser. Never commit your `.env.local` file to GitHub.
4.  **Build Command:** `next build`
5.  **Output Directory:** `.next`

### 🔍 Post-Deployment Verification Walkthrough
Once the Vercel deployment completes successfully, execute these smoke tests:
*   [ ] Open the homepage `/` and click the Spline robot CTA ("Talk to Me"). Verify it routes cleanly to `/ponder`.
*   [ ] In the left panel, upload or paste a small `.txt` context file. Check that the character count is correct.
*   [ ] Click **"EMBED ALL CONTEXT"**. Verify it shifts from local state to green `VECTOR_READY` state.
*   [ ] Type a question in the chat panel. Verify that the trace timeline steps display properly, a grounded answer is produced, and the inline citation drawer maps correctly on click.
*   [ ] Click the trash icon to delete the document. Ask a follow-up; check that it purges successfully.
*   [ ] Ask an unsupported question outside the document's scope. Verify the agent gracefully refuses rather than fabricating.

---

## 🏆 3. Live Demo Day Routine (Recruiter walkthroughs)

To ensure a seamless, high-retention live demo without quota errors or logical lag:

### Step 1: Pre-warm the Session
*   Open the `/ponder` page.
*   Wait 2 seconds for active client states and HUD borders to load.
*   Check that your internet connection is stable.

### Step 2: Ingest Inflow (Load QA contexts)
*   Have the three pre-packaged text files in `data/qa/` ready in your local directory for easy drag-and-drop:
    1.  `ponder_product_strategy.txt`
    2.  `ponder_technical_architecture.txt`
    3.  `conflicting_product_memo.txt`
*   Upload them one by one. Highlight the reactive stats: *Character Count, Word Count, and sentence sliding-window Chunk splits* (up to 5 documents, 50,000 characters per document limit).
*   Click **"EMBED ALL CONTEXT"**. Talk about how this splits chunks, compiles 3,072-dimensional embeddings via Google’s `"gemini-embedding-2"` model, and builds a session-isolated in-memory vector namespace.

### Step 3: Demonstrate Grounded Dialogue
*   Ask: `What technical pipeline does Ponder use?`
    *   *Showcase:* The right Reasoning Trace timelines lighting up (`planning`, `searching`, `analyzing`, `evaluating`), and the cited response badges (`[1]`). Click on the badge to expand the cited chunk drawer.
*   Ask: `Are there any contradictions between the documents?`
    *   *Showcase:* The agent's ability to synthesize logic by pointing out the persistent database conflict between the Technical Architecture spec and the Conflicting Operations Memo.
*   Ask: `What is Tharun's previous work experience?`
    *   *Showcase:* The agent's strict grounding discipline. It identifies that Tharun's work history is missing from the uploaded context and gracefully refuses, protecting the system from hallucination.

### Step 4: Validate Data Privacy (Delete & Purge)
*   Delete the `conflicting_product_memo.txt` document by clicking the trash icon.
*   Ask: `Are there any contradictions between the documents?`
*   *Showcase:* The agent now reports zero database persistence contradictions because the memo has been successfully purged from the session-isolated in-memory vector namespace.
*   Hit refresh. Point out that refreshing resets the client session state and the previous session vectors are temporary and inaccessible from the new sessionId.

---

## 💡 4. Rate-Limit Contingency Plan
*   **The Issue:** Running consecutive multi-step tool calls on a free-tier Gemini API Key can occasionally exhaust your minute rate quotas, resulting in a standard `429 RESOURCE_EXHAUSTED` block.
*   **The UI Guard:** Ponder handles this gracefully by showing a red HUD warning feed: *"You exceeded your current quota... please retry in X seconds."*
*   **The Strategy:** During live screen-shares, space your questions roughly **15–20 seconds apart**. Always use fresh quota or a newly generated key on demo day. If you encounter the rate-limit HUD message, explain it as a built-in safety telemetry warning that tracks external rate throttles in real-time, then click retry after the countdown completes.
