import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stadiums = await prisma.stadium.findMany({
      include: {
        SportToStadium: {
          include: {
            Sport: true
          }
        },
      },
      orderBy: {
        capacity: 'desc',
      },
    });
    
    return NextResponse.json(stadiums);
  } catch (error: any) {
    // Log detailed error for debugging
    console.error('API Error [Stadiums]:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    
    return NextResponse.json({ 
      error: 'Failed to fetch stadiums',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    }, { status: 500 });
  }
}
