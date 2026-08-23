"use client";

import { GenuinelyBuiltBadge, StaticScenarioBadge } from "./Badges";

const stackItems = [
  { tech: "React", role: "UI Component Library & State Management" },
  { tech: "Next.js", role: "Application Framework & Static Page Prerendering" },
  { tech: "TypeScript", role: "Strict Typed Data Contracts (Source, Field, Edge, Scenario)" },
  { tech: "ReactFlow", role: "Interactive Canvas & Node/Edge Graph Visualization" },
];

export default function ProductEngineeringSection() {
  return (
    <section id="product-engineering" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 05 — PRODUCT STACK, STATIC SCENARIOS & FRONT-END ARCHITECTURE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. STATIC SCENARIO JSON ARCHITECTURE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            09. Static Pre-Computed Scenario JSON Traces
          </h2>
          <StaticScenarioBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          The demo application renders three pre-computed synthetic JSON scenario traces to demonstrate explainable evidence graph navigation without requiring live API orchestration.
        </p>

        {/* JSON Trace Flow */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6 font-mono text-xs text-center">
          <div className="text-cyan-400 font-bold mb-2">// STATIC SCENARIO RUNTIME FLOW</div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="bg-surface-raised p-2 rounded border border-hairline">Static JSON Trace</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-surface-raised p-2 rounded border border-hairline">React State Load</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-surface-raised p-2 rounded border border-hairline">ReactFlow Canvas Render</span>
            <span className="text-cyan-400">→</span>
            <span className="bg-cyan-500/10 text-cyan-300 p-2 rounded border border-cyan-500/30 font-bold">Interactive Reviewer Console</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-1">FRONT END (GENUINELY BUILT)</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              Next.js, React, TypeScript, ReactFlow graph canvas, source catalogue UI, scenario inspector, structured documentation panels.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-amber-500/30">
            <span className="text-amber-300 font-bold block mb-1">BACK END (NOT BUILT)</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              Live HTTP API orchestration, scoring runtime, authentication, persistent database, runtime privacy/consent enforcement.
            </p>
          </div>
        </div>
      </div>

      {/* 2. TECHNOLOGY STACK & CATALOGUE VS SCENARIO UI */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            10. Engineering Stack & Catalogue vs Scenario UI
          </h2>
          <GenuinelyBuiltBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
          {stackItems.map((item) => (
            <div key={item.tech} className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint">
              <span className="text-cyan-400 font-bold block mb-0.5">{item.tech}</span>
              <span className="text-ink-muted text-[11px]">{item.role}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">CATALOGUE UI</span>
            <p className="text-ink-muted leading-relaxed text-[11px]">
              Architectural inventory describing what each of the 46 mapped sources and 42 fields could provide.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">SCENARIO INSPECTION UI</span>
            <p className="text-ink-muted leading-relaxed text-[11px]">
              Interactive graph view demonstrating how evidence flows through weighted edges in a specific applicant trace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
