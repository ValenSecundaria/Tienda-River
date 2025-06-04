// components/Footer.tsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 mt-auto">
      <div className="container">
        <div className="row">
          {/* Columna 1: AYUDA */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Ayuda</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/api/ayuda/contactanos" className="text-white-50">
                  Contactanos
                </Link>
              </li>
              <li>
                <Link href="/api/ayuda/metodos-de-pago" className="text-white-50">
                  Métodos de pago
                </Link>
              </li>
              <li>
                <Link href="/api/ayuda/preguntas-frecuentes" className="text-white-50">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/api/ayuda/seguimiento-envio" className="text-white-50">
                  Seguí tu envío
                </Link>
              </li>
              <li>
                <Link href="/api/ayuda/terminos-y-condiciones" className="text-white-50">
                  Términos y condiciones de uso
                </Link>
              </li>
              <li>
                <Link href="/api/ayuda/defensa-al-consumidor" className="text-white-50">
                  Defensa de las y los consumidores
                </Link>
              </li>
            </ul>
            <button className="btn btn-light text-dark mt-3">
              BOTÓN DE ARREPENTIMIENTO <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>

          {/* Columna 2: SERVICIOS */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Servicios</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/api/servicios/tiendas" className="text-white-50">
                  Tiendas
                </Link>
              </li>
              <li>
                <Link
                  href="/api/servicios/cambios-y-devoluciones"
                  className="text-white-50"
                >
                  Cambios y Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/api/servicios/cuidado-de-los-productos"
                  className="text-white-50"
                >
                  Cuidado de los productos
                </Link>
              </li>
              <li>
                <Link
                  href="/api/servicios/guia-de-talles"
                  className="text-white-50"
                >
                  Guía de talles
                </Link>
              </li>
              <li>
                <Link
                  href="/api/servicios/politica-de-privacidad"
                  className="text-white-50"
                >
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: ACERCA DE MUNDO-RIVER */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Acerca de MUNDO-RIVER</h5>
            <p className="fw-bold">GO WILD</p>
            <ul className="list-unstyled">
              <li>
                <Link href="/api/acerca-de/compania" className="text-white-50">
                  Compañía
                </Link>
              </li>
              <li>
                <Link
                  href="/api/acerca-de/noticias-corporativas"
                  className="text-white-50"
                >
                  Noticias Corporativas
                </Link>
              </li>
              <li>
                <Link href="/api/acerca-de/empleo" className="text-white-50">
                  Empleo
                </Link>
              </li>
              <li>
                <Link href="/api/acerca-de/mundo-river-sale" className="text-white-50">
                  MUNDO-RIVER Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: MANTENTE AL DÍA */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Mantente al día</h5>
            <p className="text-white-50">Inscribite y obtené 15% OFF en tu primera compra</p>

            <form className="d-flex mb-3">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Ingresá tu correo electrónico"
                aria-label="Correo"
              />
              <button type="submit" className="btn btn-primary">
                Suscribirme
              </button>
            </form>

            {/* Redes sociales */}
            <div className="mb-3">
              <Link href="https://facebook.com" className="text-white me-3">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link href="https://twitter.com" className="text-white me-3">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link href="https://instagram.com" className="text-white me-3">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link href="https://youtube.com" className="text-white">
                <i className="bi bi-youtube"></i>
              </Link>
            </div>

            {/* Iconos rectangulares */}
            <div className="d-flex align-items-center flex-wrap">
              <img
                src="/ruta/data-fiscal.png"
                alt="Data Fiscal"
                className="me-3 mb-2"
                style={{ width: "40px" }}
              />
              <img
                src="/ruta/MUNDO-RIVER-speed.png"
                alt="Entrena con los más veloces"
                className="me-3 mb-2"
                style={{ width: "40px" }}
              />
              <img
                src="/ruta/MUNDO-RIVER-app.png"
                alt="App MUNDO-RIVER"
                className="mb-2"
                style={{ width: "40px" }}
              />
            </div>
          </div>
        </div>

        {/* Sección inferior de derechos reservados */}
        <hr className="border-secondary" />
        <div className="text-center py-3 d-flex flex-wrap justify-content-center align-items-center">
          <div className="d-flex flex-wrap justify-content-center mb-2 mb-md-0">
            <Link href="/terminos-y-condiciones" className="text-white-50 me-3">
              Términos y Condiciones
            </Link>
            <Link href="/politica-de-privacidad" className="text-white-50 me-3">
              Política de privacidad
            </Link>
            {/* Separación extra entre “Configurar cookies” y el texto siguiente */}
            <Link href="/configurar-cookies" className="text-white-50 me-3">
              Configurar cookies
            </Link>
          </div>
          <small className="text-white-50">
            @MUNDO-RIVER, 2025. Hecho por Gemetro Valentin y Didier Mateo. Todos los derechos reservados
          </small>
        </div>
      </div>
    </footer>
  );
}
