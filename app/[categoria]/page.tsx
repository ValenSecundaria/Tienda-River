import { getCategoryInfo } from "@/app/lib/category-products"
import CategoryPageClientWrapper from "@/app/components/CategoryPageClientWrapper"

export default async function CategoryPage({ params }: { params: { categoria: string } }) {
  const categoria = params.categoria
  const categoryInfo = await getCategoryInfo(categoria)

  return <CategoryPageClientWrapper categoria={categoria} categoryInfo={categoryInfo} />
}
