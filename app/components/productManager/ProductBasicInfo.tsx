"use client"

import styles from "./ProductBasicInfo.module.css"
import { useState } from "react"

interface Category {
  id: number
  nombre: string
}

interface Subcategory {
  id: number
  nombre: string
  categoria_id: number
}

interface ProductData {
  nombre: string
  descripcion: string
  precio_base: string
  categoria_id: string
  subcategoria_id: string
  imagen_principal: string
}

interface ProductBasicInfoProps {
  data: ProductData
  categories: Category[]
  subcategories: Subcategory[]
  onChange: (data: Partial<ProductData>) => void
  generarDescripcionIA?: () => void // <- ✅ Prop opcional
}

export default function ProductBasicInfo({
  data,
  categories,
  subcategories,
  onChange,
  generarDescripcionIA,
}: ProductBasicInfoProps) {
  const filteredSubcategories = subcategories.filter(
    (sub) => sub.categoria_id === Number.parseInt(data.categoria_id || "0")
  )

  const handleCategoryChange = (categoria_id: string) => {
    onChange({
      categoria_id,
      subcategoria_id: "", // Reset subcategory when category changes
    })
  }
const [generando, setGenerando] = useState(false)
  const handleGenerarDescripcion = async () => {
  if (!generarDescripcionIA) return

  setGenerando(true)
  await generarDescripcionIA()
  setGenerando(false)
}

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Información Básica</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="nombre" className={styles.label}>
            Nombre del Producto *
          </label>
          <input
            type="text"
            id="nombre"
            value={data.nombre}
            onChange={(e) => onChange({ nombre: e.target.value })}
            className={styles.input}
            placeholder="Ej: Zapatillas Nike Air Max"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="precio_base" className={styles.label}>
            Precio Base *
          </label>
          <input
            type="number"
            id="precio_base"
            value={data.precio_base}
            onChange={(e) => onChange({ precio_base: e.target.value })}
            className={styles.input}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="categoria_id" className={styles.label}>
            Categoría
          </label>
          <select
            id="categoria_id"
            value={data.categoria_id}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className={styles.select}
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="subcategoria_id" className={styles.label}>
            Subcategoría
          </label>
          <select
            id="subcategoria_id"
            value={data.subcategoria_id}
            onChange={(e) => onChange({ subcategoria_id: e.target.value })}
            className={styles.select}
            disabled={!data.categoria_id}
          >
            <option value="">Seleccionar subcategoría</option>
            {filteredSubcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id.toString()}>
                {subcategory.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Input para descripción con botón de IA al lado */}
        <div className={styles.fieldFull}>
          <label htmlFor="descripcion" className={styles.label}>
            Descripción del Producto
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <textarea
              id="descripcion"
              value={data.descripcion}
              onChange={(e) => onChange({ descripcion: e.target.value })}
              className={styles.input}
              rows={3}
              placeholder="Ej: Estas zapatillas Nike Air Max combinan estilo moderno con máxima comodidad..."
              style={{ flex: 1 }}
            />
                  <button
          type="button"
          onClick={handleGenerarDescripcion}
          disabled={generando}
          className={styles.iaButton}
          style={{
            whiteSpace: "nowrap",
            padding: "0 12px",
            backgroundColor: generando ? "#999" : "#dc143c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: generando ? "not-allowed" : "pointer",
          }}
        >
          {generando ? "Generando..." : "Generar con IA"}
        </button>
          </div>
        </div>

        <div className={styles.fieldFull}>
          <label htmlFor="imagen_principal" className={styles.label}>
            Imagen Principal del Producto
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return

              const formData = new FormData()
              formData.append("image", file)
              const res = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
              })

              const data = await res.json()
              if (data.secure_url) {
                onChange({ imagen_principal: data.secure_url })
              }
            }}
            className={styles.input}
          />

          {data.imagen_principal && (
            <img src={data.imagen_principal} alt="Vista previa" className={styles.previewImage} />
          )}
        </div>
      </div>
    </div>
  )
}
