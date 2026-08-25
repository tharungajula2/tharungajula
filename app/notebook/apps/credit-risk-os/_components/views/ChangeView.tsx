"use client";

import { useState } from 'react';
import { FileText, Layers, Users, CheckSquare, GitPullRequest, ShieldCheck, AlertCircle } from 'lucide-react';

export interface BATemplate {
  id: string;
  name: string;
  code: string;
  category: 'Requirements' | 'Data & Rules' | 'Testing & QA' | 'Governance';
  description: string;
  sections: { title: string; content: string }[];
}

export const BA_TEMPLATES: BATemplate[] = [
  {
    id: 'tmpl-brd',
    name: 'Business Requirements Document (BRD)',
    code: 'BRD-ECL-2025-04',
    category: 'Requirements',
    description: 'Formal business intent and regulatory compliance specification for SICR Watchlist Automation.',
    sections: [
      { title: '1. Executive Summary & Driver', content: 'Mandate RBI IRACP & Basel III Framework: Automate daily ingestion of credit watchlist flags into the asset quality classification engine to eliminate provision lags.' },
      { title: '2. Project Scope', content: 'IN SCOPE: Daily automated ingestion of watchlist flags, relative PD ratio calculation (3.0x threshold), 30 DPD SMA-1 evaluation, IRACP provision recalculation.\nOUT OF SCOPE: Sovereign exposures and trading book derivative counterparty exposures.' },
      { title: '3. Business Requirements', content: 'BRD-REQ-01: System shall automatically evaluate 30 DPD SMA-1 backstop on daily CBS batch.\nBRD-REQ-02: System shall flag asset quality degradation when current 1-yr PD exceeds 3.0x origination PD.' },
      { title: '4. Controls & Sign-off', content: 'Approvals Required: Head of Credit Risk, Financial Controller, Lead Business Analyst.' },
    ],
  },
  {
    id: 'tmpl-decision-table',
    name: 'Business-Rule Decision Table',
    code: 'DT-SICR-01',
    category: 'Data & Rules',
    description: 'Precedence table defining automated IRACP asset quality classification rules.',
    sections: [
      { title: 'Rule Precedence Order', content: '1. Default Precedence (DPD >= 91 OR NPA Status) → SUBSTANDARD NPA (15% Provision)\n2. SMA-2 Rule 1 (DPD >= 61) → SMA-2 PERFORMING (Standard Provision)\n3. SMA-1 Rule 2 (DPD >= 31) → SMA-1 PERFORMING (Standard Provision)\n4. SMA-0 Rule 3 (DPD >= 1) → SMA-0 PERFORMING (Standard Provision)\n5. Otherwise → STANDARD PERFORMING' },
    ],
  },
  {
    id: 'tmpl-s2t-mapping',
    name: 'Source-to-Target Data Mapping',
    code: 'STM-ECL-01',
    category: 'Data & Rules',
    description: 'Field-level transformation specification from Core Banking System to Risk Warehouse & IRACP Engine.',
    sections: [
      { title: 'Field Mapping Table', content: '• Source: CBS_LOANS.OUTSTANDING_BAL → Transformation: NVL(OUTSTANDING_BAL, 0) → Target: EAD_ENGINE.OUTSTANDING_INR_CR (INR Cr, Decimal 18,2)\n• Source: RISK_SCORECARD.RATING → Transformation: MAP_TO_PIT_PD(RATING) → Target: STAGING_ENGINE.CURRENT_PD\n• Source: WATCHLIST_DB.STATUS → Transformation: CASE WHEN STATUS=\'ACTIVE\' THEN 1 ELSE 0 END → Target: STAGING_ENGINE.WATCHLIST_FLAG' },
    ],
  },
  {
    id: 'tmpl-rtm',
    name: 'Requirements Traceability Matrix (RTM)',
    code: 'RTM-ECL-2025-04',
    category: 'Testing & QA',
    description: 'End-to-end matrix ensuring 100% test coverage from requirement to release sign-off.',
    sections: [
      { title: 'Traceability Matrix', content: '• REQ-AQ-001 (90 DPD Boundary) → Story: US-AQ-101 → Code: iracpEngine.ts → Test: UAT-AQ-001 (PASSED) → Defect: NONE → Sign-off: APPROVED\n• REQ-AQ-002 (Secured Collateral Haircut) → Story: US-AQ-102 → Code: iracpEngine.ts → Test: UAT-AQ-002 (PASSED) → Defect: DEF-AQ-001 (RESOLVED) → Sign-off: APPROVED' },
    ],
  },
  {
    id: 'tmpl-uat-pack',
    name: 'UAT Execution Test Pack',
    code: 'UAT-PACK-01',
    category: 'Testing & QA',
    description: 'User Acceptance Testing cases verified against RBI supervisory benchmarks.',
    sections: [
      { title: 'Test Case UAT-AQ-001 (90 DPD Boundary Evaluation)', content: 'GIVEN a term loan at 90 DPD\nWHEN asset classification batch executes\nTHEN system maintains SMA-2 performing status and applies 0.40% provision.' },
      { title: 'Test Case UAT-AQ-002 (Day 91 NPA Reclassification)', content: 'GIVEN a loan advancing from 90 DPD to 91 DPD\nWHEN asset classification batch executes\nTHEN system reclassifies loan to Substandard NPA and applies 15.00% provision.' },
    ],
  },
];

export default function ChangeView() {
  const [activeTab, setActiveTab] = useState<'lifecycle' | 'interaction' | 'templates'>('lifecycle');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(BA_TEMPLATES[0].id);

  const selectedTemplate = BA_TEMPLATES.find((t) => t.id === selectedTemplateId) || BA_TEMPLATES[0];

  const lifecycle24Steps = [
    { step: 1, name: 'Regulatory Driver', owner: 'RBI / ALCO Mandate' },
    { step: 2, name: 'Stakeholder Analysis', owner: 'Credit Risk BA' },
    { step: 3, name: 'Current State Assessment', owner: 'BA & Business SMEs' },
    { step: 4, name: 'Problem / Gap Definition', owner: 'BA & Risk Ops' },
    { step: 5, name: 'Target State Vision', owner: 'BA & Enterprise Architect' },
    { step: 6, name: 'Scope Boundaries', owner: 'Project Sponsor' },
    { step: 7, name: 'Business Requirements (BRD)', owner: 'Lead Credit Risk BA' },
    { step: 8, name: 'Business Rule Specification', owner: 'BA & Risk Modeling' },
    { step: 9, name: 'Source-to-Target Data Mapping', owner: 'Data BA & Data Architect' },
    { step: 10, name: 'Data Lineage & Catalogue', owner: 'Data Governance Lead' },
    { step: 11, name: 'Target Operating Model (TOM)', owner: 'Lead BA & Change Lead' },
    { step: 12, name: 'Functional Specification', owner: 'Lead Credit Risk BA' },
    { step: 13, name: 'Development Sprint Handover', owner: 'BA & Tech Lead' },
    { step: 14, name: 'System Integration Testing (SIT)', owner: 'QA Lead & Dev Team' },
    { step: 15, name: 'UAT Execution Test Pack', owner: 'Lead BA & Risk Ops' },
    { step: 16, name: 'Defect Triage & Remediation', owner: 'BA, QA & Dev Team' },
    { step: 17, name: 'Reconciliation & Balance Proof', owner: 'Financial Controller & BA' },
    { step: 18, name: 'RTM Traceability Verification', owner: 'Lead BA & Quality Lead' },
    { step: 19, name: 'Steering Committee Sign-off', owner: 'Project Sponsor & ALCO' },
    { step: 20, name: 'Release Readiness Gate', owner: 'Release Manager & BA' },
    { step: 21, name: 'Production Go-Live', owner: 'DevOps & IT Ops' },
    { step: 22, name: 'Post Go-Live Hypercare', owner: 'Lead BA & Support Team' },
    { step: 23, name: 'Post-Implementation Review', owner: 'Project Sponsor & BA' },
    { step: 24, name: 'Capability Archive & Debrief', owner: 'Lead Credit Risk BA' },
  ];

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none text-slate-100">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase">// WORKSPACE 05 • DELIVERY STUDIO</span>
          <h1 className="text-2xl font-black uppercase text-slate-100 tracking-tight">Business Analysis Delivery Studio</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            24-step BA lifecycle, 3-lines of defence interaction model, and canonical BA artifact template library.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'lifecycle' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            24-Step BA Lifecycle
          </button>
          <button
            onClick={() => setActiveTab('interaction')}
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'interaction' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            3-Lines Model
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'templates' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            BA Template Library
          </button>
        </div>
      </div>

      {activeTab === 'lifecycle' && (
        <div className="p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-slate-100 uppercase">// CANONICAL 24-STEP BUSINESS ANALYSIS TRANSFORMATION LIFECYCLE</span>
            <span className="text-[10px] text-cyan-400 font-bold uppercase">END-TO-END METHODOLOGY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 font-sans text-xs">
            {lifecycle24Steps.map((s) => (
              <div key={s.step} className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-cyan-400 font-bold">STEP {String(s.step).padStart(2, '0')}</span>
                  <span className="text-slate-400 truncate max-w-[120px]">{s.owner}</span>
                </div>
                <div className="font-bold text-slate-100 text-xs font-mono">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'interaction' && (
        <div className="p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-slate-100 uppercase">// THREE LINES OF DEFENCE OPERATING INTERACTION MODEL</span>
            <span className="text-[10px] text-cyan-400 font-bold uppercase">GOVERNANCE & RESPONSIBILITIES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
              <span className="text-cyan-400 font-bold uppercase block text-xs">// 1ST LINE OF DEFENCE (BUSINESS & TECH)</span>
              <div className="space-y-1.5 text-slate-300 font-sans text-xs">
                <div><strong className="text-slate-100 font-mono">Credit Business SMEs:</strong> Provide origination requirements & loan structuring logic.</div>
                <div><strong className="text-slate-100 font-mono">Relationship Managers:</strong> Provide customer metadata & facility limit requests.</div>
                <div><strong className="text-slate-100 font-mono">Technology & Data:</strong> Implements automated batch engines & ETL pipelines.</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
              <span className="text-emerald-400 font-bold uppercase block text-xs">// 2ND LINE OF DEFENCE (RISK & COMPLIANCE)</span>
              <div className="space-y-1.5 text-slate-300 font-sans text-xs">
                <div><strong className="text-slate-100 font-mono">Credit Risk Policy:</strong> Establishes IRACP DPD classification & provision rules.</div>
                <div><strong className="text-slate-100 font-mono">Model Validation:</strong> Independently reviews rating scorecards & capital models.</div>
                <div><strong className="text-slate-100 font-mono">Regulatory Reporting:</strong> Validates RBI Supervisory return compilation.</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
              <span className="text-amber-400 font-bold uppercase block text-xs">// 3RD LINE OF DEFENCE (INDEPENDENT ASSURANCE)</span>
              <div className="space-y-1.5 text-slate-300 font-sans text-xs">
                <div><strong className="text-slate-100 font-mono">Internal Audit:</strong> Audits end-to-end BCBS 239 lineage & sign-offs.</div>
                <div><strong className="text-slate-100 font-mono">External Audit:</strong> Audits IRACP provisions posted to General Ledger.</div>
                <div><strong className="text-slate-100 font-mono">RBI / Regulator:</strong> Conducts supervisory reviews & Basel capital audits.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-xs">
          <div className="p-4 rounded-2xl border border-white/10 space-y-2">
            <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">// BA ARTIFACT TEMPLATE LIBRARY</span>
            {BA_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplateId(tmpl.id)}
                className={`w-full p-3 rounded-xl border text-left font-mono transition-all cursor-pointer ${
                  selectedTemplateId === tmpl.id ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-slate-950 border-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="font-bold text-cyan-400">{tmpl.code}</span>
                  <span className="text-slate-400">{tmpl.category}</span>
                </div>
                <div className="font-bold text-slate-100 text-xs">{tmpl.name}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">{selectedTemplate.code} • {selectedTemplate.category}</span>
                <h2 className="text-base font-bold text-slate-100 uppercase">{selectedTemplate.name}</h2>
              </div>
            </div>

            <p className="text-slate-300 font-sans text-xs leading-relaxed">{selectedTemplate.description}</p>

            <div className="space-y-4">
              {selectedTemplate.sections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1.5">
                  <span className="text-cyan-400 font-bold uppercase text-[11px] block">{sec.title}</span>
                  <pre className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">{sec.content}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
