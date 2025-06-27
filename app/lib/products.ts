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

// Obtener todos los productos con filtros
export async function getProducts(filters?: {
  search?: string
  categoria?: string
  activo?: boolean
  orderBy?: "nombre" | "precio_base" | "fecha_creacion"
  orderDirection?: "asc" | "desc"
}) {
  try {
    const where: any = {}

    // Filtro de búsqueda por nombre
    if (filters?.search) {
      where.nombre = {
        contains: filters.search,
        mode: "insensitive",
      }
    }

    // Filtro por categoría
    if (filters?.categoria && filters.categoria !== "all") {
      where.categoria_id = Number.parseInt(filters.categoria)
    }

    // Filtro por estado activo
    if (filters?.activo !== undefined) {
      where.activo = filters.activo
    }

    const products = await prisma.productos.findMany({
      where,
      orderBy: {
        [filters?.orderBy || "fecha_creacion"]: filters?.orderDirection || "desc",
      },
      include: {
        categorias: {
          select: {
            id: true,
            nombre: true,
          },
        },
        subcategorias: {
          select: {
            id: true,
            nombre: true,
          },
        },
        _count: {
          select: {
            productovariante: true,
            productoimagenes: true,
          },
        },
      },
    })

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Obtener categorías para el filtro
export async function getCategoriesForFilter() {
  try {
    const categories = await prisma.categorias.findMany({
      select: {
        id: true,
        nombre: true,
      },
      orderBy: {
        nombre: "asc",
      },
    })
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Eliminar producto
export async function deleteProduct(id: number) {
  try {
    // Verificar si el producto tiene variantes u órdenes asociadas
    const product = await prisma.productos.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            productovariante: true,
          },
        },
        productovariante: {
          include: {
            _count: {
              select: {
                ordenitems: true,
              },
            },
          },
        },
      },
    })

    if (!product) {
      return { error: "Producto no encontrado" }
    }

    // Verificar si tiene órdenes asociadas
    const hasOrders = product.productovariante.some((variant) => variant._count.ordenitems > 0)

    if (hasOrders) {
      return {
        error: "No se puede eliminar el producto porque tiene órdenes asociadas",
      }
    }

    // Eliminar en orden: imágenes, variantes, producto
    await prisma.$transaction(async (tx) => {
      // Eliminar imágenes del producto
      await tx.productoimagenes.deleteMany({
        where: { producto_id: id },
      })

      // Eliminar variantes del producto
      await tx.productovariante.deleteMany({
        where: { producto_id: id },
      })

      // Eliminar el producto
      await tx.productos.delete({
        where: { id },
      })
    })

    revalidatePath("/dashboard/ver-productos")
    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { error: "Error al eliminar el producto" }
  }
}

// Cambiar estado activo del producto
export async function toggleProductStatus(id: number, activo: boolean) {
  try {
    await prisma.productos.update({
      where: { id },
      data: { activo },
    })

    revalidatePath("/dashboard/ver-productos")
    return { success: true }
  } catch (error) {
    console.error("Error updating product status:", error)
    return { error: "Error al actualizar el estado del producto" }
  }
}

// Obtener producto por ID
export async function getProductById(id: number) {
  try {
    const product = await prisma.productos.findUnique({
      where: { id },
      include: {
        categorias: true,
        subcategorias: true,
        productoimagenes: {
          orderBy: { orden: "asc" },
        },
        productovariante: {
          include: {
            talles: true,
          },
        },
      },
    })
    return product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}
