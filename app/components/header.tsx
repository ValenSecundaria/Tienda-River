"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./header.module.css"; // Importamos los CSS Modules

const navItems = [
  { label: "Hombre", href: "/hombre" },
  { label: "Mujer", href: "/mujer" },
  { label: "Niños", href: "/ninos" },
  { label: "Accesorios", href: "/accesorios" },
  { label: "Ofertas", href: "/ofertas" },
  { label: "Novedades", href: "/novedades" },
];

export default function Header() {
  // Este estado será true mientras el mouse esté sobre un <li className="megaItem">
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);

  // Estado para controlar la colapsabilidad en móvil
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <header>
      <nav
        className={`${styles.customNavbar} navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top`}
      >
        <div className="container-fluid px-3 px-lg-4">
          {/* Logo */}
          <Link href="/" className="navbar-brand">
            Tienda-River
          </Link>

          {/* Botón hamburguesa para mobile */}
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

          {/* Menú colapsable */}
          <div
            className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}
            id="navbarNavContent"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li
                  className={`nav-item ${styles.megaItem}`}
                  key={item.label}
                  // Cuando el mouse entra a este <li>, habilito el overlay
                  onMouseEnter={() => setIsHoveringMenu(true)}
                  // Cuando sale, lo deshabilito
                  onMouseLeave={() => setIsHoveringMenu(false)}
                >
                  {/* Enlace principal */}
                  <Link href={item.href} className="nav-link">
                    {item.label}
                  </Link>

                  {/* Mega-menú que aparece al hacer hover */}
                  <div className={styles.megaMenu}>
                    <div className="container">
                      <div className="row">
                        {/* Ejemplo de columna 1 */}
                        <div className="col-12 col-md-4 mb-3">
                          <h6 className="text-uppercase fw-bold mb-2">
                            {item.label} – Categoría 1
                          </h6>
                          <ul className="list-unstyled">
                            <li>
                              <Link
                                href={`${item.href}/categoria1/sub-categoria1`}
                                className="dropdown-item"
                              >
                                Subcategoría 1
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`${item.href}/categoria2/sub-categoria2`}
                                className="dropdown-item"
                              >
                                Subcategoría 2
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`${item.href}/categoria3/sub-categoria3`}
                                className="dropdown-item"
                              >
                                Subcategoría 3
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Ejemplo de columna 2 */}
                        <div className="col-12 col-md-4 mb-3">
                          <h6 className="text-uppercase fw-bold mb-2">
                            {item.label} – Categoría 2
                          </h6>
                          <ul className="list-unstyled">
                            <li>
                              <Link
                                href={`${item.href}/categoria/sub-categoria4`}
                                className="dropdown-item"
                              >
                                Subcategoría 4
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`${item.href}/categoria/sub-categoria5`}
                                className="dropdown-item"
                              >
                                Subcategoría 5
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`${item.href}/categoria/sub-categoria6`}
                                className="dropdown-item"
                              >
                                Subcategoría 6
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Ejemplo de columna 3 */}
                        <div className="col-12 col-md-4 mb-3">
                          <h6 className="text-uppercase fw-bold mb-2">
                            {item.label} – Categoría 3
                          </h6>
                          <ul className="list-unstyled">
                            <li>
                              <Link
                                href={`${item.href}/categoria/sub-categoria7`}
                                className="dropdown-item"
                              >
                                Subcategoría 7
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`${item.href}/categoria/sub-categoria8`}
                                className="dropdown-item"
                              >
                                Subcategoría 8
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`${item.href}/categoria/sub-categoria9`}
                                className="dropdown-item"
                              >
                                Subcategoría 9
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Fin mega-menú */}
                </li>
              ))}
            </ul>

            {/* Íconos de búsqueda y carrito */}
            <ul
              className={`navbar-nav flex-row align-items-center ms-lg-auto ${styles.iconsNav}`}
            >
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

      {/* Overlay que cubrirá toda la página y aplicará el blur.
          Solo se muestra si isHoveringMenu === true */}
      <div
        className={`${styles.overlay} ${isHoveringMenu ? styles.showOverlay : ""}`}
      ></div>
    </header>
  );
}
