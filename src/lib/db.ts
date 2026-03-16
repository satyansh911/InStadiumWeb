import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV === 'production' && typeof window === 'undefined' && !process.env.NEXT_PHASE) {
  // Only throw if we're sure we're in a runtime environment where it's required
  // and it's not the build phase. Actually, Next.js build phase is usually 
  // detected by NEXT_PHASE or similar.
}

export const sql = neon(databaseUrl || '');
