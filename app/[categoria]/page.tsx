import { CategoryPageClient } from "@/app/components/CategoryPageClient";
import { getCategoryInfo } from "@/app/lib/category-products";

interface CategoryPageParams {
  params: {
    categoria: string;
  };
}

export default function CategoryPage({ params }: CategoryPageParams) {
  const { categoria } = params;

  return (
    <AsyncCategoryContent categoria={categoria} />
  );
}

// Hacés la carga de datos en un componente aparte
async function AsyncCategoryContent({ categoria }: { categoria: string }) {
  const categoryInfo = await getCategoryInfo(categoria);

  return <CategoryPageClient categoria={categoria} categoryInfo={categoryInfo} />;
}
