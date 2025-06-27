"use client"

import { useState } from "react"
import { deleteProduct, toggleProductStatus } from "../../lib/products"
import styles from "./ProductList.module.css"

interface Product {
  id: number
  nombre: string
  slug: string
  descripcion: string | null
  precio_base: number
  categoria_id: number | null
  subcategoria_id: number | null
  activo: boolean
  fecha_creacion: Date
  imagen_principal: string | null
  categorias: {
    id: number
    nombre: string
  } | null
  subcategorias: {
    id: number
    nombre: string
  } | null
  _count: {
    productovariante: number
    productoimagenes: number
  }
}

interface ProductListProps {
  products: Product[]
  onRefresh: () => void
}

export default function ProductList({ products, onRefresh }: ProductListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [togglingId, setTogglingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (product: Product) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar el producto "${product.nombre}"?`)) {
      return
    }

    setDeletingId(product.id)
    setError(null)

    const result = await deleteProduct(product.id)

    if (result.error) {
      setError(result.error)
    } else {
      onRefresh()
    }

    setDeletingId(null)
  }

  const handleToggleStatus = async (product: Product) => {
    setTogglingId(product.id)
    setError(null)

    const result = await toggleProductStatus(product.id, !product.activo)

    if (result.error) {
      setError(result.error)
    } else {
      onRefresh()
    }

    setTogglingId(null)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          </svg>
        </div>
        <h3>No se encontraron productos</h3>
        <p>Intenta ajustar los filtros o crear un nuevo producto</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {error && (
        <div className={styles.error}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.th}>Producto</th>
              <th className={styles.th}>Categoría</th>
              <th className={styles.th}>Precio</th>
              <th className={styles.th}>Variantes</th>
              <th className={styles.th}>Estado</th>
              <th className={styles.th}>Fecha</th>
              <th className={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className={styles.tableRow}>
                <td className={styles.td}>
                  <div className={styles.productInfo}>
                    <div>
                      <h4 className={styles.productName}>{product.nombre}</h4>
                      {product.descripcion && <p className={styles.productDescription}>{product.descripcion}</p>}
                      <span className={styles.productSlug}>/{product.slug}</span>
                    </div>
                  </div>
                </td>

                <td className={styles.td}>
                  <div className={styles.categoryInfo}>
                    {product.categorias ? (
                      <>
                        <span className={styles.categoryName}>{product.categorias.nombre}</span>
                        {product.subcategorias && (
                          <span className={styles.subcategoryName}>{product.subcategorias.nombre}</span>
                        )}
                      </>
                    ) : (
                      <span className={styles.noCategory}>Sin categoría</span>
                    )}
                  </div>
                </td>

                <td className={styles.td}>
                  <span className={styles.price}>{formatPrice(product.precio_base)}</span>
                </td>

                <td className={styles.td}>
                  <div className={styles.variantInfo}>
                    <span className={styles.variantCount}>{product._count.productovariante} variantes</span>
                    <span className={styles.imageCount}>{product._count.productoimagenes} imágenes</span>
                  </div>
                </td>

                <td className={styles.td}>
                  <button
                    className={`${styles.statusBadge} ${product.activo ? styles.active : styles.inactive}`}
                    onClick={() => handleToggleStatus(product)}
                    disabled={togglingId === product.id}
                    title={`Cambiar a ${product.activo ? "inactivo" : "activo"}`}
                  >
                    {togglingId === product.id ? (
                      <div className={styles.buttonSpinner}></div>
                    ) : (
                      <>{product.activo ? "Activo" : "Inactivo"}</>
                    )}
                  </button>
                </td>

                <td className={styles.td}>
                  <span className={styles.date}>{formatDate(product.fecha_creacion)}</span>
                </td>

                <td className={styles.td}>
                  <div className={styles.actions}>
                    <a
                      href={`/dashboard/productos/editar/${product.id}`}
                      className={styles.editButton}
                      title="Editar producto"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </a>

                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(product)}
                      disabled={deletingId === product.id}
                      title="Eliminar producto"
                    >
                      {deletingId === product.id ? (
                        <div className={styles.buttonSpinner}></div>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3,6 5,6 21,6" />
                          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
