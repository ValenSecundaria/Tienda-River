"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import DashboardSkeleton from "../components/dashboard/DashboardSekeleton";

export default function DashboardPage() {
  const [stats, setStats] = useState<{
    productosTotales: number;
    ordenesPendientes: number;
    usuariosActivos: number;
    ingresosTotales: number;
    ventasDelDia: number;
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <DashboardSkeleton/>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Administrador - Tienda River</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Productos Totales</h3>
          <p className={styles.statNumber}>{stats.productosTotales}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Órdenes Pendientes</h3>
          <p className={styles.statNumber}>{stats.ordenesPendientes}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Usuarios Activos</h3>
          <p className={styles.statNumber}>{stats.usuariosActivos}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Ingresos Totales</h3>
          <p className={styles.statNumber}>${Number(stats.ingresosTotales).toLocaleString()}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Ventas Hoy</h3>
          <p className={styles.statNumber}>{stats.ventasDelDia}</p>
        </div>
      </div>
    </div>
  );
}
