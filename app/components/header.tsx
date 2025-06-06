"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./header.module.css"; // Importa tus estilos de Header

const navItems = [
  { label: "Hombre", href: "/hombre" },
  { label: "Mujer", href: "/mujer" },
  { label: "Niños", href: "/ninos" },
  { label: "Accesorios", href: "/accesorios" },
  { label: "Ofertas", href: "/ofertas" },
  { label: "Novedades", href: "/novedades" },
];

export default function Header() {
  // --- Mega-menú y colapso de Navbar ---
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // --- Búsqueda (reemplaza lupa por campo de texto) ---
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  // --- Popup de registro de usuario ---
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef<HTMLDivElement | null>(null);

  // Estados para el formulario de registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Cerrar popup si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Si el clic está fuera del div referenciado, cierro el popup
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserOpen(false);
      }
    }

    if (userOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userOpen]);

  // Manejar envío del formulario de registro
  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        // Si la respuesta no es 2xx, mostramos el error (puedes personalizar)
        alert(data.error || "Error al registrar usuario");
      } else {
        // Registro exitoso: data podría devolver el usuario creado
        console.log("Usuario registrado:", data);
        // Limpio campos y cierro popup
        setEmail("");
        setPassword("");
        setUserOpen(false);
      }
    } catch (err) {
      console.error("Error al conectar con API de registro:", err);
      alert("Error interno. Intenta nuevamente.");
    }
  }

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

          {/* Móvil: reemplaza icono por input al abrir búsqueda */}
          <div className="d-lg-none mx-auto">
            {searchOpen ? (
              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto..."
                autoFocus
                onBlur={() => setSearchOpen(false)}
                // En onChange podrías capturar valor si quieres
              />
            ) : (
              <button
                className="btn nav-link p-0"
                onClick={toggleSearch}
                aria-label="Abrir búsqueda"
              >
                <i className="bi bi-search"></i>
              </button>
            )}
          </div>

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
                  onMouseEnter={() => setIsHoveringMenu(true)}
                  onMouseLeave={() => setIsHoveringMenu(false)}
                >
                  {/* Enlace principal */}
                  <Link href={item.href} className="nav-link">
                    {item.label}
                  </Link>

                  {/* Mega-menú (idéntico a tu versión anterior) */}
                  <div className={styles.megaMenu}>
                    <div className="container">
                      <div className="row">
                        {/* Columna 1 */}
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

                        {/* Columna 2 */}
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

                        {/* Columna 3 */}
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

            {/* Íconos de búsqueda, carrito y usuario */}
            <ul
              className={`navbar-nav flex-row align-items-center ms-lg-auto ${styles.iconsNav}`}
            >
              {/* Desktop: reemplaza lupa por input de búsqueda */}
              <li className="nav-item d-none d-lg-flex align-items-center position-relative">
                {searchOpen ? (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar producto..."
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                ) : (
                  <button
                    className="btn nav-link p-0"
                    onClick={toggleSearch}
                    aria-label="Abrir búsqueda"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                )}
              </li>

              {/* Carrito de compras */}
              <li className="nav-item">
                <Link href="/cart" className="nav-link" aria-label="Carrito de compras">
                  <i className="bi bi-cart"></i>
                </Link>
              </li>

              {/* Botón de usuario: abre popup de registro */}
              <li className="nav-item position-relative">
                <button
                  className="btn nav-link p-0"
                  onClick={() => setUserOpen(!userOpen)}
                  aria-label="Abrir registro de usuario"
                >
                  <i className="bi bi-person-circle"></i>
                </button>

                {/* Popup de registro */}
                {userOpen && (
                  <div
                    ref={userRef}
                    className={`card position-absolute end-0 mt-2 ${styles.userPopup}`}
                    style={{ width: "300px", zIndex: 9999 }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title m-0">Registrarse</h5>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Cerrar"
                          onClick={() => setUserOpen(false)}
                        ></button>
                      </div>

                      {/* Formulario de registro */}
                      <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-3">
                          <label htmlFor="emailUser" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="emailUser"
                            placeholder="usuario@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="passwordUser" className="form-label">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="passwordUser"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                          Crear cuenta
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Overlay que cubrirá toda la página y aplicará el blur */}
      <div
        className={`${styles.overlay} ${
          isHoveringMenu ? styles.showOverlay : ""
        }`}
      ></div>
    </header>
  );
}
