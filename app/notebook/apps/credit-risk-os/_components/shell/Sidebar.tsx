"use client";

import { useCreditRiskOS, NavSection } from '../../_state/creditRiskOSContext';
import { cn } from '@/lib/utils';

interface NavItem {
  id: NavSection;
  label: string;
  code: string;
  badge?: string;
  iconSymbol: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'bank', label: 'Bank Command', code: 'BNK-01', iconSymbol: '🏛️' },
  { id: 'customers', label: 'Customers 360', code: 'CST-02', iconSymbol: '👤' },
  { id: 'credit-risk', label: 'Credit Risk', code: 'RSK-03', iconSymbol: '📊' },
  { id: 'ifrs9', label: 'IFRS 9 Staging', code: 'ECL-04', badge: 'IFRS 9', iconSymbol: '⚖️' },
  { id: 'capital', label: 'Capital & RWA', code: 'CAP-05', badge: 'BASEL', iconSymbol: '🛡️' },
  { id: 'treasury', label: 'Treasury & LCR', code: 'TRS-06', iconSymbol: '💧' },
  { id: 'reporting', label: 'Regulatory Reporting', code: 'REP-07', badge: 'COREP', iconSymbol: '📑' },
  { id: 'data', label: 'Data & Lineage', code: 'DAT-08', badge: 'BCBS239', iconSymbol: '🔗' },
  { id: 'change', label: 'BA Delivery & Change', code: 'CHG-09', iconSymbol: '📐' },
  { id: 'regulation', label: 'UK Regulation', code: 'REG-10', iconSymbol: '📜' },
  { id: 'simulation-lab', label: 'Simulation Lab', code: 'SIM-11', badge: 'LAB', iconSymbol: '🧪' },
];

export default function Sidebar() {
  const { activeSection, setActiveSection, isSidebarCollapsed } = useCreditRiskOS();

  return (
    <aside
      className={cn(
        "bg-surface-raised border-r border-hairline flex flex-col justify-between transition-all duration-300 select-none z-30",
        isSidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* SECTION NAV LIST */}
      <div className="py-3 px-2 space-y-1 overflow-y-auto no-scrollbar">
        {!isSidebarCollapsed && (
          <div className="px-3 pb-2 text-[10px] font-mono tracking-[0.25em] text-ink-faint uppercase border-b border-hairline-faint mb-2">
            // WORKSTATION NAV
          </div>
        )}

        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer group text-left",
                isActive
                  ? "bg-accent/15 text-accent font-bold border border-accent/30 shadow-sm"
                  : "text-ink-muted hover:text-ink hover:bg-surface-sunken border border-transparent"
              )}
              title={item.label}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-sm shrink-0">{item.iconSymbol}</span>
                {!isSidebarCollapsed && (
                  <span className="truncate tracking-wide uppercase font-medium">
                    {item.label}
                  </span>
                )}
              </div>

              {!isSidebarCollapsed && (
                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-sunken text-accent font-mono font-semibold border border-hairline-faint">
                      {item.badge}
                    </span>
                  )}
                  <span className="text-[10px] text-ink-faint group-hover:text-ink-muted transition-colors">
                    {item.code}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* SYSTEM CODE STAMP */}
      {!isSidebarCollapsed && (
        <div className="p-3 border-t border-hairline-faint bg-surface-sunken/40 font-mono text-[10px] text-ink-faint">
          <div className="flex justify-between items-center mb-1">
            <span>PLATFORM: RENFORGE</span>
            <span className="text-signal font-bold">LIVE</span>
          </div>
          <div>JURISDICTION: PRA / FCA UK</div>
        </div>
      )}
    </aside>
  );
}
