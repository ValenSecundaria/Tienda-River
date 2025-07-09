import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    let carritoId = cookieStore.get("carrito_id")?.value;

    const { productoBaseId, talle, color } = await req.json();

    if (!productoBaseId || !talle || !color) {
      return NextResponse.json({ error: "Faltan datos del producto" }, { status: 400 });
    }

    let carritoCreado = false;

    // Crear carrito si no hay
    if (!carritoId) {
      const nuevoCarrito = await prisma.carrito.create({ data: {} });
      carritoId = String(nuevoCarrito.id);
      carritoCreado = true;
    }

    // Buscar la variante en la misma tabla productos
    const variante = await prisma.productos.findFirst({
      where: {
        producto_base_id: productoBaseId,
        talle,
        color_nombre: color,
      },
    });

    if (!variante) {
      return NextResponse.json({ error: "Variante no encontrada" }, { status: 404 });
    }

    const productoVarianteId = variante.id;

    // Buscar si ya existe en carrito
    const existente = await prisma.carrito_producto.findUnique({
      where: {
        carrito_id_producto_id: {
          carrito_id: parseInt(carritoId),
          producto_id: productoVarianteId,
        },
      },
    });

    let carritoProducto;

    if (existente) {
      // Incrementar cantidad si ya existe
      carritoProducto = await prisma.carrito_producto.update({
        where: {
          carrito_id_producto_id: {
            carrito_id: parseInt(carritoId),
            producto_id: productoVarianteId,
          },
        },
        data: {
          cantidad: { increment: 1 },
        },
      });
    } else {
      // Crear nuevo si no existe
      carritoProducto = await prisma.carrito_producto.create({
        data: {
          carrito_id: parseInt(carritoId),
          producto_id: productoVarianteId,
          cantidad: 1,
        },
      });
    }

    const response = NextResponse.json({
      mensaje: "Producto agregado al carrito",
      carritoProducto,
    });

    // Si se creó carrito, setear cookie
    if (carritoCreado) {
      response.cookies.set("carrito_id", carritoId, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 semana
      });
    }

    return response;
  } catch (error) {
    console.error("Error en POST /api/carrito/cookies:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
