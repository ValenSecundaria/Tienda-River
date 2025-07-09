"use client"

import styles from "./OrderFilters.module.css"

interface OrderState {
  id: number
  nombre: string
  descripcion: string | null
  es_final: boolean
}

interface Filters {
  search: string
  estado: string
  fechaDesde: string
  fechaHasta: string
  orderBy: "fecha" | "total" | "id"
  orderDirection: "asc" | "desc"
}

interface OrderFiltersProps {
  filters: Filters
  orderStates: OrderState[]
  onFilterChange: (filters: Partial<Filters>) => void
  loading: boolean
}

export default function OrderFilters({ filters, orderStates, onFilterChange, loading }: OrderFiltersProps) {
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
            placeholder="Buscar por tracking, cliente o email..."
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
          <label className={styles.filterLabel}>Estado</label>
          <select
            value={filters.estado}
            onChange={(e) => onFilterChange({ estado: e.target.value })}
            className={styles.select}
          >
            <option value="all">Todos los estados</option>
            {orderStates.map((state) => (
              <option key={state.id} value={state.id.toString()}>
                {state.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Fecha desde</label>
          <input
            type="date"
            value={filters.fechaDesde}
            onChange={(e) => onFilterChange({ fechaDesde: e.target.value })}
            className={styles.dateInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Fecha hasta</label>
          <input
            type="date"
            value={filters.fechaHasta}
            onChange={(e) => onFilterChange({ fechaHasta: e.target.value })}
            className={styles.dateInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Ordenar por</label>
          <select
            value={filters.orderBy}
            onChange={(e) => onFilterChange({ orderBy: e.target.value as any })}
            className={styles.select}
          >
            <option value="fecha">Fecha</option>
            <option value="total">Total</option>
            <option value="id">ID</option>
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
              estado: "all",
              fechaDesde: "",
              fechaHasta: "",
              orderBy: "fecha",
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
