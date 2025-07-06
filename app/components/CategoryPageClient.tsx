"use client"

import { useState } from "react"
import { ProductGrid } from "@/app/components/products/ProductGrid"
import CategoryHero from "./CategoryHero"

interface CategoryPageClientProps {
  categoria: string
  categoryInfo?: {
    id: number
    nombre: string
    descripcion: string | null
    imagen_url: string | null
  } | null
}

export function CategoryPageClient({ categoria, categoryInfo }: CategoryPageClientProps) {
  const [productCount, setProductCount] = useState(0)

  const handleProductCountChange = (count: number) => {
    setProductCount(count)
  }

  return (
    <div className="category-page">
      <CategoryHero
        categoryName={categoryInfo?.nombre}
        categoryDescription={categoryInfo?.descripcion}
        categoryImage={categoryInfo?.imagen_url}
        productCount={productCount}
      />
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <div className="container py-5">
          <ProductGrid categoria={categoria} onProductCountChange={handleProductCountChange} />
        </div>
      </div>
    </div>
  )
}
