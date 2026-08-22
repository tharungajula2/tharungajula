"use client";

import React from "react";

export interface TruthBoundaryProps {
  title?: string;
  implemented: string[];
  illustrative: string[];
}

export default function TruthBoundary({
  title = "TRUTH BOUNDARY & SCOPE NOTES",
  implemented,
  illustrative,
}: TruthBoundaryProps) {
  return (
    <div className="w-full my-6 p-5 rounded-2xl bg-surface-raised border border-hairline font-sans text-xs space-y-4">
      <div className="flex items-center justify-between border-b border-hairline pb-3 font-mono">
        <span className="text-xs font-bold text-accent uppercase tracking-wider">// {title}</span>
        <span className="text-[10px] text-ink-faint uppercase font-bold">FACTUAL BOUNDARIES</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IMPLEMENTED / SUPPORTED */}
        <div className="p-4 rounded-xl bg-surface-sunken border-t-2 border-t-signal border border-hairline space-y-2">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-signal uppercase">
            <span className="w-2 h-2 rounded-full bg-signal" />
            <span>IMPLEMENTED / SUPPORTED IN SOURCE</span>
          </div>
          <ul className="space-y-1.5 text-ink-muted text-xs font-sans list-disc list-inside">
            {implemented.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>

        {/* ILLUSTRATIVE / NOT CLAIMED */}
        <div className="p-4 rounded-xl bg-surface-sunken border-t-2 border-t-warn border border-hairline space-y-2">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-warn uppercase">
            <span className="w-2 h-2 rounded-full bg-warn" />
            <span>ILLUSTRATIVE / NOT CLAIMED</span>
          </div>
          <ul className="space-y-1.5 text-ink-muted text-xs font-sans list-disc list-inside">
            {illustrative.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
