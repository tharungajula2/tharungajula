export interface JarvizCommand {
  intent: 'nav_work' | 'nav_story' | 'nav_connect' | 'nav_home' | 'show_help' | 'pause' | 'greet' | 'thumbs_up' | 'none';
  label: string;
  responseSpeech?: string;
}

export const GESTURE_MAP: Record<string, JarvizCommand> = {
  'Open_Palm': { intent: 'greet', label: 'GESTURE: OPEN PALM → WAKE / GREET', responseSpeech: 'Systems fully operational. Welcome.' },
  'Closed_Fist': { intent: 'pause', label: 'GESTURE: FIST → PAUSE VISION', responseSpeech: 'Suspending vision engine tracking.' },
  'Pointing_Up': { intent: 'nav_connect', label: 'GESTURE: POINT UP → CONNECT', responseSpeech: 'Initiating communication terminal.' },
  'Thumb_Up': { intent: 'thumbs_up', label: 'GESTURE: THUMB UP → HIGHLIGHT METRICS', responseSpeech: 'Optimal portfolio modules highlighted.' },
  'Victory': { intent: 'show_help', label: 'GESTURE: TWO HANDS → COMMAND MAP', responseSpeech: 'Displaying navigation matrix.' },
  'swipe_right': { intent: 'nav_work', label: 'GESTURE: SWIPE RIGHT → WORK', responseSpeech: 'Loading product neural network.' },
  'swipe_left': { intent: 'nav_story', label: 'GESTURE: SWIPE LEFT → STORY', responseSpeech: 'Accessing developmental evolution timeline.' },
};

export function parseVoiceCommand(transcript: string): JarvizCommand {
  const clean = transcript.toLowerCase().trim();

  if (clean.includes('show work') || clean.includes('open work') || clean.includes('projects') || clean.includes('show ai projects') || clean.includes('work')) {
    return { intent: 'nav_work', label: 'VOICE: "show work" → WORK', responseSpeech: 'Navigating to my product lab.' };
  }
  if (clean.includes('open story') || clean.includes('story') || clean.includes('your journey') || clean.includes('evolution')) {
    return { intent: 'nav_story', label: 'VOICE: "show story" → STORY', responseSpeech: 'Opening my professional evolution timeline.' };
  }
  if (clean.includes('connect') || clean.includes('contact') || clean.includes('get in touch')) {
    return { intent: 'nav_connect', label: 'VOICE: "connect" → CONNECT', responseSpeech: 'Redirecting to contact links.' };
  }
  if (clean.includes('go home') || clean.includes('home') || clean.includes('thesis')) {
    return { intent: 'nav_home', label: 'VOICE: "go home" → THESIS', responseSpeech: 'Returning to core thesis.' };
  }
  if (clean.includes('what can you do') || clean.includes('help') || clean.includes('commands') || clean.includes('cheat sheet')) {
    return { intent: 'show_help', label: 'VOICE: "commands" → HELP', responseSpeech: 'Opening command directory.' };
  }
  if (clean.includes('pause') || clean.includes('stop listening')) {
    return { intent: 'pause', label: 'VOICE: "pause" → PAUSE VOICE', responseSpeech: 'Speech system suspended.' };
  }

  return { intent: 'none', label: 'VOICE: UNKNOWN' };
}

export function isOpenEndedQuery(input: string): boolean {
  const clean = input.toLowerCase().trim();
  if (!clean) return false;

  // If matches deterministic command, it is NOT open-ended
  const matched = parseVoiceCommand(clean);
  if (matched.intent !== 'none') return false;

  // Return false for single words or very short noise (unless it's a question like "why?")
  const words = clean.split(/\s+/);
  if (words.length <= 1 && !clean.includes('?')) return false;

  // Check question words or prefixes
  const questionWords = ['what', 'why', 'how', 'when', 'where', 'who', 'which'];
  const startsWithKeywords = ['explain', 'tell', 'describe', 'summarize', 'compare', 'recommend', 'who is', 'tell me'];

  const hasQuestionWord = questionWords.some(q => clean.includes(q));
  const hasQuestionMark = clean.includes('?');
  const startsWithKeyword = startsWithKeywords.some(prefix => clean.startsWith(prefix));
  
  // If more than 4 words and doesn't match a command, treat it as open-ended query
  const isLongSentence = words.length > 4;

  return hasQuestionWord || hasQuestionMark || startsWithKeyword || isLongSentence;
}
