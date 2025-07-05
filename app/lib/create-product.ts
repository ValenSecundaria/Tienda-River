"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

// Función para generar slug
function generateSlug(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

// Obtener datos necesarios para el formulario
export async function getFormData() {
  try {
    const [categories, subcategories, talles] = await Promise.all([
      prisma.categorias.findMany({
        select: { id: true, nombre: true },
        orderBy: { nombre: "asc" },
      }),
      prisma.subcategorias.findMany({
        select: { id: true, nombre: true, categoria_id: true },
        orderBy: { nombre: "asc" },
      }),
      prisma.talles.findMany({
        orderBy: { orden: "asc" },
      }),
    ])

    return { categories, subcategories, talles }
  } catch (error) {
    console.error("Error fetching form data:", error)
    return { categories: [], subcategories: [], talles: [] }
  }
}

// Crear producto con variantes
export async function createProductWithVariants(formData: FormData) {
  const nombre = formData.get("nombre") as string
  const descripcion = formData.get("descripcion") as string
  const precio_base = Number.parseFloat(formData.get("precio_base") as string)
  const categoria_id = formData.get("categoria_id") as string
  const subcategoria_id = formData.get("subcategoria_id") as string
  const imagen_principal = formData.get("imagen_principal") as string
  const variantesJson = formData.get("variantes") as string

  // Validaciones básicas
  if (!nombre || !precio_base) {
    return { error: "Nombre y precio base son requeridos" }
  }

  if (precio_base <= 0) {
    return { error: "El precio debe ser mayor a 0" }
  }

  let variantes: any[] = []
  try {
    variantes = JSON.parse(variantesJson || "[]")
  } catch {
    return { error: "Error en el formato de variantes" }
  }

  if (variantes.length === 0) {
    return { error: "Debe agregar al menos una variante" }
  }

  // Validar variantes
  for (const variante of variantes) {
    if (!variante.color_nombre || !variante.talle || variante.stock < 0) {
      return { error: "Todas las variantes deben tener color, talle y stock válido" }
    }
  }

  try {
    const slug = generateSlug(nombre)

    // Verificar si ya existe un producto con ese slug
    const existingProduct = await prisma.productos.findUnique({
      where: { slug },
    })

    if (existingProduct) {
      return { error: "Ya existe un producto con ese nombre" }
    }

    // Crear producto en transacción
    const result = await prisma.$transaction(async (tx) => {
      // 1. Crear producto base
      const productoBase = await tx.productos.create({
        data: {
          nombre,
          slug,
          descripcion: descripcion || null,
          precio_base,
          categoria_id: categoria_id ? Number.parseInt(categoria_id) : null,
          subcategoria_id: subcategoria_id ? Number.parseInt(subcategoria_id) : null,
          imagen_principal: imagen_principal || null,
          activo: true,
          stock: 0, // El producto base no tiene stock directo
          // producto_base_id es null para el producto base
        },
      })

      // 2. Crear variantes
      const variantesCreadas = []
      for (const variante of variantes) {
        const varianteCreada = await tx.productos.create({
          data: {
            nombre: `${nombre} - ${variante.color_nombre} - ${variante.talle}`,
            slug: `${slug}-${generateSlug(variante.color_nombre)}-${generateSlug(variante.talle)}`,
            descripcion: descripcion || null,
            precio_base: variante.precio_adicional
              ? precio_base + Number.parseFloat(variante.precio_adicional)
              : precio_base,
            categoria_id: categoria_id ? Number.parseInt(categoria_id) : null,
            subcategoria_id: subcategoria_id ? Number.parseInt(subcategoria_id) : null,
            imagen_principal: variante.imagen || imagen_principal || null,
            activo: true,
            stock: Number.parseInt(variante.stock),
            color_nombre: variante.color_nombre,
            color_codigo_hex: variante.color_codigo_hex || null,
            talle: variante.talle,
            producto_base_id: productoBase.id, // Apunta al producto base
          },
        })
        variantesCreadas.push(varianteCreada)
      }

      return { productoBase, variantes: variantesCreadas }
    })

    revalidatePath("/dashboard/ver-productos")
    return { success: true, data: result }
  } catch (error) {
    console.error("Error creating product:", error)
    return { error: "Error al crear el producto" }
  }
}
