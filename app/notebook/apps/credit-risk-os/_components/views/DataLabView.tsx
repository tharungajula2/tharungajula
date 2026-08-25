"use client";

import { useState } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import {
  getAllMappings,
  getAllDefects,
  getAllInvestigations,
  EnrichedEntity,
} from '../../_state/operatingSystemStore';
import {
  Database,
  Search,
  AlertTriangle,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  FileCode2,
  BookOpen,
} from 'lucide-react';
import { SourceToTargetMapping } from '../../_cases/_framework/types';

interface SyntheticSystemInfo {
  id: string;
  name: string;
  category: string;
  owner: string;
  grain: string;
  cases: string[];
  description: string;
  keyFields: string[];
}

const SYNTHETIC_SYSTEMS: SyntheticSystemInfo[] = [
  { id: 'SYS-01', name: 'CBS_LOAN_ACCOUNT', category: 'Core Banking', owner: 'Deepak Deshmukh (Data Engineering)', grain: 'Account Level', cases: ['CASE-001'], description: 'Primary Core Banking System storing customer loan account balances, interest rates, and contractual repayment schedules.', keyFields: ['account_number', 'customer_id', 'principal_balance', 'interest_rate', 'contract_date'] },
  { id: 'SYS-02', name: 'COLLECTIONS_DELINQUENCY', category: 'Collections & Operations', owner: 'Ramesh Sundaram (Collections Lead)', grain: 'Daily Account Snapshot', cases: ['CASE-001'], description: 'Daily collections tracking engine recording DPD, overdue installments, and payment promise activity.', keyFields: ['account_number', 'days_past_due', 'overdue_amount', 'last_payment_date'] },
  { id: 'SYS-03', name: 'COLLATERAL_REGISTER', category: 'Risk & Securities', owner: 'Smita Kulkarni (Credit Risk Policy)', grain: 'Collateral Asset Level', cases: ['CASE-001', 'CASE-003'], description: 'Enterprise collateral register capturing property valuation, fixed deposits, gold, and eligible CRM haircut metadata.', keyFields: ['collateral_id', 'account_number', 'collateral_type', 'valuation_amount', 'valuation_date', 'eligible_crm_flag'] },
  { id: 'SYS-04', name: 'ASSET_QUALITY_MART', category: 'Risk Analytics', owner: 'Ananya Roy (Asset Quality Analytics)', grain: 'Account Level', cases: ['CASE-001', 'CASE-003'], description: 'IRACP classification mart computing SMA-0/1/2, Substandard NPA, and required provision percentages.', keyFields: ['account_number', 'iracp_stage', 'provision_percent', 'required_provision_amount'] },
  { id: 'SYS-05', name: 'CBS_LOAN_CONTRACT', category: 'Core Banking', owner: 'Deepak Deshmukh (Data Engineering)', grain: 'Contract Facility Level', cases: ['CASE-002'], description: 'Treasury lending contract source capturing fixed vs floating benchmark index and repricing frequency.', keyFields: ['facility_id', 'obligor_id', 'principal_balance_inr_cr', 'interest_rate_type', 'repricing_frequency'] },
  { id: 'SYS-06', name: 'TREASURY_CURVE_MASTER', category: 'Treasury Market Data', owner: 'Girish Hegde (Treasury ALM Owner)', grain: 'Daily Rate Curve', cases: ['CASE-002'], description: 'Authoritative yield curve repository containing MIBOR, SOFR, G-Sec, and internal transfer pricing curves.', keyFields: ['tenor_code', 'base_curve_rate_percent', 'liquidity_premium_percent', 'as_of_date'] },
  { id: 'SYS-07', name: 'FTP_INPUT_STAGE', category: 'ETL Staging', owner: 'Deepak Deshmukh (Data Engineering)', grain: 'Facility Level', cases: ['CASE-002'], description: 'Staging layer ingesting facility contracts and joining FTP rate components before ALCO calculation.', keyFields: ['facility_id', 'origination_date', 'next_repricing_date', 'base_rate', 'liquidity_premium'] },
  { id: 'SYS-08', name: 'CBS_CREDIT_EXPOSURE', category: 'Core Banking', owner: 'Deepak Deshmukh (Data Engineering)', grain: 'Facility Level', cases: ['CASE-003'], description: 'Authoritative credit exposure table capturing drawn balances and legal entity borrower types.', keyFields: ['facility_id', 'obligor_id', 'drawn_amount', 'borrower_entity_type'] },
  { id: 'SYS-09', name: 'LIMITS_COMMITMENTS', category: 'Limits Management', owner: 'Deepak Deshmukh (Data Engineering)', grain: 'Facility Level', cases: ['CASE-003'], description: 'Limits and commitments master capturing undrawn credit lines, tenor, and CCF eligibility.', keyFields: ['facility_id', 'undrawn_commitment_bal', 'commitment_tenor_months', 'ccf'] },
  { id: 'SYS-10', name: 'EXTERNAL_RATING_FEED', category: 'Reference Data', owner: 'Manish Goel (Credit Rating Data Owner)', grain: 'Obligor Level', cases: ['CASE-003'], description: 'External credit rating agency feed (CRISIL, ICRA, CARE) with effective publication date validation.', keyFields: ['obligor_id', 'external_rating', 'rating_agency', 'rating_effective_date'] },
  { id: 'SYS-11', name: 'CAPITAL_ENGINE_OUTPUT', category: 'Regulatory Capital Engine', owner: 'Priya Sundaram (Risk Technology)', grain: 'Facility Calculation Level', cases: ['CASE-003'], description: 'Standardised Credit RWA engine calculation output tagged with immutable run version ID.', keyFields: ['facility_id', 'credit_equivalent_amount', 'risk_weight', 'rwa_amount', 'run_version_id'] },
];

export default function DataLabView() {
  const { navigateToCase } = useCreditRiskOS();
  const [activeTab, setActiveTab] = useState<'catalogue' | 'sttm' | 'dq' | 'investigations' | 'lineage'>('sttm');
  const [selectedCaseFilter, setSelectedCaseFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allMappings = getAllMappings();
  const allDefects = getAllDefects();
  const allInvestigations = getAllInvestigations();

  const filteredMappings = allMappings.filter((m) => {
    const matchesCase = selectedCaseFilter === 'ALL' || m.caseCode === selectedCaseFilter;
    const matchesQuery =
      searchQuery === '' ||
      m.item.targetField.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.item.sourceTable.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.item.transformationLogic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCase && matchesQuery;
  });

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 select-none font-sans">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <Database className="w-4 h-4" />
            <span>WORKSPACE 04 • DATA LAB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            CROSS-CASE DATA OPERATIONS & LINEAGE LAB
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Unified data catalogue, source-to-target mappings (STTM), data quality controls, and BCBS 239 lineage traceability across Case 01, Case 02, and Case 03.
          </p>
        </div>
      </div>

      {/* MODE TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveTab('sttm')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'sttm' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          01 · STTM Mapping Explorer ({allMappings.length})
        </button>

        <button
          onClick={() => setActiveTab('catalogue')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'catalogue' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          02 · Data Catalogue ({SYNTHETIC_SYSTEMS.length})
        </button>

        <button
          onClick={() => setActiveTab('dq')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'dq' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          03 · Data Quality Workbench ({allDefects.length})
        </button>

        <button
          onClick={() => setActiveTab('investigations')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'investigations' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          04 · Investigation Library ({allInvestigations.length})
        </button>
      </div>

      {/* TAB CONTENT 1: STTM MAPPING EXPLORER */}
      {activeTab === 'sttm' && (
        <div className="space-y-4">
          {/* SEARCH & FILTERS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-400">Filter Case:</span>
              {['ALL', 'CASE-2026-01', 'CASE-2026-02', 'CASE-2026-03'].map((code) => (
                <button
                  key={code}
                  onClick={() => setSelectedCaseFilter(code)}
                  className={`px-3 py-1 rounded-lg border font-bold ${
                    selectedCaseFilter === code
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border-white/5 hover:text-slate-200'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search mapping target field..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* MAPPINGS TABLE */}
          <div className="cros-glass-card rounded-2xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 text-cyan-400 border-b border-white/10 uppercase text-[10px]">
                    <th className="p-3">Case</th>
                    <th className="p-3">Source System / Table</th>
                    <th className="p-3">Target Field / Grain</th>
                    <th className="p-3">Transformation Logic</th>
                    <th className="p-3">DQ & Null Rules</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredMappings.map((m) => (
                    <tr key={m.item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 text-cyan-400 font-bold">{m.caseCode}</td>
                      <td className="p-3 space-y-0.5">
                        <div className="font-bold text-slate-200">{m.item.sourceSystem}</div>
                        <div className="text-[10px] text-slate-400">{m.item.sourceTable}.{m.item.sourceColumn}</div>
                      </td>
                      <td className="p-3 space-y-0.5">
                        <div className="font-bold text-emerald-400">{m.item.targetField}</div>
                        <div className="text-[10px] text-slate-400">{m.item.targetTable} ({m.item.grain})</div>
                      </td>
                      <td className="p-3 text-slate-300 font-sans text-xs max-w-xs">{m.item.transformationLogic}</td>
                      <td className="p-3 space-y-0.5 text-[11px]">
                        <div className="text-slate-300">DQ: {m.item.dqRule}</div>
                        <div className="text-slate-400 text-[10px]">Null: {m.item.nullRule}</div>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => navigateToCase(m.caseId)}
                          className="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold cursor-pointer"
                        >
                          View Case
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: DATA CATALOGUE */}
      {activeTab === 'catalogue' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
          {SYNTHETIC_SYSTEMS.map((sys) => (
            <div key={sys.id} className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-cyan-400 font-bold text-sm">{sys.name}</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px]">
                  {sys.category}
                </span>
              </div>
              <p className="text-slate-300 font-sans text-xs">{sys.description}</p>
              <div className="space-y-1 text-[11px] text-slate-400">
                <div>Owner: <strong className="text-slate-200">{sys.owner}</strong></div>
                <div>Grain: <strong className="text-slate-200">{sys.grain}</strong></div>
                <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500">Consuming Cases:</span>
                  {sys.cases.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-white/10 text-[10px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT 3: DATA QUALITY WORKBENCH */}
      {activeTab === 'dq' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 gap-3">
            {allDefects.map((def) => (
              <div key={def.item.id} className="cros-glass-card p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold">
                      {def.item.code}
                    </span>
                    <span className="text-cyan-400 font-bold">{def.caseCode}</span>
                    <span className="text-slate-400">• {def.item.severity}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 uppercase">{def.item.title}</h4>
                  <p className="text-xs text-slate-300 font-sans">{def.item.actualBehaviour}</p>
                </div>
                <button
                  onClick={() => navigateToCase(def.caseId)}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold uppercase text-[11px] whitespace-nowrap cursor-pointer"
                >
                  Remediate in Case
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: INVESTIGATION LIBRARY */}
      {activeTab === 'investigations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {allInvestigations.map((inv) => (
            <div key={inv.item.id} className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-cyan-400 font-bold">{inv.item.code} ({inv.caseCode})</span>
                <span className="text-slate-400 text-[10px] uppercase">RWA / Data Investigation</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 uppercase">{inv.item.title}</h4>
              <p className="text-xs text-slate-300 font-sans">{inv.item.description}</p>
              <div className="p-2.5 rounded bg-slate-950 border border-white/5 text-[10px] font-mono text-cyan-300 overflow-x-auto">
                {inv.item.sampleQuery}
              </div>
              <button
                onClick={() => navigateToCase(inv.caseId)}
                className="w-full py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold uppercase text-[10px] cursor-pointer"
              >
                Execute Investigation in Case Room
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
