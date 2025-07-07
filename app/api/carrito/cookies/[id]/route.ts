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

  //const productoId = parseInt(params.id);
  if (isNaN(productoId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await prisma.carrito_producto.delete({
      where: {
        carrito_id_producto_id: {
          carrito_id: parseInt(carritoId),
          producto_id: productoId,
        },
      },
    });

    return NextResponse.json({ mensaje: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 500 });
  }

  /*
  // === VERSIÓN PARA USUARIOS REGISTRADOS (comentada) ===
  const usuarioId = obtenerUsuarioDesdeAuth(); // <-- Ejemplo
  const carritoUsuario = await prisma.carrito.findUnique({
    where: { usuario_id: usuarioId },
  });

  if (!carritoUsuario) {
    return NextResponse.json({ error: "Carrito no encontrado" }, { status: 404 });
  }

  await prisma.carrito_producto.delete({
    where: {
      carrito_id_producto_id: {
        carrito_id: carritoUsuario.id,
        producto_id: productoId,
      },
    },
  });
  */
}
