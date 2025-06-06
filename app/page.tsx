"use client"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <style jsx>{`
        .hero-banner {
          background: linear-gradient(135deg, #dc143c 0%, #8b0000 100%);
          min-height: 70vh;
          position: relative;
          overflow: hidden;
        }
        .hero-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/placeholder.svg?height=800&width=1200') center/cover;
          opacity: 0.1;
          z-index: 1;
        }
        .hero-overlay {
          background: rgba(220, 20, 60, 0.8);
          z-index: 2;
        }
        .btn-river {
          background: #dc143c;
          border: 2px solid #dc143c;
          color: white;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }
        .btn-river:hover {
          background: #8b0000;
          border-color: #8b0000;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 20, 60, 0.4);
        }
        .btn-river-outline {
          background: transparent;
          border: 2px solid #dc143c;
          color: #dc143c;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }
        .btn-river-outline:hover {
          background: #dc143c;
          border-color: #dc143c;
          color: white;
          transform: translateY(-2px);
        }
        .card-river {
          border: none;
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .card-river:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(220, 20, 60, 0.2);
        }
        .text-river {
          color: #dc143c;
        }
        .bg-river-light {
          background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
        }
        .section-title {
          position: relative;
          display: inline-block;
        }
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: #dc143c;
          border-radius: 2px;
        }
        .price-tag {
          background: #dc143c;
          color: white;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
          display: inline-block;
        }
        .benefit-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #dc143c, #8b0000);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
          font-size: 2rem;
        }
        .newsletter-section {
          background: linear-gradient(135deg, #dc143c 0%, #8b0000 100%);
          color: white;
        }
        .form-control:focus {
          border-color: #dc143c;
          box-shadow: 0 0 0 0.2rem rgba(220, 20, 60, 0.25);
        }
      `}</style>

      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="hero-banner d-flex align-items-center justify-content-center text-white position-relative">
          <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>
          <div className="container-fluid text-center position-relative" style={{ zIndex: 3 }}>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h1 className="display-2 fw-bold mb-4">🏆 TIENDA OFICIAL RIVER PLATE</h1>
                <p className="lead fs-3 mb-4">Viví la pasión millonaria con la indumentaria oficial</p>
                <p className="fs-5 mb-4">⚪🔴 Desde 1901 haciendo historia ⚪🔴</p>
                <Link href="/ofertas" className="btn btn-river btn-lg px-5 py-3">
                  Ver Colección Oficial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías Destacadas */}
        <section className="py-5 bg-river-light">
          <div className="container">
            <div className="row text-center mb-5">
              <div className="col">
                <h2 className="display-4 fw-bold section-title">Categorías Millonarias</h2>
                <p className="lead mt-4 text-muted">Encontrá todo lo que necesitás para ser parte de la banda</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mb-4">
                <div className="card card-river h-100">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    className="card-img-top"
                    alt="Indumentaria Masculina River Plate"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h3 className="card-title fs-2 fw-bold mb-3 text-river">👨 Hombres</h3>
                    <p className="text-muted mb-3">Camisetas, shorts, camperas y más para el hincha millonario</p>
                    <div className="mt-auto">
                      <Link href="/hombre" className="btn btn-river-outline btn-lg">
                        Ver Productos
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4">
                <div className="card card-river h-100">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    className="card-img-top"
                    alt="Indumentaria Femenina River Plate"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h3 className="card-title fs-2 fw-bold mb-3 text-river">👩 Mujeres</h3>
                    <p className="text-muted mb-3">Diseños exclusivos para las hinchas más apasionadas</p>
                    <div className="mt-auto">
                      <Link href="/mujer" className="btn btn-river-outline btn-lg">
                        Ver Productos
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4">
                <div className="card card-river h-100">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    className="card-img-top"
                    alt="Indumentaria Infantil River Plate"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h3 className="card-title fs-2 fw-bold mb-3 text-river">👶 Niños</h3>
                    <p className="text-muted mb-3">Para que los más chicos crezcan siendo millonarios</p>
                    <div className="mt-auto">
                      <Link href="/ninos" className="btn btn-river-outline btn-lg">
                        Ver Productos
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="py-5">
          <div className="container">
            <div className="row text-center mb-5">
              <div className="col">
                <h2 className="display-4 fw-bold section-title">Productos Estrella</h2>
                <p className="lead mt-4 text-muted">Los más elegidos por la hinchada millonaria</p>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              <div className="col">
                <div className="card card-river h-100">
                  <img
                    src="/placeholder.svg?height=250&width=300"
                    className="card-img-top"
                    alt="Camiseta Titular River Plate"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">🏆 Camiseta Titular 2024</h5>
                    <p className="card-text text-muted">La camiseta oficial con la que River hace historia</p>
                    <div className="price-tag mb-3">$25.000</div>
                    <div className="mt-auto">
                      <Link href="/producto/1" className="btn btn-river w-100">
                        ¡Quiero la mía!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card card-river h-100">
                  <img
                    src="/placeholder.svg?height=250&width=300"
                    className="card-img-top"
                    alt="Short Oficial River Plate"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">⚪ Short Oficial</h5>
                    <p className="card-text text-muted">Comodidad y estilo para entrenar como un millonario</p>
                    <div className="price-tag mb-3">$18.500</div>
                    <div className="mt-auto">
                      <Link href="/producto/2" className="btn btn-river w-100">
                        ¡Quiero el mío!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card card-river h-100">
                  <img
                    src="/placeholder.svg?height=250&width=300"
                    className="card-img-top"
                    alt="Campera River Plate"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">🧥 Campera Millonaria</h5>
                    <p className="card-text text-muted">Elegancia y pasión en cada detalle</p>
                    <div className="price-tag mb-3">$45.000</div>
                    <div className="mt-auto">
                      <Link href="/producto/3" className="btn btn-river w-100">
                        ¡La necesito!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card card-river h-100">
                  <img
                    src="/placeholder.svg?height=250&width=300"
                    className="card-img-top"
                    alt="Gorra River Plate"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">🧢 Gorra Oficial</h5>
                    <p className="card-text text-muted">Llevá el escudo millonario a donde vayas</p>
                    <div className="price-tag mb-3">$12.000</div>
                    <div className="mt-auto">
                      <Link href="/producto/4" className="btn btn-river w-100">
                        ¡Es mía!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ventajas / Beneficios */}
        <section className="py-5 bg-river-light">
          <div className="container">
            <div className="row text-center mb-5">
              <div className="col">
                <h2 className="display-5 fw-bold section-title">¿Por qué elegir nuestra tienda?</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 text-center mb-4">
                <div className="benefit-icon">🚚</div>
                <h4 className="fw-bold text-river">Envío gratis a todo el país</h4>
                <p className="text-muted">
                  Tu pasión millonaria llega sin costo adicional a cualquier rincón de Argentina
                </p>
              </div>
              <div className="col-12 col-md-4 text-center mb-4">
                <div className="benefit-icon">💳</div>
                <h4 className="fw-bold text-river">Pagá como quieras</h4>
                <p className="text-muted">
                  Tarjeta, transferencia, efectivo o cuotas. ¡Hacé tu compra millonaria fácil!
                </p>
              </div>
              <div className="col-12 col-md-4 text-center mb-4">
                <div className="benefit-icon">🔄</div>
                <h4 className="fw-bold text-river">Cambios sin problemas</h4>
                <p className="text-muted">
                  Tenés 15 días para cambiar tu producto. ¡Tu satisfacción es nuestra prioridad!
                </p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </div>
  )
}
