"use client";

import { GenuinelyBuiltBadge, TeachingIllustrationBadge } from "./Badges";

const graphLayers = [
  { layer: "LAYER 1", name: "Applicant Identifiers", desc: "6 Primary Keys (PAN, Phone, Address, etc.)" },
  { layer: "LAYER 2", name: "Mapped Sources", desc: "46 API Source Types Catalogue" },
  { layer: "LAYER 3", name: "Fetched Fields", desc: "42 Contract Response Fields" },
  { layer: "LAYER 4", name: "Derived Signals", desc: "Weighted Location Evidence Traces" },
  { layer: "LAYER 5", name: "Candidate Locations", desc: "Ranked Candidate Pincode Hypotheses" },
  { layer: "LAYER 6", name: "Truth Flag", desc: "3-State Result Flag (GREEN / AMBER / RED)" },
];

export default function EvidenceGraphSection() {
  return (
    <section id="evidence-graph" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 02 — SIX-LAYER EVIDENCE GRAPH ARCHITECTURE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. NODES, EDGES & DIRECTED GRAPH */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            03. Graph Theory: Nodes, Edges & Directed Flow
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">NODE (ENTITY)</span>
            <p className="text-ink-muted leading-relaxed">
              Represents an object at any layer (Identifier, Source, Field, Signal, Candidate Pincode, or Truth Flag).
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">EDGE (WEIGHTED RELATIONSHIP)</span>
            <p className="text-ink-muted leading-relaxed">
              Directed arrow connecting nodes downstream. Edge thickness/color represents effective evidence contribution weight.
            </p>
          </div>
        </div>

        <div className="bg-cyan-500/20 border border-cyan-500/40 p-3.5 rounded-xl text-xs font-mono text-cyan-300 font-semibold">
          RULE: Node = thing. Edge = directed relationship.
        </div>
      </div>

      {/* 2. SIX-LAYER REACTFLOW ARCHITECTURE */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            04. Six-Layer ReactFlow Graph System
          </h2>
          <GenuinelyBuiltBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          The application renders evidence through a six-layer directed graph using <code>ReactFlow</code> for interactive node layout and path inspection.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs mb-6">
          {graphLayers.map((gl) => (
            <div key={gl.layer} className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
              <span className="text-cyan-400 font-bold text-[10px] block mb-1">{gl.layer}</span>
              <span className="text-ink font-bold block text-sm mb-1">{gl.name}</span>
              <span className="text-ink-muted text-[11px] leading-relaxed">{gl.desc}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">ReactFlow (UI ENGINE)</span>
            <p className="text-ink-muted leading-relaxed">
              Provides interactive canvas rendering, node positioning, zooming, panning, and selection events in the browser.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">EVIDENCE LOGIC (DATA ENGINE)</span>
            <p className="text-ink-muted leading-relaxed">
              Computes base weights, recency decay, and IP-trust penalties to determine what edge values are passed to ReactFlow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
