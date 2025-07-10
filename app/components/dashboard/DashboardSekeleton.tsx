"use client"
import styles from "./DashboardSekeleton.module.css"

export default function DashboardSkeleton() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonSubtitle}></div>
      </header>

      <div className={styles.statsGrid}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.skeletonCardTitle}></div>
            <div className={styles.skeletonCardNumber}></div>
          </div>
        ))}
      </div>
    </div>
  )
}
