"use client";

import { useCreditRiskOS, NavSection } from '../../_state/creditRiskOSContext';
import { cn } from '@/lib/utils';
import {
  Building2,
  Users,
  BarChart3,
  Scale,
  ShieldCheck,
  Droplets,
  FileText,
  GitFork,
  DraftingCompass,
  ScrollText,
  TestTube2
} from 'lucide-react';

interface NavItem {
  id: NavSection;
  label: string;
  code: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'bank', label: 'Bank Command', code: 'BNK-01', icon: Building2 },
  { id: 'customers', label: 'Customers 360', code: 'CST-02', icon: Users },
  { id: 'credit-risk', label: 'Credit Risk', code: 'RSK-03', icon: BarChart3 },
  { id: 'ifrs9', label: 'IFRS 9 Staging', code: 'ECL-04', badge: 'IFRS 9', icon: Scale },
  { id: 'capital', label: 'Capital & RWA', code: 'CAP-05', badge: 'BASEL 3.1', icon: ShieldCheck },
  { id: 'treasury', label: 'Treasury & LCR', code: 'TRS-06', icon: Droplets },
  { id: 'reporting', label: 'Regulatory Reporting', code: 'REP-07', badge: 'COREP', icon: FileText },
  { id: 'data', label: 'Data & Lineage', code: 'DAT-08', badge: 'BCBS 239', icon: GitFork },
  { id: 'change', label: 'BA Delivery & Change', code: 'CHG-09', icon: DraftingCompass },
  { id: 'regulation', label: 'UK Regulation', code: 'REG-10', icon: ScrollText },
  { id: 'simulation-lab', label: 'Simulation Lab', code: 'SIM-11', badge: 'LAB', icon: TestTube2 },
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
          const IconComponent = item.icon;
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
                <IconComponent className={cn("w-4 h-4 shrink-0", isActive ? "text-accent" : "text-ink-muted group-hover:text-ink")} />
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
