import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const press = await sql`
      SELECT 
        pf.*,
        COALESCE(
          (SELECT json_agg(pi ORDER BY pi.display_order)
           FROM press_images pi
           WHERE pi.press_id = pf.id),
          '[]'
        ) as images
      FROM press_features pf
      ORDER BY pf.published_date DESC
    `;
    return NextResponse.json(press);
  } catch (error) {
    console.error('GET /api/press error:', error);
    return NextResponse.json({ error: 'Failed to fetch press features' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { publication, headline, url, logo_url, published_date, featured } = body;

    const [feature] = await sql`
      INSERT INTO press_features (publication, headline, url, logo_url, published_date, featured)
      VALUES (${publication}, ${headline}, ${url}, ${logo_url}, ${published_date}, ${featured ?? false})
      RETURNING *
    `;
    return NextResponse.json(feature, { status: 201 });
  } catch (error) {
    console.error('POST /api/press error:', error);
    return NextResponse.json({ error: 'Failed to create press feature' }, { status: 500 });
  }
}
