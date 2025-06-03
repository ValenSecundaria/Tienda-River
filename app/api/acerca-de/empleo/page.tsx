import type React from "react"
import { Briefcase, Users, Heart, Star, MapPin, Clock, DollarSign } from "lucide-react"

const Empleo: React.FC = () => {
  const ofertas = [
    {
      id: 1,
      titulo: "Vendedor/a - Sucursal Palermo",
      ubicacion: "Buenos Aires, CABA",
      tipo: "Tiempo Completo",
      salario: "$180.000 - $220.000",
      descripcion: "Buscamos vendedor/a con pasión por River y experiencia en atención al cliente.",
      requisitos: ["Experiencia en ventas", "Orientación al cliente", "Disponibilidad horaria"],
      destacada: true,
    },
    {
      id: 2,
      titulo: "Encargado/a de Depósito",
      ubicacion: "Buenos Aires, Zona Norte",
      tipo: "Tiempo Completo",
      salario: "$250.000 - $300.000",
      descripcion: "Responsable de la gestión y organización del stock en nuestro depósito central.",
      requisitos: ["Experiencia en logística", "Manejo de sistemas", "Liderazgo de equipos"],
      destacada: false,
    },
    {
      id: 3,
      titulo: "Community Manager",
      ubicacion: "Remoto/Híbrido",
      tipo: "Tiempo Completo",
      salario: "$200.000 - $280.000",
      descripcion: "Gestión de redes sociales y contenido digital para MUNDO-RIVER.",
      requisitos: ["Experiencia en RRSS", "Conocimiento de River", "Creatividad"],
      destacada: false,
    },
  ]

  const beneficios = [
    { icono: Heart, titulo: "Descuentos", descripcion: "30% off en todos los productos" },
    { icono: Users, titulo: "Ambiente", descripcion: "Equipo joven y dinámico" },
    { icono: Star, titulo: "Capacitación", descripcion: "Formación continua" },
    { icono: Clock, titulo: "Flexibilidad", descripcion: "Horarios flexibles" },
  ]

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <Briefcase size={48} className="text-primary mb-3" />
            <h1 className="display-4 fw-bold text-primary">Empleo</h1>
            <p className="lead text-muted">Sumate al equipo de MUNDO-RIVER y formá parte de la familia millonaria</p>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <div className="bg-primary text-white p-4 rounded mb-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h3 className="mb-2">¿Por qué trabajar en MUNDO-RIVER?</h3>
                <p className="mb-0">
                  Trabajar en MUNDO-RIVER significa ser parte de la pasión millonaria. Ofrecemos un ambiente de trabajo
                  único donde tu amor por River se combina con oportunidades de crecimiento profesional.
                </p>
              </div>
              <div className="col-md-4 text-center">
                <Users size={64} className="text-white opacity-75" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Nuestros Beneficios</h2>
          <div className="row">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-3">
                <div className="card text-center h-100 shadow-sm">
                  <div className="card-body">
                    <beneficio.icono className="text-primary mb-2" size={32} />
                    <h5 className="card-title">{beneficio.titulo}</h5>
                    <p className="card-text text-muted">{beneficio.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h2 className="mb-4">Oportunidades Actuales</h2>
          {ofertas.map((oferta) => (
            <div key={oferta.id} className={`card mb-3 ${oferta.destacada ? "border-primary" : ""}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className={`card-title mb-0 ${oferta.destacada ? "text-primary" : ""}`}>
                    {oferta.destacada && <Star className="me-2" size={20} />}
                    {oferta.titulo}
                  </h5>
                  {oferta.destacada && <span className="badge bg-primary">Destacada</span>}
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center text-muted mb-1">
                      <MapPin size={16} className="me-1" />
                      <small>{oferta.ubicacion}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center text-muted mb-1">
                      <Clock size={16} className="me-1" />
                      <small>{oferta.tipo}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center text-muted mb-1">
                      <DollarSign size={16} className="me-1" />
                      <small>{oferta.salario}</small>
                    </div>
                  </div>
                </div>

                <p className="card-text">{oferta.descripcion}</p>

                <div className="mb-3">
                  <h6>Requisitos:</h6>
                  <ul className="list-unstyled">
                    {oferta.requisitos.map((requisito, index) => (
                      <li key={index} className="text-muted">
                        <small>• {requisito}</small>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="btn btn-primary">Postularme</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="alert alert-info">
            <div className="d-flex align-items-center">
              <Briefcase className="me-2" size={20} />
              <div>
                <strong>¿No encontrás la posición ideal?</strong>
                <p className="mb-0">
                  Envianos tu CV a empleos@mundo-river.com y te contactaremos cuando surjan nuevas oportunidades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Empleo
