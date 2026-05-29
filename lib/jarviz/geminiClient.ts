'use client';

interface StreamOptions {
  message: string;
  onToken: (token: string, fullText: string) => void;
  onDone?: (fullText: string) => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal;
}

export async function streamJarvizGemini({
  message,
  onToken,
  onDone,
  onError,
  signal,
}: StreamOptions): Promise<void> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: message }
        ]
      }),
      signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      let errorMsg = 'Failed to generate response.';
      try {
        const parsed = JSON.parse(errText);
        if (parsed.error) errorMsg = parsed.error;
      } catch {
        // use default error message if not json
      }
      throw new Error(errorMsg);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response stream is unavailable.');
    }

    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      if (signal?.aborted) {
        console.log('[JARVIZ Gemini] Stream aborted by client.');
        break;
      }

      const { done, value } = await reader.read();
      if (done) break;

      const token = decoder.decode(value, { stream: true });
      fullText += token;
      onToken(token, fullText);
    }

    if (onDone && !signal?.aborted) {
      onDone(fullText);
    }
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.log('[JARVIZ Gemini] Fetch request aborted safely.');
      return;
    }
    console.error('[JARVIZ Gemini] Streaming error:', err);
    if (onError) {
      onError(err instanceof Error ? err : new Error(String(err)));
    }
  }
}
