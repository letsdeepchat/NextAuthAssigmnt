export const metadata = {
  title: 'NextAuthAssignment',
  description: 'Login auth with idle handling and image list search',
};

import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--text)] min-h-screen overflow-hidden">
        <div className="container h-screen flex flex-col">
          <main className="flex-1 overflow-hidden flex flex-col">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
