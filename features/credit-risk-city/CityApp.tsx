'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { contentPack } from './content';
import type { DistrictId } from './content/types';
import { useCity } from './state/store';
import { useWorld } from './state/world';
import { cn } from '@/lib/utils';
import DistrictPanel from './ui/DistrictPanel';
import HomePanel from './ui/HomePanel';
import Hud from './ui/Hud';
import ListApp from './ui/ListApp';
import LessonReader from './ui/lesson/LessonReader';
import World from './ui/world/World';
import { parseDeepLink } from './state/deepLink';

type Mode = 'home' | 'district';

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

const isDistrict = (x: string | null): x is DistrictId => !!x && contentPack.districts.some((d) => d.id === x);

export default function CityApp() {
  const [webgl] = useState(detectWebGL);
  const [view, setView] = useState<'3d' | 'list'>(() => (detectWebGL() ? '3d' : 'list'));
  const [mode, setMode] = useState<Mode>(() => {
    const link = parseDeepLink(window.location.search);
    if (link.district) useWorld.setState({ selected: link.district });
    return link.district ? 'district' : 'home';
  });
  const [lesson, setLesson] = useState<DistrictId | null>(() => {
    const l = new URLSearchParams(window.location.search).get('lesson');
    return isDistrict(l) ? l : null;
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

  const read = useCity((s) => s.read);
  const selected = useWorld((s) => s.selected);
  const { select } = useWorld.getState();

  // A district's landmark rises out of its fence once its lesson has been read.
  const built = useMemo(() => Object.fromEntries(contentPack.districts.map((d) => [d.id, read.includes(d.id) ? 1 : 0])) as Record<DistrictId, number>, [read]);

  const focus: DistrictId | null = mode === 'district' ? selected : null;

  const openLesson = (d: DistrictId) => {
    select(d);
    setLesson(d);
  };
  const goHome = () => {
    select(null);
    setSheetMin(false);
    setMode('home');
  };

  const onDistrictClick = (id: DistrictId) => {
    select(id);
    setSheetMin(false);
    setMode('district');
  };
  const onAnchorClick = (conceptId: string) => {
    const c = contentPack.concepts.find((x) => x.id === conceptId);
    if (c) onDistrictClick(c.district);
  };
  const onBackgroundClick = () => {
    if (mode === 'district') goHome();
  };

  if (view === 'list') {
    return (
      <div className="fixed inset-x-0 bottom-0 top-14 z-10 overflow-y-auto bg-surface sm:top-16">
        <ListApp onOpen3D={webgl ? () => setView('3d') : undefined} />
      </div>
    );
  }

  const nextUnread = [...contentPack.districts].sort((a, b) => a.order - b.order).find((d) => !read.includes(d.id)) ?? contentPack.districts[0];
  const btn = (active: boolean) =>
    cn(
      'min-h-[40px] shrink-0 rounded-lg border px-3 text-xs font-medium shadow-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:text-sm',
      active ? 'border-ink bg-ink text-surface' : 'border-hairline bg-surface-raised/95 text-ink',
    );

  return (
    <div className="fixed inset-x-0 bottom-0 top-14 z-10 bg-surface sm:top-16">
      <div className={cn('absolute inset-0 lg:right-[436px]', !sheetMin && 'bottom-[45%] lg:bottom-0')}>
        <World
          concepts={{}}
          dueByDistrict={{}}
          focus={focus}
          labels={true}
          engineView={false}
          caseDistrict={null}
          colours={colours}
          reducedMotion={reducedMotion}
          onDistrictClick={onDistrictClick}
          onAnchorClick={onAnchorClick}
          onBackgroundClick={onBackgroundClick}
          built={built}
        />
      </div>

      {/* Top overlay: title, HUD, tools */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 space-y-2 p-2 sm:p-3 lg:right-[436px]">
        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          <h1 className="rounded-lg bg-surface-raised/95 px-2.5 py-1.5 text-sm font-semibold shadow-sm">Credit Risk City</h1>
          <div className="min-w-0 flex-1"><Hud readCount={read.length} /></div>
        </div>
        <nav className="pointer-events-auto flex gap-1 overflow-x-auto no-scrollbar" aria-label="City tools">
          <button onClick={goHome} aria-current={mode === 'home' ? 'page' : undefined} className={btn(mode === 'home')}>City</button>
          <button onClick={() => openLesson(selected ?? nextUnread.id)} className={btn(false)}>Read</button>
          <button onClick={() => setView('list')} className={btn(false)}>2D list</button>
        </nav>
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
        {mode === 'home' && <HomePanel onRead={openLesson} />}
        {mode === 'district' && selected && (
          <DistrictPanel
            id={selected}
            onRead={() => openLesson(selected)}
            onSelect={onDistrictClick}
          />
        )}
      </aside>

      {lesson && <LessonReader district={lesson} onClose={() => setLesson(null)} onOpen={openLesson} />}
    </div>
  );
}
