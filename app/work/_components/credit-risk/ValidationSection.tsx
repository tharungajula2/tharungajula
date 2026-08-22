"use client";

import { ProjectDataBadge, TeachingIllustrationBadge } from "./Badges";

export default function ValidationSection() {
  return (
    <section id="validation" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 02 — MODEL VALIDATION & DIAGNOSTICS
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 3 CORE QUESTIONS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          07. The Three Core Validation Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-1">1. DISCRIMINATION</span>
            <p className="text-xs text-ink-muted mb-3">Can the model rank risky borrowers above safe borrowers?</p>
            <div className="text-[10px] font-mono text-accent font-semibold">METRICS: AUC, Gini, KS</div>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-1">2. CALIBRATION</span>
            <p className="text-xs text-ink-muted mb-3">Are the estimated default probabilities mathematically accurate?</p>
            <div className="text-[10px] font-mono text-accent font-semibold">METRICS: Brier, Hosmer–Lemeshow</div>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-1">3. STABILITY</span>
            <p className="text-xs text-ink-muted mb-3">Has the borrower population or feature distribution shifted over time?</p>
            <div className="text-[10px] font-mono text-accent font-semibold">METRICS: PSI, CSI</div>
          </div>
        </div>
      </div>

      {/* DISCRIMINATION: AUC, GINI, KS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            08. Discrimination — ROC, AUC, Gini & KS
          </h2>
          <ProjectDataBadge label="OOT GINI 0.3845" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono text-ink-muted block mb-1">OOT AUC</span>
            <div className="text-xl font-mono font-bold text-accent">~ 0.6920</div>
            <p className="text-[11px] text-ink-muted mt-1">Chance a random defaulter ranks riskier than a non-defaulter.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono text-ink-muted block mb-1">OOT GINI (2×AUC - 1)</span>
            <div className="text-xl font-mono font-bold text-accent">~ 0.3845</div>
            <p className="text-[11px] text-ink-muted mt-1">Out-of-time Gini (vs 0.368 on development sample).</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono text-ink-muted block mb-1">MAX KS STATISTIC</span>
            <div className="text-xl font-mono font-bold text-accent">~ 0.2843</div>
            <p className="text-[11px] text-ink-muted mt-1">Maximum separation between cumulative good and bad score distributions.</p>
          </div>
        </div>

        <div className="bg-accent-glow/20 border border-accent/40 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: AUC, Gini and KS measure ranking power — NOT probability accuracy.
        </div>
      </div>

      {/* CONFUSION MATRIX & PRECISION / RECALL */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            09. Confusion Matrix, Precision & Recall
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          A single decision threshold converts probabilities into binary approve/decline decisions, producing a 2×2 confusion matrix.
        </p>

        {/* 2x2 Matrix */}
        <div className="bg-surface-sunken border border-hairline-faint rounded-xl overflow-hidden mb-6">
          <div className="text-xs font-mono font-bold text-accent p-3 border-b border-hairline-faint bg-surface-raised">
            CONFUSION MATRIX STRUCTURE
          </div>
          <div className="grid grid-cols-2 text-xs font-mono border-b border-hairline-faint text-center">
            <div className="p-3 border-r border-hairline-faint font-bold text-rose-400 bg-rose-500/10">ACTUAL DEFAULT (1)</div>
            <div className="p-3 font-bold text-emerald-400 bg-emerald-500/10">ACTUAL GOOD (0)</div>
          </div>
          <div className="grid grid-cols-2 text-xs font-mono">
            <div className="p-4 border-r border-b border-hairline-faint bg-surface-raised">
              <span className="text-accent font-bold block mb-1">TRUE POSITIVE (TP)</span>
              <p className="text-ink-muted text-[11px]">Predicted default, actually defaulted. Correctly caught loss.</p>
            </div>
            <div className="p-4 border-b border-hairline-faint">
              <span className="text-amber-400 font-bold block mb-1">FALSE POSITIVE (FP)</span>
              <p className="text-ink-muted text-[11px]">Predicted default, actually good. Rejected good business.</p>
            </div>
            <div className="p-4 border-r border-hairline-faint">
              <span className="text-rose-400 font-bold block mb-1">FALSE NEGATIVE (FN)</span>
              <p className="text-ink-muted text-[11px]">Predicted good, actually defaulted. Uncaught credit loss.</p>
            </div>
            <div className="p-4 bg-surface-raised">
              <span className="text-emerald-400 font-bold block mb-1">TRUE NEGATIVE (TN)</span>
              <p className="text-ink-muted text-[11px]">Predicted good, actually good. Healthy booking.</p>
            </div>
          </div>
        </div>

        {/* Formulas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-1">RECALL (SENSITIVITY)</span>
            <div className="text-sm font-mono text-ink font-bold bg-surface-raised p-2.5 rounded border border-hairline mb-2">
              Recall = TP / (TP + FN)
            </div>
            <p className="text-xs text-ink-muted">Of all actual defaults, how many did the model flag?</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-1">PRECISION</span>
            <div className="text-sm font-mono text-ink font-bold bg-surface-raised p-2.5 rounded border border-hairline mb-2">
              Precision = TP / (TP + FP)
            </div>
            <p className="text-xs text-ink-muted">Of all borrowers flagged as risky, how many actually defaulted?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-surface-sunken p-3 rounded-lg border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">ONE THRESHOLD</span>
            <span className="text-ink-muted">Produces ONE Confusion Matrix, Precision, and Recall.</span>
          </div>
          <div className="bg-surface-sunken p-3 rounded-lg border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">ALL THRESHOLDS</span>
            <span className="text-ink-muted">Produces ROC Curve and AUC.</span>
          </div>
        </div>
      </div>

      {/* CALIBRATION & STABILITY */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            10. Calibration & Population Stability (PSI / CSI)
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">// CALIBRATION (BRIER & H-L)</span>
            <p className="text-xs text-ink-muted leading-relaxed mb-3">
              Discrimination asks who is riskier. Calibration asks whether a 5% predicted PD actually produces 5% defaults in reality.
            </p>
            <div className="text-xs font-mono text-ink bg-surface-raised p-2.5 rounded border border-hairline font-bold mb-2">
              Brier = Avg((Predicted PD − Actual Outcome)²)
            </div>
            <p className="text-[11px] text-ink-muted">Hosmer–Lemeshow compares predicted defaults vs observed defaults across deciles.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">// STABILITY (PSI & CSI)</span>
            <div className="space-y-3 text-xs">
              <div className="bg-surface-raised p-2.5 rounded border border-hairline font-mono">
                <strong className="text-accent">PSI (Population Stability Index):</strong> Checks overall score distribution shift between development and OOT sample.
              </div>
              <div className="bg-surface-raised p-2.5 rounded border border-hairline font-mono">
                <strong className="text-accent">CSI (Characteristic Stability Index):</strong> Checks feature-level shift for individual inputs.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent-glow/20 border border-accent/40 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: PSI = overall population shift. CSI = feature-level shift.
        </div>
      </div>
    </section>
  );
}
