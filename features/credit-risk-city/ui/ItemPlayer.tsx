'use client';

import { useState } from 'react';
import type { Item } from '../content/types';
import { defaultGrader, type GradeResult, type Response } from '../engine/learning/grading';
import { cn } from '@/lib/utils';
import { Button, Tag } from './primitives';
import { seededShuffle } from './format';
import { requestAiGrade } from '../state/aiGrade';

export interface ItemOutcome {
  result: GradeResult;
  confidence: 1 | 2 | 3;
  firstAttempt: boolean;
}

interface Props {
  item: Item;
  /** For predict items bound to the simulation: called at submit; returns the sim value to grade against. */
  resolveSim?: () => number | null;
  retry?: boolean;
  onAnswered(outcome: ItemOutcome): void;
  onContinue(): void;
}

const CONF: { v: 1 | 2 | 3; label: string }[] = [
  { v: 1, label: 'Guess' },
  { v: 2, label: 'Unsure' },
  { v: 3, label: 'Sure' },
];

export default function ItemPlayer({ item, resolveSim, retry = false, onAnswered, onContinue }: Props) {
  const p = item.payload;
  const [confidence, setConfidence] = useState<1 | 2 | 3 | null>(null);
  const [option, setOption] = useState<number | null>(null);
  const [numberText, setNumberText] = useState('');
  const [draft, setDraft] = useState('');
  const [checking, setChecking] = useState(false);
  const [ticked, setTicked] = useState<number[]>([]);
  const [assignment, setAssignment] = useState<number[]>(() => (p.type === 'classify' ? p.entries.map(() => -1) : []));
  const [order, setOrder] = useState<string[]>(() => (p.type === 'sequence' ? seededShuffle(p.steps, item.id) : []));
  const [usedWorked, setUsedWorked] = useState(false);
  const [showWorked, setShowWorked] = useState(false);
  const [outcome, setOutcome] = useState<ItemOutcome | null>(null);
  const [simShown, setSimShown] = useState<number | null>(null);
  const [ai, setAi] = useState<{ status: 'idle' | 'loading' | 'done' | 'error'; feedback: string }>({ status: 'idle', feedback: '' });

  const askAi = async () => {
    if (p.type !== 'recall' && p.type !== 'explain') return;
    setAi({ status: 'loading', feedback: '' });
    try {
      const g = await requestAiGrade({ prompt: item.prompt, modelAnswer: p.modelAnswer, keyPoints: p.keyPoints.map((k) => k.text), answer: draft });
      setTicked(g.covered);
      setAi({ status: 'done', feedback: g.feedback });
    } catch (e) {
      setAi({ status: 'error', feedback: e instanceof Error ? e.message : 'AI grader unavailable' });
    }
  };

  const numeric = p.type === 'calculate' || (p.type === 'predict' && !!p.numeric);
  const optionsOf = (): string[] | null =>
    p.type === 'choice' || p.type === 'spot' || p.type === 'anchor' ? p.options : p.type === 'predict' && p.options ? p.options : null;
  const options = optionsOf();

  const response = (): Response | null => {
    if (p.type === 'recall' || p.type === 'explain') return checking ? { type: 'selfGrade', ticked } : null;
    if (numeric) {
      const v = Number(numberText.replace(/,/g, ''));
      return numberText.trim() === '' || !Number.isFinite(v) ? null : { type: 'number', value: v };
    }
    if (options) return option === null ? null : { type: 'option', index: option };
    if (p.type === 'classify') return assignment.some((a) => a < 0) ? null : { type: 'buckets', assignment };
    if (p.type === 'sequence') return { type: 'order', order };
    return null;
  };

  const r = response();
  const canSubmit = !!r && confidence !== null && !outcome;

  const submit = () => {
    if (!r || confidence === null) return;
    const target = p.type === 'predict' && resolveSim ? resolveSim() : null;
    setSimShown(target);
    const result = defaultGrader.grade(p, r, target);
    const o = { result, confidence, firstAttempt: !retry && !usedWorked };
    setOutcome(o);
    onAnswered(o);
  };

  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    setOrder(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{p.type}</Tag>
        {retry && <Tag>retry — no recall credit</Tag>}
        {item.placeholder && <Tag>placeholder</Tag>}
      </div>
      <p className="text-base sm:text-lg leading-relaxed text-ink">{item.prompt}</p>

      {/* Answer area */}
      {(p.type === 'recall' || p.type === 'explain') && (
        <div className="space-y-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={checking}
            rows={4}
            placeholder="Answer from memory first…"
            className="w-full rounded-lg border border-hairline-strong bg-surface p-3 text-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          />
          {!checking ? (
            <Button variant="ghost" onClick={() => setChecking(true)} disabled={draft.trim().length < 3}>
              Check against key points
            </Button>
          ) : (
            <div className="space-y-2">
              {!outcome && (
                <div className="space-y-2 rounded-lg bg-surface-sunken p-3">
                  <Button variant="ghost" onClick={askAi} disabled={ai.status === 'loading' || draft.trim().length < 10}>
                    {ai.status === 'loading' ? 'Checking…' : ai.status === 'done' ? 'Ask the AI again' : 'Ask the AI to check my answer'}
                  </Button>
                  {ai.status === 'done' && (
                    <p className="text-xs text-ink-muted">
                      AI suggestion: {ai.feedback || 'no comment.'} The ticks below are its view — change any you disagree with.
                    </p>
                  )}
                  {ai.status === 'error' && <p className="text-xs text-ink-muted">{ai.feedback}. Tick the points yourself.</p>}
                </div>
              )}
            <fieldset className="space-y-2">
              <legend className="text-sm text-ink-muted">Tick only the points your answer actually made:</legend>
              {p.keyPoints.map((k, i) => (
                <label key={i} className="flex min-h-[44px] items-start gap-3 rounded-lg border border-hairline p-3 text-sm">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4"
                    checked={ticked.includes(i)}
                    disabled={!!outcome}
                    onChange={(e) => setTicked(e.target.checked ? [...ticked, i] : ticked.filter((x) => x !== i))}
                  />
                  <span>
                    {k.text} {k.essential && <span className="text-ink-faint">(essential)</span>}
                  </span>
                </label>
              ))}
            </fieldset>
            </div>
          )}
        </div>
      )}

      {options && (
        <div className="grid gap-2">
          {options.map((o, i) => {
            const isAnswer = outcome && 'answerIndex' in p && p.answerIndex === i;
            return (
              <button
                key={i}
                disabled={!!outcome}
                onClick={() => setOption(i)}
                className={cn(
                  'min-h-[44px] rounded-lg border px-4 py-2 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none',
                  option === i ? 'border-ink bg-surface-sunken' : 'border-hairline hover:bg-surface-sunken',
                  isAnswer && 'border-accent bg-accent-dim',
                )}
              >
                {o}
              </button>
            );
          })}
        </div>
      )}

      {numeric && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              inputMode="decimal"
              value={numberText}
              disabled={!!outcome}
              onChange={(e) => setNumberText(e.target.value)}
              placeholder="Your answer"
              className="min-h-[44px] w-40 rounded-lg border border-hairline-strong bg-surface px-3 text-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            />
            <span className="text-sm text-ink-muted">
              {p.type === 'calculate' ? p.unit : p.type === 'predict' ? p.numeric?.unit : ''}
            </span>
          </div>
          {p.type === 'calculate' && p.worked && !outcome && (
            <div>
              {!showWorked ? (
                <Button variant="quiet" onClick={() => { setShowWorked(true); setUsedWorked(true); }}>
                  Show worked example (no recall credit)
                </Button>
              ) : (
                <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-muted">
                  {p.worked.map((w, i) => <li key={i}>{w}</li>)}
                </ol>
              )}
            </div>
          )}
        </div>
      )}

      {p.type === 'classify' && (
        <div className="space-y-2">
          {p.entries.map((e, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-lg border border-hairline p-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm">{e.text}</span>
              <select
                value={assignment[i]}
                disabled={!!outcome}
                onChange={(ev) => setAssignment(assignment.map((a, j) => (j === i ? Number(ev.target.value) : a)))}
                className={cn(
                  'min-h-[44px] rounded-lg border border-hairline-strong bg-surface px-2 text-sm',
                  outcome && (assignment[i] === e.bucket ? 'border-accent' : 'border-ink'),
                )}
              >
                <option value={-1}>Choose…</option>
                {p.buckets.map((b, j) => <option key={j} value={j}>{b}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}

      {p.type === 'sequence' && (
        <ol className="space-y-2">
          {order.map((s, i) => (
            <li key={s} className="flex min-h-[44px] items-center gap-2 rounded-lg border border-hairline px-3 py-1 text-sm">
              <span className="w-5 text-ink-faint">{i + 1}</span>
              <span className="flex-1">{s}</span>
              <Button variant="quiet" aria-label={`Move ${s} up`} disabled={!!outcome || i === 0} onClick={() => move(i, -1)}>↑</Button>
              <Button variant="quiet" aria-label={`Move ${s} down`} disabled={!!outcome || i === order.length - 1} onClick={() => move(i, 1)}>↓</Button>
            </li>
          ))}
        </ol>
      )}

      {/* Confidence + submit */}
      {!outcome && (
        <div className="space-y-3 border-t border-hairline pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-ink-muted">How sure?</span>
            {CONF.map((c) => (
              <button
                key={c.v}
                onClick={() => setConfidence(c.v)}
                className={cn(
                  'min-h-[44px] rounded-full border px-4 text-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none',
                  confidence === c.v ? 'border-ink bg-ink text-surface' : 'border-hairline-strong',
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <Button onClick={submit} disabled={!canSubmit}>
            {p.type === 'predict' ? 'Lock prediction & reveal' : 'Submit'}
          </Button>
        </div>
      )}

      {/* Feedback */}
      {outcome && (
        <div className={cn('space-y-3 rounded-lg border p-4', outcome.result.correct ? 'border-accent bg-accent-glow' : 'border-hairline-strong bg-surface-sunken')}>
          <p className="text-sm font-semibold">
            {outcome.result.correct ? 'Correct' : 'Not quite'}
            {outcome.result.score > 0 && outcome.result.score < 1 && ` · score ${(outcome.result.score * 100).toFixed(0)}%`}
            {!outcome.result.correct && outcome.confidence === 3 && ' · confident miss: it will come back tomorrow and in 3 days'}
          </p>
          {p.type === 'predict' && p.numeric && simShown !== null && (
            <p className="text-sm">Simulation result: <strong>{simShown.toFixed(4)}</strong></p>
          )}
          {p.type === 'calculate' && <p className="text-sm">Answer: <strong>{p.answer}</strong> {p.unit}</p>}
          {p.type === 'sequence' && (
            <ol className="list-decimal pl-5 text-sm">{p.steps.map((s) => <li key={s}>{s}</li>)}</ol>
          )}
          {(p.type === 'recall' || p.type === 'explain') && <p className="text-sm"><strong>Model answer:</strong> {p.modelAnswer}</p>}
          <p className="text-sm text-ink-muted">{item.explanation}</p>
          <Button onClick={onContinue}>Continue</Button>
        </div>
      )}
    </div>
  );
}
