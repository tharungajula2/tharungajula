import { THARUN_CONTEXT } from '@/lib/ai-context';

// CRITICAL: Use Edge Runtime to avoid Vercel serverless timeout (10s limit)
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Get the latest user message
    const userMessage = messages[messages.length - 1]?.content || '';
    
    if (!userMessage.trim()) {
      return new Response(JSON.stringify({ error: 'Empty message' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build conversation history for context
    const conversationHistory = messages
      .slice(0, -1)
      .map((msg: { role: string; content: string }) => 
        `${msg.role === 'user' ? 'Visitor' : 'Assistant'}: ${msg.content}`
      )
      .join('\n');

    const fullPrompt = conversationHistory 
      ? `Previous conversation:\n${conversationHistory}\n\nVisitor's new question: ${userMessage}`
      : userMessage;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Direct fetch to Gemini API (Edge Runtime compatible)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: THARUN_CONTEXT }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: fullPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate response. Please try again.' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Transform SSE stream into plain text stream
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = response.body?.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Process SSE lines
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6).trim();
                if (data === '[DONE]') continue;
                
                try {
                  const parsed = JSON.parse(data);
                  const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch {
                  // Skip non-JSON lines
                }
              }
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate response. Please try again.' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
