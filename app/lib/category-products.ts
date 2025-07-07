"use server"

import { prisma } from "@/app/lib/prisma"

export interface CategoryFilters {
  search?: string
  precioMin?: number
  precioMax?: number
  orderBy?: "nombre" | "precio_base" | "fecha_creacion"
  orderDirection?: "asc" | "desc"
  activo?: boolean
}



export async function getCategoryProducts(categoria: string, filters: CategoryFilters = {}) {
  try {
    const where: any = {
      categorias: {
        slug: categoria,
      },
      producto_base_id: null,
    }

    // Filtro de búsqueda por nombre
    if (filters.search) {
      where.nombre = {
        contains: filters.search,
        mode: "insensitive",
      }
    }

    // Filtro por precio
    if (filters.precioMin !== undefined || filters.precioMax !== undefined) {
      where.precio_base = {}
      if (filters.precioMin !== undefined) {
        where.precio_base.gte = filters.precioMin
      }
      if (filters.precioMax !== undefined) {
        where.precio_base.lte = filters.precioMax
      }
    }

    // Filtro por estado activo
    if (filters.activo !== undefined) {
      where.activo = filters.activo
    }

    const productosData = await prisma.productos.findMany({
      where,
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
      },
      orderBy: {
        [filters.orderBy || "fecha_creacion"]: filters.orderDirection || "desc",
      },
    })

    // Mapear productos para convertir Decimal a Number
    const productos = productosData.map((producto) => ({
      ...producto,
      precio_base: producto.precio_base.toNumber(),
    }))

    return productos
  } catch (error) {
    console.error("Error fetching category products:", error)
    return []
  }
}





export async function getCategoryInfo(categoria: string) {
  try {
    const categoryInfo = await prisma.categorias.findUnique({
      where: { slug: categoria },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        imagen_url: true,
      },
    })

    return categoryInfo
  } catch (error) {
    console.error("Error fetching category info:", error)
    return null
  }
}




export async function getCategoryPriceRange(categoria: string) {
  try {
    const priceStats = await prisma.productos.aggregate({
      where: {
        categorias: {
          slug: categoria,
        },
        producto_base_id: null,
        activo: true,
      },
      _min: {
        precio_base: true,
      },
      _max: {
        precio_base: true,
      },
    })

    return {
      min: priceStats._min.precio_base?.toNumber() || 0,
      max: priceStats._max.precio_base?.toNumber() || 0,
    }
  } catch (error) {
    console.error("Error fetching price range:", error)
    return { min: 0, max: 0 }
  }
}
