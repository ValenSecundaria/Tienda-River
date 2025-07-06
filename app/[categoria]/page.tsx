import { ProductGrid } from "@/app/components/products/ProductGrid"
import CategoryHero from "@/app/components/CategoryHero"
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

  return (
    <div className="category-page">
      <CategoryHero
        categoryName={categoryInfo?.nombre}
        categoryDescription={categoryInfo?.descripcion}
        categoryImage={categoryInfo?.imagen_url}
      />
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <div className="container py-5">
          <ProductGrid categoria={categoria} />
        </div>
      </div>
    </div>
  )
}
