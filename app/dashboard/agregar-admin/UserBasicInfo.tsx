"use client"

import { useState } from "react"
import styles from "./UserBasicInfo.module.css"

interface Usuario {
  nombre: string
  email: string
  contrasena: string
  rol: string
}

interface UserBasicInfoProps {
  data: Usuario
  onChange: (data: Partial<Usuario>) => void
}

export default function UserBasicInfo({ data, onChange }: UserBasicInfoProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (field: keyof Usuario, value: string) => {
    onChange({ [field]: value })
  }

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    handleChange("contrasena", password)
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Información del Usuario</h2>
        <p className={styles.sectionDescription}>Completa los datos básicos del usuario administrador</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="nombre" className={styles.label}>
            Nombre completo *
          </label>
          <input
            type="text"
            id="nombre"
            value={data.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            className={styles.input}
            placeholder="Ej: Juan Pérez"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={styles.input}
            placeholder="Ej: juan@empresa.com"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="rol" className={styles.label}>
            Rol *
          </label>
          <select
            id="rol"
            value={data.rol}
            onChange={(e) => handleChange("rol", e.target.value)}
            className={styles.select}
            required
          >
            <option value="admin">Administrador</option>
            <option value="super_admin">Super Administrador</option>
            <option value="moderador">Moderador</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="contrasena" className={styles.label}>
            Contraseña *
          </label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="contrasena"
              value={data.contrasena}
              onChange={(e) => handleChange("contrasena", e.target.value)}
              className={styles.input}
              placeholder="Mínimo 8 caracteres"
              required
              minLength={8}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
            <button type="button" onClick={generatePassword} className={styles.generateButton}>
              Generar
            </button>
          </div>
          <p className={styles.hint}>
            La contraseña debe tener al menos 8 caracteres. Se recomienda usar una combinación de letras, números y
            símbolos.
          </p>
        </div>
      </div>
    </div>
  )
}
