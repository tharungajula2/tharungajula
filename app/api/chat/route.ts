import { runAgentPipeline } from '@/lib/agent/pipeline';
import {
  parseSessionCookie,
  checkRateLimit,
  buildSessionCookieHeader,
} from '@/lib/agent/rate-limit';

// Edge Runtime compatible endpoint
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Session identity & rate-limit enforcement BEFORE agent pipeline execution
    const { sessionId, isNew } = parseSessionCookie(req);
    const rateLimit = checkRateLimit(sessionId);

    const isProd = process.env.NODE_ENV === 'production';
    const responseHeaders = new Headers();

    if (isNew) {
      responseHeaders.set('Set-Cookie', buildSessionCookieHeader(sessionId, isProd));
    }

    responseHeaders.set('X-RateLimit-Limit', rateLimit.limit.toString());
    responseHeaders.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
    responseHeaders.set('X-RateLimit-Reset', Math.ceil(rateLimit.resetAt / 1000).toString());

    if (!rateLimit.allowed) {
      responseHeaders.set('Content-Type', 'application/json');
      responseHeaders.set('Retry-After', rateLimit.retryAfterSeconds.toString());
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again shortly.' }),
        {
          status: 429,
          headers: responseHeaders,
        }
      );
    }

    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content || '';

    if (!userMessage.trim()) {
      responseHeaders.set('Content-Type', 'application/json');
      return new Response(JSON.stringify({ error: 'Empty message' }), {
        status: 400,
        headers: responseHeaders,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Run bounded evidence pipeline
    const agentResponse = await runAgentPipeline(userMessage, apiKey);

    // Format sources line for UI
    let textOutput = agentResponse.answer;

    // If the AI generation failed but deterministic fallback succeeded, surface a note.
    // This distinguishes API outage from an unsupported query.
    if (agentResponse.generationFailed && !agentResponse.refused) {
      textOutput = '[AI synthesis temporarily unavailable — showing verified evidence summary] ' + textOutput;
    }

    if (agentResponse.sources && agentResponse.sources.length > 0 && !agentResponse.refused) {
      const sourceTitles = agentResponse.sources.map((s) => s.title).join('  •  ');
      textOutput += `\n\nSOURCES  •  ${sourceTitles}`;
    }

    // Stream out plain text response cleanly for streaming client
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(textOutput));
        controller.close();
      },
    });

    responseHeaders.set('Content-Type', 'text/plain; charset=utf-8');
    responseHeaders.set('Cache-Control', 'no-cache');

    return new Response(stream, {
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Agent API Error:', error instanceof Error ? error.message : error);
    return new Response(
      'The agent encountered a temporary error. Please try again shortly.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }
}
