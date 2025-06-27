"use client"

import styles from "./ProductFilters.module.css"

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

interface ProductFiltersProps {
  filters: Filters
  categories: Category[]
  onFilterChange: (filters: Partial<Filters>) => void
  loading: boolean
}

export default function ProductFilters({ filters, categories, onFilterChange, loading }: ProductFiltersProps) {
  return (
    <div className={styles.container}>
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
            placeholder="Buscar productos por nombre..."
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

      <div className={styles.filtersSection}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Categoría</label>
          <select
            value={filters.categoria}
            onChange={(e) => onFilterChange({ categoria: e.target.value })}
            className={styles.select}
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.nombre}
              </option>
            ))}
          </select>
        </div>

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
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Ordenar por</label>
          <select
            value={filters.orderBy}
            onChange={(e) => onFilterChange({ orderBy: e.target.value as any })}
            className={styles.select}
          >
            <option value="fecha_creacion">Fecha de creación</option>
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

        <button
          className={styles.resetButton}
          onClick={() =>
            onFilterChange({
              search: "",
              categoria: "all",
              activo: undefined,
              orderBy: "fecha_creacion",
              orderDirection: "desc",
            })
          }
          title="Limpiar filtros"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
          Limpiar
        </button>
      </div>

      {loading && (
        <div className={styles.loadingIndicator}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
    </div>
  )
}
