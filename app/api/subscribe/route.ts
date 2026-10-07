import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, message: 'Subscriptions are temporarily unavailable.', code: 'missing_api_key' },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body.email !== 'string' || !body.email.includes('@')) {
      return NextResponse.json(
        { ok: false, message: 'Please check your email address.', code: 'invalid_email' },
        { status: 400 }
      );
    }

    const email = body.email.trim();

    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'X-Buttondown-API-Version': '2026-04-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    });

    const resText = await response.text().catch(() => '');
    let resData: Record<string, unknown> = {};
    try {
      if (resText) resData = JSON.parse(resText);
    } catch {
      // non-JSON response body
    }

    if (response.ok) {
      return NextResponse.json(
        { ok: true, message: "Thanks for subscribing! Check your inbox to confirm.", code: 'success' },
        { status: 200 }
      );
    }

    // Log detail without exposing key
    console.error(`[Newsletter Subscribe Error] HTTP ${response.status}:`, resText.slice(0, 300));

    const rawStr = JSON.stringify(resData).toLowerCase() + ' ' + resText.toLowerCase();
    const bdCode = typeof resData.code === 'string' ? resData.code : (Array.isArray(resData.detail) ? 'validation_error' : 'unknown');

    // 1. Already subscribed check
    if (
      response.status === 400 &&
      (rawStr.includes('already subscribed') || rawStr.includes('already exists') || bdCode === 'already_subscribed')
    ) {
      return NextResponse.json(
        { ok: true, message: "You're already on the list.", code: 'already_subscribed' },
        { status: 200 }
      );
    }

    // 2. Invalid email check
    if (response.status === 400 && (rawStr.includes('invalid email') || rawStr.includes('email_address'))) {
      return NextResponse.json(
        { ok: false, message: 'Please check your email address.', code: 'invalid_email' },
        { status: 400 }
      );
    }

    // 3. Blocked / firewall
    if (response.status === 403 || rawStr.includes('blocked') || rawStr.includes('disallowed')) {
      return NextResponse.json(
        { ok: false, message: "This address can't be subscribed.", code: bdCode || 'blocked' },
        { status: 403 }
      );
    }

    // 4. Permission / Auth
    if (response.status === 401) {
      return NextResponse.json(
        { ok: false, message: 'Subscriptions are temporarily unavailable.', code: 'unauthorized' },
        { status: 503 }
      );
    }

    // 5. Rate limit
    if (response.status === 429) {
      return NextResponse.json(
        { ok: false, message: 'Too many attempts. Please try again shortly.', code: 'rate_limited' },
        { status: 429 }
      );
    }

    // Generic fallback
    return NextResponse.json(
      { ok: false, message: 'Unable to subscribe right now. Please try again later.', code: bdCode || 'server_error' },
      { status: response.status >= 400 && response.status < 500 ? response.status : 500 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Newsletter Subscribe Exception]:', msg);
    return NextResponse.json(
      { ok: false, message: 'An unexpected error occurred. Please try again.', code: 'exception' },
      { status: 500 }
    );
  }
}
