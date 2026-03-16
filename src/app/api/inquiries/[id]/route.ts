import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const [inquiry] = await sql`
      UPDATE inquiries SET
        status = ${status},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    if (!inquiry) return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('PUT /api/inquiries/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update inquiry status' }, { status: 500 });
  }
}
