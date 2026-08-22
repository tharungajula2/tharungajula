"use client";

export default function RegulationView() {
  const regItems = [
    {
      topic: 'IFRS 9 / Ind AS 109 Financial Instruments',
      authority: 'IASB / UK Endorsement Board',
      principle: 'Forward-looking expected credit loss (ECL) accounting requiring 3-stage classification based on Significant Increase in Credit Risk (SICR).',
      renforgeAssumption: 'Stage 1 uses 12-month ECL; Stage 2 uses lifetime ECL triggered when relative PD ratio >= 3.0x or DPD >= 30; Stage 3 uses default precedence at >90 DPD.',
    },
    {
      topic: 'Basel 3.1 Capital Framework',
      authority: 'PRA (Prudential Regulation Authority UK)',
      principle: 'Restructures capital requirements, introduces 72.5% output floor on IRB models, and restricts AIRB for large corporate exposures.',
      renforgeAssumption: 'Renforge Bank plc applies AIRB model formulas with a strict 72.5% Basel 3.1 Standardised output floor override on RWA calculations.',
    },
    {
      topic: 'BCBS 239 Risk Data Aggregation',
      authority: 'Basel Committee on Banking Supervision',
      principle: 'Pillar standards for risk data governance, data lineage traceability, timeliness, and accuracy across regulatory returns.',
      renforgeAssumption: 'Critical Data Elements (CDE) mapped from Core Banking System (CBS) through SICR & ECL engines to FINREP/COREP returns.',
    },
    {
      topic: 'Liquidity Framework (LCR & NSFR)',
      authority: 'PRA Policy Statement PS22/21',
      principle: 'Mandates minimum 100% LCR (30-day net liquidity buffer) and 100% NSFR (1-year stable funding match).',
      renforgeAssumption: 'Renforge Bank plc maintains a £450M HQLA buffer against £320M net 30-day outflows (LCR 140.6%) and 116.7% NSFR.',
    },
  ];

  return (
    <div className="p-6 space-y-6 font-mono text-xs">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-accent font-semibold uppercase">// SECTION REG-10</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">UK Regulatory Rulebook & Principles</h1>
          <p className="text-xs text-ink-muted mt-1">
            Structured UK regulatory reference: PRA Rulebook, Basel 3.1, IFRS 9, BCBS 239, and EBA GL on Origination.
          </p>
        </div>
        <span className="px-3 py-1 rounded bg-accent/10 text-accent border border-accent/20 font-bold uppercase">
          PRA RULEBOOK REFERENCE
        </span>
      </div>

      {/* REGULATORY ARTICLES */}
      <div className="space-y-4">
        {regItems.map((item) => (
          <div key={item.topic} className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-3">
            <div className="flex items-center justify-between border-b border-hairline-faint pb-2">
              <span className="font-bold text-ink text-sm uppercase">{item.topic}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-surface-sunken text-accent font-bold border border-hairline-faint">{item.authority}</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint font-sans">
                <span className="text-[10px] font-mono text-accent font-bold block uppercase mb-0.5">// REGULATORY PRINCIPLE:</span>
                <p className="text-ink text-xs leading-relaxed">{item.principle}</p>
              </div>

              <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint font-sans">
                <span className="text-[10px] font-mono text-signal font-bold block uppercase mb-0.5">// RENFORGE BANK IMPLEMENTATION ASSUMPTION:</span>
                <p className="text-ink-muted text-xs leading-relaxed">{item.renforgeAssumption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
