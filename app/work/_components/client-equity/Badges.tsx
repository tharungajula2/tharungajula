"use client";

export function ProjectFrameworkBadge({ label = "PROJECT FRAMEWORK" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
      {label}
    </span>
  );
}

export function ProjectMechanismBadge({ label = "PROJECT MECHANISM" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
      {label}
    </span>
  );
}

export function ClientSuppliedBadge({ label = "CLIENT-SUPPLIED" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
      {label}
    </span>
  );
}

export function ImplementedHereBadge({ label = "IMPLEMENTED HERE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
      {label}
    </span>
  );
}

export function TeachingIllustrationBadge({ label = "TEACHING ILLUSTRATION" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30">
      {label}
    </span>
  );
}

export function LimitationBadge({ label = "NOT CLAIMED" }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
      {label}
    </span>
  );
}
