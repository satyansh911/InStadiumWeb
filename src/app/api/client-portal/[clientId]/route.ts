import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(_req: Request, { params }: { params: Promise<{ clientId: string }> }) {
  try {
    const { clientId } = await params;
    const [portal] = await sql`
      SELECT cp.*, 
        json_build_object(
          'id', e.id,
          'title', e.title,
          'date', e.date,
          'location', e.location,
          'status', e.status
        ) AS event
      FROM client_portal cp
      LEFT JOIN events e ON e.id = cp.event_id
      WHERE cp.client_id = ${clientId}
    `;
    if (!portal) return NextResponse.json({ error: 'Client portal not found' }, { status: 404 });
    return NextResponse.json(portal);
  } catch (error) {
    console.error('GET /api/client-portal/[clientId] error:', error);
    return NextResponse.json({ error: 'Failed to fetch client portal' }, { status: 500 });
  }
}
