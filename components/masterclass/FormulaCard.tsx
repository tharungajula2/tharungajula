"use client";

import React from "react";

export interface SymbolDef {
  symbol: string;
  meaning: string;
}

export interface FormulaCardProps {
  title?: string;
  formula: string;
  symbols: SymbolDef[];
  plainInterpretation: string;
  workedExample?: string;
  projectConnection: string;
}

export default function FormulaCard({
  title,
  formula,
  symbols,
  plainInterpretation,
  workedExample,
  projectConnection,
}: FormulaCardProps) {
  return (
    <div className="w-full my-4 p-5 rounded-2xl bg-surface-raised border border-accent/30 font-mono text-xs space-y-3">
      {title && (
        <div className="text-[10px] text-accent font-bold uppercase tracking-wider border-b border-hairline pb-2">
          // FORMULA: {title}
        </div>
      )}

      {/* FORMULA DISPLAY BOX */}
      <div className="p-3 rounded-xl bg-surface-sunken border border-accent/40 text-center font-bold text-sm text-accent tracking-wide overflow-x-auto">
        {formula}
      </div>

      {/* SYMBOL EXPLANATIONS */}
      {symbols && symbols.length > 0 && (
        <div className="p-3 rounded-xl bg-surface-sunken border border-hairline space-y-1 text-[11px]">
          <span className="text-[9px] text-ink-faint uppercase font-bold block mb-1">SYMBOLS & VARIABLES:</span>
          {symbols.map((s) => (
            <div key={s.symbol} className="flex gap-2">
              <span className="font-bold text-accent shrink-0">{s.symbol}:</span>
              <span className="text-ink-muted">{s.meaning}</span>
            </div>
          ))}
        </div>
      )}

      {/* PLAIN ENGLISH INTERPRETATION */}
      <div className="p-3 rounded-xl bg-surface-sunken border border-hairline space-y-1 font-sans text-xs">
        <span className="font-mono text-[10px] text-signal font-bold uppercase block">// PLAIN ENGLISH INTERPRETATION:</span>
        <p className="text-ink leading-relaxed">{plainInterpretation}</p>
      </div>

      {/* WORKED EXAMPLE (OPTIONAL) */}
      {workedExample && (
        <div className="p-3 rounded-xl bg-surface-sunken border border-hairline space-y-1 font-mono text-xs">
          <span className="text-[10px] text-accent font-bold uppercase block">// WORKED EXAMPLE:</span>
          <p className="text-ink-muted leading-relaxed font-sans">{workedExample}</p>
        </div>
      )}

      {/* PROJECT CONNECTION */}
      <div className="p-3 rounded-xl bg-surface-sunken border border-hairline space-y-1 font-sans text-xs">
        <span className="font-mono text-[10px] text-blue font-bold uppercase block">// PROJECT CONNECTION:</span>
        <p className="text-ink-muted leading-relaxed font-mono">{projectConnection}</p>
      </div>
    </div>
  );
}
