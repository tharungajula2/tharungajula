"use client";

import React, { useState, useMemo } from "react";
import { MasterclassHero } from "@/components/masterclass";
import { Search, Filter, Bookmark, ChevronRight } from "lucide-react";

export interface RecallTerm {
  id: string;
  term: string;
  category: "Credit" | "ML" | "Time Series" | "Portfolio" | "Product / BA" | "AI Systems" | "Formulae" | "Comparisons" | "Common Traps";
  plainEnglish: string;
  rememberRule: string;
  projectConnection: string;
}

export const INITIAL_RECALL_TERMS: RecallTerm[] = [
  {
    id: "rec-pd",
    term: "Probability of Default (PD)",
    category: "Credit",
    plainEnglish: "Statistical 12-month likelihood that a borrower defaults on contractual loan obligations.",
    rememberRule: "Rating migration triggers PD change; 1-yr horizon for Stage 1, multi-year for Stage 2.",
    projectConnection: "Retail Credit Risk & Renforge Credit Risk OS",
  },
  {
    id: "rec-lgd",
    term: "Loss Given Default (LGD)",
    category: "Credit",
    plainEnglish: "Economic loss proportion incurred if default occurs, accounting for collateral haircut recoveries.",
    rememberRule: "LGD = 1 - (Net Realised Collateral Recoveries / EAD).",
    projectConnection: "Retail Credit Risk & Renforge Credit Risk OS",
  },
  {
    id: "rec-ead",
    term: "Exposure at Default (EAD)",
    category: "Credit",
    plainEnglish: "Total expected gross balance sheet exposure at the moment default occurs.",
    rememberRule: "EAD = Drawn + (CCF × Undrawn). Never assume undrawn commitment is zero risk.",
    projectConnection: "Retail Credit Risk & Renforge Credit Risk OS",
  },
  {
    id: "rec-sicr",
    term: "Significant Increase in Credit Risk (SICR)",
    category: "Credit",
    plainEnglish: "IFRS 9 criteria shifting loans from Stage 1 (12M ECL) to Stage 2 (Lifetime ECL).",
    rememberRule: "30 DPD is a rebuttable backstop, NOT the entire Stage 2 definition!",
    projectConnection: "Renforge Credit Risk OS",
  },
  {
    id: "rec-recall",
    term: "Recall (Sensitivity)",
    category: "ML",
    plainEnglish: "Of all actual positive cases in the dataset, what fraction did the model correctly identify?",
    rememberRule: "Recall = TP / (TP + FN). High recall catches more positive cases but increases false alarms.",
    projectConnection: "Bank Customer Churn",
  },
  {
    id: "rec-precision",
    term: "Precision (Positive Predictive Value)",
    category: "ML",
    plainEnglish: "Of all positive predictions made by the model, what fraction was actually positive?",
    rememberRule: "Precision = TP / (TP + FP). Measures confidence in positive alerts.",
    projectConnection: "Bank Customer Churn",
  },
  {
    id: "rec-sarima",
    term: "SARIMA (Seasonal ARIMA)",
    category: "Time Series",
    plainEnglish: "Time series forecasting model handling non-stationarity, autoregression, moving averages, and annual seasonality.",
    rememberRule: "(p,d,q)(P,D,Q)s — Always difference (d=1, D=1) before fitting AR/MA parameters.",
    projectConnection: "Time Series Forecasting",
  },
  {
    id: "rec-efficient-frontier",
    term: "Efficient Frontier",
    category: "Portfolio",
    plainEnglish: "Curve of optimal portfolios offering maximum expected return for a given level of risk (volatility).",
    rememberRule: "Portfolios below the frontier are sub-optimal due to unexploited diversification benefits.",
    projectConnection: "NIFTY Portfolio Construction",
  },
  {
    id: "rec-brd",
    term: "Business Requirements Document (BRD)",
    category: "Product / BA",
    plainEnglish: "Formal specification capturing business intent, regulatory drivers, scope, and rule logic.",
    rememberRule: "BAs write business rules and requirements; technical architects design system code.",
    projectConnection: "Lentra AI & Renforge BA Studio",
  },
  {
    id: "rec-bcbs239",
    term: "BCBS 239 Risk Lineage",
    category: "Product / BA",
    plainEnglish: "Pillar governance standards requiring end-to-end data lineage and auditability from source to regulatory return.",
    rememberRule: "Accurate numbers without lineage proof = weak regulatory data control.",
    projectConnection: "Renforge Credit Risk OS",
  },
];

export default function RapidRecallPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    "Credit",
    "ML",
    "Time Series",
    "Portfolio",
    "Product / BA",
    "AI Systems",
    "Formulae",
    "Comparisons",
    "Common Traps",
  ];

  const filteredTerms = useMemo(() => {
    return INITIAL_RECALL_TERMS.filter((item) => {
      const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.plainEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rememberRule.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-8 text-ink font-sans space-y-8 pb-28 sm:pb-32">
      <MasterclassHero
        kicker="PORTFOLIO MEMORY SYSTEM · RAPID RECALL"
        title="Rapid Recall System"
        titleItalic="& Terminology Engine"
        objective="Searchable, categorized memory rules and key concept definitions across all 6 portfolio masterclasses."
        tags={["Searchable Index", "Categorized Terms", "Memory Rules", "Factual Boundaries"]}
        numbers={[
          { value: String(INITIAL_RECALL_TERMS.length), label: "INDEXED TERMS" },
          { value: "9", label: "CATEGORIES" },
          { value: "SEARCHABLE", label: "REAL-TIME INDEX" },
        ]}
      />

      {/* SEARCH BAR & CATEGORY FILTER STRIP */}
      <div className="p-4 rounded-2xl bg-surface-raised border border-hairline space-y-3 font-mono text-xs select-none">
        <div className="flex items-center gap-2 bg-surface-sunken border border-hairline rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-accent shrink-0" />
          <input
            type="text"
            placeholder="Search terms, formulas, rules (PD, LGD, Recall, SARIMA, BRD)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-ink placeholder:text-ink-faint focus:outline-none text-xs font-mono"
          />
        </div>

        {/* CATEGORY CHIPS */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[9px] text-ink-faint uppercase font-bold mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-accent" />
            CATEGORY:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-accent text-surface shadow-sm"
                    : "bg-surface-sunken hover:bg-surface-raised text-ink-muted border border-hairline-faint"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* TERMS GRID */}
      <div className="space-y-3 font-mono text-xs select-none">
        <div className="flex items-center justify-between text-[10px] text-ink-faint uppercase font-bold">
          <span>INDEXED TERMS ({filteredTerms.length})</span>
          <span>RAPID RECALL SHELL</span>
        </div>

        {filteredTerms.length === 0 ? (
          <div className="p-8 text-center text-ink-muted bg-surface-raised border border-hairline rounded-2xl">
            No terms match "{searchQuery}" in category "{selectedCategory}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTerms.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-surface-raised border border-hairline hover:border-accent/40 transition-all space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-bold uppercase">
                      {t.category}
                    </span>
                    <span className="text-ink-faint uppercase">{t.projectConnection}</span>
                  </div>

                  <h3 className="font-serif text-xl text-ink font-normal">{t.term}</h3>

                  <p className="text-ink-muted font-sans text-xs leading-relaxed">{t.plainEnglish}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20 font-mono text-[11px] text-accent space-y-0.5">
                  <span className="font-bold uppercase text-[9px] block">★ RECALL RULE:</span>
                  <span>{t.rememberRule}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
