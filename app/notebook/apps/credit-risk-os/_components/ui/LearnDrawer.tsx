"use client";

import { useState } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { LEARN_CARDS, LearnCard } from '../../_data/learnDatabase';
import { X, BookOpen, ExternalLink, ChevronRight, Bookmark } from 'lucide-react';

export default function LearnDrawer() {
  const { isLearnDrawerOpen, setIsLearnDrawerOpen, activeSection, setActiveSection } = useCreditRiskOS();

  // Find cards matching active workspace or default to first card
  const contextualCards = LEARN_CARDS.filter((c) => c.section === activeSection);
  const activeCardList = contextualCards.length > 0 ? contextualCards : LEARN_CARDS;
  const [selectedCardId, setSelectedCardId] = useState<string>(activeCardList[0]?.id || LEARN_CARDS[0].id);

  if (!isLearnDrawerOpen) return null;

  const selectedCard = LEARN_CARDS.find((c) => c.id === selectedCardId) || activeCardList[0] || LEARN_CARDS[0];

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[540px] bg-surface-raised/98 backdrop-blur-2xl border-l-2 border-accent/60 shadow-2xl z-50 flex flex-col font-mono text-xs select-none animate-in slide-in-from-right duration-300">
      {/* DRAWER HEADER */}
      <div className="h-14 border-b border-hairline px-5 flex items-center justify-between bg-surface-raised shrink-0">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-accent" />
          <span className="font-bold text-ink uppercase tracking-wider text-sm">// CONTEXTUAL LEARN KNOWLEDGE BASE</span>
        </div>

        <button
          onClick={() => setIsLearnDrawerOpen(false)}
          className="p-1.5 rounded-lg hover:bg-surface-sunken text-ink-muted hover:text-ink transition-colors cursor-pointer"
          title="Close Learn Drawer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* WORKSPACE CARD SELECTOR STRIP */}
      <div className="px-4 py-2.5 bg-surface-sunken border-b border-hairline-faint flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[10px] text-ink-faint uppercase shrink-0">CARDS:</span>
        {LEARN_CARDS.map((card) => {
          const isSelected = card.id === selectedCard.id;
          const isContextual = card.section === activeSection;
          return (
            <button
              key={card.id}
              onClick={() => setSelectedCardId(card.id)}
              className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-accent text-surface shadow-sm'
                  : isContextual
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'bg-surface-raised text-ink-muted hover:text-ink border border-hairline-faint'
              }`}
            >
              {card.title}
            </button>
          );
        })}
      </div>

      {/* MAIN CARD CONTENT CONTAINER */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar font-sans">
        {/* CARD TOP META */}
        <div className="border-b border-hairline-faint pb-3 font-mono">
          <div className="flex items-center justify-between gap-2 mb-1 text-[10px]">
            <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-bold uppercase">{selectedCard.category}</span>
            <span className="text-ink-faint uppercase">WORKSPACE: {selectedCard.section.toUpperCase()}</span>
          </div>
          <h2 className="text-xl font-bold uppercase text-ink tracking-tight">{selectedCard.title}</h2>
        </div>

        {/* 1. WHAT IT IS */}
        <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
          <span className="font-mono text-[10px] text-accent font-bold uppercase block">// WHAT IT IS:</span>
          <p className="text-ink text-xs leading-relaxed">{selectedCard.whatItIs}</p>
        </div>

        {/* 2. WHY IT EXISTS */}
        <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
          <span className="font-mono text-[10px] text-signal font-bold uppercase block">// WHY IT EXISTS:</span>
          <p className="text-ink-muted text-xs leading-relaxed">{selectedCard.whyItExists}</p>
        </div>

        {/* 3. FORMULA / MECHANISM */}
        {selectedCard.formulaMechanism && (
          <div className="p-3.5 rounded-xl bg-surface-sunken border border-accent/30 space-y-2 font-mono">
            <span className="text-[10px] text-accent font-bold uppercase block">// FORMULA / MECHANISM:</span>
            <div className="p-2 rounded bg-surface-raised text-accent font-bold text-xs text-center border border-hairline-faint">
              {selectedCard.formulaMechanism}
            </div>

            {selectedCard.variables && (
              <div className="space-y-1 pt-1 text-[11px]">
                <span className="text-[9px] text-ink-faint uppercase block font-bold">Variables & Symbols:</span>
                {selectedCard.variables.map((v) => (
                  <div key={v.symbol} className="flex gap-2">
                    <span className="font-bold text-accent shrink-0">{v.symbol}:</span>
                    <span className="text-ink-muted">{v.meaning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. WORKED RENFORGE EXAMPLE */}
        {selectedCard.workedExample && (
          <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1 font-mono">
            <span className="text-[10px] text-ink font-bold uppercase block">// WORKED RENFORGE EXAMPLE:</span>
            <p className="text-ink-muted text-xs leading-relaxed font-sans">{selectedCard.workedExample}</p>
          </div>
        )}

        {/* 5. WHO OWNS IT & BA ANGLE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
          <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
            <span className="text-[9px] text-ink-faint font-bold uppercase block">WHO OWNS IT:</span>
            <span className="text-ink font-semibold">{selectedCard.whoOwnsIt}</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
            <span className="text-[9px] text-accent font-bold uppercase block">BA ANGLE:</span>
            <span className="text-ink font-semibold">{selectedCard.baAngle}</span>
          </div>
        </div>

        {/* 6. COMMON TRAPS */}
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 space-y-1 font-mono">
          <span className="text-[10px] text-red-400 font-bold uppercase block">⚠️ COMMON TRAPS & MISCONCEPTIONS:</span>
          <p className="text-ink-muted text-xs leading-relaxed font-sans">{selectedCard.commonTraps}</p>
        </div>

        {/* 7. RELATED CONCEPTS & OFFICIAL SOURCE */}
        <div className="p-3.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-2 font-mono text-xs">
          <div className="text-[10px] text-ink-faint font-bold uppercase">// RELATED WORKSPACES:</div>
          <div className="flex flex-wrap gap-2">
            {selectedCard.relatedConcepts.map((rel) => (
              <button
                key={rel.label}
                onClick={() => {
                  setActiveSection(rel.section);
                  setIsLearnDrawerOpen(false);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-raised hover:bg-accent hover:text-surface border border-hairline-faint text-accent font-bold uppercase text-[10px] transition-all cursor-pointer"
              >
                <span>{rel.label}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>

          {selectedCard.sourceBasis && (
            <div className="pt-2 border-t border-hairline-faint flex items-center justify-between text-[10px] text-ink-muted">
              <span>Official Basis: {selectedCard.sourceBasis}</span>
              <Bookmark className="w-3 h-3 text-accent" />
            </div>
          )}
        </div>
      </div>

      {/* DRAWER FOOTER */}
      <div className="h-12 border-t border-hairline px-5 flex items-center justify-between bg-surface-raised shrink-0 font-mono text-[11px] text-ink-muted">
        <span>RENFORGE KNOWLEDGE ENGINE</span>
        <button
          onClick={() => setIsLearnDrawerOpen(false)}
          className="text-accent hover:underline uppercase font-bold cursor-pointer"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
