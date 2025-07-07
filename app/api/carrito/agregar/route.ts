// app/api/carrito/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { authConfig } from "../../../../auth.config";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    /*
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    */
   
    //const userId = Number(session.user.id);
    const userId = 1; // temporalmente hardcodeado para pruebas

    const { productoId } = await request.json();

    if (!productoId) {
      return NextResponse.json(
        { error: "Falta productoId en la solicitud" },
        { status: 400 }
      );
    }

    let carrito = await prisma.carrito.findUnique({
      where: { usuario_id: userId },
    });

    if (!carrito) {
      carrito = await prisma.carrito.create({
        data: {
          usuario_id: userId,
        },
      });
    }

    const carritoProducto = await prisma.carrito_producto.create({
      data: {
        carrito_id: carrito.id,
        producto_id: productoId,
        cantidad: 1,
      },
    });

    return NextResponse.json({
      mensaje: "Producto agregado al carrito",
      carritoProducto,
    });

  } catch (error) {
    console.error("Error en /api/carrito:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
