"use client";

import React, { useState } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export interface ClusterInfo {
  id: string;
  name: string;
  category: string;
  nodes: string[];
  description: string;
}

const CLUSTERS: ClusterInfo[] = [
  {
    id: "banking",
    name: "Banking & Credit Risk",
    category: "Domain & Regulatory",
    nodes: ["Lending", "Credit Policy", "PD/LGD/EAD", "IFRS 9 ECL", "Basel / RWA", "Portfolio Monitoring"],
    description: "Credit risk lifecycle from origination and underwriting policy to quantitative loss estimation (PD/LGD/EAD), IFRS 9 staging, regulatory capital (Basel III IRB) and portfolio performance monitoring.",
  },
  {
    id: "ba",
    name: "Product & Business Analysis",
    category: "Delivery & Systems",
    nodes: ["Requirements", "Data Mapping", "UAT", "Rules Engine", "API Validation", "Defects", "Traceability"],
    description: "Translating business policy and regulatory mandates into exact functional requirements, source-to-target data mappings, decision tables, UAT execution packs, and end-to-end traceability matrix sign-offs.",
  },
  {
    id: "ml",
    name: "Analytics & Machine Learning",
    category: "Quantitative Modelling",
    nodes: ["Logistic Regression", "Neural Networks", "Classification", "Forecasting", "Validation", "Scorecards"],
    description: "End-to-end predictive modelling: WoE/IV binning, scorecard scaling, binary classification, neural network architectures, SMOTE sampling, SARIMA time-series, and rigorous validation (AUC, Gini, KS, PSI).",
  },
  {
    id: "portfolio",
    name: "Portfolio & Markets",
    category: "Financial Analytics",
    nodes: ["Equities", "Cross-Sectional Factors", "Covariance", "Portfolio Risk", "Tracking Error", "Monte Carlo"],
    description: "Portfolio construction and factor risk analytics: return covariance estimation, mean-variance optimization, factor signal ranking, turnover controls, and multi-factor risk attribution.",
  },
  {
    id: "data",
    name: "Data & Validation",
    category: "Governance & Engineering",
    nodes: ["SQL Workflows", "Data Quality", "Reconciliation", "Train/Test/OOT", "Calibration", "Stability"],
    description: "Empirical data engineering: SQL analytical queries, BCBS 239 risk data lineage, out-of-time vintage splitting, Hosmer-Lemeshow calibration checks, and Population Stability Index (PSI) drift monitoring.",
  },
  {
    id: "ai",
    name: "AI Systems & Engineering",
    category: "Product & Full Stack",
    nodes: ["Next.js", "TypeScript", "LLMs", "RAG", "Workflows", "Agents", "Evaluations"],
    description: "Building production web applications, decision interfaces, agentic AI workflows, interactive simulation workbenches, and automated evaluation harnesses using Next.js, React, and modern TypeScript.",
  },
];

const MASTERCLASSES = [
  {
    id: "credit-risk",
    name: "Retail Credit Risk",
    problemType: "Risk modelling + accounting + capital",
    question: "How does historical borrower behaviour become PD, expected loss, capital and portfolio monitoring?",
    flow: ["Default", "PD Scorecard", "Validation", "LGD / EAD", "IFRS 9 ECL", "Basel IRB RWA", "Monitoring"],
    href: "/retail-credit-risk",
  },
  {
    id: "churn",
    name: "Bank Customer Churn",
    problemType: "Binary classification + neural networks",
    question: "How do we identify likely churners when the positive class is relatively rare?",
    flow: ["Data", "Neural Net", "Probability", "Threshold", "Confusion Matrix", "Recall Trade-off"],
    href: "/churn",
  },
  {
    id: "time-series",
    name: "Time Series Forecasting",
    problemType: "SARIMA + chronological validation",
    question: "How do we forecast a monthly seasonal series without leaking future information?",
    flow: ["Series", "Stationarity", "Differencing", "SARIMA", "Residuals", "Holdout Evaluation"],
    href: "/time-series",
  },
  {
    id: "nifty",
    name: "NIFTY Portfolio",
    problemType: "Portfolio construction + covariance",
    question: "How do multiple assets combine into a better risk/return trade-off?",
    flow: ["Prices", "Returns", "Covariance", "Weights", "Portfolio Risk", "Efficient Frontier"],
    href: "/nifty",
  },
  {
    id: "client-equity",
    name: "Client Equity Framework",
    problemType: "Cross-sectional stock selection + portfolio implementation",
    question: "How do factor signals become a controlled, testable portfolio construction process?",
    flow: ["Universe", "Factor Signals", "Ranking", "Portfolio Construction", "Turnover Controls", "Robustness"],
    href: "/client-equity",
  },
  {
    id: "loc-iq",
    name: "LOC-IQ",
    problemType: "Product architecture + evidence graph",
    question: "How can multiple digital location signals be combined into an explainable fraud/underwriting interface?",
    flow: ["Identifiers", "Sources", "Fields", "Signals", "Candidate Locations", "Truth Flag"],
    href: "/loc-iq",
  },
];

export default function PortfolioLearningOSHome() {
  const [selectedClusterId, setSelectedClusterId] = useState<string>("banking");
  const activeCluster = CLUSTERS.find((c) => c.id === selectedClusterId) || CLUSTERS[0];

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-8 text-ink font-sans space-y-12 sm:space-y-16 pb-28 sm:pb-32">
      {/* ─── HOME SECTION A — HERO ─── */}
      <section aria-label="Hero Section" className="border-b border-hairline pb-8 select-none">
        <div className="text-[10px] sm:text-xs font-mono tracking-[0.14em] uppercase text-accent font-semibold mb-2">
          // PORTFOLIO LEARNING OS
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-ink font-normal tracking-tight leading-[1.05] max-w-4xl mb-4">
          Banking, analytics and systems — <em className="italic text-accent">connected through the problems they solve.</em>
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl font-sans mb-6">
          The body of work progresses from banking-domain understanding into lending systems, portfolio analytics, quantitative modelling and complete product/system building. Projects are evidence of that progression rather than disconnected identities.
        </p>

        <div className="flex flex-wrap gap-2">
          {["Banking & Finance", "Credit Risk", "Applied ML", "Portfolio Analytics", "Product / BA", "AI Systems"].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase border border-hairline bg-surface-raised text-ink-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ─── HOME SECTION B — PROFILE SPINE ─── */}
      <section aria-label="Profile Spine" className="space-y-4 select-none">
        <div className="border-b border-hairline pb-2 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-accent tracking-[0.14em] uppercase font-semibold">// PROFILE SPINE</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">Not disconnected chapters. <em className="italic text-accent">One progression.</em></h2>
          </div>
          <span className="hidden sm:inline font-mono text-[10px] text-ink-faint uppercase">6 DOMAIN STAGES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { num: "01", title: "Engineering Base", desc: "Structured problem solving and building complex things from first principles." },
            { num: "02", title: "NIBM", desc: "Banking and finance foundation: lending, risk, markets and balance-sheet thinking." },
            { num: "03", title: "Lentra", desc: "Policy → requirements → data mapping → underwriting logic → testing." },
            { num: "04", title: "Jana", desc: "Portfolio → delinquency / PAR / NPA → SQL workflows → management MIS." },
            { num: "05", title: "IISc + Practice", desc: "ML / DL depth, modelling, validation, forecasting and portfolio analytics." },
            { num: "06", title: "Product Systems", desc: "Models + workflows + interfaces + AI-assisted development + evidence." },
          ].map((item) => (
            <div
              key={item.num}
              className="p-4 rounded-xl bg-surface-raised border border-hairline flex flex-col justify-between space-y-2 hover:border-accent/40 transition-all"
            >
              <div>
                <span className="font-mono text-xs text-accent font-bold">#{item.num}</span>
                <div className="font-bold text-ink text-xs sm:text-sm mt-1 mb-1 font-mono">{item.title}</div>
                <p className="text-ink-muted text-[11px] sm:text-xs leading-relaxed font-sans">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOME SECTION C — ONE CONNECTED STORY ─── */}
      <section aria-label="One Connected Story" className="space-y-4 select-none">
        <div className="border-b border-hairline pb-2">
          <span className="text-[10px] font-mono text-accent tracking-[0.14em] uppercase font-semibold">// OPERATING PATTERN</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">The common working pattern.</h2>
        </div>

        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 text-center text-[11px]">
            {["Banking Domain", "Lending Systems", "Portfolio Monitoring", "Quantitative Modelling", "Portfolio Analytics", "Product Systems"].map((node, idx, arr) => (
              <React.Fragment key={node}>
                <div className="p-2.5 rounded-xl bg-surface-sunken border border-hairline font-bold text-accent shrink-0">
                  {node}
                </div>
                {idx < arr.length - 1 && <span className="text-accent font-sans">→</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 font-sans text-xs text-ink leading-relaxed">
            <strong>Operating Principle:</strong> The common working pattern is to define the decision, understand the data, select the method, validate the result and make the output usable through a workflow or interface.
          </div>
        </div>
      </section>

      {/* ─── HOME SECTION D — EXPERIENCE ─── */}
      <section aria-label="Experience" className="space-y-4 select-none">
        <div className="border-b border-hairline pb-2 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-accent tracking-[0.14em] uppercase font-semibold">// EXPERIENCE</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">Essential operating context.</h2>
          </div>
          <span className="text-[10px] font-mono text-ink-faint uppercase">2 PRIMARY ROLES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LENTRA AI CARD */}
          <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-hairline pb-2">
              <div>
                <h3 className="font-serif text-xl text-ink font-normal">LENTRA AI</h3>
                <span className="text-[11px] text-accent font-bold uppercase block">Business Analyst · B2B Lending Platform</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline text-[11px] space-y-1">
              <span className="text-[9px] text-ink-faint uppercase font-bold block">// CORE OPERATING LOOP:</span>
              <p className="text-accent font-bold leading-normal">
                Lending policy → requirements → data mapping → rule implementation → expected result → UAT/API validation → defect closure
              </p>
            </div>

            <ul className="space-y-1.5 text-ink-muted text-xs font-sans list-disc list-inside">
              <li>Authored BRD and functional specs for automated credit underwriting rules.</li>
              <li>Defined Source-to-Target Data Mappings (STTM) across core banking APIs.</li>
              <li>Executed UAT test packs and verified credit rule execution against bank policy.</li>
              <li>Validated JSON payload schemas and API contracts for loan origination.</li>
            </ul>

            <div className="pt-2 border-t border-hairline-faint text-[10px] text-ink-faint font-sans italic">
              Boundary: Role was Business Analyst; does not imply personal management of the entire platform client base.
            </div>
          </div>

          {/* JANA SMALL FINANCE BANK CARD */}
          <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-hairline pb-2">
              <div>
                <h3 className="font-serif text-xl text-ink font-normal">JANA SMALL FINANCE BANK</h3>
                <span className="text-[11px] text-accent font-bold uppercase block">Manager · Loan Product & Portfolio Analytics</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-sunken border border-hairline text-[11px] space-y-1">
              <span className="text-[9px] text-ink-faint uppercase font-bold block">// CORE OPERATING LOOP:</span>
              <p className="text-accent font-bold leading-normal">
                Portfolio data → DPD / PAR / NPA → reconciliation → SQL workflow → management MIS
              </p>
            </div>

            <ul className="space-y-1.5 text-ink-muted text-xs font-sans list-disc list-inside">
              <li>Tracked portfolio performance metrics: Days Past Due (DPD), Portfolio at Risk (PAR), and Non-Performing Assets (NPA).</li>
              <li>Executed SQL analytical workflows to audit delinquency roll-rates.</li>
              <li>Reconciled daily repayment feeds against general ledger loan accounts.</li>
              <li>Compiled executive management MIS reports for risk oversight committees.</li>
            </ul>

            <div className="pt-2 border-t border-hairline-faint text-[10px] text-ink-faint font-sans italic">
              Boundary: Focused on portfolio monitoring operating context; theory is detailed in masterclasses.
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOME SECTION E — PROFILE MAP ─── */}
      <section aria-label="Profile Map" className="space-y-4 select-none">
        <div className="border-b border-hairline pb-2 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-accent tracking-[0.14em] uppercase font-semibold">// PROFILE MAP</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">Interactive capability clusters.</h2>
          </div>
          <span className="text-[10px] font-mono text-ink-faint uppercase">CLICK CLUSTER TO INSPECT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-mono text-xs">
          {/* CLUSTERS GRID (2 COLS ON LG) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CLUSTERS.map((cluster) => {
              const isSelected = cluster.id === activeCluster.id;
              return (
                <button
                  key={cluster.id}
                  onClick={() => setSelectedClusterId(cluster.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-accent/15 border-accent text-accent shadow-md"
                      : "bg-surface-raised border-hairline hover:border-accent/40 text-ink-muted"
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent font-bold uppercase">
                      {cluster.category}
                    </span>
                  </div>
                  <div className="font-serif text-lg font-normal text-ink">{cluster.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {cluster.nodes.slice(0, 3).map((n) => (
                      <span key={n} className="px-1.5 py-0.5 rounded bg-surface-sunken text-[9px] border border-hairline-faint text-ink-muted">
                        {n}
                      </span>
                    ))}
                    {cluster.nodes.length > 3 && (
                      <span className="text-[9px] text-accent font-bold">+ {cluster.nodes.length - 3} more</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* CENTER SYSTEM BUILDER PANEL & ACTIVE CLUSTER INSPECTOR */}
          <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-4 flex flex-col justify-between">
            {/* CENTER NODE */}
            <div className="p-3.5 rounded-xl bg-surface-sunken border border-accent/40 text-center space-y-1">
              <span className="text-[9px] text-accent font-bold uppercase tracking-wider block">// CENTER INTEGRATION NODE:</span>
              <div className="font-serif text-xl text-ink font-normal">Problem → System Builder</div>
              <div className="text-[10px] text-accent font-bold tracking-widest uppercase">
                Frame → Map → Build → Evidence → Ship
              </div>
            </div>

            {/* ACTIVE CLUSTER DETAILS */}
            <div className="space-y-2 flex-1 pt-2">
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-accent font-bold uppercase">{activeCluster.category}</span>
                <span className="text-ink-faint uppercase">{activeCluster.nodes.length} NODES</span>
              </div>

              <h3 className="font-serif text-2xl text-ink font-normal">{activeCluster.name}</h3>

              <div className="flex flex-wrap gap-1 mb-2">
                {activeCluster.nodes.map((n) => (
                  <span key={n} className="px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent font-bold text-[10px]">
                    {n}
                  </span>
                ))}
              </div>

              <p className="text-ink-muted font-sans text-xs leading-relaxed">
                {activeCluster.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOME SECTION F — PROJECT MASTERCLASS INDEX ─── */}
      <section aria-label="Masterclass Index" className="space-y-4 select-none">
        <div className="border-b border-hairline pb-2 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-accent tracking-[0.14em] uppercase font-semibold">// MASTERCLASS INDEX</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">6 First-Class Masterclass Routes.</h2>
          </div>
          <span className="text-[10px] font-mono text-ink-faint uppercase">RIGOROUS INTERACTIVE NOTEBOOKS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MASTERCLASSES.map((mc) => (
            <div
              key={mc.id}
              className="p-5 rounded-2xl bg-surface-raised border border-hairline hover:border-accent/50 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-bold uppercase">MASTERCLASS</span>
                  <span className="text-ink-faint uppercase">{mc.problemType}</span>
                </div>

                <h3 className="font-serif text-2xl text-ink font-normal group-hover:text-accent transition-colors">
                  {mc.name}
                </h3>

                <p className="text-ink-muted text-xs leading-relaxed font-sans italic border-l-2 border-accent/40 pl-2">
                  "{mc.question}"
                </p>

                {/* MASTERFLOW PREVIEW */}
                <div className="p-2.5 rounded-xl bg-surface-sunken border border-hairline font-mono text-[10px] space-y-1">
                  <span className="text-[8.5px] text-ink-faint uppercase font-bold block">// MASTERFLOW PREVIEW:</span>
                  <div className="text-accent font-semibold leading-tight">
                    {mc.flow.join(" → ")}
                  </div>
                </div>
              </div>

              <Link
                href={mc.href}
                className="w-full py-2.5 rounded-xl bg-surface-sunken hover:bg-accent hover:text-surface border border-hairline font-mono text-xs font-bold uppercase tracking-wider text-accent transition-all text-center cursor-pointer block shadow-sm"
              >
                Open Masterclass →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOME SECTION G — HOW TO USE THIS APP ─── */}
      <section aria-label="How to use this app" className="space-y-4 select-none">
        <div className="border-b border-hairline pb-2">
          <span className="text-[10px] font-mono text-accent tracking-[0.14em] uppercase font-semibold">// METHODOLOGY</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">How to use this learning reference.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1.5">
            <span className="text-accent font-bold text-sm">01 · Understand</span>
            <div className="font-bold text-ink text-xs uppercase font-mono">Start with Masterflow</div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              Follow the end-to-end execution flow before diving into individual component math or code.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1.5">
            <span className="text-accent font-bold text-sm">02 · Learn</span>
            <div className="font-bold text-ink text-xs uppercase font-mono">Concepts in Context</div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              Open concept cards and definitions where they actually appear in the workflow.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1.5">
            <span className="text-accent font-bold text-sm">03 · Reconstruct</span>
            <div className="font-bold text-ink text-xs uppercase font-mono">Formulas & Arithmetic</div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              Use worked examples and formulas to verify calculations from first principles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-1.5">
            <span className="text-accent font-bold text-sm">04 · Recall</span>
            <div className="font-bold text-ink text-xs uppercase font-mono">Rapid Recall System</div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              Consolidate key memory rules and terminology using the global Rapid Recall shell.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
