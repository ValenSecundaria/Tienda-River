import { notFound } from "next/navigation";
import CreateProductForm from "../../../../components/productManager/CreateProductForm";
import { getProductForEdit } from "../../../../lib/edit-product";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const productId = Number.parseInt(id);

  if (isNaN(productId)) {
    notFound();
  }

  const result = await getProductForEdit(productId);

  if (result.error || !result.data) {
    notFound();
  }

  return (
    <div>
      <CreateProductForm productId={productId} mode="edit" />
    </div>
  );
}
