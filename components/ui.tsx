"use client";
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };
export function TextInput({ label, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="label">{label}</span>}
      <input className="input" {...props} />
    </label>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' };
export function Button({ variant = 'primary', ...props }: ButtonProps) {
  const cls = variant === 'secondary' ? 'button secondary' : variant === 'danger' ? 'button danger' : 'button';
  return <button className={cls} {...props} />;
}

export function Alert({ type = 'info', children }: { type?: 'info' | 'error', children: React.ReactNode }) {
  const cls = type === 'error' ? 'alert error' : 'alert';
  return <div className={cls}>{children}</div>;
}
