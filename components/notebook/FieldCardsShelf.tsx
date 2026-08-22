'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FIELD_CARDS } from '@/lib/field-cards';

export default function FieldCardsShelf() {
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    // Persisted Reading Progress state for cards
    try {
      const progressMap: Record<string, number> = {};
      FIELD_CARDS.forEach((pack) => {
        const saved = localStorage.getItem(`fieldcards:progress:${pack.id}`);
        if (saved !== null) {
          const val = parseInt(saved, 10);
          if (!isNaN(val)) {
            progressMap[pack.id] = Math.max(0, Math.min(val, pack.missions));
          }
        }
      });
      setUserProgress(progressMap);
    } catch {}
  }, []);

  const updateProgress = (id: string, maxMissions: number, delta: number) => {
    setUserProgress((prev) => {
      const current = prev[id] ?? (FIELD_CARDS.find((p) => p.id === id)?.focus?.missionsDone ?? 0);
      const nextVal = Math.max(0, Math.min(current + delta, maxMissions));
      try {
        localStorage.setItem(`fieldcards:progress:${id}`, String(nextVal));
      } catch {}
      return { ...prev, [id]: nextVal };
    });
  };

  return (
    <div className="space-y-6">
      {/* SECTION EYEBROW */}
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse motion-reduce:animate-none inline-block" />
          ● ACTIVE ROTATION — REFERENCE PACKS
        </h2>
        <span className="text-[11px] font-mono text-ink-faint uppercase tracking-wider">
          {FIELD_CARDS.length} REFERENCE PACKS
        </span>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELD_CARDS.map((pack) => {
          const missionsDone = isHydrated && userProgress[pack.id] !== undefined
            ? userProgress[pack.id]
            : (pack.focus?.missionsDone ?? 0);
          
          const progressPercent = pack.missions > 0
            ? Math.min(100, Math.round((missionsDone / pack.missions) * 100))
            : 0;

          return (
            <article
              key={pack.id}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0B0D0F] text-slate-100 border border-slate-800/80 shadow-2xl hover:border-[#22D3EE]/60 transition-all duration-300 motion-reduce:transition-none overflow-hidden"
              style={{ colorScheme: 'dark' }}
            >
              {/* Cyan Top Border Shimmer / Inner Glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#22D3EE]/60 to-transparent group-hover:via-[#22D3EE] transition-all motion-reduce:transition-none" />

              <div>
                {/* HEADER META BAR */}
                <div className="flex items-center justify-between gap-3 mb-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                  <span className="whitespace-nowrap flex-shrink-0 text-[#22D3EE] font-semibold">
                    {pack.packNumber}
                  </span>
                  <span className="text-slate-400 font-normal whitespace-nowrap truncate text-right">
                    {pack.subject}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2 leading-snug group-hover:text-[#22D3EE] transition-colors motion-reduce:transition-none">
                  {pack.title}
                </h3>

                {/* FOCUS NOTE (First-person aside) */}
                {pack.focus?.note && (
                  <div className="mb-4 p-3 rounded-lg bg-slate-900/80 border-l-2 border-[#22D3EE]/70 text-xs sm:text-sm font-sans italic text-slate-300 leading-relaxed opacity-95">
                    "{pack.focus.note}"
                  </div>
                )}

                {/* DESCRIPTION */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans opacity-90">
                  {pack.description}
                </p>
              </div>

              <div>
                {/* PROGRESS & LIVE CHIP BAR */}
                <div className="mb-6 p-3 sm:p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#22D3EE] font-bold text-[11px] uppercase tracking-wider">
                        {missionsDone}/{pack.missions} MISSIONS
                      </span>
                      {/* STEPPER CONTROLS */}
                      <div className="inline-flex items-center gap-1 bg-slate-900 rounded border border-slate-800 px-1 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateProgress(pack.id, pack.missions, -1)}
                          disabled={missionsDone <= 0}
                          aria-label={`Decrease completed missions for ${pack.title}`}
                          className="w-4.5 h-4.5 rounded text-[11px] font-mono leading-none flex items-center justify-center bg-slate-800 text-slate-300 hover:bg-[#22D3EE] hover:text-black disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-300 transition-colors cursor-pointer"
                        >
                          −
                        </button>
                        <button
                          type="button"
                          onClick={() => updateProgress(pack.id, pack.missions, 1)}
                          disabled={missionsDone >= pack.missions}
                          aria-label={`Increase completed missions for ${pack.title}`}
                          className="w-4.5 h-4.5 rounded text-[11px] font-mono leading-none flex items-center justify-center bg-slate-800 text-slate-300 hover:bg-[#22D3EE] hover:text-black disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-300 transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* LIVE CHIP */}
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9.5px] font-mono tracking-widest uppercase bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse motion-reduce:animate-none" />
                      ACTIVE
                    </span>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-[#22D3EE] h-full rounded-full transition-all duration-300 motion-reduce:transition-none"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

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
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 font-mono text-xs gap-2">
                  <span className="text-slate-400 text-[11px] uppercase tracking-widest whitespace-nowrap">
                    {pack.cards} CARDS · {pack.missions} MISSIONS
                  </span>
                  <Link
                    href={pack.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E0A73E]/10 text-[#E0A73E] border border-[#E0A73E]/30 font-bold uppercase tracking-wider text-xs hover:bg-[#E0A73E] hover:text-black transition-all motion-reduce:transition-none whitespace-nowrap flex-shrink-0"
                  >
                    Open Pack →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

