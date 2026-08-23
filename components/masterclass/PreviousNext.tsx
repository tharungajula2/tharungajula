"use client";

import Link from "next/link";

interface PreviousNextProps {
  prev?: { id: string; label: string };
  next?: { id: string; label: string };
  notebookHref?: string;
}

export default function PreviousNext({
  prev,
  next,
  notebookHref = "/notebook",
}: PreviousNextProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-hairline font-mono text-xs gap-3">
      {prev ? (
        <a
          href={`#${prev.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink-muted hover:text-accent hover:border-accent/40 transition-all uppercase text-[11px]"
        >
          ← {prev.label}
        </a>
      ) : (
        <Link
          href={notebookHref}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink-muted hover:text-accent hover:border-accent/40 transition-all uppercase text-[11px]"
        >
          ← Notebook Index
        </Link>
      )}

      {next ? (
        <a
          href={`#${next.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent font-bold hover:bg-accent hover:text-surface transition-all uppercase text-[11px] ml-auto"
        >
          {next.label} →
        </a>
      ) : (
        <Link
          href={notebookHref}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent font-bold hover:bg-accent hover:text-surface transition-all uppercase text-[11px] ml-auto"
        >
          Back to Notebook →
        </Link>
      )}
    </div>
  );
}
