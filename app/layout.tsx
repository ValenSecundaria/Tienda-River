import type React from "react"
import type { Metadata } from "next"
// Asegúrate de que globals.css se importe.
// Tailwind CSS está preinstalado en proyectos v0; si no lo usas, puedes limpiar globals.css de directivas @tailwind.
import "./globals.css"

export const metadata: Metadata = {
  title: "StyleHub",
  description: "Tu tienda de ropa favorita, inspirada en Apple.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        {/* Bootstrap Icons */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="d-flex flex-column min-vh-100">
        {children}
        {/* Bootstrap JS Bundle (opcional para este componente específico ya que el toggle se maneja con React state) */}
        {/* Si usas otros componentes de Bootstrap que requieran JS (como Dropdowns, Modals), descomenta la siguiente línea: */}
        {/*
        <script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
          crossOrigin="anonymous" 
          defer
        ></script>
        */}
      </body>
    </html>
  )
}
