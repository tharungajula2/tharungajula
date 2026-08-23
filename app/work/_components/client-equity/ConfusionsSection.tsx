"use client";

import { TeachingIllustrationBadge } from "./Badges";

const commonConfusions = [
  { term: "TIME SERIES VS CROSS-SECTIONAL", desc: "Time series tracks one asset through time; cross-sectional compares many assets at one date." },
  { term: "FACTOR VS SIGNAL", desc: "Factor is an underlying characteristic; signal is the quantified score used for ranking/selection." },
  { term: "FILTER VS RANK", desc: "Filter eliminates ineligible stocks based on rules; rank orders the surviving eligible universe." },
  { term: "RANK VS WEIGHT", desc: "Rank decides relative preference; weight decides capital allocation fraction." },
  { term: "SECTOR NEUTRAL VS NO SECTORS", desc: "Sector neutralisation controls macro sector bets; it does NOT mean the portfolio holds no sectors." },
  { term: "TURNOVER VS VOLATILITY", desc: "Turnover measures rebalance trading activity; volatility measures variability of returns." },
  { term: "VOLATILITY VS TRACKING ERROR", desc: "Volatility is absolute portfolio risk; tracking error is benchmark-relative active risk." },
  { term: "SHARPE VS INFORMATION RATIO", desc: "Sharpe uses total volatility risk; Information Ratio uses active return and active risk." },
  { term: "ALPHA VS ACTIVE RETURN", desc: "Active return is raw realised difference; alpha is regression intercept after factor controls." },
  { term: "L1 VS L2 OPTIMISATION", desc: "L1 penalises absolute weight change; L2 penalises squared weight change." },
  { term: "BACKTEST VS LIVE PERFORMANCE", desc: "Historical backtest framework demonstrates methodology rigor, NOT guaranteed future performance." },
];

export default function ConfusionsSection() {
  return (
    <section id="confusions" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-indigo-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 07 — ELEVEN COMMON EQUITY CONFUSIONS CLARIFIED
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            12. Eleven Common Cross-Sectional Equity Confusions
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {commonConfusions.map((c) => (
            <div key={c.term} className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
              <span className="text-xs font-bold text-indigo-400 block mb-1 uppercase">// {c.term}</span>
              <p className="text-ink-muted leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
