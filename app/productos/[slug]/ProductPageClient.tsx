"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import styles from "./ProductPage.module.css"

interface Producto {
  id: number
  nombre: string
  imagen_principal: string | null
  descripcion?: string | null
  precio_base: number
  categorias: { nombre: string } | null
  other_productos: Array<{
    talle: string
    color_nombre: string
    stock: number
  }>
}

export default function ProductPageClient({ producto }: { producto: Producto }) {
  const [selectedTalle, setSelectedTalle] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [stockSeleccionado, setStockSeleccionado] = useState<number | null>(null)

  const tallesDisponibles = useMemo(() => {
    const talles = [...new Set(producto.other_productos.map((p) => p.talle))]
    return talles.filter((talle) => talle)
  }, [producto.other_productos])

  const coloresDisponibles = useMemo(() => {
    if (!selectedTalle) return []
    const colores = producto.other_productos
      .filter((p) => p.talle === selectedTalle)
      .map((p) => ({
        color: p.color_nombre,
        stock: p.stock,
        disponible: p.stock > 0,
      }))

    const coloresUnicos = colores.reduce<Array<{ color: string; stock: number; disponible: boolean }>>((acc, curr) => {
      const existing = acc.find((c) => c.color === curr.color)
      if (!existing) {
        acc.push(curr)
      } else if (curr.stock > existing.stock) {
        existing.stock = curr.stock
        existing.disponible = curr.disponible
      }
      return acc
    }, [])

    return coloresUnicos.filter((c) => c.color)
  }, [selectedTalle, producto.other_productos])

  const obtenerStockActual = async (talle: string, color: string) => {
    try {
      const res = await fetch(`/api/stock?talle=${talle}&color=${color}&baseId=${producto.id}`)
      const data = await res.json()
      if (res.ok) {
        setStockSeleccionado(data.stock)
      } else {
        setStockSeleccionado(0)
        console.warn("Stock no disponible:", data)
      }
    } catch (error) {
      console.error("Error al obtener stock:", error)
      setStockSeleccionado(0)
    }
  }

  const handleTalleSelect = (talle: string) => {
    setSelectedTalle(talle)
    setSelectedColor(null)
    setStockSeleccionado(null)
  }

  const handleColorSelect = (color: string) => {
    if (!selectedTalle) return
    setSelectedColor(color)
    obtenerStockActual(selectedTalle, color)
  }

  const agregarAlCarrito = async () => {
    if (!selectedTalle || !selectedColor) return
    try {
      const res = await fetch("/api/carrito/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productoBaseId: producto.id,
          talle: selectedTalle,
          color: selectedColor,
        }),
      })
      if (res.ok) {
        window.dispatchEvent(new Event("carrito-update"))
      } else {
        const error = await res.json()
        console.error("Error al agregar al carrito:", error)
      }
    } catch (error) {
      console.error("Error de red:", error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.productWrapper}>
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <Image
              src={
                producto.imagen_principal ??
                "https://celadasa.vtexassets.com/arquivos/ids/230631-1200-auto?v=638197635089300000&width=1200&height=auto&aspect=true"
              }
              alt={producto.nombre}
              width={600}
              height={600}
              className={styles.productImage}
            />
          </div>

          <div className={styles.variantsSection}>
            {tallesDisponibles.length > 0 && (
              <div className={styles.variantGroup}>
                <h3 className={styles.variantTitle}>Talle</h3>
                <div className={styles.variantOptions}>
                  {tallesDisponibles.map((talle) => (
                    <button
                      key={talle}
                      className={`${styles.variantButton} ${selectedTalle === talle ? styles.variantButtonSelected : ""}`}
                      onClick={() => handleTalleSelect(talle)}
                    >
                      {talle}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedTalle && coloresDisponibles.length > 0 && (
              <div className={styles.variantGroup}>
                <h3 className={styles.variantTitle}>Color</h3>
                <div className={styles.variantOptions}>
                  {coloresDisponibles.map(({ color, disponible }) => (
                    <button
                      key={color}
                      className={`${styles.variantButton} ${selectedColor === color ? styles.variantButtonSelected : ""} ${
                        !disponible ? styles.variantButtonDisabled : ""
                      }`}
                      onClick={() => handleColorSelect(color)}
                      disabled={!disponible}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {stockSeleccionado !== null && (
              <div
                className={
                  stockSeleccionado > 0 && stockSeleccionado <= 3 ? styles.stockInfoLow : styles.stockInfo
                }
              >
                <span className={styles.stockText}>
                  {stockSeleccionado > 0 ? `${stockSeleccionado} unidades disponibles` : "Sin stock"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.productInfo}>
            <div className={styles.categoryBadge}>{producto.categorias?.nombre}</div>
            <h1 className={styles.productTitle}>{producto.nombre}</h1>
            <p className={styles.productDescription}>{producto.descripcion}</p>

            {(selectedTalle || selectedColor) && (
              <div className={styles.selectionSummary}>
                {selectedTalle && <span className={styles.selectionItem}>Talle: {selectedTalle}</span>}
                {selectedColor && <span className={styles.selectionItem}>Color: {selectedColor}</span>}
              </div>
            )}

            <div className={styles.priceSection}>
              <span className={styles.price}>${producto.precio_base.toString()}</span>
              <span className={styles.priceLabel}>Precio</span>
            </div>

            <div className={styles.actionSection}>
              <button
                onClick={agregarAlCarrito}
                className={`${styles.addToCartBtn} ${
                  !selectedTalle || !selectedColor || stockSeleccionado === 0 ? styles.addToCartBtnDisabled : ""
                }`}
                disabled={!selectedTalle || !selectedColor || stockSeleccionado === 0}
              >
                Añadir al carrito
              </button>

              <button className={styles.wishlistBtn}>
                Agregar a favoritos
              </button>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span>Envío gratis</span>
              </div>
              <div className={styles.feature}>
                <span>Devolución gratuita</span>
              </div>
              <div className={styles.feature}>
                <span>Compra segura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
