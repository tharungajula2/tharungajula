"use client";

import { ProjectImplementationBadge, TeachingIllustrationBadge } from "./Badges";

export default function NeuralNetworkSection() {
  return (
    <section id="neural-network" className="mb-20 scroll-mt-28">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-purple-400 text-[11px] sm:text-xs tracking-[0.3em] font-mono uppercase font-semibold">
          // PHASE 03 — NEURAL NETWORK ARCHITECTURE & TRAINING
        </span>
        <div className="h-px flex-1 bg-hairline-faint" />
      </div>

      {/* 1. ARCHITECTURE & NEURON */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            04. Architecture & Single Neuron Math
          </h2>
          <ProjectImplementationBadge label="SUPPORTED LEVEL" />
        </div>

        {/* High Level Flow */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-center">
          <div className="p-2.5 bg-surface-raised rounded border border-hairline flex-1">
            <span className="text-purple-400 font-bold block">11 INPUTS</span>
            <span className="text-[10px] text-ink-muted">Scaled Features</span>
          </div>
          <span className="text-purple-400 font-bold">→</span>
          <div className="p-2.5 bg-surface-raised rounded border border-hairline flex-1">
            <span className="text-purple-400 font-bold block">HIDDEN LAYERS</span>
            <span className="text-[10px] text-ink-muted">ReLU Activation</span>
          </div>
          <span className="text-purple-400 font-bold">→</span>
          <div className="p-2.5 bg-surface-raised rounded border border-hairline flex-1">
            <span className="text-purple-400 font-bold block">OUTPUT NEURON</span>
            <span className="text-[10px] text-ink-muted">Sigmoid Activation</span>
          </div>
          <span className="text-purple-400 font-bold">→</span>
          <div className="p-2.5 bg-surface-raised rounded border border-purple-500/40 flex-1">
            <span className="text-purple-400 font-bold block">P(CHURN)</span>
            <span className="text-[10px] text-ink-muted">0.0 to 1.0</span>
          </div>
        </div>

        {/* Neuron Math & Worked Example */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-2">// NEURON FORMULA</span>
            <div className="text-sm font-mono text-ink font-bold bg-surface-raised p-3 rounded border border-hairline mb-3">
              z = wᵀx + b = (w1·x1 + w2·x2 + ...) + b
            </div>
            <ul className="text-xs text-ink-muted space-y-1 font-mono">
              <li>• x = input feature values</li>
              <li>• w = learned weights</li>
              <li>• b = bias term</li>
              <li>• z = pre-activation weighted score</li>
            </ul>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-purple-400">// WORKED NEURON EXAMPLE</span>
              <TeachingIllustrationBadge />
            </div>
            <div className="text-xs font-mono text-ink-muted bg-surface-raised p-3 rounded border border-hairline space-y-1">
              <div>Inputs: x1 = 0.5, x2 = 1.0</div>
              <div>Weights: w1 = 0.8, w2 = -0.2</div>
              <div>Bias: b = 0.1</div>
              <div className="text-purple-400 font-bold border-t border-hairline-faint pt-1 mt-1">
                z = (0.8 × 0.5) + (-0.2 × 1.0) + 0.1 = 0.3
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACTIVATIONS & LOSS */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            05. Activations (ReLU & Sigmoid) & Loss (BCE)
          </h2>
          <TeachingIllustrationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* ReLU */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-2">ReLU (HIDDEN LAYERS)</span>
            <div className="text-xs font-mono text-ink bg-surface-raised p-2.5 rounded border border-hairline font-bold mb-2">
              ReLU(z) = max(0, z)
            </div>
            <p className="text-xs text-ink-muted">Examples: ReLU(3) = 3, ReLU(-2) = 0. Introduces non-linearity so the network can learn complex patterns.</p>
          </div>

          {/* Sigmoid */}
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-2">SIGMOID (OUTPUT LAYER)</span>
            <div className="text-xs font-mono text-ink bg-surface-raised p-2.5 rounded border border-hairline font-bold mb-2">
              p = 1 / (1 + e^−z)
            </div>
            <p className="text-xs text-ink-muted">Squeezes pre-activation z into a valid probability between 0 and 1.</p>
          </div>
        </div>

        {/* BCE Loss */}
        <div className="bg-surface-sunken border border-hairline-faint p-4 rounded-xl mb-6">
          <div className="text-xs font-mono font-bold text-purple-400 mb-2">// BINARY CROSS-ENTROPY (BCE) LOSS</div>
          <div className="text-xs sm:text-sm font-mono text-ink font-bold bg-surface-raised p-3 rounded border border-hairline text-center mb-3">
            BCE = −[ y · log(p) + (1 − y) · log(1 − p) ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-2.5 bg-surface-raised rounded border border-hairline">
              <span className="text-emerald-400 font-bold block">Low Penalty:</span>
              <span className="text-ink-muted">Actual y=1, Predicted p=0.95 → Loss is small.</span>
            </div>
            <div className="p-2.5 bg-surface-raised rounded border border-hairline">
              <span className="text-rose-400 font-bold block">High Penalty:</span>
              <span className="text-ink-muted">Actual y=1, Predicted p=0.05 → Loss is large.</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/20 border border-purple-500/40 p-3.5 rounded-xl text-xs font-mono text-purple-400 font-semibold">
          RULE: ReLU learns hidden non-linear representations. Sigmoid produces output probability. Loss measures prediction error.
        </div>
      </div>

      {/* 3. FORWARD/BACKPROP, OPTIMISERS & DROPOUT */}
      <div className="bg-surface-raised border border-hairline p-6 rounded-2xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            06. Backpropagation, Optimisers & Dropout
          </h2>
          <ProjectImplementationBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-1">BACKPROPAGATION</span>
            <p className="text-xs text-ink-muted mb-2">Calculates gradients of BCE loss with respect to every weight, propagating error backward layer by layer.</p>
            <div className="text-[10px] font-mono text-purple-400 font-semibold">Forward pass predicts. Backward pass learns.</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-1">OPTIMISERS (SGD vs ADAM)</span>
            <p className="text-xs text-ink-muted mb-2">SGD applies direct gradient updates. Adam adapts learning rates per parameter using gradient history.</p>
            <div className="text-[10px] font-mono text-purple-400 font-semibold">Project sequence: SGD → Adam.</div>
          </div>

          <div className="bg-surface-sunken p-4 rounded-xl border border-hairline-faint">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-1">DROPOUT</span>
            <p className="text-xs text-ink-muted mb-2">Randomly drops units during training pass to break co-adaptation and reduce overfitting.</p>
            <div className="text-[10px] font-mono text-purple-400 font-semibold">Regularisation technique.</div>
          </div>
        </div>

        <div className="bg-surface-sunken p-3.5 rounded-xl border border-hairline-faint text-xs font-mono text-ink-muted">
          <strong className="text-purple-400">Epoch:</strong> One complete forward and backward pass through the entire training dataset.
        </div>
      </div>
    </section>
  );
}
