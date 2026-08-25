"use client";

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useCreditRiskOS, NavSection } from '../../_state/creditRiskOSContext';
import { X, Network, RefreshCw } from 'lucide-react';

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
    { id: 'bank', name: 'Vanguard Bank India', group: 'Process', section: 'bank', definition: 'Regulated commercial entity with ₹38,500 Cr in balance sheet assets.', questionAnswered: 'What is the overall entity position?', owner: 'CFO / CRO', baRelevance: 'Top-level system boundary.', commonTrap: 'Confusing single credit portfolio with whole bank balance sheet.' },
    { id: 'origination', name: 'Loan Origination', group: 'Process', section: 'customers', definition: 'Customer loan application and limit structuring.', questionAnswered: 'How does the loan enter the bank?', owner: 'Relationship Manager', baRelevance: 'Captures facility limits, currencies, and products.', commonTrap: 'Incomplete origination metadata.' },
    { id: 'underwriting', name: 'Credit Underwriting', group: 'Process', section: 'customers', definition: 'Financial analysis, debt service coverage, and collateral valuation.', questionAnswered: 'Should credit be approved?', owner: 'Underwriting Committee', baRelevance: 'Establishes initial internal rating and sanctioned limits.', commonTrap: 'Unsanctioned limit overruns.' },
    { id: 'monitoring', name: 'Credit Risk Monitoring', group: 'Process', section: 'customers', definition: 'Continuous monitoring of DPD, covenants, and collateral haircuts.', questionAnswered: 'Is performance deteriorating?', owner: 'Specialist Debt Recovery', baRelevance: 'Defines early warning watchlist rules.', commonTrap: 'Relying solely on 30 DPD for deterioration.' },

    { id: 'pd', name: 'Probability of Default (PD)', group: 'Risk', section: 'credit-risk', definition: 'Statistical 12-month likelihood of default event.', questionAnswered: 'How likely is default?', owner: 'Model Development', baRelevance: 'Scorecard input mapping & rating calibration.', commonTrap: 'Confusing PIT PD (Ind AS 109) with TTC PD (Capital).' },
    { id: 'lgd', name: 'Loss Given Default (LGD)', group: 'Risk', section: 'credit-risk', definition: 'Economic loss percentage following collateral recovery.', questionAnswered: 'How severe is loss if default occurs?', owner: 'Collateral Risk Desk', baRelevance: 'Collateral haircut rules & recovery cost specs.', commonTrap: 'Neglecting legal recovery discount rates.' },
    { id: 'ead', name: 'Exposure at Default (EAD)', group: 'Risk', section: 'credit-risk', definition: 'Total balance sheet exposure at default moment.', questionAnswered: 'What is the gross default exposure?', owner: 'EAD Analytics', baRelevance: 'CCF formula specs: Drawn + (CCF × Undrawn).', commonTrap: 'Assuming undrawn commitment is zero risk.' },

    { id: 'ifrs9', name: 'Ind AS 109 Engine', group: 'Accounting', section: 'ifrs9', definition: 'Forward-looking 3-stage ECL accounting framework.', questionAnswered: 'What provision should be posted to GL?', owner: 'Finance Impairment Desk', baRelevance: 'Staging rules & lifetime term structure specs.', commonTrap: 'Equating Ind AS 109 ECL with RBI Basel RWA.' },
    { id: 'sicr', name: 'SICR Staging Rules', group: 'Accounting', section: 'ifrs9', definition: 'Triggers transitioning Stage 1 (12M) to Stage 2 (Lifetime).', questionAnswered: 'Has credit risk increased significantly?', owner: 'Impairment Governance', baRelevance: 'Decision tables comparing current vs origination PD.', commonTrap: 'Treating 30 DPD as the sole Stage 2 trigger.' },
    { id: 'ecl', name: 'Expected Credit Loss (ECL)', group: 'Accounting', section: 'ifrs9', definition: 'Carrying financial provision posted on balance sheet.', questionAnswered: 'What is the carrying impairment reserve?', owner: 'Financial Controller', baRelevance: 'Reconciling ECL output to General Ledger.', commonTrap: 'Confusing ECL carrying provisions with capital.' },

    { id: 'basel31', name: 'RBI Basel III Framework', group: 'Capital', section: 'capital', definition: 'Prudential capital adequacy and 72.5% output floor rules.', questionAnswered: 'Is the bank adequately capitalized for unexpected loss?', owner: 'Prudential Capital Policy', baRelevance: 'Building dual SA vs IRB RWA calculation pipelines.', commonTrap: 'Claiming output floor is operative before implementation timeline.' },
    { id: 'rwa', name: 'Risk-Weighted Assets (RWA)', group: 'Capital', section: 'capital', definition: 'Assets weighted by credit, market, and operational risk.', questionAnswered: 'What is the risk-adjusted capital denominator?', owner: 'Capital Management', baRelevance: 'Mapping RWA calculation rules across asset classes.', commonTrap: 'Confusing RWA denominator with CET1 numerator.' },
    { id: 'cet1', name: 'CET1 Capital Ratio', group: 'Capital', section: 'capital', definition: 'Common Equity Tier 1 capital divided by total RWA.', questionAnswered: 'Does the bank satisfy regulatory capital targets?', owner: 'Treasurer & CRO', baRelevance: 'Reporting regulatory capital cushion to RBI.', commonTrap: 'Dividing whole-bank CET1 by single credit portfolio RWA.' },

    { id: 'lcr', name: 'Liquidity Coverage Ratio (LCR)', group: 'Treasury', section: 'treasury', definition: '30-day stressed liquidity cash outflow buffer.', questionAnswered: 'Can the bank survive a 30-day cash run?', owner: 'Treasury Desk', baRelevance: 'HQLA buffer rules & 30-day run-off rate specs.', commonTrap: 'Confusing liquidity floor (100%) with internal target (120%).' },
    { id: 'ftp', name: 'Funds Transfer Pricing (FTP)', group: 'Treasury', section: 'treasury', definition: 'Internal cost of funds attribution: Base + Liquidity + Credit.', questionAnswered: 'How do we price liquidity internally?', owner: 'ALCO & Treasury', baRelevance: 'FTP decomposition formula specifications.', commonTrap: 'Ignoring liquidity term premium in loan pricing.' },

    { id: 'bcbs239', name: 'BCBS 239 Risk Lineage', group: 'Reporting', section: 'data', definition: 'Pillar standards for risk data aggregation and lineage.', questionAnswered: 'Can every reported number be audited to source?', owner: 'Chief Data Officer', baRelevance: 'Source-to-target mapping & data dictionary definition.', commonTrap: 'Reporting accurate numbers without audit lineage.' },
    { id: 'corep', name: 'Regulatory Returns', group: 'Reporting', section: 'reporting', definition: 'Statutory quarterly regulatory returns.', questionAnswered: 'What data is filed with regulators?', owner: 'Regulatory Reporting', baRelevance: 'Automated validation rules & report-to-ledger checks.', commonTrap: 'Filing un-reconciled figures to regulators.' },

    { id: 'brd', name: 'BRD / FSD Traceability', group: 'BA Delivery', section: 'change', definition: 'End-to-end traceability matrix from regulation to code.', questionAnswered: 'Is regulatory compliance fully specified?', owner: 'Lead Business Analyst', baRelevance: 'Mapping legal paragraphs to software user stories.', commonTrap: 'Building system logic without formal functional specs.' },
    { id: 'uat', name: 'UAT Test Execution', group: 'BA Delivery', section: 'change', definition: 'Acceptance testing validating engine output against Excel models.', questionAnswered: 'Does the software execute as required?', owner: 'UAT QA Manager', baRelevance: 'Designing deterministic benchmark test scenarios.', commonTrap: 'Signing off UAT without verifying reconciliation identities.' },
  ],
  links: [
    { source: 'bank', target: 'origination', label: 'Books Loans' },
    { source: 'origination', target: 'underwriting', label: 'Submits for Approval' },
    { source: 'underwriting', target: 'monitoring', label: 'Passes Approved Limit' },

    { source: 'underwriting', target: 'pd', label: 'Assigns Rating' },
    { source: 'underwriting', target: 'lgd', label: 'Values Collateral' },
    { source: 'origination', target: 'ead', label: 'Structures Limit & CCF' },

    { source: 'monitoring', target: 'sicr', label: 'Feeds DPD & Watchlist' },
    { source: 'pd', target: 'sicr', label: 'Triggers Relative PD' },
    { source: 'sicr', target: 'ifrs9', label: 'Determines Stage 1/2/3' },

    { source: 'pd', target: 'ifrs9', label: 'Inputs 1Y / Lifetime PD' },
    { source: 'lgd', target: 'ifrs9', label: 'Inputs LGD %' },
    { source: 'ead', target: 'ifrs9', label: 'Inputs EAD Amount' },
    { source: 'ifrs9', target: 'ecl', label: 'Calculates Provision' },

    { source: 'pd', target: 'basel31', label: 'IRB Curve Input' },
    { source: 'lgd', target: 'basel31', label: 'IRB LGD Input' },
    { source: 'ead', target: 'basel31', label: 'EAD Exposure' },
    { source: 'basel31', target: 'rwa', label: 'Applies 72.5% Floor' },
    { source: 'rwa', target: 'cet1', label: 'RWA Denominator' },
    { source: 'bank', target: 'cet1', label: 'CET1 Capital Numerator' },

    { source: 'origination', target: 'ftp', label: 'Applies FTP Loan Rate' },
    { source: 'bank', target: 'lcr', label: 'HQLA Liquidity Pool' },

    { source: 'ecl', target: 'bcbs239', label: 'Lineage Trace' },
    { source: 'rwa', target: 'bcbs239', label: 'Lineage Trace' },
    { source: 'bcbs239', target: 'corep', label: 'Populates Return' },

    { source: 'corep', target: 'brd', label: 'Regulatory Driver' },
    { source: 'brd', target: 'uat', label: 'Defines Test Cases' },
  ],
};

export default function MasterEcosystemGraph() {
  const { isMasterGraphOpen, setIsMasterGraphOpen, setActiveSection } = useCreditRiskOS();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(GRAPH_DATA.nodes[0]);

  if (!isMasterGraphOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none animate-in fade-in duration-200 text-slate-100 font-mono text-xs">
      <div className="bg-[#0f172a] border border-cyan-500/40 w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="h-14 border-b border-white/10 px-5 flex items-center justify-between bg-slate-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <Network className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-bold text-slate-100 uppercase tracking-wider text-sm">
              // CREDIT RISK OS MASTER ECOSYSTEM TOPOLOGY GRAPH
            </span>
          </div>

          <button
            onClick={() => setIsMasterGraphOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY: CANVAS + NODE INSPECTOR */}
        <div className="flex-1 flex overflow-hidden">
          {/* CANVAS GRAPH AREA */}
          <div className="flex-1 bg-[#0b0f19] relative">
            <ForceGraph2D
              graphData={GRAPH_DATA}
              nodeLabel="name"
              nodeAutoColorBy="group"
              nodeRelSize={6}
              linkDirectionalParticles={2}
              linkDirectionalParticleSpeed={0.005}
              onNodeClick={(node: any) => setSelectedNode(node as GraphNode)}
              backgroundColor="#0b0f19"
            />
          </div>

          {/* RIGHT NODE INSPECTOR PANEL */}
          {selectedNode && (
            <div className="w-80 border-l border-white/10 bg-slate-900/90 p-5 space-y-4 overflow-y-auto no-scrollbar font-sans text-xs shrink-0">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-[10px] font-bold uppercase">
                  {selectedNode.group}
                </span>
                <h3 className="text-lg font-bold text-slate-100 uppercase font-mono tracking-tight">{selectedNode.name}</h3>
              </div>

              <div className="space-y-3 text-slate-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1 font-mono text-[11px]">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase block">DEFINITION:</span>
                  <p>{selectedNode.definition}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1 font-mono text-[11px]">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase block">OWNER & GOVERNANCE:</span>
                  <p className="text-cyan-300 font-bold">{selectedNode.owner}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1 font-mono text-[11px]">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase block">BA RELEVANCE:</span>
                  <p>{selectedNode.baRelevance}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveSection(selectedNode.section);
                  setIsMasterGraphOpen(false);
                }}
                className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-cyan-500/20"
              >
                OPEN WORKSPACE TOOL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
