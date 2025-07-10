import styles from "./LoadingScreen.module.css"

export default function LoadingScreen() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.logoContainer}>
          <img src="/images/river-logo.png" alt="Tienda River Logo" className={styles.loadingLogo} />
        </div>
        <h2 className={styles.loadingText}>Cargando la tienda...</h2>
        <div className={styles.loadingDots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}
