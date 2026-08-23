"use client";

import { ProjectValidationBadge, TeachingIllustrationBadge } from "./Badges";

export default function DiagnosticsSection() {
  return (
    <section id="diagnostics" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-rose-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 04 — RESIDUAL DIAGNOSTICS & LJUNG–BOX TESTING
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. WHAT DOES THE MODEL DO */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            10. What Does the SARIMA Model Actually Do?
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          The fitted SARIMA model predicts current prescription demand by combining short-term momentum, error correction, regular differencing, and annual seasonal lag relationships.
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint text-center">
          <span className="text-ink font-bold">PAST VALUES</span>
          <span className="text-rose-400">+</span>
          <span className="text-ink font-bold">PAST ERRORS</span>
          <span className="text-rose-400">+</span>
          <span className="text-ink font-bold">DIFFERENCED LEVEL</span>
          <span className="text-rose-400">+</span>
          <span className="text-ink font-bold">SEASONAL LAGS (m=12)</span>
          <span className="text-rose-400 font-bold">→</span>
          <span className="text-rose-400 font-bold bg-surface-raised px-2.5 py-1 rounded border border-rose-500/30">FUTURE FORECAST</span>
        </div>
      </div>

      {/* 2. RESIDUALS & LJUNG-BOX */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            11. Residual Diagnostics & Ljung–Box Test
          </h2>
          <ProjectValidationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-2">// RESIDUAL FORMULA</span>
            <div className="text-sm font-bold text-ink bg-surface-raised p-2.5 rounded border border-hairline mb-2">
              Residual = Actual − Forecast
            </div>
            <p className="text-ink-muted leading-relaxed">
              Residuals measure remaining unmodelled error. Well-fitted model residuals should show no predictable autocorrelation patterns.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-2">// LJUNG–BOX AUTOCORRELATION TEST</span>
            <p className="text-ink-muted leading-relaxed mb-2">
              Tests whether a group of residual autocorrelations is jointly zero. High p-value indicates remaining residuals behave like un-autocorrelated noise.
            </p>
            <div className="text-[10px] text-rose-400 font-bold">Checks if model missed predictable temporal structure.</div>
          </div>
        </div>

        <div className="bg-rose-500/20 border border-rose-500/40 p-3.5 rounded-xl text-xs font-mono text-rose-400 font-semibold">
          RULE: If predictable autocorrelation remains in residuals, the model has missed time structure.
        </div>
      </div>

      {/* 3. AIC VS RESIDUALS VS FUTURE HOLDOUT */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          12. AIC vs Residuals vs Future Holdout Validation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">1. AIC</span>
            <span className="text-ink-muted">In-sample goodness of fit vs parameter complexity penalty.</span>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">2. RESIDUAL DIAGNOSTICS</span>
            <span className="text-ink-muted">Checks whether unmodelled autocorrelation remains in errors.</span>
          </div>
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-rose-400 font-bold block mb-1">3. FUTURE HOLDOUT</span>
            <span className="text-ink-muted">Evaluates true out-of-sample forecast accuracy on unseen future period (36M).</span>
          </div>
        </div>
      </div>
    </section>
  );
}
