"use client"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="river-footer">
      <div className="container">
        <div className="row">
          {/* Columna 1: AYUDA */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="footer-title">Ayuda</h5>
            <ul className="footer-links">
              <li>
                <Link href="/ayuda/contactanos" className="footer-link">
                  Contactanos
                </Link>
              </li>
              <li>
                <Link href="/ayuda/metodos-de-pago" className="footer-link">
                  Métodos de pago
                </Link>
              </li>
              <li>
                <Link href="/ayuda/preguntas-frecuentes" className="footer-link">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/ayuda/seguimiento-envio" className="footer-link">
                  Seguí tu envío
                </Link>
              </li>
              <li>
                <Link href="/ayuda/terminos-y-condiciones" className="footer-link">
                  Términos y condiciones de uso
                </Link>
              </li>
              <li>
                <Link href="/ayuda/defensa-al-consumidor" className="footer-link">
                  Defensa de las y los consumidores
                </Link>
              </li>
            </ul>
            <button className="river-btn-secondary">
              BOTÓN DE ARREPENTIMIENTO <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>

          {/* Columna 2: SERVICIOS */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="footer-title">Servicios</h5>
            <ul className="footer-links">
              <li>
                <Link href="/servicios/tiendas" className="footer-link">
                  Tiendas
                </Link>
              </li>
              <li>
                <Link href="/servicios/cambios-y-devoluciones" className="footer-link">
                  Cambios y Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/servicios/cuidado-de-los-productos" className="footer-link">
                  Cuidado de los productos
                </Link>
              </li>
              <li>
                <Link href="/servicios/guia-de-talles" className="footer-link">
                  Guía de talles
                </Link>
              </li>
              <li>
                <Link href="/servicios/politica-de-privacidad" className="footer-link">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: ACERCA DE MUNDO-RIVER */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="footer-title">Acerca de MUNDO-RIVER</h5>
            <p className="river-slogan">GO WILD</p>
            <ul className="footer-links">
              <li>
                <Link href="/acerca-de/compania" className="footer-link">
                  Compañía
                </Link>
              </li>
              <li>
                <Link href="/acerca-de/noticias-corporativas" className="footer-link">
                  Noticias Corporativas
                </Link>
              </li>
              <li>
                <Link href="/acerca-de/empleo" className="footer-link">
                  Empleo
                </Link>
              </li>
              <li>
                <Link href="/acerca-de/mundo-river-sale" className="footer-link">
                  MUNDO-RIVER Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: MANTENTE AL DÍA */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="footer-title">Mantente al día</h5>
            <p className="newsletter-text">Inscribite y obtené 15% OFF en tu primera compra</p>
            <form className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Ingresá tu correo electrónico"
                  aria-label="Correo"
                />
                <button type="submit" className="river-btn-primary">
                  Suscribirme
                </button>
              </div>
            </form>

            {/* Redes sociales */}
            <div className="social-links">
              <Link href="https://facebook.com" className="social-link">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link href="https://twitter.com" className="social-link">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link href="https://instagram.com" className="social-link">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link href="https://youtube.com" className="social-link">
                <i className="bi bi-youtube"></i>
              </Link>
            </div>

            {/* Iconos rectangulares */}
            <div className="certification-icons">
              <img src="/ruta/data-fiscal.png" alt="Data Fiscal" className="cert-icon" />
              <img src="/ruta/MUNDO-RIVER-speed.png" alt="Entrena con los más veloces" className="cert-icon" />
              <img src="/ruta/MUNDO-RIVER-app.png" alt="App MUNDO-RIVER" className="cert-icon" />
            </div>
          </div>
        </div>

        {/* Sección inferior de derechos reservados */}
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <Link href="/terminos-y-condiciones" className="footer-bottom-link">
              Términos y Condiciones
            </Link>
            <Link href="/politica-de-privacidad" className="footer-bottom-link">
              Política de privacidad
            </Link>
            <Link href="/configurar-cookies" className="footer-bottom-link">
              Configurar cookies
            </Link>
          </div>
          <small className="footer-copyright">
            @MUNDO-RIVER, 2025. Hecho por Gemetro Valentin y Didier Mateo. Todos los derechos reservados
          </small>
        </div>
      </div>

      <style jsx>{`
        .river-footer {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 50%, #1a1a1a 100%);
          color: #ffffff;
          padding: 3rem 0 1rem;
          margin-top: auto;
          position: relative;
          overflow: hidden;
        }

        .river-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #dc2626 0%, #fbbf24 50%, #dc2626 100%);
        }

        .footer-title {
          color: #fbbf24;
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: #dc2626;
          border-radius: 1px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-link {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
          padding-left: 0;
        }

        .footer-link:hover {
          color: #fbbf24;
          text-decoration: none;
          padding-left: 8px;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          left: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 2px;
          background: #dc2626;
          transition: width 0.3s ease;
        }

        .footer-link:hover::before {
          width: 4px;
        }

        .river-slogan {
          color: #dc2626;
          font-weight: 900;
          font-size: 1.2rem;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          text-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);
        }

        .newsletter-text {
          color: #d1d5db;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .newsletter-form {
          margin-bottom: 2rem;
        }

        .input-group {
          display: flex;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          background: rgba(255, 255, 255, 0.95);
          color: #1f2937;
          font-size: 0.9rem;
          outline: none;
        }

        .newsletter-input::placeholder {
          color: #6b7280;
        }

        .river-btn-primary {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .river-btn-primary:hover {
          background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }

        .river-btn-secondary {
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
          border: 2px solid #fbbf24;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 1rem;
        }

        .river-btn-secondary:hover {
          background: #fbbf24;
          color: #1f2937;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(251, 191, 36, 0.3);
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.1);
          color: #d1d5db;
          border-radius: 50%;
          text-decoration: none;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: #dc2626;
          color: white;
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
        }

        .certification-icons {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cert-icon {
          width: 45px;
          height: auto;
          opacity: 0.8;
          transition: all 0.3s ease;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          padding: 8px;
        }

        .cert-icon:hover {
          opacity: 1;
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.1);
        }

        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #374151 50%, transparent 100%);
          margin: 2rem 0 1.5rem;
        }

        .footer-bottom {
          text-align: center;
          padding: 1.5rem 0;
        }

        .footer-bottom-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 1rem;
        }

        .footer-bottom-link {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-link:hover {
          color: #fbbf24;
          text-decoration: none;
        }

        .footer-copyright {
          color: #6b7280;
          font-size: 0.8rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .river-footer {
            padding: 2rem 0 1rem;
          }
          
          .footer-title {
            font-size: 1rem;
            margin-bottom: 1rem;
          }
          
          .input-group {
            flex-direction: column;
          }
          
          .newsletter-input {
            border-radius: 8px 8px 0 0;
          }
          
          .river-btn-primary {
            border-radius: 0 0 8px 8px;
          }
          
          .footer-bottom-links {
            flex-direction: column;
            gap: 1rem;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .certification-icons {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  )
}
