"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "neutral" | "accent" | "success" | "warning" | "danger";
  className?: string;
}

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  const variantStyles = {
    neutral: "bg-surface-sunken text-ink-muted border-hairline-faint",
    accent: "bg-accent/10 text-accent border-accent/30 font-semibold",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    danger: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono tracking-wider uppercase border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function CodeTag({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-surface-sunken text-accent font-mono text-[11px] sm:text-xs border border-hairline-faint">
      {children}
    </code>
  );
}
