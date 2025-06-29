"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import Carrito from "./FormMercadoPago/Carrito"; // Ruta corregida

// Tipos
type Subcategoria = { id: number; nombre: string; descripcion?: string };
type Categoria = { id: number; nombre: string; subcategorias: Subcategoria[] };
type NavItem = { label: string; href: string; categorias: Categoria[] };

const slugify = (text: string) =>
  (text ?? "").toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");

export default function Header() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false); // nuevo estado


  useEffect(() => {
    async function loadNav() {
      try {
        const res = await fetch("/api/categorias");
        const items: NavItem[] = await res.json();
        setNavItems(items);
      } catch (e) {
        console.error("Error al cargar categorías:", e);
      } finally {
        setLoading(false);
      }
    }
    loadNav();
  }, []);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Cargando menú...</p>
      </div>
    );

  return (
    <header>
      <nav className={`${styles.customNavbar} navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top`}>
        <div className="container-fluid px-3 px-lg-4">
          <Link href="/" className="navbar-brand">
            Tienda-River
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavCollapse}
            aria-controls="navbarNavContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}
            id="navbarNavContent"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={`nav-item ${styles.megaItem}`}
                  onMouseEnter={() => setIsHoveringMenu(true)}
                  onMouseLeave={() => setIsHoveringMenu(false)}
                >
                  <Link href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                  {/* menú desplegable */}
                  <div className={styles.megaMenu}>
                    <div className="container">
                      <div className="row">
                        {item.categorias.map((cat) => (
                          <div className="col-12 col-md-4 mb-3" key={cat.id}>
                            <h6 className="text-uppercase fw-bold mb-2">
                              {item.label} – {cat.nombre}
                            </h6>
                            <ul className="list-unstyled">
                              {cat.subcategorias.map((sub) => (
                                <li key={sub.id}>
                                  <span className="dropdown-item text-muted">
                                    {sub.nombre}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ICONOS DERECHA */}
          <div className="d-flex align-items-center gap-3 ms-auto">
            <button className="btn p-0" onClick={toggleSearch} aria-label="Buscar">
              <i className="bi bi-search fs-5" />
            </button>
            <Link href="/login" className="text-dark" aria-label="Login">
              <i className="bi bi-person fs-5" />
            </Link>
            <button className="btn p-0" onClick={() => setShowCartPopup(true)} aria-label="Carrito">
              <i className="bi bi-cart fs-5" />
            </button>
          </div>
        </div>
      </nav>

      {showCartPopup && <Carrito onClose={() => setShowCartPopup(false)} />}
    </header>
  );
  
}
