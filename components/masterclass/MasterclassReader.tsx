"use client";

import React from "react";
import Link from "next/link";
import { NOTEBOOK_MASTERCLASSES } from "@/lib/notebook-masterclasses";

export interface MasterclassReaderProps {
  slug: string;
  title: string;
  subtitle: string;
  metadataLine?: string;
  snapshotItems?: { label: string; value: string }[];
  children: React.ReactNode;
}

export default function MasterclassReader({
  slug,
  title,
  subtitle,
  metadataLine,
  snapshotItems,
  children,
}: MasterclassReaderProps) {
  const currentIndex = NOTEBOOK_MASTERCLASSES.findIndex((m) => m.id === slug);
  const nextMasterclass =
    currentIndex >= 0 && currentIndex < NOTEBOOK_MASTERCLASSES.length - 1
      ? NOTEBOOK_MASTERCLASSES[currentIndex + 1]
      : NOTEBOOK_MASTERCLASSES[0];

  return (
    <article className="relative w-full max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32 overflow-x-hidden">
      {/* DOCUMENT HEADER */}
      <header className="mb-10 border-b border-hairline pb-8">
        <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-4">
          {title}
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans border-l-2 border-accent/40 pl-3.5 italic mb-6">
          {subtitle}
        </p>

        {metadataLine && (
          <div className="text-xs font-mono text-ink-faint mb-6 border-y border-hairline-faint py-2.5">
            {metadataLine}
          </div>
        )}

        {/* QUIET PROJECT SNAPSHOT */}
        {snapshotItems && snapshotItems.length > 0 && (
          <div className="bg-surface-raised border border-hairline p-4 rounded-xl font-mono text-xs">
            <div className="text-[10px] text-accent font-bold uppercase tracking-widest mb-2">
              // PROJECT SNAPSHOT
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-ink-muted">
              {snapshotItems.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] text-ink-faint uppercase">{item.label}</span>
                  <span className="text-ink font-bold text-xs sm:text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* CONTINUOUS DOCUMENT BODY (SCROLLS NATURAL TOP-TO-BOTTOM) */}
      <div className="space-y-12 text-sm sm:text-base text-ink-muted leading-relaxed">
        {children}
      </div>

      {/* BOTTOM DOCUMENT NAVIGATION */}
      <footer className="mt-16 pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <Link
          href="/notebook"
          className="text-ink-muted hover:text-accent transition-colors uppercase tracking-wider text-[11px]"
        >
          ← Back to Notebook
        </Link>

        {nextMasterclass && (
          <Link
            href={nextMasterclass.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent font-bold hover:bg-accent hover:text-surface transition-all uppercase text-[11px]"
          >
            Next Note: {nextMasterclass.title} →
          </Link>
        )}
      </footer>
    </article>
  );
}
