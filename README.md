# Tharun Gajula

An evidence-grounded digital portfolio built on Next.js 16.

## Architecture

The application consists of two substantive public pages:

- `/agent`: Interactive portfolio Q&A interface grounded in verified work evidence.
- `/connect`: Direct contact page.

Permanent redirects route legacy endpoints to `/agent`.

## Agent System

The `/agent` interface answers questions about Tharun's background using a strict evidence pipeline:

- **Local Evidence Retrieval**: Matches incoming user queries against a 15-record runtime evidence corpus.
- **Grounded Generation**: Formulates responses using Google Gemini API when configured.
- **Claim Verification**: Verifies output claims against structured evidence before rendering.
- **Strict Refusal**: Refuses queries when no verified public evidence is available.
- **Rate Limiting**: Applies best-effort per-session rate limits on standard chat interactions.

## Evaluation Harness

The agent logic is evaluated against a 22-case benchmark suite to verify retrieval accuracy, routing correctness, claim safety, and refusal behavior.

Run the evaluation suite:

```bash
npm run eval:agent
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Run linting:
   ```bash
   npm run lint
   ```
