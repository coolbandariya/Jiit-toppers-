import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const configured = Boolean(process.env.DATABASE_URL);

  if (!configured) {
    return NextResponse.json(
      { status: 'degraded', services: { database: 'not_configured' } },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json(
      { status: 'ok', services: { database: 'connected' } },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return NextResponse.json(
      { status: 'degraded', services: { database: 'unavailable' } },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
