import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BUTTONDOWN_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      hasKey: false,
      listStatus: null,
      listCount: 0,
      subscribersStatus: null,
      error: 'BUTTONDOWN_API_KEY environment variable is not configured',
    });
  }

  try {
    const [emailsRes, subscribersRes] = await Promise.all([
      fetch('https://api.buttondown.email/v1/emails?status=sent', {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'X-Buttondown-API-Version': '2026-04-01',
        },
        cache: 'no-store',
      }).catch((e) => e),
      fetch('https://api.buttondown.email/v1/subscribers?page_size=1', {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'X-Buttondown-API-Version': '2026-04-01',
        },
        cache: 'no-store',
      }).catch((e) => e),
    ]);

    const emailsStatus = emailsRes instanceof Response ? emailsRes.status : null;
    const subscribersStatus = subscribersRes instanceof Response ? subscribersRes.status : null;

    let listCount = 0;
    let errCode: string | null = null;

    if (emailsRes instanceof Response && emailsRes.ok) {
      const data = await emailsRes.json().catch(() => null);
      listCount = Array.isArray(data)
        ? data.length
        : Array.isArray(data?.results)
        ? data.results.length
        : 0;
    } else if (emailsRes instanceof Response) {
      errCode = `emails_http_${emailsRes.status}`;
    }

    if (subscribersRes instanceof Response && !subscribersRes.ok && !errCode) {
      errCode = `subscribers_http_${subscribersRes.status}`;
    }

    return NextResponse.json({
      hasKey: true,
      listStatus: emailsStatus,
      listCount,
      subscribersStatus,
      error: errCode,
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({
      hasKey: true,
      listStatus: 500,
      listCount: 0,
      subscribersStatus: 500,
      error: `exception: ${errMsg}`,
    });
  }
}
