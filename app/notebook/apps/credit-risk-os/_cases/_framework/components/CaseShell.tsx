"use client";

import React, { useState } from 'react';
import { CaseDefinition, CasePhase, CapabilityScores, ExperienceMode } from '../types';
import { Briefcase, ArrowLeft, Activity, Award, ShieldCheck, Settings } from 'lucide-react';
import NextBestActionBanner from './NextBestActionBanner';
import DecisionReviewModal from './DecisionReviewModal';
import CaseCompletionDebriefModal from './CaseCompletionDebriefModal';

export type StandardTabId =
  | 'overview'
  | 'stakeholders'
  | 'evidence'
  | 'current-state'
  | 'requirements'
  | 'data-mapping'
  | 'investigation'
  | 'target-state'
  | 'uat-defects'
  | 'reconciliation'
  | 'sign-off';

export interface TabConfig {
  id: StandardTabId;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
}

interface Props {
  caseDefinition: CaseDefinition;
  currentPhase: CasePhase;
  capabilityScores: CapabilityScores;
  tabs: TabConfig[];
  activeTab: StandardTabId;
  onTabChange: (tab: StandardTabId) => void;
  onBackToCaseRoom: () => void;
  mode?: ExperienceMode;
  onModeChange?: (mode: ExperienceMode) => void;
  reviewedEvidenceCount?: number;
  completedInvCount?: number;
  openBlockerDefectsCount?: number;
  totalOpenDefectsCount?: number;
  failedUatCount?: number;
  totalUatCount?: number;
  isReconciled?: boolean;
  approvedSignoffsCount?: number;
  totalSignoffsCount?: number;
  children: React.ReactNode;
}

export default function CaseShell({
  caseDefinition,
  currentPhase,
  capabilityScores,
  tabs,
  activeTab,
  onTabChange,
  onBackToCaseRoom,
  mode = 'Assisted',
  onModeChange,
  reviewedEvidenceCount = 2,
  completedInvCount = 0,
  openBlockerDefectsCount = 2,
  totalOpenDefectsCount = 5,
  failedUatCount = 5,
  totalUatCount = 16,
  isReconciled = false,
  approvedSignoffsCount = 0,
  totalSignoffsCount = 5,
  children,
}: Props) {
  const { metadata } = caseDefinition;
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);

  return (
    <div className="w-full min-h-full flex flex-col select-none text-slate-100 font-sans">
      {/* ─── TOP WORKSPACE HEADER BAR ─── */}
      <div className="bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCaseRoom}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-mono flex items-center gap-1"
            title="Return to Case Room"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Case Room</span>
          </button>

          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4 animate-pulse" />
              <span>{metadata.code} • {metadata.type}</span>
            </div>
            <h1 className="text-lg font-black uppercase text-white font-mono tracking-tight">
              {metadata.title}
            </h1>
          </div>
        </div>

        {/* CONTROLS: MODE SELECTOR & DECISION REVIEW BUTTON */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {/* MODE TOGGLE */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-white/10 p-0.5 text-[11px]">
            {(['Guided', 'Assisted', 'Independent'] as ExperienceMode[]).map((m) => (
              <button
                key={m}
                onClick={() => onModeChange?.(m)}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer font-bold ${
                  mode === m
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsDecisionModalOpen(true)}
            className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold uppercase text-[11px] flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DEFEND THE DECISION</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>DYNAMIC SCORE: {capabilityScores.overall}%</span>
          </div>
        </div>
      </div>

      {/* NEXT-BEST-ACTION BANNER IN GUIDED & ASSISTED MODES */}
      <div className="px-4 sm:px-6 pt-3">
        <NextBestActionBanner
          mode={mode}
          currentPhase={currentPhase}
          reviewedEvidenceCount={reviewedEvidenceCount}
          totalEvidenceCount={caseDefinition.evidence.length}
          completedInvCount={completedInvCount}
          totalInvCount={caseDefinition.investigationTasks.length}
          openBlockerDefectsCount={openBlockerDefectsCount}
          totalOpenDefectsCount={totalOpenDefectsCount}
          failedUatCount={failedUatCount}
          totalUatCount={totalUatCount}
          isReconciled={isReconciled}
          approvedSignoffsCount={approvedSignoffsCount}
          totalSignoffsCount={totalSignoffsCount}
          onActionClick={() => {
            if (reviewedEvidenceCount < caseDefinition.evidence.length) onTabChange('evidence');
            else if (completedInvCount < caseDefinition.investigationTasks.length) onTabChange('investigation');
            else if (openBlockerDefectsCount > 0) onTabChange('uat-defects');
            else if (!isReconciled) onTabChange('reconciliation');
            else if (approvedSignoffsCount < totalSignoffsCount) onTabChange('sign-off');
          }}
        />
      </div>

      {/* ─── CASE SUB-NAV TAB STRIP ─── */}
      <div className="bg-[#0b0f19] border-b border-white/10 px-4 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0 mt-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer font-mono text-xs uppercase tracking-tight whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                  : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-cyan-500/30 text-[9px] font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ─── ACTIVE SECTION CANVAS ─── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</div>

      {/* DECISION REVIEW MODAL */}
      <DecisionReviewModal
        caseCode={metadata.code}
        isOpen={isDecisionModalOpen}
        onClose={() => setIsDecisionModalOpen(false)}
      />
    </div>
  );
}
