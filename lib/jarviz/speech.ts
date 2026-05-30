'use client';

let voices: SpeechSynthesisVoice[] = [];

// Initialize voices safely
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return Promise.resolve([]);
  }

  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    let list = synth.getVoices();
    
    if (list.length > 0) {
      voices = list;
      resolve(list);
    } else {
      synth.onvoiceschanged = () => {
        voices = synth.getVoices();
        resolve(voices);
      };
    }
  });
}

// Select a premium, crisp English voice
export function chooseJarvizVoice(): SpeechSynthesisVoice | null {
  if (voices.length === 0 && typeof window !== 'undefined' && window.speechSynthesis) {
    voices = window.speechSynthesis.getVoices();
  }

  if (voices.length === 0) return null;

  // Premium voice preference list: Google US English, Microsoft David, English US/GB female/male
  const preferences = [
    (v: SpeechSynthesisVoice) => v.name.includes('Google US English'),
    (v: SpeechSynthesisVoice) => v.name.includes('Microsoft David'),
    (v: SpeechSynthesisVoice) => v.lang === 'en-US' && v.localService,
    (v: SpeechSynthesisVoice) => v.lang === 'en-GB' && v.localService,
    (v: SpeechSynthesisVoice) => v.lang.startsWith('en-'),
  ];

  for (const pref of preferences) {
    const found = voices.find(pref);
    if (found) return found;
  }

  // Fallback to first English voice
  const fallbackEn = voices.find((v) => v.lang.startsWith('en'));
  return fallbackEn || voices[0] || null;
}

export interface SpeakOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Speak text using SpeechSynthesis
export function speakJarviz(text: string, options?: SpeakOptions): Promise<void> {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('[JARVIZ Speech] SpeechSynthesis unsupported in this environment.');
    if (options?.onEnd) options.onEnd();
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    
    // Stop any active speech first
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get premium voice
    const voice = chooseJarvizVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // premium settings as requested
    utterance.rate = 1.05;
    utterance.pitch = 0.9;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      if (options?.onStart) options.onStart();
    };

    utterance.onend = () => {
      if (options?.onEnd) options.onEnd();
      resolve();
    };

    utterance.onerror = (err) => {
      console.warn('[JARVIZ Speech] Utterance error:', err);
      if (options?.onError) options.onError(err);
      resolve(); // Resolve anyway to not block async flows
    };

    synth.speak(utterance);
  });
}

// Stop any active speech
export function stopJarvizSpeech() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
