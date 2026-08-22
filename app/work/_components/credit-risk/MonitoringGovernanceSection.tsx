"use client";

import { TeachingIllustrationBadge, ProjectImplementationBadge, LimitationBadge } from "./Badges";

export default function MonitoringGovernanceSection() {
  return (
    <section id="governance" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 06 — PORTFOLIO MONITORING, GOVERNANCE & LINEAGE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. PORTFOLIO MONITORING & ROLL RATES */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            22. Portfolio Monitoring & Roll Rate Dynamics
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-3 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">VINTAGE ANALYSIS</span>
            <span className="text-ink-muted">Tracking delinquency performance by origination cohort over time.</span>
          </div>
          <div className="bg-surface-sunken p-3 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">MOB (MONTHS ON BOOK)</span>
            <span className="text-ink-muted">Standardizing loan performance age across cohorts.</span>
          </div>
          <div className="bg-surface-sunken p-3 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">DELINQUENCY BUCKETS</span>
            <span className="text-ink-muted">Current, 30 DPD, 60 DPD, 90+ DPD distribution tracking.</span>
          </div>
          <div className="bg-surface-sunken p-3 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">PSI / CSI DRIFT</span>
            <span className="text-ink-muted">Ongoing monitoring of score and feature population shifts.</span>
          </div>
        </div>

        {/* Roll Rate Example */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6">
          <div className="text-xs font-mono font-bold text-accent mb-2">// ROLL RATE & TRANSITION MATRIX CONCEPT</div>
          <p className="text-xs text-ink-muted mb-3">
            If 100 loans are at 30 DPD, and 20 move to 60 DPD next month, the 30 → 60 Roll Rate is 20%.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-raised p-3 rounded-lg border border-hairline">
            <span className="text-emerald-400 font-bold">CURRENT</span>
            <span className="text-accent">→</span>
            <span className="text-amber-400 font-bold">30 DPD</span>
            <span className="text-accent">→</span>
            <span className="text-orange-400 font-bold">60 DPD</span>
            <span className="text-accent">→</span>
            <span className="text-rose-400 font-bold">90+ DPD / DEFAULT</span>
          </div>
        </div>

        {/* Dataset Limitation */}
        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <LimitationBadge label="DATASET LIMITATION" />
            <span className="text-xs font-mono font-bold text-rose-400">SINGLE SNAPSHOT PER LOAN</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            The LendingClub dataset is a single cross-sectional snapshot per loan, not a multi-period monthly account panel. The project supports cross-sectional delinquency proxies, but cannot construct true monthly DPD roll-rate transition matrices.
          </p>
        </div>
      </div>

      {/* 2. MODEL GOVERNANCE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            23. Model Governance & Lifecycle
          </h2>
          <ProjectImplementationBadge />
        </div>

        {/* Lifecycle Flow */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6">
          <div className="text-xs font-mono font-bold text-accent mb-3">// MODEL GOVERNANCE LIFECYCLE</div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
            {["Developer", "Model Owner", "Independent Validation", "Governance Committee", "Monitoring", "Audit"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-2">
                <span className="bg-surface-raised px-2.5 py-1 rounded border border-hairline text-ink">{s}</span>
                {i < arr.length - 1 && <span className="text-accent">→</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs font-mono">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">DEVELOPMENT</span>
            <span className="text-ink-muted">Builds, bins, fits, and documents model methodology.</span>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">INDEPENDENT VALIDATION</span>
            <span className="text-ink-muted">Independently challenges assumptions, code, and limitations.</span>
          </div>
        </div>

        <div className="bg-accent-glow/20 border border-accent/40 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          DOCUMENTATION: WHY → DATA → METHOD → RESULT → LIMITATIONS → CONTROLS
        </div>
      </div>

      {/* 3. DATA LINEAGE & BCBS 239 */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            24. Data Lineage, BCBS 239 & ICAAP / ILAAP
          </h2>
          <ProjectImplementationBadge />
        </div>

        {/* Concrete Lineage Flow */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6">
          <div className="text-xs font-mono font-bold text-accent mb-3">// CONCRETE END-TO-END DATA LINEAGE</div>
          <div className="space-y-2 text-xs font-mono">
            <div className="bg-surface-raised p-2.5 rounded border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-accent font-bold">1. Credit Monitoring</span>
              <span className="text-ink-muted">watchlist_status + effective date</span>
            </div>
            <div className="text-center text-accent text-xs">↓</div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-accent font-bold">2. Risk Warehouse</span>
              <span className="text-ink-muted">reporting-date record</span>
            </div>
            <div className="text-center text-accent text-xs">↓</div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-accent font-bold">3. Staging Rule</span>
              <span className="text-ink-muted">QUAL_SICR evaluation</span>
            </div>
            <div className="text-center text-accent text-xs">↓</div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-accent font-bold">4. IFRS 9 Engine</span>
              <span className="text-ink-muted">Stage 2 → Lifetime ECL</span>
            </div>
            <div className="text-center text-accent text-xs">↓</div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-accent font-bold">5. Finance / Reporting</span>
              <span className="text-ink-muted">stage + reason + ECL output</span>
            </div>
          </div>
        </div>

        {/* BCBS 239 & ICAAP / ILAAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">// BCBS 239 (2 + 4 + 5 + 3)</span>
            <ul className="text-xs font-mono text-ink-muted space-y-1">
              <li>• <strong>2</strong> Governance & Infrastructure principles</li>
              <li>• <strong>4</strong> Data Aggregation principles</li>
              <li>• <strong>5</strong> Risk Reporting principles</li>
              <li>• <strong>3</strong> Supervisory Review principles</li>
            </ul>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">// ICAAP VS ILAAP</span>
            <div className="space-y-2 text-xs font-mono">
              <div className="bg-surface-raised p-2 rounded border border-hairline">
                <strong className="text-accent">ICAAP:</strong> Internal Capital Adequacy Assessment Process (Capital).
              </div>
              <div className="bg-surface-raised p-2 rounded border border-hairline">
                <strong className="text-amber-400">ILAAP:</strong> Internal Liquidity Adequacy Assessment Process (Liquidity).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
