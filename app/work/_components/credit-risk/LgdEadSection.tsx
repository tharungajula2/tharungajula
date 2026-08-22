"use client";

import { ProjectDataBadge, ProjectImplementationBadge, TeachingIllustrationBadge, LimitationBadge } from "./Badges";

export default function LgdEadSection() {
  return (
    <section id="lgd-ead" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 03 — LGD, EAD & EXPECTED LOSS
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. LGD & TWO-STAGE HURDLE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            11. Loss Given Default (LGD) — Two-Stage Hurdle Model
          </h2>
          <ProjectDataBadge label="50,968 DEFAULTS" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          PD asks whether default happens. LGD asks how much of the exposure is lost if default occurs.
        </p>

        {/* LGD Worked Example */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6">
          <div className="text-xs font-mono font-bold text-accent mb-2">// LGD BASIC FORMULA & WORKED EXAMPLE</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs mb-3">
            <div className="p-2.5 bg-surface-raised rounded border border-hairline-faint">
              <span className="text-ink-muted block text-[10px]">EXPOSURE (EAD)</span>
              <span className="text-ink font-bold">£10,000</span>
            </div>
            <div className="p-2.5 bg-surface-raised rounded border border-hairline-faint">
              <span className="text-ink-muted block text-[10px]">RECOVERY</span>
              <span className="text-emerald-400 font-bold">£6,000</span>
            </div>
            <div className="p-2.5 bg-surface-raised rounded border border-hairline-faint">
              <span className="text-ink-muted block text-[10px]">NET LOSS</span>
              <span className="text-rose-400 font-bold">£4,000</span>
            </div>
          </div>
          <div className="text-xs font-mono text-ink bg-surface-raised p-3 rounded border border-hairline font-bold">
            LGD = £4,000 / £10,000 = 40%
          </div>
        </div>

        {/* Two-Stage Hurdle Model */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="text-xs font-mono font-bold text-accent">// TWO-STAGE HURDLE MODEL (50,968 EVER-DEFAULT LOANS)</div>
            <ProjectImplementationBadge />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-surface-raised p-4 rounded-xl border border-hairline-faint">
              <span className="text-xs font-mono font-bold text-accent block mb-1">STAGE 1: RECOVERY OCCURRENCE</span>
              <p className="text-xs text-ink-muted mb-2">Logistic regression predicting probability of any positive recovery.</p>
              <div className="text-xs font-mono font-bold text-ink bg-surface-sunken p-2 rounded">P(Loss &gt; 0)</div>
            </div>
            <div className="bg-surface-raised p-4 rounded-xl border border-hairline-faint">
              <span className="text-xs font-mono font-bold text-accent block mb-1">STAGE 2: SEVERITY AMOUNT</span>
              <p className="text-xs text-ink-muted mb-2">Linear/Beta regression predicting severity given recovery occurred.</p>
              <div className="text-xs font-mono font-bold text-ink bg-surface-sunken p-2 rounded">E(LGD | Loss &gt; 0)</div>
            </div>
          </div>

          <div className="bg-surface-raised p-3 rounded-xl border border-hairline text-center text-xs font-mono font-bold text-accent">
            Expected LGD = P(Loss &gt; 0) × E(LGD | Loss &gt; 0)
          </div>
        </div>
      </div>

      {/* 2. EAD — FIXED TERM VS REVOLVING */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            12. Exposure at Default (EAD)
          </h2>
          <ProjectImplementationBadge label="FIXED-TERM TERM LOANS" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          EAD measures the gross currency exposure expected outstanding at the moment of default.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-accent">// PROJECT IMPLEMENTATION</span>
              <ProjectDataBadge label="LENDINGCLUB" />
            </div>
            <p className="text-xs text-ink-muted leading-relaxed mb-3">
              Fixed-term installment loans. EAD is calculated directly from outstanding principal and expected remaining schedule.
            </p>
            <div className="text-xs font-mono text-ink bg-surface-raised p-2.5 rounded border border-hairline font-bold">
              EAD = Outstanding Principal
            </div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-amber-400">// REVOLVING EXTENSION</span>
              <TeachingIllustrationBadge />
            </div>
            <p className="text-xs text-ink-muted leading-relaxed mb-3">
              For credit cards/lines of credit, Credit Conversion Factor (CCF) estimates drawdowns on unused limits.
            </p>
            <div className="text-xs font-mono text-ink bg-surface-raised p-2.5 rounded border border-hairline font-bold mb-2">
              EAD = Drawn + CCF × Undrawn
            </div>
            <p className="text-[11px] text-ink-muted">Example: £4k drawn + 0.5 × £6k undrawn = £7,000 EAD.</p>
          </div>
        </div>

        <LimitationBadge label="LendingClub is a fixed-term loan book, not a revolving credit-card portfolio." />
      </div>

      {/* 3. EXPECTED LOSS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            13. Expected Loss (EL) Formula & Worked Example
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="bg-surface-sunken border border-accent/30 p-5 rounded-xl mb-6">
          <div className="text-xs font-mono text-accent font-bold mb-2">// CORE EXPECTED LOSS FORMULA</div>
          <div className="text-lg sm:text-xl font-mono text-ink font-bold bg-surface-raised p-4 rounded-xl border border-hairline text-center mb-4">
            EL = PD × LGD × EAD
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-surface-raised rounded-lg border border-hairline-faint text-center">
              <span className="text-accent font-bold block">PD = 5%</span>
              <span className="text-ink-muted text-[10px]">CHANCE OF DEFAULT</span>
            </div>
            <div className="p-3 bg-surface-raised rounded-lg border border-hairline-faint text-center">
              <span className="text-accent font-bold block">LGD = 40%</span>
              <span className="text-ink-muted text-[10px]">SEVERITY IF DEFAULT</span>
            </div>
            <div className="p-3 bg-surface-raised rounded-lg border border-hairline-faint text-center">
              <span className="text-accent font-bold block">EAD = £7,000</span>
              <span className="text-ink-muted text-[10px]">EXPOSURE AMOUNT</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div>
            <span className="text-ink-muted block text-[10px]">CALCULATION</span>
            <span className="text-ink font-bold">0.05 × 0.40 × £7,000</span>
          </div>
          <span className="text-accent font-bold text-base">=</span>
          <div>
            <span className="text-ink-muted block text-[10px]">CURRENCY EXPECTED LOSS</span>
            <span className="text-accent font-bold text-base">£140</span>
          </div>
        </div>
      </div>
    </section>
  );
}
