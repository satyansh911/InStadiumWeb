import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { prisma } = await import('@/lib/prisma');
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'QR code required' }, { status: 400 });
  }

  try {
    const mapping = await prisma.qRMapping.findUnique({
      where: { qrCode: code },
      include: {
        Stadium: true
      }
    });

    if (!mapping) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    return NextResponse.json(mapping);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to resolve QR' }, { status: 500 });
  }
}
