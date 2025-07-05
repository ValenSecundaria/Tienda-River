import { ProductCard } from "./ProductCard";
import { prisma } from "@/app/lib/prisma";
import type { productos } from "@prisma/client";
import "./ProductGrid.css";

interface ProductGridProps {
  categoria: string;
}

export async function ProductGrid({ categoria }: ProductGridProps) {
  const productosData: productos[] = await prisma.productos.findMany({
    where: {
      categorias: {
        slug: categoria,
      },
      producto_base_id: null
    },
    include: {
      categorias: true,
    },
    orderBy: {
      fecha_creacion: "desc",
    },
  });

  // Mapear productos para convertir Decimal a Number
  const productos = productosData.map((producto) => ({
    ...producto,
    precio_base: producto.precio_base.toNumber(),
  }));

  if (productos.length === 0) {
    return (
      <div className="product-grid-container">
        <h2>Productos</h2>
        <div className="no-products">
          No hay productos actualmente en esta categoría.
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <h2>Productos</h2>
      <div className="product-grid">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}
