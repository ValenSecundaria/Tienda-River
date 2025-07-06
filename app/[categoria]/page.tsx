import { ProductGrid } from "@/app/components/products/ProductGrid"

interface CategoryPageParams {
  categoria: string
}

interface CategoryPageProps {
  params: CategoryPageParams
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = params

  return (
    <div className="category-page">
      <ProductGrid categoria={categoria} />
    </div>
  )
}
