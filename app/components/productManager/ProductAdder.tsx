"use client"

import { useState, useEffect } from "react"
import ProductList from "./ProductList"
import ProductFilters from "../filters/ProductFilters"
import { getProducts, getCategoriesForFilter } from "../../lib/products"
import styles from "./ProductAdder.module.css"

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

interface Category {
  id: number
  nombre: string
}

interface Filters {
  search: string
  categoria: string
  activo: boolean | undefined
  orderBy: "nombre" | "precio_base" | "fecha_creacion"
  orderDirection: "asc" | "desc"
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    search: "",
    categoria: "all",
    activo: undefined,
    orderBy: "fecha_creacion",
    orderDirection: "desc",
  })

  const loadProducts = async () => {
    setLoading(true)
    const data = await getProducts({
      search: filters.search || undefined,
      categoria: filters.categoria !== "all" ? filters.categoria : undefined,
      activo: filters.activo,
      orderBy: filters.orderBy,
      orderDirection: filters.orderDirection,
    })
    setProducts(data)
    setLoading(false)
  }

  const loadCategories = async () => {
    const data = await getCategoriesForFilter()
    setCategories(data)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadProducts()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [filters])

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleRefresh = () => {
    loadProducts()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Productos</h1>
          <p className={styles.subtitle}>Administra tu inventario de productos ({products.length} productos)</p>
        </div>
        <a href="/dashboard/agregar-producto" className={styles.addButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
          Nuevo Producto
        </a>
      </div>

      <ProductFilters filters={filters} categories={categories} onFilterChange={handleFilterChange} loading={loading} />

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando productos...</p>
        </div>
      ) : (
        <ProductList products={products} onRefresh={handleRefresh} />
      )}
    </div>
  )
}
