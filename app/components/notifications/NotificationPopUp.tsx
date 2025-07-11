"use client"

import { useEffect, useState } from "react"
import { registerServiceWorker, subscribeUserToPush } from "@/app/lib/push"

export default function NotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        setShowPrompt(true)
      } else if (Notification.permission === "granted") {
        // Ya está permitido, registramos igual
        handleAllow()
      }
    }
  }, [])

  const handleAllow = async () => {
    let permission = Notification.permission

    // Si todavía no pidió permiso, lo pedimos
    if (permission === "default") {
      permission = await Notification.requestPermission()
      console.log("Permiso de notificación:", permission)
    }

    if (permission === "granted") {
      try {
        const registration = await registerServiceWorker()
        const sub = await subscribeUserToPush(registration)

        await fetch("/api/web-push/subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscription: sub }),
        })

        console.log("✅ Suscripción push guardada con éxito")
      } catch (err) {
        console.error("❌ Error al registrar la suscripción push", err)
      }
    }

    setShowPrompt(false)
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
        <div style={{ marginBottom: "1.5rem" }}>
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

        <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "0.5rem" }}>
          ¡Sumate a la banda!
        </h3>

        <p style={{ fontSize: "1rem", color: "#6b7280", marginBottom: "2rem", lineHeight: "1.5" }}>
          Recibí notificaciones sobre ofertas exclusivas, nuevos productos y promociones especiales de Tienda River.
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexDirection: typeof window !== "undefined" && window.innerWidth < 400 ? "column" : "row",
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
          >
            🎉 Unirme a la banda
          </button>
        </div>

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
