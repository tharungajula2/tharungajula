"use client";

import React from "react";

export interface ConceptSide {
  name: string;
  definition: string;
  keyDifference: string;
  example: string;
}

export interface CompareCardProps {
  title?: string;
  conceptA: ConceptSide;
  conceptB: ConceptSide;
}

export default function CompareCard({
  title = "CONCEPT COMPARISON",
  conceptA,
  conceptB,
}: CompareCardProps) {
  return (
    <div className="w-full my-4 p-5 rounded-2xl bg-surface-raised border border-hairline font-sans text-xs space-y-3 select-none">
      <div className="font-mono text-xs font-bold text-accent uppercase border-b border-hairline pb-2">
        // {title}: {conceptA.name} VS {conceptB.name}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CONCEPT A */}
        <div className="p-4 rounded-xl bg-surface-sunken border border-hairline space-y-2">
          <span className="font-mono text-xs font-bold text-accent uppercase block border-b border-hairline-faint pb-1">
            {conceptA.name}
          </span>
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-ink-faint uppercase font-bold block">DEFINITION:</span>
            <p className="text-ink text-xs leading-relaxed">{conceptA.definition}</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-accent uppercase font-bold block">KEY DIFFERENCE:</span>
            <p className="text-ink-muted text-xs leading-relaxed">{conceptA.keyDifference}</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-signal uppercase font-bold block">EXAMPLE:</span>
            <p className="text-ink-muted text-xs leading-relaxed font-mono">{conceptA.example}</p>
          </div>
        </div>

        {/* CONCEPT B */}
        <div className="p-4 rounded-xl bg-surface-sunken border border-hairline space-y-2">
          <span className="font-mono text-xs font-bold text-accent uppercase block border-b border-hairline-faint pb-1">
            {conceptB.name}
          </span>
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-ink-faint uppercase font-bold block">DEFINITION:</span>
            <p className="text-ink text-xs leading-relaxed">{conceptB.definition}</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-accent uppercase font-bold block">KEY DIFFERENCE:</span>
            <p className="text-ink-muted text-xs leading-relaxed">{conceptB.keyDifference}</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-signal uppercase font-bold block">EXAMPLE:</span>
            <p className="text-ink-muted text-xs leading-relaxed font-mono">{conceptB.example}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
