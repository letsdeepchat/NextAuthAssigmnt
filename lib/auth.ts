import { SignJWT, jwtVerify } from 'jose';

// WARNING: For assignment only. Secret is read from .env for this assignment.
const SECRET = process.env.JWT_SECRET || 'STATIC_DEMO_SECRET_CHANGE_ME';
const secretKey = new TextEncoder().encode(SECRET);

export type User = { username: string };
export type AuthTokenPayload = { sub: string; iat: number; exp: number };
export type AuthState = { token: string | null; user: User | null };

const TOKEN_KEY = 'na_token';
const USER_KEY = 'na_user';

export async function createToken(username: string, ttlSeconds = Number(process.env.TOKEN_TTL_SECONDS || 300)) {
  const now = Math.floor(Date.now() / 1000);
  const token = await new SignJWT({ sub: username })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime(now + ttlSeconds)
    .sign(secretKey);
  return token;
}

export async function verifyToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    const sub = typeof payload.sub === 'string' ? payload.sub : '';
    const iat = typeof payload.iat === 'number' ? payload.iat : 0;
    const exp = typeof payload.exp === 'number' ? payload.exp : 0;
    return { sub, iat, exp };
  } catch (e) {
    return null;
  }
}

export async function isTokenExpired(token: string | null): Promise<boolean> {
  if (!token) return true;
  const decoded = await verifyToken(token);
  if (!decoded) return true;
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp <= now;
}

export function saveSession(token: string, user: User) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function loadSession(): AuthState {
  if (typeof window === 'undefined') return { token: null, user: null };
  const token = localStorage.getItem(TOKEN_KEY);
  const userJson = localStorage.getItem(USER_KEY);
  let user: User | null = null;
  try { user = userJson ? JSON.parse(userJson) : null; } catch {}
  return { token, user };
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
