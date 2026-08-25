"use client";

import { ExternalLink, ShieldCheck, BookOpen, FileCheck, Layers, Award } from 'lucide-react';

export interface RegulatoryLink {
  id: string;
  title: string;
  issuer: 'Reserve Bank of India (RBI)' | 'BCBS / BIS' | 'Internal ALCO / Bank Policy';
  code: string;
  impactOnOS: string;
  url: string;
}

export const REGULATORY_LINKS: RegulatoryLink[] = [
  {
    id: 'reg-rbi-iracp',
    title: 'RBI Master Circular — Income Recognition, Asset Classification & Provisioning (IRACP)',
    issuer: 'Reserve Bank of India (RBI)',
    code: 'RBI IRACP',
    impactOnOS: 'Mandates DPD asset classification triggers (SMA-0/1/2, Substandard NPA) and provisioning rates.',
    url: 'https://www.rbi.org.in/',
  },
  {
    id: 'reg-rbi-basel3',
    title: 'RBI Master Circular — Capital Adequacy & Risk Management (Basel III)',
    issuer: 'Reserve Bank of India (RBI)',
    code: 'RBI Basel III',
    impactOnOS: 'Mandates 5.5% minimum CET1, 2.5% CCB, and 9.0% minimum CRAR for Scheduled Commercial Banks.',
    url: 'https://www.rbi.org.in/',
  },
  {
    id: 'reg-rbi-alm',
    title: 'RBI Framework on Liquidity Risk Management — LCR & NSFR Standards',
    issuer: 'Reserve Bank of India (RBI)',
    code: 'RBI ALM / LCR',
    impactOnOS: 'Enforces minimum 100% LCR 30-day stressed liquidity and 100% NSFR structural funding standards.',
    url: 'https://www.rbi.org.in/',
  },
  {
    id: 'reg-bcbs239',
    title: 'BCBS 239 — Principles for Effective Risk Data Aggregation and Reporting',
    issuer: 'BCBS / BIS',
    code: 'BCBS 239',
    impactOnOS: 'Requires end-to-end data lineage, Critical Data Elements (CDE), and automated reconciliation.',
    url: 'https://www.bis.org/publ/bcbs239.htm',
  },
];

export default function RegulationView() {
  const modelLifecyclePillars = [
    { pillar: '01', title: 'Model Identification & Inventory', desc: 'All credit scorecards, PD/LGD/EAD models, and IRACP engines are registered in the central Model Inventory with assigned risk tiering.' },
    { pillar: '02', title: 'Development & Conceptual Soundness', desc: 'Quantitative documentation validating statistical methodology, sample representative periods, and macroeconomic scenario selection.' },
    { pillar: '03', title: 'Independent Model Validation', desc: 'Second-line quantitative team validates conceptual soundness, code implementation, stress sensitivity, and benchmark performance.' },
    { pillar: '04', title: 'Committee Governance Sign-off', desc: 'Formal approval by Model Risk Committee (MRC) and ALCO Executive Committee prior to production deployment.' },
    { pillar: '05', title: 'Ongoing Monitoring & Backtesting', desc: 'Quarterly Population Stability Index (PSI), Characteristic Stability Index (CSI), and backtesting actual defaults vs predicted PD.' },
    { pillar: '06', title: 'Model Change Governance', desc: 'Material model changes (e.g. recalibrating LGD haircuts) require prior supervisory notification and audit documentation.' },
  ];

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none text-slate-100">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase">// WORKSPACE 05 • REGULATORY RULEBOOK & GOVERNANCE</span>
          <h1 className="text-2xl font-black uppercase text-slate-100 tracking-tight">RBI Supervisory Standards & Model Risk Governance</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            RBI IRACP asset quality standards, RBI Basel III Capital Adequacy, BCBS 239 risk data aggregation, and model risk framework.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold uppercase text-xs">
          RBI / BASEL III / BCBS FRAMEWORK
        </div>
      </div>

      {/* OFFICIAL REGULATORY LINKS GRID */}
      <div className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-bold text-slate-100 uppercase">// SUPERVISORY STANDARDS & POLICY REFERENCES</span>
          <span className="text-[10px] text-cyan-400 font-bold uppercase">AUTHORITATIVE DOMAIN SOURCES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-sans text-xs">
          {REGULATORY_LINKS.map((link) => (
            <div key={link.id} className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2 flex flex-col justify-between hover:border-cyan-500/40 transition-all font-mono text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-bold uppercase border border-cyan-500/20">{link.issuer}</span>
                  <span className="font-bold text-slate-400">{link.code}</span>
                </div>
                <h2 className="font-bold text-slate-100 text-xs uppercase leading-snug">{link.title}</h2>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{link.impactOnOS}</p>
              </div>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 border border-white/10 text-cyan-400 font-bold text-[10px] uppercase transition-all cursor-pointer font-mono"
              >
                <span>Read Official Standard</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* MODEL RISK MANAGEMENT FRAMEWORK */}
      <div className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-100 uppercase">// MODEL RISK MANAGEMENT (MRM) GOVERNANCE LIFECYCLE</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase">MODEL GOVERNANCE ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modelLifecyclePillars.map((m) => (
            <div key={m.pillar} className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-sm">PILLAR #{m.pillar}</span>
              </div>
              <div className="font-bold text-slate-100 text-xs uppercase">{m.title}</div>
              <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
