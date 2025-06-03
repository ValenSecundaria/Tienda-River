"use client"

import { useState } from "react"
import Link from "next/link"
import styles from "./components/header.module.css" // Importamos los CSS Modules

import Header from "./components/header";
import Footer from "./components/footer";

import Tiendas from "./api/servicios/tiendas/tiendas"
import CambiosYDevoluciones from "./api/servicios/cambios-y-devoluciones/cambios-y-devoluciones"
import CuidadoDeLosProductos from "./api/servicios/cuidado-de-los-productos/cuidado-de-los-productos"
import GuiaDeTalles from "./api/servicios/guia-de-talles/guia-de-talles"
import PoliticaDePrivacidad from "./api/servicios/politica-de-privacidad/politica-de-privacidad"

const navItems = [
  { label: "Hombre", href: "/hombre" },
  { label: "Mujer", href: "/mujer" },
  { label: "Niños", href: "/ninos" },
  { label: "Accesorios", href: "/accesorios" },
  { label: "Ofertas", href: "/ofertas" },
  { label: "Novedades", href: "/novedades" },
]

export default function Page() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)

  return (
    <>
      <Header/>
        <div>
          <Tiendas />
          <CambiosYDevoluciones />
          <CuidadoDeLosProductos />
          <GuiaDeTalles />
          <PoliticaDePrivacidad />
        </div>
      <Footer/>
    </>
  )
}
