"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./HomePage.module.css";

type Categoria = {
  id: number;
  nombre: string;
  descripcion?: string | null;
  slug: string;
  imagen_url?: string | null;
};

export default function HomePage() {
  const [categorias, setCategorias] = useState<Categoria[] | null>(null);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const res = await fetch("/api/categorias/destacadas");
        if (!res.ok) throw new Error("Error al obtener categorías");
        const data: Categoria[] = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error(error);
        setCategorias([]);
      }
    }
    fetchCategorias();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        {/* Hero Section */}
        <section
          className={`${styles["hero-banner"]} d-flex align-items-center justify-content-center text-white position-relative`}
        >
          <div
            className={`${styles["hero-overlay"]} position-absolute top-0 start-0 w-100 h-100`}
          ></div>
          <div
            className="container-fluid text-center position-relative"
            style={{ zIndex: 3 }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h1 className="display-2 fw-bold mb-4">
                  🏆 TIENDA OFICIAL RIVER PLATE
                </h1>
                <p className="lead fs-3 mb-4">
                  Viví la pasión millonaria con la indumentaria oficial
                </p>
                <p className="fs-5 mb-4">⚪🔴 Desde 1901 haciendo historia ⚪🔴</p>
                <Link
                  href="/components/ofertas"
                  className={`btn ${styles["btn-river"]} btn-lg px-5 py-3`}
                >
                  Ver Colección Oficial
                </Link>

              </div>
            </div>
          </div>
        </section>

        {/* Categorías Destacadas */}
        <section className={`py-5 ${styles["bg-river-light"]}`}>
          <div className="container">
            <div className="row text-center mb-5">
              <div className="col">
                <h2 className={`display-4 fw-bold ${styles["section-title"]}`}>
                  Categorías Millonarias
                </h2>
                <p className="lead mt-4 text-muted">
                  Encontrá todo lo que necesitás para ser parte de la banda
                </p>
              </div>
            </div>
            <div className="row">
              {!categorias ? (
                <p>Cargando categorías...</p>
              ) : categorias.length === 0 ? (
                <p>No hay categorías para mostrar.</p>
              ) : (
                categorias.map(({ id, nombre, descripcion, slug, imagen_url }) => (
                  <div key={id} className="col-12 col-md-4 mb-4">
                    <Link href={`/${slug}`} className="text-decoration-none text-reset">
                      <div className={`${styles["card-river"]} h-100 card`}>
                        <img
                          src={imagen_url ?? "/placeholder.svg?height=300&width=400"}
                          className="card-img-top"
                          alt={`Indumentaria ${nombre}`}
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                        <div className="card-body d-flex flex-column text-center">
                          <h3
                            className={`card-title fs-2 fw-bold mb-3 ${styles["text-river"]}`}
                          >
                            {nombre}
                          </h3>
                          <p className="text-muted mb-3">{descripcion}</p>
                          <div className="mt-auto">
                            <span
                              className={`btn ${styles["btn-river-outline"]} btn-lg`}
                            >
                              Ver Productos
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className={`py-5 ${styles["bg-river-light"]}`}>
          <div className="container">
            <div className="row text-center mb-5">
              <div className="col">
                <h2 className={`display-5 fw-bold ${styles["section-title"]}`}>
                  ¿Por qué elegir nuestra tienda?
                </h2>
              </div>
            </div>
            <div className="row">
              {[
                {
                  icon: "🚚",
                  title: "Envío gratis a todo el país",
                  description:
                    "Tu pasión millonaria llega sin costo adicional a cualquier rincón de Argentina",
                },
                {
                  icon: "💳",
                  title: "Pagá como quieras",
                  description:
                    "Tarjeta, transferencia, efectivo o cuotas. ¡Hacé tu compra millonaria fácil!",
                },
                {
                  icon: "🔄",
                  title: "Cambios sin problemas",
                  description:
                    "Tenés 15 días para cambiar tu producto. ¡Tu satisfacción es nuestra prioridad!",
                },
              ].map(({ icon, title, description }, i) => (
                <div key={i} className="col-12 col-md-4 text-center mb-4">
                  <div className={styles["benefit-icon"]}>{icon}</div>
                  <h4 className={`fw-bold ${styles["text-river"]}`}>{title}</h4>
                  <p className="text-muted">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
