'use client';

import Link from 'next/link';
import { FIELD_CARDS } from '@/lib/field-cards';

export default function FieldCardsShelf() {
  return (
    <div className="space-y-6">
      {/* SECTION EYEBROW */}
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
          // REFERENCE PACKS
        </h2>
        <span className="text-[11px] font-mono text-ink-faint uppercase tracking-wider">
          {FIELD_CARDS.length} PACKS
        </span>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELD_CARDS.map((pack) => (
          <article
            key={pack.id}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-surface-raised backdrop-blur-2xl border border-hairline hover:border-accent/50 shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent group-hover:via-accent transition-all" />

            <div>
              {/* HEADER META */}
              <div className="flex items-center justify-between gap-3 mb-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-accent font-semibold">
                <span>{pack.packNumber}</span>
                <span className="text-ink-faint font-normal truncate">{pack.subject}</span>
              </div>

              {/* TITLE */}
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink mb-3 group-hover:text-accent transition-colors">
                {pack.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                {pack.description}
              </p>
            </div>

            <div>
              {/* TAGS */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {pack.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-surface-sunken text-ink-muted border border-hairline-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* FOOTER & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-hairline-faint font-mono text-xs gap-2">
                <span className="text-ink-faint text-[11px] uppercase tracking-widest">
                  {pack.cards} CARDS · {pack.missions} MISSIONS
                </span>
                <Link
                  href={pack.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent border border-accent/30 font-bold uppercase tracking-wider text-xs hover:bg-accent hover:text-surface transition-all whitespace-nowrap"
                >
                  Open Pack →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}


