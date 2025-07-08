// app/productos/[slug]/page.tsx

import { prisma } from "@/app/lib/prisma"
import ProductPageClient from "./ProductPageClient"

interface ProductPageProps {
  params: {
    slug: string
  }
}

// ✅ Esta función es async y devuelve una promesa con todos los slugs
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const productos = await prisma.productos.findMany({
    select: { slug: true },
  })
  return productos.map((p) => ({ slug: p.slug }))
}

// ✅ El componente de página recibe directamente { params }

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params

  const producto = await prisma.productos.findFirst({
    where: {
      slug: slug,
      producto_base_id: null,
    },
    include: {
      categorias: true,
      other_productos: true,
      productos: true,
    },
  })

  if (!producto) {
    return (
      <div className="not-found">
        <h2>Producto no encontrado</h2>
        <p>Lo sentimos, el producto que buscás no está disponible.</p>
      </div>
    )
  }

  return (
    <ProductPageClient
      producto={{
        id: producto.id,
        nombre: producto.nombre,
        imagen_principal: producto.imagen_principal,
        descripcion: producto.descripcion,
        precio_base: Number(producto.precio_base),
        categorias: producto.categorias
          ? { nombre: producto.categorias.nombre }
          : null,
        other_productos: producto.other_productos
          .filter((p) => p.talle && p.color_nombre)
          .map((p) => ({
            talle: p.talle as string,
            color_nombre: p.color_nombre as string,
            stock: p.stock,
          })),
      }}
    />
  )
}
