'use client';

import React from 'react';

export default function NewsletterError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-16 text-center space-y-6">
      <h2 className="text-xl font-medium text-foreground">
        Unable to load newsletter issues right now
      </h2>
      <p className="text-sm text-muted max-w-md mx-auto">
        Something unexpected happened while fetching the newsletter archive.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 text-xs font-mono font-medium text-background bg-foreground rounded hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}
