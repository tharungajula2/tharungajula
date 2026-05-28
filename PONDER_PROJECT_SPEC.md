# PONDER — Complete Project Specification
### "AI That Thinks Before It Speaks"
*24-Hour Hackathon Build · Self-Contained Engineering Blueprint*
*Author: Tharun Gajula · May 2026*

---

## WHAT THIS DOCUMENT IS

This is a complete, self-contained blueprint for building **Ponder** — a full-stack AI application that demonstrates production-grade Applied AI Engineering skills. Every decision is pre-made. Every file is mapped. Every colour is chosen. Follow this document top-to-bottom to build the entire application.

**The builder (Tharun) will paste code into an IDE agent (Google Antigravity / Cursor). Your job as the AI assistant is to generate complete, working code files — not snippets, not pseudocode — following this spec exactly.**

---

## THE PRODUCT IN ONE PARAGRAPH

Ponder is an AI research agent that **shows its thinking**. Paste any documents (articles, notes, reports, specs). Ask a complex question. Instead of instantly generating a response like ChatGPT, Ponder's agent **plans its approach, searches your documents, cross-references facts, evaluates its own answer for accuracy, and shows you every step of its reasoning** in a beautiful trace panel. The result: an answer you can actually trust, because you watched the AI think.

**Tagline:** "AI that thinks before it speaks."

**Why this matters for hiring:** This project demonstrates RAG (Retrieval-Augmented Generation — connecting an AI to external documents), agentic AI (multi-step tool-calling), structured outputs, evaluation/guardrails, observability (the trace viewer), and production-grade frontend — every skill an Applied AI Engineer / Forward-Deployed Engineer needs in 2026.

---

## EXACT TECH STACK (all free)

| Layer | Technology | Version | Why |
|---|---|---|---|
| Framework | Next.js | 15 (App Router) | React 19, Server Components, API Routes |
| Styling | Tailwind CSS | v4 | Utility-first, fast iteration |
| Animations | Framer Motion | 11+ | Spring physics, layout animations |
| Icons | Lucide React | latest | Clean, consistent SVG icons |
| AI SDK | Vercel AI SDK | `ai` + `@ai-sdk/google` | Streaming, tool calling, structured outputs — all built in |
| LLM | Google Gemini 2.0 Flash | via Google AI Studio free tier | 15 RPM, 1500 RPD free. Tool calling supported. |
| Embeddings | Google text-embedding-004 | via `@ai-sdk/google` | Free, high quality, 768 dimensions |
| Vector Search | In-memory (custom) | — | Simple cosine similarity. No external DB needed for demo. |
| Deployment | Vercel | Free tier | Automatic from GitHub push |
| Version Control | GitHub | — | Public repo |

### API Keys Needed (free)

1. **Google AI Studio API Key** — get from https://aistudio.google.com/apikey (free, instant, no credit card).

That's it. One API key. Everything else is open source.

### Environment Variables

```env
# .env.local (never commit this file)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

---

## DESIGN SYSTEM — "Calm Intelligence"

Ponder's visual identity communicates trust, calm, and intellectual rigour. Think: a beautiful library, not a neon dashboard.

### Colour Palette

```css
/* Paste these as CSS variables in globals.css */
:root {
  /* Backgrounds */
  --bg-primary: #FAFAF8;       /* Warm off-white, like quality paper */
  --bg-surface: #FFFFFF;        /* Cards, panels */
  --bg-surface-alt: #F5F3EF;   /* Alternate surface, trace panel */
  --bg-code: #F8F6F1;          /* Code/mono backgrounds */
  
  /* Text */
  --text-primary: #1C1C1E;     /* Near-black, never pure black */
  --text-secondary: #6B7280;   /* Muted descriptions */
  --text-tertiary: #9CA3AF;    /* Timestamps, metadata */
  
  /* Accent — Warm Indigo */
  --accent: #4F46E5;           /* Primary interactive */
  --accent-light: #EEF2FF;     /* Accent backgrounds */
  --accent-muted: #818CF8;     /* Hover states */
  
  /* Status Colours for Agent Trace */
  --status-planning: #F59E0B;  /* Amber — thinking */
  --status-searching: #3B82F6; /* Blue — retrieving */
  --status-analyzing: #8B5CF6; /* Purple — processing */
  --status-evaluating: #10B981;/* Emerald — checking */
  --status-complete: #059669;  /* Green — done */
  --status-error: #EF4444;     /* Red — failed */
  
  /* Borders & Shadows */
  --border: #E5E7EB;
  --border-light: #F3F4F6;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.08);
}

/* Dark mode */
.dark {
  --bg-primary: #0F0F10;
  --bg-surface: #1A1A1C;
  --bg-surface-alt: #242426;
  --text-primary: #F5F5F7;
  --text-secondary: #A1A1A6;
  --border: #2D2D2F;
}
```

### Typography

```css
/* Font stack — use Inter for UI, Instrument Serif for display headings */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-display: 'Instrument Serif', Georgia, serif;
--font-mono: 'JetBrains Mono', 'SF Mono', monospace;
```

Import in `layout.tsx`:
```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
```

Import Instrument Serif via `<link>` in `<head>` from Google Fonts.

### Typography Scale

| Element | Font | Size | Weight | Tracking |
|---|---|---|---|---|
| Page title | Instrument Serif | 32px (2rem) | 400 | -0.02em |
| Section heading | Inter | 18px (1.125rem) | 600 | -0.01em |
| Body text | Inter | 15px (0.9375rem) | 400 | 0 |
| Chat message | Inter | 15px | 400 | 0 |
| Agent trace step | Inter | 13px (0.8125rem) | 500 | 0 |
| Metadata/timestamp | Inter | 12px (0.75rem) | 400 | 0.02em |
| Mono/code | JetBrains Mono | 13px | 400 | 0 |

### Spacing & Layout

- Page max-width: 1280px, centered
- Main content area: split layout — left 60% (chat), right 40% (trace panel)
- On mobile (< 768px): full-width tabbed (Chat tab / Trace tab)
- Card border-radius: 12px
- Card padding: 20px (p-5)
- Component gap: 16px (gap-4)
- Section gap: 24px (gap-6)

### Animation Constants

All animations use Framer Motion spring physics:
```tsx
const SPRING = { type: "spring", stiffness: 300, damping: 30 };
const SPRING_SOFT = { type: "spring", stiffness: 200, damping: 25 };
const FADE_IN = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: SPRING_SOFT };
```

### Component Design Rules

1. **Cards**: `bg-surface rounded-xl border border-[var(--border)] shadow-sm p-5`
2. **Buttons (primary)**: `bg-[var(--accent)] text-white rounded-lg px-4 py-2.5 font-medium text-sm hover:opacity-90 transition-opacity`
3. **Buttons (secondary)**: `bg-[var(--bg-surface-alt)] text-[var(--text-primary)] rounded-lg px-4 py-2.5 font-medium text-sm border border-[var(--border)] hover:bg-[var(--border-light)]`
4. **Input fields**: `bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl px-4 py-3 text-[15px] focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] outline-none transition-all`
5. **No box shadows heavier than shadow-md** on any element.
6. **Never use pure black (#000000)** — always use --text-primary (#1C1C1E).
7. **Haptic animation on button press**: `whileTap={{ scale: 0.97 }}` on every interactive element.

---

## FILE STRUCTURE

```
ponder/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with fonts, metadata, providers
│   │   ├── page.tsx                # Main page — the entire app
│   │   ├── globals.css             # CSS variables, Tailwind base
│   │   └── api/
│   │       ├── chat/
│   │       │   └── route.ts        # POST — agentic chat endpoint (streaming)
│   │       └── embed/
│   │           └── route.ts        # POST — document embedding endpoint
│   │
│   ├── components/
│   │   ├── DocumentPanel.tsx       # Left sidebar: document upload & management
│   │   ├── ChatPanel.tsx           # Center: chat messages + input
│   │   ├── TracePanel.tsx          # Right: agent reasoning trace viewer
│   │   ├── ChatMessage.tsx         # Individual chat bubble (user or assistant)
│   │   ├── TraceStep.tsx           # Individual agent trace step (expandable)
│   │   ├── DocumentCard.tsx        # Uploaded document display card
│   │   ├── ConfidenceBar.tsx       # Evaluation score visual bar
│   │   ├── StatusBadge.tsx         # Agent status indicator (Planning, Searching, etc.)
│   │   ├── EmptyState.tsx          # Shown when no documents uploaded yet
│   │   └── Header.tsx              # Top bar with title and dark mode toggle
│   │
│   ├── lib/
│   │   ├── rag.ts                  # RAG engine: chunk, embed, store, retrieve
│   │   ├── agent.ts                # Agent tool definitions for Vercel AI SDK
│   │   ├── embeddings.ts           # Gemini embedding calls
│   │   ├── vectorStore.ts          # In-memory vector store with cosine similarity
│   │   └── prompts.ts              # All system prompts and prompt templates
│   │
│   ├── stores/
│   │   └── useAppStore.ts          # Zustand store for app state
│   │
│   └── types/
│       └── index.ts                # TypeScript type definitions
│
├── .env.local                      # API keys (git-ignored)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## FEATURE SPECIFICATION

### Screen 1: The Main (and only) Page

The entire app is a single page with a three-panel layout:

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: "Ponder" logo + tagline + dark mode toggle         │
├──────────────┬──────────────────────┬───────────────────────┤
│              │                      │                       │
│  DOCUMENTS   │       CHAT           │    AGENT TRACE        │
│  PANEL       │       PANEL          │    PANEL              │
│  (240px)     │       (flex-1)       │    (380px)            │
│              │                      │                       │
│  - Upload    │  - Message history   │  - Step 1: Planning   │
│    area      │  - Streaming reply   │  - Step 2: Searching  │
│  - Doc list  │  - Input bar         │  - Step 3: Analyzing  │
│  - Doc count │                      │  - Step 4: Evaluating │
│              │                      │  - Confidence score   │
│              │                      │                       │
└──────────────┴──────────────────────┴───────────────────────┘
```

On mobile (< 768px): Documents panel becomes a collapsible drawer. Chat and Trace become tabs.

### The Document Panel (left)

**Upload area:**
- Drag-and-drop zone OR paste text directly into a textarea
- Accepts: .txt, .md files (no PDF parsing needed — keep scope tight)
- Also accepts raw text paste (a large textarea with "Paste your document here..." placeholder)
- On upload/paste: document is chunked, embedded, and stored in the in-memory vector store
- Visual: document appears as a card with title (first line or filename), word count, chunk count

**Document cards:**
- Show: title, word count, number of chunks, a "remove" button
- Subtle colour-coded left border per document (auto-assigned from a palette)
- When a document's chunks are cited in an answer, the card briefly glows

**Maximum: 5 documents** simultaneously (keeps the demo focused and free-tier-friendly).

### The Chat Panel (center)

**Message display:**
- User messages: right-aligned, accent background, white text, rounded-2xl
- Assistant messages: left-aligned, surface background, primary text, rounded-2xl
- Assistant messages stream in token-by-token with a smooth typing animation
- Citations appear as inline numbered references `[1]` that, on hover, show the source chunk in a tooltip
- At the bottom of each assistant message: a "Confidence" badge showing the self-evaluation score (e.g., "92% confident · 3 sources cited")

**Input area (bottom of chat panel):**
- Large textarea (auto-expanding, max 5 lines)
- Send button (arrow icon) — disabled when empty or when agent is thinking
- Keyboard shortcut: Cmd/Ctrl + Enter to send
- Placeholder text cycles through examples:
  - "What are the key themes across these documents?"
  - "Find contradictions between document 1 and 2..."
  - "Summarize the main arguments and evidence..."
  - "What's missing from this analysis?"

**Starter prompts (shown when chat is empty):**
- 4 clickable suggestion chips above the input:
  1. "Summarize the key themes"
  2. "Find connections between documents"  
  3. "What are the strongest arguments?"
  4. "What's missing or contradictory?"

### The Agent Trace Panel (right)

This is the **differentiator**. It shows the agent's reasoning process in real-time.

**Structure:** A vertical timeline of expandable steps. Each step has:
- A coloured status icon (amber for planning, blue for searching, purple for analyzing, emerald for evaluating, green for complete)
- A title (e.g., "Planning approach", "Searching documents", "Cross-referencing facts")
- A timestamp (relative: "2.1s ago")
- A duration badge (e.g., "took 1.4s")
- An expandable body showing the tool input/output

**Step types (in order of typical appearance):**

1. **🟡 Planning** — The agent's initial plan. Shows: "I will search for X, then cross-reference with Y, then evaluate Z."
2. **🔵 Searching [document name]** — RAG retrieval. Shows: the query used, number of chunks found, relevance scores, the actual text snippets retrieved.
3. **🟣 Analyzing** — The agent processing retrieved chunks. Shows: entities extracted, key facts identified, connections found.
4. **🟢 Evaluating** — Self-check. Shows:
   - Faithfulness score (0-100): "Does the answer only use facts from the documents?"
   - Relevance score (0-100): "Does the answer address the question?"
   - Completeness score (0-100): "Are there aspects left unanswered?"
   - Overall confidence (average of the three)
5. **✅ Complete** — Final status. Shows: total time, tools called count, chunks used count.

Each step animates in as it happens (Framer Motion staggered fade-in with the SPRING_SOFT config).

### The Header

- Left: "Ponder" in Instrument Serif, 24px. Below in small text: "AI that thinks before it speaks"
- Right: Dark mode toggle (sun/moon icon), GitHub link icon

---

## AGENT ARCHITECTURE

### How the Agent Works (for the AI assistant generating code)

The agent uses the **Vercel AI SDK's `streamText` function with `tools`**. This is NOT a custom agent loop — it uses the SDK's built-in agentic capabilities where the LLM can call tools and the SDK handles the loop.

```tsx
// Simplified flow:
import { streamText, tool } from 'ai';
import { google } from '@ai-sdk/google';

const result = streamText({
  model: google('gemini-2.0-flash'),
  system: SYSTEM_PROMPT,
  messages: conversationHistory,
  tools: {
    searchDocuments: tool({ ... }),
    analyzeChunks: tool({ ... }),
    evaluateAnswer: tool({ ... }),
  },
  maxSteps: 8, // Allow up to 8 tool calls per response
  onStepFinish: (step) => {
    // This callback fires after each tool call
    // We use it to build the trace timeline
  },
});
```

### Tool Definitions

**Tool 1: `searchDocuments`**
- Description: "Search the uploaded documents for information relevant to a query. Returns the most relevant text chunks with relevance scores."
- Parameters (Zod schema):
  - `query`: string — the search query
  - `maxResults`: number (default 5) — how many chunks to return
- Execute function: calls the in-memory vector store's similarity search
- Returns: array of `{ content: string, documentTitle: string, chunkIndex: number, relevanceScore: number }`

**Tool 2: `analyzeChunks`**
- Description: "Analyze a set of text chunks to extract key entities, facts, dates, and relationships. Use this after searching to understand what you found."
- Parameters:
  - `chunks`: string — the text to analyze
  - `focusArea`: string — what to look for (e.g., "key arguments", "dates and timelines", "contradictions")
- Execute function: calls Gemini with a focused analysis prompt
- Returns: `{ entities: string[], keyFacts: string[], relationships: string[], summary: string }`

**Tool 3: `evaluateAnswer`**
- Description: "Evaluate a draft answer for faithfulness, relevance, and completeness. ALWAYS call this before giving your final answer."
- Parameters:
  - `question`: string — the original user question
  - `draftAnswer`: string — the answer to evaluate
  - `sourceMaterial`: string — the chunks the answer was based on
- Execute function: calls Gemini with an evaluation prompt that returns structured scores
- Returns: `{ faithfulness: number, relevance: number, completeness: number, issues: string[], overallConfidence: number }`

### System Prompt

```
You are Ponder, an AI research agent that thinks carefully before answering.

YOUR CORE BEHAVIOUR:
1. ALWAYS start by planning your approach. State what you'll search for and why.
2. Use the searchDocuments tool to find relevant information. Search multiple times with different queries if needed.
3. Use the analyzeChunks tool to deeply understand what you found.
4. Formulate your answer based ONLY on information from the documents. Never make claims not supported by the documents.
5. ALWAYS use the evaluateAnswer tool before giving your final answer. This is mandatory.
6. In your final answer, cite sources using [1], [2], etc. matching the chunks you used.

YOUR PERSONALITY:
- Thoughtful and precise. You never rush.
- Honest about uncertainty. If the documents don't contain enough information, say so.
- You explain your reasoning, not just your conclusions.

STRICT RULES:
- Never fabricate information not in the documents.
- Never skip the evaluation step.
- If asked about something not in the documents, say "I don't have enough information in the uploaded documents to answer this reliably."
- Maximum 4 search queries per question (to stay within rate limits).
```

---

## RAG ENGINE SPECIFICATION

### Chunking Strategy

```typescript
// src/lib/rag.ts

function chunkDocument(text: string, title: string): Chunk[] {
  // Strategy: sentence-window chunking
  // 1. Split text into sentences (using period + space as delimiter, handling abbreviations)
  // 2. Create overlapping windows of 3-5 sentences each
  // 3. Each chunk is ~200-400 tokens (roughly 150-300 words)
  // 4. Adjacent chunks overlap by 1 sentence (prevents losing info at boundaries)
  
  const sentences = splitIntoSentences(text);
  const WINDOW_SIZE = 4; // sentences per chunk
  const OVERLAP = 1;     // sentences of overlap
  const chunks: Chunk[] = [];
  
  for (let i = 0; i < sentences.length; i += (WINDOW_SIZE - OVERLAP)) {
    const window = sentences.slice(i, i + WINDOW_SIZE);
    if (window.length < 2) continue; // skip tiny trailing chunks
    
    chunks.push({
      id: `${slugify(title)}-chunk-${chunks.length}`,
      content: window.join(' '),
      documentTitle: title,
      chunkIndex: chunks.length,
      sentenceStart: i,
      sentenceEnd: i + window.length - 1,
    });
  }
  
  return chunks;
}
```

### Embedding

```typescript
// src/lib/embeddings.ts
// Use Gemini's text-embedding-004 model via @ai-sdk/google

import { embed, embedMany } from 'ai';
import { google } from '@ai-sdk/google';

const embeddingModel = google.textEmbeddingModel('text-embedding-004');

export async function embedText(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: embeddingModel,
    value: text,
  });
  return embedding;
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: texts,
  });
  return embeddings;
}
```

### In-Memory Vector Store

```typescript
// src/lib/vectorStore.ts

interface StoredChunk {
  chunk: Chunk;
  embedding: number[];
}

class VectorStore {
  private store: StoredChunk[] = [];
  
  add(chunk: Chunk, embedding: number[]) {
    this.store.push({ chunk, embedding });
  }
  
  search(queryEmbedding: number[], maxResults: number = 5): SearchResult[] {
    return this.store
      .map(item => ({
        chunk: item.chunk,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  }
  
  removeByDocument(documentTitle: string) {
    this.store = this.store.filter(item => item.chunk.documentTitle !== documentTitle);
  }
  
  get size() { return this.store.length; }
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
```

**Important:** The vector store lives in a **global variable** in the Next.js API route (persists across requests in the same server instance on Vercel). On Vercel serverless, this means it resets on cold starts — acceptable for a demo.

```typescript
// At the top of the API route file:
// This creates a singleton store that persists across requests
const globalStore = globalThis as unknown as { vectorStore: VectorStore };
if (!globalStore.vectorStore) {
  globalStore.vectorStore = new VectorStore();
}
```

---

## ZUSTAND STORE

```typescript
// src/stores/useAppStore.ts

interface Document {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  chunkCount: number;
  colour: string;         // Auto-assigned from palette
  uploadedAt: Date;
}

interface TraceStep {
  id: string;
  type: 'planning' | 'searching' | 'analyzing' | 'evaluating' | 'complete' | 'error';
  title: string;
  detail: string;         // Expanded content
  startedAt: number;      // timestamp
  completedAt?: number;
  toolInput?: any;
  toolOutput?: any;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  traceSteps: TraceStep[];
  confidence?: {
    faithfulness: number;
    relevance: number;
    completeness: number;
    overall: number;
  };
  citations?: Citation[];
}

interface AppState {
  // Documents
  documents: Document[];
  addDocument: (doc: Document) => void;
  removeDocument: (id: string) => void;
  
  // Chat
  messages: Message[];
  addMessage: (msg: Message) => void;
  updateLastAssistantMessage: (content: string) => void;
  
  // Trace (for current streaming response)
  currentTrace: TraceStep[];
  addTraceStep: (step: TraceStep) => void;
  updateTraceStep: (id: string, updates: Partial<TraceStep>) => void;
  clearCurrentTrace: () => void;
  
  // UI
  isAgentThinking: boolean;
  setAgentThinking: (v: boolean) => void;
  activeTab: 'chat' | 'trace'; // mobile only
  setActiveTab: (tab: 'chat' | 'trace') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
```

---

## TYPE DEFINITIONS

```typescript
// src/types/index.ts

export interface Chunk {
  id: string;
  content: string;
  documentTitle: string;
  chunkIndex: number;
  sentenceStart: number;
  sentenceEnd: number;
}

export interface SearchResult {
  chunk: Chunk;
  score: number;
}

export interface Citation {
  index: number;          // [1], [2], etc.
  chunkId: string;
  documentTitle: string;
  content: string;        // The cited text snippet
  score: number;          // Relevance score
}

export interface EvaluationResult {
  faithfulness: number;   // 0-100
  relevance: number;      // 0-100
  completeness: number;   // 0-100
  issues: string[];
  overallConfidence: number; // 0-100
}
```

---

## API ROUTES

### POST /api/embed

Receives a document, chunks it, embeds all chunks, stores in the vector store.

```
Request body: { title: string, content: string }
Response: { success: true, chunkCount: number }
```

### POST /api/chat

The main agentic endpoint. Uses Vercel AI SDK's `streamText` with tools.

```
Request body: standard Vercel AI SDK message format
Response: streaming text with tool call annotations
```

The chat route must:
1. Accept the conversation history
2. Include the system prompt from prompts.ts
3. Define all three tools (searchDocuments, analyzeChunks, evaluateAnswer)
4. Set `maxSteps: 8`
5. Stream the response back
6. On each `onStepFinish`, emit a custom data annotation with the trace step info

Use `createDataStreamResponse` and `dataStream.writeMessageAnnotation` from the Vercel AI SDK to send trace data alongside the streaming text.

---

## IMPLEMENTATION ORDER (Hour-by-Hour)

### Phase A: Foundation (Hours 1-4)

**Hour 1: Project Setup**
- `npx create-next-app@latest ponder --typescript --tailwind --app --src-dir`
- Install deps: `npm install ai @ai-sdk/google framer-motion zustand lucide-react zod`
- Set up `.env.local` with Gemini key
- Create the file structure (empty files)
- Set up `globals.css` with all CSS variables from the design system
- Set up `layout.tsx` with fonts (Inter + Instrument Serif)

**Hour 2: Design System Components**
- Build `Header.tsx` (logo, tagline, dark mode toggle)
- Build `StatusBadge.tsx` (coloured status pills)
- Build `ConfidenceBar.tsx` (animated progress bars for eval scores)
- Set up the three-panel layout in `page.tsx`
- Verify responsive: panels → tabs on mobile

**Hour 3: RAG Engine**
- Implement `src/lib/rag.ts` (sentence splitting, chunking)
- Implement `src/lib/embeddings.ts` (Gemini embedding calls)
- Implement `src/lib/vectorStore.ts` (in-memory store + cosine similarity)
- Implement `POST /api/embed` route

**Hour 4: Document Panel**
- Build `DocumentCard.tsx`
- Build `DocumentPanel.tsx` with text paste area and .txt/.md file upload
- Wire to `/api/embed` — on document submit, chunk + embed + store
- Build `EmptyState.tsx` for when no documents are uploaded

### Phase B: Agent Core (Hours 5-10)

**Hour 5-6: Agent Tools & Prompt**
- Implement `src/lib/prompts.ts` (system prompt + evaluation prompt)
- Implement `src/lib/agent.ts` (three tool definitions using Zod schemas)
- Each tool's `execute` function should work standalone

**Hour 7-8: Chat API Route**
- Implement `POST /api/chat` using `streamText` with all three tools
- Enable `maxSteps: 8`
- Use `createDataStreamResponse` to stream trace steps as message annotations
- Test with curl or Postman — verify tool calling works

**Hour 9-10: Chat UI**
- Build `ChatMessage.tsx` (user + assistant variants, citation tooltips)
- Build `ChatPanel.tsx` (message list + input + starter suggestions)
- Wire to `/api/chat` using Vercel AI SDK's `useChat` hook
- Implement streaming display with typing animation

### Phase C: The Differentiator (Hours 11-16)

**Hour 11-12: Trace Panel**
- Build `TraceStep.tsx` (expandable, colour-coded, with timing)
- Build `TracePanel.tsx` (vertical timeline of steps)
- Wire to the message annotations from the chat stream
- Steps should animate in one by one as the agent works

**Hour 13-14: Evaluation Display**
- When `evaluateAnswer` tool returns, display the scores in `ConfidenceBar.tsx`
- Show the three sub-scores + overall confidence below the assistant's message
- If confidence < 60%, show an amber warning: "Low confidence — the documents may not contain enough information."

**Hour 15-16: Citations System**
- Parse `[1]`, `[2]` etc. in assistant messages
- On hover, show a tooltip with the cited chunk text + document title + relevance score
- Highlight the cited text in the document panel momentarily (pulse animation)

### Phase D: Polish (Hours 17-22)

**Hour 17-18: Animations & Micro-interactions**
- Chat messages: staggered fade-in with spring physics
- Trace steps: sequential reveal with SPRING_SOFT
- Document upload: card slides in from left
- Confidence bars: animated fill from 0 to score
- Send button: scale pulse on hover, compress on press
- Dark mode: smooth cross-fade transition (200ms)

**Hour 19-20: Edge Cases & UX Polish**
- Empty state when no documents uploaded
- Loading states during embedding (progress indicator)
- Error handling: API failures show friendly messages, not stack traces
- Max document length validation (50,000 characters per doc for free-tier safety)
- Disable send while agent is thinking
- Auto-scroll chat to bottom on new messages
- Keyboard shortcut: Cmd/Ctrl+Enter to send

**Hour 21-22: Responsive & Accessibility**
- Mobile layout: collapsible document drawer + chat/trace tabs
- Touch targets ≥ 44px
- Contrast ratios verified (all text passes WCAG AA 4.5:1)
- `aria-labels` on all interactive elements
- Focus ring on keyboard navigation

### Phase E: Ship (Hours 23-24)

**Hour 23: Deploy**
- Push to GitHub (public repo)
- Connect to Vercel (automatic deploy)
- Verify production build works
- Test on mobile browser

**Hour 24: README & Demo**
- Write README.md (see structure below)
- Record a 3-minute Loom demo video showing:
  1. Upload 2 documents
  2. Ask a cross-document question
  3. Watch the agent think in the trace panel
  4. See the evaluation scores
  5. Hover over citations
- Post on LinkedIn with the demo video

---

## README STRUCTURE

```markdown
# Ponder — AI That Thinks Before It Speaks

> An agentic research assistant that plans, searches, cross-references, 
> and evaluates its own answers — with full reasoning transparency.

[Live Demo](https://ponder-app.vercel.app) · [3-min Demo Video](link)

## The Problem
AI assistants answer instantly — but how do you know the answer is trustworthy? 
You can't see their reasoning. You can't verify their sources.

## The Solution
Ponder shows its thinking. Upload documents, ask questions, and watch the AI agent:
1. **Plan** its research approach
2. **Search** your documents with semantic understanding
3. **Analyze** and cross-reference what it finds
4. **Evaluate** its own answer for accuracy
5. **Cite** every claim with traceable sources

## Architecture
[Excalidraw diagram]

### Agent System
- 3 tools (searchDocuments, analyzeChunks, evaluateAnswer)
- Vercel AI SDK with `maxSteps: 8` for multi-step reasoning
- Self-evaluation produces faithfulness, relevance, and completeness scores

### RAG Pipeline
- Sentence-window chunking (4 sentences, 1 overlap)
- Gemini text-embedding-004 (768 dimensions)
- In-memory cosine similarity search
- Top-5 retrieval per query

### Evaluation
- Every answer is self-evaluated before delivery
- Three metrics: Faithfulness, Relevance, Completeness (0-100)
- Low-confidence answers are flagged to the user

## Tech Stack
Next.js 15 · Tailwind CSS · Framer Motion · Vercel AI SDK · Google Gemini 2.0 Flash · Zustand

## What I'd Build Next (with more time)
- Persistent vector store (Supabase pgvector)
- PDF parsing with layout awareness
- Multi-model routing (small model for simple queries, large for complex)
- Automated eval suite with golden test cases
- Observability dashboard (Langfuse integration)
- Production deployment with rate limiting and auth

## Run Locally
git clone ... && cd ponder
npm install
echo "GOOGLE_GENERATIVE_AI_API_KEY=your_key" > .env.local
npm run dev
```

---

## WHAT "DONE" LOOKS LIKE

The finished Ponder app, when someone opens it:

1. They see a beautiful, calm, warm-paper-background interface with three panels.
2. The left panel invites them to "Paste or upload your documents."
3. They paste 2 documents. Each appears as a card with title and word count. A subtle progress bar shows embedding.
4. They type "What are the connections between these two documents?" and hit Enter.
5. In the right panel, trace steps appear one by one:
   - 🟡 "Planning: I'll search both documents for overlapping themes..."
   - 🔵 "Searching Document 1 for key themes..." (shows 4 chunks found)
   - 🔵 "Searching Document 2 for related concepts..." (shows 3 chunks found)
   - 🟣 "Analyzing: Cross-referencing themes..." (shows entities and connections)
   - 🟢 "Evaluating answer..." (shows faithfulness 94%, relevance 91%, completeness 87%)
   - ✅ "Complete — 4 tools called, 7 chunks used, 6.2s total"
6. In the centre panel, a thoughtful multi-paragraph answer streams in with `[1]`, `[2]` citations.
7. Below the answer: "92% confident · 7 sources cited" in a subtle badge.
8. Hovering over `[1]` shows a tooltip with the exact source text.
9. The whole experience feels like watching a careful researcher at work — not a chatbot guessing.

---

## CRITICAL WARNINGS FOR THE CODING AGENT

1. **Use `@ai-sdk/google`, NOT `@google/generative-ai`.** The Vercel AI SDK provider is the one that supports tool calling and streaming properly.

2. **Gemini 2.0 Flash model string is `gemini-2.0-flash`.** Not `gemini-2.0-flash-exp` or any other variant. Check Vercel AI SDK docs if unsure.

3. **Tool calling with Gemini via Vercel AI SDK:** tools must use Zod schemas. The `execute` function runs on the server. The SDK handles the LLM ↔ tool loop automatically — you do NOT need to write a manual loop.

4. **Streaming annotations:** use `streamText` with `onStepFinish` callback. To send trace data to the client alongside the stream, use `createDataStreamResponse` and write annotations via `dataStream.writeMessageAnnotation()`.

5. **In-memory vector store caveat:** on Vercel serverless functions, memory is NOT shared between the `/api/embed` and `/api/chat` routes if they run on different serverless instances. Fix: use a single API route file for both, or use `globalThis` as the shared namespace.

6. **Rate limits:** Google AI Studio free tier = 15 requests per minute, 1500 per day. The embedding step can be batched (send multiple texts per call via `embedMany`). Keep search calls ≤ 4 per user question.

7. **No `<form>` tags in the JSX** — use `onClick` handlers and Vercel AI SDK's `useChat` hook.

8. **Every component must be a client component (`'use client'`)** except `layout.tsx` and `page.tsx` (which can be server components that import client components).

9. **Framer Motion `AnimatePresence` must wrap any element that animates on mount/unmount.** Trace steps entering the trace panel need this.

10. **Dark mode:** use a class-based approach (`document.documentElement.classList.toggle('dark')`) stored in Zustand with persist to localStorage.

---

*End of specification. Build this exactly as described. Ship it. Let the work speak for itself.*
