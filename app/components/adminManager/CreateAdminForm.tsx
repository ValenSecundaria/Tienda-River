"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createProductWithVariants, getFormData } from "@/app/lib/create-product"
import ProductBasicInfo from "./ProductBasicInfo"
import ProductVariants from "./ProductVariants"
import styles from "./CreateAdminForm.module.css"

interface FormData {
  categories: { id: number; nombre: string }[]
  subcategories: { id: number; nombre: string; categoria_id: number }[]
  talles: { id: number; nombre: string; orden: number }[]
}

interface Usuario {
  nombre: string
  email: string
  contrase_a: string
  rol: string
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

export default function CreateProductForm() {
  const [formData, setFormData] = useState<FormData>({
    categories: [],
    subcategories: [],
    talles: [],
  })
  const [productData, setProductData] = useState<Usuario>({
    nombre: "",
    email: "",
    contrase_a: "",
    rol: ""
  })
  const [variants, setVariants] = useState<Variant[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadFormData()
  }, [])

  const loadFormData = async () => {
    setLoading(true)
    const data = await getFormData()
    setFormData(data)
    setLoading(false)
  }

  const handleProductDataChange = (data: Partial<ProductData>) => {
    setProductData((prev) => ({ ...prev, ...data }))
  }

  const handleVariantsChange = (newVariants: Variant[]) => {
    setVariants(newVariants)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    // Validaciones del lado cliente
    if (!productData.nombre || !productData.precio_base) {
      setError("Nombre y precio base son requeridos")
      setSubmitting(false)
      return
    }

    if (variants.length === 0) {
      setError("Debe agregar al menos una variante")
      setSubmitting(false)
      return
    }

    // Crear FormData
    const formDataToSend = new FormData()
    Object.entries(productData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })
    formDataToSend.append("variantes", JSON.stringify(variants))

    const result = await createProductWithVariants(formDataToSend)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      // Resetear formulario
      setProductData({
        nombre: "",
        descripcion: "",
        precio_base: "",
        categoria_id: "",
        subcategoria_id: "",
        imagen_principal: "",
      })
      setVariants([])
    }

    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando formulario...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Agregar Nuevo Producto</h1>
        <p className={styles.subtitle}>Completa la información del producto y sus variantes</p>
      </div>

      {error && (
        <div className={styles.error}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      {success && (
        <div className={styles.success}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12" />
          </svg>
          ¡Producto creado exitosamente!
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <ProductBasicInfo
          data={productData}
          categories={formData.categories}
          subcategories={formData.subcategories}
          onChange={handleProductDataChange}
        />

        <ProductVariants
          variants={variants}
          talles={formData.talles}
          onChange={handleVariantsChange}
          precioBase={Number.parseFloat(productData.precio_base) || 0}
        />

        <div className={styles.actions}>
          <a href="/dashboard/ver-productos" className={styles.cancelButton}>
            Cancelar
          </a>
          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? (
              <>
                <div className={styles.buttonSpinner}></div>
                Creando Producto...
              </>
            ) : (
              "Crear Producto"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
