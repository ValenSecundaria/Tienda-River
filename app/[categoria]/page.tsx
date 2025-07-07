//export const dynamic = "force-dynamic";

import { CategoryPageClient } from "@/app/components/CategoryPageClient";
import { getCategoryInfo } from "@/app/lib/category-products";

export default async function CategoryPage(props: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await props.params;

  const categoryInfo = await getCategoryInfo(categoria);

  return (
    <CategoryPageClient categoria={categoria} categoryInfo={categoryInfo} />
  );
}

