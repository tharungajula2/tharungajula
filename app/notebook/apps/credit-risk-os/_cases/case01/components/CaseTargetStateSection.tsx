"use client";

import { CheckCircle2, ShieldCheck, Database, Cpu, FileText, ArrowRight } from 'lucide-react';

export default function CaseTargetStateSection() {
  const targetNodes = [
    {
      step: '01',
      title: 'Core Banking / Collections Source',
      owner: 'Collections & Operations (Rajesh Kulkarni)',
      desc: 'Servicing DPD snapshot captured post EOD clearing completion at 23:59:59 with explicit transaction timestamp.',
      controlPoint: 'Source validation check: Blocks ingestion if EOD clearing is pending or incomplete.',
    },
    {
      step: '02',
      title: 'Controlled Ingestion & Canonical Mart',
      owner: 'Data Engineering Lead (Siddharth Varma)',
      desc: 'Ingests CBS servicing data into canonical schema using composite join key (`obligor_id` + `facility_id`).',
      controlPoint: 'Deduplication & Schema Validation: Rejects duplicate join rows before feeding risk engine.',
    },
    {
      step: '03',
      title: 'Automated IRACP Asset Quality Rules Engine',
      owner: 'Risk Technology Lead (Priya Sundaram)',
      desc: 'Executes `_engine/iracp.ts` applying exact RBI DPD operators (`DPD > 30`, `DPD > 60`, `DPD > 90`).',
      controlPoint: 'Boundary Operator Audit: Enforces exact 90 DPD boundary (exactly 90 DPD remains Standard).',
    },
    {
      step: '04',
      title: 'IRACP Provision Calculation Engine',
      owner: 'Credit Risk SME (Vikram Malhotra)',
      desc: 'Decomposes outstanding balance into secured and unsecured portions against realisable collateral valuation.',
      controlPoint: 'Collateral Haircut Check: Automatically applies 25% unsecured Substandard rate if security is ₹0.',
    },
    {
      step: '05',
      title: 'Approved Governance & Override Store',
      owner: 'Regulatory Compliance SME (Dr. Meera Nambiar)',
      desc: 'Captures manual qualitative overrides only when accompanied by mandatory written sign-off metadata.',
      controlPoint: 'Audit Log Integrity: Un-approved manual overrides are rejected with audit log alerts.',
    },
    {
      step: '06',
      title: 'Risk Data Mart & Finance GL Publication',
      owner: 'Finance & Impairment Controller (Ananya Sharma)',
      desc: 'Publishes validated asset-quality classifications and provisions directly to Finance General Ledger and RBI regulatory filings.',
      controlPoint: 'Automated Risk-to-Finance Reconciliation: Guarantees zero unexplained provision variance.',
    },
  ];

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // TARGET OPERATING MODEL & GOVERNANCE CONTROL POINTS
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            TARGET-STATE ASSET QUALITY OPERATING FLOW
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          TARGET ARCHITECTURE • 6 CONTROL GATES
        </span>
      </div>

      {/* TARGET FLOW NODES */}
      <div className="space-y-4 font-mono text-xs">
        {targetNodes.map((node) => (
          <div
            key={node.step}
            className="cros-glass-card p-5 rounded-2xl border border-cyan-500/30 space-y-3 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold text-[10px]">
                  TARGET STEP {node.step}
                </span>
                <h3 className="text-base font-bold text-slate-100 uppercase">{node.title}</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-sans">Owner: <strong className="text-slate-200">{node.owner}</strong></span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">{node.desc}</p>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold uppercase text-[10px] text-emerald-400 block">// AUTOMATED CONTROL GATE:</span>
                <p className="text-[11px] font-sans leading-tight">{node.controlPoint}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
