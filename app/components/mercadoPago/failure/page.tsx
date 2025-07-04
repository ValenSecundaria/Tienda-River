"use client"

import Link from "next/link"

export default function FailurePage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Icono de error */}
        <div style={styles.iconError}>
          <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Contenido */}
        <h1 style={styles.title}>Pago Rechazado</h1>
        <p style={styles.description}>No pudimos procesar tu pago. Verificá tus datos e intentá nuevamente.</p>

        {/* Botones */}
        <div style={styles.buttonContainer}>
          <Link href="/" style={styles.secondaryButton}>
            Volver a la Tienda
          </Link>
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          ¿Necesitás ayuda?{" "}
          <a href="mailto:soporte@mundo-river.com" style={styles.link}>
            Contactanos
          </a>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center" as const,
  },
  iconError: {
    width: "80px",
    height: "80px",
    backgroundColor: "#f8d7da",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 30px",
    color: "#dc3545",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
    margin: "0 0 15px 0",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.5",
    marginBottom: "30px",
    margin: "0 0 30px 0",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    marginBottom: "30px",
  },
  primaryButton: {
    backgroundColor: "#dc2626",
    color: "white",
    padding: "15px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    display: "block",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    color: "#666",
    padding: "15px 20px",
    borderRadius: "8px",
    border: "2px solid #ddd",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s",
    textDecoration: "none",
    display: "block",
  },
  footer: {
    fontSize: "14px",
    color: "#999",
    margin: "0",
  },
  link: {
    color: "#dc2626",
    textDecoration: "none",
  },
}
