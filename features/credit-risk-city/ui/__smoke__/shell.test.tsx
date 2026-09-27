// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { WorldProps } from '../world/World';

const lastProps: { current: WorldProps | null } = { current: null };
vi.mock('../world/World', () => ({
  default: (p: WorldProps) => {
    lastProps.current = p;
    return <div data-testid="world" data-focus={p.focus ?? ''} data-labels={String(p.labels)} data-case={p.caseDistrict ?? ''} />;
  },
}));

import CityApp from '../../CityApp';
import { useCity } from '../../state/store';
import { useWorld } from '../../state/world';
import { contentPack } from '../../content';

const click = (el: Element) => act(() => { fireEvent.click(el); });
const btn = (name: RegExp) => screen.getByRole('button', { name });
const world = () => screen.getByTestId('world');

function answerCurrent() {
  const ta = screen.queryByPlaceholderText(/Answer from memory/);
  if (ta) {
    act(() => { fireEvent.change(ta, { target: { value: 'my answer here' } }); });
    click(btn(/Check against key points/));
    screen.getAllByRole('checkbox').forEach((c: HTMLElement) => click(c));
  }
  const num = screen.queryByPlaceholderText('Your answer');
  if (num) act(() => { fireEvent.change(num, { target: { value: '0.1' } }); });
  screen.queryAllByRole('combobox').forEach((s: HTMLElement) => act(() => { fireEvent.change(s, { target: { value: '0' } }); }));
  const opts = screen.queryAllByRole('button').filter((b: HTMLElement) => b.className.includes('text-left') && !b.hasAttribute('disabled'));
  if (opts.length && !num && !ta) click(opts[0]);
  click(btn(/^Sure$/));
  click(btn(/Submit|Lock prediction/));
  click(btn(/Continue/));
}

describe('3D shell', () => {
  beforeEach(() => {
    localStorage.clear();
    useCity.getState().reset();
    useWorld.setState({ selected: null, openConcept: null, roundDistrict: null, engineView: false, walk: null });
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) });
  });
  afterEach(cleanup);

  it('3D: district → practice, Daily Round drives the camera, case moves the van, Palace Walk hides labels', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as never);
    render(<CityApp />);
    expect(screen.getByText('Welcome to the city')).toBeTruthy();

    // Tap a district in the world
    act(() => lastProps.current!.onDistrictClick('mint'));
    expect(screen.getByRole('heading', { name: 'The Mint' })).toBeTruthy();
    expect(world().dataset.focus).toBe('mint');
    click(screen.getByText('The bank balance sheet'));
    click(btn(/Open the card/));
    expect(screen.getByText(/Why it matters/)).toBeTruthy();
    click(btn(/Practise here/));
    click(btn(/^Start$/));
    expect(world().dataset.focus).toBe('mint');
    let g = 0;
    while (!screen.queryByText(/Round complete/) && g++ < 10) answerCurrent();
    expect(screen.getByText(/Round complete/)).toBeTruthy();
    expect(useCity.getState().streak.count).toBe(0); // district practice never counts as the Daily Round

    // Daily Round: camera follows each item's district
    click(btn(/^Daily Round$/));
    click(btn(/Start today’s round/));
    const seen = new Set<string>();
    g = 0;
    while (!screen.queryByText(/Round complete/) && g++ < 30) {
      seen.add(world().dataset.focus!);
      answerCurrent();
    }
    expect(seen.size).toBeGreaterThan(1);
    expect(useCity.getState().streak.count).toBe(1);

    // Case: van + focus follow the case step
    click(btn(/^Case$/));
    click(btn(/Start the case/));
    expect(world().dataset.case).toBe('market');
    expect(world().dataset.focus).toBe('market');
    answerCurrent();
    click(btn(/Next step/));
    expect(world().dataset.case).toBe('branch');

    // Clicking districts during a case does nothing
    act(() => lastProps.current!.onDistrictClick('vault'));
    expect(world().dataset.case).toBe('branch');

    // Palace Walk: labels off, tap answers "where" questions
    click(btn(/^Palace Walk$/));
    click(btn(/Start the walk/));
    expect(world().dataset.labels).toBe('false');
    const w = useWorld.getState().walk!;
    const q0 = w.questions[0];
    if (q0.kind !== 'where') throw new Error('first question should be where');
    act(() => lastProps.current!.onDistrictClick(q0.answer));
    expect(screen.getByText('Right place')).toBeTruthy();
    expect(world().dataset.focus).toBe(q0.answer);
    click(btn(/^Next$/));
    const q1 = useWorld.getState().walk!.questions[1];
    if (q1.kind !== 'what') throw new Error('second question should be what');
    expect(world().dataset.focus).toBe(q1.district);
    click(screen.getByRole('button', { name: q1.options[q1.answerIndex] }));
    expect(screen.getByText('Right place')).toBeTruthy();

    // Engine Room toggle, anchors, 2D list and back
    click(btn(/^Engine Room$/));
    expect(lastProps.current!.engineView).toBe(true);
    click(btn(/^City$/));
    act(() => lastProps.current!.onAnchorClick(contentPack.concepts.find((c) => c.district === 'vault')!.id));
    expect(screen.getByRole('heading', { name: 'Provision Vault' })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Open the card/ })).toBeTruthy();
    click(btn(/^2D list$/));
    expect(screen.queryByTestId('world')).toBeNull();
    click(btn(/Open 3D city/));
    expect(world()).toBeTruthy();
  });

  it('falls back to the 2D list when WebGL is unavailable', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    render(<CityApp />);
    expect(screen.queryByTestId('world')).toBeNull();
    expect(screen.getByText(/2D view/)).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Open 3D city/ })).toBeNull();
    click(screen.getByText('The Mint'));
    expect(screen.getByText('The bank balance sheet')).toBeTruthy();
  });
});
