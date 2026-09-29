'use client';

import { useEffect, useMemo } from 'react';
import { CanvasTexture, LinearMipmapLinearFilter, SRGBColorSpace } from 'three';
import type { Board } from '../../content/lessons/boards';

// Boards are drawn once onto a canvas (crisp, no DOM overlay) and mounted in the street as framed panels.

export const BOARD_W = 10; // world units
const PX = 1600; // canvas width
const PAD = 64;
const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const INK = '#1f2937';
const MUTED = '#6b7280';

interface Layout {
  canvas: HTMLCanvasElement;
  height: number; // world units
}

const cache = new Map<string, Layout>();

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (ctx.measureText(next).width > max && line) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

/** Draw (or fetch from cache) a board's canvas and its height in world units. */
export function boardLayout(key: string, b: Board, colour: string, label: string): Layout {
  const hit = cache.get(key);
  if (hit) return hit;
  const canvas = document.createElement('canvas');
  canvas.width = PX;
  const ctx = canvas.getContext('2d')!;
  const inner = PX - PAD * 2;

  // Measure pass.
  ctx.font = `700 60px ${FONT}`;
  const titleLines = wrap(ctx, b.title, inner);
  ctx.font = `600 40px ${FONT}`;
  const ideaLines = b.idea ? wrap(ctx, b.idea, inner) : [];
  ctx.font = `400 32px ${FONT}`;
  const bulletLines = (b.bullets ?? []).map((t) => wrap(ctx, t, inner - 44));

  let colW: number[] = [];
  let headLines: string[][] = [];
  let rowLines: string[][][] = [];
  if (b.table) {
    const n = b.table.head.length;
    ctx.font = `400 30px ${FONT}`;
    const natural = Array.from({ length: n }, (_, c) => {
      const texts = [b.table!.head[c], ...b.table!.rows.map((r) => r[c] ?? '')];
      return Math.min(620, Math.max(160, ...texts.map((t) => ctx.measureText(t).width + 40)));
    });
    const sum = natural.reduce((a, x) => a + x, 0);
    colW = natural.map((x) => (x / sum) * inner);
    ctx.font = `700 30px ${FONT}`;
    headLines = b.table.head.map((h, c) => wrap(ctx, h, colW[c] - 32));
    ctx.font = `400 30px ${FONT}`;
    rowLines = b.table.rows.map((r) => r.map((t, c) => wrap(ctx, t ?? '', colW[c] - 32)));
  }
  const rowH = (ls: string[][]) => Math.max(...ls.map((l) => l.length)) * 40 + 28;

  const bandH = 44 + 48 + titleLines.length * 70 + 28;
  let h = bandH + PAD * 0.6;
  if (ideaLines.length) h += ideaLines.length * 54 + 24;
  if (b.table) h += rowH(headLines) + rowLines.reduce((a, r) => a + rowH(r), 0) + 16;
  h += bulletLines.reduce((a, l) => a + l.length * 44 + 14, 0);
  h += PAD * 0.8;
  canvas.height = Math.ceil(h);

  // Draw pass.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, PX, canvas.height);
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, PX, bandH);
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fillRect(0, bandH - 6, PX, 6);
  ctx.textBaseline = 'top';
  ctx.fillStyle = MUTED;
  ctx.font = `600 28px ${FONT}`;
  ctx.fillText(label.toUpperCase(), PAD, 44);
  ctx.fillStyle = INK;
  ctx.font = `700 60px ${FONT}`;
  titleLines.forEach((l, i) => ctx.fillText(l, PAD, 92 + i * 70));

  let y = bandH + PAD * 0.6;
  if (ideaLines.length) {
    ctx.fillStyle = INK;
    ctx.fillRect(PAD, y, 8, ideaLines.length * 54 - 6);
    ctx.font = `600 40px ${FONT}`;
    ideaLines.forEach((l, i) => ctx.fillText(l, PAD + 28, y + i * 54));
    y += ideaLines.length * 54 + 24;
  }
  if (b.table) {
    const drawRow = (ls: string[][], bold: boolean, fill: string) => {
      const hh = rowH(ls);
      ctx.fillStyle = fill;
      ctx.fillRect(PAD, y, inner, hh);
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 2;
      ctx.strokeRect(PAD, y, inner, hh);
      let x = PAD;
      ls.forEach((cell, c) => {
        ctx.fillStyle = INK;
        ctx.font = `${bold || c === 0 ? 700 : 400} 30px ${FONT}`;
        cell.forEach((l, i) => ctx.fillText(l, x + 16, y + 14 + i * 40));
        x += colW[c];
        if (c < ls.length - 1) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + hh);
          ctx.stroke();
        }
      });
      y += hh;
    };
    drawRow(headLines, true, '#f1f3f5');
    rowLines.forEach((r, i) => drawRow(r, false, i % 2 ? '#fafafa' : '#ffffff'));
    y += 16;
  }
  if (bulletLines.length) {
    ctx.font = `400 32px ${FONT}`;
    ctx.fillStyle = INK;
    bulletLines.forEach((ls) => {
      ctx.beginPath();
      ctx.arc(PAD + 12, y + 18, 7, 0, Math.PI * 2);
      ctx.fill();
      ls.forEach((l, i) => ctx.fillText(l, PAD + 44, y + i * 44));
      y += ls.length * 44 + 14;
    });
  }

  const layout = { canvas, height: (canvas.height / PX) * BOARD_W };
  cache.set(key, layout);
  return layout;
}

/** A framed board on two posts; bottom edge at 1.2 above the floor. */
export function BoardStand({ boardKey, board, colour, label, active, onClick }: {
  boardKey: string;
  board: Board;
  colour: string;
  label: string;
  active: boolean;
  onClick(): void;
}) {
  const { canvas, height } = useMemo(() => boardLayout(boardKey, board, colour, label), [boardKey, board, colour, label]);
  const texture = useMemo(() => {
    const t = new CanvasTexture(canvas);
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = 8;
    t.minFilter = LinearMipmapLinearFilter;
    return t;
  }, [canvas]);
  useEffect(() => () => texture.dispose(), [texture]);
  const cy = 1.2 + height / 2;
  return (
    <group onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {[-BOARD_W / 2 + 0.6, BOARD_W / 2 - 0.6].map((x) => (
        <mesh key={x} position={[x, (cy - height / 2) / 2, -0.15]}>
          <boxGeometry args={[0.18, cy - height / 2, 0.18]} />
          <meshStandardMaterial color="#6b7079" />
        </mesh>
      ))}
      <mesh position={[0, cy, -0.12]}>
        <boxGeometry args={[BOARD_W + 0.4, height + 0.4, 0.16]} />
        <meshStandardMaterial color={active ? '#1f2937' : '#4b5563'} />
      </mesh>
      <mesh position={[0, cy, -0.03]}>
        <planeGeometry args={[BOARD_W, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {active && (
        <mesh position={[0, 0.27, 2.2]}>
          <boxGeometry args={[BOARD_W + 1, 0.06, 0.3]} />
          <meshBasicMaterial color="#2a9db5" />
        </mesh>
      )}
    </group>
  );
}
