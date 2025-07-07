// /app/ofertas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "../products/ProductCard"; // ajustá el path si es necesario

interface Producto {
  id: number
  nombre: string
  slug: string
  descripcion: string | null
  precio_base: number
  categoria_id: number | null
  subcategoria_id: number | null
  activo: boolean
  fecha_creacion: Date
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

export default function OfertasPage() {
  const [productos, setProductos] = useState<Producto[] | null>(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch("/api/productos");
        if (!res.ok) throw new Error("Error al obtener productos");
        const data: Producto[] = await res.json();

        // Hardcodear la categoría con ID 1 y nombre "Colección Oficial"
        const productosConCategoria = data.map((producto) => ({
          ...producto,
          categorias: {
            id : 1,
            nombre: "Colección Oficial",
          },
        }));

        setProductos(productosConCategoria);
      } catch (error) {
        console.error(error);
        setProductos([]);
      }
    }

    fetchProductos();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold">Colección Oficial</h1>
            <p className="lead text-muted">
              Todos los productos disponibles de la Tienda Oficial River Plate
            </p>
          </div>

          {!productos ? (
            <p className="text-center">Cargando productos...</p>
          ) : productos.length === 0 ? (
            <p className="text-center">No hay productos disponibles.</p>
          ) : (
            <div className="row">
              {productos.map((producto) => (
                <div key={producto.id} className="col-12 col-md-4 mb-4">
                  <ProductCard producto={producto} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
