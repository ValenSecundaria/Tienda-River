"use client"

import { useState, useEffect } from "react"
import CategoryList from "./CategoryList"
import CategoryForm from "./CategoryForm"
import { getCategories } from "../../lib/categories"
import styles from "./CategoriesManager.module.css"

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

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  const loadCategories = async () => {
    setLoading(true)
    const data = await getCategories()
    setCategories(data)
    setLoading(false)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsFormOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingCategory(null)
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    setEditingCategory(null)
    loadCategories()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Categorías</h1>
          <p className={styles.subtitle}>Administra las categorías de tu tienda</p>
        </div>
        <button className={styles.addButton} onClick={handleAddCategory}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
          Nueva Categoría
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando categorías...</p>
        </div>
      ) : (
        <CategoryList categories={categories} onEdit={handleEditCategory} onRefresh={loadCategories} />
      )}

      {isFormOpen && (
        <CategoryForm category={editingCategory} onClose={handleCloseForm} onSuccess={handleFormSuccess} />
      )}
    </div>
  )
}
