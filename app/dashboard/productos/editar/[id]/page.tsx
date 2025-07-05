import { notFound } from "next/navigation"
import CreateProductForm from "../../../../components/productManager/CreateProductForm"
//import CreateProductForm from "@/components/CreateProductForm"
import { getProductForEdit } from "../../../../lib/edit-product"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const productId = Number.parseInt(params.id)

  if (isNaN(productId)) {
    notFound()
  }

  // Verificar que el producto existe
  const result = await getProductForEdit(productId)

  if (result.error || !result.data) {
    notFound()
  }

  return (
    <div>
      <CreateProductForm productId={productId} mode="edit" />
    </div>
  )
}
