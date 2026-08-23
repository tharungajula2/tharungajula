"use client";

export function SystemMethodBadge({ label = "SYSTEM BUILDING // METHOD" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-accent/15 text-accent border border-accent/30">
      {label}
    </span>
  );
}

export function CorePrincipleBadge({ label = "CORE PRINCIPLE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
      {label}
    </span>
  );
}

export function AiConceptBadge({ label = "AI SYSTEM ARCHITECTURE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
      {label}
    </span>
  );
}

export function TeachingIllustrationBadge({ label = "TEACHING CONCEPT" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
      {label}
    </span>
  );
}
