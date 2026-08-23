"use client";

import { CorePrincipleBadge } from "./Badges";

const projectMatrix = [
  { proj: "Credit Risk", frame: "Manage credit loss", data: "466,285 loans + time split", method: "Logistic + LGD/EAD + ECL/RWA", evidence: "OOT / calibration / limits", interface: "Master pipeline console" },
  { proj: "Churn", frame: "Capture likely churners", data: "10,000 customers", method: "Keras Neural Net + SMOTE", evidence: "Confusion matrix recall", interface: "Error trade-off view" },
  { proj: "Time Series", frame: "Forecast monthly demand", data: "204 monthly observations", method: "SARIMA(p,d,q)(P,D,Q)m", evidence: "Future holdout MAPE", interface: "Forecasting pipeline" },
  { proj: "NIFTY", frame: "Combine 82 assets", data: "10-year price series", method: "Covariance + Monte Carlo", evidence: "Transparent formulas", interface: "Risk-return cloud" },
  { proj: "Client Equity", frame: "Implement client strategy", data: "US CRSP 500 10-year universe", method: "Ranking + L1/L2 cvxpy", evidence: "Robustness framework", interface: "Implementation map" },
  { proj: "LOC-IQ", frame: "Review location evidence", data: "6 identifiers, 46 sources", method: "Weighted evidence graph", evidence: "Inspectable paths", interface: "ReactFlow console" },
];

export default function ProjectMapSection() {
  return (
    <section id="project-map" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // FINAL SYNTHESIS — PROJECT METHOD MAPPING & REBUILD SUMMARY
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* PROJECT MATRIX */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            09. Cross-Project Method Mapping
          </h2>
          <CorePrincipleBadge label="PORTFOLIO MAPPING" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-hairline bg-surface-sunken text-accent font-bold">
                <th className="p-3">PROJECT</th>
                <th className="p-3">FRAME</th>
                <th className="p-3">DATA</th>
                <th className="p-3">METHOD</th>
                <th className="p-3">EVIDENCE</th>
                <th className="p-3">INTERFACE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-faint text-ink-muted">
              {projectMatrix.map((row) => (
                <tr key={row.proj} className="hover:bg-surface-sunken/50 transition-colors">
                  <td className="p-3 font-bold text-ink whitespace-nowrap">{row.proj}</td>
                  <td className="p-3">{row.frame}</td>
                  <td className="p-3">{row.data}</td>
                  <td className="p-3 font-medium text-accent">{row.method}</td>
                  <td className="p-3">{row.evidence}</td>
                  <td className="p-3">{row.interface}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FINAL BUILD MEMORY */}
      <div className="bg-surface-raised border border-accent/40 p-6 rounded-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">
          10. Final System Rebuild Memory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">FRAME</span>
            <span className="text-ink-muted text-[11px]">What decision are we trying to improve?</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">MAP</span>
            <span className="text-ink-muted text-[11px]">What objects and relationships exist?</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">GROUND</span>
            <span className="text-ink-muted text-[11px]">What does data mean across time & grain?</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">METHOD</span>
            <span className="text-ink-muted text-[11px]">What representation fits the problem?</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">BUILD</span>
            <span className="text-ink-muted text-[11px]">What is the smallest end-to-end slice?</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">EVIDENCE</span>
            <span className="text-ink-muted text-[11px]">How do we validate and test proof?</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">INTERFACE</span>
            <span className="text-ink-muted text-[11px]">Does UI expose decision logic?</span>
          </div>
          <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">ITERATE</span>
            <span className="text-ink-muted text-[11px]">Does evidence guide changes?</span>
          </div>
        </div>
      </div>
    </section>
  );
}
