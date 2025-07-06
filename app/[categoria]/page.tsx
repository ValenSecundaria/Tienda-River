// app/[categoria]/page.tsx

import { CategoryPageClient } from "@/app/components/CategoryPageClient";
import { getCategoryInfo } from "@/app/lib/category-products";

export default function CategoryPageWrapper({ params }: { params: { categoria: string } }) {
  return <CategoryPageAsync categoria={params.categoria} />;
}

// Componente async separado
async function CategoryPageAsync({ categoria }: { categoria: string }) {
  const categoryInfo = await getCategoryInfo(categoria);

  return <CategoryPageClient categoria={categoria} categoryInfo={categoryInfo} />;
}
