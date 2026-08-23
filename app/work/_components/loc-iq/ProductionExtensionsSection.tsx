"use client";

import { ProductionExtensionBadge, TeachingIllustrationBadge } from "./Badges";

export default function ProductionExtensionsSection() {
  return (
    <section id="production-extensions" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 07 — PRODUCTION EXTENSIONS, PRIVACY & HUMAN-IN-THE-LOOP
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. LIVE API INTEGRATION & CANONICAL MAPPING */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            13. Live API Integration & Canonical Schema Mapping
          </h2>
          <ProductionExtensionBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          {/* Live Pipeline */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-2">// LIVE ORCHESTRATION PIPELINE</span>
            <ul className="space-y-1 text-ink-muted text-[11px]">
              <li>• API credentials & rate limit management</li>
              <li>• Timeouts, retries & exponential backoff</li>
              <li>• Schema validation & error boundaries</li>
              <li>• Response caching & freshness tracking</li>
            </ul>
          </div>

          {/* Canonical Mapping */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between mb-2">
              <span className="text-indigo-400 font-bold">// CANONICAL FIELD MAPPING</span>
              <TeachingIllustrationBadge label="TEACHING EXAMPLE" />
            </div>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline space-y-1 text-ink-muted text-[10px]">
              <div>Source A: postal_code | Source B: pincode | Source C: zip</div>
              <div className="text-indigo-400 font-bold border-t border-hairline-faint pt-1">
                ⇒ Internal Canonical Field: location_pincode
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-300 font-semibold">
          RULE: External schema varies. Internal data meaning should stay consistent.
        </div>
      </div>

      {/* 2. FAILURE STATES, PRIVACY & HUMAN-IN-THE-LOOP */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            14. Failure Handling, Privacy & Human-in-the-Loop
          </h2>
          <ProductionExtensionBadge />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">FAILURE STATES</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              Handles missing source data or timeouts gracefully. Missing evidence is NOT automatically contradictory evidence.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">PRIVACY & CONSENT</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              Requires lawful basis, consent, and purpose limitation. A technically available source is not automatically approved.
            </p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-indigo-400 font-bold block mb-1">HUMAN IN THE LOOP</span>
            <p className="text-ink-muted text-[11px] leading-relaxed">
              Serves as an explainable decision-support console for underwriters, NOT an automated rejection bot.
            </p>
          </div>
        </div>

        <div className="bg-indigo-500/20 border border-indigo-500/40 p-3.5 rounded-xl text-xs font-mono text-indigo-300 font-semibold">
          RULE: Missing evidence is not automatically contradictory evidence. A technically available data source is not automatically an approved data source.
        </div>
      </div>
    </section>
  );
}
