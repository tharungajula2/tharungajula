import { migrate, type StorageAdapter } from './adapter';

const KEY = 'credit-risk-city:v1';

export const localAdapter: StorageAdapter = {
  load() {
    try {
      if (typeof window === 'undefined') return null;
      const raw = window.localStorage.getItem(KEY);
      return raw ? migrate(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  },
  save(state) {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked: the game keeps running in memory.
    }
  },
  export(state) {
    return JSON.stringify(state);
  },
  import(json) {
    const parsed = migrate(JSON.parse(json));
    if (!parsed) throw new Error('Unrecognised save file');
    return parsed;
  },
};
