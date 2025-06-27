import styles from "./page.module.css"

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Administrador-Tienda River</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Productos Totales</h3>
          <p className={styles.statNumber}>1,234</p>
          <span className={styles.statChange}>+12% este mes</span>
        </div>

        <div className={styles.statCard}>
          <h3>Órdenes Pendientes</h3>
          <p className={styles.statNumber}>56</p>
          <span className={styles.statChange}>+8% esta semana</span>
        </div>

        <div className={styles.statCard}>
          <h3>Usuarios Activos</h3>
          <p className={styles.statNumber}>2,891</p>
          <span className={styles.statChange}>+15% este mes</span>
        </div>

        <div className={styles.statCard}>
          <h3>Ingresos</h3>
          <p className={styles.statNumber}>$45,678</p>
          <span className={styles.statChange}>+23% este mes</span>
        </div>
      </div>
    </div>
  )
}
