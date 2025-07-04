import { auth } from './auth.config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protección por API key
  if (pathname.startsWith('/api/export')) {
    const apiKey = request.headers.get('x-api-key');
    const validKey = process.env.EXPORT_API_KEY;

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

  // Protección de /dashboard con sesión
  if (pathname.startsWith('/dashboard')) {
    const session = await auth(); // acá validás sesión

    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/export/:path*', '/dashboard/:path*'],
};
