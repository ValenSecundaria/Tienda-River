import { NextResponse } from "next/server"
import { prisma } from "../../lib/prisma"
import { cookies } from "next/headers"

export async function GET() {
  
  const carrito = await prisma.carrito.findUnique({
    where: { id: 1 },
    include: {
      carrito_producto: {
        include: {
          productos: {
            select: {
              id: true,
              nombre: true,
              imagen_principal: true,
              precio_base: true,
            },
          },
        },
      },
    },
  });

  if (!carrito) {
    return NextResponse.json({ error: "Carrito no encontrado" }, { status: 404 });
  }

  const productos = carrito.carrito_producto.map(cp => cp.productos);

  return NextResponse.json(productos);
}
