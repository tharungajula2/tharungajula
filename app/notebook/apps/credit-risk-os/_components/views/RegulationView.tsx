"use client";

import { ExternalLink, ShieldCheck, BookOpen, FileCheck, Layers, Award } from 'lucide-react';

export interface RegulatoryLink {
  id: string;
  title: string;
  issuer: 'Bank of England PRA' | 'BCBS / BIS' | 'IFRS Foundation / IASB' | 'EBA';
  code: string;
  impactOnOS: string;
  url: string;
}

export const REGULATORY_LINKS: RegulatoryLink[] = [
  {
    id: 'reg-pra-ss424',
    title: 'PRA SS4/24 — Internal Ratings-Based (IRB) Approaches',
    issuer: 'Bank of England PRA',
    code: 'SS4/24',
    impactOnOS: 'Sets UK supervisory expectations for PD, LGD, EAD estimation and rating scorecards.',
    url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/2024/ss4-24-internal-ratings-based-approaches',
  },
  {
    id: 'reg-pra-ps126',
    title: 'PRA PS1/26 — Implementation of Basel 3.1 Standards in the UK',
    issuer: 'Bank of England PRA',
    code: 'PS1/26',
    impactOnOS: 'Defines UK go-live (1 Jan 2027) and 72.5% end-state output floor transition (1 Jan 2030).',
    url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/2024/basel-3-1-standards-policy-statement',
  },
  {
    id: 'reg-pra-ss123',
    title: 'PRA SS1/23 — Model Risk Management Principles for Banks',
    issuer: 'Bank of England PRA',
    code: 'SS1/23',
    impactOnOS: 'Mandates model inventory, independent validation, and ongoing backtesting (PSI/CSI).',
    url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/2023/model-risk-management-principles-for-banks-ss',
  },
  {
    id: 'reg-ifrs9',
    title: 'IFRS 9 Financial Instruments — Staging & Expected Credit Loss',
    issuer: 'IFRS Foundation / IASB',
    code: 'IFRS 9',
    impactOnOS: 'Mandates 3-stage classification, SICR triggers, and 5-year lifetime ECL term structure discounting.',
    url: 'https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/',
  },
  {
    id: 'reg-bcbs239',
    title: 'BCBS 239 — Principles for Effective Risk Data Aggregation and Reporting',
    issuer: 'BCBS / BIS',
    code: 'BCBS 239',
    impactOnOS: 'Requires end-to-end data lineage, Critical Data Elements (CDE), and automated reconciliation.',
    url: 'https://www.bis.org/publ/bcbs239.htm',
  },
  {
    id: 'reg-eba-lom',
    title: 'EBA Guidelines on Loan Origination and Monitoring',
    issuer: 'EBA',
    code: 'EBA/GL/2020/06',
    impactOnOS: 'Establishes robust credit underwriting, covenant monitoring, and early warning systems.',
    url: 'https://www.eba.europa.eu/regulation-and-policy/credit-risk/guidelines-on-loan-origination-and-monitoring',
  },
];

export default function RegulationView() {
  const modelLifecyclePillars = [
    { pillar: '01', title: 'Model Identification & Inventory', desc: 'All credit scorecards, PD/LGD/EAD models, and IFRS 9 engines are registered in the central Model Inventory with assigned risk tiering (Tier 1 High Materiality).' },
    { pillar: '02', title: 'Development & Conceptual Soundness', desc: 'Quantitative documentation validating statistical methodology, sample representative periods, and macroeconomic scenario selection.' },
    { pillar: '03', title: 'Independent Model Validation', desc: 'Second-line quantitative team validates conceptual soundness, code implementation, stress sensitivity, and benchmark performance.' },
    { pillar: '04', title: 'Committee Governance Sign-off', desc: 'Formal approval by Model Risk Committee (MRC) and ECL Impairment Committee prior to production deployment.' },
    { pillar: '05', title: 'Ongoing Monitoring & Backtesting', desc: 'Quarterly Population Stability Index (PSI), Characteristic Stability Index (CSI), and backtesting actual defaults vs predicted PD.' },
    { pillar: '06', title: 'Model Change Governance', desc: 'Material model changes (e.g. recalibrating LGD haircuts) require prior PRA notification under SS4/24.' },
  ];

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-accent font-semibold uppercase">// SECTION REG-10</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">UK Regulatory Rulebook, Policy Statements & Model Risk Governance</h1>
          <p className="text-xs text-ink-muted mt-1">
            Curated PRA supervisory statements, Basel 3.1 policy standards, IFRS 9 accounting rules, and PRA SS1/23 model risk framework.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-accent font-bold uppercase text-xs">
          PRA / BASEL III / IFRS COMPLIANT
        </div>
      </div>

      {/* OFFICIAL REGULATORY LINKS GRID */}
      <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
          <span className="font-bold text-ink uppercase">// OFFICIAL REGULATORY STANDARDS & POLICY REFERENCES</span>
          <span className="text-[10px] text-accent font-bold uppercase">OFFICIAL AUTHORITATIVE SOURCES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGULATORY_LINKS.map((link) => (
            <div key={link.id} className="p-4 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2 flex flex-col justify-between hover:border-accent/40 transition-all">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-bold uppercase">{link.issuer}</span>
                  <span className="font-bold text-ink-faint">{link.code}</span>
                </div>
                <h2 className="font-bold text-ink text-xs uppercase leading-snug">{link.title}</h2>
                <p className="text-ink-muted font-sans text-[11px] leading-relaxed">{link.impactOnOS}</p>
              </div>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-between px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-accent hover:text-surface border border-hairline text-accent font-bold text-[10px] uppercase transition-all cursor-pointer"
              >
                <span>Read Official Standard</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* MODEL RISK MANAGEMENT FRAMEWORK (PRA SS1/23) */}
      <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="font-bold text-ink uppercase">// PRA SS1/23 MODEL RISK MANAGEMENT (MRM) LIFECYCLE</span>
          </div>
          <span className="text-[10px] text-signal font-bold uppercase">MODEL GOVERNANCE ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modelLifecyclePillars.map((m) => (
            <div key={m.pillar} className="p-4 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-accent font-bold text-sm">PILLAR #{m.pillar}</span>
              </div>
              <div className="font-bold text-ink text-xs uppercase">{m.title}</div>
              <p className="text-ink-muted font-sans text-[11px] leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
