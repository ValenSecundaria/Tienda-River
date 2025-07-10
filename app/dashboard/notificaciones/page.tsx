import NotificationForm from "@/app/components/notifications/NotificationForm"
import styles from "./page.module.css"

export default function NotificationsPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Gestión de Notificaciones</h1>
        <p className={styles.pageDescription}>Envía notificaciones push promocionales a todos tus usuarios suscritos</p>
      </div>

     <NotificationForm />
    </div>
  )
}
