import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from '@/app/(auth)/register/page';

// jsdom localStorage is available

describe('RegisterPage validation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('requires full name, username, password, confirm', () => {
    render(<RegisterPage />);
    fireEvent.click(screen.getByText(/create account/i));
    expect(screen.getByText(/full name/i)).toBeInTheDocument();
  });

  it('rejects password shorter than 8', () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/^username$/i), { target: { value: 'john' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'short' } });
    fireEvent.click(screen.getByText(/create account/i));
    expect(screen.getByText(/password must be at least 8/i)).toBeInTheDocument();
  });

  it('rejects when passwords do not match', () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/^username$/i), { target: { value: 'jane' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'longenough' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'different' } });
    fireEvent.click(screen.getByText(/create account/i));
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('registers successfully and prompts to login', () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/^username$/i), { target: { value: 'john' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password8' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password8' } });
    fireEvent.click(screen.getByText(/create account/i));
    expect(screen.getByText(/registered successfully/i)).toBeInTheDocument();
  });
});
