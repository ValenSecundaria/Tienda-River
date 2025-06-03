import type React from "react"
import { Newspaper, Calendar, Tag, TrendingUp, Users, Award } from "lucide-react"

const NoticiasCorporativas: React.FC = () => {
  const noticias = [
    {
      id: 1,
      titulo: "MUNDO-RIVER inaugura nueva sucursal en Rosario",
      fecha: "15 de Enero, 2024",
      categoria: "Expansión",
      resumen:
        "La nueva tienda oficial abre sus puertas en el centro de Rosario con más de 200m² de productos oficiales.",
      destacada: true,
    },
    {
      id: 2,
      titulo: "Récord de ventas en la nueva camiseta titular",
      fecha: "8 de Enero, 2024",
      categoria: "Ventas",
      resumen: "La nueva camiseta 2024 batió todos los récords de pre-venta en las primeras 48 horas.",
      destacada: false,
    },
    {
      id: 3,
      titulo: "Alianza estratégica con proveedores sustentables",
      fecha: "22 de Diciembre, 2023",
      categoria: "Sustentabilidad",
      resumen: "MUNDO-RIVER se compromete con el medio ambiente incorporando materiales reciclados en sus productos.",
      destacada: false,
    },
  ]

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case "Expansión":
        return "bg-success"
      case "Ventas":
        return "bg-primary"
      case "Sustentabilidad":
        return "bg-warning"
      default:
        return "bg-secondary"
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <Newspaper size={48} className="text-primary mb-3" />
            <h1 className="display-4 fw-bold text-primary">Noticias Corporativas</h1>
            <p className="lead text-muted">Mantente al día con las últimas novedades y logros de MUNDO-RIVER</p>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100 border-primary">
            <div className="card-body">
              <TrendingUp className="text-primary mb-2" size={32} />
              <h5 className="card-title">Crecimiento</h5>
              <h3 className="text-primary">+45%</h3>
              <p className="card-text text-muted">Incremento en ventas 2023</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100 border-success">
            <div className="card-body">
              <Users className="text-success mb-2" size={32} />
              <h5 className="card-title">Clientes</h5>
              <h3 className="text-success">250K+</h3>
              <p className="card-text text-muted">Hinchas satisfechos</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100 border-warning">
            <div className="card-body">
              <Award className="text-warning mb-2" size={32} />
              <h5 className="card-title">Sucursales</h5>
              <h3 className="text-warning">12</h3>
              <p className="card-text text-muted">Tiendas en todo el país</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Últimas Noticias</h2>
          {noticias.map((noticia) => (
            <div key={noticia.id} className={`card mb-3 ${noticia.destacada ? "border-primary" : ""}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center">
                    <Calendar className="text-muted me-2" size={16} />
                    <small className="text-muted">{noticia.fecha}</small>
                  </div>
                  <span className={`badge ${getCategoryColor(noticia.categoria)}`}>
                    <Tag size={12} className="me-1" />
                    {noticia.categoria}
                  </span>
                </div>
                <h5 className={`card-title ${noticia.destacada ? "text-primary" : ""}`}>
                  {noticia.destacada && <Award className="me-2" size={20} />}
                  {noticia.titulo}
                </h5>
                <p className="card-text">{noticia.resumen}</p>
                <button className="btn btn-outline-primary btn-sm">Leer más</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="alert alert-info">
            <div className="d-flex align-items-center">
              <Newspaper className="me-2" size={20} />
              <div>
                <strong>¿Querés recibir nuestras noticias?</strong>
                <p className="mb-0">
                  Suscribite a nuestro newsletter corporativo y mantente informado sobre todas las novedades de
                  MUNDO-RIVER.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticiasCorporativas
