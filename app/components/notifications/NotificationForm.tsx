"use client"

import type React from "react"
import { useState, useTransition } from "react"
import styles from "./NotificationForm.module.css"

const ICON = process.env.NEXT_PUBLIC_NOTIFICATION_ICON || "/icon.png"
const URL = process.env.NEXT_PUBLIC_NOTIFICATION_URL || "https://proyecto-2-gemetro-didier-fdke.vercel.app"

export default function NotificationForm() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)

    if (!formData.title.trim()) {
      setMessage({ type: "error", text: "El título es requerido" })
      return
    }

    if (!formData.body.trim()) {
      setMessage({ type: "error", text: "La descripción es requerida" })
      return
    }

    if (formData.title.length > 100) {
      setMessage({ type: "error", text: "El título no puede exceder 100 caracteres" })
      return
    }

    if (formData.body.length > 300) {
      setMessage({ type: "error", text: "La descripción no puede exceder 300 caracteres" })
      return
    }

    startTransition(async () => {
      try {
        const notificationData = {
          title: formData.title.trim(),
          body: formData.body.trim(),
          icon: ICON,
          url: URL,
        }

        const response = await fetch("/api/web-push/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData),
        })

        if (!response.ok) {
          const errorData = await response.json()
          setMessage({
            type: "error",
            text: errorData.error || "Error al enviar la notificación",
          })
          return
        }

        const result = await response.json()
        setMessage({
          type: "success",
          text: result.message || "Notificación enviada exitosamente",
        })

        setFormData({ title: "", body: "" })
      } catch (error) {
        console.error("Error:", error)
        setMessage({ type: "error", text: "Error de conexión al enviar la notificación" })
      }
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>📢 Enviar Notificación Push</h2>
        <p className={styles.subtitle}>Envía notificaciones promocionales a todos los usuarios suscritos</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Título de la Promoción *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className={styles.input}
            placeholder="Ej: ¡50% OFF en toda la tienda!"
            maxLength={100}
            required
          />
          <span className={styles.charCount}>{formData.title.length}/100 caracteres</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="body" className={styles.label}>
            Descripción *
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={(e) => handleInputChange("body", e.target.value)}
            className={styles.textarea}
            placeholder="Describe tu promoción aquí. Ej: Aprovecha esta oferta especial por tiempo limitado. ¡No te lo pierdas! 🎉"
            maxLength={300}
            rows={4}
            required
          />
          <span className={styles.charCount}>{formData.body.length}/300 caracteres</span>
        </div>

        <div className={styles.preview}>
          <h3 className={styles.previewTitle}>Vista Previa:</h3>
          <div className={styles.notificationPreview}>
            <div className={styles.notificationIcon}>📢</div>
            <div className={styles.notificationContent}>
              <div className={styles.notificationTitle}>{formData.title || "Título de la promoción"}</div>
              <div className={styles.notificationBody}>{formData.body || "Descripción de la promoción"}</div>
            </div>
          </div>
        </div>

        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.type === "success" ? "✅" : "❌"} {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || !formData.title.trim() || !formData.body.trim()}
          className={styles.submitButton}
        >
          {isPending ? (
            <>
              <span className={styles.spinner}></span>
              Enviando...
            </>
          ) : (
            <>📤 Enviar Notificación</>
          )}
        </button>
      </form>

      <div className={styles.infoSection}>
        <h3 className={styles.infoTitle}>💡 Consejos para mejores notificaciones:</h3>
        <ul className={styles.tipsList}>
          <li>Usa títulos llamativos pero concisos</li>
          <li>Incluye emojis para mayor atractivo visual</li>
          <li>Menciona descuentos específicos (ej: "50% OFF")</li>
          <li>Crea urgencia con frases como "por tiempo limitado"</li>
          <li>Personaliza según la temporada o eventos especiales</li>
        </ul>
      </div>
    </div>
  )
}
