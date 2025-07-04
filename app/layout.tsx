// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

export const metadata: Metadata = {
  title: "Tienda-River",
  description: "La tienda no-oficial de River Plate",
};

export default function RootLayout({
  children,
}: {
  children: Reagitct.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1" style={{ paddingTop: "56px" }}>
          {children}
        </main>
        <Footer />
  
      </body>
    </html>
  );
}
