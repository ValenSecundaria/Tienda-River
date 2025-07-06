"use client"

import { useState, useEffect } from "react"
import styles from "./CategoryFilters.module.css"

interface CategoryFilters {
  search: string
  precioMin: string
  precioMax: string
  orderBy: "nombre" | "precio_base" | "fecha_creacion"
  orderDirection: "asc" | "desc"
  activo: boolean | undefined
}

interface CategoryFiltersProps {
  filters: CategoryFilters
  onFilterChange: (filters: Partial<CategoryFilters>) => void
  loading: boolean
  priceRange: { min: number; max: number }
  productCount: number
}

export default function CategoryFilters({
  filters,
  onFilterChange,
  loading,
  priceRange,
  productCount,
}: CategoryFiltersProps) {
  const [localPrecioMin, setLocalPrecioMin] = useState(filters.precioMin)
  const [localPrecioMax, setLocalPrecioMax] = useState(filters.precioMax)

  // Sincronizar valores locales cuando cambien los filtros externos
  useEffect(() => {
    setLocalPrecioMin(filters.precioMin)
    setLocalPrecioMax(filters.precioMax)
  }, [filters.precioMin, filters.precioMax])

  // Debounce para los filtros de precio
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localPrecioMin !== filters.precioMin || localPrecioMax !== filters.precioMax) {
        onFilterChange({
          precioMin: localPrecioMin,
          precioMax: localPrecioMax,
        })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [localPrecioMin, localPrecioMax, filters.precioMin, filters.precioMax, onFilterChange])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price)
  }

  const resetFilters = () => {
    onFilterChange({
      search: "",
      precioMin: "",
      precioMax: "",
      orderBy: "fecha_creacion",
      orderDirection: "desc",
      activo: undefined,
    })
    setLocalPrecioMin("")
    setLocalPrecioMax("")
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.resultsInfo}>
          <span className={styles.productCount}>
            {productCount} producto{productCount !== 1 ? "s" : ""} encontrado{productCount !== 1 ? "s" : ""}
          </span>
          {priceRange.min > 0 && priceRange.max > 0 && (
            <span className={styles.priceRange}>
              Rango: {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
            </span>
          )}
        </div>
        {loading && (
          <div className={styles.loadingIndicator}>
            <div className={styles.loadingSpinner}></div>
          </div>
        )}
      </div>

      <div className={styles.filtersSection}>
        {/* Búsqueda */}
        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className={styles.searchInput}
            />
            {filters.search && (
              <button
                className={styles.clearSearch}
                onClick={() => onFilterChange({ search: "" })}
                title="Limpiar búsqueda"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={styles.filterControls}>
          {/* Filtros de precio */}
          <div className={styles.priceFilters}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Precio mínimo</label>
              <input
                type="number"
                value={localPrecioMin}
                onChange={(e) => setLocalPrecioMin(e.target.value)}
                className={styles.priceInput}
                placeholder="0"
                min="0"
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Precio máximo</label>
              <input
                type="number"
                value={localPrecioMax}
                onChange={(e) => setLocalPrecioMax(e.target.value)}
                className={styles.priceInput}
                placeholder="Sin límite"
                min="0"
              />
            </div>
          </div>

          {/* Estado */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Estado</label>
            <select
              value={filters.activo === undefined ? "all" : filters.activo ? "active" : "inactive"}
              onChange={(e) => {
                const value = e.target.value
                onFilterChange({
                  activo: value === "all" ? undefined : value === "active",
                })
              }}
              className={styles.select}
            >
              <option value="all">Todos</option>
              <option value="active">Disponibles</option>
              <option value="inactive">No disponibles</option>
            </select>
          </div>

          {/* Ordenamiento */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Ordenar por</label>
            <select
              value={filters.orderBy}
              onChange={(e) => onFilterChange({ orderBy: e.target.value as any })}
              className={styles.select}
            >
              <option value="fecha_creacion">Más recientes</option>
              <option value="nombre">Nombre</option>
              <option value="precio_base">Precio</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Dirección</label>
            <select
              value={filters.orderDirection}
              onChange={(e) => onFilterChange({ orderDirection: e.target.value as any })}
              className={styles.select}
            >
              <option value="desc">Descendente</option>
              <option value="asc">Ascendente</option>
            </select>
          </div>

          <button className={styles.resetButton} onClick={resetFilters} title="Limpiar filtros">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  )
}
