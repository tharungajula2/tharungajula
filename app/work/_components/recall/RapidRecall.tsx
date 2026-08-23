"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import MasterclassReader from "@/components/masterclass/MasterclassReader";
import { recallItems, projectFlowsList, compactMetricCards, RecallItem } from "../../_data/recall";

const categories = [
  "All",
  "Credit Risk",
  "BA / Data",
  "ML",
  "Time Series",
  "Portfolio",
  "Equity",
  "Product / AI",
  "Build",
];

type ViewMode = "ALL" | "FORMULAS" | "VS" | "TRAPS" | "FLOWS";

export default function RapidRecall() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("ALL");

  const filteredItems = useMemo(() => {
    return recallItems.filter((item) => {
      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      // View mode filter
      if (viewMode === "FORMULAS" && !item.formula) return false;
      if (viewMode === "VS" && !item.comparison) return false;
      if (viewMode === "TRAPS" && !item.trap) return false;

      // Search filter
      if (search.trim() !== "") {
        const query = search.toLowerCase();
        const matchTerm = item.term.toLowerCase().includes(query);
        const matchAcronym = item.acronym?.toLowerCase().includes(query);
        const matchMeaning = item.meaning.toLowerCase().includes(query);
        const matchRemember = item.remember.toLowerCase().includes(query);
        const matchProject = item.project.toLowerCase().includes(query);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(query));
        return matchTerm || matchAcronym || matchMeaning || matchRemember || matchProject || matchTags;
      }

      return true;
    });
  }, [search, selectedCategory, viewMode]);

  const snapshot = [
    { label: "Searchable Concepts", value: "35+ Core Terms" },
    { label: "View Modes", value: "Formulas, Traps, Flows" },
    { label: "Primary Objective", value: "Rapid Retrieval" },
  ];

  return (
    <MasterclassReader
      slug="recall"
      title="Rapid Recall"
      subtitle="How to recover formulas, distinctions, traps and project flows quickly after learning the full material."
      metadataLine="Searchable Reference Index · Categories: Credit Risk, BA/Data, ML, Time Series, Portfolio, Equity, AI, Build"
      snapshotItems={snapshot}
    >
      {/* SEARCH INPUT */}

      {/* SEARCH INPUT */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search PD, recall, SARIMA, covariance, RAG, tracking error..."
          className="w-full bg-surface-raised border border-hairline focus:border-accent text-ink px-4 py-3 rounded-xl font-mono text-sm shadow-sm outline-none transition-all placeholder:text-ink-faint"
        />
      </div>

      {/* VIEW MODES & CATEGORY FILTERS */}
      <div className="flex flex-col gap-3 mb-8">
        {/* VIEW MODE TOGGLES */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-ink-muted font-bold mr-2 uppercase">VIEW MODE:</span>
          {(["ALL", "FORMULAS", "VS", "TRAPS", "FLOWS"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                viewMode === mode
                  ? "bg-accent text-surface-dark shadow-sm"
                  : "bg-surface-raised text-ink-muted border border-hairline hover:text-ink"
              }`}
            >
              {mode === "ALL" && "ALL TERMS"}
              {mode === "FORMULAS" && "FORMULAS"}
              {mode === "VS" && "X VS Y"}
              {mode === "TRAPS" && "TRAPS"}
              {mode === "FLOWS" && "MASTER FLOWS"}
            </button>
          ))}
        </div>

        {/* CATEGORY FILTERS */}
        {viewMode !== "FLOWS" && (
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? "bg-accent/20 text-accent border border-accent/40 font-bold"
                    : "bg-surface-raised text-ink-muted border border-hairline hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* COMPACT METRIC CARDS */}
      {viewMode === "ALL" && !search && selectedCategory === "All" && (
        <div className="mb-10 bg-surface-raised border border-hairline p-5 rounded-2xl">
          <div className="text-xs font-mono text-accent uppercase tracking-widest font-bold mb-3">
            // PROJECT HEADLINE NUMBERS & BOUNDARIES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
            {compactMetricCards.map((card) => (
              <Link
                key={card.project}
                href={card.href}
                className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint hover:border-accent-dim transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-ink">{card.project}</span>
                  <span className="text-[10px] text-accent font-bold">Open →</span>
                </div>
                <span className="text-[11px] text-ink-muted leading-snug">{card.stats}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* MASTER FLOWS VIEW */}
      {viewMode === "FLOWS" && (
        <div className="space-y-3 mb-10 font-mono text-xs">
          <div className="text-xs text-accent font-bold uppercase tracking-widest mb-2">
            // RECONSTRUCT THE PROJECT MASTER FLOWS
          </div>
          {projectFlowsList.map((pf) => (
            <div key={pf.project} className="bg-surface-raised border border-hairline p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-ink block text-sm mb-1">{pf.project}</span>
                <span className="text-accent text-xs">{pf.flow}</span>
              </div>
              <Link href={pf.href} className="px-3 py-1 rounded bg-accent/15 text-accent border border-accent/30 text-[11px] font-bold shrink-0 self-start sm:self-center">
                Explore Project →
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* RECALL CARDS GRID */}
      {viewMode !== "FLOWS" && (
        <div className="space-y-4">
          <div className="text-xs font-mono text-ink-muted">
            Showing {filteredItems.length} concept terms
          </div>

          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-surface-raised border border-hairline p-5 rounded-2xl hover:border-accent/40 transition-all font-mono text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-ink">{item.term}</span>
                  {item.acronym && (
                    <span className="px-2 py-0.5 rounded bg-accent/15 text-accent text-[10px] font-bold">
                      {item.acronym}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-sunken border border-hairline text-[10px] text-ink-muted">
                    {item.project}
                  </span>
                  <Link
                    href={item.href}
                    className="text-accent hover:underline text-[11px] font-bold"
                  >
                    Open project →
                  </Link>
                </div>
              </div>

              {/* Meaning */}
              <p className="text-sm text-ink-muted leading-relaxed mb-2 font-sans">
                {item.meaning}
              </p>

              {/* Memory Rule */}
              <div className="bg-surface-sunken p-2.5 rounded-lg border border-hairline-faint text-accent font-semibold mb-2">
                REMEMBER: {item.remember}
              </div>

              {/* Formula if present */}
              {item.formula && (
                <div className="bg-accent/10 border border-accent/30 p-2 rounded text-accent font-bold mb-2">
                  FORMULA: {item.formula}
                </div>
              )}

              {/* Comparison if present */}
              {item.comparison && (
                <div className="bg-indigo-500/10 border border-indigo-500/30 p-2 rounded text-indigo-300 mb-2">
                  <strong>VS {item.comparison.vsTerm.toUpperCase()}:</strong> {item.comparison.diff}
                </div>
              )}

              {/* Trap if present */}
              {item.trap && (
                <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded text-amber-300 mb-2">
                  <div className="text-rose-400">✗ WRONG: {item.trap.wrong}</div>
                  <div className="text-emerald-400 font-bold">✓ CORRECTION: {item.trap.correction}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </MasterclassReader>
  );
}
