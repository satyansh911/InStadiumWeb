import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
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
