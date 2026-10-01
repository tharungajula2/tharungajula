/**
 * Central configuration for the portfolio agent.
 * This is the single source of truth for the Gemini model used in production.
 *
 * To override at deployment time, set the GEMINI_MODEL environment variable.
 */
export const GEMINI_MODEL =
  process.env.GEMINI_MODEL ?? 'gemini-3.5-flash-lite';

/**
 * The Gemini REST API base for generateContent.
 */
export function geminiEndpoint(apiKey: string): string {
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
}
