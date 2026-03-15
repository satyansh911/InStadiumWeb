import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
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
