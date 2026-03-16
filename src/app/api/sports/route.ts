import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sports = await prisma.sport.findMany({
      include: {
        _count: {
          select: { stadiums: true }
        }
      }
    });
    return NextResponse.json(sports);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch sports' }, { status: 500 });
  }
}
