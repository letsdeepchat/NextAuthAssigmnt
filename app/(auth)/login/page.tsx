"use client";
import React, { useEffect, useState } from 'react';
import { Button, TextInput, Alert } from '@/components/ui';
import Link from 'next/link';
import { createToken, saveSession } from '@/lib/auth';
import { useRouter, useSearchParams } from 'next/navigation';

function getUsers(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('na_users');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    const msg = params.get('m');
    if (msg) setInfo(msg);
  }, [params]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setInfo('');
    if (!username || !password) { setError('Please enter username and password'); return; }
    const users = getUsers();
    const exists = users[username];
    if (!exists) { setError('User does not exist. Please register.'); return; }
    if (exists !== password) { setError('Invalid credentials'); return; }
    // OK
    const token = await createToken(username, 60 * 5); // 5 min token
    saveSession(token, { username });
    router.replace('/');
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>Login</h1>
      {error && <Alert type="error">{error}</Alert>}
      {info && <Alert>{info}</Alert>}
      <form onSubmit={onSubmit} className="col" style={{ gap: 12 }}>
        <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
      <div className="card">
        New here? <Link className="link" href="/register">Register</Link>
      </div>
    </div>
  );
}
