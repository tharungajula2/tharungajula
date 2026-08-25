"use client";

import { useState, useMemo } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { LEARN_CARDS } from '../../_data/learnDatabase';
import { X, BookOpen, Search, ChevronRight } from 'lucide-react';

export default function LearnDrawer() {
  const { isLearnDrawerOpen, setIsLearnDrawerOpen, activeSection } = useCreditRiskOS();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const contextualCards = LEARN_CARDS.filter((c) => c.section === activeSection);
  const activeCardList = contextualCards.length > 0 ? contextualCards : LEARN_CARDS;
  const [selectedCardId, setSelectedCardId] = useState<string>(activeCardList[0]?.id || LEARN_CARDS[0].id);

  const filteredCards = useMemo(() => {
    return LEARN_CARDS.filter((card) => {
      const matchesCategory = selectedCategory === 'ALL' || card.category === selectedCategory;
      const matchesSearch =
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.whatItIs.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  if (!isLearnDrawerOpen) return null;

  const selectedCard = LEARN_CARDS.find((c) => c.id === selectedCardId) || filteredCards[0] || LEARN_CARDS[0];

  const categories = ['ALL', 'PD Modelling', 'LGD Modelling', 'EAD Modelling', 'IFRS 9', 'Capital', 'Treasury'];

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[560px] bg-[#0f172a]/95 backdrop-blur-2xl border-l border-cyan-500/40 shadow-2xl z-50 flex flex-col font-mono text-xs select-none animate-in slide-in-from-right duration-300 text-slate-100">
      {/* DRAWER HEADER */}
      <div className="h-14 border-b border-white/10 px-5 flex items-center justify-between bg-slate-900 shrink-0">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-100 uppercase tracking-wider text-sm">// CONTEXTUAL BA KNOWLEDGE BASE</span>
        </div>

        <button
          onClick={() => setIsLearnDrawerOpen(false)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          title="Close Learn Drawer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="p-4 bg-slate-950 border-b border-white/10 space-y-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search concepts (PD, LGD, EAD, SICR, LCR, Capital)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-slate-100 placeholder:text-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 text-slate-200 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono cursor-pointer focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DRAWER BODY: CARD SELECTOR + CARD DETAILS */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT CARD LIST */}
        <div className="w-52 border-r border-white/10 bg-slate-900/60 overflow-y-auto p-2 space-y-1 shrink-0 no-scrollbar">
          {filteredCards.map((card) => {
            const isSelected = card.id === selectedCard.id;
            return (
              <button
                key={card.id}
                onClick={() => setSelectedCardId(card.id)}
                className={`w-full p-2.5 rounded-lg text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                  isSelected
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold'
                    : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider text-cyan-400 font-semibold">{card.category}</span>
                <span className="text-xs truncate">{card.title}</span>
              </button>
            );
          })}
        </div>

        {/* RIGHT CARD DETAIL */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-xs no-scrollbar bg-[#0b0f19]">
          <div className="space-y-1">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-[10px] font-bold uppercase">
              {selectedCard.category}
            </span>
            <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight font-mono">{selectedCard.title}</h3>
          </div>

          <div className="space-y-3 text-slate-300 leading-relaxed text-sm">
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
              <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">WHAT IT IS:</span>
              <p className="text-xs">{selectedCard.whatItIs}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
              <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">WHY IT EXISTS:</span>
              <p className="text-xs">{selectedCard.whyItExists}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
              <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">WORKED EXAMPLE:</span>
              <p className="text-xs font-mono text-cyan-300">{selectedCard.workedExample}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
              <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">BA & SYSTEMS ANGLE:</span>
              <p className="text-xs">{selectedCard.baAngle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
