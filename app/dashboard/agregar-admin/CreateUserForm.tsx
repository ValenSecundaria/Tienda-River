"use client"

import type React from "react"
import { useState } from "react"
import { createUser } from "@/app/lib/create-user"
import UserBasicInfo from "./UserBasicInfo"
import styles from "./CreateUserForm.module.css"

interface Usuario {
  nombre: string
  email: string
  contrasena: string
  rol: string
}

export default function CreateUserForm() {
  const [userData, setUserData] = useState<Usuario>({
    nombre: "",
    email: "",
    contrasena: "",
    rol: "admin",
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleUserDataChange = (data: Partial<Usuario>) => {
    setUserData((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    // Validaciones del lado cliente
    if (!userData.nombre || !userData.email || !userData.contrasena) {
      setError("Todos los campos son requeridos")
      setSubmitting(false)
      return
    }

    if (userData.contrasena.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres")
      setSubmitting(false)
      return
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) {
      setError("Por favor ingresa un email válido")
      setSubmitting(false)
      return
    }

    // Crear FormData
    const formDataToSend = new FormData()
    Object.entries(userData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })

    const result = await createUser(formDataToSend)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      // Resetear formulario
      setUserData({
        nombre: "",
        email: "",
        contrasena: "",
        rol: "admin",
      })
    }

    setSubmitting(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Agregar Nuevo Usuario</h1>
        <p className={styles.subtitle}>Completa la información del usuario administrador</p>
      </div>

      {error && (
        <div className={styles.error}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      {success && (
        <div className={styles.success}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12" />
          </svg>
          ¡Usuario creado exitosamente!
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <UserBasicInfo data={userData} onChange={handleUserDataChange} />

        <div className={styles.actions}>
          <a href="/dashboard" className={styles.cancelButton}>
            Cancelar
          </a>
          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? (
              <>
                <div className={styles.buttonSpinner}></div>
                Creando Usuario...
              </>
            ) : (
              "Crear Usuario"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
