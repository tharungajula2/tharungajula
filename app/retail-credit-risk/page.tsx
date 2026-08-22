import React from "react";
import { MasterclassHero, MasterFlow, TruthBoundary } from "@/components/masterclass";

export const metadata = {
  title: "Retail Credit Risk Masterclass | Portfolio Learning OS",
  description: "End-to-end retail credit-risk system: PD scorecard, two-stage LGD, EAD, IFRS 9 staging & ECL, Basel IRB capital, and portfolio monitoring.",
};

export default function RetailCreditRiskPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-8 text-ink font-sans space-y-10 pb-28 sm:pb-32">
      <MasterclassHero
        kicker="PORTFOLIO MASTERCLASS · RETAIL CREDIT RISK"
        title="Retail Credit Risk System"
        titleItalic="& Capital Framework"
        objective="How does historical borrower behaviour become PD, expected loss, IFRS 9 ECL provisions, Basel III IRB capital and portfolio monitoring?"
        tags={["Public LendingClub Data", "2007–2014", "Python", "PD → LGD → EAD → ECL → RWA"]}
        numbers={[
          { value: "466,285", label: "HISTORICAL LOANS" },
          { value: "50,968", label: "DEFAULT EVENTS" },
          { value: "2014", label: "OUT-OF-TIME VINTAGE" },
          { value: "$1.827B", label: "STAGED EAD" },
          { value: "$278.48M", label: "IFRS 9 ECL" },
          { value: "$2.295B", label: "IRB RWA" },
        ]}
      />

      <MasterFlow
        title="RETAIL CREDIT RISK MASTERFLOW"
        nodes={[
          { step: "01", title: "Data & Split", description: "466,285 loans, ever-default target, 2014 out-of-time vintage split" },
          { step: "02", title: "PD Scorecard", description: "WoE / IV binning → Logistic Regression → 600-point rating scorecard" },
          { step: "03", title: "Validation", description: "AUC (0.702), Gini, KS test, HL calibration & PSI stability checks" },
          { step: "04", title: "Severity & EAD", description: "Two-stage LGD recovery model & term-loan EAD outstanding principal" },
          { step: "05", title: "Provision & RWA", description: "IFRS 9 3-stage ECL provisions & Basel III Advanced IRB capital RWA" },
          { step: "06", title: "Monitoring", description: "Vintage MOB curves, delinquency distributions & automated MIS reports" },
        ]}
      />

      <TruthBoundary
        implemented={[
          "466,285 historical LendingClub consumer loans (2007–2014).",
          "600-point rating scorecard & 12-month PD logistic regression model.",
          "Out-of-time vintage validation on 2014 loan bookings (AUC 0.702).",
          "Two-stage LGD model (logistic recovery probability + linear recovery rate).",
          "IFRS 9 3-stage ECL staging logic & 5-year lifetime term structure discounting.",
          "Basel III Advanced IRB risk-weighted asset (RWA) formula calculations.",
        ]}
        illustrative={[
          "Raw calibration transfers to US unsecured consumer data; not UK commercial mortgages.",
          "Revolving credit CCF work in repository is a synthetic methodology demonstration.",
          "Multi-scenario macro ECL code includes a micro test fixture; not a full macro engine.",
        ]}
      />

      <div className="p-6 rounded-2xl bg-surface-raised border border-hairline font-mono text-xs text-ink-muted space-y-2 text-center">
        <span className="text-accent font-bold uppercase tracking-wider block">// MASTERCLASS UNDER DEVELOPMENT</span>
        <p className="font-sans text-sm">
          Full interactive 24-step masterclass workbench will be populated in upcoming masterclass packs.
        </p>
      </div>
    </div>
  );
}
