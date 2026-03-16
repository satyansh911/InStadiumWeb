import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { prisma } = await import('@/lib/prisma');
  const { searchParams } = new URL(request.url);
  const stadiumId = searchParams.get('stadiumId');

  try {
    const players = await prisma.player.findMany({
      where: stadiumId ? {
        stadiumsPlayed: {
          some: { id: stadiumId }
        }
      } : {},
      include: {
        sport: true
      }
    });
    return NextResponse.json(players);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}
