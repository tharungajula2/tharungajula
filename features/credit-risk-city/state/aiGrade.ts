import type { AiGrade, GradeRequest } from '../grader/grade';

/** Ask the server to suggest which key points an answer covers. Throws on any failure. */
export async function requestAiGrade(req: GradeRequest): Promise<AiGrade> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch('/api/crc-grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
      signal: ctrl.signal,
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body?.error ?? 'AI grader unavailable');
    return body as AiGrade;
  } finally {
    clearTimeout(timer);
  }
}
