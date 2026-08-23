"use client";

import { ProjectDataBadge, TeachingIllustrationBadge } from "./Badges";

export default function SarimaSection() {
  return (
    <section id="sarima" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-rose-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 03 — AR/MA COMPONENTS, SARIMA NOTATION & AIC
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. AR, I, MA PIECES */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            07. AR, I, and MA Building Blocks
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">AR (AUTOREGRESSIVE)</span>
            <p className="text-ink-muted leading-relaxed">Uses past values of the series (lagged y) to explain current level.</p>
            <div className="text-[10px] text-rose-400 font-bold mt-2">Remembers values.</div>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">I (INTEGRATED)</span>
            <p className="text-ink-muted leading-relaxed">Order of differencing (d, D) required to achieve stationarity.</p>
            <div className="text-[10px] text-rose-400 font-bold mt-2">Removes trend/season.</div>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">MA (MOVING AVERAGE)</span>
            <p className="text-ink-muted leading-relaxed">Uses past forecast errors/shocks (lagged residuals) to adjust prediction.</p>
            <div className="text-[10px] text-rose-400 font-bold mt-2">Remembers shocks/errors.</div>
          </div>
        </div>

        <div className="bg-rose-500/20 border border-rose-500/40 p-3.5 rounded-xl text-xs font-mono text-rose-400 font-semibold">
          RULE: AR remembers past values. MA remembers past shocks/errors (NOT a rolling average chart line).
        </div>
      </div>

      {/* 2. SARIMA NOTATION & 625 CANDIDATE SEARCH */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            08. SARIMA Notation & 625 Candidate Grid Search
          </h2>
          <ProjectDataBadge label="625 CANDIDATE MODELS" />
        </div>

        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6 font-mono text-xs">
          <div className="text-rose-400 font-bold mb-2">// GENERAL SARIMA FORMULA</div>
          <div className="text-base font-bold text-ink bg-surface-raised p-3 rounded border border-hairline text-center mb-3">
            SARIMA(p, d, q) × (P, D, Q)ₘ
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-ink-muted text-[11px]">
            <div><strong className="text-ink">Non-Seasonal (p, d, q):</strong> Short-term dynamics</div>
            <div><strong className="text-ink">Seasonal (P, D, Q):</strong> Lag-m annual dynamics</div>
            <div><strong className="text-ink">m = 12:</strong> Annual frequency for monthly series</div>
          </div>
        </div>

        {/* AIC Formula */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6 font-mono text-xs">
          <div className="text-rose-400 font-bold mb-2">// AKAIKE INFORMATION CRITERION (AIC)</div>
          <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2 text-center">
            AIC = 2k − 2 ln(L)
          </div>
          <p className="text-ink-muted text-[11px]">
            k = estimated parameters, L = model likelihood. AIC penalises unnecessary complexity. Lower AIC is preferred.
          </p>
        </div>
      </div>

      {/* 3. SELECTED MODEL */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            09. Selected Model — SARIMA(2,1,3)(1,1,3)₁₂
          </h2>
          <ProjectDataBadge label="SELECTED MODEL" />
        </div>

        <div className="bg-surface-sunken border border-rose-500/40 p-5 rounded-xl text-center font-mono text-xs mb-4">
          <div className="text-rose-400 text-[10px] uppercase font-bold mb-1">OPTIMAL MODEL SELECTION</div>
          <div className="text-2xl font-bold text-ink mb-4">SARIMA(2,1,3)(1,1,3)₁₂</div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="bg-surface-raised p-2.5 rounded border border-hairline">
              <span className="text-rose-400 font-bold block">p = 2</span>
              <span className="text-ink-muted text-[10px]">2 Non-Seasonal AR terms</span>
            </div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline">
              <span className="text-rose-400 font-bold block">d = 1, D = 1</span>
              <span className="text-ink-muted text-[10px]">1 Regular & 1 Seasonal Diff</span>
            </div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline">
              <span className="text-rose-400 font-bold block">q = 3</span>
              <span className="text-ink-muted text-[10px]">3 Non-Seasonal MA terms</span>
            </div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline">
              <span className="text-rose-400 font-bold block">P = 1, Q = 3</span>
              <span className="text-ink-muted text-[10px]">1 Seasonal AR & 3 MA (m=12)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
