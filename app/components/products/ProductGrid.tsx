import { ProductCard } from "./ProductCard";
import { prisma } from "@/app/lib/prisma"; 

export async function ProductGrid({ categoria }) {
  // Traemos productos junto con la categoría
  const productosData = await prisma.productos.findMany({
    where: {
      categorias: {
        slug: categoria,
      },
    },
    include: {
      categorias: true,
    },
    orderBy: {
      fecha_creacion: "desc",
    },
  });

  // Parseamos para convertir Decimal -> Number
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
        <style>{`
          .product-grid-container {
            width: 100%;
          }

          .no-products {
            padding: 1rem;
            font-size: 1.1rem;
            color: #555;
            text-align: center;
            border: 1px dashed #ccc;
            border-radius: 8px;
            margin: 2rem 0;
            background-color: #fafafa;
          }
        `}</style>
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
      <style>{`
        .product-grid-container {
          width: 100%;
        }

        .product-grid-container h2 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        /* Responsive para que funcione en pantallas más chicas */
        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .product-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
