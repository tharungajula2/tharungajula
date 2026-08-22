"use client";

import React from "react";

export interface WorkedExampleProps {
  title?: string;
  given: string[];
  calculateSteps: string[];
  result: string;
  meaning: string;
}

export default function WorkedExample({
  title = "WORKED NUMERICAL EXAMPLE",
  given,
  calculateSteps,
  result,
  meaning,
}: WorkedExampleProps) {
  return (
    <div className="w-full my-4 p-5 rounded-2xl bg-surface-raised border border-hairline font-mono text-xs space-y-3 select-none">
      <div className="text-[10px] text-accent font-bold uppercase tracking-wider border-b border-hairline pb-2">
        // {title}
      </div>

      {/* GIVEN */}
      <div className="p-3 rounded-xl bg-surface-sunken border border-hairline space-y-1">
        <span className="text-[10px] text-accent font-bold uppercase block font-mono">GIVEN (INPUTS):</span>
        <ul className="list-disc list-inside space-y-0.5 text-ink-muted text-[11px] font-sans">
          {given.map((g, idx) => (
            <li key={idx}>{g}</li>
          ))}
        </ul>
      </div>

      {/* CALCULATE */}
      <div className="p-3 rounded-xl bg-surface-sunken border border-hairline space-y-1 font-mono">
        <span className="text-[10px] text-accent font-bold uppercase block">CALCULATE (ARITHMETIC):</span>
        <div className="space-y-1 text-ink text-xs">
          {calculateSteps.map((step, idx) => (
            <div key={idx} className="p-1.5 rounded bg-surface-raised border border-hairline-faint">
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* RESULT & MEANING */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
        <div className="p-3 rounded-xl bg-accent/15 border border-accent/40 font-mono space-y-1">
          <span className="text-[10px] text-accent font-bold uppercase block">RESULT:</span>
          <div className="text-xl font-bold text-ink">{result}</div>
        </div>

        <div className="p-3 rounded-xl bg-surface-sunken border border-hairline space-y-1">
          <span className="font-mono text-[10px] text-signal font-bold uppercase block">MEANING:</span>
          <p className="text-ink-muted text-xs leading-relaxed">{meaning}</p>
        </div>
      </div>
    </div>
  );
}
