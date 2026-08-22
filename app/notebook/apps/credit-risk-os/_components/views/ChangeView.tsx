"use client";

export default function ChangeView() {
  const traceabilitySteps = [
    { type: 'DRIVER', title: 'PRA PS17/23 & IFRS 9 Staging Alignment', code: 'DRV-2025-01', desc: 'Regulatory mandate requiring automated SICR identification and daily watchlist integration.' },
    { type: 'CURRENT STATE', title: 'Legacy Semi-Manual Watchlist Review', code: 'AS-IS-01', desc: 'Monthly spreadsheet reviews resulted in late Stage 2 ECL classification and provision lags.' },
    { type: 'TARGET STATE', title: 'Real-Time Automated SICR Engine', code: 'TO-BE-01', desc: 'Automated evaluation of relative PD ratios (3.0x), 30 DPD backstops, and daily rating downgrades.' },
    { type: 'REQUIREMENT', title: 'Automated SICR Classification & ECL Trigger', code: 'REQ-ECL-04', desc: 'System must automatically classify loans into Stage 1, 2, or 3 based on deterministic bank rules.' },
    { type: 'BUSINESS RULE', title: 'Relative PD & Rating Downgrade Logic', code: 'BR-SICR-01..03', desc: 'BR-01: PD ratio >= 3.0x; BR-02: DPD >= 30; BR-03: Rating downgrade >= 2 notches.' },
    { type: 'USER STORY', title: 'As a Risk BA, I want daily automated staging', code: 'US-ECL-101', desc: 'Given a facility with 35 DPD, when batch runs, then stage changes to 2 and lifetime ECL is calculated.' },
    { type: 'UAT CASE', title: 'Verify Stage 2 Lifetime ECL Discounting', code: 'UAT-ECL-001', desc: 'PASSED: 100% match between deterministic engine output and PRA validation benchmark.' },
    { type: 'RELEASE', title: 'Production Release & BA Sign-off', code: 'REL-2025.4', desc: 'SIGNED OFF: Released into Renforge Bank plc production environment.' },
  ];

  return (
    <div className="p-6 space-y-6 font-mono text-xs">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-accent font-semibold uppercase">// SECTION CHG-09</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">Business Analysis Delivery & Change Traceability</h1>
          <p className="text-xs text-ink-muted mt-1">
            End-to-end traceability: Regulatory Driver → Target State → Requirement → Business Rules → User Story → UAT → Release.
          </p>
        </div>
        <span className="px-3 py-1 rounded bg-signal/10 text-signal border border-signal/30 font-bold uppercase">
          BA TRACEABILITY SIGNED OFF
        </span>
      </div>

      {/* TRACEABILITY CHAIN CARDS */}
      <div className="p-6 rounded-2xl bg-surface-raised border border-hairline space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
          <span className="font-bold text-ink uppercase">// COMPLETE IFRS 9 SICR CHANGE TRACEABILITY CHAIN</span>
          <span className="text-[10px] text-accent">8 CONNECTED ARTEFACTS</span>
        </div>

        <div className="space-y-3">
          {traceabilitySteps.map((step, idx) => (
            <div key={step.code} className="p-3.5 rounded-xl bg-surface-sunken border border-hairline-faint flex items-start gap-4 hover:border-accent/40 transition-all">
              <span className="w-8 text-accent font-bold text-sm shrink-0">#{idx + 1}</span>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-accent/15 text-accent font-bold uppercase">{step.type}</span>
                  <span className="text-[10px] text-ink-faint">{step.code}</span>
                </div>
                <div className="font-bold text-ink text-xs uppercase">{step.title}</div>
                <p className="text-ink-muted font-sans text-[11px] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
