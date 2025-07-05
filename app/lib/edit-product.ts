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

// Obtener producto con sus variantes para edición
export async function getProductForEdit(id: number) {
  try {
    // Obtener el producto solicitado
    const requestedProduct = await prisma.productos.findUnique({
      where: { id },
      include: {
        categorias: true,
        subcategorias: true,
      },
    })

    if (!requestedProduct) {
      return { error: "Producto no encontrado" }
    }

    // Determinar el producto base real
    let actualProductBase = requestedProduct
    let actualProductBaseId = id

    // Si es una variante, obtener el producto base real
    if (requestedProduct.producto_base_id) {
      const baseProduct = await prisma.productos.findUnique({
        where: { id: requestedProduct.producto_base_id },
        include: {
          categorias: true,
          subcategorias: true,
        },
      })
      if (baseProduct) {
        actualProductBase = baseProduct
        actualProductBaseId = baseProduct.id
      }
    }

    // Obtener todas las variantes del producto base
    const variants = await prisma.productos.findMany({
      where: {
        producto_base_id: actualProductBaseId,
      },
      orderBy: [{ color_nombre: "asc" }, { talle: "asc" }],
    })

    return {
      success: true,
      data: {
        productBase: actualProductBase,
        productBaseId: actualProductBaseId, // ID real del producto base
        variants,
      },
    }
  } catch (error) {
    console.error("Error fetching product for edit:", error)
    return { error: "Error al cargar el producto" }
  }
}

// Actualizar producto con variantes
export async function updateProductWithVariants(productId: number, formData: FormData) {
  const nombre = formData.get("nombre") as string
  const descripcion = formData.get("descripcion") as string
  const precio_base = Number.parseFloat(formData.get("precio_base") as string)
  const categoria_id = formData.get("categoria_id") as string
  const subcategoria_id = formData.get("subcategoria_id") as string
  const imagen_principal = formData.get("imagen_principal") as string
  const variantesJson = formData.get("variantes") as string
  const variantesExistentesJson = formData.get("variantes_existentes") as string

  // Validaciones básicas
  if (!nombre || !precio_base) {
    return { error: "Nombre y precio base son requeridos" }
  }

  if (precio_base <= 0) {
    return { error: "El precio debe ser mayor a 0" }
  }

  let variantes: any[] = []
  let variantesExistentes: any[] = []

  try {
    variantes = JSON.parse(variantesJson || "[]")
    variantesExistentes = JSON.parse(variantesExistentesJson || "[]")
  } catch {
    return { error: "Error en el formato de variantes" }
  }

  // Validar que existan variantes (existentes + nuevas)
  if (variantes.length === 0 && variantesExistentes.length === 0) {
    return { error: "Debe tener al menos una variante" }
  }

  // Validar nuevas variantes
  for (const variante of variantes) {
    if (!variante.color_nombre || !variante.talle || variante.stock < 0) {
      return { error: "Todas las variantes nuevas deben tener color, talle y stock válido" }
    }
  }

  try {

    // Primero, determinar el ID real del producto base
    const requestedProduct = await prisma.productos.findUnique({
      where: { id: productId },
      select: { id: true, producto_base_id: true, nombre: true, slug: true },
    })

    if (!requestedProduct) {
      return { error: "Producto no encontrado" }
    }

    // Si es una variante, usar el ID del producto base
    const realProductBaseId = requestedProduct.producto_base_id || requestedProduct.id

    // Obtener el producto base real para comparar
    const currentProduct = await prisma.productos.findUnique({
      where: { id: realProductBaseId },
      select: { nombre: true, slug: true },
    })


    if (!currentProduct) {
      return { error: "Producto base no encontrado" }
    }

    const slug = generateSlug(nombre)
    let shouldValidateSlug = false


    // Solo validar slug si el nombre cambió
    if (currentProduct.nombre !== nombre) {
      shouldValidateSlug = true

      // Verificar si ya existe otro producto con ese slug
      const existingProduct = await prisma.productos.findFirst({
        where: {
          slug,
          AND: [{ NOT: { id: realProductBaseId } }, { NOT: { producto_base_id: realProductBaseId } }],
        },
      })


      if (existingProduct) {
        return { error: "Ya existe un producto con ese nombre" }
      }
    } else {
      console.log("El nombre no cambió, saltando validación de slug")
    }


    // Actualizar en transacción
    const result = await prisma.$transaction(async (tx) => {

      // 1. Actualizar producto base (usar el ID real del producto base)
      const updateData: any = {
        descripcion: descripcion || null,
        precio_base,
        categoria_id: categoria_id ? Number.parseInt(categoria_id) : null,
        subcategoria_id: subcategoria_id ? Number.parseInt(subcategoria_id) : null,
        imagen_principal: imagen_principal || null,
      }

      // Solo actualizar nombre y slug si el nombre cambió
      if (shouldValidateSlug) {
        updateData.nombre = nombre
        updateData.slug = slug
      }


      const productoBaseActualizado = await tx.productos.update({
        where: { id: realProductBaseId }, // Usar el ID real del producto base
        data: updateData,
      })


      // 2. Actualizar variantes existentes
      const variantesExistentesActualizadas = []

      for (let i = 0; i < variantesExistentes.length; i++) {
        const variante = variantesExistentes[i]

        const updateVariantData: any = {
          descripcion: descripcion || null,
          precio_base: variante.precio_adicional
            ? precio_base + Number.parseFloat(variante.precio_adicional)
            : precio_base,
          categoria_id: categoria_id ? Number.parseInt(categoria_id) : null,
          subcategoria_id: subcategoria_id ? Number.parseInt(subcategoria_id) : null,
          imagen_principal: variante.imagen || imagen_principal || null,
          stock: Number.parseInt(variante.stock),
          color_codigo_hex: variante.color_codigo_hex || null,
        }

        // Solo actualizar nombre y slug si el nombre del producto base cambió
        if (shouldValidateSlug) {
          updateVariantData.nombre = `${nombre} - ${variante.color_nombre} - ${variante.talle}`
          updateVariantData.slug = `${slug}-${generateSlug(variante.color_nombre)}-${generateSlug(variante.talle)}`
        }


        try {
          const varianteActualizada = await tx.productos.update({
            where: { id: Number.parseInt(variante.id) },
            data: updateVariantData,
          })
          variantesExistentesActualizadas.push(varianteActualizada)

        } catch (variantError) {
          console.error(`Error actualizando variante ${i + 1}:`, variantError)
          throw variantError
        }
      }

      // 3. Crear nuevas variantes
      const nuevasVariantesCreadas = []

      for (let i = 0; i < variantes.length; i++) {
        const variante = variantes[i]


        try {
          const nuevaVariante = await tx.productos.create({
            data: {
              nombre: `${nombre} - ${variante.color_nombre} - ${variante.talle}`,
              slug: `${slug}-${generateSlug(variante.color_nombre)}-${generateSlug(variante.talle)}-${Date.now()}`,
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
              producto_base_id: realProductBaseId, // Usar el ID real del producto base
            },
          })
          nuevasVariantesCreadas.push(nuevaVariante)
        } catch (newVariantError) {
          console.error(`Error creando nueva variante ${i + 1}:`, newVariantError)
          throw newVariantError
        }
      }

      return {
        productoBase: productoBaseActualizado,
        variantesExistentes: variantesExistentesActualizadas,
        nuevasVariantes: nuevasVariantesCreadas,
      }
    })

    revalidatePath("/dashboard/ver-productos")
    revalidatePath(`/dashboard/productos/editar/${realProductBaseId}`)
    return { success: true, data: result }
  } catch (error) {
    return { error: `Error al actualizar el producto: ${error?.message || "Error desconocido"}` }
  }
}
