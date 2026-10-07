import {
  buildUserMessage,
  parseGradeResponse,
  SYSTEM_INSTRUCTION,
  validateGradeRequest,
  type GradeRequest,
} from '@/features/credit-risk-city/grader/grade';

export const runtime = 'edge';

const json = (body: unknown, status: number) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as unknown;
    const invalid = validateGradeRequest(body);
    if (invalid) return json({ error: invalid }, 400);
    const r = body as GradeRequest;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return json({ error: 'AI grader not configured' }, 503);

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ role: 'user', parts: [{ text: buildUserMessage(r) }] }],
        generationConfig: { temperature: 0, maxOutputTokens: 300, responseMimeType: 'application/json' },
      }),
    });

    if (!res.ok) return json({ error: 'AI grader unavailable' }, 502);
    const data = await res.json();
    const raw: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const grade = parseGradeResponse(raw, r.keyPoints.length);
    if (!grade) return json({ error: 'AI grader gave an unreadable answer' }, 502);
    return json(grade, 200);
  } catch {
    return json({ error: 'AI grader failed' }, 500);
  }
}
