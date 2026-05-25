"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    label: "Product Ownership",
    description: "Internal Product Owner & Workflow Architect bridging complex logic with engineering to deliver high-performance loan products and optimized workflows.",
    proofs: [
      "B2B Loan Origination Systems — Managed PRDs and mapped complex banking workflows for Lentra AI across 12+ bank integrations.",
      "Credit Risk Loan Products — Engineered risk frameworks and loan product workflows at Jana Small Finance Bank.",
      "Cross-Functional Stakeholder Alignment — Coordinated engineering, risk, and operations teams.",
      "UAT & API Integration — Structured test suites, API specifications, and reduced operational decisioning turnaround by 30%.",
    ],
  },
  {
    label: "Quantitative Systems",
    description: "Statistical scoring models, predictive neural networks, and forecasting engines built on financial datasets.",
    proofs: [
      "Credit Risk Decisioning (PD/LGD/EAD) — Mapped mathematical risk models to active credit pipelines.",
      "Bank Customer Churn Engine — Engineered predictive neural networks to model customer attrition metrics.",
      "Antidiabetic Demand Forecasting — Structured SARIMA time-series models for pharmaceutical supply chains.",
      "NIFTY 100 Portfolio Optimization — Built efficient frontiers and Sharpe ratio risk-return profiles.",
      "Lending Club Risk Classifier — Designed features and trained default probability classifiers.",
    ],
    link: {
      text: "View analytics portfolio →",
      href: "https://github.com/tharungajula2/Portfolio",
    },
  },
  {
    label: "AI Prototyping",
    description: "6 functional concept prototypes shipped to test dense logic, LLM orchestration, and pixel-perfect aesthetics.",
    proofs: [
      "Therapy Matching OS — Functional concept engine matching users to therapists via clinical alliance logic (58 data points).",
      "Parents Health OS — Geriatric care prototype utilizing clinical matrices, health indices, and document synthesis.",
      "Quant OS — Interactive physics-based spatial knowledge graph making analytics portfolios navigable.",
      "Curiosity OS — Pedagogy design workspace mapping 147 curriculum nodes in a highly visual loop.",
      "Relational Matching OS — Psychology-backed connection prototype utilizing a 3-layer matching algorithm.",
      "IISc Deep Learning Programme — Academic grounding in deep learning architectures (Grade: 92%).",
    ],
  },
  {
    label: "Adaptive Craft",
    description: "Interface development and product storytelling — translating abstract problems into premium user experiences.",
    proofs: [
      "Product Development — Next.js, React, and Tailwind CSS development.",
      "Spatial & Interface Design — Designing layouts that balance high-density logic with crisp usability.",
      "Visual & GTM Execution — Developing high-quality product walkthrough videos and brand architectures.",
      "High-Agency Systems Thinking — Rapidly mastering unfamiliar clinical, psychological, and FMCG domains.",
    ],
  },
];

export default function WorkOverview() {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-32 px-6 pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-cyan-500/5 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan-400 text-[9px] tracking-[0.4em] font-mono uppercase opacity-70">
            // CAPABILITY_MAP
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
          What I Bring
        </h2>
      </motion.div>

      {/* 4 PILLAR CARDS */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
            className="bg-black/50 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Pillar Label */}
            <h3 className="text-base font-bold text-white tracking-wide uppercase mb-1">
              {pillar.label}
            </h3>
            <p className="text-xs text-white/50 leading-relaxed mb-4">
              {pillar.description}
            </p>

            {/* Proof Points */}
            <ul className="space-y-2 flex-1">
              {pillar.proofs.map((proof) => (
                <li
                  key={proof}
                  className="text-xs text-white/70 leading-relaxed flex items-start gap-2"
                >
                  <span className="text-cyan-400/60 mt-0.5 shrink-0">›</span>
                  {proof}
                </li>
              ))}
            </ul>

            {/* Optional Link */}
            {pillar.link && (
              <a
                href={pillar.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-[10px] font-mono text-cyan-400/70 hover:text-cyan-400 transition-colors tracking-wide"
              >
                {pillar.link.text}
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* SYNTHESIS LINE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 text-sm text-white/40 italic leading-relaxed max-w-2xl mx-auto text-center font-light"
      >
        These work together. The quantitative background provides system rigor. The institutional experience provides product judgment. The prototyping lab provides speed. The design craft makes it intuitive.
      </motion.p>
    </div>
  );
}
