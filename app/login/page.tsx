import LoginForm from "@/app/components/login-form"
import { Suspense } from "react"
import styles from "./loginPage.module.css"
import Image from "next/image"

export default function LoginPage() {
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
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}
