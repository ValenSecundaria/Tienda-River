"use client"

import Link from "next/link"

export default function PendingPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Icono de pendiente */}
        <div style={styles.iconPending}>
          <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Contenido */}
        <h1 style={styles.title}>Pago Pendiente</h1>
        <p style={styles.description}>Tu pago está siendo procesado. Te notificaremos cuando se confirme.</p>

        {/* Info adicional */}
        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            El proceso puede tardar entre 1 a 3 días hábiles. No realices el pago nuevamente.
          </p>
        </div>

        {/* Botones */}
        <div style={styles.buttonContainer}>
          <Link href="/" style={styles.primaryButton}>
            Volver a la Tienda
          </Link>
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          ¿Consultas?{" "}
          <a href="mailto:pagos@mundo-river.com" style={styles.link}>
            Escribinos
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
  iconPending: {
    width: "80px",
    height: "80px",
    backgroundColor: "#fff3cd",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 30px",
    color: "#856404",
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
    marginBottom: "20px",
    margin: "0 0 20px 0",
  },
  infoBox: {
    backgroundColor: "#fff3cd",
    border: "1px solid #ffeaa7",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "30px",
  },
  infoText: {
    fontSize: "14px",
    color: "#856404",
    margin: "0",
    lineHeight: "1.4",
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
