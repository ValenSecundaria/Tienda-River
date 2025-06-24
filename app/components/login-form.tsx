"use client"

import { useActionState } from "react"
import { authenticate } from "../lib/action"
import { useSearchParams } from "next/navigation"
import styles from "./loginForm.module.css"

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.formContent}>
        <h1 className={styles.title}>¡Bienvenido!</h1>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            Mail
          </label>
          <div className={styles.inputContainer}>
            <input className={styles.input} id="email" type="email" name="email" placeholder="" required />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">
            Contraseña
          </label>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              id="password"
              type="password"
              name="password"
              placeholder=""
              required
              minLength={6}
            />
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <button className={styles.button} aria-disabled={isPending} disabled={isPending}>
          {isPending && <span className={styles.loadingSpinner}></span>}
          {isPending ? "Ingresando..." : "Ingresar"}
        </button>

        <div className={styles.forgotPassword}>
          <a href="#" className={styles.forgotPasswordLink}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <div className={styles.errorContainer} aria-live="polite" aria-atomic="true">
          {errorMessage && <p className={styles.errorMessage}>⚠️ {errorMessage}</p>}
        </div>
      </div>
    </form>
  )
}
