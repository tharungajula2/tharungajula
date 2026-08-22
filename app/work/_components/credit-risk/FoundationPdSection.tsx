"use client";

import { TeachingIllustrationBadge, ProjectImplementationBadge, ProjectDataBadge } from "./Badges";

export default function FoundationPdSection() {
  return (
    <section id="foundation" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 01 — FOUNDATION & PD MODELLING
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. DEFAULT / NON-DEFAULT */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            01. Default vs Non-Default
          </h2>
          <TeachingIllustrationBadge label="CORE CONCEPT" />
        </div>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          The PD model is a binary classification model. It learns patterns that separate borrowers who default from borrowers who do not.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
            <div className="text-xs font-mono font-bold text-rose-400 mb-1">DEFAULT = 1</div>
            <p className="text-xs text-ink-muted">Borrower charged off, 90+ DPD, or defaulted under contractual definitions.</p>
          </div>
          <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
            <div className="text-xs font-mono font-bold text-emerald-400 mb-1">NON-DEFAULT = 0</div>
            <p className="text-xs text-ink-muted">Borrower fully paid or performing as scheduled throughout the observation window.</p>
          </div>
        </div>

        <div className="bg-surface-sunken border border-accent/20 p-4 rounded-xl mb-6">
          <div className="text-xs font-mono text-accent font-semibold mb-1">PLAIN ENGLISH INTERPRETATION</div>
          <p className="text-xs sm:text-sm text-ink font-mono">
            If PD = 5%, roughly 5 out of 100 similar borrowers are expected to default over the defined horizon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-surface-sunken rounded-lg border border-hairline-faint">
            <span className="text-[10px] font-mono text-accent font-bold uppercase block mb-1">TARGET</span>
            <span className="text-xs text-ink">The binary outcome (1 or 0) the model is trained to predict.</span>
          </div>
          <div className="p-3 bg-surface-sunken rounded-lg border border-hairline-faint">
            <span className="text-[10px] font-mono text-accent font-bold uppercase block mb-1">FEATURE</span>
            <span className="text-xs text-ink">Borrower or loan information (income, DTI, credit history) used for prediction.</span>
          </div>
          <div className="p-3 bg-surface-sunken rounded-lg border border-hairline-faint">
            <span className="text-[10px] font-mono text-accent font-bold uppercase block mb-1">PREDICTION</span>
            <span className="text-xs text-ink">The estimated probability of default (PD) produced by the model.</span>
          </div>
        </div>
      </div>

      {/* 2. DATA & OOT LOGIC */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            02. Data Split & Out-of-Time (OOT) Logic
          </h2>
          <ProjectDataBadge label="2014 OOT VINTAGE" />
        </div>

        {/* Visual Timeline */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6 font-mono text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg w-full text-center">
              <span className="text-blue-400 font-bold block mb-1">2007 – 2013</span>
              <span className="text-ink-muted text-[11px]">DEVELOPMENT & IN-SAMPLE TEST</span>
            </div>
            <span className="text-accent font-bold">|</span>
            <div className="flex-1 bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg w-full text-center">
              <span className="text-amber-400 font-bold block mb-1">2014 VINTAGE</span>
              <span className="text-ink-muted text-[11px]">OUT-OF-TIME (OOT) SAMPLE</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-1">TRAIN</span>
            <p className="text-xs text-ink-muted">Historical sample used to learn binning, Weight of Evidence (WoE) and logistic regression weights.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-1">TEST</span>
            <p className="text-xs text-ink-muted">Unseen holdout sample from the development period to evaluate in-sample model performance.</p>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-amber-400 block mb-1">OOT (2014)</span>
            <p className="text-xs text-ink-muted">Later time period used to test whether the model generalizes across temporal and macroeconomic shifts.</p>
          </div>
        </div>
      </div>

      {/* 3. BINNING & WoE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            03. Binning & Weight of Evidence (WoE)
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Instead of treating every raw numeric value separately, scorecard development groups observations into continuous ranges (bins) with similar risk behaviour.
        </p>

        {/* Binning Example */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2 font-semibold">
            TEACHING ILLUSTRATION — CREDIT UTILISATION BINS
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {["0–20%", "20–40%", "40–60%", "60–80%", "80–100%"].map((b) => (
              <span key={b} className="px-3 py-1.5 rounded bg-surface-raised border border-hairline text-ink">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Memory Box */}
        <div className="bg-accent-glow/20 border border-accent/40 p-3.5 rounded-xl mb-6 text-xs font-mono text-accent font-semibold">
          RULE: Binning = turn raw values into risk-behaviour groups.
        </div>

        {/* WoE Formula & Plain English */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">// FORMULA</span>
            <div className="text-sm font-mono text-ink font-bold bg-surface-raised p-3 rounded border border-hairline mb-3">
              WoE = ln( %Good / %Bad )
            </div>
            <ul className="text-xs text-ink-muted space-y-1 font-mono">
              <li>• %Good = share of non-default observations in the bin</li>
              <li>• %Bad = share of default observations in the bin</li>
              <li>• ln = natural logarithm</li>
            </ul>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">// PLAIN ENGLISH</span>
            <p className="text-xs text-ink-muted leading-relaxed mb-3">
              WoE measures whether a bin contains relatively more good borrowers or bad borrowers compared to the overall portfolio.
            </p>
            <div className="text-xs font-mono text-accent font-semibold bg-surface-raised p-2.5 rounded border border-hairline">
              WoE = risk meaning of one bin.
            </div>
          </div>
        </div>
      </div>

      {/* 4. MONOTONICITY & IV */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            04. Monotonicity & Information Value (IV)
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          After binning and WoE transformation, risk should move in a consistent, logical direction across ordered bins.
        </p>

        {/* Monotonicity Visual Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl">
            <span className="text-xs font-mono font-bold text-emerald-400 block mb-2">GOOD MONOTONIC TREND</span>
            <div className="text-xs font-mono text-ink-muted bg-surface-sunken p-2.5 rounded">
              Low Risk → Medium → High → Very High Risk
            </div>
            <p className="text-[11px] text-emerald-300 mt-2">Smooth risk progression matching credit business intuition.</p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl">
            <span className="text-xs font-mono font-bold text-rose-400 block mb-2">NOISY / NON-MONOTONIC</span>
            <div className="text-xs font-mono text-ink-muted bg-surface-sunken p-2.5 rounded">
              Low Risk → High → Low → Very High → Medium
            </div>
            <p className="text-[11px] text-rose-300 mt-2">Caused by over-binning, small sample size, or noise.</p>
          </div>
        </div>

        {/* IV Formula */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6">
          <div className="text-xs font-mono font-bold text-accent mb-2">// INFORMATION VALUE (IV) FORMULA</div>
          <div className="text-sm font-mono text-ink font-bold bg-surface-raised p-3 rounded border border-hairline mb-3">
            IV = Σ ( %Good − %Bad ) × WoE
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-surface-raised rounded border border-hairline-faint">
              <span className="text-accent font-bold block mb-1">WoE</span>
              <span className="text-ink-muted">Measures risk strength of ONE BIN.</span>
            </div>
            <div className="p-3 bg-surface-raised rounded border border-hairline-faint">
              <span className="text-accent font-bold block mb-1">IV</span>
              <span className="text-ink-muted">Measures total predictive power of WHOLE VARIABLE.</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-sunken p-3 rounded-xl border border-hairline-faint">
          <span className="text-ink-faint">PIPELINE:</span>
          <span className="text-ink">Bin</span>
          <span className="text-accent">→</span>
          <span className="text-ink">WoE</span>
          <span className="text-accent">→</span>
          <span className="text-ink">Check Monotonicity</span>
          <span className="text-accent">→</span>
          <span className="text-ink">IV</span>
          <span className="text-accent">→</span>
          <span className="text-accent font-bold">Candidate Variable</span>
        </div>
      </div>

      {/* 5. LOGISTIC REGRESSION & SIGMOID */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            05. Logistic Regression, Odds & Sigmoid
          </h2>
          <ProjectImplementationBadge label="LOGISTIC REGRESSION" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          How do candidate variables combine into a single default-risk probability?
        </p>

        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6">
          <div className="text-xs font-mono font-bold text-accent mb-2">// LOG-ODDS SCORE (z)</div>
          <div className="text-sm font-mono text-ink font-bold bg-surface-raised p-3 rounded border border-hairline mb-3">
            z = β0 + β1 · X1 + β2 · X2 + ... + βk · Xk
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-ink-muted">
            <div><strong className="text-ink">X:</strong> Model inputs (WoE)</div>
            <div><strong className="text-ink">β:</strong> Learned weights</div>
            <div><strong className="text-ink">β0:</strong> Intercept</div>
            <div><strong className="text-ink">z:</strong> Log-odds score</div>
          </div>
        </div>

        {/* Odds & Sigmoid Conversion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">// ODDS & LOG ODDS</span>
            <p className="text-xs text-ink-muted mb-2">If PD = 20%, Non-default = 80%. Default Odds = 0.20 / 0.80 = 0.25 (1 default per 4 non-defaults).</p>
            <div className="text-xs font-mono text-ink bg-surface-raised p-2.5 rounded border border-hairline font-bold">
              Log Odds = ln( PD / (1 − PD) )
            </div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-accent block mb-2">// SIGMOID FUNCTION</span>
            <p className="text-xs text-ink-muted mb-2">Converts log-odds z back into a bounded probability between 0 and 1.</p>
            <div className="text-xs font-mono text-ink bg-surface-raised p-2.5 rounded border border-hairline font-bold">
              PD = 1 / (1 + e^(−z))
            </div>
          </div>
        </div>

        <div className="bg-accent-glow/20 border border-accent/40 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: Log odds turn probability into an unrestricted real number. Sigmoid turns model output back into 0–1 probability.
        </div>
      </div>

      {/* 6. SCORECARD & PDO */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            06. Scorecard Transformation & PDO
          </h2>
          <ProjectDataBadge label="BASE 600 / PDO 20" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          PD is the mathematical probability. A credit scorecard transforms log odds into a scaled integer score that is easier to use in underwriting operations.
        </p>

        {/* Supported Settings */}
        <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs text-center">
          <div className="bg-surface-sunken p-3 rounded-xl border border-hairline-faint">
            <span className="text-ink-muted block text-[10px]">BASE SCORE</span>
            <span className="text-accent font-bold text-base">600</span>
          </div>
          <div className="bg-surface-sunken p-3 rounded-xl border border-hairline-faint">
            <span className="text-ink-muted block text-[10px]">BASE ODDS</span>
            <span className="text-accent font-bold text-base">50:1</span>
          </div>
          <div className="bg-surface-sunken p-3 rounded-xl border border-hairline-faint">
            <span className="text-ink-muted block text-[10px]">PDO</span>
            <span className="text-accent font-bold text-base">20</span>
          </div>
        </div>

        {/* PDO Table */}
        <div className="bg-surface-sunken border border-hairline-faint rounded-xl overflow-hidden mb-4">
          <div className="text-xs font-mono font-bold text-accent p-3 border-b border-hairline-faint bg-surface-raised">
            PDO (POINTS TO DOUBLE THE ODDS) SCALE TABLE
          </div>
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-hairline-faint text-ink-faint">
                <th className="p-3">GOOD ODDS</th>
                <th className="p-3">CREDIT SCORE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-faint text-ink-muted">
              <tr><td className="p-3">50 : 1</td><td className="p-3 text-accent font-bold">600</td></tr>
              <tr><td className="p-3">100 : 1</td><td className="p-3 text-accent font-bold">620</td></tr>
              <tr><td className="p-3">200 : 1</td><td className="p-3 text-accent font-bold">640</td></tr>
              <tr><td className="p-3">400 : 1</td><td className="p-3 text-accent font-bold">660</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
