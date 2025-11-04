"use client";
import { useEffect, useRef, useState } from 'react';
import { isTokenExpired, loadSession, clearSession } from './auth';

export function useIdle(timeoutMs = Number(process.env.IDLE_TIMEOUT_MS || 120000), onIdle?: () => void) {
  const timer = useRef<number | null>(null);
  const [idle, setIdle] = useState(false);

  function reset() {
    setIdle(false);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setIdle(true);
      onIdle?.();
    }, timeoutMs);
  }

  useEffect(() => {
    reset();
    const events = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll', 'visibilitychange'];
    const handler = () => reset();
    events.forEach((e) => window.addEventListener(e, handler));
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      events.forEach((e) => window.removeEventListener(e, handler));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeoutMs]);

  return idle;
}

export function useAuthGuard(redirect: (path: string) => void, setLogoutMessage: (msg: string) => void) {
  useEffect(() => {
    (async () => {
      const { token } = loadSession();
      if (!token || (await isTokenExpired(token))) {
        clearSession();
        setLogoutMessage("You've been logged out");
        redirect('/login');
        return;
      }
    })();
  }, [redirect, setLogoutMessage]);
}

export function useIdleLogout(redirect: (path: string) => void, setLogoutMessage: (msg: string) => void) {
  useEffect(() => {
    const check = async () => {
      const { token } = loadSession();
      if (!token || (await isTokenExpired(token))) {
        clearSession();
        setLogoutMessage("You've been logged out");
        redirect('/login');
      }
    };

    const interval = window.setInterval(() => { void check(); }, 5_000);
    return () => window.clearInterval(interval);
  }, [redirect, setLogoutMessage]);
}
