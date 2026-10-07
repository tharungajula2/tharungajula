import { NextResponse } from 'next/server';
import { isIP } from 'node:net';

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

    // Derive visitor IP from request headers
    const xForwardedFor = req.headers.get('x-forwarded-for');
    const xRealIp = req.headers.get('x-real-ip');

    let rawIp = '';
    if (xForwardedFor) {
      rawIp = xForwardedFor.split(',')[0].trim();
    } else if (xRealIp) {
      rawIp = xRealIp.trim();
    }

    const validIp = isIP(rawIp) !== 0 ? rawIp : undefined;

    const payload: Record<string, string> = {
      email_address: email,
      referrer_url: 'https://tharungajula.vercel.app/newsletter',
    };

    if (validIp) {
      payload.ip_address = validIp;
    }

    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'X-Buttondown-API-Version': '2026-04-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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

    // Log HTTP status and response body (NEVER the API key or visitor IP)
    console.error(`[Newsletter Subscribe Error] HTTP ${response.status}:`, resText.slice(0, 300));

    const rawStr = JSON.stringify(resData).toLowerCase() + ' ' + resText.toLowerCase();
    const bdCode = typeof resData.code === 'string' ? resData.code : (Array.isArray(resData.detail) ? 'validation_error' : 'unknown');

    // 1. Blocked / Firewall check (Check BEFORE invalid_email or 400 default handling)
    if (
      response.status === 403 ||
      bdCode === 'firewall' ||
      bdCode === 'blocked' ||
      bdCode === 'suspicious' ||
      rawStr.includes('firewall') ||
      rawStr.includes('blocked') ||
      rawStr.includes('suspicious') ||
      rawStr.includes('disallowed')
    ) {
      return NextResponse.json(
        {
          ok: false,
          code: 'blocked',
          message: "We couldn't add this address automatically. Please try again later or email me.",
        },
        { status: 403 }
      );
    }

    // 2. Already subscribed check
    if (
      response.status === 400 &&
      (rawStr.includes('already subscribed') || rawStr.includes('already exists') || bdCode === 'already_subscribed')
    ) {
      return NextResponse.json(
        { ok: true, message: "You're already on the list.", code: 'already_subscribed' },
        { status: 200 }
      );
    }

    // 3. Invalid email check
    if (response.status === 400 && (rawStr.includes('invalid email') || rawStr.includes('email_address'))) {
      return NextResponse.json(
        { ok: false, message: 'Please check your email address.', code: 'invalid_email' },
        { status: 400 }
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
