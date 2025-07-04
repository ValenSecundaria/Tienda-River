"use client"

import CustomLink from "../custom-links"

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
                <CustomLink href="/ayuda/contactanos" className="footer-link">
                  Contactanos
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/ayuda/metodos-de-pago" className="footer-link">
                  Métodos de pago
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/ayuda/preguntas-frecuentes" className="footer-link">
                  Preguntas frecuentes
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/ayuda/seguimiento-envio" className="footer-link">
                  Seguí tu envío
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/ayuda/terminos-y-condiciones" className="footer-link">
                  Términos y condiciones de uso
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/ayuda/defensa-al-consumidor" className="footer-link">
                  Defensa de las y los consumidores
                </CustomLink>
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
                <CustomLink href="/servicios/tiendas" className="footer-link">
                  Tiendas
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/servicios/cambios-y-devoluciones" className="footer-link">
                  Cambios y Devoluciones
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/servicios/cuidado-de-los-productos" className="footer-link">
                  Cuidado de los productos
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/servicios/guia-de-talles" className="footer-link">
                  Guía de talles
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/servicios/politica-de-privacidad" className="footer-link">
                  Política de privacidad
                </CustomLink>
              </li>
            </ul>
          </div>

          {/* Columna 3: ACERCA DE MUNDO-RIVER */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="footer-title">Acerca de MUNDO-RIVER</h5>
            <p className="river-slogan">VAMOS RIVER</p>
            <ul className="footer-links">
              <li>
                <CustomLink href="/acerca-de/compania" className="footer-link">
                  Compañía
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/acerca-de/noticias-corporativas" className="footer-link">
                  Noticias Corporativas
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/acerca-de/empleo" className="footer-link">
                  Empleo
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/acerca-de/mundo-river-sale" className="footer-link">
                  MUNDO-RIVER Sale
                </CustomLink>
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
              <CustomLink href="https://facebook.com" className="social-link">
                <i className="bi bi-facebook"></i>
              </CustomLink>
              <CustomLink href="https://twitter.com" className="social-link">
                <i className="bi bi-twitter"></i>
              </CustomLink>
              <CustomLink href="https://instagram.com" className="social-link">
                <i className="bi bi-instagram"></i>
              </CustomLink>
              <CustomLink href="https://youtube.com" className="social-link">
                <i className="bi bi-youtube"></i>
              </CustomLink>
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
            <CustomLink href="/terminos-y-condiciones" className="footer-bottom-link">
              Términos y Condiciones
            </CustomLink>
            <CustomLink href="/politica-de-privacidad" className="footer-bottom-link">
              Política de privacidad
            </CustomLink>
            <CustomLink href="/configurar-cookies" className="footer-bottom-link">
              Configurar cookies
            </CustomLink>
          </div>
          <small className="footer-copyright">
            @MUNDO-RIVER, 2025. Hecho por Gemetro Valentin y Didier Mateo. Todos los derechos reservados
          </small>
        </div>
      </div>

      <style jsx>{`
        .river-footer {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2d1810 50%, #1a1a1a 75%, #0a0a0a 100%);
          color: #ffffff;
          padding: 3.5rem 0 1rem;
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
          height: 5px;
          background: linear-gradient(90deg, #dc2626 0%, #ffffff 25%, #dc2626 50%, #ffffff 75%, #dc2626 100%);
          animation: borderFlow 3s linear infinite;
        }

        @keyframes borderFlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }

        .footer-title {
          color: #ffffff;
          font-size: 1.3rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1.8rem;
          position: relative;
          padding-bottom: 0.8rem;
          font-family: 'Arial Black', 'Helvetica', sans-serif;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #dc2626, #ffffff);
          border-radius: 2px;
          animation: titleGlow 2s ease-in-out infinite alternate;
        }

        @keyframes titleGlow {
          0% { box-shadow: 0 0 5px rgba(220, 38, 38, 0.5); }
          100% { box-shadow: 0 0 15px rgba(220, 38, 38, 0.8); }
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.9rem;
        }

        .footer-link {
          color: #e5e7eb;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          padding-left: 0;
          font-family: 'Helvetica Neue', 'Arial', sans-serif;
          display: block;
        }

        .footer-link:hover {
          color: #ffffff;
          padding-left: 12px;
          text-shadow: 1px 1px 3px rgba(220, 38, 38, 0.6);
        }

        .footer-link::before {
          content: '▶';
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          color: #dc2626;
          font-size: 0.8rem;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .footer-link:hover::before {
          opacity: 1;
          left: -8px;
        }

        .river-slogan {
          color: #dc2626;
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: 3px;
          margin-bottom: 1.8rem;
          text-shadow: 0 3px 6px rgba(220, 38, 38, 0.5);
          font-family: 'Arial Black', 'Helvetica', sans-serif;
          text-transform: uppercase;
          background: linear-gradient(45deg, #dc2626, #ffffff, #dc2626);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: sloganShine 3s ease-in-out infinite;
        }

        @keyframes sloganShine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .newsletter-text {
          color: #e5e7eb;
          font-size: 1rem;
          margin-bottom: 1.8rem;
          line-height: 1.6;
          font-weight: 500;
        }

        .newsletter-form {
          margin-bottom: 2.5rem;
        }

        .input-group {
          display: flex;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(220, 38, 38, 0.3);
        }

        .newsletter-input {
          flex: 1;
          padding: 1rem 1.2rem;
          border: none;
          background: rgba(255, 255, 255, 0.98);
          color: #1f2937;
          font-size: 1rem;
          outline: none;
          font-weight: 500;
        }

        .newsletter-input::placeholder {
          color: #6b7280;
          font-weight: 400;
        }

        .river-btn-primary {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'Arial Black', 'Helvetica', sans-serif;
        }

        .river-btn-primary:hover {
          background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(220, 38, 38, 0.5);
        }

        .river-btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 2px solid #ffffff;
          padding: 1rem 1.8rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 1.2rem;
          font-family: 'Arial Black', 'Helvetica', sans-serif;
        }

        .river-btn-secondary:hover {
          background: #ffffff;
          color: #1f2937;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
        }

        .social-links {
          display: flex;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: rgba(220, 38, 38, 0.1);
          color: #e5e7eb;
          border: 2px solid rgba(220, 38, 38, 0.3);
          border-radius: 50%;
          font-size: 1.3rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: #dc2626;
          color: white;
          border-color: #ffffff;
          transform: translateY(-4px) scale(1.15);
          box-shadow: 0 10px 25px rgba(220, 38, 38, 0.5);
        }

        .certification-icons {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .cert-icon {
          width: 50px;
          height: auto;
          opacity: 0.9;
          transition: all 0.3s ease;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
          padding: 10px;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }

        .cert-icon:hover {
          opacity: 1;
          transform: scale(1.15);
          background: rgba(220, 38, 38, 0.1);
          border-color: rgba(220, 38, 38, 0.4);
        }

        .footer-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #dc2626 25%, #ffffff 50%, #dc2626 75%, transparent 100%);
          margin: 2.5rem 0 2rem;
          border-radius: 1px;
        }

        .footer-bottom {
          text-align: center;
          padding: 2rem 0;
        }

        .footer-bottom-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .footer-bottom-link {
          color: #d1d5db;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-bottom-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: #dc2626;
          transition: width 0.3s ease;
        }

        .footer-bottom-link:hover {
          color: #ffffff;
        }

        .footer-bottom-link:hover::after {
          width: 100%;
        }

        .footer-copyright {
          color: #9ca3af;
          font-size: 0.9rem;
          line-height: 1.6;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .river-footer {
            padding: 2.5rem 0 1rem;
          }
          
          .footer-title {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
          }
          
          .input-group {
            flex-direction: column;
          }
          
          .newsletter-input {
            border-radius: 12px 12px 0 0;
          }
          
          .river-btn-primary {
            border-radius: 0 0 12px 12px;
          }
          
          .footer-bottom-links {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .certification-icons {
            justify-content: center;
          }

          .river-slogan {
            font-size: 1.2rem;
            letter-spacing: 2px;
          }
        }
      `}</style>
    </footer>
  )
}
