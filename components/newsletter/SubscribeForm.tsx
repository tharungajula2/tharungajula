"use client";

import React, { useState } from 'react';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bot submission

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please check your email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const text = await res.text().catch(() => '');
      let data: { ok?: boolean; message?: string; error?: string } = {};
      try {
        if (text) data = JSON.parse(text);
      } catch {
        // Non-JSON response handling
      }

      if (res.ok && data.ok) {
        setStatus('success');
        setMessage(data.message || "Thanks for subscribing!");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || data.error || 'Unable to subscribe right now. Please try again later.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again shortly.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3" aria-label="Subscribe to newsletter">
      {/* Honeypot field for bot spam prevention */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp-field">Leave this field blank</label>
        <input
          id="hp-field"
          type="text"
          name="hp_field"
          tabIndex={-1}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="flex-1 min-w-0">
          <label htmlFor="email-input" className="sr-only">
            Email address
          </label>
          <input
            id="email-input"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="w-full h-11 px-3.5 text-sm font-sans text-foreground bg-background border border-border rounded-md focus:outline-none focus:border-foreground disabled:opacity-50 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-11 px-5 text-sm font-mono font-medium text-background bg-foreground hover:opacity-90 disabled:opacity-50 rounded-md transition-opacity whitespace-nowrap shrink-0 flex items-center justify-center min-w-[100px]"
        >
          {status === 'loading' ? 'Joining...' : 'Subscribe'}
        </button>
      </div>

      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`text-xs font-mono p-2.5 rounded border ${
            status === 'success'
              ? 'bg-background text-foreground border-foreground'
              : 'bg-background text-foreground border-border'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
