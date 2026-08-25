"use client";

import { Compass, ArrowRight } from 'lucide-react';
import { CasePhase, ExperienceMode } from '../types';

interface Props {
  mode: ExperienceMode;
  currentPhase: CasePhase;
  reviewedEvidenceCount: number;
  totalEvidenceCount: number;
  completedInvCount: number;
  totalInvCount: number;
  openBlockerDefectsCount: number;
  totalOpenDefectsCount: number;
  failedUatCount: number;
  totalUatCount: number;
  isReconciled: boolean;
  approvedSignoffsCount: number;
  totalSignoffsCount: number;
  onActionClick?: () => void;
}

export default function NextBestActionBanner({
  mode,
  currentPhase,
  reviewedEvidenceCount,
  totalEvidenceCount,
  completedInvCount,
  totalInvCount,
  openBlockerDefectsCount,
  totalOpenDefectsCount,
  failedUatCount,
  totalUatCount,
  isReconciled,
  approvedSignoffsCount,
  totalSignoffsCount,
  onActionClick,
}: Props) {
  if (mode === 'Independent') return null;

  // DERIVE HIGHEST PRIORITY NEXT ACTION DYNAMICALLY FROM CASE STATE
  let recommendation = '';
  let targetTabLabel = '';

  if (reviewedEvidenceCount < totalEvidenceCount) {
    recommendation = `Review remaining evidence pack (${reviewedEvidenceCount}/${totalEvidenceCount} completed) to ground your domain understanding.`;
    targetTabLabel = 'GO TO EVIDENCE PACK';
  } else if (completedInvCount < totalInvCount) {
    recommendation = `Execute remaining RWA/data investigation tasks (${completedInvCount}/${totalInvCount} completed) to pinpoint root causes.`;
    targetTabLabel = 'GO TO INVESTIGATION';
  } else if (openBlockerDefectsCount > 0) {
    recommendation = `${openBlockerDefectsCount} Blocker/Critical defect(s) remain open. Remediate code/data flaws in UAT & Defects.`;
    targetTabLabel = 'GO TO UAT & DEFECTS';
  } else if (!isReconciled) {
    recommendation = `Risk-to-Finance multi-stage reconciliation has gross breaks. Verify zero-variance balance alignment.`;
    targetTabLabel = 'GO TO RECONCILIATION';
  } else if (failedUatCount > 0) {
    recommendation = `${failedUatCount} UAT test case(s) failing. Re-run tests to confirm 100% pass state.`;
    targetTabLabel = 'GO TO UAT PACK';
  } else if (approvedSignoffsCount < totalSignoffsCount) {
    recommendation = `All blocking technical controls clear. Secure final Steering Committee sign-offs (${approvedSignoffsCount}/${totalSignoffsCount}).`;
    targetTabLabel = 'GO TO RELEASE SIGN-OFF';
  } else {
    recommendation = `All governance criteria passed! Case is ready for final production release sign-off.`;
    targetTabLabel = 'COMPLETE CASE';
  }

  return (
    <div className="cros-glass-card p-3.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs select-none">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
          <Compass className="w-4 h-4 animate-spin-slow" />
        </div>
        <div>
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
            RECOMMENDED NEXT ACTION // {mode.toUpperCase()} MODE
          </span>
          <p className="text-slate-200 font-sans text-xs font-medium leading-snug">{recommendation}</p>
        </div>
      </div>

      {onActionClick && (
        <button
          onClick={onActionClick}
          className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-md"
        >
          <span>{targetTabLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
