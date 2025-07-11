"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./ProductCarrousel.module.css"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  nombre: string
  slug: string
  descripcion: string | null
  precio_base: number
  categoria_id: number | null
  subcategoria_id: number | null
  activo: boolean
  fecha_creacion: string
  imagen_principal: string | null
  categorias: {
    id: number
    nombre: string
  } | null
  subcategorias: {
    id: number
    nombre: string
  } | null
}

export default function ProductCarousel() {
  const [productos, setProductos] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const router = useRouter() 

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch("/api/productos")
        if (!res.ok) throw new Error("Error al cargar productos")
        const data: Product[] = await res.json()
        setProductos(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProductos()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === productos.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? productos.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 3000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, productos.length])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const handleProductClick = (product: Product) => {
    router.push(`/productos/${product.slug}`)
  }

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row text-center mb-4">
          <div className="col">
            <h2 className="display-5 fw-bold text-danger">Productos Destacados</h2>
            <p className="lead text-muted">Descubrí los productos más populares de la banda</p>
          </div>
        </div>

        <div
          className={styles.carouselContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={carouselRef}
        >
          {/* Botón anterior */}
          <button
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={prevSlide}
            aria-label="Producto anterior"
            disabled={productos.length === 0}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Contenedor de productos */}
          <div className={styles.carouselTrack}>
            <div
              className={styles.carouselSlides}
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {productos.map((product) => (
                <div key={product.id} className={styles.carouselSlide} onClick={() => handleProductClick(product)}>
                  <div className={styles.productImageContainer}>
                    <img
                      src={product.imagen_principal ?? "/placeholder.svg?height=300&width=400"}
                      alt={product.nombre}
                      className={styles.productImage}
                      loading="lazy"
                    />
                    <div className={styles.productOverlay}>
                      <h4 className={styles.productTitle}>{product.nombre}</h4>
                      <p className={styles.productPrice}>${product.precio_base.toLocaleString()}</p>
                      <span className={styles.clickHint}>Click para ver más</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón siguiente */}
          <button
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={nextSlide}
            aria-label="Siguiente producto"
            disabled={productos.length === 0}
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicadores */}
          <div className={styles.indicators}>
            {productos.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ""}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir al producto ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
