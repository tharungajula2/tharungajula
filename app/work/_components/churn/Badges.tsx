"use client";

export function ProjectDataBadge({ label = "PROJECT DATA" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30">
      {label}
    </span>
  );
}

export function TeachingIllustrationBadge({ label = "TEACHING ILLUSTRATION" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
      {label}
    </span>
  );
}

export function ProjectImplementationBadge({ label = "PROJECT IMPLEMENTATION" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
      {label}
    </span>
  );
}

export function DerivedMetricBadge({ label = "DERIVED FROM CONFUSION MATRIX" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
      {label}
    </span>
  );
}

export function LimitationBadge({ label = "LIMITATION" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30">
      {label}
    </span>
  );
}
