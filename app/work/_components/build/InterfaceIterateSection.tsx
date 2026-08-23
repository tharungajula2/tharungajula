"use client";

import { CorePrincipleBadge, TeachingIllustrationBadge } from "./Badges";

const interfaceExamples = [
  { proj: "LOC-IQ", desc: "Interactive ReactFlow graph exposes full evidence paths instead of hiding them behind an opaque score." },
  { proj: "Credit Risk", desc: "Master pipeline renders explicit distinction between accounting ECL provisions and regulatory RWA capital." },
  { proj: "Churn", desc: "Side-by-side threshold matrices expose the real-world trade-off between recall capture rate and precision." },
  { proj: "NIFTY Portfolio", desc: "Interactive risk-return scatter cloud exposes allocation trade-offs across 10,000 Monte Carlo portfolios." },
];

export default function InterfaceIterateSection() {
  return (
    <section id="interface-iterate" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 07 — INTERFACE & ITERATE
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* INTERFACE & ITERATION */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            07. Interface Exposes Decision Logic
          </h2>
          <CorePrincipleBadge label="INTERFACE DESIGN" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          An analysis becomes useful only when another person can understand and act on it. Interface design is not decoration; it exposes decision logic.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs mb-6">
          {interfaceExamples.map((ie) => (
            <div key={ie.proj} className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
              <span className="text-accent font-bold block mb-1">{ie.proj}</span>
              <p className="text-ink-muted text-[11px] leading-relaxed">{ie.desc}</p>
            </div>
          ))}
        </div>

        {/* Iteration Loop */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl font-mono text-xs text-center mb-6">
          <div className="text-accent font-bold mb-2">// EVIDENCE-DRIVEN ITERATION LOOP</div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-ink-muted text-[11px]">
            <span>BUILD</span>
            <span className="text-accent">→</span>
            <span>USE</span>
            <span className="text-accent">→</span>
            <span>OBSERVE CONFUSION / FAILURE</span>
            <span className="text-accent">→</span>
            <span>CHANGE</span>
            <span className="text-accent">→</span>
            <span>RETEST</span>
            <span className="text-accent">→</span>
            <span>RELEASE</span>
          </div>
        </div>

        <div className="bg-accent/15 border border-accent/30 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: Good interface design exposes the decision logic. Iteration should respond to evidence, not random redesign.
        </div>
      </div>
    </section>
  );
}
