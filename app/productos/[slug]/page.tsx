import { prisma } from "@/app/lib/prisma"
import Image from "next/image"
import styles from "./ProductPage.module.css"

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
    },
    include: {
      categorias: true,
    },
  })

  if (!producto) {
    return (
      <div className={styles.notFound}>
        <h2>Producto no encontrado</h2>
        <p>Lo sentimos, el producto que buscas no está disponible.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.productWrapper}>
        {/* Imagen del producto */}
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <Image
              src="https://celadasa.vtexassets.com/arquivos/ids/230631-1200-auto?v=638197635089300000&width=1200&height=auto&aspect=true"
              alt={producto.nombre}
              width={600}
              height={600}
              className={styles.productImage}
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className={styles.infoSection}>
          <div className={styles.productInfo}>
            <div className={styles.categoryBadge}>{producto.categorias.nombre}</div>

            <h1 className={styles.productTitle}>{producto.nombre}</h1>

            <p className={styles.productDescription}>{producto.descripcion}</p>

            <div className={styles.priceSection}>
              <span className={styles.price}>${producto.precio_base.toString()}</span>
              <span className={styles.priceLabel}>Precio</span>
            </div>

            <div className={styles.actionSection}>
              <button className={styles.addToCartBtn}>
                <span className={styles.btnIcon}>🛒</span>
                Añadir al carrito
              </button>

              <button className={styles.wishlistBtn}>
                <span className={styles.btnIcon}>♡</span>
                Agregar a favoritos
              </button>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🚚</span>
                <span>Envío gratis</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>↩️</span>
                <span>Devolución gratuita</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🔒</span>
                <span>Compra segura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
