import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Subscriptions are not available yet.' },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body.email !== 'string' || !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const email = body.email.trim();

    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (response.ok) {
      return NextResponse.json(
        { message: 'Thanks for subscribing! Check your inbox to confirm.' },
        { status: 200 }
      );
    }

    const resData = await response.json().catch(() => ({}));

    // Handle already subscribed or existing subscriber gracefully
    if (
      response.status === 400 &&
      JSON.stringify(resData).toLowerCase().includes('already subscribed')
    ) {
      return NextResponse.json(
        { message: 'You are already subscribed! Thanks for reading.' },
        { status: 200 }
      );
    }

    if (response.status === 429) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Unable to subscribe right now. Please try again later.' },
      { status: response.status >= 400 && response.status < 500 ? response.status : 500 }
    );
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
