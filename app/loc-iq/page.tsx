import React from "react";
import { MasterclassHero, MasterFlow, TruthBoundary } from "@/components/masterclass";

export const metadata = {
  title: "LOC-IQ Product Architecture | Portfolio Learning OS",
  description: "Product architecture and multi-signal location intelligence evidence graph for fraud and underwriting.",
};

export default function LocIqPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-8 text-ink font-sans space-y-10 pb-28 sm:pb-32">
      <MasterclassHero
        kicker="PORTFOLIO MASTERCLASS · PRODUCT SYSTEM"
        title="LOC-IQ Location Intelligence"
        titleItalic="& Evidence Graph"
        objective="How can multiple digital location signals be combined into an explainable fraud/underwriting interface?"
        tags={["Next.js / React / TS", "ReactFlow 6-Layer Graph", "Composite Edge-Weights", "Proxy-IP Downweighting"]}
        numbers={[
          { value: "6", label: "PRIMARY IDENTIFIERS" },
          { value: "46", label: "SOURCE TYPES" },
          { value: "42", label: "FETCHED FIELDS" },
          { value: "6-LAYER", label: "EVIDENCE GRAPH" },
          { value: "INTERACTIVE", label: "WORKBENCH UI" },
        ]}
      />

      <MasterFlow
        title="LOC-IQ PRODUCT MASTERFLOW"
        nodes={[
          { step: "01", title: "Identifiers", description: "6 primary customer identifiers (IP, Cell Tower, GPS, Wi-Fi BSSID, Device ID, User Address)" },
          { step: "02", title: "Sources", description: "46 mapped geolocation data source types across telecom, ISP & SDK feeds" },
          { step: "03", title: "Fetched Fields", description: "42 defined fetched fields (lat/long, precision radius, proxy flags, timestamp)" },
          { step: "04", title: "Signal Graph", description: "ReactFlow 6-layer graph calculating composite edge-weights & downweighting proxy-IPs" },
          { step: "05", title: "Candidate Locations", description: "Clustering candidate location centroids with confidence radii" },
          { step: "06", title: "Truth Flag", description: "Final explainable location verification decision & fraud alert flag" },
        ]}
      />

      <TruthBoundary
        implemented={[
          "Next.js / React / TypeScript full-screen web application.",
          "ReactFlow 6-layer interactive evidence graph visualization.",
          "Catalogue UI: 6 primary identifiers, 46 mapped source types, 42 defined fetched fields.",
          "Composite edge-weight calculation & proxy-IP downweighting logic.",
          "Structured documentation & deep-dive inspection panels.",
        ]}
        illustrative={[
          "Live HTTP integrations to all 46 external source provider APIs.",
          "Backend runtime production scoring server for external API traffic.",
          "Empirical machine learning confidence/default model trained on production telemetry.",
          "Runtime consent/privacy enforcement engine.",
        ]}
      />

      <div className="p-6 rounded-2xl bg-surface-raised border border-hairline font-mono text-xs text-ink-muted space-y-2 text-center">
        <span className="text-accent font-bold uppercase tracking-wider block">// MASTERCLASS UNDER DEVELOPMENT</span>
        <p className="font-sans text-sm">
          Interactive ReactFlow evidence graph preview component will be embedded in upcoming packs.
        </p>
      </div>
    </div>
  );
}
