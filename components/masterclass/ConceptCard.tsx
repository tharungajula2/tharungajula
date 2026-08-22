"use client";

import React from "react";

export interface ConceptCardProps {
  title: string;
  whatIsIt: string;
  whyItExists: string;
  projectConnection: string;
  doNotConfuseWith?: string;
}

export default function ConceptCard({
  title,
  whatIsIt,
  whyItExists,
  projectConnection,
  doNotConfuseWith,
}: ConceptCardProps) {
  return (
    <div className="w-full my-4 p-5 rounded-2xl bg-surface-raised border border-hairline font-sans text-xs space-y-3">
      <div className="font-mono text-xs font-bold text-accent uppercase border-b border-hairline pb-2 flex items-center justify-between">
        <span>// CONCEPT: {title}</span>
      </div>

      <div className="p-3 rounded-xl bg-surface-sunken border border-hairline space-y-1">
        <span className="font-mono text-[10px] text-accent font-bold uppercase block">WHAT IS IT?</span>
        <p className="text-ink text-xs sm:text-sm leading-relaxed">{whatIsIt}</p>
      </div>

      <div className="p-3 rounded-xl bg-surface-sunken border border-hairline space-y-1">
        <span className="font-mono text-[10px] text-signal font-bold uppercase block">WHY DOES IT EXIST?</span>
        <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">{whyItExists}</p>
      </div>

      <div className="p-3 rounded-xl bg-surface-sunken border border-hairline space-y-1">
        <span className="font-mono text-[10px] text-blue font-bold uppercase block">PROJECT CONNECTION</span>
        <p className="text-ink-muted text-xs sm:text-sm leading-relaxed font-mono">{projectConnection}</p>
      </div>

      {doNotConfuseWith && (
        <div className="p-3 rounded-xl bg-warn/10 border border-warn/30 space-y-1 font-mono">
          <span className="text-[10px] text-warn font-bold uppercase block">⚠️ DO NOT CONFUSE WITH</span>
          <p className="text-ink-muted text-xs leading-relaxed font-sans">{doNotConfuseWith}</p>
        </div>
      )}
    </div>
  );
}
