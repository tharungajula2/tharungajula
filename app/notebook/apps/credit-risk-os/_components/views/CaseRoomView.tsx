"use client";

import { useState, useEffect } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { Briefcase, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import Case01Workspace from '../../_cases/case01/Case01Workspace';
import Case02Workspace from '../../_cases/case02/Case02Workspace';
import Case03Workspace from '../../_cases/case03/Case03Workspace';
import { CASE_REGISTRY } from '../../_cases/_framework/caseRegistry';

export default function CaseRoomView() {
  const { setActiveWorkspace, setActiveSubTool, activeTargetCaseId, setActiveTargetCaseId } = useCreditRiskOS();
  const [activeCaseId, setActiveCaseId] = useState<string | null>(activeTargetCaseId);

  useEffect(() => {
    if (activeTargetCaseId) {
      setActiveCaseId(activeTargetCaseId);
    }
  }, [activeTargetCaseId]);

  const handleBackToCaseRoom = () => {
    setActiveCaseId(null);
    setActiveTargetCaseId(null);
  };

  if (activeCaseId === 'CASE-2026-01' || activeCaseId === 'CASE-001') {
    return <Case01Workspace onBackToCaseRoom={handleBackToCaseRoom} />;
  }

  if (activeCaseId === 'CASE-2026-02' || activeCaseId === 'CASE-002') {
    return <Case02Workspace onBackToCaseRoom={handleBackToCaseRoom} />;
  }

  if (activeCaseId === 'CASE-2026-03' || activeCaseId === 'CASE-003') {
    return <Case03Workspace onBackToCaseRoom={handleBackToCaseRoom} />;
  }

  const caseCards = [
    {
      id: 'CASE-2026-01',
      title: CASE_REGISTRY[0].title,
      category: CASE_REGISTRY[0].category,
      status: 'REFERENCE & ACTIVE',
      description: CASE_REGISTRY[0].description,
      targetTool: 'iracp' as const,
      deliverables: ['IRACP DPD Matrix Audit', 'Secured vs Unsecured Provisioning Model', 'Internal EL vs IRACP Reconciliation'],
    },
    {
      id: 'CASE-2026-02',
      title: CASE_REGISTRY[1].title,
      category: CASE_REGISTRY[1].category,
      status: 'ASSIGNED & ACTIVE',
      description: CASE_REGISTRY[1].description,
      targetTool: 'treasury' as const,
      deliverables: ['STTM Data Lineage Audit', 'FTP Rate Component Breakdown', 'Multi-Stage Balance Reconciliation'],
    },
    {
      id: 'CASE-2026-03',
      title: CASE_REGISTRY[2].title,
      category: CASE_REGISTRY[2].category,
      status: 'ASSIGNED & ACTIVE',
      description: CASE_REGISTRY[2].description,
      targetTool: 'capital' as const,
      deliverables: ['RBI Basel III Credit RWA Audit', 'Off-Balance Sheet CCF & CRM Model', 'Whole-Bank CET1 & CRAR Reconciliation'],
    },
  ];

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 select-none font-sans">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <Briefcase className="w-4 h-4" />
            <span>WORKSPACE 02 • CASE ROOM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            BANKING & CONSULTING CASE ROOM
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            End-to-end simulated bank transformation assignments connecting credit risk analytics, RBI IRACP asset quality, treasury ALM, prudential regulatory capital and change delivery.
          </p>
        </div>
      </div>

      {/* CASES GRID */}
      <div className="grid grid-cols-1 gap-5">
        {caseCards.map((c) => (
          <div
            key={c.id}
            className="cros-glass-card p-6 rounded-2xl space-y-4 border border-cyan-500/50 bg-cyan-500/5 hover:border-cyan-500 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <span className="text-cyan-400 font-bold tracking-wider">{c.id} • {c.category}</span>
              <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-semibold tracking-wider">
                {c.status}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold uppercase text-slate-100">{c.title}</h2>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">{c.description}</p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                MANDATORY CASE DELIVERABLES:
              </span>
              <div className="flex flex-wrap gap-2">
                {c.deliverables.map((d) => (
                  <span
                    key={d}
                    className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-white/10 font-mono text-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{d}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  setActiveWorkspace('risk-engine');
                  setActiveSubTool(c.targetTool);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
              >
                <span>OPEN SUB-TOOL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveCaseId(c.id)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>LAUNCH FULL CASE WORKSPACE</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
