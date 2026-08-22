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
      { title: '1. Executive Summary & Driver', content: 'Mandate PRA PS17/23 & IFRS 9: Automate daily ingestion of credit watchlist flags into the IFRS 9 staging engine to eliminate 30-day provision lags.' },
      { title: '2. Project Scope', content: 'IN SCOPE: Daily automated ingestion of watchlist flags, relative PD ratio calculation (3.0x threshold), 30 DPD backstop evaluation, Stage 2 Lifetime ECL recalculation.\nOUT OF SCOPE: Sovereign loans and trading book derivative counterparty exposures.' },
      { title: '3. Business Requirements', content: 'BRD-REQ-01: System shall automatically evaluate 30 DPD backstop on daily CBS batch.\nBRD-REQ-02: System shall flag SICR when current 1-yr PD exceeds 3.0x origination PD.' },
      { title: '4. Controls & Sign-off', content: 'Approvals Required: Head of Credit Risk, Financial Controller, Lead Business Analyst.' },
    ],
  },
  {
    id: 'tmpl-decision-table',
    name: 'Business-Rule Decision Table',
    code: 'DT-SICR-01',
    category: 'Data & Rules',
    description: 'Precedence table defining automated IFRS 9 stage assignment rules.',
    sections: [
      { title: 'Rule Precedence Order', content: '1. Default Precedence (DPD >= 90 OR Bankruptcy) → STAGE 3 (Lifetime ECL + Credit-impaired)\n2. SICR Rule 1 (DPD >= 30) → STAGE 2 (Lifetime ECL)\n3. SICR Rule 2 (PD Ratio >= 3.0x) → STAGE 2 (Lifetime ECL)\n4. SICR Rule 3 (Rating Downgrade >= 2 Notches) → STAGE 2 (Lifetime ECL)\n5. SICR Rule 4 (Watchlist Status = TRUE) → STAGE 2 (Lifetime ECL)\n6. Otherwise → STAGE 1 (12-Month ECL)' },
    ],
  },
  {
    id: 'tmpl-s2t-mapping',
    name: 'Source-to-Target Data Mapping',
    code: 'STM-ECL-01',
    category: 'Data & Rules',
    description: 'Field-level transformation specification from Core Banking System to Risk Warehouse & ECL Engine.',
    sections: [
      { title: 'Field Mapping Table', content: '• Source: CBS_LOANS.DRAWN_BAL → Transformation: NVL(DRAWN_BAL, 0) → Target: EAD_ENGINE.DRAWN_GBP (GBP, Decimal 18,2)\n• Source: RISK_SCORECARD.RATING → Transformation: MAP_TO_PIT_PD(RATING) → Target: STAGING_ENGINE.CURRENT_PD\n• Source: WATCHLIST_DB.STATUS → Transformation: CASE WHEN STATUS=\'ACTIVE\' THEN 1 ELSE 0 END → Target: STAGING_ENGINE.WATCHLIST_FLAG' },
    ],
  },
  {
    id: 'tmpl-rtm',
    name: 'Requirements Traceability Matrix (RTM)',
    code: 'RTM-ECL-2025-04',
    category: 'Testing & QA',
    description: 'End-to-end matrix ensuring 100% test coverage from requirement to release sign-off.',
    sections: [
      { title: 'Traceability Matrix', content: '• REQ-ECL-01 (30 DPD Backstop) → Story: US-ECL-101 → Code: stagingEngine.ts → Test: UAT-ECL-001 (PASSED) → Defect: NONE → Sign-off: APPROVED\n• REQ-ECL-02 (3.0x Relative PD Ratio) → Story: US-ECL-102 → Code: stagingEngine.ts → Test: UAT-ECL-002 (PASSED) → Defect: DEF-802 (RESOLVED) → Sign-off: APPROVED' },
    ],
  },
  {
    id: 'tmpl-uat-pack',
    name: 'UAT Execution Test Pack',
    code: 'UAT-PACK-01',
    category: 'Testing & QA',
    description: 'User Acceptance Testing cases verified against PRA regulatory benchmarks.',
    sections: [
      { title: 'Test Case UAT-ECL-001 (30 DPD Stage 2 Shift)', content: 'GIVEN a loan with 35 DPD and no prior Watchlist flag\nWHEN daily staging batch executes\nTHEN system reclassifies loan to Stage 2 and recalculates ECL over 5-year lifetime term structure.' },
      { title: 'Test Case UAT-ECL-002 (Relative PD Ratio Breach)', content: 'GIVEN a loan where current PD = 6.5% and origination PD = 1.8% (ratio 3.61x)\nWHEN staging batch executes\nTHEN system triggers SICR and moves loan to Stage 2.' },
    ],
  },
];

export default function ChangeView() {
  const [activeTab, setActiveTab] = useState<'lifecycle' | 'interaction' | 'templates'>('lifecycle');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(BA_TEMPLATES[0].id);

  const selectedTemplate = BA_TEMPLATES.find((t) => t.id === selectedTemplateId) || BA_TEMPLATES[0];

  const lifecycle24Steps = [
    { step: 1, name: 'Regulatory Driver', owner: 'PRA / IASB Mandate' },
    { step: 2, name: 'Stakeholder Analysis', owner: 'Credit Risk BA' },
    { step: 3, name: 'Current State Assessment', owner: 'BA & Business SMEs' },
    { step: 4, name: 'Problem / Gap Definition', owner: 'BA & Risk Ops' },
    { step: 5, name: 'Target State Vision', owner: 'BA & Enterprise Architect' },
    { step: 6, name: 'Scope Boundaries', owner: 'Project Sponsor' },
    { step: 7, name: 'Business Requirements (BRD)', owner: 'Lead Credit Risk BA' },
    { step: 8, name: 'Business Rules Engine Logic', owner: 'BA & Risk Policy' },
    { step: 9, name: 'Data Requirements Definition', owner: 'BA & Data Architect' },
    { step: 10, name: 'Source-to-Target Mapping', owner: 'BA & Data Engineer' },
    { step: 11, name: 'Data Dictionary Attributes', owner: 'Data Governance BA' },
    { step: 12, name: 'Interface Specifications', owner: 'Integration Architect' },
    { step: 13, name: 'Architecture Impact Assessment', owner: 'Solution Architect' },
    { step: 14, name: 'User Story Backlog Refinement', owner: 'Agile BA & Product Owner' },
    { step: 15, name: 'Acceptance Criteria Definition', owner: 'BA & QA Lead' },
    { step: 16, name: 'System Integration Testing (SIT)', owner: 'QA Testing Team' },
    { step: 17, name: 'User Acceptance Testing (UAT)', owner: 'Credit Risk SMEs & BA' },
    { step: 18, name: 'Reconciliation Execution', owner: 'Finance & Risk Controller' },
    { step: 19, name: 'Defect Resolution Management', owner: 'BA & Tech Dev Team' },
    { step: 20, name: 'Decision Log Sign-offs', owner: 'Governance Committees' },
    { step: 21, name: 'Formal Release Sign-off', owner: 'CFO, CRO & Head of Change' },
    { step: 22, name: 'Production Deployment', owner: 'DevOps & IT Release Mgmt' },
    { step: 23, name: 'Hypercare Support Period', owner: 'BA & L3 Production Support' },
    { step: 24, name: 'BAU Handover & Closure', owner: 'Business Operations Manager' },
  ];

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-accent font-semibold uppercase">// SECTION CHG-09</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">Business Analysis Studio & Delivery Governance</h1>
          <p className="text-xs text-ink-muted mt-1">
            End-to-end 24-step delivery lifecycle, stakeholder interaction map, and populated Credit Risk BA template library.
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-raised border border-hairline">
          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'lifecycle' ? 'bg-accent text-surface' : 'text-ink-muted hover:text-ink'
            }`}
          >
            24-Step Lifecycle
          </button>
          <button
            onClick={() => setActiveTab('interaction')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'interaction' ? 'bg-accent text-surface' : 'text-ink-muted hover:text-ink'
            }`}
          >
            Interaction Map
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'templates' ? 'bg-accent text-surface' : 'text-ink-muted hover:text-ink'
            }`}
          >
            BA Templates
          </button>
        </div>
      </div>

      {/* TAB 1: 24-STEP BA LIFECYCLE */}
      {activeTab === 'lifecycle' && (
        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4">
          <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
            <span className="font-bold text-ink uppercase">// COMPLETE 24-STEP CREDIT RISK BA DELIVERY LIFECYCLE</span>
            <span className="text-[10px] text-accent font-bold uppercase">CANONICAL CASE: SICR WATCHLIST AUTOMATION</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {lifecycle24Steps.map((item) => (
              <div key={item.step} className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint hover:border-accent/40 transition-all space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold text-xs">#{String(item.step).padStart(2, '0')}</span>
                  <span className="text-[9px] text-ink-faint uppercase font-semibold">{item.owner}</span>
                </div>
                <div className="font-bold text-ink text-xs uppercase">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BA STAKEHOLDER INTERACTION MAP */}
      {activeTab === 'interaction' && (
        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-5">
          <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
            <span className="font-bold text-ink uppercase">// CREDIT RISK BA STAKEHOLDER INTERACTION & GOVERNANCE HUB</span>
            <span className="text-[10px] text-accent font-bold uppercase">3 LINES OF DEFENCE GOVERNANCE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* 1st Line */}
            <div className="p-4 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2">
              <span className="text-accent font-bold uppercase block text-xs">// 1ST LINE OF DEFENCE</span>
              <div className="space-y-1.5 text-ink-muted font-sans text-xs">
                <div><strong className="text-ink font-mono">Credit Business SMEs:</strong> Provide origination requirements & loan structuring logic.</div>
                <div><strong className="text-ink font-mono">Relationship Managers:</strong> Provide customer metadata & facility limit requests.</div>
                <div><strong className="text-ink font-mono">Technology & Data:</strong> Implements automated batch engines & ETL pipelines.</div>
              </div>
            </div>

            {/* 2nd Line */}
            <div className="p-4 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2">
              <span className="text-signal font-bold uppercase block text-xs">// 2ND LINE OF DEFENCE</span>
              <div className="space-y-1.5 text-ink-muted font-sans text-xs">
                <div><strong className="text-ink font-mono">Credit Risk Policy:</strong> Establishes SICR thresholds (3.0x PD ratio, 30 DPD).</div>
                <div><strong className="text-ink font-mono">Model Validation:</strong> Independently reviews rating scorecards & ECL models.</div>
                <div><strong className="text-ink font-mono">Regulatory Reporting:</strong> Validates COREP/FINREP return compilation.</div>
              </div>
            </div>

            {/* 3rd Line */}
            <div className="p-4 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2">
              <span className="text-amber-400 font-bold uppercase block text-xs">// 3RD LINE OF DEFENCE</span>
              <div className="space-y-1.5 text-ink-muted font-sans text-xs">
                <div><strong className="text-ink font-mono">Internal Audit:</strong> Audits end-to-end BCBS 239 lineage & sign-offs.</div>
                <div><strong className="text-ink font-mono">External Audit:</strong> Audits IFRS 9 ECL provisions posted to General Ledger.</div>
                <div><strong className="text-ink font-mono">PRA / Regulator:</strong> Conducts supervisory reviews & Basel capital audits.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BA TEMPLATE LIBRARY */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* TEMPLATE LIST (4 COLS) */}
          <div className="lg:col-span-4 bg-surface-raised border border-hairline rounded-2xl p-4 space-y-2">
            <div className="border-b border-hairline-faint pb-2 font-bold text-ink uppercase">
              // REUSABLE BA TEMPLATES ({BA_TEMPLATES.length})
            </div>

            {BA_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedTemplate.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? 'bg-accent/15 border-accent text-accent font-bold'
                      : 'bg-surface-sunken border-hairline-faint text-ink-muted hover:text-ink'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent font-bold uppercase">{tmpl.category}</span>
                    <span className="text-ink-faint">{tmpl.code}</span>
                  </div>
                  <div className="font-bold text-ink text-xs truncate">{tmpl.name}</div>
                </button>
              );
            })}
          </div>

          {/* TEMPLATE VIEWER (8 COLS) */}
          {selectedTemplate && (
            <div className="lg:col-span-8 bg-surface-raised border border-hairline rounded-2xl p-5 space-y-4 font-mono text-xs">
              <div className="border-b border-hairline-faint pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-accent font-bold uppercase">// POPULATED BA ARTEFACT TEMPLATE</span>
                  <h2 className="text-lg font-bold text-ink">{selectedTemplate.name}</h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-surface-sunken border border-hairline font-bold text-ink">
                  {selectedTemplate.code}
                </span>
              </div>

              <p className="text-ink-muted font-sans text-xs leading-relaxed">{selectedTemplate.description}</p>

              <div className="space-y-3">
                {selectedTemplate.sections.map((sec, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
                    <span className="text-[10px] text-accent font-bold uppercase block">{sec.title}</span>
                    <pre className="text-ink font-mono text-xs whitespace-pre-wrap leading-relaxed">{sec.content}</pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
