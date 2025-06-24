"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import styles from "./ProductCard.module.css"

export function ProductCard({ producto }) {
  return (
    <Link href={`/productos/${producto.slug}`} className={styles.card}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <Image
          src="https://celadasa.vtexassets.com/arquivos/ids/230631-1200-auto?v=638197635089300000&width=1200&height=auto&aspect=true"
          alt={producto.nombre}
          width={400}
          height={300}
          className={styles.image}
        />

        {/* Overlay Actions */}
        <div className={styles.overlayActions}>
          <button
            className={styles.wishlistButton}
            onClick={(e) => {
              e.preventDefault()
              // Agregar a lista de deseo aca
            }}
          >
            <Heart className={styles.heartIcon} />
          </button>
        </div>

        {/* Category Badge */}
        <div className={styles.categoryBadge}>
          <span className={styles.categoryText}>{producto.categorias.nombre}</span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{producto.nombre}</h3>
        </div>

        {/* Price and Action */}
        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>${producto.precio_base.toLocaleString()}</span>
            <span className={styles.priceLabel}>Precio base</span>
          </div>

          <button
            className={styles.cartButton}
            onClick={(e) => {
              e.preventDefault()
              // Add to cart logic here
            }}
          >
            <ShoppingCart className={styles.cartIcon} />
          </button>
        </div>
      </div>
    </Link>
  )
}
