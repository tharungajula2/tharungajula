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
      setMessage('Please enter a valid email address.');
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

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
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
            className="w-full h-11 px-3.5 text-sm font-sans text-[#0F172A] bg-[#FFFFFF] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] disabled:opacity-50 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-11 px-5 text-sm font-mono font-medium text-[#FFFFFF] bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center justify-center min-w-[100px]"
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
              ? 'bg-[#F0FDF4] text-[#16A34A] border-[#86EFAC]'
              : 'bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5]'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
