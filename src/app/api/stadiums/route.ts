import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { prisma } = await import('@/lib/prisma');
  try {
    const stadiums = await prisma.stadium.findMany({
      include: {
        sportsPlayed: true,
      },
      orderBy: {
        capacity: 'desc',
      },
    });
    return NextResponse.json(stadiums);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stadiums' }, { status: 500 });
  }
}
