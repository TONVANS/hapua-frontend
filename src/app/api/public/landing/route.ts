import { NextResponse } from 'next/server';

export const revalidate = 300;

export async function GET() {
  const backendUrl =
    process.env.INTERNAL_BACKEND_URL && process.env.INTERNAL_BACKEND_URL.startsWith('http')
      ? process.env.INTERNAL_BACKEND_URL
      : 'http://localhost:3001/api/v1';

  try {
    const res = await fetch(`${backendUrl}/public/landing`, {
      next: { revalidate: 300 },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: `Backend returned status ${res.status}: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('BFF Route Handler /api/public/landing error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch landing data from internal backend', error: error?.message },
      { status: 502 }
    );
  }
}
