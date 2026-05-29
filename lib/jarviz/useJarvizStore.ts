import { useSyncExternalStore } from 'react';

export type JarvizState = 
  | 'IDLE'
  | 'CAMERA_PERMISSION_PENDING'
  | 'VISION_ONLINE'
  | 'HAND_DETECTED'
  | 'GESTURE_CANDIDATE'
  | 'COMMAND_CONFIRMED'
  | 'LISTENING'
  | 'ROBOT_RESPONDING'
  | 'PAUSED'
  | 'ERROR';

export type JarvizMode = 'passive' | 'vision' | 'voice';

export interface JarvizStore {
  mode: JarvizMode;
  fsmState: JarvizState;
  lastGesture: string;
  gestureConfidence: number;
  transcript: string;
  interimTranscript: string;
  cameraActive: boolean;
  voiceActive: boolean;
  errorReason: string;
  confirmedCommand: string;
}

const initialStore: JarvizStore = {
  mode: 'passive',
  fsmState: 'IDLE',
  lastGesture: 'None',
  gestureConfidence: 0,
  transcript: '',
  interimTranscript: '',
  cameraActive: false,
  voiceActive: false,
  errorReason: '',
  confirmedCommand: '',
};

let storeState = { ...initialStore };
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const jarvizStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return storeState;
  },
  set(updates: Partial<JarvizStore>) {
    storeState = { ...storeState, ...updates };
    emitChange();
  },
  reset() {
    storeState = { ...initialStore };
    emitChange();
  }
};

export function useJarvizStore() {
  return useSyncExternalStore(
    jarvizStore.subscribe,
    jarvizStore.getSnapshot,
    () => initialStore
  );
}
