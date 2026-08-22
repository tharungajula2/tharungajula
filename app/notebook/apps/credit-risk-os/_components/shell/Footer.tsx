"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';

export default function Footer() {
  const { activeSection } = useCreditRiskOS();

  return (
    <footer className="h-8 bg-surface-raised border-t border-hairline px-4 flex items-center justify-between font-mono text-[11px] text-ink-muted select-none z-40 shrink-0">
      {/* LEFT: SYSTEM READINESS & ACTIVE SECTION */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-signal font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          <span>SYSTEM READY</span>
        </div>
        <span className="text-hairline-faint">|</span>
        <div className="text-ink-muted">
          <span>ACTIVE NODE: </span>
          <span className="text-accent uppercase font-bold">{activeSection}</span>
        </div>
      </div>

      {/* CENTER: BANK DATA ENGINE STATS */}
      <div className="hidden md:flex items-center gap-4 text-ink-muted">
        <span>ENTITY: RENFORGE BANK PLC</span>
        <span className="text-hairline-faint">|</span>
        <span>SIMULATION DATE: 31 JULY 2026</span>
        <span className="text-hairline-faint">|</span>
        <span>CYCLE: Q3 2026</span>
      </div>

      {/* RIGHT: REGULATORY ATTRIBUTION & TIMESTAMP */}
      <div className="flex items-center gap-3">
        <span className="text-ink-muted">PRA / BCBS 239</span>
        <span className="text-hairline-faint">|</span>
        <span className="text-accent font-semibold">v1.0.0</span>
      </div>
    </footer>
  );
}
