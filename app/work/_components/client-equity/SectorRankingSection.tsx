"use client";

import { ProjectFrameworkBadge, TeachingIllustrationBadge } from "./Badges";

export default function SectorRankingSection() {
  return (
    <section id="sector-ranking" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-indigo-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 03 — SECTOR NEUTRALISATION & WITHIN-SECTOR RANKING
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. SECTOR NEUTRALISATION CONCEPT */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            05. Sector Neutralisation & Within-Sector Ranking
          </h2>
          <ProjectFrameworkBadge label="SECTOR BET CONTROL" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Global rankings without sector controls can accidentally create massive, unintended macro sector bets instead of pure stock selection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          {/* Unconstrained Bet */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-rose-500/30">
            <span className="text-rose-400 font-bold block mb-2">GLOBAL RANKING (UNCONSTRAINED)</span>
            <div className="bg-surface-raised p-3 rounded border border-hairline mb-2">
              <span className="text-rose-400 font-bold">100% Concentrated in Tech</span>
            </div>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              If Technology stocks have higher raw signals, the top portfolio becomes an accidental macro Tech bet rather than alpha stock selection.
            </p>
          </div>

          {/* Sector Neutral */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-2">SECTOR-NEUTRAL RANKING</span>
            <div className="bg-surface-raised p-3 rounded border border-hairline mb-2 text-ink">
              <div className="flex justify-between text-[11px]">
                <span>Banks: Rank Banks vs Banks</span>
                <span>Tech: Tech vs Tech</span>
              </div>
            </div>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              Ranks stocks within their respective sector peer groups, isolating pure stock-selection skill from broad sector movements.
            </p>
          </div>
        </div>

        {/* Visual Sector Groups */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs mb-6 text-center">
          <div className="bg-surface-sunken p-3 rounded-lg border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">FINANCIALS</span>
            <span className="text-ink-muted text-[10px]">Rank Bank A vs Bank B</span>
          </div>
          <div className="bg-surface-sunken p-3 rounded-lg border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">TECHNOLOGY</span>
            <span className="text-ink-muted text-[10px]">Rank Tech A vs Tech B</span>
          </div>
          <div className="bg-surface-sunken p-3 rounded-lg border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">HEALTHCARE</span>
            <span className="text-ink-muted text-[10px]">Rank Health A vs Health B</span>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-400 font-semibold">
          RULE: Sector neutralisation separates stock-selection signal from broad sector exposure.
        </div>
      </div>
    </section>
  );
}
