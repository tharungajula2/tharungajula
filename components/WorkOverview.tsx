"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pillars = [
  {
    label: "Retail Credit Risk",
    description: "PD, LGD and EAD modelling, ECL staging, capital, validation and portfolio monitoring.",
    proofs: [
      "PD Scorecards — Weight of Evidence and Information Value binning with logistic regression on a 466,285-loan book. Out-of-time Gini of 0.385 against 0.368 on development.",
      "ECL & Capital — IFRS 9 and Ind AS 109 staging with SICR criteria and lifetime PD term structures, plus Basel III Advanced IRB capital at $2.29B risk-weighted assets.",
      "Validation & Monitoring — AUROC, Gini, KS and calibration testing, with PSI and CSI drift monitoring across development, test and out-of-time samples.",
    ],
    link: {
      text: "View the credit risk repository →",
      href: "https://github.com/tharungajula2/retail-credit-risk",
    },
  },
  {
    label: "Banking & Lending Products",
    description: "Portfolio reporting, credit policy translation, and loan origination workflows inside institutional lending.",
    proofs: [
      "Portfolio Reporting — Owned automated reporting for the retail lending book at Jana Small Finance Bank in SQL and KNIME, cutting reporting turnaround by 30%.",
      "Portfolio Quality MIS — Delinquency buckets, DPD movement, PAR and NPA positions across product cuts for lending and risk stakeholders.",
      "Loan Origination — Mapped end-to-end workflows and translated lending policy into functional specifications for a B2B platform used by 12+ banking clients at Lentra AI.",
    ],
  },
  {
    label: "Applied Machine Learning",
    description: "Statistical and machine learning models on financial and customer data.",
    proofs: [
      "Classification — Neural networks and gradient boosting on churn and default problems, with explicit handling of class imbalance.",
      "Forecasting — SARIMA model selection across 625 candidate structures with rolling validation.",
      "Portfolio Analytics — Log returns, covariance and efficient frontier construction on the NIFTY 100.",
    ],
  },
  {
    label: "Systems & Interfaces",
    description: "Full-stack product systems, built end to end from problem to deployed interface.",
    proofs: [
      "LOC-IQ — Location intelligence console mapping 6 identifiers to 42 data fields across 46 API sources in a six-layer weighted graph.",
      "Parents Health OS — Offline-first elder-care console with WhatsApp check-ins, a rules-based triage engine, and LLM-based lab report extraction.",
      "Curiosity OS — 3D concept map of 147 reasoning concepts backed by 36 written activity playbooks.",
      "Stack — Next.js, React, TypeScript, Tailwind, Supabase.",
    ],
  },
];

export default function WorkOverview() {
  const [showStack, setShowStack] = useState(false);
  return (
    <div className="relative w-full max-w-5xl mx-auto py-24 sm:py-32 px-4 sm:px-6 pb-44 sm:pb-40">
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-tr from-accent-glow via-accent-glow/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-accent text-xs sm:text-[10px] tracking-[0.4em] font-mono uppercase font-semibold dark:opacity-70">
            // CAPABILITY_MAP
          </span>
          <div className="h-px flex-1 bg-hairline-faint" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight uppercase">
          What I Work On
        </h2>
      </motion.div>

      {/* 4 PILLAR CARDS */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
            className="bg-surface-raised backdrop-blur-2xl border border-hairline p-5 sm:p-6 rounded-2xl hover:border-hairline transition-all duration-500 shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Pillar Label */}
            <h3 className="text-base sm:text-lg font-bold text-ink tracking-wide uppercase mb-1">
              {pillar.label}
            </h3>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-4 font-normal dark:font-light">
              {pillar.description}
            </p>

            {/* Proof Points */}
            <ul className="space-y-2.5 flex-1">
              {pillar.proofs.map((proof) => (
                <li
                  key={proof}
                  className="text-xs sm:text-sm text-ink-muted leading-relaxed flex items-start gap-2 font-normal dark:font-light"
                >
                  <span className="text-accent mt-0.5 shrink-0 font-bold">›</span>
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
                className="mt-5 text-xs sm:text-xs font-mono text-accent font-semibold hover:underline transition-all tracking-wide"
              >
                {pillar.link.text}
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* PRODUCTION STACK BLOCK */}
      <div className="relative z-10 flex flex-col items-center mb-12">
        <button
          onClick={() => setShowStack(!showStack)}
          className="text-xs sm:text-xs font-mono tracking-[0.25em] text-accent bg-surface-sunken border border-accent-dim px-5 py-2.5 rounded-full cursor-pointer hover:bg-accent-glow hover:border-accent transition-all duration-300 uppercase select-none font-semibold text-center"
        >
          {showStack ? "Hide Production Stack" : "View Production Stack"}
        </button>

        <AnimatePresence>
          {showStack && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl bg-surface-raised backdrop-blur-2xl border border-hairline p-6 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left"
            >
              <h4 className="text-xs font-bold text-ink tracking-widest uppercase mb-3 font-mono border-b border-hairline-faint pb-2">
                // How I Build
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-ink-muted font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong>Models:</strong> Gemini 2.5 Flash Lite</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong>Orchestration:</strong> Edge Runtime SSE Streaming</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong>Frontend:</strong> Next.js 16, React 19, Tailwind CSS, Framer Motion, Spline 3D</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span><strong>Language:</strong> TypeScript, Node.js</span>
                </li>
                <li className="flex items-start gap-2 border-t border-hairline-faint pt-2 mt-2">
                  <span className="text-accent">•</span>
                  <span className="italic text-ink-muted"><strong>Focus:</strong> Systems that solve a real problem and stay usable.</span>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SYNTHESIS LINE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 text-sm sm:text-base text-ink-muted italic leading-relaxed max-w-2xl mx-auto text-center font-normal dark:font-light"
      >
        "Banking and finance training, credit risk modelling in depth, and the engineering to build the systems that carry them."
      </motion.p>
    </div>
  );
}
