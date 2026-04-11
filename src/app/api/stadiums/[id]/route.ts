import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { prisma } = await import('@/lib/prisma');
  try {
    const { id } = await params;
    const stadium = await prisma.stadium.findUnique({
      where: { id },
      include: {
        SportToStadium: {
          include: {
            Sport: true
          }
        },
        PlayerToStadium: {
          include: {
            Player: true
          }
        },
      },
    });

    if (!stadium) {
      return NextResponse.json({ error: 'Stadium not found' }, { status: 404 });
    }

    return NextResponse.json(stadium);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stadium' }, { status: 500 });
  }
}
