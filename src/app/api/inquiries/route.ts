import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const inquiries = await sql`
      SELECT * FROM inquiries
      ORDER BY created_at DESC
    `;
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('GET /api/inquiries error:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, event_type, event_date, guest_count, budget_range, message, location } = body;

    const [inquiry] = await sql`
      INSERT INTO inquiries (name, email, phone, event_type, event_date, guest_count, budget_range, message, status, location)
      VALUES (${name}, ${email}, ${phone}, ${event_type}, ${event_date}, ${guest_count}, ${budget_range}, ${message}, 'new', ${location})
      RETURNING *
    `;
    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error('POST /api/inquiries error:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
