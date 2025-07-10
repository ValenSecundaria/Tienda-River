"use client"

import { useEffect, useState } from "react"

export default function NotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        // Solo mostrar si no fue aceptado ni rechazado
        setShowPrompt(true)
      }
    }
  }, [])

  const handleAllow = () => {
    Notification.requestPermission().then((permission) => {
      console.log("Permiso de notificación:", permission)
      setShowPrompt(false)
    })
  }

  const handleDeny = () => {
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9998,
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          padding: "2rem",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          zIndex: 9999,
          width: "90%",
          maxWidth: "400px",
          textAlign: "center" as const,
          border: "1px solid rgba(229, 231, 235, 0.8)",
          animation: "slideIn 0.3s ease-out",
        }}
      >
        {/* Logo */}
        <div
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <img
            src="/images/river-logo.png"
            alt="Tienda River Logo"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain",
              margin: "0 auto",
              display: "block",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Título */}
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "0.5rem",
            lineHeight: "1.3",
          }}
        >
          ¡Sumate a la banda!
        </h3>

        {/* Descripción */}
        <p
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            marginBottom: "2rem",
            lineHeight: "1.5",
            fontWeight: "400",
          }}
        >
          Recibí notificaciones sobre ofertas exclusivas, nuevos productos y promociones especiales de Tienda River.
        </p>

        {/* Botones */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexDirection: window.innerWidth < 400 ? ("column" as const) : ("row" as const),
          }}
        >
          <button
            onClick={handleDeny}
            style={{
              flex: "1",
              padding: "0.75rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: "500",
              border: "2px solid #e5e7eb",
              backgroundColor: "transparent",
              color: "#6b7280",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f9fafb"
              e.currentTarget.style.borderColor = "#d1d5db"
              e.currentTarget.style.color = "#374151"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.borderColor = "#e5e7eb"
              e.currentTarget.style.color = "#6b7280"
            }}
          >
            Rechazar
          </button>

          <button
            onClick={handleAllow}
            style={{
              flex: "1",
              padding: "0.75rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: "600",
              border: "none",
              background: "linear-gradient(135deg,rgb(255, 73, 73) 0%,rgb(216, 29, 29) 100%)",
              color: "white",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              outline: "none",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)"
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(246, 59, 59, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(246, 59, 59, 0.3)"
            }}
          >
            🎉 Unirme a la banda
          </button>
        </div>

        {/* Texto pequeño */}
        <p
          style={{
            fontSize: "0.75rem",
            color: "#9ca3af",
            marginTop: "1rem",
            lineHeight: "1.4",
          }}
        >
          Podés cambiar esta configuración en cualquier momento desde tu navegador
        </p>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @media (max-width: 480px) {
          div[style*="padding: 2rem"] {
            padding: 1.5rem !important;
            width: 95% !important;
          }
        }
      `}</style>
    </>
  )
}
