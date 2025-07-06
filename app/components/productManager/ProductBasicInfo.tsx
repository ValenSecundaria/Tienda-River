"use client"

import styles from "./ProductBasicInfo.module.css"

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
}

export default function ProductBasicInfo({ data, categories, subcategories, onChange }: ProductBasicInfoProps) {
  const filteredSubcategories = subcategories.filter(
    (sub) => sub.categoria_id === Number.parseInt(data.categoria_id || "0"),
  )

  const handleCategoryChange = (categoria_id: string) => {
    onChange({
      categoria_id,
      subcategoria_id: "", // Reset subcategory when category changes
    })
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

          {/* Vista previa si ya hay imagen */}
          {data.imagen_principal && (
            <img src={data.imagen_principal} alt="Vista previa" className={styles.previewImage} />
          )}
        </div>
      </div>
    </div>
  )
}
