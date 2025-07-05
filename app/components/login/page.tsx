"use client"

import LoginForm from "../../components/login-form"
import styles from "./login.module.css"


export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          {/* Header con escudo de River */}
          <div className={styles.loginHeader}>
            <div className={styles.riverShield}>
              <img src="/images/river-logo.png" alt="Escudo River Plate" className={styles.shieldImage} />
            </div>
            <h1 className={styles.welcomeTitle}>MUNDO-RIVER</h1>
            <p className={styles.welcomeSubtitle}>Tienda Oficial</p>
          </div>

          {/* Formulario de login */}
          <LoginForm />

          {/* Footer del login */}
          <div className={styles.loginFooter}>
            <p className={styles.footerText}>
              ¿No tenés cuenta?{" "}
              <a href="/register" className={styles.registerLink}>
                Registrate acá
              </a>
            </p>
            <div className={styles.socialLogin}>
              <p className={styles.socialText}>O ingresá con:</p>
              <div className={styles.socialButtons}>
                <button className={styles.socialButton}>
                  <i className="bi bi-google"></i>
                  Google
                </button>
                <button className={styles.socialButton}>
                  <i className="bi bi-facebook"></i>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decoración lateral */}
        <div className={styles.decorationSide}>
          <div className={styles.riverPattern}>
            <div className={styles.patternElement}></div>
            <div className={styles.patternElement}></div>
            <div className={styles.patternElement}></div>
          </div>
          <div className={styles.motivationalText}>
            <h2>¡Vamos River!</h2>
            <p>Accedé a ofertas exclusivas y productos oficiales</p>
          </div>
        </div>
      </div>
    </div>
  )
}
