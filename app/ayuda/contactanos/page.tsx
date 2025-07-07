"use client"

import type React from "react"
import { useState, useEffect } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoConsulta: "",
    mensaje: "",
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Estilos
  const styles = {
    contactPage: {
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "3rem 1rem",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      lineHeight: "1.6",
      color: "#333",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    pageHeader: {
      textAlign: "center" as const,
      marginBottom: "3rem",
    },
    pageHeaderH1: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#222",
      marginBottom: "1rem",
      margin: "0 0 1rem 0",
    },
    pageHeaderP: {
      fontSize: "1.125rem",
      color: "#666",
      maxWidth: "600px",
      margin: "0 auto",
    },
    contactGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
      gap: "2rem",
      marginBottom: "2rem",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
      overflow: "hidden",
      height: "100%",
    },
    cardHeader: {
      padding: "1.5rem",
      borderBottom: "1px solid #eee",
    },
    cardHeaderH2: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
      margin: "0 0 0.5rem 0",
    },
    cardHeaderP: {
      color: "#666",
      fontSize: "0.9rem",
      margin: "0",
    },
    cardContent: {
      padding: "1.5rem",
    },
    contactItem: {
      display: "flex",
      marginBottom: "1.5rem",
    },
    contactIcon: {
      fontSize: "1.25rem",
      marginRight: "1rem",
      minWidth: "24px",
    },
    contactLabel: {
      fontWeight: "600",
      marginBottom: "0.25rem",
      margin: "0 0 0.25rem 0",
    },
    contactText: {
      color: "#666",
      marginBottom: "0.25rem",
      margin: "0 0 0.25rem 0",
    },
    contactForm: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "1rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const,
    },
    formLabel: {
      fontWeight: "500",
      marginBottom: "0.5rem",
      color: "#444",
    },
    formInput: {
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem",
      transition: "border-color 0.2s",
      outline: "none",
    },
    formTextarea: {
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem",
      transition: "border-color 0.2s",
      outline: "none",
      resize: "vertical" as const,
      minHeight: "120px",
    },
    formSelect: {
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem",
      transition: "border-color 0.2s",
      outline: "none",
      backgroundColor: "#fff",
    },
    submitButton: {
      backgroundColor: "#333",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
      alignSelf: isMobile ? "stretch" : "flex-start",
    },
    faqSection: {
      marginTop: "3rem",
    },
    faqGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "1.5rem",
    },
    faqItemH4: {
      fontWeight: "600",
      marginBottom: "0.5rem",
      color: "#333",
      margin: "0 0 0.5rem 0",
    },
    faqItemP: {
      color: "#666",
      fontSize: "0.9rem",
      margin: "0",
    },
  }

  return (
    <div style={styles.contactPage}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageHeaderH1}>Contáctanos</h1>
          <p style={styles.pageHeaderP}>
            ¿Tienes alguna pregunta sobre nuestros productos o necesitas ayuda con tu pedido? Estamos aquí para
            ayudarte.
          </p>
        </div>

        <div style={styles.contactGrid}>
          {/* Información de contacto */}
          <div>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardHeaderH2}>Información de Contacto</h2>
                <p style={styles.cardHeaderP}>Ponte en contacto con nosotros a través de cualquiera de estos medios</p>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.contactItem}>
                  <div style={styles.contactIcon}>✉️</div>
                  <div>
                    <p style={styles.contactLabel}>Email</p>
                    <p style={styles.contactText}>info@tutienda.com</p>
                    <p style={styles.contactText}>ventas@tutienda.com</p>
                  </div>
                </div>

                <div style={styles.contactItem}>
                  <div style={styles.contactIcon}>📞</div>
                  <div>
                    <p style={styles.contactLabel}>Teléfono</p>
                    <p style={styles.contactText}>+34 123 456 789</p>
                    <p style={styles.contactText}>WhatsApp: +34 987 654 321</p>
                  </div>
                </div>

                <div style={styles.contactItem}>
                  <div style={styles.contactIcon}>📍</div>
                  <div>
                    <p style={styles.contactLabel}>Dirección</p>
                    <p style={styles.contactText}>
                      Calle de la Moda, 123
                      <br />
                      28001 Madrid, España
                    </p>
                  </div>
                </div>

                <div style={styles.contactItem}>
                  <div style={styles.contactIcon}>🕒</div>
                  <div>
                    <p style={styles.contactLabel}>Horario de Atención</p>
                    <p style={styles.contactText}>
                      Lunes a Viernes: 9:00 - 18:00
                      <br />
                      Sábados: 10:00 - 14:00
                      <br />
                      Domingos: Cerrado
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardHeaderH2}>Envíanos un Mensaje</h2>
                <p style={styles.cardHeaderP}>Completa el formulario y te responderemos en menos de 24 horas</p>
              </div>
              <div style={styles.cardContent}>
                <form onSubmit={handleSubmit} style={styles.contactForm}>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label htmlFor="nombre" style={styles.formLabel}>
                        Nombre completo *
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={(e) => handleChange("nombre", e.target.value)}
                        required
                        style={{
                          ...styles.formInput,
                          borderColor: formData.nombre ? "#666" : "#ddd",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#666")}
                        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label htmlFor="email" style={styles.formLabel}>
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        style={styles.formInput}
                        onFocus={(e) => (e.target.style.borderColor = "#666")}
                        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                      />
                    </div>
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label htmlFor="telefono" style={styles.formLabel}>
                        Teléfono
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        placeholder="+34 123 456 789"
                        value={formData.telefono}
                        onChange={(e) => handleChange("telefono", e.target.value)}
                        style={styles.formInput}
                        onFocus={(e) => (e.target.style.borderColor = "#666")}
                        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label htmlFor="tipoConsulta" style={styles.formLabel}>
                        Tipo de consulta *
                      </label>
                      <select
                        id="tipoConsulta"
                        value={formData.tipoConsulta}
                        onChange={(e) => handleChange("tipoConsulta", e.target.value)}
                        required
                        style={styles.formSelect}
                        onFocus={(e) => (e.target.style.borderColor = "#666")}
                        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                      >
                        <option value="" disabled>
                          Selecciona una opción
                        </option>
                        <option value="producto">Consulta sobre producto</option>
                        <option value="pedido">Estado de pedido</option>
                        <option value="devolucion">Devolución/Cambio</option>
                        <option value="tallas">Guía de tallas</option>
                        <option value="envio">Información de envío</option>
                        <option value="colaboracion">Colaboraciones</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="mensaje" style={styles.formLabel}>
                      Mensaje *
                    </label>
                    <textarea
                      id="mensaje"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                      rows={5}
                      value={formData.mensaje}
                      onChange={(e) => handleChange("mensaje", e.target.value)}
                      required
                      style={styles.formTextarea}
                      onFocus={(e) => (e.target.style.borderColor = "#666")}
                      onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                    ></textarea>
                  </div>

                  <button
                      type="submit"
                      style={styles.submitButton}
                      onMouseEnter={(e) => {
                        (e.target as HTMLButtonElement).style.backgroundColor = "#222";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLButtonElement).style.backgroundColor = "#333";
                      }}
                    >
                      Enviar Mensaje
                    </button>

                </form>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={styles.faqSection}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardHeaderH2}>Preguntas Frecuentes</h2>
              <p style={styles.cardHeaderP}>Encuentra respuestas rápidas a las consultas más comunes</p>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.faqGrid}>
                <div>
                  <h4 style={styles.faqItemH4}>¿Cuál es el tiempo de entrega?</h4>
                  <p style={styles.faqItemP}>
                    Los pedidos se entregan en 2-3 días laborables para península y 5-7 días para islas.
                  </p>
                </div>

                <div>
                  <h4 style={styles.faqItemH4}>¿Puedo devolver un producto?</h4>
                  <p style={styles.faqItemP}>Sí, tienes 30 días para devolver cualquier producto en perfecto estado.</p>
                </div>

                <div>
                  <h4 style={styles.faqItemH4}>¿Cómo sé mi talla correcta?</h4>
                  <p style={styles.faqItemP}>
                    Consulta nuestra guía de tallas en cada producto o contáctanos para asesoramiento personalizado.
                  </p>
                </div>

                <div>
                  <h4 style={styles.faqItemH4}>¿Ofrecen descuentos por volumen?</h4>
                  <p style={styles.faqItemP}>
                    Sí, ofrecemos descuentos especiales para compras al por mayor. Contáctanos para más información.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
