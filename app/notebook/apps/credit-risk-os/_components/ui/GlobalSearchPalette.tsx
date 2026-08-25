"use client";

import { useState, useEffect, useMemo } from 'react';
import MiniSearch from 'minisearch';
import { useCreditRiskOS, NavSection } from '../../_state/creditRiskOSContext';
import {
  ALL_CASES,
  getAllRequirements,
  getAllBusinessRules,
  getAllMappings,
  getAllInvestigations,
  getAllDefects,
  getAllUatTests,
  getAllStakeholders,
} from '../../_state/operatingSystemStore';
import { SYNTHETIC_INDIA_FACILITIES, SYNTHETIC_INDIA_OBLIGORS } from '../../_data/indiaSyntheticBank';
import { Search, X, ChevronRight } from 'lucide-react';
import { WorkspaceId } from '../../_types';

export interface SearchDoc {
  id: string;
  title: string;
  category: 'Case' | 'Requirement' | 'Rule' | 'Mapping' | 'Investigation' | 'Defect' | 'UAT Test' | 'Stakeholder' | 'Facility' | 'Workspace';
  targetWorkspace: WorkspaceId;
  targetCaseId?: string;
  description: string;
}

export default function GlobalSearchPalette() {
  const {
    isSearchPaletteOpen,
    setIsSearchPaletteOpen,
    navigateToCase,
    navigateToWorkspace,
  } = useCreditRiskOS();

  const [query, setQuery] = useState('');

  // Assemble index document corpus across all 3 cases
  const searchDocs: SearchDoc[] = useMemo(() => {
    const docs: SearchDoc[] = [
      { id: 'sec-cmd', title: '01 · Command Centre', category: 'Workspace', targetWorkspace: 'command-centre', description: 'Executive bank status, active work queue, operating pulse, and workspace pathways.' },
      { id: 'sec-csr', title: '02 · Case Room', category: 'Workspace', targetWorkspace: 'case-room', description: 'End-to-end simulated bank transformation assignments and consulting cases.' },
      { id: 'sec-dat', title: '03 · Data Lab', category: 'Workspace', targetWorkspace: 'data-lab', description: 'STTM mapping explorer, data quality workbench, data catalogue, and BCBS 239 lineage.' },
      { id: 'sec-del', title: '04 · Delivery Studio', category: 'Workspace', targetWorkspace: 'delivery-studio', description: 'Lead BA workspace, BRD requirements register, business rules, and RTM traceability.' },
      { id: 'sec-tst', title: '05 · Test & Release', category: 'Workspace', targetWorkspace: 'test-release', description: 'Release Control Tower, UAT test suite execution, defect remediation register, and sign-offs.' },
      { id: 'sec-rsk', title: '06 · Risk Engine', category: 'Workspace', targetWorkspace: 'risk-engine', description: 'Domain calculation workbench (IRACP, Treasury FTP, RBI Basel III Capital, Stress Test).' },
    ];

    // Add Cases
    ALL_CASES.forEach((c) => {
      docs.push({
        id: `case-${c.caseId}`,
        title: `${c.definition.metadata.code} — ${c.definition.metadata.title}`,
        category: 'Case',
        targetWorkspace: 'case-room',
        targetCaseId: c.caseId,
        description: c.definition.metadata.problemStatement,
      });
    });

    // Add Requirements
    getAllRequirements().forEach((r) => {
      docs.push({
        id: `req-${r.item.id}`,
        title: `${r.item.id} — ${r.item.title} (${r.caseCode})`,
        category: 'Requirement',
        targetWorkspace: 'delivery-studio',
        targetCaseId: r.caseId,
        description: r.item.requirementText,
      });
    });

    // Add Rules
    getAllBusinessRules().forEach((ru) => {
      docs.push({
        id: `rule-${ru.item.id}`,
        title: `${ru.item.ruleCode} — ${ru.item.outputClassification} (${ru.caseCode})`,
        category: 'Rule',
        targetWorkspace: 'delivery-studio',
        targetCaseId: ru.caseId,
        description: `Condition: ${ru.item.condition} -> Reason: ${ru.item.reasonCode}`,
      });
    });

    // Add Mappings
    getAllMappings().forEach((m) => {
      docs.push({
        id: `map-${m.item.id}`,
        title: `${m.item.targetField} (${m.caseCode})`,
        category: 'Mapping',
        targetWorkspace: 'data-lab',
        targetCaseId: m.caseId,
        description: `Source: ${m.item.sourceSystem}.${m.item.sourceTable}.${m.item.sourceColumn} -> Transformation: ${m.item.transformationLogic}`,
      });
    });

    // Add Investigations
    getAllInvestigations().forEach((inv) => {
      docs.push({
        id: `inv-${inv.item.id}`,
        title: `${inv.item.code} — ${inv.item.title} (${inv.caseCode})`,
        category: 'Investigation',
        targetWorkspace: 'data-lab',
        targetCaseId: inv.caseId,
        description: inv.item.description,
      });
    });

    // Add Defects
    getAllDefects().forEach((def) => {
      docs.push({
        id: `def-${def.item.id}`,
        title: `${def.item.code} — ${def.item.title} (${def.caseCode})`,
        category: 'Defect',
        targetWorkspace: 'test-release',
        targetCaseId: def.caseId,
        description: `Severity: ${def.item.severity} | Actual: ${def.item.actualBehaviour}`,
      });
    });

    // Add UAT Tests
    getAllUatTests().forEach((t) => {
      docs.push({
        id: `uat-${t.item.id}`,
        title: `${t.item.code} — ${t.item.title} (${t.caseCode})`,
        category: 'UAT Test',
        targetWorkspace: 'test-release',
        targetCaseId: t.caseId,
        description: `Expected: ${t.item.expectedResult} | Status: ${t.item.status}`,
      });
    });

    // Add Stakeholders
    getAllStakeholders().forEach((stk) => {
      docs.push({
        id: `stk-${stk.item.id}`,
        title: `${stk.item.name} — ${stk.item.title} (${stk.caseCode})`,
        category: 'Stakeholder',
        targetWorkspace: 'delivery-studio',
        targetCaseId: stk.caseId,
        description: `${stk.item.department} | Role: ${stk.item.roleDescription}`,
      });
    });

    // Add Facilities
    SYNTHETIC_INDIA_FACILITIES.forEach((f) => {
      docs.push({
        id: `fac-${f.id}`,
        title: `${f.facilityNumber} — ${f.obligorName}`,
        category: 'Facility',
        targetWorkspace: 'risk-engine',
        description: `Limit: ₹${f.sanctionedLimitInrCr} Cr, Drawn: ₹${f.outstandingInrCr} Cr, Status: ${f.assetQualityStatus}, Product: ${f.product}`,
      });
    });

    return docs;
  }, []);

  // Initialize MiniSearch engine
  const miniSearch = useMemo(() => {
    const ms = new MiniSearch<SearchDoc>({
      fields: ['title', 'category', 'description'],
      storeFields: ['id', 'title', 'category', 'targetWorkspace', 'targetCaseId', 'description'],
      searchOptions: {
        fuzzy: 0.2,
        prefix: true,
      },
    });
    ms.addAll(searchDocs);
    return ms;
  }, [searchDocs]);

  // Keyboard shortcut Ctrl/Cmd + K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchPaletteOpen(!isSearchPaletteOpen);
      }
      if (e.key === 'Escape' && isSearchPaletteOpen) {
        setIsSearchPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchPaletteOpen, setIsSearchPaletteOpen]);

  if (!isSearchPaletteOpen) return null;

  const searchResults = query.trim().length > 0
    ? (miniSearch.search(query) as unknown as SearchDoc[])
    : searchDocs.slice(0, 8);

  const handleSelectResult = (doc: SearchDoc) => {
    if (doc.targetCaseId) {
      navigateToCase(doc.targetCaseId);
    } else {
      navigateToWorkspace(doc.targetWorkspace);
    }
    setIsSearchPaletteOpen(false);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsSearchPaletteOpen(false);
      }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-16 px-4 select-none animate-in fade-in duration-200 text-slate-100 font-sans"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Global Search Palette"
        className="bg-[#0f172a] border border-cyan-500/40 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden font-mono text-xs flex flex-col max-h-[80vh]"
      >
        {/* INPUT HEADER */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-slate-900/90">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Search defects (DEF-FTP-002), REQs (REQ-CAP-004), facilities (MUM-CRE-8801), stakeholders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            aria-label="Global Search Query"
            className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none text-xs font-mono"
          />
          <button
            onClick={() => setIsSearchPaletteOpen(false)}
            aria-label="Close search palette"
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* RESULTS LIST */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 no-scrollbar">
          <div className="px-2 py-1 text-[10px] text-slate-400 uppercase font-bold flex items-center justify-between">
            <span>{query ? `SEARCH RESULTS (${searchResults.length})` : 'CROSS-CASE OPERATING SEARCH'}</span>
            <span className="text-[9px]">Press ESC to exit</span>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No matching records found for "{query}". Try searching for <strong className="text-cyan-400">DEF-FTP-002</strong>, <strong className="text-cyan-400">MUM-CRE-8801</strong>, or <strong className="text-cyan-400">REQ-CAP-004</strong>.
            </div>
          ) : (
            searchResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelectResult(result)}
                className="w-full p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-500/40 text-left transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="space-y-1 truncate">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold text-[9px] uppercase border border-cyan-500/20">
                      {result.category}
                    </span>
                    <span className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors text-xs truncate">
                      {result.title}
                    </span>
                  </div>
                  <p className="text-slate-400 font-sans text-[11px] truncate">{result.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="h-10 border-t border-white/10 px-4 flex items-center justify-between bg-slate-950 font-mono text-[10px] text-slate-400">
          <span>CREDIT RISK OS OPERATING SEARCH ENGINE</span>
          <span>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-white/10 text-slate-300">Ctrl + K</kbd></span>
        </div>
      </div>
    </div>
  );
}
