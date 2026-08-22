"use client";

import React from "react";

export interface ResultCardProps {
  title?: string;
  result: string;
  interpretation: string;
  businessDecision: string;
  limitation: string;
}

export default function ResultCard({
  title = "PROJECT RESULT & EVALUATION",
  result,
  interpretation,
  businessDecision,
  limitation,
}: ResultCardProps) {
  return (
    <div className="w-full my-4 p-5 rounded-2xl bg-surface-raised border border-hairline font-sans text-xs space-y-3">
      <div className="font-mono text-xs font-bold text-accent uppercase border-b border-hairline pb-2 flex items-center justify-between">
        <span>// {title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* RESULT */}
        <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/30 space-y-1">
          <span className="font-mono text-[10px] text-accent font-bold uppercase block">1. RESULT (NUMERICAL)</span>
          <p className="text-ink font-mono font-bold text-sm">{result}</p>
        </div>

        {/* INTERPRETATION */}
        <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline space-y-1">
          <span className="font-mono text-[10px] text-signal font-bold uppercase block">2. INTERPRETATION</span>
          <p className="text-ink-muted text-xs leading-relaxed">{interpretation}</p>
        </div>

        {/* BUSINESS / SYSTEM DECISION */}
        <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline space-y-1">
          <span className="font-mono text-[10px] text-blue font-bold uppercase block">3. BUSINESS / SYSTEM DECISION</span>
          <p className="text-ink-muted text-xs leading-relaxed">{businessDecision}</p>
        </div>

        {/* LIMITATION */}
        <div className="p-3.5 rounded-xl bg-warn/10 border border-warn/30 space-y-1">
          <span className="font-mono text-[10px] text-warn font-bold uppercase block">4. LIMITATION</span>
          <p className="text-ink-muted text-xs leading-relaxed">{limitation}</p>
        </div>
      </div>
    </div>
  );
}
