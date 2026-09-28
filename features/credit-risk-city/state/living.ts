'use client';

import { create } from 'zustand';
import { contentPack } from '../content';
import { createCityBank, readings, setStorm as stormSwitch, tickCityBank, type CityBank, type Readings } from '../living/bank';

interface LivingStore {
  bank: CityBank;
  readings: Readings;
  playing: boolean;
  tick(): void;
  togglePlay(): void;
  setStorm(on: boolean): void;
}

const first = createCityBank(20260928, contentPack.rules);

export const useLiving = create<LivingStore>()((set, get) => ({
  bank: first,
  readings: readings(first),
  playing: true,
  tick() {
    const bank = tickCityBank(get().bank, contentPack.rules);
    set({ bank, readings: readings(bank) });
  },
  togglePlay() {
    set({ playing: !get().playing });
  },
  setStorm(on) {
    const bank = stormSwitch(get().bank, on, contentPack.rules);
    set({ bank, readings: readings(bank) });
  },
}));
