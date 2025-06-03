// components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 mt-auto">
      <div className="container">
        <div className="row">
          {/* Columna 1: AYUDA */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Ayuda</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">Contactanos</a></li>
              <li><a href="#" className="text-white-50">Métodos de pago</a></li>
              <li><a href="#" className="text-white-50">Preguntas frecuentes</a></li>
              <li><a href="#" className="text-white-50">Seguí tu envío</a></li>
              <li><a href="#" className="text-white-50">Términos y condiciones de uso</a></li>
              <li><a href="#" className="text-white-50">Defensa de las y los consumidores</a></li>
              <li><a href="#" className="text-white-50">Descuento para estudiantes</a></li>
            </ul>
            <button className="btn btn-light text-dark mt-3">
              BOTÓN DE ARREPENTIMIENTO <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>

          {/* Columna 2: SERVICIOS */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Servicios</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">Tiendas</a></li>
              <li><a href="#" className="text-white-50">Cambios y Devoluciones</a></li>
              <li><a href="#" className="text-white-50">Cuidado de los productos</a></li>
              <li><a href="#" className="text-white-50">Guía de talles</a></li>
              <li><a href="#" className="text-white-50">Política de privacidad</a></li>
              <li><a href="#" className="text-white-50">Programa de afiliados</a></li>
            </ul>
          </div>

          {/* Columna 3: ACERCA DE MUNDO-RIVER */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Acerca de MUNDO-RIVER</h5>
            <p className="fw-bold">GO WILD</p>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">Compañía</a></li>
              <li><a href="#" className="text-white-50">Noticias Corporativas</a></li>
              <li><a href="#" className="text-white-50">Empleo</a></li>
              <li><a href="#" className="text-white-50">MUNDO-RIVER Sale</a></li>
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
              <button type="submit" className="btn btn-primary">Suscribirme</button>
            </form>
            
            {/* Redes sociales */}
            <div className="mb-3">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-youtube"></i></a>
            </div>
            
            {/* Iconos rectangulares */}
            <div className="d-flex align-items-center flex-wrap">
              <img src="/ruta/data-fiscal.png" alt="Data Fiscal" className="me-3 mb-2" style={{ width: "40px" }} />
              <img src="/ruta/MUNDO-RIVER-speed.png" alt="Entrena con los más veloces" className="me-3 mb-2" style={{ width: "40px" }} />
              <img src="/ruta/MUNDO-RIVER-app.png" alt="App MUNDO-RIVER" className="mb-2" style={{ width: "40px" }} />
            </div>
          </div>
        </div>
        
        {/* Sección inferior de derechos reservados */}
        <hr className="border-secondary" />
        <div className="text-center py-3 d-flex flex-wrap justify-content-center align-items-center">
          <div className="d-flex flex-wrap justify-content-center mb-2 mb-md-0">
            <a href="#" className="text-white-50 me-3">Términos y Condiciones</a>
            <a href="#" className="text-white-50 me-3">Política de privacidad</a>
            {/* Separación extra entre “Configurar cookies” y el texto siguiente */}
            <a href="#" className="text-white-50 me-3">Configurar cookies</a>
          </div>
          {/* “©MUNDO_RIVER, 2025. Todos los derechos reservados” con autoría */
          /* Cambié el texto para que diga que eres tú quien lo hizo */}
          <small className="text-white-50">
            @MUNDO-RIVER, 2025. Hecho por Gemetro Valentin y Didier Mateo. Todos los derechos reservados
          </small>
        </div>
        
      </div>
    </footer>
  );
}
