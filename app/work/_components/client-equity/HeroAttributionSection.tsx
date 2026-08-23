"use client";

import { motion } from "framer-motion";
import { ClientSuppliedBadge, ImplementedHereBadge, ProjectFrameworkBadge } from "./Badges";

const tags = [
  "CRSP 500 US Universe",
  "10-Year Backtest Span",
  "Sector-Neutral Ranking",
  "L1 / L2 cvxpy Optimisation",
  "Turnover & Rank Buffers",
  "Tracking Error Control",
  "4 Core Python Scripts",
];

const headlineFacts = [
  { label: "Investable Universe", value: "CRSP 500 US" },
  { label: "Backtest Span", value: "10 Years" },
  { label: "Core Modules", value: "4 Python Scripts" },
  { label: "Optimisation Engine", value: "L1 / L2 cvxpy" },
  { label: "Relative Risk Control", value: "Tracking Error" },
  { label: "Implementation Stack", value: "Python / NumPy / pandas" },
];

const topFlowSteps = [
  "HISTORICAL UNIVERSE",
  "LOAD DATA",
  "BUILD SIGNALS",
  "FILTER",
  "RANK",
  "SECTOR NEUTRALISE",
  "CONSTRUCT PORTFOLIO",
  "CONTROL TURNOVER",
  "MEASURE ACTIVE RISK",
  "TEST ROBUSTNESS",
];

export default function HeroAttributionSection() {
  return (
    <div className="mb-16">
      {/* KICKER & TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-indigo-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
            CROSS-SECTIONAL EQUITY // IMPLEMENTATION FRAMEWORK
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-4">
          Client Equity Strategy Framework
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl mb-6">
          Convert client-defined equity signals into a historically correct, sector-aware, turnover-controlled and benchmark-aware portfolio implementation that can be tested for robustness.
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full bg-surface-raised border border-hairline text-ink font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* HEADLINE FACTS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {headlineFacts.map((f) => (
            <div
              key={f.label}
              className="bg-surface-raised border border-hairline p-3.5 rounded-xl flex flex-col justify-between"
            >
              <div className="mb-1">
                <ProjectFrameworkBadge label="FRAMEWORK METRIC" />
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-indigo-400">
                {f.value}
              </div>
              <div className="text-[11px] font-mono text-ink-muted mt-0.5">
                {f.label}
              </div>
            </div>
          ))}
        </div>

        {/* NO UNSUPPORTED PERFORMANCE CLAIM WARNING BANNER */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-xs font-mono text-amber-300 font-semibold mb-8 flex items-center justify-between">
          <span>FRAMEWORK RESULT — NO UNSUPPORTED PERFORMANCE CLAIM</span>
          <span className="text-[10px] text-amber-400/80 uppercase">Primary Factual Source: Portfolio_Cheatsheet_FINAL.html</span>
        </div>
      </motion.div>

      {/* PROMINENT ATTRIBUTION CARD */}
      <div className="bg-surface-raised border border-indigo-500/30 p-6 rounded-2xl mb-8 backdrop-blur-xl">
        <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
          <span>System Attribution & Ownership Boundaries</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-400 font-bold">// CLIENT-SUPPLIED</span>
              <ClientSuppliedBadge />
            </div>
            <ul className="space-y-1.5 text-ink-muted">
              <li>• Strategy concepts & investment thesis</li>
              <li>• Source financial & market datasets</li>
              <li>• Strategy / business specification</li>
              <li>• Target universe definitions</li>
            </ul>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-400 font-bold">// IMPLEMENTED HERE</span>
              <ImplementedHereBadge />
            </div>
            <ul className="space-y-1.5 text-ink-muted">
              <li>• Python implementation across 4 core modules</li>
              <li>• Cross-sectional ranking & sector-neutral pipeline</li>
              <li>• Portfolio construction & turnover control logic</li>
              <li>• L1 / L2 cvxpy optimization integration</li>
              <li>• Tracking error & robustness testing suite</li>
            </ul>
          </div>
        </div>
      </div>

      {/* MASTER FLOW */}
      <div className="bg-surface-raised border border-hairline p-5 sm:p-6 rounded-2xl mb-8 backdrop-blur-xl">
        <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3 font-bold">
          // MASTER STRATEGY IMPLEMENTATION FLOW
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
          {topFlowSteps.map((step, idx) => (
            <span key={step} className="flex items-center gap-2">
              <span className="text-indigo-400 font-bold">{step}</span>
              {idx < topFlowSteps.length - 1 && (
                <span className="text-ink-faint">→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
