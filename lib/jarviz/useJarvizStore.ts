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

export type RobotReaction =
  | 'idle'
  | 'wake'
  | 'track'
  | 'acknowledge'
  | 'listen'
  | 'thinking'
  | 'speaking'
  | 'error'
  | 'pause'
  | 'sleep';

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
  isGeminiStreaming: boolean;
  robotReaction: RobotReaction;
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
  isGeminiStreaming: false,
  robotReaction: 'idle',
};

let storeState = { ...initialStore };
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

let reactionLockUntil = 0;
const TRANSIENT_REACTIONS = ['wake', 'acknowledge', 'error'];

export const jarvizStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return storeState;
  },
  set(updates: Partial<JarvizStore>) {
    const nextState = { ...storeState, ...updates };
    
    // Default to existing reaction if locked and no explicit override is provided
    let reaction = storeState.robotReaction;
    
    const hasExplicitReaction = updates.robotReaction !== undefined;
    const isLockExpired = Date.now() >= reactionLockUntil;
    
    if (hasExplicitReaction || isLockExpired || nextState.fsmState === 'COMMAND_CONFIRMED' || nextState.fsmState === 'ERROR') {
      if (updates.robotReaction !== undefined) {
        reaction = updates.robotReaction;
      } else {
        // Automatically compute correct robotReaction based on states
        if (nextState.fsmState === 'ERROR') {
          reaction = 'error';
        } else if (nextState.isGeminiStreaming) {
          reaction = 'thinking';
        } else if (nextState.fsmState === 'ROBOT_RESPONDING') {
          reaction = 'speaking';
        } else if (nextState.fsmState === 'COMMAND_CONFIRMED') {
          reaction = 'acknowledge';
        } else if (nextState.fsmState === 'LISTENING') {
          reaction = 'listen';
        } else if (nextState.fsmState === 'HAND_DETECTED') {
          reaction = 'track';
        } else if (nextState.fsmState === 'CAMERA_PERMISSION_PENDING') {
          reaction = 'wake';
        } else if (nextState.fsmState === 'PAUSED') {
          reaction = 'pause';
        } else if (nextState.cameraActive) {
          reaction = nextState.lastGesture !== 'None' ? 'track' : 'wake';
        } else if (nextState.fsmState === 'VISION_ONLINE') {
          reaction = 'wake';
        } else {
          reaction = 'idle';
        }
      }
    }
    
    // Update the lock if a transient reaction is applied
    if (TRANSIENT_REACTIONS.includes(reaction)) {
      reactionLockUntil = Date.now() + 950;
    }
    
    storeState = { ...nextState, robotReaction: reaction };
    emitChange();
  },
  reset() {
    reactionLockUntil = 0;
    storeState = { ...initialStore };
    emitChange();
  }
};

export function robotReact(reaction: RobotReaction, force = false) {
  if (force) {
    reactionLockUntil = 0; // Clear lock for manual diagnostics click
  }
  
  if (force || Date.now() >= reactionLockUntil || TRANSIENT_REACTIONS.includes(reaction)) {
    jarvizStore.set({ robotReaction: reaction });
  }
}

export function useJarvizStore() {
  return useSyncExternalStore(
    jarvizStore.subscribe,
    jarvizStore.getSnapshot,
    () => initialStore
  );
}
