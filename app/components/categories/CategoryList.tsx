"use client"

import { useState } from "react"
import { deleteCategory } from "../../lib/categories"
import styles from "./CategoryList.module.css"

interface Category {
  id: number
  nombre: string
  slug: string
  descripcion: string | null
  imagen_url: string | null
  fecha_creacion: Date
  _count: {
    productos: number
    subcategorias: number
  }
}

interface CategoryListProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onRefresh: () => void
}

export default function CategoryList({ categories, onEdit, onRefresh }: CategoryListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (category: Category) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar la categoría "${category.nombre}"?`)) {
      return
    }

    setDeletingId(category.id)
    setError(null)

    const result = await deleteCategory(category.id)

    if (result.error) {
      setError(result.error)
    } else {
      onRefresh()
    }

    setDeletingId(null)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (categories.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M3 7V5c0-1.1.9-2 2-2h2" />
            <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
            <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
            <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
          </svg>
        </div>
        <h3>No hay categorías</h3>
        <p>Comienza creando tu primera categoría</p>
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

      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.card}>
            <div className={styles.cardHeader}>
              {category.imagen_url ? (
                <img
                  src={category.imagen_url || "/placeholder.svg"}
                  alt={category.nombre}
                  className={styles.categoryImage}
                />
              ) : (
                <div className={styles.placeholderImage}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
              )}
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.categoryName}>{category.nombre}</h3>
              {category.descripcion && <p className={styles.categoryDescription}>{category.descripcion}</p>}

              <div className={styles.categoryStats}>
                <span className={styles.stat}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  </svg>
                  {category._count.productos} productos
                </span>
                <span className={styles.stat}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7V5c0-1.1.9-2 2-2h2" />
                    <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
                    <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
                    <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
                  </svg>
                  {category._count.subcategorias} subcategorías
                </span>
              </div>

              <div className={styles.categoryMeta}>
                <span className={styles.date}>Creada el {formatDate(category.fecha_creacion)}</span>
                <span className={styles.slug}>/{category.slug}</span>
              </div>
            </div>

            <div className={styles.cardActions}>
              <button className={styles.editButton} onClick={() => onEdit(category)} title="Editar categoría">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>

              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(category)}
                disabled={deletingId === category.id}
                title="Eliminar categoría"
              >
                {deletingId === category.id ? (
                  <div className={styles.buttonSpinner}></div>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6" />
                    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
