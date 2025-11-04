import { createToken, verifyToken, isTokenExpired, saveSession, loadSession, clearSession } from '@/lib/auth';

// Mock localStorage for Node environment
class LocalStorageMock {
  store: Record<string, string> = {};
  clear() { this.store = {}; }
  getItem(k: string) { return this.store[k] || null; }
  setItem(k: string, v: string) { this.store[k] = String(v); }
  removeItem(k: string) { delete this.store[k]; }
}

Object.defineProperty(global, 'localStorage', { value: new LocalStorageMock() });

describe('auth', () => {
  test('createToken and verifyToken', async () => {
    const token = await createToken('alice', 2);
    const payload = await verifyToken(token);
    expect(payload?.sub).toBe('alice');
    expect(payload && payload.exp > payload.iat).toBeTruthy();
  });

  test('isTokenExpired false initially then true after wait', async () => {
    const token = await createToken('bob', 1);
    expect(await isTokenExpired(token)).toBe(false);
    await new Promise(r => setTimeout(r, 1100));
    expect(await isTokenExpired(token)).toBe(true);
  });

  test('session save/load/clear', async () => {
    clearSession();
    const token = await createToken('carol', 60);
    saveSession(token, { username: 'carol' });
    const loaded = loadSession();
    expect(loaded.token).toBe(token);
    expect(loaded.user?.username).toBe('carol');
    clearSession();
    const cleared = loadSession();
    expect(cleared.token).toBeNull();
    expect(cleared.user).toBeNull();
  });
});
