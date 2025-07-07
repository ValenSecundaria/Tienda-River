"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Check } from "lucide-react";
import { useState } from "react";
import styles from "./ProductCard.module.css";

interface Product {
  id: number
  nombre: string
  slug: string
  descripcion: string | null
  precio_base: number
  categoria_id: number | null
  subcategoria_id: number | null
  activo: boolean
  fecha_creacion: Date // convertido a ISO string
  imagen_principal: string | null
  categorias: {
    id: number
    nombre: string
  } | null
  subcategorias: {
    id: number
    nombre: string
  } | null
}

export function ProductCard({ producto }: { producto: Product }) {
  const [agregado, setAgregado] = useState(false);
  const [mensajeVisible, setMensajeVisible] = useState(false);

 /* const agregarAlCarrito = async () => {
    try {
      const res = await fetch("/api/carrito/cookies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productoId: producto.id,
        }),
      });

      if (res.ok) {
        setAgregado(true);
        setMensajeVisible(true);

        window.dispatchEvent(new Event("carrito-update"))
        
        setTimeout(() => {
          setMensajeVisible(false);
          setAgregado(false);
        }, 2500);
      } else {
        const error = await res.json();
        console.error("Error al agregar al carrito:", error);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };*/

  return (
    <div className={styles.card}>
      <Link href={`/productos/${producto.slug}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <Image
            src={
              producto.imagen_principal ??
              "https://static.vecteezy.com/system/resources/previews/005/720/408/large_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
            }
            alt={producto.nombre}
            width={400}
            height={300}
            className={styles.image}
          />

          <div className={styles.overlayActions}>
            <button
              className={styles.wishlistButton}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Heart className={styles.heartIcon} />
            </button>
          </div>

          <div className={styles.categoryBadge}>
            <span className={styles.categoryText}>
              {producto.categorias?.nombre ?? "Sin categoría"}
            </span>
          </div>
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{producto.nombre}</h3>
        </div>

        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>
              ${producto.precio_base.toLocaleString()}
            </span>
            <span className={styles.priceLabel}>Precio base</span>
          </div>
            
          <Link href={`/productos/${producto.slug}`} ><button
            className={styles.cartButton}
            onClick={(e) => {
              //e.preventDefault();
              //e.stopPropagation(); // Evita redirigir al Link
              //agregarAlCarrito();
            }}
            title="Agregar al carrito"
            style={{ outline: "none", boxShadow: "none" }}
          >
            <ShoppingCart className={styles.cartIcon} />
          </button>
          </Link>
        </div>

        {mensajeVisible && (
          <div
            className={styles.toastSuccess}
            role="status"
            aria-live="polite"
          >
            <Check className={styles.toastIcon} />
            <span>Producto agregado al carrito</span>
          </div>
        )}
      </div>
    </div>
  );
}
