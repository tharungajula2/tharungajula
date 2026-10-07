'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-serif font-bold text-foreground">Something went wrong</h1>
          <p className="text-sm text-muted">
            An unexpected application error occurred.
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 text-xs font-mono font-medium text-background bg-foreground rounded hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
