"use client";

import { TeachingIllustrationBadge } from "./Badges";

const commonConfusions = [
  { term: "IDENTIFIER VS FIELD", desc: "Identifier is a lookup key (e.g. PAN, Phone); field is a raw value returned from an external source." },
  { term: "SOURCE VS FIELD", desc: "Source is the system/provider; field is one specific payload element defined in the contract." },
  { term: "FIELD VS SIGNAL", desc: "Field is raw returned data; signal is interpreted evidence after freshness/trust weighting." },
  { term: "NODE VS EDGE", desc: "Node represents an entity object at a layer; edge represents a directed, weighted relationship." },
  { term: "BASE VS EFFECTIVE WEIGHT", desc: "Base weight is starting structural importance; effective weight includes recency & IP-trust discounts." },
  { term: "RANK VS PROBABILITY", desc: "Rank gives candidate order; probability requires calibrated empirical validation." },
  { term: "CONFIDENCE SCORE VS ML MODEL", desc: "A numerical score is not automatically machine learning. LOC-IQ uses explicit rule logic." },
  { term: "GRAPH UI VS GRAPH ALGORITHM", desc: "ReactFlow renders and operates the interactive canvas; it does not infer location truth itself." },
  { term: "CATALOGUE VS INTEGRATION", desc: "Catalogue is an architectural inventory contract; integration is a live working API connection." },
  { term: "FRONT END VS BACK END", desc: "Front end renders and interacts; back end fetches live data, runs scoring engine, and handles auth." },
  { term: "STATIC SCENARIO VS LIVE SCORING", desc: "Static scenario is a pre-computed JSON trace; live scoring dynamically fetches new live inputs." },
  { term: "PROXY IP VS WRONG LOCATION", desc: "Proxy IP down-weights network evidence trust; it does not in itself prove fraud or a wrong address." },
];

export default function ConfusionsSection() {
  return (
    <section id="confusions" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 08 — TWELVE COMMON PRODUCT & GRAPH CONFUSIONS CLARIFIED
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            15. Twelve Common Product Architecture Confusions
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {commonConfusions.map((c) => (
            <div key={c.term} className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl">
              <span className="text-xs font-bold text-cyan-400 block mb-1 uppercase">// {c.term}</span>
              <p className="text-ink-muted leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
