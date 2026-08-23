"use client";

import { LimitationBadge } from "./Badges";

const pipelineSteps = [
  "APPLICANT IDENTIFIERS (6)",
  "MAPPED SOURCE TYPES (46)",
  "DEFINED FIELDS (42)",
  "DERIVED SIGNALS",
  "BASE WEIGHT COMPUTATION",
  "RECENCY DECAY ADJUSTMENT",
  "IP-TRUST / PROXY DISCOUNT",
  "EFFECTIVE EDGE WEIGHTS",
  "6-LAYER GRAPH RENDERING",
  "MULTIPLE SIGNALS CONVERGE",
  "CANDIDATE PINCODES",
  "3-STATE TRUTH FLAG (G/A/R)",
  "EXPLAINABLE EVIDENCE PATH",
  "STATIC JSON TRACE LOAD",
  "NEXT.JS ROUTING & PAGES",
  "REACT COMPONENTS & STATE",
  "TYPESCRIPT DATA CONTRACTS",
  "REACTFLOW GRAPH CANVAS",
  "CATALOGUE & SCENARIO UI",
  "DEEP-DIVE PANELS",
  "HUMAN UNDERWRITER REVIEW",
];

const cheatsheetBlocks = [
  {
    category: "ARCHITECTURE & DATA",
    items: [
      "6 primary identifiers (where to look)",
      "46 mapped source types (system catalogue)",
      "42 defined fetched fields (raw payload)",
      "derived signals = weighted evidence traces",
    ],
  },
  {
    category: "GRAPH & WEIGHTING",
    items: [
      "node = entity object at a layer",
      "edge = directed, weighted relationship",
      "effective weight = base × recency × IP-trust",
      "proxy IP down-weights trust without deleting signal",
    ],
  },
  {
    category: "ENGINEERING STACK",
    items: [
      "React = UI components & state",
      "Next.js = application framework & static pages",
      "TypeScript = typed data contracts",
      "ReactFlow = interactive canvas rendering engine",
    ],
  },
  {
    category: "PRODUCT & BOUNDARIES",
    items: [
      "catalogue = design contract, not live APIs",
      "static JSON traces = pre-computed scenario demo",
      "rule logic = explicit rules, NOT ML model",
      "explainable decision support for human underwriters",
    ],
  },
];

export default function PipelineCheatsheetTruthSection() {
  return (
    <section id="pipeline-truth" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 09 — PIPELINE MAP, RECALL CHEATSHEET & TRUTH BOUNDARY
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. 21-STEP PIPELINE MAP */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">
          16. 21-Step Complete System Pipeline Map
        </h2>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Reconstruct the entire LOC-IQ location intelligence architecture from applicant identifiers to reviewer decision support.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step}
              className="bg-surface-sunken border border-hairline-faint hover:border-cyan-500/40 p-3.5 rounded-xl flex items-center gap-3 transition-colors"
            >
              <span className="text-cyan-400 font-bold text-xs shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-ink font-medium uppercase">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. COMPACT RECALL CHEATSHEET */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          17. Compact Memory & Recall Cheatsheet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {cheatsheetBlocks.map((block) => (
            <div key={block.category} className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 tracking-widest block mb-2 uppercase">
                  // {block.category}
                </span>
                <ul className="space-y-1.5 text-ink-muted">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-cyan-400 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TRUTH BOUNDARY */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <LimitationBadge label="TRUTH BOUNDARY" />
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            18. Project Truth & Claim Boundaries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-2">// GENUINELY BUILT & IMPLEMENTED</span>
            <ul className="space-y-1 text-ink-muted">
              <li>✓ Next.js / React / TypeScript web application</li>
              <li>✓ ReactFlow six-layer interactive graph canvas</li>
              <li>✓ 6 primary identifiers architecture</li>
              <li>✓ 46 mapped source types architectural catalogue</li>
              <li>✓ 42 defined fetched fields contract schema</li>
              <li>✓ Derived signals & candidate location pincode layers</li>
              <li>✓ 3-state static truth flags (GREEN / AMBER / RED)</li>
              <li>✓ Composite edge-weight logic: base × recency × trust</li>
              <li>✓ Proxy-IP down-weighting & recency factor decay</li>
              <li>✓ Structured documentation & deep-dive inspection panels</li>
              <li>✓ Pre-computed static JSON scenario traces</li>
            </ul>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-amber-500/30">
            <span className="text-amber-300 font-bold block mb-2">// ILLUSTRATIVE / NOT BUILT</span>
            <ul className="space-y-1 text-ink-muted">
              <li>✗ 46 live external API integrations</li>
              <li>✗ Live backend HTTP orchestration pipeline</li>
              <li>✗ Empirical ML location-confidence model</li>
              <li>✗ Empirical default / fraud prediction model</li>
              <li>✗ Statistically calibrated probability scores</li>
              <li>✗ Manual form connected to backend scoring engine</li>
              <li>✗ Runtime privacy/consent enforcement layer</li>
              <li>✗ Automated lending approval/rejection decisioning</li>
            </ul>
          </div>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 p-3.5 rounded-xl text-xs font-mono text-cyan-300 font-semibold mt-4 text-center">
          "LOC-IQ demonstrates product architecture and explainable evidence reasoning. It does not claim a live multi-source underwriting/fraud model."
        </div>
      </div>
    </section>
  );
}
