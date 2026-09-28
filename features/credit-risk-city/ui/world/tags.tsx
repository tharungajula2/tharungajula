'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useId, useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { Vector3, type Group } from 'three';

// A single DOM overlay for every 3D label: anchors live in the scene, text lives in one plain
// overlay, and a projector moves each label to its anchor's screen position on every rendered frame.

interface TagInfo {
  text: string;
  className: string;
}

const tags = new Map<string, TagInfo>();
const anchors = new Map<string, Group>();
const nodes = new Map<string, HTMLElement>();
const listeners = new Set<() => void>();
let snapshot: [string, TagInfo][] = [];

function emit() {
  snapshot = [...tags.entries()];
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** A label pinned to a point in the 3D scene. Renders nothing in the scene itself. */
export function Tag3D({ position, text, className }: { position: [number, number, number]; text: string; className: string }) {
  const id = useId();
  const ref = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  useLayoutEffect(() => {
    if (ref.current) anchors.set(id, ref.current);
    return () => {
      anchors.delete(id);
      tags.delete(id);
      emit();
    };
  }, [id]);
  useEffect(() => {
    tags.set(id, { text, className });
    emit();
    invalidate();
  }, [id, text, className, invalidate]);
  return <group ref={ref} position={position} />;
}

const v = new Vector3();

const placed: { x: number; y: number; w: number; h: number }[] = [];

/** Mount once inside the Canvas: moves every label to its anchor on each rendered frame, nudging overlaps apart. */
export function TagProjector() {
  useFrame(({ camera, size }) => {
    const items: { el: HTMLElement; x: number; y: number; w: number; h: number; depth: number }[] = [];
    for (const [id, el] of nodes) {
      const a = anchors.get(id);
      if (!a) continue;
      a.getWorldPosition(v);
      v.project(camera);
      if (v.z > 1) {
        el.style.display = 'none';
        continue;
      }
      el.style.display = 'block';
      items.push({ el, x: ((v.x + 1) / 2) * size.width, y: ((1 - v.y) / 2) * size.height, w: el.offsetWidth, h: el.offsetHeight, depth: v.z });
    }
    // Nearest labels keep their spot; farther ones step upward until they no longer overlap.
    items.sort((a, b) => a.depth - b.depth);
    placed.length = 0;
    for (const it of items) {
      const step = it.h + 2;
      // The HUD covers the top of the canvas: labels must sit below it.
      const topSafe = size.width < 640 ? 104 : 118;
      const free = (y: number) => y - it.h / 2 >= topSafe && !placed.some((p) => Math.abs(p.x - it.x) < (p.w + it.w) / 2 + 2 && Math.abs(p.y - y) < (p.h + it.h) / 2 + 1);
      // Nearest free slot: stay, then one step up/down, then further down.
      const y = [0, -1, 1, -2, 2, 3, 4].map((k) => it.y + k * step).find(free) ?? Math.max(it.y, topSafe + it.h / 2);
      placed.push({ x: it.x, y, w: it.w, h: it.h });
      it.el.style.transform = `translate3d(${it.x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
    }
  });
  return null;
}

/** Mount once over the Canvas (same box): the DOM side of every label. */
export function TagOverlay() {
  const list = useSyncExternalStore(subscribe, () => snapshot, () => snapshot);
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      {list.map(([id, t]) => (
        <div
          key={id}
          ref={(el) => {
            if (el) nodes.set(id, el);
            else nodes.delete(id);
          }}
          className={'absolute left-0 top-0 whitespace-nowrap ' + t.className}
          style={{ transform: 'translate3d(-9999px, -9999px, 0)' }}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
