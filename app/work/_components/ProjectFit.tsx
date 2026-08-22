"use client";

interface ProjectRow {
  name: string;
  question: string;
  learning: string;
}

const projects: ProjectRow[] = [
  {
    name: "Retail Credit Risk",
    question:
      "How does borrower behaviour become PD, expected loss, provisioning and regulatory risk?",
    learning:
      "Risk modelling + validation + IFRS 9-style ECL + capital + monitoring.",
  },
  {
    name: "Bank Churn",
    question:
      "How do we identify likely churners when missing a positive case is costly?",
    learning:
      "Neural networks + imbalance + confusion matrix + precision/recall trade-off.",
  },
  {
    name: "Time Series",
    question:
      "How do we forecast future observations without leaking future information?",
    learning:
      "Chronology + stationarity + SARIMA + residual validation.",
  },
  {
    name: "NIFTY Portfolio",
    question:
      "How do multiple assets combine into a portfolio-level risk/return trade-off?",
    learning:
      "Returns + covariance + weights + portfolio optimisation.",
  },
  {
    name: "Client Equity Framework",
    question:
      "How do cross-sectional signals become a controlled portfolio implementation?",
    learning:
      "Signals + ranking + portfolio construction + turnover + robustness.",
  },
  {
    name: "LOC-IQ",
    question:
      "How can multiple location-related signals become an explainable decision interface?",
    learning:
      "Product architecture + source mapping + evidence graph + weighted signals.",
  },
];

export default function ProjectFit() {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // SECTION 06 — HOW THE PROJECTS FIT
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      <div className="bg-surface-raised backdrop-blur-xl border border-hairline rounded-2xl overflow-hidden">
        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline-faint bg-surface-sunken">
                <th className="py-3 px-4 text-[11px] font-mono font-bold text-accent uppercase tracking-wider w-1/4">
                  PROJECT
                </th>
                <th className="py-3 px-4 text-[11px] font-mono font-bold text-accent uppercase tracking-wider w-5/12">
                  PRIMARY QUESTION
                </th>
                <th className="py-3 px-4 text-[11px] font-mono font-bold text-accent uppercase tracking-wider w-1/3">
                  MAIN LEARNING
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-faint text-xs sm:text-sm">
              {projects.map((p) => (
                <tr
                  key={p.name}
                  className="hover:bg-surface-sunken/50 transition-colors"
                >
                  <td className="py-3.5 px-4 font-semibold text-ink">
                    {p.name}
                  </td>
                  <td className="py-3.5 px-4 text-ink-muted leading-relaxed">
                    {p.question}
                  </td>
                  <td className="py-3.5 px-4 text-ink-muted font-mono text-[11px] sm:text-xs">
                    {p.learning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE / TABLET CARDS */}
        <div className="block md:hidden divide-y divide-hairline-faint">
          {projects.map((p) => (
            <div key={p.name} className="p-4 space-y-2">
              <h3 className="text-sm font-semibold text-ink">{p.name}</h3>
              <div>
                <span className="text-[10px] font-mono text-accent uppercase block mb-0.5">
                  Primary Question
                </span>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {p.question}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-accent uppercase block mb-0.5">
                  Main Learning
                </span>
                <p className="text-xs font-mono text-ink-muted">{p.learning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
