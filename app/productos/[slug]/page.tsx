import { prisma } from "@/app/lib/prisma"
import ProductPageClient from "./ProductPageClient"

export async function generateStaticParams() {
  const productos = await prisma.productos.findMany({
    select: { slug: true },
  })
  return productos.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }) {
  const { slug } = await params
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
        <p>Lo sentimos, el producto que buscas no está disponible.</p>
      </div>
    )
  }

  return <ProductPageClient producto={producto} />
}
