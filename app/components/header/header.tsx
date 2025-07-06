"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import styles from "./header.module.css"
import Carrito from "../mercadoPago/FormMercadoPago/Carrito"

// Tipos
type Subcategoria = { id: number; nombre: string; descripcion?: string }
type Categoria = { id: number; nombre: string; subcategorias: Subcategoria[] }
type NavItem = { label: string; href: string; categorias: Categoria[] }

const slugify = (text: string) =>
  (text ?? "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")

export default function Header() {
  const [navItems, setNavItems] = useState<NavItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isHoveringMenu, setIsHoveringMenu] = useState(false)
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)
  const [showCartPopup, setShowCartPopup] = useState(false)
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [productos, setProductos] = useState<any[]>([])

  useEffect(() => {
    const loadProductos = async () => {
      try {
        const res = await fetch("/api/carrito/cookies")
        if (!res.ok) throw new Error("Error al cargar carrito")
        const data = await res.json()
        setProductos(data)
      } catch (error) {
        console.error("Error cargando productos:", error)
      }
    }

    loadProductos()
    const handleCarritoUpdate = () => {
      loadProductos()
    }

    window.addEventListener("carrito-update", handleCarritoUpdate)
    return () => {
      window.removeEventListener("carrito-update", handleCarritoUpdate)
    }
  }, [])

  const handleMenuMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setIsHoveringMenu(true)
  }

  const handleMenuMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsHoveringMenu(false)
    }, 150)
    setHoverTimeout(timeout)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  useEffect(() => {
    async function loadNav() {
      try {
        const res = await fetch("/api/categorias")
        const items: NavItem[] = await res.json()
        setNavItems(items)
      } catch (e) {
        console.error("Error al cargar categorías:", e)
      } finally {
        setLoading(false)
      }
    }
    loadNav()
  }, [])

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)
  const toggleSearch = () => setSearchOpen(!searchOpen)
  const handleMobileNavigation = (href: string) => setIsNavCollapsed(true)
  const toggleCategory = (categoryLabel: string) =>
    setExpandedCategory(expandedCategory === categoryLabel ? null : categoryLabel)

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Cargando menú...</p>
      </div>
    )

  return (
    <header>
      <div
        className={`${styles.backgroundOverlay} ${
          (isHoveringMenu || isHeaderHovered) && !showCartPopup ? styles.showBackgroundBlur : ""
        }`}
      />
      <nav
        className={`${styles.customNavbar} navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top`}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        <div className="container-fluid px-3 px-lg-4">
          <button
            className={`navbar-toggler ${styles.modernToggler} d-lg-none`}
            type="button"
            onClick={handleNavCollapse}
            aria-controls="navbarNavContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className={styles.togglerIcon}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <Link href="/" className={`navbar-brand ${styles.brandContainer}`}>
            <div className={styles.logoContainer}>
              <div className={styles.riverShield}>
                <img src="/images/river-logo.png" alt="Escudo River Plate" className={styles.shieldImage} />
              </div>
              <span className={styles.brandText}>Tienda River</span>
            </div>
          </Link>

          <div className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`} id="navbarNavContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-none d-lg-flex">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={`nav-item ${styles.megaItem}`}
                  onMouseEnter={handleMenuMouseEnter}
                  onMouseLeave={handleMenuMouseLeave}
                >
                  <Link href={item.href} className={`nav-link ${styles.modernNavLink}`}>
                    {item.label}
                  </Link>
                  <div
                    className={styles.megaMenu}
                    onMouseEnter={handleMenuMouseEnter}
                    onMouseLeave={handleMenuMouseLeave}
                  >
                    <div className="container-fluid">
                      <div className="row justify-content-center">
                        <div className="col-12">
                          <div className={styles.megaMenuContent}>
                            <h6 className={styles.megaMenuTitle}>{item.label}</h6>
                            <div className={styles.subcategoriesHorizontal}>
                              {item.categorias.flatMap((cat) =>
                                cat.subcategorias.map((sub) => (
                                  <Link
                                    key={sub.id}
                                    href={`/${slugify(item.label)}/${slugify(sub.nombre)}`}
                                    className={styles.subcategoryHorizontalItem}
                                  >
                                    {sub.nombre}
                                  </Link>
                                )),
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {!isNavCollapsed && (
              <div className={`d-lg-none ${styles.mobileMenu}`}>
                <div className={styles.mobileMenuContent}>
                  {navItems.map((item) => (
                    <div key={item.label} className={styles.mobileCategory}>
                      <div className={styles.mobileCategoryHeader}>
                        <Link
                          href={item.href}
                          className={styles.mobileCategoryLink}
                          onClick={() => handleMobileNavigation(item.href)}
                        >
                          {item.label}
                        </Link>
                        <button
                          className={styles.categoryToggle}
                          onClick={() => toggleCategory(item.label)}
                          aria-label={`Toggle ${item.label} subcategories`}
                        >
                          <i className={`bi bi-chevron-${expandedCategory === item.label ? "up" : "down"}`} />
                        </button>
                      </div>
                      {expandedCategory === item.label && (
                        <div className={styles.mobileSubcategories}>
                          {item.categorias.flatMap((cat) =>
                            cat.subcategorias.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/${slugify(item.label)}/${slugify(sub.nombre)}`}
                                className={styles.mobileSubcategoryLink}
                                onClick={() => handleMobileNavigation(`/${slugify(item.label)}/${slugify(sub.nombre)}`)}
                              >
                                {sub.nombre}
                              </Link>
                            )),
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={`d-flex align-items-center gap-3 ms-auto ${styles.iconContainer}`}>
            <button className={`btn p-0 ${styles.iconButton}`} onClick={toggleSearch} aria-label="Buscar">
              <i className="bi bi-search" />
            </button>
            <Link href="/login" className={styles.loginIcon} aria-label="Login">
              <i className="bi bi-person" />
            </Link>
            <button
              className={`btn p-0 ${styles.iconButton} ${styles.cartButton}`}
              onClick={() => setShowCartPopup(true)}
              aria-label="Carrito"
            >
              <i className="bi bi-cart" />
              <span className={styles.cartBadge}>{productos.length}</span>
            </button>
          </div>
        </div>
      </nav>

      {searchOpen && (
        <div className={styles.searchBar}>
          <div className="container-fluid px-3 px-lg-4">
            <div className="d-flex align-items-center">
              <input type="text" className={styles.searchInput} placeholder="Buscar productos de River..." autoFocus />
              <button className={styles.searchCloseBtn} onClick={toggleSearch}>
                <i className="bi bi-x-lg" />
              </button>
            </div>
          </div>
        </div>
      )}

      {showCartPopup && <Carrito onClose={() => setShowCartPopup(false)} />}
    </header>
  )
}
