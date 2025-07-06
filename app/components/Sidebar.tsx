"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./Sidebar.module.css"
import { logoutAction } from "../lib/action"

interface MenuItem {
  title: string
  href: string
  icon: React.ReactNode
  onClick?: () => void
}

interface MenuSection {
  title: string
  items: MenuItem[]
  collapsible?: boolean
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const menuData: MenuSection[] = [
  // ... mantener el mismo menuData que tienes
  {
    title: "Dashboard",
    items: [
      {
        title: "Inicio",
        href: "/dashboard",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
        ),
      },
      {
        title: "Analíticas",
        href: "/dashboard/analiticas",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Productos",
    collapsible: true,
    items: [
      {
        title: "Ver Productos",
        href: "/dashboard/ver-productos",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        ),
      },
      {
        title: "Agregar Producto",
        href: "/dashboard/agregar-producto",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        ),
      },
      {
        title: "Categorías",
        href: "/dashboard/categorias",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7V5c0-1.1.9-2 2-2h2" />
            <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
            <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
            <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
            <rect width="7" height="5" x="7" y="7" rx="1" />
            <rect width="7" height="5" x="10" y="12" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Usuarios",
    collapsible: true,
    items: [
      {
        title: "Administradores",
        href: "/dashboard/administradores",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="m22 21-3-3m0 0a5 5 0 1 0-7-7 5 5 0 0 0 7 7Z" />
          </svg>
        ),
      },
      {
        title: "Agregar Admin",
        href: "/dashboard/agregar-admin",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" x2="19" y1="8" y2="14" />
            <line x1="22" x2="16" y1="11" y2="11" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Ventas",
    items: [
      {
        title: "Órdenes",
        href: "/dashboard/ordenes",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m7 11 2-2-2-2" />
            <path d="M11 13h4" />
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Exportar Datos",
    collapsible: true,
    items: [
      {
        title: "Exportar Clientes",
        href: "/dashboard/exportar/clientes",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
            <path d="M12 15L7 10H17L12 15Z" />
          </svg>
        ),
      },
      {
        title: "Exportar Productos",
        href: "/dashboard/exportar/productos",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
            <path d="M12 15L7 10H17L12 15Z" />
          </svg>
        ),
      },
      {
        title: "Exportar Pagos",
        href: "/dashboard/exportar/pagos",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
            <path d="M12 15L7 10H17L12 15Z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Log-Out",
    items: [
      {
        title: "Cerrar Sesión",
        href: "#",
        onClick: () => logoutAction(),
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v10" />
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
          </svg>
        ),
      },
    ],
  },
]

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSection = (sectionTitle: string) => {
    const newCollapsed = new Set(collapsedSections)
    if (newCollapsed.has(sectionTitle)) {
      newCollapsed.delete(sectionTitle)
    } else {
      newCollapsed.add(sectionTitle)
    }
    setCollapsedSections(newCollapsed)
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose()
    }
  }

  return (
    <>
      {/* Overlay para móvil */}
      {isMobile && isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isMobile && isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className={styles.logoText}>
              <h2>Panel de Administracion</h2>
              <p>Tienda River</p>
            </div>
          </div>

          {/* Botón de cerrar en móvil */}
          {isMobile && (
            <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar menú">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <nav className={styles.nav}>
          {menuData.map((section) => (
            <div key={section.title} className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                {section.collapsible && (
                  <button
                    className={styles.collapseButton}
                    onClick={() => toggleSection(section.title)}
                    aria-label={`Toggle ${section.title} section`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={collapsedSections.has(section.title) ? styles.collapsed : styles.expanded}
                    >
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </button>
                )}
              </div>

              <ul
                className={`${styles.menuList} ${
                  section.collapsible && collapsedSections.has(section.title) ? styles.hidden : ""
                }`}
              >
                {section.items.map((item) => (
                  <li key={item.title} className={styles.menuItem}>
                    {item.onClick ? (
                      <div
                        className={`${styles.menuLink} ${isActive(item.href) ? styles.active : ""}`}
                        onClick={() => {
                          item.onClick?.()
                          handleLinkClick()
                        }}
                      >
                        <span className={styles.menuIcon}>{item.icon}</span>
                        <span className={styles.menuText}>{item.title}</span>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`${styles.menuLink} ${isActive(item.href) ? styles.active : ""}`}
                        onClick={handleLinkClick}
                      >
                        <span className={styles.menuIcon}>{item.icon}</span>
                        <span className={styles.menuText}>{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
