import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BUTTONDOWN_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      hasKey: false,
      listStatus: null,
      listCount: 0,
      error: 'BUTTONDOWN_API_KEY environment variable is not configured',
    });
  }

  try {
    const res = await fetch('https://api.buttondown.email/v1/emails?status=sent', {
      headers: {
        'Authorization': `Token ${apiKey}`,
        'X-Buttondown-API-Version': '2026-04-01',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return NextResponse.json({
        hasKey: true,
        listStatus: res.status,
        listCount: 0,
        error: `Buttondown API returned status ${res.status}: ${errText.slice(0, 200)}`,
      });
    }

    const data = await res.json().catch(() => null);
    const count = Array.isArray(data)
      ? data.length
      : Array.isArray(data?.results)
      ? data.results.length
      : 0;

    return NextResponse.json({
      hasKey: true,
      listStatus: 200,
      listCount: count,
      error: null,
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({
      hasKey: true,
      listStatus: 500,
      listCount: 0,
      error: `Fetch exception: ${errMsg}`,
    });
  }
}
