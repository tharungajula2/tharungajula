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
    businessQuestion: 'Identify facilities classified as Stage 1 (12M ECL) that are active on the Credit Watchlist (potential asset quality breach).',
    sqlQuery: `SELECT f.facility_number, o.obligor_name, f.asset_quality_status, o.watchlist_status, f.pd, f.provision_inr_cr\nFROM facilities f\nJOIN obligors o ON f.obligor_id = o.id\nWHERE f.ifrs9_stage = 1 AND o.watchlist_status = TRUE;`,
    resultHeaders: ['facility_number', 'obligor_name', 'asset_quality_status', 'watchlist_status', 'pd', 'provision_inr_cr'],
    resultRows: [
      ['MUM-CRE-8801', 'Apex Commercial Realty Ltd', 'SMA-1', 'TRUE', '0.065', '₹18.4 Cr'],
    ],
    diagnosis: 'EXCEPTIONAL MISMATCH: Facility MUM-CRE-8801 is watchlisted due to LTV covenant breach but was erroneously retained in Stage 1.',
    baNextMove: 'Raise UAT Defect DEF-AQ-001: Asset quality staging batch rule RULE-AQ-03 failed to ingest manual watchlist status flags.',
  },
  {
    id: 'sql-02',
    title: '2. Duplicate Facility Record Ingestion Audit',
    category: 'Data Quality',
    businessQuestion: 'Detect duplicate facility booking records ingested from Core Banking System during daily data staging.',
    sqlQuery: `SELECT facility_number, COUNT(*) as record_count, SUM(outstanding_inr_cr) as total_outstanding\nFROM staging_cbs_facilities\nGROUP BY facility_number\nHAVING COUNT(*) > 1;`,
    resultHeaders: ['facility_number', 'record_count', 'total_outstanding'],
    resultRows: [],
    diagnosis: 'CLEAN: Zero duplicate facility records detected in CBS daily extract batch as at 31 July 2026.',
    baNextMove: 'Log automated DQ Rule DQ-001 (Unique Facility Constraint) validation pass for regulatory audit log.',
  },
  {
    id: 'sql-03',
    title: '3. Missing PD / LGD Parameter Audit',
    category: 'Data Quality',
    businessQuestion: 'Find active drawn credit facilities missing essential quantitative risk parameters (PD or LGD).',
    sqlQuery: `SELECT facility_number, obligor_id, outstanding_inr_cr, pd, lgd\nFROM facilities\nWHERE outstanding_inr_cr > 0 AND (pd IS NULL OR lgd IS NULL OR pd = 0 OR lgd = 0);`,
    resultHeaders: ['facility_number', 'obligor_id', 'outstanding_inr_cr', 'pd', 'lgd'],
    resultRows: [],
    diagnosis: 'CLEAN: All 8 active synthetic credit facilities possess valid, non-zero PD and LGD parameter estimates.',
    baNextMove: 'Maintain data completeness threshold >= 99.9% under BCBS 239 Data Governance Principle 3.',
  },
  {
    id: 'sql-04',
    title: '4. Property Collateral Valuation Stale (>12 Months)',
    category: 'Data Quality',
    businessQuestion: 'Identify CRE property collateral valuations that have not been revalued within the 12-month policy window.',
    sqlQuery: `SELECT c.id, f.facility_number, c.type, c.valuation_inr_cr, c.last_valuation_date\nFROM collateral c\nJOIN facilities f ON c.id = f.collateral_id\nWHERE c.last_valuation_date < DATE '2025-08-01';`,
    resultHeaders: ['id', 'facility_number', 'type', 'valuation_inr_cr', 'last_valuation_date'],
    resultRows: [
      ['COL-904', 'BLR-INF-3302', 'Commercial Equipment', '₹45.0 Cr', '2025-08-20'],
    ],
    diagnosis: 'WARNING: Equipment collateral for BLR-INF-3302 is approaching 12-month valuation refresh deadline.',
    baNextMove: 'Notify Collateral Desk to trigger automated appraisal workflow prior to Q2 2026 regulatory cycle cutoff.',
  },
  {
    id: 'sql-05',
    title: '5. Latest Rating Selection via Window Function',
    category: 'Staging',
    businessQuestion: 'Extract the single latest internal rating per obligor using window partition ordering.',
    sqlQuery: `WITH RankedRatings AS (\n  SELECT obligor_id, internal_rating, rating_date,\n         ROW_NUMBER() OVER (PARTITION BY obligor_id ORDER BY rating_date DESC) as rn\n  FROM obligor_rating_history\n)\nSELECT obligor_id, internal_rating, rating_date\nFROM RankedRatings WHERE rn = 1;`,
    resultHeaders: ['obligor_id', 'internal_rating', 'rating_date'],
    resultRows: [
      ['OBL-101', 'A', '2026-06-15'],
      ['OBL-103', 'BBB', '2026-05-10'],
      ['OBL-106', 'BB', '2026-04-01'],
    ],
    diagnosis: 'VALIDATED: Window function partitions latest rating correctly without duplicate Cartesian row explosion.',
    baNextMove: 'Specify ROW_NUMBER() OVER (PARTITION BY obligor_id ORDER BY rating_date DESC) in Source-to-Target spec.',
  },
  {
    id: 'sql-06',
    title: '6. Stage Population & Provision Reconciliation Summation',
    category: 'Reconciliation',
    businessQuestion: 'Aggregate EAD exposure, IRACP provisions, and coverage percentages grouped by Asset Quality Staging.',
    sqlQuery: `SELECT asset_quality_status,\n       COUNT(*) as facility_count,\n       SUM(outstanding_inr_cr) as total_outstanding,\n       SUM(provision_inr_cr) as total_provision,\n       ROUND(SUM(provision_inr_cr) / SUM(outstanding_inr_cr) * 100, 2) as coverage_pct\nFROM facilities\nGROUP BY asset_quality_status\nORDER BY asset_quality_status;`,
    resultHeaders: ['asset_quality_status', 'facility_count', 'total_outstanding', 'total_provision', 'coverage_pct'],
    resultRows: [
      ['Standard', 5, '₹1,850.0 Cr', '₹7.4 Cr', '0.40%'],
      ['SMA-1 / SMA-2', 2, '₹420.0 Cr', '₹21.0 Cr', '5.00%'],
      ['Substandard NPA', 1, '₹120.0 Cr', '₹18.0 Cr', '15.00%'],
    ],
    diagnosis: 'RECONCILED: IRACP provision totals match General Ledger impairment reserves exactly across all asset classes.',
    baNextMove: 'Submit Asset Quality Reconciliation Report to Financial Controller and External Audit.',
  },
];

export default function DataView() {
  const { setIsMasterGraphOpen } = useCreditRiskOS();
  const [selectedMissionId, setSelectedMissionId] = useState<string>(SQL_MISSIONS[0].id);

  const selectedMission = SQL_MISSIONS.find((m) => m.id === selectedMissionId) || SQL_MISSIONS[0];

  const lineageSteps = [
    { step: '01', node: 'Core Banking System', code: 'SRC-CBS-01', desc: 'Captures origination limits, drawn balances, repayment schedules, and DPD delinquency counters.' },
    { step: '02', node: 'Risk Warehouse & Data Mart', code: 'RWH-DM-02', desc: 'Consolidates obligor financial statements, internal rating scorecards, and collateral haircuts.' },
    { step: '03', node: 'IRACP & Staging Engine', code: 'ENG-IRACP-03', desc: 'Evaluates 90+ DPD backstops, SMA classification rules, and collateral haircuts to assign IRACP provisioning.' },
    { step: '04', node: 'RWA & Capital Engine', code: 'ENG-CAP-04', desc: 'Computes RBI Basel III Standardised Credit Risk RWA and off-balance sheet CCF exposure conversions.' },
    { step: '05', node: 'Finance & General Ledger', code: 'FIN-GL-05', desc: 'Posts carrying provisions, specific default reserves, and balance sheet impairment entries.' },
    { step: '06', node: 'RBI Supervisory Reporting', code: 'REP-RBI-06', desc: 'Aggregates CDEs into RBI quarterly regulatory returns (IRACP, CRAR, ALM, LEF).' },
  ];

  return (
    <div className="p-6 space-y-6 font-mono text-xs select-none text-slate-100">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase">// WORKSPACE 04 • DATA LAB</span>
          <h1 className="text-2xl font-black uppercase text-slate-100 tracking-tight">BCBS 239 Risk Data Governance, Lineage & Guided SQL Lab</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Source-to-target data lineage, Critical Data Elements (CDE), data quality rules, and Guided SQL Analyst Investigations.
          </p>
        </div>

        <button
          onClick={() => setIsMasterGraphOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all cursor-pointer shadow-md font-mono"
        >
          <Network className="w-4 h-4" />
          <span>Launch Master Ecosystem Graph →</span>
        </button>
      </div>

      {/* LINEAGE FLOW PIPELINE */}
      <div className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-bold text-slate-100 uppercase">// BCBS 239 END-TO-END DATA LINEAGE PIPELINE</span>
          <span className="text-[10px] text-cyan-400 font-bold uppercase">BCBS 239 DATA GOVERNANCE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lineageSteps.map((s) => (
            <div key={s.step} className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2 relative group hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-sm">#{s.step}</span>
                <span className="text-[10px] text-slate-400">{s.code}</span>
              </div>
              <div className="font-bold text-slate-100 text-xs uppercase">{s.node}</div>
              <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GUIDED CREDIT RISK BA SQL LAB */}
      <div className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-100 uppercase">// GUIDED CREDIT RISK BA SQL INVESTIGATION LAB</span>
          </div>
          <span className="text-[10px] text-cyan-400 font-bold uppercase">SQL ANSWERS BUSINESS QUESTIONS WITH EVIDENCE</span>
        </div>

        {/* MISSION SELECTOR BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-xs">
          {SQL_MISSIONS.map((m) => {
            const isSelected = m.id === selectedMission.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMissionId(m.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                    : 'bg-slate-950 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase">{m.category}</span>
                </div>
                <div className="font-bold text-xs text-slate-100 truncate">{m.title}</div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SQL MISSION PANEL */}
        {selectedMission && (
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-4">
            {/* BUSINESS QUESTION */}
            <div className="space-y-1 font-sans">
              <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">// BUSINESS QUESTION:</span>
              <p className="text-slate-100 text-xs font-semibold">{selectedMission.businessQuestion}</p>
            </div>

            {/* SQL QUERY BOX */}
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-cyan-300 font-mono text-xs overflow-x-auto space-y-1">
              <div className="text-[9px] text-slate-400 uppercase font-bold border-b border-white/10 pb-1 mb-1">// SQL QUERY CODE:</div>
              <pre className="whitespace-pre-wrap">{selectedMission.sqlQuery}</pre>
            </div>

            {/* RESULT TABLE */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">// QUERY RESULT TABLE EXECUTED ON SYNTHETIC BANK DATA:</span>
              <div className="overflow-x-auto border border-white/10 rounded-xl">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-900 text-cyan-400 text-[11px] uppercase">
                      {selectedMission.resultHeaders.map((h) => (
                        <th key={h} className="py-2 px-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMission.resultRows.length === 0 ? (
                      <tr>
                        <td colSpan={selectedMission.resultHeaders.length} className="py-3 px-3 text-center text-slate-400 font-sans">
                          No exception rows returned (Query returned 0 rows — Clean validation pass).
                        </td>
                      </tr>
                    ) : (
                      selectedMission.resultRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 bg-slate-950">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="py-2 px-3 text-slate-200 font-semibold">{cell}</td>
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
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1 font-sans">
                <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase block">// DIAGNOSIS:</span>
                <p className="text-slate-200 text-xs leading-relaxed">{selectedMission.diagnosis}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1 font-sans">
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">// BA NEXT MOVE:</span>
                <p className="text-slate-200 text-xs leading-relaxed">{selectedMission.baNextMove}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
