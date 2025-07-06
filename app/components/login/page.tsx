"use client"

import LoginForm from "@/app/components/login-form"
import RegisterForm from "@/app/components/register/Register"
import { Suspense, useState } from "react"
import styles from "./loginPage.module.css"
import Image from "next/image"


export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(true)

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/river-logo.png"
            alt="River Plate Logo"
            width={100}
            height={100}
            className={styles.logoImage}
            priority
          />
        </div>
        <Suspense fallback={<div>Cargando...</div>}>
          {showRegister ? (
            <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
          ) : (
            <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
          )}
        </Suspense>
      </div>
    </main>
  )
}
