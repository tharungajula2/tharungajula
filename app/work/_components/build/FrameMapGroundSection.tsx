"use client";

import { CorePrincipleBadge, TeachingIllustrationBadge } from "./Badges";

const frameQuestions = [
  { q: "1. USER", desc: "Who will use the output? (e.g. Underwriter, Coordinator, Portfolio Manager)" },
  { q: "2. DECISION", desc: "What do they need to decide? (e.g. Grant credit, Retention offer, Asset reallocation)" },
  { q: "3. INPUT", desc: "What information exists before the decision? (e.g. Application features, Transaction history)" },
  { q: "4. OUTPUT", desc: "What must the system produce? (e.g. Calibrated PD score, Ranked pincodes, Allocation weights)" },
  { q: "5. FAILURE", desc: "What mistake matters most? (e.g. False negative default vs false positive rejection)" },
];

const groundQuestions = [
  { title: "1. SOURCE", desc: "Where did the data originate?" },
  { title: "2. GRAIN", desc: "What does one row represent?" },
  { title: "3. DATE", desc: "When was the observation valid?" },
  { title: "4. MEANING", desc: "What does the field strictly mean?" },
  { title: "5. QUALITY", desc: "What is missing, duplicated, or stale?" },
];

export default function FrameMapGroundSection() {
  return (
    <section id="frame-map-ground" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASES 01–03 — FRAME, MAP & GROUND
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. FRAME THE PROBLEM */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            01. Frame the Problem: What Decision Are We Improving?
          </h2>
          <CorePrincipleBadge label="DECISION FIRST" />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Starting with technology often produces a solution searching for a problem. System design begins by framing the decision.
        </p>

        {/* 5 Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs mb-6">
          {frameQuestions.map((fq) => (
            <div key={fq.q} className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
              <span className="text-accent font-bold block mb-1">{fq.q}</span>
              <p className="text-ink-muted text-[11px] leading-relaxed">{fq.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-accent/15 border border-accent/30 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: Decision first. Method second.
        </div>
      </div>

      {/* 2. MAP THE SYSTEM */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            02. Map the System: Objects & Relationships
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Before writing code, map out the system objects and their relationships to ensure component clarity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">CREDIT RISK MAP</span>
            <p className="text-ink-muted text-[11px]">Borrower → PD → LGD → EAD → ECL / Capital</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">LOC-IQ MAP</span>
            <p className="text-ink-muted text-[11px]">Identifier → Source → Field → Signal → Candidate</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-accent font-bold block mb-1">TIME SERIES MAP</span>
            <p className="text-ink-muted text-[11px]">Series → Transformation → Model → Forecast → Holdout</p>
          </div>
        </div>

        <div className="bg-accent/15 border border-accent/30 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: If the system cannot be drawn simply, it is not yet understood clearly enough.
        </div>
      </div>

      {/* 3. GROUND THE DATA */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            03. Ground the Data: Five Semantic Questions
          </h2>
          <CorePrincipleBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs mb-6">
          {groundQuestions.map((gq) => (
            <div key={gq.title} className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
              <span className="text-accent font-bold block mb-1">{gq.title}</span>
              <p className="text-ink-muted text-[11px] leading-relaxed">{gq.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-accent/15 border border-accent/30 p-3.5 rounded-xl text-xs font-mono text-accent font-semibold">
          RULE: Data is not just values. It is values + meaning + grain + time.
        </div>
      </div>
    </section>
  );
}
