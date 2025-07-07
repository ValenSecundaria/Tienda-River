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
  const [isLoading, setIsLoading] = useState(true);
  const [heroHeight, setHeroHeight] = useState("500px");
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 1. Ajustar altura del hero basado en el tamaño de pantalla
  useEffect(() => {
    function ajustarAlturaHero() {
      const ancho = window.innerWidth;
      if (ancho < 576) {
        setHeroHeight("300px");
      } else if (ancho < 992) {
        setHeroHeight("400px");
      } else {
        setHeroHeight("500px");
      }
    }

    ajustarAlturaHero();
    window.addEventListener("resize", ajustarAlturaHero);
    return () => window.removeEventListener("resize", ajustarAlturaHero);
  }, []);

  // 2. Obtener categorías destacadas
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

  // 3. Verificar carga de imágenes después de que las categorías estén listas
  useEffect(() => {
    if (categorias === null) return;

    const timer = setTimeout(() => {
      const images = Array.from(document.querySelectorAll('img'));
      let loadedCount = 0;

      // Si no hay imágenes, marcamos como cargado
      if (images.length === 0) {
        setImagesLoaded(true);
        return;
      }

      const checkImageLoad = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };

      images.forEach(img => {
        if (img.complete) {
          checkImageLoad();
        } else {
          img.addEventListener('load', checkImageLoad);
          img.addEventListener('error', checkImageLoad);
        }
      });

      // Limpieza de event listeners
      return () => {
        images.forEach(img => {
          img.removeEventListener('load', checkImageLoad);
          img.removeEventListener('error', checkImageLoad);
        });
      };
    }, 300); // Pequeño delay para asegurar que el DOM está listo

    return () => clearTimeout(timer);
  }, [categorias]);

  // 4. Determinar cuando todo está cargado
  useEffect(() => {
    if (categorias !== null && imagesLoaded) {
      setIsLoading(false);
    }
  }, [categorias, imagesLoaded]);

  // Función para subir imágenes (mantenida de tu código original)
  async function handleUploadImage(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;

    if (!fileInput.files?.[0]) {
      alert("Selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      setUploading(true);
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      } else {
        alert("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al hacer fetch:", error);
      alert("Falló la subida");
    } finally {
      setUploading(false);
    }
  }

  // Pantalla de carga
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
        <div className="text-center">
          <div 
            className="spinner-border text-primary" 
            style={{ width: '3rem', height: '3rem' }} 
            role="status"
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h2 className="mt-3 text-dark">Cargando la tienda...</h2>
        </div>
      </div>
    );
  }

  // Contenido principal
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        {/* Hero Section */}
        <HeroBannerRiver height={heroHeight} />
        
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
              {categorias?.length === 0 ? (
                <p>No hay categorías para mostrar.</p>
              ) : (
                categorias?.map(({ id, nombre, descripcion, slug, imagen_url }) => (
                  <div key={id} className="col-12 col-md-4 mb-4">
                    <Link
                      href={`/${slug}`}
                      className="text-decoration-none text-reset"
                    >
                      <div className={`${styles["card-river"]} h-100 card`}>
                        <img
                          src={imagen_url ?? "/placeholder.svg?height=300&width=400"}
                          className="card-img-top"
                          alt={`Indumentaria ${nombre}`}
                          style={{ height: "250px", objectFit: "cover" }}
                          loading="lazy" // Mejora el rendimiento
                        />
                        <div className="card-body d-flex flex-column text-center">
                          <h3 className={`card-title fs-2 fw-bold mb-3 ${styles["text-river"]}`}>
                            {nombre}
                          </h3>
                          <p className="text-muted mb-3">{descripcion}</p>
                          <div className="mt-auto">
                            <span className={`btn ${styles["btn-river-outline"]} btn-lg`}>
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
                  description: "Tu pasión millonaria llega sin costo adicional a cualquier rincón de Argentina",
                },
                {
                  icon: "💳",
                  title: "Pagá como quieras",
                  description: "Tarjeta, transferencia, efectivo o cuotas. ¡Hacé tu compra millonaria fácil!",
                },
                {
                  icon: "🔄",
                  title: "Cambios sin problemas",
                  description: "Tenés 15 días para cambiar tu producto. ¡Tu satisfacción es nuestra prioridad!",
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