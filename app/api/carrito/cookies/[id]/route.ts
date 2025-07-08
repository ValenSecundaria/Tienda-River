import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const carritoId = cookieStore.get("carrito_id")?.value;

  if (!carritoId) {
    return NextResponse.json({ error: "Carrito no encontrado" }, { status: 400 });
  }

  const { id } = await params;
  const productoId = parseInt(id);

  if (isNaN(productoId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    // Buscar el producto en el carrito
    const item = await prisma.carrito_producto.findUnique({
      where: {
        carrito_id_producto_id: {
          carrito_id: parseInt(carritoId),
          producto_id: productoId,
        },
      },
    });

    if (!item) {
      return NextResponse.json({ error: "Producto no encontrado en el carrito" }, { status: 404 });
    }

    const nuevaCantidad = Math.max(item.cantidad - 1, 0);

    // Actualizar la cantidad en vez de eliminar el registro
    const actualizado = await prisma.carrito_producto.update({
      where: {
        carrito_id_producto_id: {
          carrito_id: parseInt(carritoId),
          producto_id: productoId,
        },
      },
      data: {
        cantidad: nuevaCantidad,
      },
    });

    return NextResponse.json({ mensaje: "Cantidad actualizada correctamente", item: actualizado });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 500 });
  }
}
