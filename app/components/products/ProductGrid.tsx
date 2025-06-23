import { ProductCard } from "./ProductCard";
import { prisma } from "@/app/lib/prisma"; // Asegúrate de tener esta instancia configurada

export async function ProductGrid() {
  const productos = await prisma.productos.findMany({
    where: { activo: true },
    include: {
      categorias: true,
    },
    orderBy: {
      fecha_creacion: "desc",
    },
  });

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
