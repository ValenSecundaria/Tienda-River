import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protección por API key para rutas específicas
  if (pathname.startsWith('/api/export')) {
    const apiKey = request.headers.get('x-api-key')
    const validKey = process.env.NEXT_PUBLIC_API_KEY

    if (apiKey !== validKey) {
      const lang = request.headers.get('accept-language') || 'en'
      const isSpanish = lang.toLowerCase().startsWith('es')

      const errorMessage = isSpanish
        ? { error: 'No autorizado' }
        : { error: 'Unauthorized' }

      return new NextResponse(JSON.stringify(errorMessage), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  // Si pasa todas las condiciones, continuar
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/export/:path*'],
}
