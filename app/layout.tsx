// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Tienda-River",
  description: "La tienda no-oficial de River Plate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
        <Header />
        <main className="flex-grow-1">{children}</main>
        <Footer />

        {/* 
          Si en el futuro usás componentes de Bootstrap que requieran JS (Dropdowns, Modals, etc.),
          podés descomentar esta línea para incluir el bundle:
        */}
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
  );
}
