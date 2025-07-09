"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import ReCAPTCHA from "react-google-recaptcha"
import styles from "./registerForm.module.css"

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

interface RegisterFormProps {
  onSwitchToLogin?: () => void
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState<FormData | null>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setIsPending(true)

    const form = e.currentTarget as HTMLFormElement
    const fData = new FormData(form)
    setFormData(fData)

    if (recaptchaRef.current) {
      recaptchaRef.current.execute()
    } else {
      setErrorMessage("CAPTCHA no cargado correctamente.")
      setIsPending(false)
    }
  }

  const onCaptchaChange = async (token: string | null) => {
    if (!token) {
      setErrorMessage("No se pudo verificar el CAPTCHA.")
      setIsPending(false)
      return
    }
    if (!formData) {
      setErrorMessage("Formulario incompleto.")
      setIsPending(false)
      return
    }

    const data = Object.fromEntries(formData)
    const payload = {
      email: data.email,
      password: data.password,
      nombre: data.nombre,
      telefono: data.telefono,
      captcha: token,
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const json = await res.json()

      if (res.ok) {
        alert("Registro exitoso")
        router.push("/")
      } else {
        setErrorMessage(json.error || "Error al registrarse")
      }
    } catch (error) {
      setErrorMessage("Error al contactar el servidor")
    } finally {
      setIsPending(false)
      recaptchaRef.current?.reset()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formContent}>
        {/* Nombre */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="nombre">
            Nombre completo
          </label>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Tu nombre completo"
              required
            />
          </div>
        </div>

        {/* Teléfono */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="telefono">
            Teléfono
          </label>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="Tu número de teléfono"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        {/* Contraseña */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">
            Contraseña
          </label>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={6}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* reCAPTCHA invisible */}
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY}
          size="invisible"
          onChange={onCaptchaChange}
        />

        {/* Botón submit */}
        <button className={styles.button} type="submit" disabled={isPending}>
          {isPending ? "Registrando..." : "Registrarse"}
        </button>

        {/* Cambio a login */}
        {onSwitchToLogin && (
          <button
            type="button"
            className={styles.backToLoginButton}
            onClick={onSwitchToLogin}
          >
            ¿Ya tenés cuenta? Iniciar sesión
          </button>
        )}

        {/* Error */}
        {errorMessage && <div className={styles.errorMessage}>⚠️ {errorMessage}</div>}
      </div>
    </form>
  )
}

export default RegisterForm
