import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: 'Subscriptions are not available yet.' },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body.email !== 'string' || !body.email.includes('@')) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid email address.' },
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

    if (response.ok) {
      return NextResponse.json(
        { ok: true, message: 'Thanks for subscribing! Check your inbox to confirm.' },
        { status: 200 }
      );
    }

    const resData = await response.json().catch(() => ({}));

    // Handle already subscribed / existing subscriber gracefully
    if (
      response.status === 400 &&
      JSON.stringify(resData).toLowerCase().includes('already subscribed')
    ) {
      return NextResponse.json(
        { ok: true, message: 'You are already subscribed! Thanks for reading.' },
        { status: 200 }
      );
    }

    if (response.status === 429) {
      return NextResponse.json(
        { ok: false, error: 'Too many attempts. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { ok: false, error: 'Unable to subscribe right now. Please try again later.' },
      { status: response.status >= 400 && response.status < 500 ? response.status : 500 }
    );
  } catch (err: unknown) {
    console.error('[Newsletter Subscribe API Error]:', err);
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
