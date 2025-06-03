import type React from "react"
import { Building2, Users, Target, Heart, Award, MapPin } from "lucide-react"

const Compania: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <Building2 size={48} className="text-primary mb-3" />
            <h1 className="display-4 fw-bold text-primary">Compañía</h1>
            <p className="lead text-muted">
              Conocé la historia y los valores que nos definen como la tienda oficial de River Plate
            </p>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <Target className="text-primary me-2" size={24} />
                <h3 className="card-title mb-0">Nuestra Misión</h3>
              </div>
              <p className="card-text">
                Ser el punto de encuentro oficial para todos los hinchas de River Plate, ofreciendo productos de la más
                alta calidad que representen la pasión y el orgullo millonario.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <Heart className="text-danger me-2" size={24} />
                <h3 className="card-title mb-0">Nuestra Visión</h3>
              </div>
              <p className="card-text">
                Consolidarnos como la marca líder en productos deportivos y merchandising oficial, expandiendo la
                presencia de River Plate en todo el mundo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Nuestros Valores</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-3">
              <Award className="text-warning mb-2" size={32} />
              <h5>Excelencia</h5>
              <p className="text-muted">Calidad premium en cada producto</p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <Users className="text-success mb-2" size={32} />
              <h5>Pasión</h5>
              <p className="text-muted">El amor por River en cada detalle</p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <Heart className="text-danger mb-2" size={32} />
              <h5>Compromiso</h5>
              <p className="text-muted">Dedicación total con nuestros hinchas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="bg-light p-4 rounded">
            <div className="d-flex align-items-center mb-3">
              <MapPin className="text-primary me-2" size={24} />
              <h3>Nuestra Historia</h3>
            </div>
            <p className="mb-3">
              Desde 1985, MUNDO-RIVER ha sido el hogar oficial de todos los productos que representan la grandeza del
              Club Atlético River Plate. Comenzamos como una pequeña tienda en las inmediaciones del Estadio Monumental
              y hoy somos la cadena de tiendas oficiales más importante del fútbol argentino.
            </p>
            <p className="mb-0">
              Con más de 35 años de experiencia, hemos acompañado a River en todos sus logros, desde las copas
              nacionales hasta las conquistas internacionales, siempre ofreciendo a nuestros hinchas los mejores
              productos para demostrar su pasión millonaria.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Compania
