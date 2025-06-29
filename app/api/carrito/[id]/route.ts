import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await prisma.carrito_producto.delete({
      where: {
        carrito_id_producto_id: {
          carrito_id: 1,       
          producto_id: id,
        },
      },
    });

    return NextResponse.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error eliminando producto:", error);
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 500 });
  }
}
