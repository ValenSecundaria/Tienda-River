"use client"

import type React from "react"
import { useState } from "react"
import { Briefcase, Users, Heart, Star, MapPin, Clock, DollarSign, X, Upload, CheckCircle } from "lucide-react"

const Empleo: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string>("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    curriculum: null as File | null,
  })

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

  const handlePostularse = (tituloTrabajo: string) => {
    setSelectedJob(tituloTrabajo)
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      curriculum: null,
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, curriculum: file }))
    } else {
      alert("Por favor, selecciona un archivo PDF válido.")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que todos los campos estén completos
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono || !formData.curriculum) {
      alert("Por favor, completa todos los campos obligatorios.")
      return
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, ingresa un email válido.")
      return
    }

    // Simular envío exitoso
    setShowPopup(false)
    setShowSuccess(true)

    // Limpiar formulario
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      curriculum: null,
    })

    // Ocultar notificación después de 5 segundos
    setTimeout(() => {
      setShowSuccess(false)
    }, 5000)
  }

  return (
    <>
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
                    Trabajar en MUNDO-RIVER significa ser parte de la pasión millonaria. Ofrecemos un ambiente de
                    trabajo único donde tu amor por River se combina con oportunidades de crecimiento profesional.
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
                  <button className="btn btn-primary" onClick={() => handlePostularse(oferta.titulo)}>
                    Postularme
                  </button>
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

      {/* Popup de Postulación */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Postularse para: {selectedJob}</h4>
              <button className="btn-close" onClick={handleClosePopup}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellido" className="form-label">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    className="form-control"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange("apellido", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    className="form-control"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="curriculum" className="form-label">
                  Curriculum Vitae (PDF) *
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="curriculum"
                    className="form-control"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="file-upload-info">
                    <Upload size={20} className="me-2" />
                    {formData.curriculum ? (
                      <span className="text-success">Archivo seleccionado: {formData.curriculum.name}</span>
                    ) : (
                      <span className="text-muted">Selecciona tu CV en formato PDF</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosePopup}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Enviar Postulación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notificación de Éxito */}
      {showSuccess && (
        <div className="success-notification">
          <div className="success-content">
            <CheckCircle size={24} className="text-success me-2" />
            <span>¡Solicitud enviada con éxito!</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1050;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .modal-header {
          display: flex;
          justify-content: between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #dee2e6;
        }

        .modal-title {
          margin: 0;
          color: #333;
          flex: 1;
        }

        .btn-close {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .btn-close:hover {
          background-color: #f8f9fa;
          color: #333;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .form-label {
          font-weight: 500;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .form-control {
          border: 1px solid #ced4da;
          border-radius: 4px;
          padding: 0.75rem;
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
          outline: none;
        }

        .file-upload-container {
          position: relative;
        }

        .file-upload-info {
          display: flex;
          align-items: center;
          margin-top: 0.5rem;
          padding: 0.5rem;
          background-color: #f8f9fa;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          padding: 1.5rem;
          border-top: 1px solid #dee2e6;
          margin-top: 1rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background-color: #0d6efd;
          color: white;
        }

        .btn-primary:hover {
          background-color: #0b5ed7;
        }

        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background-color: #5c636a;
        }

        .success-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: white;
          border: 1px solid #d4edda;
          border-radius: 8px;
          padding: 1rem 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1060;
          animation: slideIn 0.3s ease-out;
        }

        .success-content {
          display: flex;
          align-items: center;
          color: #155724;
          font-weight: 500;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .modal-content {
            width: 95%;
            margin: 1rem;
          }
          
          .modal-header,
          .modal-body,
          .modal-footer {
            padding: 1rem;
          }
          
          .success-notification {
            top: 10px;
            right: 10px;
            left: 10px;
            right: 10px;
          }
        }
      `}</style>
    </>
  )
}

export default Empleo
