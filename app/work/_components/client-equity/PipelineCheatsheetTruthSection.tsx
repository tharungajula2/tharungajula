"use client";

import { LimitationBadge } from "./Badges";

const pipelineSteps = [
  "HISTORICAL CRSP UNIVERSE",
  "DATE-CORRECT SECURITIES",
  "PRICES + SECTORS + FUNDAMENTALS",
  "CLIENT-DEFINED SIGNALS",
  "CROSS-SECTIONAL RANKS",
  "WITHIN-SECTOR RANKING",
  "TARGET PORTFOLIO",
  "PREVIOUS HOLDINGS",
  "RANK BUFFER HYSTERESIS",
  "L1 / L2 CVXPY OPTIMISATION",
  "IMPLEMENTED PORTFOLIO",
  "STRATEGY − BENCHMARK RETURN",
  "TRACKING ERROR",
  "INFORMATION RATIO",
  "SHARPE / SORTINO / DRAWDOWN",
  "ROLLING ROBUSTNESS",
  "CAPM / MULTIFACTOR MODEL",
  "SECTOR CONTRIBUTION",
  "4 CORE PYTHON SCRIPTS",
];

const cheatsheetBlocks = [
  {
    category: "CROSS-SECTIONAL",
    items: [
      "compare stocks at same decision date",
      "historical universe must be date-correct",
      "survivorship bias = using only later survivors",
      "CRSP 500 US universe over 10-year span",
    ],
  },
  {
    category: "SIGNAL & SECTOR",
    items: [
      "factor = systematic stock characteristic",
      "filter = eligibility rule (debt/quality)",
      "rank = relative ordering across universe",
      "sector neutral = rank within sectors to prevent macro bets",
    ],
  },
  {
    category: "TURNOVER & OPTIMISATION",
    items: [
      "turnover = fraction of weight traded at rebalance",
      "rank buffer = hysteresis to reduce unnecessary trades",
      "cvxpy = Python convex optimization library",
      "L1 = absolute change penalty, L2 = squared change penalty",
    ],
  },
  {
    category: "BENCHMARK & ROBUSTNESS",
    items: [
      "active return = strategy − benchmark",
      "tracking error = volatility of active return",
      "information ratio = active return / tracking error",
      "CAPM alpha/beta, drawdown & rolling metrics",
    ],
  },
];

export default function PipelineCheatsheetTruthSection() {
  return (
    <section id="pipeline-truth" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-indigo-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 08 — PIPELINE MAP, RECALL CHEATSHEET & TRUTH BOUNDARY
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. 19-STEP PIPELINE MAP */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">
          13. 19-Step Complete System Pipeline Map
        </h2>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Reconstruct the entire Client Equity Framework from historical universe definition to robustness analysis.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step}
              className="bg-surface-sunken border border-hairline-faint hover:border-indigo-500/40 p-3.5 rounded-xl flex items-center gap-3 transition-colors"
            >
              <span className="text-indigo-400 font-bold text-xs shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-ink font-medium uppercase">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. COMPACT RECALL CHEATSHEET */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          14. Compact Memory & Recall Cheatsheet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {cheatsheetBlocks.map((block) => (
            <div key={block.category} className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 tracking-widest block mb-2 uppercase">
                  // {block.category}
                </span>
                <ul className="space-y-1.5 text-ink-muted">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-indigo-400 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TRUTH BOUNDARY */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <LimitationBadge label="TRUTH BOUNDARY" />
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            15. Project Truth & Claim Boundaries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-2">// IMPLEMENTED & SUPPORTED</span>
            <ul className="space-y-1 text-ink-muted">
              <li>✓ Paid client implementation context</li>
              <li>✓ Client-supplied strategy concepts & datasets</li>
              <li>✓ US CRSP 500 universe over 10-year backtest span</li>
              <li>✓ Point-in-time universe & survivorship-bias control</li>
              <li>✓ Prices, sectors, fundamentals & predictions</li>
              <li>✓ Cross-sectional ranking & sector-neutral ranking</li>
              <li>✓ Turnover control & rank buffer hysteresis</li>
              <li>✓ L1 / L2 cvxpy optimization integration</li>
              <li>✓ Benchmark tracking error & Information Ratio framework</li>
              <li>✓ Sharpe, Sortino, Drawdown & rolling metrics suite</li>
              <li>✓ CAPM alpha/beta & multifactor regression suite</li>
              <li>✓ 4 core Python implementation scripts</li>
            </ul>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-amber-500/30">
            <span className="text-amber-300 font-bold block mb-2">// NOT CLAIMED / UNSUPPORTED</span>
            <ul className="space-y-1 text-ink-muted">
              <li>✗ Strategy concept ownership (client-supplied)</li>
              <li>✗ Source dataset ownership (client-supplied)</li>
              <li>✗ No invented headline strategy return or CAGR</li>
              <li>✗ No invented Sharpe, Sortino, or Alpha values</li>
              <li>✗ No invented tracking error or information ratio values</li>
              <li>✗ No invented drawdown or beta values</li>
              <li>✗ No invented portfolio holdings or factor weights</li>
              <li>✗ No claim of live production asset management deployment</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-xs font-mono text-amber-300 font-semibold mt-4 text-center">
          "The source supports the framework mechanics, not a headline performance result. No performance number is inferred."
        </div>
      </div>
    </section>
  );
}
