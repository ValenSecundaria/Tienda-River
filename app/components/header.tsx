"use client"

import { useState } from "react"
import Link from "next/link"
import styles from "./header.module.css" // Importamos los CSS Modules

const navItems = [
  { label: "Hombre", href: "/hombre" },
  { label: "Mujer", href: "/mujer" },
  { label: "Niños", href: "/ninos" },
  { label: "Accesorios", href: "/accesorios" },
  { label: "Ofertas", href: "/ofertas" },
  { label: "Novedades", href: "/novedades" },
]

export default function Header() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)

  return (
    <header>
      <nav className={`${styles.customNavbar} navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top`}>
        <div className="container-fluid px-3 px-lg-4">
          <Link href="/" className="navbar-brand">
            StyleHub
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavCollapse}
            aria-controls="navbarNavContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`} id="navbarNavContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li className="nav-item" key={item.label}>
                  <Link href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className={`navbar-nav flex-row align-items-center ms-lg-auto ${styles.iconsNav}`}>
              <li className="nav-item">
                <Link href="/search" className="nav-link" aria-label="Buscar">
                  <i className="bi bi-search"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/cart" className="nav-link" aria-label="Carrito de compras">
                  <i className="bi bi-cart"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
