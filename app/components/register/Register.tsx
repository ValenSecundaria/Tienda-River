"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./registerForm.module.css"

declare global {
  interface Window {
    onCaptchaSuccess: (token: string) => void
  }
}

interface RegisterFormProps {
  onSwitchToLogin?: () => void
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [captchaToken, setCaptchaToken] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    window.onCaptchaSuccess = (token: string) => {
      setCaptchaToken(token)
    }
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!captchaToken) {
      setErrorMessage("Por favor completá el CAPTCHA.")
      return
    }

    setIsPending(true)
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const payload = {
      email: data.email,
      password: data.password,
      nombre: data.nombre,
      telefono: data.telefono,
      captcha: captchaToken,
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
      setErrorMessage("Error en la comunicación con el servidor")
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formContent}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="nombre">
            Nombre completo
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.inputIcon}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
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

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="telefono">
            Teléfono
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.inputIcon}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
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

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.inputIcon}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input className={styles.input} id="email" name="email" type="email" placeholder="tu@email.com" required />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">
            Contraseña
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.inputIcon}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              className={styles.input}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={6}
            />
            <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={styles.captchaContainer}>
          <div
            className="g-recaptcha"
            data-sitekey="6LeN6XcrAAAAACuR4-8j1x1uGeEEYyiJtzkewTm-"
            data-callback="onCaptchaSuccess"
          ></div>
        </div>

        <button className={styles.button} type="submit" aria-disabled={isPending} disabled={isPending}>
          {isPending && <span className={styles.loadingSpinner}></span>}
          {isPending ? "Registrando..." : "Registrarse"}
        </button>

        {onSwitchToLogin && (
          <button type="button" className={styles.backToLoginButton} onClick={onSwitchToLogin}>
            ¿Ya tenés cuenta? Iniciar sesión
          </button>
        )}

        <div className={styles.errorContainer} aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <div className={styles.errorMessage}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </form>
  )
}

export default RegisterForm
