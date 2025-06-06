import Header from "./components/header"
import Footer from "./components/footer"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100">

      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="hero-banner d-flex align-items-center justify-content-center text-white position-relative">
          <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>
          <div className="container-fluid text-center position-relative z-1">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h1 className="display-2 fw-bold mb-4">Bienvenido a Tienda-River</h1>
                <p className="lead fs-3 mb-4">Descubrí la última colección de moda</p>
                <Link href="/ofertas" className="btn btn-primary btn-lg px-5 py-3">
                  Ver colección
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías Destacadas */}
        <section className="py-5">
          <div className="container">
            <div className="row text-center mb-5">
              <div className="col">
                <h2 className="display-4 fw-bold">Categorías Destacadas</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src="/images/categoria-hombre.jpg"
                    className="card-img-top"
                    alt="Categoría Hombre"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title text-center fs-2 fw-bold mb-3">Hombre</h3>
                    <div className="mt-auto text-center">
                      <Link href="/hombre" className="btn btn-outline-primary btn-lg">
                        Ver más
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src="/images/categoria-mujer.jpg"
                    className="card-img-top"
                    alt="Categoría Mujer"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title text-center fs-2 fw-bold mb-3">Mujer</h3>
                    <div className="mt-auto text-center">
                      <Link href="/mujer" className="btn btn-outline-primary btn-lg">
                        Ver más
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src="/images/categoria-ninos.jpg"
                    className="card-img-top"
                    alt="Categoría Niños"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title text-center fs-2 fw-bold mb-3">Niños</h3>
                    <div className="mt-auto text-center">
                      <Link href="/ninos" className="btn btn-outline-primary btn-lg">
                        Ver más
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row text-center mb-5">
              <div className="col">
                <h2 className="display-4 fw-bold">Productos Destacados</h2>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              <div className="col">
                <div className="card h-100 shadow-sm">
                  <img
                    src="/images/producto1.jpg"
                    className="card-img-top"
                    alt="Producto 1"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Camiseta Clásica</h5>
                    <p className="card-text text-muted">Camiseta de algodón 100% con diseño moderno y cómodo.</p>
                    <p className="fs-4 fw-bold text-primary mb-3">$2.500</p>
                    <div className="mt-auto">
                      <Link href="/producto/1" className="btn btn-primary w-100">
                        Comprar ahora
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 shadow-sm">
                  <img
                    src="/images/producto2.jpg"
                    className="card-img-top"
                    alt="Producto 2"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Pantalón Deportivo</h5>
                    <p className="card-text text-muted">Pantalón cómodo ideal para entrenar o uso casual.</p>
                    <p className="fs-4 fw-bold text-primary mb-3">$3.200</p>
                    <div className="mt-auto">
                      <Link href="/producto/2" className="btn btn-primary w-100">
                        Comprar ahora
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 shadow-sm">
                  <img
                    src="/images/producto3.jpg"
                    className="card-img-top"
                    alt="Producto 3"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Zapatillas Urban</h5>
                    <p className="card-text text-muted">Zapatillas urbanas con estilo y máxima comodidad.</p>
                    <p className="fs-4 fw-bold text-primary mb-3">$8.500</p>
                    <div className="mt-auto">
                      <Link href="/producto/3" className="btn btn-primary w-100">
                        Comprar ahora
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 shadow-sm">
                  <img
                    src="/images/producto4.jpg"
                    className="card-img-top"
                    alt="Producto 4"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Chaqueta Casual</h5>
                    <p className="card-text text-muted">Chaqueta versátil perfecta para cualquier ocasión.</p>
                    <p className="fs-4 fw-bold text-primary mb-3">$5.800</p>
                    <div className="mt-auto">
                      <Link href="/producto/4" className="btn btn-primary w-100">
                        Comprar ahora
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ventajas / Beneficios */}
        <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 text-center mb-4">
                <div className="mb-3">
                  <i className="bi bi-truck display-1 text-primary"></i>
                </div>
                <h4 className="fw-bold">Envío gratis a todo el país</h4>
                <p className="text-muted">Recibí tus productos sin costo adicional en cualquier parte del país.</p>
              </div>
              <div className="col-12 col-md-4 text-center mb-4">
                <div className="mb-3">
                  <i className="bi bi-credit-card display-1 text-primary"></i>
                </div>
                <h4 className="fw-bold">Múltiples métodos de pago</h4>
                <p className="text-muted">Pagá como prefieras: tarjeta, transferencia, efectivo o cuotas.</p>
              </div>
              <div className="col-12 col-md-4 text-center mb-4">
                <div className="mb-3">
                  <i className="bi bi-clock display-1 text-primary"></i>
                </div>
                <h4 className="fw-bold">Devoluciones en 10 días</h4>
                <p className="text-muted">Si no estás conforme, tenés 10 días para devolver tu compra.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / Suscripción */}
        <section className="bg-light py-5">
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h2 className="display-5 fw-bold mb-4">Suscribite y obtené 15% OFF</h2>
                <p className="lead mb-4">Recibí las últimas novedades y ofertas exclusivas en tu email</p>
                <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                  <input
                    type="email"
                    className="form-control w-50 d-inline-block me-2"
                    placeholder="Tu correo electrónico"
                    style={{ minWidth: "250px" }}
                  />
                  <button className="btn btn-primary btn-lg">Suscribirme</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}