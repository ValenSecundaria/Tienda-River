import type React from "react"
import { Tag, Percent, Clock, Star, Gift, TrendingDown } from "lucide-react"

const MundoRiverSale: React.FC = () => {
  const ofertas = [
    {
      id: 1,
      producto: "Camiseta Titular 2023",
      precioOriginal: 45000,
      precioOferta: 31500,
      descuento: 30,
      imagen: "/placeholder.svg?height=200&width=200",
      categoria: "Indumentaria",
      stock: "Últimas unidades",
      destacada: true,
    },
    {
      id: 2,
      producto: "Campera Rompeviento",
      precioOriginal: 35000,
      precioOferta: 24500,
      descuento: 30,
      imagen: "/placeholder.svg?height=200&width=200",
      categoria: "Indumentaria",
      stock: "Disponible",
      destacada: false,
    },
    {
      id: 3,
      producto: "Botines Oficiales",
      precioOriginal: 80000,
      precioOferta: 56000,
      descuento: 30,
      imagen: "/placeholder.svg?height=200&width=200",
      categoria: "Calzado",
      stock: "Pocas unidades",
      destacada: true,
    },
  ]

  const categorias = [
    { nombre: "Indumentaria", descuento: "Hasta 40% OFF", icono: Tag },
    { nombre: "Calzado", descuento: "Hasta 35% OFF", icono: Star },
    { nombre: "Accesorios", descuento: "Hasta 50% OFF", icono: Gift },
    { nombre: "Colección", descuento: "Hasta 25% OFF", icono: TrendingDown },
  ]

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <div className="position-relative d-inline-block">
              <Percent size={48} className="text-danger mb-3" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                SALE
              </span>
            </div>
            <h1 className="display-4 fw-bold text-danger">MUNDO-RIVER Sale</h1>
            <p className="lead text-muted">¡Aprovechá las mejores ofertas en productos oficiales de River Plate!</p>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <div className="alert alert-danger text-center">
            <div className="d-flex align-items-center justify-content-center">
              <Clock className="me-2" size={24} />
              <div>
                <h4 className="alert-heading mb-1">¡Oferta por tiempo limitado!</h4>
                <p className="mb-0">Las ofertas terminan el 31 de Enero. ¡No te las pierdas!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Categorías en Oferta</h2>
          <div className="row">
            {categorias.map((categoria, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-3">
                <div className="card text-center h-100 shadow-sm border-danger">
                  <div className="card-body">
                    <categoria.icono className="text-danger mb-2" size={32} />
                    <h5 className="card-title">{categoria.nombre}</h5>
                    <p className="card-text text-danger fw-bold">{categoria.descuento}</p>
                    <button className="btn btn-outline-danger btn-sm">Ver ofertas</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h2 className="mb-4">Productos Destacados</h2>
          <div className="row">
            {ofertas.map((oferta) => (
              <div key={oferta.id} className="col-md-6 col-lg-4 mb-4">
                <div className={`card h-100 shadow-sm ${oferta.destacada ? "border-danger" : ""}`}>
                  {oferta.destacada && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-danger">
                        <Star size={12} className="me-1" />
                        Destacado
                      </span>
                    </div>
                  )}

                  <div className="position-relative">
                    <img
                      src={oferta.imagen || "/placeholder.svg"}
                      className="card-img-top"
                      alt={oferta.producto}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 start-0 m-2">
                      <span className="badge bg-danger fs-6">-{oferta.descuento}%</span>
                    </div>
                  </div>

                  <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                      <span className="badge bg-secondary mb-2">{oferta.categoria}</span>
                      <h5 className="card-title">{oferta.producto}</h5>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <span className="text-muted text-decoration-line-through me-2">
                          ${oferta.precioOriginal.toLocaleString()}
                        </span>
                        <span className="text-danger fw-bold fs-5">${oferta.precioOferta.toLocaleString()}</span>
                      </div>
                      <small className="text-success">
                        Ahorrás ${(oferta.precioOriginal - oferta.precioOferta).toLocaleString()}
                      </small>
                    </div>

                    <div className="mb-3">
                      <small
                        className={`badge ${oferta.stock === "Últimas unidades" || oferta.stock === "Pocas unidades" ? "bg-warning text-dark" : "bg-success"}`}
                      >
                        {oferta.stock}
                      </small>
                    </div>

                    <div className="mt-auto">
                      <button className="btn btn-danger w-100">Comprar ahora</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="bg-light p-4 rounded">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h3 className="text-danger mb-2">¿Querés recibir ofertas exclusivas?</h3>
                <p className="mb-0">
                  Suscribite a nuestro newsletter y recibí las mejores ofertas antes que nadie. ¡Además, obtené un 10%
                  de descuento adicional en tu primera compra!
                </p>
              </div>
              <div className="col-md-4 text-center">
                <button className="btn btn-danger btn-lg">
                  <Gift className="me-2" size={20} />
                  Suscribirme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MundoRiverSale
