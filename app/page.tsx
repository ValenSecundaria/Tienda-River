"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./HomePage.module.css";
import HeroBannerRiver from "./components/page-principal/hero-banner/hero-banner-river";


type Categoria = {
  id: number;
  nombre: string;
  descripcion?: string | null;
  slug: string;
  imagen_url?: string | null;
};

export default function HomePage() {
  const [categorias, setCategorias] = useState<Categoria[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Estado para controlar la altura del hero
  const [heroHeight, setHeroHeight] = useState("500px");

  useEffect(() => {
    // Detectar ancho de ventana y ajustar altura hero
    function ajustarAlturaHero() {
      const ancho = window.innerWidth;
      if (ancho < 576) {
        // pantallas muy chicas (celulares)
        setHeroHeight("300px");
      } else if (ancho < 992) {
        // tablets o pantallas medianas
        setHeroHeight("400px");
      } else {
        // pantallas grandes
        setHeroHeight("500px");
      }
    }

    ajustarAlturaHero();

    window.addEventListener("resize", ajustarAlturaHero);
    return () => window.removeEventListener("resize", ajustarAlturaHero);
  }, []);

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

  async function handleUploadImage(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;

    if (!fileInput.files?.[0]) {
      console.log("⛔ No se seleccionó ningún archivo");
      alert("Selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      console.log("📤 Enviando imagen al servidor...");
      setUploading(true);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      console.log("📬 Respuesta del servidor recibida");

      const data = await res.json();

      if (data.url) {
        console.log("✅ Imagen subida correctamente:", data.url);
        setImageUrl(data.url);
      } else {
        console.error("❌ Error recibido del servidor:", data);
        alert("Error al subir la imagen");
      }
    } catch (error) {
      console.error("🔥 Error al hacer fetch:", error);
      alert("Falló la subida");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        {/* Hero Section con fondo responsive */}
        
        <HeroBannerRiver/>
        
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
                categorias.map(
                  ({ id, nombre, descripcion, slug, imagen_url }) => (
                    <div key={id} className="col-12 col-md-4 mb-4">
                      <Link
                        href={`/${slug}`}
                        className="text-decoration-none text-reset"
                      >
                        <div className={`${styles["card-river"]} h-100 card`}>
                          <img
                            src={
                              imagen_url ??
                              "/placeholder.svg?height=300&width=400"
                            }
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
                  )
                )
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

