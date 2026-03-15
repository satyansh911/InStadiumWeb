import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [event] = await sql`
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
      WHERE e.id = ${id}
      GROUP BY e.id
    `;
    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    return NextResponse.json(event);
  } catch (error) {
    console.error('GET /api/events/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, description, date, location, category, status, featured, client_name, testimonial } = body;

    const [event] = await sql`
      UPDATE events SET
        title = COALESCE(${title}, title),
        slug = COALESCE(${slug}, slug),
        description = COALESCE(${description}, description),
        date = COALESCE(${date}, date),
        location = COALESCE(${location}, location),
        category = COALESCE(${category}, category),
        status = COALESCE(${status}, status),
        featured = COALESCE(${featured}, featured),
        client_name = COALESCE(${client_name}, client_name),
        testimonial = COALESCE(${testimonial}, testimonial),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    return NextResponse.json(event);
  } catch (error) {
    console.error('PUT /api/events/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await sql`DELETE FROM events WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/events/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
