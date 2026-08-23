"use client";

import { StaticScenarioBadge, TeachingIllustrationBadge } from "./Badges";

const truthFlags = [
  { flag: "GREEN", desc: "Evidence broadly supports the declared location hypothesis.", style: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  { flag: "AMBER", desc: "Mixed or uncertain evidence requiring human underwriter inspection.", style: "text-amber-300 border-amber-500/30 bg-amber-500/10" },
  { flag: "RED", desc: "Material contradiction or weak location evidence support.", style: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
];

export default function CandidateDecisionSection() {
  return (
    <section id="candidate-decision" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 04 — CANDIDATE PINCODES, CONFIDENCE & TRUTH FLAGS
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. EVIDENCE CONVERGENCE & CANDIDATE PINCODES */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            07. Evidence Convergence on Candidate Pincodes
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          The evidence graph channels multiple weighted signals downstream until they converge on candidate location hypotheses (pincodes).
        </p>

        {/* Convergence Diagram */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6 font-mono text-xs text-center">
          <div className="text-cyan-400 font-bold mb-3">// EVIDENCE CONVERGENCE DIAGRAM</div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="space-y-1 text-[11px] text-ink-muted">
              <div className="bg-surface-raised p-2 rounded border border-hairline">Signal A (Weight 0.7)</div>
              <div className="bg-surface-raised p-2 rounded border border-hairline">Signal B (Weight 0.8)</div>
              <div className="bg-surface-raised p-2 rounded border border-hairline">Signal C (Weight 0.6)</div>
            </div>

            <span className="text-cyan-400 font-bold">⇒ CONVERGES TO ⇒</span>

            <div className="bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-lg text-cyan-300 font-bold">
              Rank 1: Pincode 560037
              <span className="block text-[10px] font-normal text-ink-muted mt-0.5">Strongest Weighted Convergence</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONFIDENCE VS PROBABILITY & TRUTH FLAGS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            08. Rank vs Confidence & 3-State Truth Flags
          </h2>
          <StaticScenarioBadge label="3 TRUTH FLAGS" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-mono text-xs">
          {truthFlags.map((tf) => (
            <div key={tf.flag} className={`p-4 rounded-xl border ${tf.style}`}>
              <span className="font-bold text-base block mb-1">TRUTH FLAG: {tf.flag}</span>
              <p className="text-[11px] leading-relaxed text-ink-muted">{tf.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs mb-4">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">RANK VS CONFIDENCE SCORE</span>
            <p className="text-ink-muted leading-relaxed text-[11px]">
              Rank gives relative order among candidates. Scenario confidence is a static demo value, NOT an empirical ML probability.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-1">EXPLAINABILITY VS OPAQUE SCORE</span>
            <p className="text-ink-muted leading-relaxed text-[11px]">
              Underwriters trace the exact path of nodes and weighted edges to understand why a candidate pincode received GREEN, AMBER, or RED.
            </p>
          </div>
        </div>

        <div className="bg-cyan-500/20 border border-cyan-500/40 p-3.5 rounded-xl text-xs font-mono text-cyan-300 font-semibold">
          RULE: Ranking tells order. A confidence score needs empirical calibration before it can be treated as probability.
        </div>
      </div>
    </section>
  );
}
