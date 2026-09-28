'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { contentPack } from './content';
import type { DistrictId } from './content/types';
import { effectiveDue } from './engine/learning/scheduler';
import { useCity } from './state/store';
import { useWorld } from './state/world';
import { todayIso } from './state/today';
import { cn } from '@/lib/utils';
import CaseView from './ui/CaseView';
import DistrictPanel from './ui/DistrictPanel';
import ExhibitPanel from './ui/ExhibitPanel';
import { exhibitsFor } from './exhibits';
import HomePanel from './ui/HomePanel';
import MissionView from './ui/MissionView';
import Hud from './ui/Hud';
import ListApp from './ui/ListApp';
import ProgressView from './ui/ProgressView';
import RoundView from './ui/RoundView';
import WalkPanel from './ui/WalkPanel';
import World from './ui/world/World';
import { parseDeepLink } from './state/deepLink';
import { useLiving } from './state/living';
import { builtShare, liveLine } from './living/bank';
import { conceptState } from './engine/learning/mastery';

type Mode = 'home' | 'district' | 'interior' | 'practice' | 'round' | 'case' | 'missions' | 'walk' | 'progress';

const districtOfConcept = (id: string): DistrictId => contentPack.concepts.find((c) => c.id === id)!.district;

function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

const cssVar = (name: string, fallback: string): string => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

const subscribeMotion = (cb: () => void) => {
  const m = window.matchMedia('(prefers-reduced-motion: reduce)');
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};

const TOOLS: { mode: Mode; label: string }[] = [
  { mode: 'home', label: 'City' },
  { mode: 'round', label: 'Daily Round' },
  { mode: 'case', label: 'Case' },
  { mode: 'missions', label: 'Missions' },
  { mode: 'walk', label: 'Palace Walk' },
  { mode: 'progress', label: 'Progress' },
];

export default function CityApp() {
  const [webgl] = useState(detectWebGL);
  const [view, setView] = useState<'3d' | 'list'>(() => (detectWebGL() ? '3d' : 'list'));
  // Deep links (?district=vault&walk=1&exhibit=3, ?mode=case) set the starting view once, before the world subscribes.
  const [mode, setMode] = useState<Mode>(() => {
    const link = parseDeepLink(window.location.search);
    if (link.district) useWorld.setState({ selected: link.district, interior: link.mode === 'interior' ? { district: link.district, active: link.exhibit } : null });
    return link.mode;
  });
  const [sheetMin, setSheetMin] = useState(false);
  const [colours] = useState(() => ({
    accent: cssVar('--color-accent', '#4f7cff'),
    ink: cssVar('--color-ink', '#18181b'),
    background: cssVar('--color-surface', '#f7f6f3'),
  }));
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );

  const items = useCity((s) => s.items);
  const concepts = useCity((s) => s.concepts);
  const session = useCity((s) => s.caseSession);
  const mission = useCity((s) => s.mission);
  const selected = useWorld((s) => s.selected);
  const roundDistrict = useWorld((s) => s.roundDistrict);
  const engineView = useWorld((s) => s.engineView);
  const walk = useWorld((s) => s.walk);
  const interior = useWorld((s) => s.interior);
  const exhibitVals = useWorld((s) => s.exhibitVals);
  const { select, toggleEngine, walkTap, walkEnd, setRoundDistrict, enterInterior, leaveInterior, setExhibit } = useWorld.getState();

  const live = useLiving((s) => s.readings);
  const running = useLiving((s) => s.playing);
  const { tick, togglePlay, setStorm } = useLiving.getState();
  // The city bank advances one month every few seconds while the 3D city is on screen.
  useEffect(() => {
    if (!running || view !== '3d' || mode === 'interior') return;
    const t = window.setInterval(tick, 3500);
    return () => window.clearInterval(t);
  }, [running, view, mode, tick]);
  const builtByDistrict = useMemo(() => {
    const out: Record<string, number> = {};
    for (const d of contentPack.districts) out[d.id] = builtShare(contentPack.concepts.filter((c) => c.district === d.id).map((c) => conceptState(c, concepts)));
    return out;
  }, [concepts]);
  const cityBuilt = Object.values(builtByDistrict).reduce((a, x) => a + x, 0) / contentPack.districts.length;

  const today = todayIso();
  const dueByDistrict = useMemo(() => {
    const out: Record<string, number> = {};
    for (const p of Object.values(items)) {
      if (effectiveDue(p) > today) continue;
      const item = contentPack.items.find((i) => i.id === p.itemId);
      if (!item || item.payload.type === 'predict') continue;
      const d = districtOfConcept(item.conceptIds[0]);
      out[d] = (out[d] ?? 0) + 1;
    }
    return out;
  }, [items, today]);

  const caseDef = contentPack.cases[0];
  const caseDistrict = session && !session.done ? caseDef.steps[session.stepIndex]?.district ?? null : null;
  const walkQ = walk?.questions[walk.index];

  const focus: DistrictId | null =
    mode === 'case' ? caseDistrict
    : mode === 'missions' ? (mission ? contentPack.missions.find((m) => m.id === mission.missionId)?.district ?? null : null)
    : mode === 'round' || mode === 'practice' ? roundDistrict ?? (mode === 'practice' ? selected : null)
    : mode === 'walk' ? (walkQ?.kind === 'what' ? walkQ.district : walkQ && walk?.answers[walk.index] ? walkQ.answer : null)
    : mode === 'district' ? selected
    : null;

  const interiorProps = useMemo(() => {
    if (mode !== 'interior' || !interior) return null;
    const entries = exhibitsFor(interior.district).map((exhibit) => ({ exhibit, output: exhibit.model(exhibitVals[exhibit.id] ?? exhibit.initial) }));
    return { district: interior.district, entries, active: interior.active, onSelect: setExhibit };
  }, [mode, interior, exhibitVals, setExhibit]);

  const markWalked = useCity((s) => s.markWalked);
  /** Walk straight into a district's street, at the machine for a given concept. */
  const walkTo = (d: DistrictId, conceptId?: string) => {
    const list = exhibitsFor(d);
    const i = conceptId ? Math.max(0, list.findIndex((e) => e.conceptId === conceptId)) : 0;
    select(d);
    enterInterior(d, i);
    markWalked(d);
    setSheetMin(false);
    setMode('interior');
  };

  const go = (m: Mode) => {
    if (m !== 'interior') leaveInterior();
    if (m !== 'walk') walkEnd();
    if (m !== 'round' && m !== 'practice') setRoundDistrict(null);
    if (m === 'home') select(null);
    setSheetMin(false);
    setMode(m);
  };

  const onDistrictClick = (id: DistrictId) => {
    if (mode === 'walk') {
      walkTap(id);
      return;
    }
    if (mode === 'round' || mode === 'practice' || mode === 'case' || mode === 'missions' || mode === 'interior') return;
    select(id);
    setSheetMin(false);
    setMode('district');
  };
  const onAnchorClick = (conceptId: string) => {
    if (mode === 'walk' || mode === 'round' || mode === 'practice' || mode === 'case' || mode === 'missions') return;
    select(districtOfConcept(conceptId), conceptId);
    setMode('district');
  };
  const onBackgroundClick = () => {
    if (mode === 'district') go('home');
  };

  if (view === 'list') {
    return (
      <div className="fixed inset-x-0 bottom-0 top-14 z-10 overflow-y-auto bg-surface sm:top-16">
        <ListApp onOpen3D={webgl ? () => setView('3d') : undefined} />
      </div>
    );
  }

  const inWalkWhere = mode === 'walk' && walkQ?.kind === 'where' && !walk?.answers[walk.index];

  return (
    <div className="fixed inset-x-0 bottom-0 top-14 z-10 bg-surface sm:top-16">
      <div className={cn('absolute inset-0 lg:right-[436px]', !sheetMin && 'bottom-[45%] lg:bottom-0')}>
        <World
          concepts={concepts}
          dueByDistrict={dueByDistrict}
          focus={focus}
          labels={mode !== 'walk' && mode !== 'interior'}
          engineView={engineView}
          caseDistrict={caseDistrict}
          colours={colours}
          reducedMotion={reducedMotion}
          onDistrictClick={onDistrictClick}
          onAnchorClick={onAnchorClick}
          onBackgroundClick={onBackgroundClick}
          interior={interiorProps}
          living={mode !== 'interior' ? { readings: live, running } : null}
          buildByLearning
        />
      </div>

      {/* Top overlay: title, HUD, tools */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 space-y-2 p-2 sm:p-3 lg:right-[436px]">
        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          <h1 className="rounded-lg bg-surface-raised/95 px-2.5 py-1.5 text-sm font-semibold shadow-sm">Credit Risk City</h1>
          <div className="min-w-0 flex-1"><Hud compact live={mode === 'case' ? null : live} builtPct={cityBuilt} /></div>
        </div>
        <nav className="pointer-events-auto flex gap-1 overflow-x-auto no-scrollbar" aria-label="City tools">
          {TOOLS.map((t) => {
            const active = mode === t.mode || (t.mode === 'home' && mode === 'district') || (t.mode === 'round' && mode === 'practice');
            return (
              <button
                key={t.mode}
                onClick={() => go(t.mode)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'min-h-[40px] shrink-0 rounded-lg border px-3 text-xs font-medium shadow-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:text-sm',
                  active ? 'border-ink bg-ink text-surface' : 'border-hairline bg-surface-raised/95 text-ink',
                )}
              >
                {t.label}
              </button>
            );
          })}
          <button
            onClick={toggleEngine}
            aria-pressed={engineView}
            className={cn(
              'min-h-[40px] shrink-0 rounded-lg border px-3 text-xs font-medium shadow-sm sm:text-sm',
              engineView ? 'border-ink bg-ink text-surface' : 'border-hairline bg-surface-raised/95 text-ink',
            )}
          >
            Engine Room
          </button>
          <button
            onClick={togglePlay}
            aria-pressed={running}
            className="min-h-[40px] shrink-0 rounded-lg border border-hairline bg-surface-raised/95 px-3 text-xs font-medium text-ink shadow-sm sm:text-sm"
          >
            {running ? `❚❚ Bank · month ${live.month}` : `▶ Bank · month ${live.month}`}
          </button>
          <button
            onClick={() => setStorm(!live.storm)}
            aria-pressed={live.storm}
            className={cn(
              'min-h-[40px] shrink-0 rounded-lg border px-3 text-xs font-medium shadow-sm sm:text-sm',
              live.storm ? 'border-ink bg-ink text-surface' : 'border-hairline bg-surface-raised/95 text-ink',
            )}
          >
            {live.storm ? '⛈ Storm' : '☀ Calm'}
          </button>
          <button
            onClick={() => setView('list')}
            className="min-h-[40px] shrink-0 rounded-lg border border-hairline bg-surface-raised/95 px-3 text-xs font-medium text-ink shadow-sm sm:text-sm"
          >
            2D list
          </button>
        </nav>
        {inWalkWhere && (
          <p className="pointer-events-none inline-block rounded-lg bg-ink px-3 py-1.5 text-xs text-surface shadow-sm">Tap the district where it lives</p>
        )}
      </div>

      {/* Panel: bottom sheet on phones, side panel on desktop */}
      <aside
          className={cn(
            'absolute z-20 border-hairline bg-surface-raised/97 shadow-lg backdrop-blur',
            'inset-x-0 bottom-0 rounded-t-2xl border-t px-4 pb-4',
            sheetMin ? 'max-h-[52px] overflow-hidden' : 'max-h-[55%] overflow-y-auto',
            'lg:inset-x-auto lg:bottom-3 lg:right-3 lg:top-3 lg:max-h-none lg:w-[420px] lg:overflow-y-auto lg:rounded-2xl lg:border lg:pt-4',
          )}
          aria-label="City panel"
        >
          <button
            onClick={() => setSheetMin(!sheetMin)}
            aria-expanded={!sheetMin}
            aria-label={sheetMin ? 'Show panel' : 'Hide panel to see the city'}
            className="sticky top-0 z-10 -mx-4 mb-2 flex min-h-[44px] w-[calc(100%+2rem)] items-center justify-center bg-surface-raised/97 lg:hidden"
          >
            <span className="h-1.5 w-10 rounded-full bg-hairline-strong" />
          </button>
          {mode === 'home' && (
            <HomePanel
              onRound={() => go('round')}
              onCase={() => go('case')}
              onMissions={() => go('missions')}
              onWalk={() => go('home')}
              onWalkTo={(d, c) => walkTo(d, c)}
            />
          )}
          {mode === 'district' && selected && (
            <DistrictPanel
              id={selected}
              due={dueByDistrict[selected] ?? 0}
              onPractise={() => go('practice')}
              onWalkIn={exhibitsFor(selected).length ? () => walkTo(selected) : undefined}
              live={liveLine(selected, live)}
              built={builtByDistrict[selected]}
            />
          )}
          {mode === 'interior' && interior && <ExhibitPanel district={interior.district} onBack={() => { leaveInterior(); setMode('district'); }} />}
          {mode === 'practice' && selected && <RoundView key={`practice-${selected}`} district={selected} />}
          {mode === 'round' && <RoundView key="round" onWalk={(d, c) => walkTo(d, c)} />}
          {mode === 'case' && <CaseView />}
          {mode === 'missions' && <MissionView />}
          {mode === 'walk' && <WalkPanel />}
          {mode === 'progress' && <ProgressView />}
      </aside>
    </div>
  );
}
