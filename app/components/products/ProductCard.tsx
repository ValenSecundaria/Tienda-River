"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Check } from "lucide-react";
import { useState } from "react";
import styles from "./ProductCard.module.css";

export function ProductCard({ producto }) {
  const [agregado, setAgregado] = useState(false);
  const [mensajeVisible, setMensajeVisible] = useState(false);

  const agregarAlCarrito = async () => {
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
  };

  return (
    <div className={styles.card}>
      <Link href={`/productos/${producto.slug}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <Image
            src={
              producto.imagen_principal ??
              "/placeholder.svg?text=Sin+imagen&width=400&height=300"
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

          <button
            className={styles.cartButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Evita redirigir al Link
              agregarAlCarrito();
            }}
            title="Agregar al carrito"
            style={{ outline: "none", boxShadow: "none" }}
          >
            <ShoppingCart className={styles.cartIcon} />
          </button>
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
