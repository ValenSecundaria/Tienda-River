import { CategoryPageClient } from "@/app/components/CategoryPageClient"
import { getCategoryInfo } from "@/app/lib/category-products"

interface CategoryPageParams {
  categoria: string
}

interface CategoryPageProps {
  params: CategoryPageParams
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = params

  // Obtener información de la categoría para el hero
  const categoryInfo = await getCategoryInfo(categoria)

  return <CategoryPageClient categoria={categoria} categoryInfo={categoryInfo} />
}
