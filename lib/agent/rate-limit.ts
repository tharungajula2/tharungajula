/**
 * ARCHITECTURAL LIMITATION:
 * This is best-effort per-session enforcement within a warm server/Edge isolate
 * and is not a globally distributed durable rate limiter.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
}

const LIMIT = 10;
const WINDOW_MS = 60 * 1000; // 60 seconds

// Module-scoped in-memory store for warm isolate instances
const rateLimitMap = new Map<string, RateLimitRecord>();

function cleanupStaleEntries(now: number): void {
  if (rateLimitMap.size > 100) {
    for (const [key, record] of rateLimitMap.entries()) {
      if (now >= record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }
}

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUuid(str: string): boolean {
  return UUID_V4_REGEX.test(str);
}

export function parseSessionCookie(req: Request): { sessionId: string; isNew: boolean } {
  const cookieHeader = req.headers.get('cookie');
  if (cookieHeader) {
    const match = cookieHeader.match(/(?:^|;\s*)agent_session=([^;]+)/);
    if (match && match[1]) {
      try {
        const raw = match[1].trim();
        const decoded = decodeURIComponent(raw);
        if (isValidUuid(decoded)) {
          return { sessionId: decoded, isNew: false };
        }
      } catch {
        // Malformed percent-encoding in cookie; fall through to fresh session
      }
    }
  }

  return { sessionId: crypto.randomUUID(), isNew: true };
}

export function buildSessionCookieHeader(sessionId: string, isProduction: boolean): string {
  let cookie = `agent_session=${encodeURIComponent(sessionId)}; HttpOnly; SameSite=Lax; Path=/api/chat`;
  if (isProduction) {
    cookie += '; Secure';
  }
  return cookie;
}

export function checkRateLimit(sessionId: string): RateLimitResult {
  const now = Date.now();
  cleanupStaleEntries(now);

  let record = rateLimitMap.get(sessionId);

  if (!record || now >= record.resetAt) {
    record = {
      count: 1,
      resetAt: now + WINDOW_MS,
    };
    rateLimitMap.set(sessionId, record);
    return {
      allowed: true,
      limit: LIMIT,
      remaining: LIMIT - 1,
      resetAt: record.resetAt,
      retryAfterSeconds: 0,
    };
  }

  if (record.count < LIMIT) {
    record.count += 1;
    return {
      allowed: true,
      limit: LIMIT,
      remaining: LIMIT - record.count,
      resetAt: record.resetAt,
      retryAfterSeconds: 0,
    };
  }

  const retryAfterMs = Math.max(0, record.resetAt - now);
  const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);

  return {
    allowed: false,
    limit: LIMIT,
    remaining: 0,
    resetAt: record.resetAt,
    retryAfterSeconds,
  };
}
