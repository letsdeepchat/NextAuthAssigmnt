"use client";
import React, { useCallback, useState } from 'react';
import { clearSession, loadSession } from '@/lib/auth';
import { useAuthGuard, useIdle, useIdleLogout } from '@/lib/idle';
import { Alert, Button } from './ui';
import { useRouter } from 'next/navigation';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [logoutMsg, setLogoutMsg] = useState('');

  const redirect = useCallback((path: string) => router.replace(path), [router]);

  useAuthGuard(redirect, setLogoutMsg);
  useIdleLogout(redirect, setLogoutMsg);

  const idle = useIdle(2 * 60 * 1000, () => {
    // When idle fires, we rely on periodic expiry checks to perform logout.
    // Could also force immediate logout here for stricter behavior.
  });

  const onLogout = () => {
    clearSession();
    setLogoutMsg("You've been logged out");
    router.replace('/login');
  };

  const { user } = loadSession();

  return (
    <div className="flex flex-col gap-4 h-full">
      {logoutMsg && <Alert type="error">{logoutMsg}</Alert>}
      <div className="flex items-center justify-between">
        <div className="text-lg">Welcome{user?.username ? `, ${user.username}` : ''}</div>
        <div className="flex items-center gap-2">
          <span className={idle ? 'text-amber-300' : 'text-green-300'}>{idle ? 'Idle' : 'Active'}</span>
          <Button onClick={onLogout}>Logout</Button>
        </div>
      </div>
      <div className="card flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
