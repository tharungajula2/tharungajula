import fs from 'fs';
import path from 'path';

// ── Interfaces ──────────────────────────────────────────────────────────────

export interface ChironTarget {
  company: string;
  role: string;
  founder: string;
  projectFolder: string;
  status: string;
  dateSent: string;
  followUpDue: string;
}

export interface ChironMetrics {
  totalVolume: number;
  activeCount: number;
  ghostCount: number;
  followUpsDueCount: number;
  streakDays: number;
}

export interface ChironData {
  targets: ChironTarget[];
  metrics: ChironMetrics;
  qualitativeNotes: string[];
}

// ── Constants ───────────────────────────────────────────────────────────────

const REJECTED_STATUS  = '🔴 Rejected';
const GHOSTED_STATUS   = '⚫ Ghosted';
const SENT_STATUS      = '🟡 Sent';

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Trim a raw table cell value. */
function cell(raw: string): string {
  return raw.trim().replace(/^`|`$/g, '').trim();
}

/**
 * Parse "YYYY-MM-DD" or common human-readable dates into a Date.
 * Returns null for "-", empty, or unparseable values.
 */
function parseDate(raw: string): Date | null {
  const s = raw.trim();
  if (!s || s === '-' || s === '*-*') return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

/** Return today at midnight (UTC) for reliable day-level comparisons. */
function today(): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/** Strip surrounding *italics* markdown markers. */
function stripItalics(s: string): string {
  return s.replace(/^\*|\*$/g, '').trim();
}

// ── Table parser ────────────────────────────────────────────────────────────

/**
 * Given the raw markdown content of founder-target-list.md, extract all
 * data rows from the "## Active Opportunities" table.
 *
 * Expected columns (0-indexed after splitting on `|`):
 * 1: Company  2: Role  3: Founder/Contact  4: Project Folder
 * 5: Status   6: Date Sent  7: Follow-Up Due
 */
function parseTargetTable(content: string): ChironTarget[] {
  const targets: ChironTarget[] = [];

  // Find the "## Active Opportunities" section
  const sectionMatch = content.match(/##\s+Active Opportunities([\s\S]*?)(?=\n##|\n---|\s*$)/);
  if (!sectionMatch) return targets;

  const section = sectionMatch[1];
  const lines = section.split('\n');

  let headerPassed = false;
  let separatorPassed = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) continue;

    // Split into cells and drop leading/trailing empty strings from `|...|`
    const parts = trimmed.split('|').slice(1, -1);
    if (parts.length < 7) continue;

    // First pipe-row = header row
    if (!headerPassed) { headerPassed = true; continue; }

    // Second pipe-row = separator row (`:---`)
    if (!separatorPassed) { separatorPassed = true; continue; }

    const company    = stripItalics(cell(parts[0]));
    const role       = stripItalics(cell(parts[1]));
    const founder    = stripItalics(cell(parts[2]));
    const project    = stripItalics(cell(parts[3]));
    const status     = stripItalics(cell(parts[4]));
    const dateSent   = stripItalics(cell(parts[5]));
    const followUpDue = stripItalics(cell(parts[6]));

    // Skip the placeholder example row
    if (company.toLowerCase().includes('example co') || company === '') continue;

    targets.push({ company, role, founder, projectFolder: project, status, dateSent, followUpDue });
  }

  return targets;
}

// ── Qualitative notes parser ────────────────────────────────────────────────

/**
 * Extract bullet-point lines from the "## Qualitative Notes & Intel" section.
 */
function parseQualitativeNotes(content: string): string[] {
  const notes: string[] = [];

  const sectionMatch = content.match(/##\s+Qualitative Notes & Intel([\s\S]*?)(?=\n##|\n---|\s*$)/);
  if (!sectionMatch) return notes;

  const section = sectionMatch[1];
  for (const line of section.split('\n')) {
    const trimmed = line.trim();
    // Accept lines starting with - or * (markdown bullets)
    if (/^[-*]\s+/.test(trimmed)) {
      const note = trimmed.replace(/^[-*]\s+/, '').trim();
      if (note && !note.startsWith('*(')) notes.push(note); // skip placeholder italics
    }
  }

  return notes;
}

// ── Streak calculator ───────────────────────────────────────────────────────

/**
 * Given an array of `dateSent` strings, calculate how many consecutive days
 * leading up to (and including) today each have at least one outreach entry.
 */
function calculateStreak(targets: ChironTarget[]): number {
  // Collect all unique days that have a sent date
  const sentDays = new Set<string>();
  for (const t of targets) {
    const d = parseDate(t.dateSent);
    if (d) sentDays.add(d.toISOString().slice(0, 10));
  }

  if (sentDays.size === 0) return 0;

  let streak = 0;
  const cursor = today();

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (sentDays.has(key)) {
      streak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// ── Metrics calculator ──────────────────────────────────────────────────────

function calculateMetrics(targets: ChironTarget[]): ChironMetrics {
  const now = today();

  const totalVolume = targets.length;

  const activeCount = targets.filter(
    t => t.status !== REJECTED_STATUS && t.status !== GHOSTED_STATUS
  ).length;

  const ghostCount = targets.filter(t => t.status === GHOSTED_STATUS).length;

  const followUpsDueCount = targets.filter(t => {
    if (t.status !== SENT_STATUS) return false;
    const due = parseDate(t.followUpDue);
    if (!due) return false;
    due.setUTCHours(0, 0, 0, 0);
    return due <= now;
  }).length;

  const streakDays = calculateStreak(targets);

  return { totalVolume, activeCount, ghostCount, followUpsDueCount, streakDays };
}

// ── Main exported function ──────────────────────────────────────────────────

/**
 * Read and parse the CHIRON strategy markdown files.
 * Safe to call from any Next.js Server Component or Route Handler.
 * Returns empty/zero state if files are missing or malformed.
 */
export async function getChironData(): Promise<ChironData> {
  const root = path.join(process.cwd(), 'brain', 'raw', 'strategy');

  const targetListPath  = path.join(root, 'founder-target-list.md');
  const outreachNotesPath = path.join(root, 'outreach-notes.md');

  // ── Read files safely ──────────────────────────────────────────
  let targetContent  = '';
  let outreachContent = '';

  try {
    targetContent = fs.readFileSync(targetListPath, 'utf-8');
  } catch {
    // File missing or unreadable — return zero state
  }

  try {
    outreachContent = fs.readFileSync(outreachNotesPath, 'utf-8');
  } catch {
    // File missing or unreadable — continue with empty notes
  }

  // ── Parse ──────────────────────────────────────────────────────
  const targets         = parseTargetTable(targetContent);
  const qualitativeNotes = parseQualitativeNotes(outreachContent);
  const metrics         = calculateMetrics(targets);

  return { targets, metrics, qualitativeNotes };
}
