"use client"

import type React from "react"

import { useState } from "react"
import { createCategory, updateCategory } from "../../lib/categories"
import styles from "./CategoryForm.module.css"

interface Category {
  id: number
  nombre: string
  slug: string
  descripcion: string | null
  imagen_url: string | null
  fecha_creacion: Date
}

interface CategoryFormProps {
  category?: Category | null
  onClose: () => void
  onSuccess: () => void
}

export default function CategoryForm({ category, onClose, onSuccess }: CategoryFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEditing = !!category

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      let result
      if (isEditing) {
        result = await updateCategory(category.id, formData)
      } else {
        result = await createCategory(formData)
      }

      if (result.error) {
        setError(result.error)
      } else {
        onSuccess()
      }
    } catch (err) {
      setError("Error inesperado. Intenta nuevamente.")
    }

    setLoading(false)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{isEditing ? "Editar Categoría" : "Nueva Categoría"}</h2>
          <button className={styles.closeButton} onClick={onClose} type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
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

          <div className={styles.field}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              defaultValue={category?.nombre || ""}
              className={styles.input}
              placeholder="Ej: Camisetas"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="descripcion" className={styles.label}>
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              defaultValue={category?.descripcion || ""}
              className={styles.textarea}
              placeholder="Descripción opcional de la categoría..."
              rows={3}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="imagen_url" className={styles.label}>
              URL de Imagen
            </label>
            <input
              type="url"
              id="imagen_url"
              name="imagen_url"
              defaultValue={category?.imagen_url || ""}
              className={styles.input}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? (
                <>
                  <div className={styles.spinner}></div>
                  {isEditing ? "Actualizando..." : "Creando..."}
                </>
              ) : (
                <>{isEditing ? "Actualizar" : "Crear"} Categoría</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
