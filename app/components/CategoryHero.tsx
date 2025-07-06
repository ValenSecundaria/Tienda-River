"use client"

import { useEffect, useState } from "react"
import styles from "./CategoryHero.module.css"

interface CategoryHeroProps {
  categoryName?: string
  categoryDescription?: string
  categoryImage?: string | null
  productCount?: number
}

export default function CategoryHero({
  categoryName,
  categoryDescription,
  categoryImage,
  productCount = 0,
}: CategoryHeroProps) {
  const [heroHeight, setHeroHeight] = useState("400px")

  useEffect(() => {
    function ajustarAlturaHero() {
      const ancho = window.innerWidth
      if (ancho < 576) {
        // pantallas muy chicas (celulares)
        setHeroHeight("250px")
      } else if (ancho < 992) {
        // tablets o pantallas medianas
        setHeroHeight("300px")
      } else {
        // pantallas grandes
        setHeroHeight("400px")
      }
    }

    ajustarAlturaHero()
    window.addEventListener("resize", ajustarAlturaHero)
    return () => window.removeEventListener("resize", ajustarAlturaHero)
  }, [])

  return (
    <section className={styles.categoryHero} style={{ minHeight: heroHeight }}>
      {/* Imagen de fondo si existe */}
      {categoryImage && (
        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: `url(${categoryImage})`,
          }}
        />
      )}

      {/* Overlay */}
      <div className={styles.heroOverlay}>
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-12 col-lg-8">
              {/* Breadcrumb */}
              <nav className={styles.breadcrumb}>
                <span className={styles.breadcrumbItem}>Inicio</span>
                <span className={styles.breadcrumbSeparator}>›</span>
                <span className={styles.breadcrumbCurrent}>{categoryName || "Categoría"}</span>
              </nav>

              {/* Título principal */}
              <h1 className={styles.categoryTitle}>{categoryName || "Productos"}</h1>

              {/* Descripción */}
              {categoryDescription && <p className={styles.categoryDescription}>{categoryDescription}</p>}

              {/* Contador de productos */}
              <div className={styles.productCounter}>
                <span className={styles.counterNumber}>{productCount}</span>
                <span className={styles.counterText}>
                  producto{productCount !== 1 ? "s" : ""} disponible{productCount !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Decoración */}
              <div className={styles.heroDecoration}>
                <div className={styles.decorationLine}></div>
                <div className={styles.decorationDot}></div>
                <div className={styles.decorationLine}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onda decorativa en la parte inferior */}
      <div className={styles.waveDecoration}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  )
}
