/**
 * Luxury Events Platform - API Client
 * All data fetching goes through Next.js API routes backed by Neon PostgreSQL.
 */

const BASE = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      ...options,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { data: null, error: body.error ?? `HTTP ${res.status}` };
    }
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// ─────────────────────────── STADIUMS ────────────────────────────

export const getStadiums = () =>
  apiFetch<Record<string, unknown>[]>('/api/stadiums');

export const getStadiumById = (id: string) =>
  apiFetch<Record<string, unknown>>(`/api/stadiums/${id}`);

// ─────────────────────────── SPORTS ─────────────────────────────

export const getSports = () =>
  apiFetch<Record<string, unknown>[]>('/api/sports');

// ─────────────────────────── PLAYERS ────────────────────────────

export const getPlayers = (stadiumId?: string) =>
  apiFetch<Record<string, unknown>[]>(stadiumId ? `/api/players?stadiumId=${stadiumId}` : '/api/players');

// ─────────────────────────── MATCHES ────────────────────────────

export const getMatches = (type: 'live' | 'upcoming') =>
  apiFetch<Record<string, unknown>[]>(`/api/matches/${type}`);

// ─────────────────────────── PRESS ──────────────────────────────

export const getPressFeatures = () =>
  apiFetch<Record<string, unknown>[]>('/api/press');

// ─────────────────────────── PORTFOLIO ──────────────────────────

export const getPortfolio = () =>
  apiFetch<Record<string, unknown>[]>('/api/portfolio');

export const getPortfolioById = (id: string) =>
  apiFetch<Record<string, unknown>>(`/api/portfolio/${id}`);

// ─────────────────────────── QR ────────────────────────────────

export const resolveQR = (qrCode: string) =>
  apiFetch<Record<string, unknown>>(`/api/qr/resolve?code=${qrCode}`);

