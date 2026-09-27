'use client';

import { useState } from 'react';
import { contentPack } from '../content';
import type { Concept } from '../content/types';
import { conceptState, lowestState, type MasteryState } from '../engine/learning/mastery';
import { useCity } from '../state/store';
import { cn } from '@/lib/utils';
import { Button, Card, Dot, Tag } from './primitives';

const STATE_LABEL: Record<MasteryState, string> = {
  locked: 'Locked',
  new: 'New',
  learning: 'Learning',
  recalled: 'Recalled',
  applied: 'Applied',
  mastered: 'Mastered',
};

function ConceptCard({ concept, onClose }: { concept: Concept; onClose(): void }) {
  const markRevealed = useCity((s) => s.markRevealed);
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3 rounded-lg border border-hairline-strong bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{concept.name}</h3>
          <p className="text-sm text-ink-muted">{concept.oneLiner}</p>
        </div>
        <Tag>{concept.layer}</Tag>
      </div>
      {!open ? (
        <div className="space-y-2">
          <p className="text-xs text-ink-faint">Try to explain it in your head first. Opening the card counts as a reveal: today’s answers on this concept won’t count as cold recall.</p>
          <Button variant="ghost" onClick={() => { setOpen(true); markRevealed([concept.id]); }}>Open the card</Button>
        </div>
      ) : (
        <div className="space-y-2 text-sm">
          <p className="whitespace-pre-line">{concept.explanation.replace(/\*\*/g, '')}</p>
          <p><strong>Why it matters:</strong> {concept.whyItMatters}</p>
          {concept.misconception && <p><strong>Trap:</strong> {concept.misconception}</p>}
          {concept.embassy && (
            <ul className="space-y-1 text-ink-muted">
              {Object.entries(concept.embassy).map(([k, v]) => <li key={k}><strong>{k}:</strong> {v}</li>)}
            </ul>
          )}
          {!concept.verified && <p className="text-[11px] text-ink-faint">Unverified placeholder content.</p>}
        </div>
      )}
      <Button variant="quiet" onClick={onClose}>Close</Button>
    </div>
  );
}

export default function ListCity() {
  const progress = useCity((s) => s.concepts);
  const [openDistrict, setOpenDistrict] = useState<string | null>(null);
  const [openConcept, setOpenConcept] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <p className="text-sm text-ink-muted">Your memory palace, in walking order. A district shows the lowest state across its Foundation concepts.</p>
      {contentPack.districts.map((d) => {
        const cs = contentPack.concepts.filter((c) => c.district === d.id);
        const f = cs.filter((c) => c.layer === 'F');
        const state = lowestState((f.length ? f : cs).map((c) => conceptState(c, progress)));
        const isOpen = openDistrict === d.id;
        return (
          <Card key={d.id} className="p-0 sm:p-0">
            <button
              onClick={() => { setOpenDistrict(isOpen ? null : d.id); setOpenConcept(null); }}
              aria-expanded={isOpen}
              className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <span className="w-6 text-xs text-ink-faint">{d.order}</span>
              <Dot colour={state === 'locked' ? '#D4D4D8' : d.colour} />
              <span className="flex-1">
                <span className="block text-sm font-medium">{d.name}</span>
                <span className="block text-xs text-ink-muted">{d.purpose}</span>
              </span>
              <Tag className={cn(state === 'mastered' && 'bg-accent-dim text-ink')}>{STATE_LABEL[state]}</Tag>
            </button>
            {isOpen && (
              <div className="space-y-2 border-t border-hairline px-4 py-3">
                <p className="text-xs text-ink-faint">Landmark: {d.landmark}</p>
                {cs.map((c) => (
                  <div key={c.id}>
                    {openConcept === c.id ? (
                      <ConceptCard concept={c} onClose={() => setOpenConcept(null)} />
                    ) : (
                      <button
                        onClick={() => setOpenConcept(c.id)}
                        className="flex min-h-[44px] w-full items-center justify-between rounded-lg border border-hairline px-3 text-left text-sm hover:bg-surface-sunken"
                      >
                        <span>{c.name}</span>
                        <span className="flex gap-1"><Tag>{c.layer}</Tag><Tag>{STATE_LABEL[conceptState(c, progress)]}</Tag></span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
