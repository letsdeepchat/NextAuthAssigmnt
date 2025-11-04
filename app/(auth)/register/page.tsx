"use client";
import React, { useState } from 'react';
import { Button, TextInput, Alert } from '@/components/ui';
import Link from 'next/link';

function getUsers(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('na_users');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsers(u: Record<string, string>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('na_users', JSON.stringify(u));
}

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!fullName.trim()) { setError('Please enter your full name'); return; }
    if (!username || !password || !confirmPassword) { setError('Please fill all fields'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    const users = getUsers();
    if (users[username]) { setError('User already exists'); return; }
    users[username] = password; // DEMO ONLY: never store plain passwords in real apps
    saveUsers(users);
    setSuccess('Registered successfully. You can login now.');
    setFullName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>Register</h1>
      {error && <Alert type="error">{error}</Alert>}
      {success && <Alert>{success}</Alert>}
      <form onSubmit={onSubmit} className="col" style={{ gap: 12 }}>
        <TextInput label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
        <TextInput label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <Button type="submit">Create account</Button>
      </form>
      <div className="card">
        Already have an account? <Link className="link" href="/login">Login</Link>
      </div>
    </div>
  );
}
