"use client"

import type React from "react"
import { useState } from "react"
import "../globals.css"
import Sidebar from "../components/Sidebar"
import styles from "./layout.module.css"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Botón flotante para móvil */}
      <button className={styles.floatingMenuButton} onClick={toggleSidebar} aria-label="Abrir menú de administración">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      </button>

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>{children}</div>
      </main>
    </div>
  )
}
