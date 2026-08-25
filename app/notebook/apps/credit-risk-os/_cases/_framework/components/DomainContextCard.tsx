"use client";

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, AlertCircle } from 'lucide-react';

interface Props {
  title: string;
  whatItIs: string;
  whyItMatters: string;
  whatToCheck: string;
  defaultExpanded?: boolean;
}

export default function DomainContextCard({
  title,
  whatItIs,
  whyItMatters,
  whatToCheck,
  defaultExpanded = false,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 overflow-hidden font-mono text-xs select-none my-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-cyan-500/10 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="font-bold text-cyan-300 uppercase tracking-tight text-xs">
            DOMAIN CONTEXT // {title}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-bold uppercase">
          <span>{isExpanded ? 'COLLAPSE' : 'LEARN WHY THIS MATTERS'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-cyan-500/20 space-y-3 font-sans text-xs text-slate-200">
          <div className="space-y-0.5">
            <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">// WHAT IS THIS?</span>
            <p className="leading-relaxed">{whatItIs}</p>
          </div>

          <div className="space-y-0.5">
            <span className="font-mono text-[10px] text-amber-400 font-bold uppercase block">// WHY DOES IT MATTER IN THIS WORKFLOW?</span>
            <p className="leading-relaxed text-amber-200/90">{whyItMatters}</p>
          </div>

          <div className="space-y-0.5 pt-1 border-t border-white/5 font-mono text-[11px]">
            <span className="text-emerald-400 font-bold uppercase block">// WHAT SHOULD I CHECK?</span>
            <p className="text-emerald-300 font-sans">{whatToCheck}</p>
          </div>
        </div>
      )}
    </div>
  );
}
