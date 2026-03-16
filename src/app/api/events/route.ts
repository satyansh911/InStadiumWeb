import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const events = await sql`
      SELECT e.*, 
        COALESCE(
          json_agg(
            json_build_object(
              'id', ei.id,
              'url', ei.url,
              'alt', ei.alt,
              'is_primary', ei.is_primary,
              'display_order', ei.display_order
            ) ORDER BY ei.display_order
          ) FILTER (WHERE ei.id IS NOT NULL),
          '[]'::json
        ) AS event_images
      FROM events e
      LEFT JOIN event_images ei ON ei.event_id = e.id
      GROUP BY e.id
      ORDER BY e.created_at DESC
    `;
    return NextResponse.json(events);
  } catch (error) {
    console.error('GET /api/events error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, description, date, location, category, status, featured, client_name, testimonial } = body;

    const [event] = await sql`
      INSERT INTO events (title, slug, description, date, location, category, status, featured, client_name, testimonial)
      VALUES (${title}, ${slug}, ${description}, ${date}, ${location}, ${category}, ${status ?? 'draft'}, ${featured ?? false}, ${client_name}, ${testimonial})
      RETURNING *
    `;
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('POST /api/events error:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
