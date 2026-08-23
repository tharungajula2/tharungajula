"use client";

import { ProjectLogicBadge, TeachingIllustrationBadge } from "./Badges";

export default function WeightingSection() {
  return (
    <section id="weighting" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-cyan-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 03 — COMPOSITE EDGE WEIGHTING & PROXY-IP DOWN-WEIGHTING
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. COMPOSITE EDGE WEIGHT FORMULA */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            05. Composite Edge Weighting Formula
          </h2>
          <ProjectLogicBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Not all evidence carries equal reliability. LOC-IQ adjusts raw relationship importance using data freshness and network trust multipliers.
        </p>

        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6 font-mono text-xs text-center">
          <div className="text-cyan-400 font-bold mb-2">// COMPOSITE EDGE WEIGHT FORMULA</div>
          <div className="text-sm font-bold text-ink bg-surface-raised p-3 rounded border border-hairline mb-3">
            effective weight = base weight × recency factor × IP-trust factor
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-ink-muted text-[11px] text-left">
            <div><strong className="text-ink">Base Weight:</strong> Initial structural relationship strength</div>
            <div><strong className="text-ink">Recency Factor:</strong> Freshness decay multiplier</div>
            <div><strong className="text-ink">IP-Trust Factor:</strong> Network proxy/trust multiplier</div>
          </div>
        </div>

        {/* Worked Example */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between mb-2">
              <span className="text-cyan-400 font-bold">// WORKED WEIGHT CALCULATION</span>
              <TeachingIllustrationBadge label="TEACHING CALCULATION" />
            </div>
            <div className="bg-surface-raised p-3 rounded border border-hairline space-y-1 text-ink-muted">
              <div>Base Weight = 0.80</div>
              <div>Recency Factor = 0.75 (3-month old signal)</div>
              <div>IP-Trust Factor = 0.40 (Proxy-IP detected)</div>
              <div className="text-cyan-400 font-bold border-t border-hairline-faint pt-1">
                Effective Weight = 0.80 × 0.75 × 0.40 = 0.24
              </div>
            </div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-cyan-400 font-bold block mb-2">// MULTIPLICATIVE DISCOUNT MECHANISM</span>
            <p className="text-ink-muted leading-relaxed">
              Multiplication acts like successive gates. If any single factor (freshness or network trust) is weak, the overall evidence contribution drops significantly.
            </p>
          </div>
        </div>

        <div className="bg-cyan-500/20 border border-cyan-500/40 p-3.5 rounded-xl text-xs font-mono text-cyan-300 font-semibold">
          RULE: Weight = importance × freshness × trust adjustment. Multiplication acts like successive gates/discounts.
        </div>
      </div>

      {/* 2. PROXY-IP DOWN-WEIGHTING */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            06. Proxy-IP Down-Weighting Logic
          </h2>
          <ProjectLogicBadge />
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          When an applicant connects through a proxy IP or VPN, the network-derived location trace becomes less trustworthy and its edge weight is scaled down.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-mono text-xs">
          <div className="bg-surface-sunken p-4 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-2">DIRECT / HIGH-TRUST NETWORK</span>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline mb-2 text-ink">
              Base 0.80 × Trust 1.0 = <strong className="text-emerald-400 font-bold">0.80 Weight</strong>
            </div>
            <p className="text-ink-muted text-[11px]">Direct residential connection retains full signal contribution.</p>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-amber-500/30">
            <span className="text-amber-300 font-bold block mb-2">PROXY-IP / VPN INTERMEDIARY</span>
            <div className="bg-surface-raised p-2.5 rounded border border-hairline mb-2 text-ink">
              Base 0.80 × Trust 0.4 = <strong className="text-amber-300 font-bold">0.32 Weight</strong>
            </div>
            <p className="text-ink-muted text-[11px]">Proxy detection down-weights evidence contribution without deleting it.</p>
          </div>
        </div>

        <div className="bg-cyan-500/20 border border-cyan-500/40 p-3.5 rounded-xl text-xs font-mono text-cyan-300 font-semibold">
          RULE: Weak evidence contributes less; it does not automatically disappear.
        </div>
      </div>
    </section>
  );
}
