import React from "react";
import { MasterclassHero, MasterFlow } from "@/components/masterclass";

export const metadata = {
  title: "How I Build | Portfolio Learning OS",
  description: "Operating principles, system engineering workflow, and full-stack AI product development methodology.",
};

export default function HowIBuildPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-8 text-ink font-sans space-y-10 pb-28 sm:pb-32">
      <MasterclassHero
        kicker="PORTFOLIO METHODOLOGY · SYSTEM ENGINEERING"
        title="How I Build Systems"
        titleItalic="& Decision Products"
        objective="The common working pattern: define the decision, understand the data, select the method, validate the result, and make the output usable through a workflow or interface."
        tags={["Domain Reasoning", "Data Mapping", "Applied ML", "Product & BA", "TypeScript / Next.js"]}
        numbers={[
          { value: "FRAME", label: "DECISION DEFINITION" },
          { value: "MAP", label: "DATA & SCHEMA" },
          { value: "BUILD", label: "MODEL & ENGINE" },
          { value: "EVIDENCE", label: "VALIDATION" },
          { value: "SHIP", label: "WORKFLOW UI" },
        ]}
      />

      <MasterFlow
        title="SYSTEM BUILD OPERATING LOOP"
        nodes={[
          { step: "01", title: "Frame Decision", description: "Define the core business problem, regulatory boundaries & expected action" },
          { step: "02", title: "Map Schemas", description: "Design source-to-target data mappings, grain, datatypes & business rules" },
          { step: "03", title: "Build Engine", description: "Construct pure deterministic or quantitative machine learning calculation engines" },
          { step: "04", title: "Validate Evidence", description: "Execute out-of-time validation, AUC/Gini, calibration & reconciliation checks" },
          { step: "05", title: "Design Interface", description: "Build full-screen interactive workbenches with audit lineage & inspection" },
          { step: "06", title: "Ship & Trace", description: "Maintain 100% requirements traceability matrix from driver to sign-off" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs select-none">
        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-2">
          <span className="text-accent font-bold uppercase text-xs">// 01. DOMAIN FIRST</span>
          <p className="text-ink-muted font-sans text-xs leading-relaxed">
            Technology serves business decisions. We begin by understanding balance sheets, credit policy, cash flows, and regulatory mandates before writing code.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-2">
          <span className="text-signal font-bold uppercase text-xs">// 02. FACTUAL RIGOR</span>
          <p className="text-ink-muted font-sans text-xs leading-relaxed">
            Every metric must be grounded in empirical data or mathematical formulas. We clearly separate project data from illustrative teaching examples.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-2">
          <span className="text-blue font-bold uppercase text-xs">// 03. FULL-STACK DELIVERY</span>
          <p className="text-ink-muted font-sans text-xs leading-relaxed">
            Connecting models, workflows, and interfaces into responsive, interactive web applications built with Next.js, React, and TypeScript.
          </p>
        </div>
      </div>
    </div>
  );
}
