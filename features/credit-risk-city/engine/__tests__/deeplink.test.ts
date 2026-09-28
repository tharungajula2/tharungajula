import { describe, expect, it } from 'vitest';
import { parseDeepLink } from '../../state/deepLink';

describe('deep links', () => {
  it('opens a district, a street, or a mode; ignores junk', () => {
    expect(parseDeepLink('?district=vault')).toEqual({ mode: 'district', district: 'vault', exhibit: 0 });
    expect(parseDeepLink('?district=vault&walk=1&exhibit=3')).toEqual({ mode: 'interior', district: 'vault', exhibit: 2 });
    expect(parseDeepLink('?district=vault&walk=1&exhibit=99').exhibit).toBe(5);
    expect(parseDeepLink('?mode=case')).toEqual({ mode: 'case', district: null, exhibit: 0 });
    expect(parseDeepLink('?district=atlantis&mode=nope')).toEqual({ mode: 'home', district: null, exhibit: 0 });
    expect(parseDeepLink('')).toEqual({ mode: 'home', district: null, exhibit: 0 });
  });
});
