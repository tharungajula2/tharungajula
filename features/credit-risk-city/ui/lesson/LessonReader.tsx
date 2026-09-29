'use client';

import { useEffect, useRef, useState } from 'react';
import { contentPack } from '../../content';
import { lessonFor } from '../../content/lessons';
import type { DistrictId } from '../../content/types';
import { exhibitsFor } from '../../exhibits';
import { useCity } from '../../state/store';
import { cn } from '@/lib/utils';
import { Button } from '../primitives';
import Markdown from './Markdown';

const ordered = [...contentPack.districts].sort((a, b) => a.order - b.order);

/** Full-screen reader for one district's lesson, with next/previous in walking order. */
export default function LessonReader({ district, onClose, onOpen, onWalkIn }: {
  district: DistrictId;
  onClose(): void;
  onOpen(d: DistrictId): void;
  onWalkIn(d: DistrictId): void;
}) {
  const d = ordered.find((x) => x.id === district)!;
  const lesson = lessonFor(district);
  const read = useCity((s) => s.read.includes(district));
  const toggleRead = useCity((s) => s.toggleRead);
  const [deep, setDeep] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const i = ordered.indexOf(d);
  const prev = ordered[i - 1];
  const next = ordered[i + 1];
  const machines = exhibitsFor(district).length;

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [district]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-surface" role="dialog" aria-label={`${d.name} lesson`}>
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs text-ink-faint">District {d.order} of {ordered.length}{lesson ? ` · ${lesson.minutes} min read` : ''}</p>
          <p className="truncate text-base font-semibold">{d.name}</p>
        </div>
        <Button variant="ghost" onClick={onClose}>Back to the city</Button>
      </div>

      <div ref={scroller} className="flex-1 overflow-y-auto">
        <article className="mx-auto max-w-[760px] px-4 pb-24 pt-6 sm:px-6">
          <p className="text-sm text-ink-muted">{d.purpose}</p>
          {lesson ? (
            <>
              <p className="my-5 rounded-lg border-l-4 border-ink bg-surface-sunken px-4 py-3 text-lg font-semibold leading-8">{lesson.idea}</p>
              <Markdown source={lesson.surface} />

              <div className="mt-10 rounded-xl border border-hairline">
                <button onClick={() => setDeep(!deep)} aria-expanded={deep} className="flex w-full items-center justify-between px-4 py-4 text-left">
                  <span>
                    <span className="block text-base font-semibold">Go deeper</span>
                    <span className="block text-xs text-ink-muted">The detail behind the surface — read when you are ready.</span>
                  </span>
                  <span className="text-xl">{deep ? '−' : '+'}</span>
                </button>
                {deep && <div className="border-t border-hairline px-4 pb-4"><Markdown source={lesson.deeper} /></div>}
              </div>

              {!lesson.verified && (
                <p className="mt-6 text-xs text-ink-faint">Figures and rules are illustrative or as understood at the time of writing; check the current RBI master directions and standards before relying on them.</p>
              )}

              <div className="mt-8 flex flex-wrap gap-2">
                <Button onClick={() => toggleRead(district)} className={cn(read && 'bg-accent')}>{read ? '✓ Read' : 'Mark as read'}</Button>
                {machines > 0 && <Button variant="ghost" onClick={() => onWalkIn(district)}>See it move · {machines} machines</Button>}
              </div>
            </>
          ) : (
            <p className="my-8 rounded-lg border border-hairline p-4 text-sm">This district’s lesson is being written. Its machines already work — walk in to try them.</p>
          )}

          <nav className="mt-10 flex justify-between gap-3 border-t border-hairline pt-4 text-sm">
            {prev ? <button onClick={() => onOpen(prev.id)} className="text-left underline-offset-4 hover:underline">← {prev.order}. {prev.name}</button> : <span />}
            {next ? <button onClick={() => onOpen(next.id)} className="text-right underline-offset-4 hover:underline">{next.order}. {next.name} →</button> : <span />}
          </nav>
        </article>
      </div>
    </div>
  );
}
