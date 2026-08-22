"use client";

import { useState } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { Network, Database, Terminal, Play, CheckCircle, AlertTriangle } from 'lucide-react';

export interface SQLMission {
  id: string;
  title: string;
  category: 'Staging' | 'Data Quality' | 'Reconciliation' | 'UAT';
  businessQuestion: string;
  sqlQuery: string;
  resultHeaders: string[];
  resultRows: (string | number)[][];
  diagnosis: string;
  baNextMove: string;
}

export const SQL_MISSIONS: SQLMission[] = [
  {
    id: 'sql-01',
    title: '1. Stage 1 Loans Listed on Credit Watchlist',
    category: 'Staging',
    businessQuestion: 'Identify facilities classified as Stage 1 (12M ECL) that are active on the Credit Watchlist (potential SICR breach).',
    sqlQuery: `SELECT f.facility_number, o.obligor_name, f.ifrs9_stage, o.watchlist_status, f.pd, f.provision_gbp\nFROM facilities f\nJOIN obligors o ON f.obligor_id = o.id\nWHERE f.ifrs9_stage = 1 AND o.watchlist_status = TRUE;`,
    resultHeaders: ['facility_number', 'obligor_name', 'ifrs9_stage', 'watchlist_status', 'pd', 'provision_gbp'],
    resultRows: [
      ['MID-CRE-4403', 'Midland Retail Properties plc', 1, 'TRUE', '0.065', '£2,632,500'],
    ],
    diagnosis: 'EXCEPTIONAL MISMATCH: Facility MID-CRE-4403 is watchlisted due to LTV covenant breach but was erroneously retained in Stage 1.',
    baNextMove: 'Raise UAT Defect DEF-802: SICR staging batch rule BR-SICR-03 failed to ingest manual watchlist status flags.',
  },
  {
    id: 'sql-02',
    title: '2. Duplicate Facility Record Ingestion Audit',
    category: 'Data Quality',
    businessQuestion: 'Detect duplicate facility booking records ingested from Core Banking System during daily data staging.',
    sqlQuery: `SELECT facility_number, COUNT(*) as record_count, SUM(drawn_gbp) as total_drawn\nFROM staging_cbs_facilities\nGROUP BY facility_number\nHAVING COUNT(*) > 1;`,
    resultHeaders: ['facility_number', 'record_count', 'total_drawn'],
    resultRows: [],
    diagnosis: 'CLEAN: Zero duplicate facility records detected in CBS daily extract batch as at 31 July 2026.',
    baNextMove: 'Log automated DQ Rule DQ-001 (Unique Facility Constraint) validation pass for regulatory audit log.',
  },
  {
    id: 'sql-03',
    title: '3. Missing PD / LGD Parameter Audit',
    category: 'Data Quality',
    businessQuestion: 'Find active drawn credit facilities missing essential quantitative risk parameters (PD or LGD).',
    sqlQuery: `SELECT facility_number, obligor_id, drawn_gbp, pd, lgd\nFROM facilities\nWHERE drawn_gbp > 0 AND (pd IS NULL OR lgd IS NULL OR pd = 0 OR lgd = 0);`,
    resultHeaders: ['facility_number', 'obligor_id', 'drawn_gbp', 'pd', 'lgd'],
    resultRows: [],
    diagnosis: 'CLEAN: All 8 active synthetic credit facilities possess valid, non-zero PD and LGD parameter estimates.',
    baNextMove: 'Maintain data completeness threshold >= 99.9% under BCBS 239 Data Governance Principle 3.',
  },
  {
    id: 'sql-04',
    title: '4. Property Collateral Valuation Stale (>12 Months)',
    category: 'Data Quality',
    businessQuestion: 'Identify CRE property collateral valuations that have not been revalued within the 12-month policy window.',
    sqlQuery: `SELECT c.id, f.facility_number, c.type, c.valuation_gbp, c.last_valuation_date\nFROM collateral c\nJOIN facilities f ON c.id = f.collateral_id\nWHERE c.last_valuation_date < DATE '2025-08-01';`,
    resultHeaders: ['id', 'facility_number', 'type', 'valuation_gbp', 'last_valuation_date'],
    resultRows: [
      ['COL-904', 'BRIS-SME-1104', 'Equipment', '£14,000,000', '2025-08-20'],
    ],
    diagnosis: 'WARNING: Equipment collateral for BRIS-SME-1104 is approaching 12-month valuation refresh deadline.',
    baNextMove: 'Notify Collateral Desk to trigger automated appraisal workflow prior to Q3 2026 regulatory cycle cutoff.',
  },
  {
    id: 'sql-05',
    title: '5. Latest Rating Selection via Window Function',
    category: 'Staging',
    businessQuestion: 'Extract the single latest internal rating per obligor using window partition ordering.',
    sqlQuery: `WITH RankedRatings AS (\n  SELECT obligor_id, internal_rating, rating_date,\n         ROW_NUMBER() OVER (PARTITION BY obligor_id ORDER BY rating_date DESC) as rn\n  FROM obligor_rating_history\n)\nSELECT obligor_id, internal_rating, rating_date\nFROM RankedRatings WHERE rn = 1;`,
    resultHeaders: ['obligor_id', 'internal_rating', 'rating_date'],
    resultRows: [
      ['OBL-101', 'BBB', '2026-06-15'],
      ['OBL-103', 'BB', '2026-05-10'],
      ['OBL-106', 'CCC', '2026-04-01'],
    ],
    diagnosis: 'VALIDATED: Window function partitions latest rating correctly without duplicate Cartesian row explosion.',
    baNextMove: 'Specify ROW_NUMBER() OVER (PARTITION BY obligor_id ORDER BY rating_date DESC) in Source-to-Target spec.',
  },
  {
    id: 'sql-06',
    title: '6. Stage Population & ECL Reconciliation Summation',
    category: 'Reconciliation',
    businessQuestion: 'Aggregate EAD exposure, ECL carrying provisions, and coverage percentages grouped by IFRS 9 Stage.',
    sqlQuery: `SELECT ifrs9_stage,\n       COUNT(*) as facility_count,\n       SUM(ead_gbp) as total_ead,\n       SUM(provision_gbp) as total_provision,\n       ROUND(SUM(provision_gbp) / SUM(ead_gbp) * 100, 2) as coverage_pct\nFROM facilities\nGROUP BY ifrs9_stage\nORDER BY ifrs9_stage;`,
    resultHeaders: ['ifrs9_stage', 'facility_count', 'total_ead', 'total_provision', 'coverage_pct'],
    resultRows: [
      [1, 5, '£223,500,000', '£445,450', '0.20%'],
      [2, 2, '£54,750,000', '£5,042,250', '9.21%'],
      [3, 1, '£8,000,000', '£5,200,000', '65.00%'],
    ],
    diagnosis: 'RECONCILED: ECL provision totals match General Ledger impairment reserves exactly across all 3 stages.',
    baNextMove: 'Submit Stage Reconciliation Report to Financial Controller and External Audit.',
  },
];

export default function DataView() {
  const { setIsMasterGraphOpen } = useCreditRiskOS();
  const [selectedMissionId, setSelectedMissionId] = useState<string>(SQL_MISSIONS[0].id);

  const selectedMission = SQL_MISSIONS.find((m) => m.id === selectedMissionId) || SQL_MISSIONS[0];

  const lineageSteps = [
    { step: '01', node: 'Core Banking System', code: 'SRC-CBS-01', desc: 'Captures origination limits, drawn balances, repayment schedules, and DPD delinquency counters.' },
    { step: '02', node: 'Risk Warehouse & Data Mart', code: 'RWH-DM-02', desc: 'Consolidates obligor financial statements, internal rating scorecards, and collateral haircuts.' },
    { step: '03', node: 'SICR Staging Engine', code: 'ENG-SICR-03', desc: 'Evaluates 30+ DPD backstops, relative PD thresholds (3.0x), and watchlist flags to assign IFRS 9 Stages.' },
    { step: '04', node: 'ECL Calculation Engine', code: 'ENG-ECL-04', desc: 'Computes 12-month and 5-year discounted lifetime ECL term structures using marginal PDs and LGDs.' },
    { step: '05', node: 'Finance & General Ledger', code: 'FIN-GL-05', desc: 'Posts carrying provisions, specific default reserves, and balance sheet impairment entries.' },
    { step: '06', node: 'FINREP & COREP Reporting', code: 'REP-PRA-06', desc: 'Aggregates CDEs into PRA quarterly regulatory returns (F 18.00 and C 07.00/09.01).' },
  ];

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-accent font-semibold uppercase">// SECTION DAT-08</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">BCBS 239 Risk Data Governance, Lineage & Guided SQL Lab</h1>
          <p className="text-xs text-ink-muted mt-1">
            Source-to-target data lineage, Critical Data Elements (CDE), data quality rules, and Guided SQL Analyst Investigations.
          </p>
        </div>

        <button
          onClick={() => setIsMasterGraphOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-surface font-bold uppercase tracking-wider text-xs hover:opacity-90 transition-all cursor-pointer shadow-md"
        >
          <Network className="w-4 h-4" />
          <span>Launch Master Ecosystem Graph →</span>
        </button>
      </div>

      {/* LINEAGE FLOW PIPELINE */}
      <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
          <span className="font-bold text-ink uppercase">// BCBS 239 END-TO-END DATA LINEAGE PIPELINE</span>
          <span className="text-[10px] text-accent font-bold uppercase">BCBS 239 AUDIT COMPLIANT</span>
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

      {/* GUIDED CREDIT RISK BA SQL LAB */}
      <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4">
        <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent" />
            <span className="font-bold text-ink uppercase">// GUIDED CREDIT RISK BA SQL INVESTIGATION LAB</span>
          </div>
          <span className="text-[10px] text-accent font-bold uppercase">SQL ANSWERS BUSINESS QUESTIONS WITH EVIDENCE</span>
        </div>

        {/* MISSION SELECTOR BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {SQL_MISSIONS.map((m) => {
            const isSelected = m.id === selectedMission.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMissionId(m.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                  isSelected
                    ? 'bg-accent/15 border-accent text-accent font-bold'
                    : 'bg-surface-sunken border-hairline-faint text-ink-muted hover:text-ink hover:bg-surface-raised'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-bold uppercase">{m.category}</span>
                </div>
                <div className="font-bold text-xs text-ink truncate">{m.title}</div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SQL MISSION PANEL */}
        {selectedMission && (
          <div className="p-4 rounded-xl bg-surface-sunken border border-hairline-faint space-y-4">
            {/* BUSINESS QUESTION */}
            <div className="space-y-1 font-sans">
              <span className="font-mono text-[10px] text-accent font-bold uppercase block">// BUSINESS QUESTION:</span>
              <p className="text-ink text-xs font-semibold">{selectedMission.businessQuestion}</p>
            </div>

            {/* SQL QUERY BOX */}
            <div className="p-3 rounded-xl bg-[#090B0E] border border-hairline text-accent font-mono text-xs overflow-x-auto space-y-1">
              <div className="text-[9px] text-ink-faint uppercase font-bold border-b border-hairline-faint pb-1 mb-1">// SQL QUERY CODE:</div>
              <pre className="whitespace-pre-wrap">{selectedMission.sqlQuery}</pre>
            </div>

            {/* RESULT TABLE */}
            <div className="space-y-2">
              <span className="text-[10px] text-ink-faint uppercase font-bold block">// QUERY RESULT TABLE EXECUTED ON SYNTHETIC BANK DATA:</span>
              <div className="overflow-x-auto border border-hairline-faint rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-hairline bg-surface-raised text-accent text-[11px] uppercase">
                      {selectedMission.resultHeaders.map((h) => (
                        <th key={h} className="py-2 px-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMission.resultRows.length === 0 ? (
                      <tr>
                        <td colSpan={selectedMission.resultHeaders.length} className="py-3 px-3 text-center text-ink-muted font-sans">
                          No exception rows returned (Query returned 0 rows — Clean validation pass).
                        </td>
                      </tr>
                    ) : (
                      selectedMission.resultRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-hairline-faint bg-surface-sunken">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="py-2 px-3 text-ink font-semibold">{cell}</td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DIAGNOSIS & BA NEXT MOVE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-raised border border-hairline-faint space-y-1 font-sans">
                <span className="font-mono text-[10px] text-signal font-bold uppercase block">// DIAGNOSIS:</span>
                <p className="text-ink text-xs leading-relaxed">{selectedMission.diagnosis}</p>
              </div>

              <div className="p-3 rounded-xl bg-surface-raised border border-hairline-faint space-y-1 font-sans">
                <span className="font-mono text-[10px] text-accent font-bold uppercase block">// BA NEXT MOVE:</span>
                <p className="text-ink text-xs leading-relaxed">{selectedMission.baNextMove}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
