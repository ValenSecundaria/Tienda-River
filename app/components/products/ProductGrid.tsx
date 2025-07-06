"use client"

import { useState, useEffect, useCallback } from "react"
import { ProductCard } from "./ProductCard"
import CategoryFilters from "./CategoryFilters"
import { getCategoryProducts, getCategoryInfo, getCategoryPriceRange } from "@/app/lib/category-products"
import type { CategoryFilters as FilterType } from "@/app/lib/category-products"
import "./ProductGrid.css"

interface ProductGridProps {
  categoria: string
  onProductCountChange?: (count: number) => void
}

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
    slug: string
    descripcion: string | null
    imagen_url: string | null
    fecha_creacion: Date
  } | null
  _count: {
    productovariante: number
  }
}

interface CategoryInfo {
  id: number
  nombre: string
  descripcion: string | null
  imagen_url: string | null
}

export function ProductGrid({ categoria, onProductCountChange }: ProductGridProps) {
  const [productos, setProductos] = useState<Product[]>([])
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo | null>(null)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  // Estado de filtros - inicialmente vacío para cargar todo
  const [filters, setFilters] = useState({
    search: "",
    precioMin: "",
    precioMax: "",
    orderBy: "fecha_creacion" as const,
    orderDirection: "desc" as const,
    activo: undefined as boolean | undefined,
  })

  // Función para cargar productos
  const loadProducts = useCallback(async () => {
    setLoading(true)

    try {
      // Convertir filtros para la API
      const apiFilters: FilterType = {
        search: filters.search || undefined,
        precioMin: filters.precioMin ? Number.parseFloat(filters.precioMin) : undefined,
        precioMax: filters.precioMax ? Number.parseFloat(filters.precioMax) : undefined,
        orderBy: filters.orderBy,
        orderDirection: filters.orderDirection,
        activo: filters.activo,
      }

      const data = await getCategoryProducts(categoria, apiFilters)
      setProductos(data)
      if (onProductCountChange) {
        onProductCountChange(data.length)
      }
    } catch (error) {
      console.error("Error loading products:", error)
      setProductos([])
      if (onProductCountChange) {
        onProductCountChange(0)
      }
    } finally {
      setLoading(false)
      setInitialLoad(false)
    }
  }, [categoria, filters,onProductCountChange ])

  // Cargar información de la categoría
  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const [info, range] = await Promise.all([getCategoryInfo(categoria), getCategoryPriceRange(categoria)])

        setCategoryInfo(info)
        setPriceRange(range)
      } catch (error) {
        console.error("Error loading category data:", error)
      }
    }

    loadCategoryData()
  }, [categoria])

  // Cargar productos cuando cambien los filtros
  useEffect(() => {
    if (initialLoad) {
      // Carga inicial inmediata
      loadProducts()
    } else {
      // Para cambios posteriores, usar debounce
      const debounceTimer = setTimeout(() => {
        loadProducts()
      }, 300)

      return () => clearTimeout(debounceTimer)
    }
  }, [loadProducts, initialLoad])

  // Manejar cambios en filtros
  const handleFilterChange = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }, [])

  return (

    
    <div className="product-grid-container">
      {categoryInfo && (
        <div className="category-header">
          {/*<h1 className="category-title">{categoryInfo.nombre}</h1>*/}
          {categoryInfo.descripcion && <p className="category-description">{categoryInfo.descripcion}</p>}
        </div>
      )}

      <CategoryFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        loading={loading}
        priceRange={priceRange}
        productCount={productos.length}
      />

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando productos...</p>
        </div>
      ) : productos.length === 0 ? (
        <div className="no-products">
          <div className="no-products-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="m7.5 4.27 9 5.15" />
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            </svg>
          </div>
          <h3>No se encontraron productos</h3>
          <p>Intenta ajustar los filtros o explora otras categorías</p>
        </div>
      ) : (
        <div className="product-grid">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  )
}
