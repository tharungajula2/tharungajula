"use client";

import { useState, useEffect } from 'react';
import { ShieldCheck, HelpCircle, CheckCircle2, X } from 'lucide-react';

interface QuestionTopic {
  caseCode: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

const DECISION_TOPICS: Record<string, QuestionTopic> = {
  'CASE-2026-01': {
    caseCode: 'CASE-001',
    question: 'Why should 90 DPD term loans be classified as SMA-2 performing rather than Substandard NPA in this RBI IRACP case workflow?',
    options: [
      'Because RBI IRACP specifies that NPA classification occurs strictly at Day 91 (> 90 days overdue), so Day 90 remains SMA-2 performing.',
      'Because term loans automatically receive a 15-day grace period before provision calculations.',
      'Because secured facilities are exempt from NPA classification until 180 DPD.',
    ],
    correctOptionIndex: 0,
    explanation: 'Correct! RBI IRACP Master Circular Sec 2.1 specifies that an advance becomes Non-Performing Asset (NPA) when interest or principal installment remains overdue for a period of MORE THAN 90 days (i.e. >= 91 days). Therefore, 90 DPD is the boundary day for SMA-2 performing status.',
  },
  'CASE-2026-02': {
    caseCode: 'CASE-002',
    question: 'Why must floating-rate lending facilities be bucketed by Next Repricing Date rather than Contractual Maturity Date for FTP pricing?',
    options: [
      'Contractual maturity determines cash flow timing, so FTP always uses maturity date.',
      'Floating-rate loan interest rates reset at the Next Repricing Date, transferring interest rate risk back to Treasury at that date.',
      'Treasury prefers short-term bucketing to understate liquidity premiums.',
    ],
    correctOptionIndex: 1,
    explanation: 'Correct! Interest Rate Risk in the Banking Book (IRRBB) principles dictate that floating-rate assets reprice at their next contractual repricing date (e.g. 3-month MIBOR reset). Transfer pricing must lock the base yield curve to the repricing tenor, not the 5-year final maturity.',
  },
  'CASE-2026-03': {
    caseCode: 'CASE-003',
    question: 'Why must the Whole-Bank CET1 Ratio denominator be Whole-Bank Total RWA (₹28,000 Cr) rather than Case Portfolio Credit RWA (₹2,436 Cr)?',
    options: [
      'Case portfolio RWA is only a component of total bank credit risk; using it as denominator would artificially overstate CET1 ratio.',
      'Because RBI requires using gross drawn balance as the CET1 denominator.',
      'Because market and operational RWA are deducted directly from CET1 capital.',
    ],
    correctOptionIndex: 0,
    explanation: 'Correct! Whole-Bank CET1 Ratio = Whole-Bank CET1 Capital / (Whole-Bank Credit RWA + Market RWA + Operational RWA). Case portfolio RWA is an incremental credit component of the total bank RWA denominator.',
  },
};

interface Props {
  caseCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DecisionReviewModal({ caseCode, isOpen, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const topic = DECISION_TOPICS[caseCode] || DECISION_TOPICS['CASE-2026-01'];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none font-sans text-slate-100"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="decision-review-title"
        className="cros-glass-card border border-cyan-500/40 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden font-mono text-xs space-y-4 p-6"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 id="decision-review-title" className="font-bold text-slate-100 text-sm uppercase">DEFEND THE DECISION // {topic.caseCode}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close decision review modal"
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] text-cyan-400 font-bold uppercase block">// ARCHITECTURAL REFLECTION QUESTION</span>
          <p className="text-slate-100 font-sans text-sm font-semibold leading-relaxed">{topic.question}</p>
        </div>

        <div className="space-y-2 font-sans">
          {topic.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedOption(idx);
                setShowExplanation(true);
              }}
              className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer font-mono text-xs ${
                selectedOption === idx
                  ? idx === topic.correctOptionIndex
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                  : 'bg-slate-900 border-white/10 hover:border-white/20 text-slate-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 font-sans space-y-1">
            <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">// MODEL EXPLANATION</span>
            <p className="text-slate-200 text-xs leading-relaxed">{topic.explanation}</p>
          </div>
        )}

        <div className="pt-3 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase text-xs cursor-pointer"
          >
            Close Decision Review
          </button>
        </div>
      </div>
    </div>
  );
}
