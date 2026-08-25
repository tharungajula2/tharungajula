"use client";

import { useState } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import {
  getAllRequirements,
  getAllBusinessRules,
  getAllRtmChains,
  getAllStakeholders,
  getAllEvidence,
} from '../../_state/operatingSystemStore';
import {
  FileText,
  CheckCircle2,
  Users,
  Layers,
  Search,
  ArrowRight,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

export default function DeliveryStudioView() {
  const { navigateToCase } = useCreditRiskOS();
  const [activeTab, setActiveTab] = useState<'reqs' | 'rules' | 'rtm' | 'stakeholders' | 'evidence'>('reqs');
  const [selectedCaseFilter, setSelectedCaseFilter] = useState<string>('ALL');

  const allReqs = getAllRequirements();
  const allRules = getAllBusinessRules();
  const allRtm = getAllRtmChains();
  const allStk = getAllStakeholders();
  const allEv = getAllEvidence();

  const filteredReqs = allReqs.filter(
    (r) => selectedCaseFilter === 'ALL' || r.caseCode === selectedCaseFilter
  );

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 select-none font-sans">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <FileText className="w-4 h-4" />
            <span>WORKSPACE 04 • DELIVERY STUDIO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            LEAD BUSINESS ANALYST WORKSPACE & TRACEABILITY
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Authoritative requirements register, business rules, evidence repository, and end-to-end RTM traceability across Case 01, Case 02, and Case 03.
          </p>
        </div>
      </div>

      {/* MODE TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveTab('reqs')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'reqs' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          01 · Requirements Register ({allReqs.length})
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'rules' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          02 · Business Rules Register ({allRules.length})
        </button>

        <button
          onClick={() => setActiveTab('rtm')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'rtm' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          03 · End-to-End RTM Traceability ({allRtm.length})
        </button>

        <button
          onClick={() => setActiveTab('stakeholders')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'stakeholders' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          04 · Stakeholder Responsibility Matrix ({allStk.length})
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'evidence' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          05 · Evidence Repository ({allEv.length})
        </button>
      </div>

      {/* TAB CONTENT 1: REQUIREMENTS REGISTER */}
      {activeTab === 'reqs' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2">
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

          <div className="grid grid-cols-1 gap-4 font-sans text-xs">
            {filteredReqs.map((r) => (
              <div key={r.item.id} className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold text-xs">{r.item.id}</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px]">
                      {r.caseCode}
                    </span>
                    <span className="text-slate-400 text-[10px] uppercase">• {r.item.priority}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    {r.item.status}
                  </span>
                </div>

                <h3 className="text-base font-bold uppercase text-slate-100 font-mono">{r.item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{r.item.requirementText}</p>

                <div className="pt-2 border-t border-white/5 font-mono text-[11px] grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-400">
                  <div>Owner: <strong className="text-slate-200">{r.item.owner}</strong></div>
                  <div>Driver: <strong className="text-slate-200">{r.item.regulatoryDriver}</strong></div>
                  <div className="md:col-span-2 text-emerald-300">Acceptance Criteria: {r.item.acceptanceCriteria}</div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => navigateToCase(r.caseId)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold uppercase cursor-pointer"
                  >
                    View in {r.caseCode}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: BUSINESS RULES REGISTER */}
      {activeTab === 'rules' && (
        <div className="cros-glass-card rounded-2xl overflow-hidden border border-white/10 font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-cyan-400 border-b border-white/10 uppercase text-[10px]">
                  <th className="p-3">Case</th>
                  <th className="p-3">Rule Code</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Condition</th>
                  <th className="p-3">Output Classification</th>
                  <th className="p-3">Reason Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allRules.map((rule) => (
                  <tr key={rule.item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 text-cyan-400 font-bold">{rule.caseCode}</td>
                    <td className="p-3 font-bold text-slate-100">{rule.item.ruleCode}</td>
                    <td className="p-3 text-slate-300">{rule.item.category}</td>
                    <td className="p-3 font-mono text-cyan-300 text-[11px] max-w-xs">{rule.item.condition}</td>
                    <td className="p-3 text-emerald-300 font-sans text-xs">{rule.item.outputClassification}</td>
                    <td className="p-3 text-slate-400 text-[10px]">{rule.item.reasonCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: END-TO-END RTM TRACEABILITY */}
      {activeTab === 'rtm' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 gap-3 font-sans text-xs">
            {allRtm.map((chain) => (
              <div key={chain.item.id} className="cros-glass-card p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-cyan-400 font-bold">{chain.item.id} ({chain.caseCode})</span>
                  <span className="text-slate-400 text-[10px]">Owner: {chain.item.signoffOwner}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 font-mono text-[11px] pt-1">
                  <div className="p-2 rounded bg-slate-950 border border-white/5">
                    <span className="text-slate-500 block text-[9px] uppercase">DRIVER & REQ:</span>
                    <span className="text-slate-200">{chain.item.regulatoryDriver} ({chain.item.reqId})</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-white/5">
                    <span className="text-slate-500 block text-[9px] uppercase">RULE & MAPPING:</span>
                    <span className="text-cyan-300">{chain.item.ruleId} • {chain.item.mappingId}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-white/5">
                    <span className="text-slate-500 block text-[9px] uppercase">SOFTWARE COMPONENT:</span>
                    <span className="text-slate-300">{chain.item.component}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-white/5">
                    <span className="text-slate-500 block text-[9px] uppercase">UAT TEST & DEFECT:</span>
                    <span className="text-emerald-400">{chain.item.testId} {chain.item.defectId ? `(${chain.item.defectId})` : ''}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: STAKEHOLDER RESPONSIBILITY MATRIX */}
      {activeTab === 'stakeholders' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {allStk.map((stk) => (
            <div key={stk.item.id} className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-cyan-400 font-bold text-sm">{stk.item.name}</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px]">
                  {stk.caseCode}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-200 uppercase">{stk.item.title}</h4>
              <p className="text-[11px] text-slate-400 font-sans">{stk.item.department}</p>
              <p className="text-xs text-slate-300 font-sans pt-1">{stk.item.roleDescription}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT 5: EVIDENCE REPOSITORY */}
      {activeTab === 'evidence' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {allEv.map((ev) => (
            <div key={ev.item.id} className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-cyan-400 font-bold">{ev.item.code} ({ev.caseCode})</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] uppercase">
                  {ev.item.type}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 uppercase">{ev.item.title}</h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">{ev.item.summary}</p>
              <div className="pt-2 text-[10px] text-slate-400 border-t border-white/5">
                Provided By: <strong className="text-slate-200">{ev.item.providedBy}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
