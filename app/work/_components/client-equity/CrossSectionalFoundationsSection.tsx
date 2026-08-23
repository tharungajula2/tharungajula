"use client";

import { ProjectFrameworkBadge, TeachingIllustrationBadge } from "./Badges";

export default function CrossSectionalFoundationsSection() {
  return (
    <section id="foundations" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-indigo-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 01 — CROSS-SECTIONAL LOGIC & HISTORICAL UNIVERSE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. WHAT DOES CROSS-SECTIONAL MEAN */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            01. What Does Cross-Sectional Mean?
          </h2>
          <TeachingIllustrationBadge label="CORE CONCEPT" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Cross-sectional analysis evaluates and compares multiple securities simultaneously at a single point in time (each rebalance date).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">TIME SERIES ANALYSIS</span>
            <p className="text-ink-muted leading-relaxed mb-2">
              Tracks one security or variable across many continuous historical dates.
            </p>
            <div className="text-[10px] text-indigo-400 font-bold">"How did this asset change over time?"</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">CROSS-SECTIONAL ANALYSIS</span>
            <p className="text-ink-muted leading-relaxed mb-2">
              Compares hundreds of securities simultaneously at one specific rebalance date.
            </p>
            <div className="text-[10px] text-indigo-400 font-bold">"Which assets look strongest relative to peers now?"</div>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-400 font-semibold">
          RULE: Time series asks "how did this asset change?" Cross-sectional asks "which assets look strongest relative to others now?"
        </div>
      </div>

      {/* 2. HISTORICAL UNIVERSE & SURVIVORSHIP BIAS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            02. Historical Universe & Survivorship-Bias Control
          </h2>
          <ProjectFrameworkBadge label="CRSP 500 US UNIVERSE" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          To build a valid historical backtest, the system must evaluate only securities that were genuinely investable at each decision date.
        </p>

        <div className="bg-surface-sunken border border-hairline-faint p-5 rounded-xl mb-6 font-mono text-xs">
          <div className="text-indigo-400 font-bold mb-3">// SURVIVORSHIP BIAS CONTRAST</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-raised p-3 rounded border border-rose-500/30">
              <span className="text-rose-400 font-bold block mb-1">TODAY'S SURVIVORS (INVALID)</span>
              <ul className="text-ink-muted text-[11px] space-y-1">
                <li>✓ Stock A (survived)</li>
                <li>✓ Stock B (survived)</li>
                <li>✓ Stock C (survived)</li>
                <li>✗ Ignores historical delistings & bankruptcies</li>
              </ul>
            </div>

            <div className="bg-surface-raised p-3 rounded border border-emerald-500/30">
              <span className="text-emerald-400 font-bold block mb-1">HISTORICAL REALITY (VALID)</span>
              <ul className="text-ink-muted text-[11px] space-y-1">
                <li>✓ Stock A (investable at t)</li>
                <li>✓ Stock B (investable at t)</li>
                <li>✓ Stock D (delisted later, but valid at t)</li>
                <li>✓ Includes full point-in-time constituent list</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-400 font-semibold">
          RULE: Backtest the portfolio you could have owned then — not the winners you can see now.
        </div>
      </div>
    </section>
  );
}
