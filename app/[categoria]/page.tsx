// app/[categoria]/page.tsx

import { ProductGrid } from "@/app/components/products/ProductGrid";

interface CategoryPageParams {
  categoria: string;
}

interface CategoryPageProps {
  params: CategoryPageParams;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = params;

  return (
    <div className="p-4">
      <ProductGrid categoria={categoria} />
    </div>
  );
}
