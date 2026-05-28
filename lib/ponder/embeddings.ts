import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { embed, embedMany } from "ai";

// 1. GET GOOGLE PROVIDER CONTEXT WITH FALLBACK API KEY LOGIC
export function getGoogleProvider() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key missing. Set GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY in your env configuration.");
  }
  return createGoogleGenerativeAI({ apiKey });
}

// 2. RETRIEVE TEXT EMBEDDING MODEL DEFINITION
export function getEmbeddingModel() {
  const google = getGoogleProvider();
  
  // Standard Vercel AI SDK embedding interface for modern @ai-sdk/google
  // Using 'gemini-embedding-2' as it is highly supported on standard API versions and key tiers
  return google.textEmbeddingModel("gemini-embedding-2");
}

// 3. GENERATE EMBEDDING FOR A SINGLE QUERY TEXT
export async function embedText(text: string): Promise<number[]> {
  const model = getEmbeddingModel();
  const { embedding } = await embed({
    model,
    value: text,
  });
  return embedding;
}

// 4. BATCH EMBED MULTIPLE TEXT SEGMENTS SIMULTANEOUSLY
export async function embedChunkTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const model = getEmbeddingModel();
  const { embeddings } = await embedMany({
    model,
    values: texts,
  });
  return embeddings;
}

// 5. CENTRALIZED MODEL COORDINATE FOR CHAT LOGIC
export function getChatModel() {
  const google = getGoogleProvider();
  
  // Enforces 'gemini-2.0-flash' as the primary target model, with dynamic runtime overrides
  const modelName = process.env.PONDER_MODEL || "gemini-2.0-flash";
  return google(modelName);
}

