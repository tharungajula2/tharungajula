"use client";

import { LimitationBadge } from "./Badges";

const commonConfusions = [
  { term: "TREND VS SEASONALITY", desc: "Trend is long-run baseline direction; seasonality is a pattern repeating at a known fixed frequency (m=12)." },
  { term: "STATIONARITY VS NO MOVEMENT", desc: "Stationarity does not mean constant flat values; it means sufficiently stable statistical structure over time." },
  { term: "DIFFERENCING VS % CHANGE", desc: "Differencing subtracts raw past values (yₜ − yₜ₋₁); it is not automatically a percentage return calculation." },
  { term: "AR VS MA", desc: "AR uses past values of the series; MA uses past forecast errors/shocks." },
  { term: "MA TERM VS ROLLING AVERAGE", desc: "The MA component in ARIMA refers to lagged error terms, NOT a rolling-average chart smoothing line." },
  { term: "AIC VS TEST ERROR", desc: "AIC ranks training candidate model complexity; future holdout evaluates true out-of-sample forecast accuracy." },
  { term: "RESIDUAL VS FORECAST ERROR METRIC", desc: "Residual is a single actual-minus-forecast point error; MAPE averages absolute percentage misses across evaluation periods." },
  { term: "RANDOM VS TIME SPLIT", desc: "Random splitting breaks temporal sequence and leaks future into past; chronological split preserves forecasting chronology." },
];

const cheatsheetBlocks = [
  {
    category: "STRUCTURE",
    items: [
      "trend = long-run direction",
      "seasonality = repeating pattern",
      "m=12 = annual pattern in monthly data",
      "stationarity = stable statistical structure",
    ],
  },
  {
    category: "TEST / TRANSFORM",
    items: [
      "ADF = unit-root test (H₀ = non-stationary)",
      "d = regular differencing order (Δyₜ = yₜ − yₜ₋₁)",
      "D = seasonal differencing order (Δ₁₂yₜ = yₜ − yₜ₋₁₂)",
      "d=1, D=1 at lag 12 achieves stationarity (p=0.0)",
    ],
  },
  {
    category: "MODEL & SELECTION",
    items: [
      "AR = past values, MA = past shocks",
      "SARIMA = (p,d,q)(P,D,Q)m",
      "625 candidate models searched",
      "AIC = fit vs complexity penalty",
      "Selected = (2,1,3)(1,1,3)₁₂",
    ],
  },
  {
    category: "VALIDATION & PERFORMANCE",
    items: [
      "residual = actual − forecast",
      "Ljung–Box = residual autocorrelation test",
      "chronological holdout = 168 train / 36 test",
      "seasonal naive MAPE = 12.69%",
      "SARIMA MAPE = 7.90%",
    ],
  },
];

export default function PipelineCheatsheetTruthSection() {
  return (
    <section id="pipeline-truth" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-rose-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 07 — COMMON CONFUSIONS, RECALL CHEATSHEET & TRUTH BOUNDARY
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. COMMON CONFUSIONS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          17. Eight Common Time-Series Confusions Clarified
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {commonConfusions.map((c) => (
            <div key={c.term} className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
              <span className="text-xs font-bold text-rose-400 block mb-1 uppercase">// {c.term}</span>
              <p className="text-ink-muted leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. COMPACT RECALL CHEATSHEET */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          18. Compact Memory & Recall Cheatsheet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {cheatsheetBlocks.map((block) => (
            <div key={block.category} className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-rose-400 tracking-widest block mb-2 uppercase">
                  // {block.category}
                </span>
                <ul className="space-y-1.5 text-ink-muted">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-rose-400 shrink-0">•</span>
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
            19. Project Truth & Claim Boundaries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-2">// IMPLEMENTED & SUPPORTED</span>
            <ul className="space-y-1 text-ink-muted">
              <li>✓ 204 monthly prescription observations</li>
              <li>✓ Chronological 168 train / 36 future holdout split</li>
              <li>✓ ADF testing: raw p=1.0, d=1 p=0.1167, D=1 p=0.0</li>
              <li>✓ Regular d=1 & seasonal D=1 differencing at lag m=12</li>
              <li>✓ 625 candidate SARIMA grid search</li>
              <li>✓ AIC model ranking</li>
              <li>✓ Selected SARIMA(2,1,3)(1,1,3)₁₂ model</li>
              <li>✓ Residual Ljung–Box autocorrelation testing</li>
              <li>✓ Rolling 12-month evaluation framework</li>
              <li>✓ Seasonal-naive baseline (12.69% MAPE)</li>
              <li>✓ SARIMA 7.90% MAPE performance</li>
            </ul>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-amber-500/30">
            <span className="text-amber-300 font-bold block mb-2">// LIMITATIONS & NOT CLAIMED</span>
            <ul className="space-y-1 text-ink-muted">
              <li>✗ Single univariate historical series (no exogenous features)</li>
              <li>✗ AIC alone does not guarantee future forecasting superiority</li>
              <li>✗ No claim of live production deployment</li>
              <li>✗ No causal demand claims</li>
              <li>✗ No invented RMSE or MAE statistics</li>
              <li>✗ No unsupported future prescription volume numbers</li>
              <li>✗ No added confidence interval calculations beyond source</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
