import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, context: Params)  {
  const { id } = context.params;
  const idNum = parseInt(id);



  if (isNaN(idNum)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await prisma.carrito_producto.delete({
      where: {
        carrito_id_producto_id: {
          carrito_id: 1,       
          producto_id: idNum,
        },
      },
    });

    return NextResponse.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error eliminando producto:", error);
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 500 });
  }
}
