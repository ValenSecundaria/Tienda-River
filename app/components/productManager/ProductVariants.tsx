"use client"

import { useState } from "react"
import styles from "./ProductVariants.module.css"

interface Talle {
  id: number
  nombre: string
  orden: number
}

interface Variant {
  id: string
  color_nombre: string
  color_codigo_hex: string
  talle: string
  stock: string
  precio_adicional: string
  imagen: string
}

interface ProductVariantsProps {
  variants: Variant[]
  existingVariants?: Variant[]
  talles: Talle[]
  onChange: (variants: Variant[]) => void
  onExistingChange?: (variants: Variant[]) => void
  precioBase: number
  mode?: "create" | "edit"
}

export default function ProductVariants({
  variants,
  existingVariants = [],
  talles,
  onChange,
  onExistingChange,
  precioBase,
  mode = "create",
}: ProductVariantsProps) {
  const [showBulkAdd, setShowBulkAdd] = useState(false)
  const [bulkColors, setBulkColors] = useState("")
  const [bulkTalles, setBulkTalles] = useState<string[]>([])
  const [bulkStock, setBulkStock] = useState("")

  const addVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      color_nombre: "",
      color_codigo_hex: "#000000",
      talle: "",
      stock: "0",
      precio_adicional: "0",
      imagen: "",
    }
    onChange([...variants, newVariant])
  }

  const removeVariant = (id: string) => {
    onChange(variants.filter((v) => v.id !== id))
  }

  const updateVariant = (id: string, field: keyof Variant, value: string) => {
    onChange(variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
  }

  const updateExistingVariant = (id: string, field: keyof Variant, value: string) => {
    if (onExistingChange) {
      onExistingChange(existingVariants.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
    }
  }

  const addBulkVariants = () => {
    const colors = bulkColors
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c)
    const selectedTalles = bulkTalles
    const stock = bulkStock

    if (colors.length === 0 || selectedTalles.length === 0) {
      alert("Debe especificar al menos un color y un talle")
      return
    }

    const newVariants: Variant[] = []
    colors.forEach((color) => {
      selectedTalles.forEach((talle) => {
        newVariants.push({
          id: `${Date.now()}-${color}-${talle}`,
          color_nombre: color,
          color_codigo_hex: "#000000",
          talle,
          stock: stock || "0",
          precio_adicional: "0",
          imagen: "",
        })
      })
    })

    onChange([...variants, ...newVariants])
    setBulkColors("")
    setBulkTalles([])
    setBulkStock("")
    setShowBulkAdd(false)
  }

  const calculateFinalPrice = (precioAdicional: string) => {
    const adicional = Number.parseFloat(precioAdicional) || 0
    return precioBase + adicional
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Variantes del Producto</h2>
        <div className={styles.headerActions}>
          <button type="button" className={styles.bulkButton} onClick={() => setShowBulkAdd(!showBulkAdd)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M12 11h4" />
              <path d="M12 16h4" />
              <path d="M8 11h.01" />
              <path d="M8 16h.01" />
            </svg>
            Agregar en Lote
          </button>
          <button type="button" className={styles.addButton} onClick={addVariant}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
            Agregar Variante
          </button>
        </div>
      </div>

      {showBulkAdd && (
        <div className={styles.bulkAdd}>
          <h3>Agregar Variantes en Lote</h3>
          <div className={styles.bulkGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Colores (separados por coma)</label>
              <input
                type="text"
                value={bulkColors}
                onChange={(e) => setBulkColors(e.target.value)}
                className={styles.input}
                placeholder="Rojo, Azul, Negro"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Talles</label>
              <div className={styles.talleGrid}>
                {talles.map((talle) => (
                  <label key={talle.id} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={bulkTalles.includes(talle.nombre)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkTalles([...bulkTalles, talle.nombre])
                        } else {
                          setBulkTalles(bulkTalles.filter((t) => t !== talle.nombre))
                        }
                      }}
                      className={styles.checkbox}
                    />
                    {talle.nombre}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Stock por defecto</label>
              <input
                type="number"
                value={bulkStock}
                onChange={(e) => setBulkStock(e.target.value)}
                className={styles.input}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className={styles.bulkActions}>
            <button type="button" className={styles.cancelBulkButton} onClick={() => setShowBulkAdd(false)}>
              Cancelar
            </button>
            <button type="button" className={styles.addBulkButton} onClick={addBulkVariants}>
              Agregar Variantes
            </button>
          </div>
        </div>
      )}

      {existingVariants.length > 0 && (
        <div className={styles.existingVariants}>
          <h3 className={styles.existingTitle}>Variantes Existentes</h3>
          <div className={styles.variantsList}>
            {existingVariants.map((variant, index) => (
              <div key={variant.id} className={`${styles.variantCard} ${styles.existingVariantCard}`}>
                <div className={styles.variantHeader}>
                  <h4>Variante Existente {index + 1}</h4>
                  <span className={styles.existingBadge}>Existente</span>
                </div>

                <div className={styles.variantGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>Color</label>
                    <input
                      type="text"
                      value={variant.color_nombre}
                      className={`${styles.input} ${styles.readOnly}`}
                      readOnly
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Código de Color</label>
                    <div className={styles.colorInput}>
                      <input
                        type="color"
                        value={variant.color_codigo_hex}
                        onChange={(e) => updateExistingVariant(variant.id, "color_codigo_hex", e.target.value)}
                        className={styles.colorPicker}
                      />
                      <input
                        type="text"
                        value={variant.color_codigo_hex}
                        onChange={(e) => updateExistingVariant(variant.id, "color_codigo_hex", e.target.value)}
                        className={styles.colorText}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Talle</label>
                    <input
                      type="text"
                      value={variant.talle}
                      className={`${styles.input} ${styles.readOnly}`}
                      readOnly
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Stock *</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => updateExistingVariant(variant.id, "stock", e.target.value)}
                      className={styles.input}
                      min="0"
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Precio Adicional</label>
                    <input
                      type="number"
                      value={variant.precio_adicional}
                      onChange={(e) => updateExistingVariant(variant.id, "precio_adicional", e.target.value)}
                      className={styles.input}
                      step="0.01"
                    />
                    {variant.precio_adicional && (
                      <span className={styles.finalPrice}>
                        Precio final: ${calculateFinalPrice(variant.precio_adicional).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>URL de Imagen</label>
                    <input
                      type="url"
                      value={variant.imagen}
                      onChange={(e) => updateExistingVariant(variant.id, "imagen", e.target.value)}
                      className={styles.input}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {variants.length > 0 && (
        <div className={mode === "edit" ? styles.newVariants : ""}>
          {mode === "edit" && <h3 className={styles.newTitle}>Nuevas Variantes</h3>}
          <div className={styles.variantsList}>
            {variants.map((variant, index) => (
              <div key={variant.id} className={styles.variantCard}>
                <div className={styles.variantHeader}>
                  <h4>Variante {index + 1}</h4>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeVariant(variant.id)}
                    title="Eliminar variante"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className={styles.variantGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>Color *</label>
                    <input
                      type="text"
                      value={variant.color_nombre}
                      onChange={(e) => updateVariant(variant.id, "color_nombre", e.target.value)}
                      className={styles.input}
                      placeholder="Ej: Rojo"
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Código de Color</label>
                    <div className={styles.colorInput}>
                      <input
                        type="color"
                        value={variant.color_codigo_hex}
                        onChange={(e) => updateVariant(variant.id, "color_codigo_hex", e.target.value)}
                        className={styles.colorPicker}
                      />
                      <input
                        type="text"
                        value={variant.color_codigo_hex}
                        onChange={(e) => updateVariant(variant.id, "color_codigo_hex", e.target.value)}
                        className={styles.colorText}
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Talle *</label>
                    <select
                      value={variant.talle}
                      onChange={(e) => updateVariant(variant.id, "talle", e.target.value)}
                      className={styles.select}
                      required
                    >
                      <option value="">Seleccionar talle</option>
                      {talles.map((talle) => (
                        <option key={talle.id} value={talle.nombre}>
                          {talle.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Stock *</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => updateVariant(variant.id, "stock", e.target.value)}
                      className={styles.input}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Precio Adicional</label>
                    <input
                      type="number"
                      value={variant.precio_adicional}
                      onChange={(e) => updateVariant(variant.id, "precio_adicional", e.target.value)}
                      className={styles.input}
                      placeholder="0.00"
                      step="0.01"
                    />
                    {variant.precio_adicional && (
                      <span className={styles.finalPrice}>
                        Precio final: ${calculateFinalPrice(variant.precio_adicional).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>URL de Imagen</label>
                    <input
                      type="url"
                      value={variant.imagen}
                      onChange={(e) => updateVariant(variant.id, "imagen", e.target.value)}
                      className={styles.input}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {variants.length === 0 && (mode === "create" || existingVariants.length === 0) ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            </svg>
          </div>
          <h3>No hay variantes</h3>
          <p>Agrega variantes para definir colores, talles y stock</p>
        </div>
      ) : null}

      {(variants.length > 0 || existingVariants.length > 0) && (
        <div className={styles.summary}>
          <h3>Resumen</h3>
          <p>
            <strong>{existingVariants.length + variants.length}</strong> variantes totales
            {mode === "edit" && (
              <>
                <br />
                <span className={styles.summaryDetail}>
                  {existingVariants.length} existentes, {variants.length} nuevas
                </span>
              </>
            )}
          </p>
          <p>
            Stock total:{" "}
            <strong>
              {existingVariants.reduce((sum, v) => sum + (Number.parseInt(v.stock) || 0), 0) +
                variants.reduce((sum, v) => sum + (Number.parseInt(v.stock) || 0), 0)}
            </strong>{" "}
            units
          </p>
        </div>
      )}
    </div>
  )
}
