"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createProductWithVariants, getFormData } from "../../lib/create-product"
//import { createProductWithVariants, getFormData } from "@/app/lib/actions/create-product"
import { getProductForEdit } from "../../lib/edit-product"
import { updateProductWithVariants } from "../../lib/edit-product"
import ProductBasicInfo from "./ProductBasicInfo"
import ProductVariants from "./ProductVariants"
import styles from "./CreateProductForm.module.css"

interface FormData {
  categories: { id: number; nombre: string }[]
  subcategories: { id: number; nombre: string; categoria_id: number }[]
  talles: { id: number; nombre: string; orden: number }[]
}

interface ProductData {
  nombre: string
  descripcion: string
  precio_base: string
  categoria_id: string
  subcategoria_id: string
  imagen_principal: string
}

interface Variant {
  id: string
  color_nombre: string
  color_codigo_hex: string
  talle: string
  stock: string
  precio_adicional: string
  imagen: string
  isExisting?: boolean
}

interface CreateProductFormProps {
  productId?: number
  mode?: "create" | "edit"
}

export default function CreateProductForm({ productId, mode = "create" }: CreateProductFormProps) {
  const [formData, setFormData] = useState<FormData>({
    categories: [],
    subcategories: [],
    talles: [],
  })
  const [productData, setProductData] = useState<ProductData>({
    nombre: "",
    descripcion: "",
    precio_base: "",
    categoria_id: "",
    subcategoria_id: "",
    imagen_principal: "",
  })
  const [variants, setVariants] = useState<Variant[]>([])
  const [existingVariants, setExistingVariants] = useState<Variant[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadFormData()
    if (mode === "edit") {
      loadProductData()
    }
  }, [mode, productId])

  const loadFormData = async () => {
    setLoading(true)
    const data = await getFormData()
    setFormData(data)
    setLoading(false)
  }

  const loadProductData = async () => {
    if (mode === "edit" && productId) {
      setLoading(true)
      const result = await getProductForEdit(productId)

      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        const { productBase, variants, productBaseId } = result.data

        // Cargar datos básicos del producto
        setProductData({
          nombre: productBase.nombre,
          descripcion: productBase.descripcion || "",
          precio_base: productBase.precio_base.toString(),
          categoria_id: productBase.categoria_id?.toString() || "",
          subcategoria_id: productBase.subcategoria_id?.toString() || "",
          imagen_principal: productBase.imagen_principal || "",
        })

        // Cargar variantes existentes
        const existingVariantsFormatted = variants.map((variant) => ({
          id: variant.id.toString(),
          color_nombre: variant.color_nombre || "",
          color_codigo_hex: variant.color_codigo_hex || "#000000",
          talle: variant.talle || "",
          stock: variant.stock.toString(),
          precio_adicional: "0",
          imagen: variant.imagen_principal || "",
          isExisting: true,
        }))

        setExistingVariants(existingVariantsFormatted)

        // Actualizar el productId para usar el ID del producto base
        if (productBaseId !== productId) {
          // Aquí podrías redirigir a la URL correcta si quieres
          console.log("Editando producto base ID:", productBaseId)
        }
      }
      setLoading(false)
    }
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

    if (variants.length === 0 && (mode === "create" || existingVariants.length === 0)) {
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
    formDataToSend.append("variantes_existentes", JSON.stringify(existingVariants))

    let result
    if (mode === "edit" && productId) {
      // Si estamos editando, siempre usar el ID del producto base
      const productResult = await getProductForEdit(productId)
      const realProductBaseId = productResult.data?.productBaseId || productId

      result = await updateProductWithVariants(realProductBaseId, formDataToSend)
    } else {
      result = await createProductWithVariants(formDataToSend)
    }

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

  const generarDescripcionIA = async () => {
  if (!productData.nombre) {
    setError("Ingresá el nombre del producto primero.");
    return;
  }

  setSubmitting(true)
  setError(null)

  try {
    const res = await fetch("/api/IA", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreProducto: productData.nombre }),
    })

    const data = await res.json()

    if (data.descripcion) {
      setProductData((prev) => ({
        ...prev,
        descripcion: data.descripcion,
      }))
    } else {
      setError("No se pudo generar la descripción.")
    }
  } catch (error) {
    setError("Error al conectarse con el servidor.")
  }

  setSubmitting(false)
}

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{mode === "edit" ? "Editar Producto" : "Agregar Nuevo Producto"}</h1>
        <p className={styles.subtitle}>
          {mode === "edit"
            ? "Modifica la información del producto y sus variantes"
            : "Completa la información del producto y sus variantes"}
        </p>
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
          {mode === "edit" ? "¡Producto actualizado exitosamente!" : "¡Producto creado exitosamente!"}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <ProductBasicInfo
          data={productData}
          categories={formData.categories}
          subcategories={formData.subcategories}
          onChange={handleProductDataChange}
          generarDescripcionIA={generarDescripcionIA}
        />

        <ProductVariants
          variants={variants}
          existingVariants={existingVariants}
          talles={formData.talles}
          onChange={handleVariantsChange}
          onExistingChange={setExistingVariants}
          precioBase={Number.parseFloat(productData.precio_base) || 0}
          mode={mode}
        />

        <div className={styles.actions}>
          <a href="/dashboard/ver-productos" className={styles.cancelButton}>
            Cancelar
          </a>
          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? (
              <>
                <div className={styles.buttonSpinner}></div>
                {mode === "edit" ? "Actualizando Producto..." : "Creando Producto..."}
              </>
            ) : mode === "edit" ? (
              "Actualizar Producto"
            ) : (
              "Crear Producto"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}


/*
import { useState, useEffect } from "react"
import { createProductWithVariants, getFormData } from "../../lib/create-product"
//import { createProductWithVariants, getFormData } from "@/app/lib/actions/create-product"
import { getProductForEdit } from "../../lib/edit-product"
import { updateProductWithVariants } from "../../lib/edit-product"
import ProductBasicInfo from "./ProductBasicInfo"
import ProductVariants from "./ProductVariants"
import styles from "./CreateProductForm.module.css"
*/