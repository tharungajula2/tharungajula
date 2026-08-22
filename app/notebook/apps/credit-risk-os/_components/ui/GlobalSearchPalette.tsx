"use client";

import { useState, useEffect, useMemo } from 'react';
import MiniSearch from 'minisearch';
import { useCreditRiskOS, NavSection } from '../../_state/creditRiskOSContext';
import { SYNTHETIC_FACILITIES, SYNTHETIC_OBLIGORS } from '../../_data/syntheticBank';
import { LEARN_CARDS } from '../../_data/learnDatabase';
import { Search, X, ChevronRight, FileText, Database, Shield, Layers } from 'lucide-react';

export interface SearchDoc {
  id: string;
  title: string;
  category: 'Workspace' | 'Facility' | 'Obligor' | 'Concept' | 'Report';
  section: NavSection;
  description: string;
  facilityId?: string;
}

export default function GlobalSearchPalette() {
  const {
    isSearchPaletteOpen,
    setIsSearchPaletteOpen,
    setActiveSection,
    setSelectedFacilityId,
    setSelectedCustomerId,
  } = useCreditRiskOS();

  const [query, setQuery] = useState('');

  // Assemble index document corpus
  const searchDocs: SearchDoc[] = useMemo(() => {
    const docs: SearchDoc[] = [
      { id: 'sec-bnk', title: 'Bank Command Centre', category: 'Workspace', section: 'bank', description: 'Executive balance sheet KPIs, carrying ECL, RWA totals, and watchlist exception alerts.' },
      { id: 'sec-cst', title: 'Customers 360', category: 'Workspace', section: 'customers', description: 'Searchable obligor portfolio, facility limits, drawn commitments, internal ratings, and staging.' },
      { id: 'sec-rsk', title: 'Credit Risk & Rating Distribution', category: 'Workspace', section: 'credit-risk', description: 'Internal rating distribution (AAA to D), PD, LGD, EAD parameters, and UK sector concentration.' },
      { id: 'sec-ecl', title: 'IFRS 9 Staging & ECL Engine', category: 'Workspace', section: 'ifrs9', description: 'Stage 1, Stage 2 (SICR), & Stage 3 (Credit-impaired) classification and 5-year ECL term structure.' },
      { id: 'sec-cap', title: 'Regulatory Capital & Basel 3.1', category: 'Workspace', section: 'capital', description: 'Standardised RWA vs Advanced IRB comparison, 72.5% Basel 3.1 output floor, and CET1 ratio.' },
      { id: 'sec-trs', title: 'Treasury & Liquidity Management', category: 'Workspace', section: 'treasury', description: 'Liquidity Coverage Ratio (LCR), Net Stable Funding Ratio (NSFR), and Funds Transfer Pricing (FTP).' },
      { id: 'sec-rep', title: 'Regulatory Reporting Control Room', category: 'Workspace', section: 'reporting', description: 'COREP C 07.00/09.01, FINREP F 01.01/18.00, cycle control, validation rules, and reconciliations.' },
      { id: 'sec-dat', title: 'BCBS 239 Data Governance & Lineage', category: 'Workspace', section: 'data', description: 'Source-to-target data lineage, Critical Data Elements (CDE), data quality rules, and SQL Lab.' },
      { id: 'sec-chg', title: 'BA Delivery & Change Management', category: 'Workspace', section: 'change', description: 'End-to-end traceability: Regulatory Driver → Requirement → Business Rules → Story → UAT → Release.' },
      { id: 'sec-reg', title: 'UK Regulatory Rulebook & Principles', category: 'Workspace', section: 'regulation', description: 'PRA Rulebook, Basel 3.1, IFRS 9, BCBS 239, and EBA GL on Origination.' },
      { id: 'sec-sim', title: 'Macroeconomic Simulation Lab', category: 'Workspace', section: 'simulation-lab', description: 'Stress test scenarios (GDP shocks, property crashes, rating migrations) and CET1 impacts.' },
    ];

    // Add facilities
    SYNTHETIC_FACILITIES.forEach((f) => {
      docs.push({
        id: `fac-${f.id}`,
        title: `${f.facilityNumber} — ${f.obligorName}`,
        category: 'Facility',
        section: 'customers',
        description: `Limit: £${(f.limitGBP/1e6).toFixed(1)}M, Drawn: £${(f.drawnGBP/1e6).toFixed(1)}M, Stage ${f.ifrs9Stage}, Product: ${f.product}`,
        facilityId: f.id,
      });
    });

    // Add obligors
    SYNTHETIC_OBLIGORS.forEach((o) => {
      docs.push({
        id: `obl-${o.id}`,
        title: `${o.name} (${o.internalRating})`,
        category: 'Obligor',
        section: 'customers',
        description: `Sector: ${o.sector}, Geography: ${o.geography}, Annual Turnover: £${(o.annualTurnoverGBP/1e6).toFixed(1)}M`,
      });
    });

    // Add Learn concepts
    LEARN_CARDS.forEach((c) => {
      docs.push({
        id: `cpt-${c.id}`,
        title: c.title,
        category: 'Concept',
        section: c.section,
        description: c.whatItIs,
      });
    });

    return docs;
  }, []);

  // Initialize MiniSearch engine
  const miniSearch = useMemo(() => {
    const ms = new MiniSearch<SearchDoc>({
      fields: ['title', 'category', 'description'],
      storeFields: ['id', 'title', 'category', 'section', 'description', 'facilityId'],
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
    : searchDocs.slice(0, 8); // Default suggestions

  const handleSelectResult = (doc: SearchDoc) => {
    setActiveSection(doc.section);
    if (doc.facilityId) {
      setSelectedFacilityId(doc.facilityId);
    }
    setIsSearchPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start justify-center pt-16 px-4 select-none animate-in fade-in duration-200">
      <div className="bg-surface-raised/98 border-2 border-accent/60 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden font-mono text-xs text-ink flex flex-col max-h-[80vh]">
        {/* INPUT HEADER */}
        <div className="p-4 border-b border-hairline flex items-center gap-3 bg-surface-raised">
          <Search className="w-4 h-4 text-accent shrink-0" />
          <input
            type="text"
            placeholder="Search workspaces, facilities (MID-CRE-4403), concepts (PD, ECL, RWA, LCR), reports..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-ink placeholder:text-ink-faint focus:outline-none text-xs font-mono"
          />
          <button
            onClick={() => setIsSearchPaletteOpen(false)}
            className="p-1 rounded hover:bg-surface-sunken text-ink-muted hover:text-ink cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* RESULTS LIST */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 no-scrollbar">
          <div className="px-2 py-1 text-[10px] text-ink-faint uppercase font-bold flex items-center justify-between">
            <span>{query ? `SEARCH RESULTS (${searchResults.length})` : 'POPULAR COMMANDS & SEARCH SUGGESTIONS'}</span>
            <span className="text-[9px]">Press ESC to exit</span>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-8 text-center text-ink-muted">
              No matching records found for "{query}". Try searching for <strong className="text-accent">PD</strong>, <strong className="text-accent">MID-CRE-4403</strong>, or <strong className="text-accent">RWA</strong>.
            </div>
          ) : (
            searchResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelectResult(result)}
                className="w-full p-3 rounded-xl bg-surface-sunken hover:bg-accent/15 border border-hairline-faint hover:border-accent/40 text-left transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="space-y-1 truncate">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-bold text-[9px] uppercase">
                      {result.category}
                    </span>
                    <span className="font-bold text-ink group-hover:text-accent transition-colors text-xs truncate">
                      {result.title}
                    </span>
                  </div>
                  <p className="text-ink-muted font-sans text-[11px] truncate">{result.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-ink-faint uppercase font-semibold">{result.section}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="h-10 border-t border-hairline px-4 flex items-center justify-between bg-surface-raised font-mono text-[10px] text-ink-faint">
          <span>MINISEARCH INDEX ACTIVE</span>
          <span>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-surface-sunken border border-hairline-faint text-ink">Ctrl + K</kbd></span>
        </div>
      </div>
    </div>
  );
}
