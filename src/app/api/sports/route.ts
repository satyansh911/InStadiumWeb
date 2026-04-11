import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { prisma } = await import('@/lib/prisma');
  try {
    const sports = await prisma.sport.findMany({
      include: {
        _count: {
          select: { SportToStadium: true }
        }
      }
    });
    return NextResponse.json(sports);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch sports' }, { status: 500 });
  }
}
