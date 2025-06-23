// app/[categoria]/page.tsx
import { ProductGrid } from "@/app/components/products/ProductGrid";

export default async function CategoryPage({ params }) {
  const { categoria } = params;

  return (
    <div className="p-4">
      <ProductGrid categoria={categoria} />
    </div>
  );
}
