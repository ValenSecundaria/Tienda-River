"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import styles from "./CategoryFilters.module.css"

interface CategoryFilters {
  search: string
  precioMin: string
  precioMax: string
  orderBy: "nombre" | "precio_base" | "fecha_creacion"
  orderDirection: "asc" | "desc"
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
  const [localPrecioMin, setLocalPrecioMin] = useState(filters.precioMin || "")
  const [localPrecioMax, setLocalPrecioMax] = useState(filters.precioMax || "")

  // Mantener sincronizado si cambia desde afuera
  useEffect(() => {
    setLocalPrecioMin(filters.precioMin || "")
    setLocalPrecioMax(filters.precioMax || "")
  }, [filters.precioMin, filters.precioMax])

  // Debounce para aplicar cambios
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        localPrecioMin !== filters.precioMin ||
        localPrecioMax !== filters.precioMax
      ) {
        onFilterChange({
          precioMin: localPrecioMin,
          precioMax: localPrecioMax,
        })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [localPrecioMin, localPrecioMax])

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
    })
    setLocalPrecioMin("")
    setLocalPrecioMax("")
  }

  return (
    <div className={styles.container}>
      {/* Header con información de resultados */}
      <div className={styles.header}>
        <div className={styles.resultsInfo}>
          <div className={styles.productCount}>
            <span className={styles.countNumber}>{productCount}</span>
            <span className={styles.countText}>
              producto{productCount !== 1 ? "s" : ""} encontrado{productCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        {loading && (
          <div className={styles.loadingIndicator}>
            <div className={styles.loadingSpinner}></div>
            <span>Filtrando...</span>
          </div>
        )}
      </div>

      {/* Búsqueda */}
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <button className={styles.clearSearch} onClick={() => onFilterChange({ search: "" })}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filtros principales */}
      <div className={styles.filtersGrid}>
        {/* Filtro de precio */}
        <div className={styles.filterCard}>
          <h3 className={styles.filterTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Rango de Precios
          </h3>

          {priceRange.min !== priceRange.max ? (
            <div className={styles.priceSliderContainer}>
              <div className={styles.priceInputs}>
                <div className={styles.priceInputGroup}>
                  <label className={styles.inputLabel}>Precio mínimo</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={localPrecioMin}
                    onChange={(e) => setLocalPrecioMin(e.target.value)}
                    className={styles.priceInput}
                    min={priceRange.min}
                    max={priceRange.max}
                  />
                </div>

                <div className={styles.priceSeparatorInput}>-</div>

                <div className={styles.priceInputGroup}>
                  <label className={styles.inputLabel}>Precio máximo</label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={localPrecioMax}
                    onChange={(e) => setLocalPrecioMax(e.target.value)}
                    className={styles.priceInput}
                    min={priceRange.min}
                    max={priceRange.max}
                  />
                </div>
              </div>

              <div className={styles.priceLabels}>
                <span className={styles.priceLabel}>
                  Rango: {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.noPriceRange}>
              <span>Sin rango de precios disponible</span>
            </div>
          )}
        </div>

        {/* Filtro de ordenamiento */}
        <div className={styles.filterCard}>
          <h3 className={styles.filterTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 16 4 4 4-4" />
              <path d="M7 20V4" />
              <path d="m21 8-4-4-4 4" />
              <path d="M17 4v16" />
            </svg>
            Ordenar por
          </h3>

          <div className={styles.sortControls}>
            <select
              value={filters.orderBy}
              onChange={(e) => onFilterChange({ orderBy: e.target.value as any })}
              className={styles.select}
            >
              <option value="fecha_creacion">Más recientes</option>
              <option value="nombre">Nombre A-Z</option>
              <option value="precio_base">Precio</option>
            </select>

            <select
              value={filters.orderDirection}
              onChange={(e) => onFilterChange({ orderDirection: e.target.value as any })}
              className={styles.select}
            >
              <option value="desc">Descendente</option>
              <option value="asc">Ascendente</option>
            </select>
          </div>
        </div>

        {/* Botón de reset */}
        <div className={styles.resetSection}>
          <button className={styles.resetButton} onClick={resetFilters}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  )
}
