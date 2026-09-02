import { runAgentPipeline } from '@/lib/agent/pipeline';

// Edge Runtime compatible endpoint
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content || '';

    if (!userMessage.trim()) {
      return new Response(JSON.stringify({ error: 'Empty message' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Run bounded evidence pipeline
    const agentResponse = await runAgentPipeline(userMessage, apiKey);

    // Format sources line for UI
    let textOutput = agentResponse.answer;
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

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Agent API Error:', error instanceof Error ? error.message : error);
    return new Response(
      JSON.stringify({
        answer: "I don't have verified public evidence for that.",
        sources: [],
        refused: true,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
