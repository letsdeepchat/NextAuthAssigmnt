import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';

// Minimal mocks for ProtectedLayout dependencies
jest.mock('next/navigation', () => ({ useRouter: () => ({ replace: jest.fn() }) }));
jest.mock('@/lib/auth', () => ({ loadSession: () => ({ token: 't', user: { username: 'x' } }), isTokenExpired: async () => false, clearSession: () => {} }));
jest.mock('@/lib/idle', () => ({ useAuthGuard: () => {}, useIdleLogout: () => {}, useIdle: () => false }));

const mockPhotos = Array.from({ length: 60 }, (_, i) => ({ id: i + 1, title: `photo ${i + 1}`, url: '#', thumbnailUrl: '#' }));

describe('HomePage', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => mockPhotos });
  });

  it('loads and filters by search', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText(/photo 1/i)).toBeInTheDocument());
    const search = screen.getByPlaceholderText(/search by title/i);
    fireEvent.change(search, { target: { value: 'photo 5' } });
    await waitFor(() => expect(screen.getByText(/photo 5/i)).toBeInTheDocument());
  });

  it('supports pagination controls', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText(/results/i)).toBeInTheDocument());
    const next = screen.getByText(/next/i);
    fireEvent.click(next);
    expect(screen.getByText(/page 2/i)).toBeInTheDocument();
  });
});
