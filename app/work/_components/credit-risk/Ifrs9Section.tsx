"use client";

import { ProjectDataBadge, TeachingIllustrationBadge, ProjectImplementationBadge, LimitationBadge } from "./Badges";

export default function Ifrs9Section() {
  return (
    <section id="ifrs9" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 04 — IFRS 9 FORWARD-LOOKING ECL
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. INCURRED LOSS VS ECL */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            14. Incurred Loss vs Forward-Looking ECL
          </h2>
          <TeachingIllustrationBadge label="ACCOUNTING FRAMEWORK" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-rose-400 block mb-2">OLD INCURRED-LOSS (IAS 39)</span>
            <p className="text-xs text-ink-muted leading-relaxed">
              Provisioned only after an explicit objective trigger/event had already occurred ("too little, too late").
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-emerald-400 block mb-2">IFRS 9 EXPECTED CREDIT LOSS</span>
            <p className="text-xs text-ink-muted leading-relaxed">
              Forward-looking provision recognized immediately upon origination and updated as credit risk changes.
            </p>
          </div>
        </div>
      </div>

      {/* 2. STAGE 1 / 2 / 3 */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            15. Three-Stage Provisioning Framework
          </h2>
          <ProjectImplementationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* STAGE 1 */}
          <div className="bg-surface-sunken border border-hairline-faint p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400">STAGE 1</span>
                <span className="text-[10px] font-mono text-ink-faint">PERFORMING</span>
              </div>
              <h3 className="text-sm font-semibold text-ink mb-2">No Significant Deterioration</h3>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                Credit risk has not increased significantly since initial recognition.
              </p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded font-mono text-xs font-bold text-emerald-400 text-center">
              12-MONTH ECL
            </div>
          </div>

          {/* STAGE 2 */}
          <div className="bg-surface-sunken border border-hairline-faint p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-amber-400">STAGE 2</span>
                <span className="text-[10px] font-mono text-ink-faint">UNDERPERFORMING</span>
              </div>
              <h3 className="text-sm font-semibold text-ink mb-2">Significant Increase (SICR)</h3>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                Significant increase in credit risk since origination, but not yet defaulted.
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded font-mono text-xs font-bold text-amber-400 text-center">
              LIFETIME ECL
            </div>
          </div>

          {/* STAGE 3 */}
          <div className="bg-surface-sunken border border-hairline-faint p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-rose-400">STAGE 3</span>
                <span className="text-[10px] font-mono text-ink-faint">NON-PERFORMING</span>
              </div>
              <h3 className="text-sm font-semibold text-ink mb-2">Credit Impaired / Defaulted</h3>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                Objective evidence of impairment or contractual default.
              </p>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/30 p-2.5 rounded font-mono text-xs font-bold text-rose-400 text-center">
              LIFETIME ECL
            </div>
          </div>
        </div>

        <div className="bg-accent-glow/20 border border-accent/40 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: Stage 2 = deterioration. Stage 3 = impairment/default.
        </div>
      </div>

      {/* 3. SICR & THE 30-DPD TRAP */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            16. SICR & The 30-DPD Trap
          </h2>
          <TeachingIllustrationBadge label="CRITICAL DISTINCTION" />
        </div>

        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl mb-6">
          <span className="text-xs font-mono font-bold text-rose-400 block mb-1">WARNING: 30 DPD DOES NOT DEFINE SICR</span>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            30 DPD is a <strong>rebuttable backstop presumption</strong> under IFRS 9. Quantitative lifetime PD ratio shifts, rating downgrades, watchlist flags, and forbearance should trigger Stage 2 long before 30 DPD.
          </p>
        </div>

        {/* Project ECL Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono text-ink-muted">TOTAL STAGED EAD</span>
              <ProjectDataBadge label="PROJECT DATA" />
            </div>
            <div className="text-2xl font-mono font-bold text-accent">$1.827B</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono text-ink-muted">TOTAL STAGED ECL</span>
              <ProjectDataBadge label="PROJECT DATA" />
            </div>
            <div className="text-2xl font-mono font-bold text-accent">$278.48M</div>
          </div>
        </div>
      </div>

      {/* 4. LIFETIME SURVIVAL MATH */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            17. Lifetime ECL & Survival Probability Math
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          A borrower can default in Year 2 only if they survive Year 1 without defaulting.
        </p>

        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6">
          <div className="text-xs font-mono font-bold text-accent mb-2">// MARGINAL PD & LIFETIME ECL FORMULAS</div>
          <div className="space-y-2 font-mono text-xs mb-4">
            <div className="bg-surface-raised p-2.5 rounded border border-hairline font-bold text-ink">
              Marginal PD_t = Survival to t × Conditional PD_t
            </div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline font-bold text-ink">
              ECL = Σ ( Marginal PD_t × LGD_t × EAD_t × DF_t )
            </div>
          </div>
        </div>

        {/* 3-Year Worked Survival Table */}
        <div className="bg-surface-sunken border border-hairline-faint rounded-xl overflow-hidden mb-4 font-mono text-xs">
          <div className="p-3 bg-surface-raised text-accent font-bold border-b border-hairline-faint">
            WORKED 3-YEAR SURVIVAL & MARGINAL PD EXAMPLE
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-hairline-faint text-ink-faint">
                <th className="p-3">YEAR</th>
                <th className="p-3">CONDITIONAL PD</th>
                <th className="p-3">SURVIVAL TO YEAR</th>
                <th className="p-3">MARGINAL PD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-faint text-ink-muted">
              <tr>
                <td className="p-3 font-bold text-ink">Year 1</td>
                <td className="p-3">5.0%</td>
                <td className="p-3 font-bold text-accent">100.0%</td>
                <td className="p-3 text-accent font-bold">5.00%</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-ink">Year 2</td>
                <td className="p-3">4.0%</td>
                <td className="p-3 font-bold text-accent">95.0% (100% - 5%)</td>
                <td className="p-3 text-accent font-bold">3.80% (95% × 4%)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-ink">Year 3</td>
                <td className="p-3">3.0%</td>
                <td className="p-3 font-bold text-accent">91.2% (95% - 3.8%)</td>
                <td className="p-3 text-accent font-bold">2.74% (91.2% × 3%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-accent-glow/20 border border-accent/40 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: Conditional PD → Survival → Marginal PD → Loss → Discount → Sum = Lifetime ECL.
        </div>
      </div>

      {/* 5. IFRS 9 LGD VS DOWNTURN LGD */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            18. IFRS 9 LGD vs Downturn LGD
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">IFRS 9 LGD (ACCOUNTING)</span>
            <p className="text-xs text-ink-muted leading-relaxed">
              Forward-looking expected loss severity under baseline or weighted economic scenarios.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-amber-400 block mb-2">DOWNTURN LGD (BASEL IRB)</span>
            <p className="text-xs text-ink-muted leading-relaxed">
              Prudential loss severity estimated under severe economic downturn conditions to calculate capital.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-accent font-semibold bg-surface-sunken p-3 rounded-xl border border-hairline-faint text-center">
          SAME RISK PARAMETER FAMILY, DIFFERENT REGULATORY PURPOSE.
        </div>
      </div>
    </section>
  );
}
