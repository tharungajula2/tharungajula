'use client';

import Link from 'next/link';
import { FIELD_CARDS, FieldCard } from '@/lib/field-cards';

export default function FieldCardsShelf() {
  const cards: FieldCard[] = FIELD_CARDS;

  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          FIELD CARDS ({cards.length} PACKS)
        </h2>
        <span className="text-[11px] font-mono text-ink-faint uppercase tracking-wider">
          Artifact Previews
        </span>
      </div>

      {/* PACK TILES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((pack) => (
          <article
            key={pack.id}
            className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0B0D0F] text-slate-100 border border-slate-800/80 shadow-2xl hover:border-[#E0A73E]/60 transition-all duration-300 overflow-hidden"
            style={{ colorScheme: 'dark' }}
          >
            {/* Subtle Gold Accent Top Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E0A73E]/40 to-transparent group-hover:via-[#E0A73E] transition-all" />

            <div>
              {/* HEADER META BAR */}
              <div className="flex items-center justify-between gap-2 mb-4 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#E0A73E]">
                <span>{pack.packNumber}</span>
                <span className="text-slate-400 font-normal">{pack.subject}</span>
              </div>

              {/* TITLE */}
              <h3
                className="text-2xl sm:text-3xl font-serif tracking-tight text-white mb-3 leading-snug group-hover:text-[#E0A73E] transition-colors"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                {pack.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-serif opacity-90">
                {pack.description}
              </p>
            </div>

            <div>
              {/* TAGS */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {pack.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CARD FOOTER META & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 font-mono text-xs">
                <span className="text-slate-400 text-[11px] uppercase tracking-widest">
                  {pack.cards} CARDS · {pack.missions} MISSIONS
                </span>
                <Link
                  href={pack.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E0A73E]/10 text-[#E0A73E] border border-[#E0A73E]/30 font-bold uppercase tracking-wider text-xs hover:bg-[#E0A73E] hover:text-black transition-all"
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
