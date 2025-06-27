import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  const validKey = process.env.EXPORT_API_KEY;

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api/export')) {
    if (apiKey !== validKey) {
      const lang = request.headers.get('accept-language') || 'en';
      const isSpanish = lang.toLowerCase().startsWith('es');

      const errorMessage = isSpanish
        ? { error: 'No autorizado' }
        : { error: 'Unauthorized' };

      return new NextResponse(JSON.stringify(errorMessage), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/export/:path*'],
};