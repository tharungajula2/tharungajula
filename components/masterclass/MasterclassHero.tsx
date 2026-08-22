"use client";

import React from "react";

export interface MasterclassHeroProps {
  kicker: string;
  title: string;
  titleItalic?: string;
  objective: string;
  tags?: string[];
  numbers?: { value: string; label: string }[];
}

export default function MasterclassHero({
  kicker,
  title,
  titleItalic,
  objective,
  tags,
  numbers,
}: MasterclassHeroProps) {
  return (
    <div className="w-full py-8 sm:py-12 border-b border-hairline select-none">
      <div className="text-[10px] sm:text-xs font-mono tracking-[0.14em] uppercase text-accent font-semibold mb-2">
        {kicker}
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl text-ink font-normal tracking-tight leading-[1.05] max-w-4xl mb-3">
        {title} {titleItalic && <em className="italic text-accent">{titleItalic}</em>}
      </h1>

      <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl font-sans mb-6">
        {objective}
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase border border-hairline bg-surface-raised text-ink-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {numbers && numbers.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 border border-hairline rounded-xl p-3 sm:p-4 bg-surface-raised">
          {numbers.map((n) => (
            <div key={n.label} className="border-r last:border-r-0 border-hairline pr-2 last:pr-0">
              <div className="font-serif text-xl sm:text-2xl text-accent-dim leading-none mb-1">
                {n.value}
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-ink-faint leading-tight">
                {n.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
