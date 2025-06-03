"use client"

import { useState } from "react"
import Link from "next/link"
import styles from "./components/header.module.css" // Importamos los CSS Modules

import Header from "./components/header";
import Footer from "./components/footer";

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
      <Footer/>
    </>
  )
}
