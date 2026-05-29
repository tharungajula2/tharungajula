export interface JarvizCommand {
  intent: 'nav_work' | 'nav_story' | 'nav_connect' | 'nav_home' | 'show_help' | 'pause' | 'greet' | 'thumbs_up' | 'none';
  label: string;
  responseSpeech?: string;
}

export const GESTURE_MAP: Record<string, JarvizCommand> = {
  'Open_Palm': { intent: 'greet', label: 'WAKE / GREET', responseSpeech: 'Systems fully operational. Welcome.' },
  'Closed_Fist': { intent: 'pause', label: 'PAUSE SYSTEM', responseSpeech: 'Suspending sensors.' },
  'Pointing_Up': { intent: 'nav_connect', label: 'CONNECT', responseSpeech: 'Initiating communication terminal.' },
  'Thumb_Up': { intent: 'thumbs_up', label: 'HIGHLIGHT FLAGSHIP', responseSpeech: 'Optimal portfolio modules highlighted.' },
  'Victory': { intent: 'show_help', label: 'COMMAND MAP', responseSpeech: 'Displaying navigation matrix.' },
  'swipe_right': { intent: 'nav_work', label: 'NAVIGATE: WORK', responseSpeech: 'Loading product neural network.' },
  'swipe_left': { intent: 'nav_story', label: 'NAVIGATE: STORY', responseSpeech: 'Accessing developmental evolution timeline.' },
};

export function parseVoiceCommand(transcript: string): JarvizCommand {
  const clean = transcript.toLowerCase().trim();

  if (clean.includes('show work') || clean.includes('open work') || clean.includes('projects') || clean.includes('show ai projects') || clean.includes('work')) {
    return { intent: 'nav_work', label: 'VOICE: WORK', responseSpeech: 'Navigating to my product lab.' };
  }
  if (clean.includes('open story') || clean.includes('story') || clean.includes('your journey') || clean.includes('evolution')) {
    return { intent: 'nav_story', label: 'VOICE: STORY', responseSpeech: 'Opening my professional evolution timeline.' };
  }
  if (clean.includes('connect') || clean.includes('contact') || clean.includes('get in touch')) {
    return { intent: 'nav_connect', label: 'VOICE: CONNECT', responseSpeech: 'Redirecting to contact links.' };
  }
  if (clean.includes('go home') || clean.includes('home') || clean.includes('thesis')) {
    return { intent: 'nav_home', label: 'VOICE: THESIS', responseSpeech: 'Returning to core thesis.' };
  }
  if (clean.includes('what can you do') || clean.includes('help') || clean.includes('commands') || clean.includes('cheat sheet')) {
    return { intent: 'show_help', label: 'VOICE: HELP', responseSpeech: 'Opening command directory.' };
  }
  if (clean.includes('pause') || clean.includes('stop listening')) {
    return { intent: 'pause', label: 'VOICE: PAUSE', responseSpeech: 'Speech system suspended.' };
  }

  return { intent: 'none', label: 'VOICE: UNKNOWN' };
}
