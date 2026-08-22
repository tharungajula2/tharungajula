"use client";

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useCreditRiskOS, NavSection } from '../../_state/creditRiskOSContext';
import { X, Network, Filter, ZoomIn, RefreshCw } from 'lucide-react';

// Dynamic import for SSR safety with canvas-based react-force-graph-2d
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export interface GraphNode {
  id: string;
  name: string;
  group: 'Process' | 'Risk' | 'Accounting' | 'Capital' | 'Treasury' | 'Reporting' | 'BA Delivery' | 'Vendor';
  section: NavSection;
  definition: string;
  questionAnswered: string;
  owner: string;
  baRelevance: string;
  commonTrap: string;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
}

export const GRAPH_DATA: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    // PROCESS
    { id: 'bank', name: 'Renforge Bank plc', group: 'Process', section: 'bank', definition: 'UK regulated entity with £3.85B in balance sheet assets.', questionAnswered: 'What is the overall entity position?', owner: 'CFO / CRO', baRelevance: 'Top-level system boundary.', commonTrap: 'Confusing single credit portfolio with whole bank balance sheet.' },
    { id: 'origination', name: 'Loan Origination', group: 'Process', section: 'customers', definition: 'Customer loan application and limit structuring.', questionAnswered: 'How does the loan enter the bank?', owner: 'Relationship Manager', baRelevance: 'Captures facility limits, currencies, and products.', commonTrap: 'Incomplete origination metadata.' },
    { id: 'underwriting', name: 'Credit Underwriting', group: 'Process', section: 'customers', definition: 'Financial analysis, debt service coverage, and collateral valuation.', questionAnswered: 'Should credit be approved?', owner: 'Underwriting Committee', baRelevance: 'Establishes initial internal rating and sanctioned limits.', commonTrap: 'Unsanctioned limit overruns.' },
    { id: 'monitoring', name: 'Credit Risk Monitoring', group: 'Process', section: 'customers', definition: 'Continuous monitoring of DPD, covenants, and collateral haircuts.', questionAnswered: 'Is performance deteriorating?', owner: 'Specialist Debt Recovery', baRelevance: 'Defines early warning watchlist rules.', commonTrap: 'Relying solely on 30 DPD for deterioration.' },

    // RISK PARAMETERS
    { id: 'pd', name: 'Probability of Default (PD)', group: 'Risk', section: 'credit-risk', definition: 'Statistical 12-month likelihood of default event.', questionAnswered: 'How likely is default?', owner: 'Model Development', baRelevance: 'Scorecard input mapping & rating calibration.', commonTrap: 'Confusing PIT PD (IFRS 9) with TTC PD (Capital).' },
    { id: 'lgd', name: 'Loss Given Default (LGD)', group: 'Risk', section: 'credit-risk', definition: 'Economic loss percentage following collateral recovery.', questionAnswered: 'How severe is loss if default occurs?', owner: 'Collateral Risk Desk', baRelevance: 'Collateral haircut rules & recovery cost specs.', commonTrap: 'Neglecting legal recovery discount rates.' },
    { id: 'ead', name: 'Exposure at Default (EAD)', group: 'Risk', section: 'credit-risk', definition: 'Total balance sheet exposure at default moment.', questionAnswered: 'What is the gross default exposure?', owner: 'EAD Analytics', baRelevance: 'CCF formula specs: Drawn + (CCF × Undrawn).', commonTrap: 'Assuming undrawn commitment is zero risk.' },

    // ACCOUNTING
    { id: 'ifrs9', name: 'IFRS 9 Engine', group: 'Accounting', section: 'ifrs9', definition: 'Forward-looking 3-stage ECL accounting framework.', questionAnswered: 'What provision should be posted to GL?', owner: 'Finance Impairment Desk', baRelevance: 'Staging rules & lifetime term structure specs.', commonTrap: 'Equating IFRS 9 ECL with Basel RWA.' },
    { id: 'sicr', name: 'SICR Staging Rules', group: 'Accounting', section: 'ifrs9', definition: 'Triggers transitioning Stage 1 (12M) to Stage 2 (Lifetime).', questionAnswered: 'Has credit risk increased significantly?', owner: 'Impairment Governance', baRelevance: 'Decision tables comparing current vs origination PD.', commonTrap: 'Treating 30 DPD as the sole Stage 2 trigger.' },
    { id: 'ecl', name: 'Expected Credit Loss (ECL)', group: 'Accounting', section: 'ifrs9', definition: 'Carrying financial provision posted on balance sheet.', questionAnswered: 'What is the carrying impairment reserve?', owner: 'Financial Controller', baRelevance: 'Reconciling ECL output to General Ledger.', commonTrap: 'Confusing ECL carrying provisions with capital.' },

    // CAPITAL
    { id: 'basel31', name: 'Basel 3.1 Framework', group: 'Capital', section: 'capital', definition: 'Prudential capital adequacy and 72.5% output floor rules.', questionAnswered: 'Is the bank adequately capitalized for unexpected loss?', owner: 'Prudential Capital Policy', baRelevance: 'Building dual SA vs IRB RWA calculation pipelines.', commonTrap: 'Claiming full 72.5% floor is operative before Jan 2030.' },
    { id: 'rwa', name: 'Risk-Weighted Assets (RWA)', group: 'Capital', section: 'capital', definition: 'Assets weighted by credit, market, and operational risk.', questionAnswered: 'What is the risk-adjusted capital denominator?', owner: 'Capital Management', baRelevance: 'Mapping RWA calculation rules across asset classes.', commonTrap: 'Confusing RWA denominator with CET1 numerator.' },
    { id: 'cet1', name: 'CET1 Capital Ratio', group: 'Capital', section: 'capital', definition: 'Common Equity Tier 1 capital divided by total RWA.', questionAnswered: 'Does the bank satisfy regulatory capital targets?', owner: 'Treasurer & CRO', baRelevance: 'Reporting regulatory capital cushion to PRA.', commonTrap: 'Dividing whole-bank CET1 by single credit portfolio RWA.' },

    // TREASURY
    { id: 'lcr', name: 'Liquidity Coverage Ratio (LCR)', group: 'Treasury', section: 'treasury', definition: '30-day stressed liquidity cash outflow buffer.', questionAnswered: 'Can the bank survive a 30-day cash run?', owner: 'Treasury Desk', baRelevance: 'HQLA buffer rules & 30-day run-off rate specs.', commonTrap: 'Confusing liquidity floor (100%) with internal target (120%).' },
    { id: 'ftp', name: 'Funds Transfer Pricing (FTP)', group: 'Treasury', section: 'treasury', definition: 'Internal cost of funds attribution: Base + Liquidity + Credit.', questionAnswered: 'How do we price liquidity internally?', owner: 'ALCO & Treasury', baRelevance: 'FTP decomposition formula specifications.', commonTrap: 'Ignoring liquidity term premium in loan pricing.' },

    // REPORTING / DATA
    { id: 'bcbs239', name: 'BCBS 239 Risk Lineage', group: 'Reporting', section: 'data', definition: 'Pillar standards for risk data aggregation and lineage.', questionAnswered: 'Can every reported number be audited to source?', owner: 'Chief Data Officer', baRelevance: 'Source-to-target mapping & data dictionary definition.', commonTrap: 'Reporting accurate numbers without audit lineage.' },
    { id: 'corep', name: 'COREP & FINREP Returns', group: 'Reporting', section: 'reporting', definition: 'Statutory PRA quarterly regulatory returns (C 07.00, F 18.00).', questionAnswered: 'What data is filed with the PRA/FCA?', owner: 'Regulatory Reporting', baRelevance: 'Automated validation rules & report-to-ledger checks.', commonTrap: 'Filing un-reconciled figures to regulators.' },

    // BA DELIVERY
    { id: 'brd', name: 'Business Requirements (BRD)', group: 'BA Delivery', section: 'change', definition: 'Formal business intent and regulatory change specification.', questionAnswered: 'What business problem must technology solve?', owner: 'Lead Credit Risk BA', baRelevance: 'Core deliverable capturing requirements & rules.', commonTrap: 'Writing solution specs instead of business rules.' },
    { id: 'rtm', name: 'Requirements Traceability (RTM)', group: 'BA Delivery', section: 'change', definition: 'End-to-end matrix linking Driver → REQ → Story → UAT → Release.', questionAnswered: 'Is every requirement tested and signed off?', owner: 'BA & QA Lead', baRelevance: 'Ensures zero scope gaps during change delivery.', commonTrap: 'Marking ready for release before UAT sign-off.' },

    // VENDORS
    { id: 'vendor_moodys', name: 'Moody\'s EDF-X / RiskCalc', group: 'Vendor', section: 'credit-risk', definition: 'External quantitative default probability vendor platform.', questionAnswered: 'External benchmark scorecard vendor technology.', owner: 'External Technology Vendor', baRelevance: 'Data interface mapping to vendor API.', commonTrap: 'Assuming vendor tool replaces bank regulatory accountability.' },
    { id: 'vendor_impairment', name: 'ImpairmentStudio', group: 'Vendor', section: 'ifrs9', definition: 'External IFRS 9 ECL accounting engine software platform.', questionAnswered: 'External ECL calculation engine software.', owner: 'External Software Vendor', baRelevance: 'Source-to-target payload mapping to vendor engine.', commonTrap: 'Confusing vendor calculation options with bank policy.' },
  ],
  links: [
    { source: 'bank', target: 'origination', label: 'Books Loans' },
    { source: 'origination', target: 'underwriting', label: 'Submits Financials' },
    { source: 'underwriting', target: 'pd', label: 'Assigns Rating' },
    { source: 'underwriting', target: 'lgd', label: 'Values Collateral' },
    { source: 'underwriting', target: 'ead', label: 'Sanctions Limit' },
    { source: 'pd', target: 'ifrs9', label: 'Feeds Staging' },
    { source: 'pd', target: 'basel31', label: 'Feeds IRB Curve' },
    { source: 'lgd', target: 'ifrs9', label: 'Feeds ECL' },
    { source: 'lgd', target: 'basel31', label: 'Feeds RWA' },
    { source: 'ead', target: 'ifrs9', label: 'Exposure Base' },
    { source: 'ead', target: 'basel31', label: 'RWA Base' },
    { source: 'ifrs9', target: 'ecl', label: 'Computes Reserve' },
    { source: 'basel31', target: 'rwa', label: 'Applies Floor' },
    { source: 'rwa', target: 'cet1', label: 'Denominator' },
    { source: 'bcbs239', target: 'corep', label: 'Governs Lineage' },
    { source: 'ecl', target: 'corep', label: 'Posts FINREP F 18.00' },
    { source: 'rwa', target: 'corep', label: 'Posts COREP C 07.00' },
    { source: 'brd', target: 'rtm', label: 'Traces Scope' },
    { source: 'vendor_moodys', target: 'pd', label: 'External Benchmark' },
    { source: 'vendor_impairment', target: 'ifrs9', label: 'External Platform' },
  ],
};

export default function MasterEcosystemGraph() {
  const { isMasterGraphOpen, setIsMasterGraphOpen, setActiveSection } = useCreditRiskOS();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(GRAPH_DATA.nodes[0]);
  const [filterGroup, setFilterGroup] = useState<string>('ALL');

  const filteredGraph = useMemo(() => {
    if (filterGroup === 'ALL') return GRAPH_DATA;
    const filteredNodes = GRAPH_DATA.nodes.filter((n) => n.group === filterGroup);
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredLinks = GRAPH_DATA.links.filter(
      (l) => nodeIds.has(typeof l.source === 'string' ? l.source : (l.source as any).id) &&
             nodeIds.has(typeof l.target === 'string' ? l.target : (l.target as any).id)
    );
    return { nodes: filteredNodes, links: filteredLinks };
  }, [filterGroup]);

  if (!isMasterGraphOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xl z-50 flex flex-col font-mono text-xs select-none animate-in fade-in duration-300">
      {/* GRAPH HEADER */}
      <div className="h-14 border-b border-hairline px-6 flex items-center justify-between bg-surface-raised shrink-0">
        <div className="flex items-center gap-3">
          <Network className="w-5 h-5 text-accent" />
          <div>
            <span className="font-bold text-ink uppercase tracking-wider text-sm block">RENFORGE CREDIT RISK MASTER ECOSYSTEM GRAPH</span>
            <span className="text-[10px] text-ink-faint">2D Interactive Force Graph • Node Connections & BA Lineage</span>
          </div>
        </div>

        {/* FILTER STRIP */}
        <div className="hidden md:flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-ink-faint" />
          {['ALL', 'Process', 'Risk', 'Accounting', 'Capital', 'Treasury', 'Reporting', 'BA Delivery', 'Vendor'].map((grp) => (
            <button
              key={grp}
              onClick={() => setFilterGroup(grp)}
              className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold transition-all cursor-pointer ${
                filterGroup === grp
                  ? 'bg-accent text-surface'
                  : 'bg-surface-sunken hover:bg-surface-raised text-ink-muted border border-hairline-faint'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsMasterGraphOpen(false)}
          className="p-1.5 rounded-lg hover:bg-surface-sunken text-ink-muted hover:text-ink transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* GRAPH CANVAS & INSPECTOR CONTAINER */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* GRAPH CANVAS (LEFT/TOP) */}
        <div className="flex-1 bg-[#090B0E] relative overflow-hidden flex items-center justify-center">
          <ForceGraph2D
            graphData={filteredGraph}
            nodeLabel="name"
            nodeColor={(node: any) => {
              if (node.group === 'Vendor') return '#E11D48'; // Red for External Vendor
              if (node.group === 'Accounting') return '#34D399'; // Emerald
              if (node.group === 'Capital') return '#F59E0B'; // Amber
              return '#22D3EE'; // Cyan
            }}
            nodeRelSize={7}
            linkColor={() => '#334155'}
            linkWidth={1.5}
            linkLabel="label"
            onNodeClick={(node: any) => setSelectedNode(node as GraphNode)}
            backgroundColor="#090B0E"
          />

          <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-surface-raised/90 backdrop-blur-md border border-hairline font-mono text-[10px] text-ink-faint space-y-1">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE]" /> Bank Process / Risk / BA</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" /> IFRS 9 Accounting</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Basel Capital & Treasury</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" /> External Vendor Technology</div>
          </div>
        </div>

        {/* NODE INSPECTOR PANEL (RIGHT/BOTTOM) */}
        {selectedNode && (
          <div className="w-full lg:w-96 bg-surface-raised border-t lg:border-t-0 lg:border-l border-hairline p-5 space-y-4 font-mono text-xs overflow-y-auto shrink-0 select-none">
            <div className="border-b border-hairline-faint pb-3">
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-bold uppercase">{selectedNode.group}</span>
                <span className="text-ink-faint uppercase">SECTION: {selectedNode.section.toUpperCase()}</span>
              </div>
              <h2 className="text-lg font-bold text-ink uppercase">{selectedNode.name}</h2>
            </div>

            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1 font-sans">
              <span className="font-mono text-[10px] text-accent font-bold uppercase block">// DEFINITION:</span>
              <p className="text-ink text-xs leading-relaxed">{selectedNode.definition}</p>
            </div>

            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1 font-sans">
              <span className="font-mono text-[10px] text-signal font-bold uppercase block">// QUESTION ANSWERED:</span>
              <p className="text-ink-muted text-xs leading-relaxed">{selectedNode.questionAnswered}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-surface-sunken border border-hairline-faint">
                <span className="text-[9px] text-ink-faint uppercase block font-bold">OWNER:</span>
                <span className="text-ink font-semibold">{selectedNode.owner}</span>
              </div>
              <div className="p-2 rounded bg-surface-sunken border border-hairline-faint">
                <span className="text-[9px] text-accent uppercase block font-bold">BA RELEVANCE:</span>
                <span className="text-ink font-semibold">{selectedNode.baRelevance}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 font-sans space-y-1">
              <span className="font-mono text-[10px] text-red-400 font-bold uppercase block">⚠️ COMMON TRAP:</span>
              <p className="text-ink-muted text-xs leading-relaxed">{selectedNode.commonTrap}</p>
            </div>

            <button
              onClick={() => {
                setActiveSection(selectedNode.section);
                setIsMasterGraphOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-accent text-surface font-bold uppercase tracking-wider text-xs hover:opacity-90 transition-all cursor-pointer text-center block shadow-md"
            >
              Open {selectedNode.section.toUpperCase()} Workspace →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
