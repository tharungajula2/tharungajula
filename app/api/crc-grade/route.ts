import { parseSessionCookie, checkRateLimit, buildSessionCookieHeader } from '@/lib/agent/rate-limit';
import { geminiEndpoint } from '@/lib/agent/config';
import {
  buildUserMessage,
  parseGradeResponse,
  SYSTEM_INSTRUCTION,
  validateGradeRequest,
  type GradeRequest,
} from '@/features/credit-risk-city/grader/grade';

// Credit Risk City: AI grading of free-text recall/explain answers (suggestions the learner confirms).
export const runtime = 'edge';

const json = (body: unknown, status: number, headers: Headers) => {
  headers.set('Content-Type', 'application/json');
  return new Response(JSON.stringify(body), { status, headers });
};

export async function POST(req: Request) {
  const headers = new Headers();
  try {
    const { sessionId, isNew } = parseSessionCookie(req);
    if (isNew) headers.set('Set-Cookie', buildSessionCookieHeader(sessionId, process.env.NODE_ENV === 'production'));
    const limit = checkRateLimit(sessionId);
    if (!limit.allowed) {
      headers.set('Retry-After', limit.retryAfterSeconds.toString());
      return json({ error: 'Too many requests. Try again shortly.' }, 429, headers);
    }

    const body = (await req.json().catch(() => null)) as unknown;
    const invalid = validateGradeRequest(body);
    if (invalid) return json({ error: invalid }, 400, headers);
    const r = body as GradeRequest;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return json({ error: 'AI grader not configured' }, 503, headers);

    const res = await fetch(
      geminiEndpoint(apiKey),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: [{ role: 'user', parts: [{ text: buildUserMessage(r) }] }],
          generationConfig: { temperature: 0, maxOutputTokens: 300, responseMimeType: 'application/json' },
        }),
      },
    );
    if (!res.ok) return json({ error: 'AI grader unavailable' }, 502, headers);
    const data = await res.json();
    const raw: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const grade = parseGradeResponse(raw, r.keyPoints.length);
    if (!grade) return json({ error: 'AI grader gave an unreadable answer' }, 502, headers);
    return json(grade, 200, headers);
  } catch {
    return json({ error: 'AI grader failed' }, 500, headers);
  }
}
