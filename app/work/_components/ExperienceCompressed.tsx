"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlossaryItem {
  term: string;
  definition: string;
}

interface ExperienceCard {
  company: string;
  role: string;
  flow: string[];
  points: string[];
  glossary: GlossaryItem[];
  boundaryNote?: string;
}

const experiences: ExperienceCard[] = [
  {
    company: "LENTRA AI",
    role: "Business Analyst · B2B Lending Platform",
    flow: [
      "Lending Policy",
      "Requirements",
      "Data Mapping",
      "Rule Logic",
      "Expected Result",
      "UAT / API Validation",
      "Defect Closure",
    ],
    points: [
      "translated policy and calculation logic into explicit system behaviour",
      "mapped source fields into lending/decision requirements",
      "validated calculations, interfaces and expected results",
      "coordinated defects through testing and closure",
    ],
    glossary: [
      {
        term: "BRD",
        definition: "business requirements describing the needed business behaviour.",
      },
      {
        term: "STTM",
        definition: "source-to-target mapping showing where a field originates, how it transforms and where it lands.",
      },
      {
        term: "UAT",
        definition: "business validation that the implemented system behaves as expected.",
      },
      {
        term: "API",
        definition: "structured request/response interface between systems.",
      },
    ],
    boundaryNote:
      "Designation: Business Analyst. Do not interpret platform-wide client figures as personally managed client count.",
  },
  {
    company: "JANA SMALL FINANCE BANK",
    role: "Manager · Loan Product & Portfolio Analytics",
    flow: [
      "Portfolio Data",
      "DPD / PAR / NPA",
      "Reconciliation",
      "SQL Workflow",
      "Management MIS",
    ],
    points: [
      "analysed loan balances and delinquency positions",
      "reconciled definitions and reported portfolio views",
      "used SQL to make recurring portfolio reporting more repeatable",
      "produced management-facing portfolio quality views",
    ],
    glossary: [
      {
        term: "DPD",
        definition: "days past due on a scheduled payment.",
      },
      {
        term: "PAR",
        definition: "portfolio exposure beyond a chosen delinquency threshold relative to total portfolio exposure.",
      },
      {
        term: "NPA",
        definition: "non-performing-asset classification in the applicable banking context.",
      },
      {
        term: "MIS",
        definition: "recurring management information view of portfolio condition.",
      },
      {
        term: "RECON",
        definition: "proving two representations of the same population/value agree or explaining the difference.",
      },
    ],
  },
];

export default function ExperienceCompressed() {
  const [activeGlossary, setActiveGlossary] = useState<{
    company: string;
    term: string;
  } | null>(null);

  const toggleTerm = (company: string, term: string) => {
    if (activeGlossary?.company === company && activeGlossary?.term === term) {
      setActiveGlossary(null);
    } else {
      setActiveGlossary({ company, term });
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-accent text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // SECTION 04 — EXPERIENCE, COMPRESSED
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="bg-surface-raised backdrop-blur-xl border border-hairline p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-accent tracking-widest uppercase">
                  {exp.company}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-ink mt-0.5">
                  {exp.role}
                </h3>
              </div>

              {/* Operating Flow */}
              <div className="bg-surface-sunken border border-hairline-faint p-3 rounded-lg mb-4">
                <div className="text-[10px] font-mono text-ink-faint uppercase tracking-wider mb-2">
                  // OPERATING FLOW
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs font-mono text-ink-muted">
                  {exp.flow.map((step, idx) => (
                    <span key={step} className="flex items-center gap-1.5">
                      <span className="text-ink font-medium">{step}</span>
                      {idx < exp.flow.length - 1 && (
                        <span className="text-accent/60">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bullet points */}
              <ul className="space-y-2 mb-5">
                {exp.points.map((pt) => (
                  <li
                    key={pt}
                    className="text-xs sm:text-sm text-ink-muted flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-accent font-bold mt-0.5">›</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Glossary chips */}
              <div className="pt-3 border-t border-hairline-faint">
                <div className="text-[10px] font-mono text-ink-faint uppercase tracking-wider mb-2">
                  GLOSSARY (CLICK TO REVEAL DEFINITION)
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {exp.glossary.map((g) => {
                    const isSelected =
                      activeGlossary?.company === exp.company &&
                      activeGlossary?.term === g.term;
                    return (
                      <button
                        key={g.term}
                        onClick={() => toggleTerm(exp.company, g.term)}
                        className={`text-[10px] font-mono px-2 py-1 rounded transition-colors cursor-pointer border ${
                          isSelected
                            ? "bg-accent text-surface font-bold border-accent"
                            : "bg-surface-sunken text-ink-muted hover:text-accent border-hairline-faint"
                        }`}
                      >
                        {g.term}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {exp.glossary.map((g) => {
                    if (
                      activeGlossary?.company === exp.company &&
                      activeGlossary?.term === g.term
                    ) {
                      return (
                        <motion.div
                          key={g.term}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-surface-sunken border border-accent-dim p-2.5 rounded text-xs font-mono text-ink-muted mb-2"
                        >
                          <strong className="text-accent">{g.term}:</strong>{" "}
                          {g.definition}
                        </motion.div>
                      );
                    }
                    return null;
                  })}
                </AnimatePresence>
              </div>

              {/* Boundary note */}
              {exp.boundaryNote && (
                <p className="mt-3 text-[11px] font-mono text-ink-faint italic leading-tight">
                  Note: {exp.boundaryNote}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
