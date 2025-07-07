"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import styles from "./ProductPage.module.css"



export default function ProductPageClient({ producto }) {
  const [selectedTalle, setSelectedTalle] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)

  // Obtener todos los talles únicos
  const tallesDisponibles = useMemo(() => {
    const talles = [...new Set(producto.other_productos.map((p) => p.talle))]
    return talles.filter((talle) => talle) // Filtrar valores null/undefined
  }, [producto.other_productos])

  // Obtener colores disponibles para el talle seleccionado
  const coloresDisponibles = useMemo(() => {
    if (!selectedTalle) return []
    const colores = producto.other_productos
      .filter((p) => p.talle === selectedTalle)
      .map((p) => ({
        color: p.color_nombre,
        stock: p.stock,
        disponible: p.stock > 0,
      }))

    // Eliminar duplicados y mantener info de stock
    const coloresUnicos = colores.reduce((acc, curr) => {
      const existing = acc.find((c) => c.color === curr.color)
      if (!existing) {
        acc.push(curr)
      } else if (curr.stock > existing.stock) {
        // Mantener el que tenga más stock
        existing.stock = curr.stock
        existing.disponible = curr.disponible
      }
      return acc
    }, [])

    return coloresUnicos.filter((c) => c.color) // Filtrar valores null/undefined
  }, [selectedTalle, producto.other_productos])

  // Verificar si una combinación talle-color tiene stock
  const tieneStock = (talle, color) => {
    const variante = producto.other_productos.find((p) => p.talle === talle && p.color_nombre === color)
    return variante && variante.stock > 0
  }

  // Obtener stock de la combinación seleccionada
  const stockSeleccionado = useMemo(() => {
    if (!selectedTalle || !selectedColor) return null
    const variante = producto.other_productos.find((p) => p.talle === selectedTalle && p.color_nombre === selectedColor)
    return variante ? variante.stock : 0
  }, [selectedTalle, selectedColor, producto.other_productos])

  const handleTalleSelect = (talle) => {
    setSelectedTalle(talle)
    setSelectedColor(null) // Reset color cuando cambia el talle
  }

  const handleColorSelect = (color) => {
    if (tieneStock(selectedTalle, color)) {
      setSelectedColor(color)
    }
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
        //setMensajeVisible(true);
        //setTimeout(() => setMensajeVisible(false), 2500);
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
        {/* Imagen del producto */}
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <Image
              src={
                producto.imagen_principal ??
                ("https://celadasa.vtexassets.com/arquivos/ids/230631-1200-auto?v=638197635089300000&width=1200&height=auto&aspect=true")
              }
              alt={producto.nombre}
              width={600}
              height={600}
              className={styles.productImage}
            />
          </div>

          {/* Sección de selección de variantes */}
          <div className={styles.variantsSection}>
            {/* Selección de Talle */}
            {tallesDisponibles.length > 0 && (
              <div className={styles.variantGroup}>
                <h3 className={styles.variantTitle}>Talle</h3>
                <div className={styles.variantOptions}>
                  {tallesDisponibles.map((talle) => (
                    <button
                      key={talle}
                      className={`${styles.variantButton} ${
                        selectedTalle === talle ? styles.variantButtonSelected : ""
                      }`}
                      onClick={() => handleTalleSelect(talle)}
                    >
                      {talle}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selección de Color */}
            {selectedTalle && coloresDisponibles.length > 0 && (
              <div className={styles.variantGroup}>
                <h3 className={styles.variantTitle}>Color</h3>
                <div className={styles.variantOptions}>
                  {coloresDisponibles.map(({ color, disponible }) => (
                    <button
                      key={color}
                      className={`${styles.variantButton} ${
                        selectedColor === color ? styles.variantButtonSelected : ""
                      } ${!disponible ? styles.variantButtonDisabled : ""}`}
                      onClick={() => handleColorSelect(color)}
                      disabled={!disponible}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Información de stock */}
            {stockSeleccionado !== null && (
              <div className={stockSeleccionado > 0 && stockSeleccionado <= 3 ? styles.stockInfoLow : styles.stockInfo}>
                <span className={styles.stockText}>
                  {stockSeleccionado > 0 ? `${stockSeleccionado} unidades disponibles` : "Sin stock"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Información del producto */}
        <div className={styles.infoSection}>
          <div className={styles.productInfo}>
            <div className={styles.categoryBadge}>{producto.categorias.nombre}</div>
            <h1 className={styles.productTitle}>{producto.nombre}</h1>
            <p className={styles.productDescription}>{producto.descripcion}</p>

            {/* Mostrar selección actual */}
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
                <svg
                  className={styles.btnIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {!selectedTalle || !selectedColor
                  ? "Selecciona talle y color"
                  : stockSeleccionado === 0
                    ? "Sin stock"
                    : "Añadir al carrito"}
              </button>

              <button className={styles.wishlistBtn}>
                <svg
                  className={styles.btnIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                Agregar a favoritos
              </button>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <svg
                  className={styles.featureIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12V7a7 7 0 1 1 14 0v5" />
                  <rect x="2" y="12" width="20" height="8" rx="2" />
                </svg>
                <span>Envío gratis</span>
              </div>
              <div className={styles.feature}>
                <svg
                  className={styles.featureIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9,11 12,14 22,4" />
                  <path d="m21,12v7a2,2 0 0,1 -2,2H5a2,2 0 0,1 -2,-2V5a2,2 0 0,1 2,-2h11" />
                </svg>
                <span>Devolución gratuita</span>
              </div>
              <div className={styles.feature}>
                <svg
                  className={styles.featureIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="m7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Compra segura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
