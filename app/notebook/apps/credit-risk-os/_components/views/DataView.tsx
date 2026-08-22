"use client";

export default function DataView() {
  const lineageSteps = [
    { step: '01', node: 'Core Banking System', code: 'SRC-CBS-01', desc: 'Captures origination limits, drawn balances, repayment schedules, and DPD delinquency counters.' },
    { step: '02', node: 'Risk Warehouse & Data Mart', code: 'RWH-DM-02', desc: 'Consolidates obligor financial statements, internal rating scorecards, and collateral haircuts.' },
    { step: '03', node: 'SICR Staging Engine', code: 'ENG-SICR-03', desc: 'Evaluates 30+ DPD backstops, relative PD thresholds (3.0x), and watchlist flags to assign IFRS 9 Stages.' },
    { step: '04', node: 'ECL Calculation Engine', code: 'ENG-ECL-04', desc: 'Computes 12-month and 5-year discounted lifetime ECL term structures using marginal PDs and LGDs.' },
    { step: '05', node: 'Finance & General Ledger', code: 'FIN-GL-05', desc: 'Posts carrying provisions, specific default reserves, and balance sheet impairment entries.' },
    { step: '06', node: 'FINREP & COREP Reporting', code: 'REP-PRA-06', desc: 'Aggregates CDEs into PRA quarterly regulatory returns (F 18.00 and C 07.00/09.01).' },
  ];

  return (
    <div className="p-6 space-y-6 font-mono text-xs">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-accent font-semibold uppercase">// SECTION DAT-08</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">BCBS 239 Risk Data Aggregation & Lineage</h1>
          <p className="text-xs text-ink-muted mt-1">
            Source-to-target data lineage, Critical Data Elements (CDE), data quality rules, and auditability.
          </p>
        </div>
        <span className="px-3 py-1 rounded bg-signal/10 text-signal border border-signal/30 font-bold uppercase">
          BCBS 239 COMPLIANT
        </span>
      </div>

      {/* LINEAGE FLOW PIPELINE */}
      <div className="p-6 rounded-2xl bg-surface-raised border border-hairline space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
          <span className="font-bold text-ink uppercase">// END-TO-END DATA LINEAGE FLOW</span>
          <span className="text-[10px] text-accent">6 PIPELINE STAGES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lineageSteps.map((s) => (
            <div key={s.step} className="p-4 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2 relative group hover:border-accent/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-accent font-bold text-sm">#{s.step}</span>
                <span className="text-[10px] text-ink-faint">{s.code}</span>
              </div>
              <div className="font-bold text-ink text-xs uppercase">{s.node}</div>
              <p className="text-ink-muted font-sans text-[11px] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
