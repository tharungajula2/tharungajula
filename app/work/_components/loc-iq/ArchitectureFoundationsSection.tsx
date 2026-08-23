"use client";

import { ProductArchitectureBadge, TeachingIllustrationBadge } from "./Badges";

export default function ArchitectureFoundationsSection() {
  return (
    <section id="foundations" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 01 — THE PRODUCT PROBLEM & SYSTEM ENTITIES
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. THE CORE PRODUCT PROBLEM */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            01. The Core Location Intelligence Problem
          </h2>
          <ProductArchitectureBadge label="DECISION SUPPORT" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          A declared address is only a claim. Location confidence becomes stronger when independent digital traces support or contradict that claim.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">OPAQUE SCORE (FLAWED)</span>
            <p className="text-ink-muted leading-relaxed">
              Returns a single number e.g. <code>Location Score: 72</code>. The underwriter cannot inspect which data sources produced the score or why trust was lost.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">EVIDENCE GRAPH CONSOLE (LOC-IQ)</span>
            <p className="text-ink-muted leading-relaxed">
              Visualises full evidence paths from identifiers to signals and candidate pincodes, allowing underwriters to inspect recency, trust, and conflicts.
            </p>
          </div>
        </div>

        <div className="bg-cyan-500/20 border border-cyan-500/40 p-3.5 rounded-xl text-xs font-mono text-cyan-300 font-semibold">
          RULE: Decision-support evidence should be inspectable, not merely scored.
        </div>
      </div>

      {/* 2. IDENTIFIER VS SOURCE VS FIELD VS SIGNAL */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            02. Identifier vs Source vs Field vs Signal
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">1. IDENTIFIER (6)</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">Key known about applicant (e.g. PAN, Phone, Declared Address).</p>
            <div className="text-[10px] text-cyan-400 font-bold mt-2">Where to look.</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">2. SOURCE (46)</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">External information provider / API source type catalogue.</p>
            <div className="text-[10px] text-cyan-400 font-bold mt-2">System returning data.</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">3. FIELD (42)</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">Raw returned data element defined in data contract.</p>
            <div className="text-[10px] text-cyan-400 font-bold mt-2">Raw payload value.</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">4. SIGNAL</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">Interpreted evidence created after recency/trust weighting.</p>
            <div className="text-[10px] text-cyan-400 font-bold mt-2">Derived evidence.</div>
          </div>
        </div>

        <div className="bg-cyan-500/20 border border-cyan-500/40 p-3.5 rounded-xl text-xs font-mono text-cyan-300 font-semibold">
          RULE: Identifier asks where to look. Source returns data. Field is the raw value. Signal is the interpreted evidence.
        </div>
      </div>
    </section>
  );
}
