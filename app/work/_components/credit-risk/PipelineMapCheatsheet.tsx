"use client";

const pipelineSteps = [
  "Historical Loans",
  "Default Target",
  "Binning",
  "WoE / IV",
  "Logistic Regression",
  "PD",
  "Scorecard",
  "Validation",
  "LGD + EAD",
  "Expected Loss",
  "IFRS 9 Staging",
  "Lifetime ECL",
  "Basel Capital / RWA",
  "Portfolio Monitoring",
  "Governance + Lineage",
];

const cheatsheetBlocks = [
  {
    category: "CORE",
    items: [
      "PD = chance of default",
      "LGD = loss severity if default occurs",
      "EAD = currency exposure at default",
      "EL = PD × LGD × EAD",
    ],
  },
  {
    category: "SCORECARD",
    items: [
      "Binning = risk groups",
      "WoE = bin risk meaning",
      "IV = variable usefulness",
      "logit = log odds",
      "sigmoid = probability",
      "PDO = points when odds double",
    ],
  },
  {
    category: "VALIDATION",
    items: [
      "AUC / Gini / KS = discrimination (ranking power)",
      "Brier / HL = calibration (probability accuracy)",
      "PSI / CSI = stability (population & feature drift)",
      "confusion matrix = one threshold decision",
      "ROC = all threshold trade-offs",
    ],
  },
  {
    category: "IFRS 9",
    items: [
      "Stage 1 = 12m ECL",
      "Stage 2 = SICR + lifetime ECL",
      "Stage 3 = credit impaired + lifetime ECL",
      "30 DPD ≠ SICR definition (rebuttable backstop)",
      "lifetime PD requires survival probability math",
    ],
  },
  {
    category: "CAPITAL",
    items: [
      "ECL ≠ RWA (accounting vs regulatory capital)",
      "downturn LGD ≠ IFRS 9 LGD",
      "SA = regulatory risk weights",
      "IRB = approved model inputs + prescribed formula",
    ],
  },
  {
    category: "MONITORING",
    items: [
      "vintage = origination cohort",
      "MOB = age of cohort",
      "roll rate = state movement",
      "transition matrix = all state movements",
      "project dataset cannot build true sequential roll rates",
    ],
  },
  {
    category: "GOVERNANCE",
    items: [
      "development ≠ independent validation",
      "lineage = source → transformation → consumer",
      "BCBS 239 = controlled risk-data aggregation/reporting",
      "ICAAP = capital",
      "ILAAP = liquidity",
    ],
  },
];

export default function PipelineMapCheatsheet() {
  return (
    <section id="cheatsheet" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 07 — END-TO-END PIPELINE MAP & RECALL CHEATSHEET
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 15-STEP END-TO-END PIPELINE MAP */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">
          25. The Complete 15-Step System Pipeline
        </h2>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Reconstruct the entire retail credit risk system from raw historical loans to governed financial reporting in one continuous flow.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step}
              className="bg-surface-sunken border border-hairline-faint hover:border-accent/40 p-3.5 rounded-xl flex items-center gap-3 transition-colors"
            >
              <span className="text-accent font-bold text-xs shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-ink font-medium uppercase">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE-LEVEL RECALL CHEATSHEET */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          26. Compact Memory & Recall Cheatsheet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {cheatsheetBlocks.map((block) => (
            <div
              key={block.category}
              className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-accent tracking-widest block mb-2 uppercase">
                  // {block.category}
                </span>
                <ul className="space-y-1.5 text-ink-muted">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-accent shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
