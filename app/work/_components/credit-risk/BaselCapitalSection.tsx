"use client";

import { ProjectDataBadge, TeachingIllustrationBadge, LimitationBadge } from "./Badges";

export default function BaselCapitalSection() {
  return (
    <section id="capital" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 05 — BASEL III REGULATORY CAPITAL & RWA
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. CONCEPTUAL BREAK: ECL VS CAPITAL */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            19. Expected Loss (IFRS 9) vs Capital (Basel)
          </h2>
          <TeachingIllustrationBadge label="CONCEPTUAL BOUNDARY" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">EXPECTED LOSS (ACCOUNTING)</span>
            <p className="text-xs text-ink-muted leading-relaxed">
              "What loss do we expect to happen under normal or forecast conditions?" Covered by accounting provisions.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-amber-400 block mb-2">UNEXPECTED LOSS & CAPITAL (BASEL)</span>
            <p className="text-xs text-ink-muted leading-relaxed">
              "How much capital must we hold to absorb extreme, tail-risk losses beyond expected loss?" Covered by capital equity.
            </p>
          </div>
        </div>
      </div>

      {/* 2. STANDARDISED VS ADVANCED IRB */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            20. Standardised Approach vs Advanced IRB
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">STANDARDISED APPROACH (SA)</span>
            <div className="text-xs font-mono text-ink bg-surface-raised p-2.5 rounded border border-hairline font-bold mb-2">
              RWA = Exposure × Regulatory Risk Weight
            </div>
            <p className="text-xs text-ink-muted">Fixed regulatory risk weights applied by asset class without internal rating models.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">ADVANCED IRB (A-IRB)</span>
            <div className="text-xs font-mono text-ink bg-surface-raised p-2.5 rounded border border-hairline font-bold mb-2">
              RWA = 12.5 × K(PD, LGD, EAD, M) × EAD
            </div>
            <p className="text-xs text-ink-muted">Bank estimates internal PD, LGD, and EAD inputs into the regulatory Vasicek capital formula K.</p>
          </div>
        </div>

        <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint font-mono text-xs text-accent font-semibold text-center mb-4">
          Minimum Pillar 1 Capital = 8% × RWA
        </div>

        <div className="bg-accent-glow/20 border border-accent/40 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: The bank estimates approved inputs (PD, LGD, EAD). The regulator prescribes the capital function framework.
        </div>
      </div>

      {/* 3. PROJECT CAPITAL RESULTS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            21. Project IRB Capital & Stress Results
          </h2>
          <ProjectDataBadge label="BASEL III IRB RESULTS" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono text-ink-muted block mb-1">IRB RWA</span>
            <div className="text-xl font-mono font-bold text-accent">$2.295B</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono text-ink-muted block mb-1">PORTFOLIO RISK WEIGHT</span>
            <div className="text-xl font-mono font-bold text-accent">125.63%</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono text-ink-muted block mb-1">DOWNTURN-LGD STRESS RWA</span>
            <div className="text-xl font-mono font-bold text-accent">$2.454B</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono text-ink-muted block mb-1">STRESS DELTA</span>
            <div className="text-xl font-mono font-bold text-emerald-400">+$159M</div>
          </div>
        </div>

        <LimitationBadge label="This demonstrates IRB methodology on public project data. It does not represent regulatory IRB approval of the model." />
      </div>
    </section>
  );
}
