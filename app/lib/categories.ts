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

// Obtener todas las categorías
export async function getCategories() {
  try {
    const categories = await prisma.categorias.findMany({
      orderBy: {
        fecha_creacion: "desc",
      },
      include: {
        _count: {
          select: {
            productos: true,
            subcategorias: true,
          },
        },
      },
    })
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Crear nueva categoría
export async function createCategory(formData: FormData) {
  const nombre = formData.get("nombre") as string
  const descripcion = formData.get("descripcion") as string
  const imagen_url = formData.get("imagen_url") as string

  if (!nombre) {
    return { error: "El nombre es requerido" }
  }

  try {
    const slug = generateSlug(nombre)

    // Verificar si ya existe una categoría con ese slug
    const existingCategory = await prisma.categorias.findUnique({
      where: { slug },
    })

    if (existingCategory) {
      return { error: "Ya existe una categoría con ese nombre" }
    }

    await prisma.categorias.create({
      data: {
        nombre,
        slug,
        descripcion: descripcion || null,
        imagen_url: imagen_url || null,
      },
    })

    revalidatePath("/dashboard/categorias")
    return { success: true }
  } catch (error) {
    console.error("Error creating category:", error)
    return { error: "Error al crear la categoría" }
  }
}

// Actualizar categoría
export async function updateCategory(id: number, formData: FormData) {
  const nombre = formData.get("nombre") as string
  const descripcion = formData.get("descripcion") as string
  const imagen_url = formData.get("imagen_url") as string

  if (!nombre) {
    return { error: "El nombre es requerido" }
  }

  try {
    const slug = generateSlug(nombre)

    // Verificar si ya existe otra categoría con ese slug
    const existingCategory = await prisma.categorias.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    })

    if (existingCategory) {
      return { error: "Ya existe una categoría con ese nombre" }
    }

    await prisma.categorias.update({
      where: { id },
      data: {
        nombre,
        slug,
        descripcion: descripcion || null,
        imagen_url: imagen_url || null,
      },
    })

    revalidatePath("/dashboard/categorias")
    return { success: true }
  } catch (error) {
    console.error("Error updating category:", error)
    return { error: "Error al actualizar la categoría" }
  }
}

// Eliminar categoría
export async function deleteCategory(id: number) {
  try {
    // Verificar si la categoría tiene productos o subcategorías
    const category = await prisma.categorias.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            productos: true,
            subcategorias: true,
          },
        },
      },
    })

    if (!category) {
      return { error: "Categoría no encontrada" }
    }

    if (category._count.productos > 0 || category._count.subcategorias > 0) {
      return {
        error: `No se puede eliminar la categoría porque tiene ${category._count.productos} productos y ${category._count.subcategorias} subcategorías asociadas`,
      }
    }

    await prisma.categorias.delete({
      where: { id },
    })

    revalidatePath("/dashboard/categorias")
    return { success: true }
  } catch (error) {
    console.error("Error deleting category:", error)
    return { error: "Error al eliminar la categoría" }
  }
}

// Obtener categoría por ID
export async function getCategoryById(id: number) {
  try {
    const category = await prisma.categorias.findUnique({
      where: { id },
    })
    return category
  } catch (error) {
    console.error("Error fetching category:", error)
    return null
  }
}
