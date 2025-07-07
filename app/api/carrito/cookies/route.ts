import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  let carritoId = cookieStore.get("carrito_id")?.value;

  let carrito;

  if (carritoId) {
    // carritoId existe y es string, pero parseInt puede fallar si no es número
    const idNum = parseInt(carritoId);
    if (!isNaN(idNum)) {
      carrito = await prisma.carrito.findUnique({
        where: { id: idNum },
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
    }
  }

  if (!carrito) {
    // No hay carrito o carrito no encontrado: crear uno nuevo en DB
    const nuevoCarrito = await prisma.carrito.create({ data: {} });
    carritoId = nuevoCarrito.id.toString();

    const response = NextResponse.json([]);
    response.cookies.set("carrito_id", carritoId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });
    return response;
  }

  // carrito encontrado, devolver productos
  const productos = carrito.carrito_producto.map((cp) => cp.productos);
  return NextResponse.json(productos);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  let carritoId = cookieStore.get("carrito_id")?.value;

  let carrito;

  if (carritoId) {
    const idNum = parseInt(carritoId);
    if (!isNaN(idNum)) {
      carrito = await prisma.carrito.findUnique({
        where: { id: idNum },
      });
    }
  }

  if (!carrito) {
    // Crear carrito nuevo
    const nuevoCarrito = await prisma.carrito.create({ data: {} });
    carritoId = nuevoCarrito.id.toString();

    const response = NextResponse.json({ mensaje: "Carrito creado con cookie", carritoId });
    response.cookies.set("carrito_id", carritoId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  }
/*
  const { productoId } = await req.json();

  if (!productoId) {
    return NextResponse.json({ error: "productoId es requerido" }, { status: 400 });
  }
*/
      const { productoBaseId, talle, color } = await req.json();

      if (!productoBaseId || !talle || !color) {
        return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
      }

      // Verificamos que exista el producto base (por seguridad)
      const productoBase = await prisma.productos.findUnique({
        where: { id: productoBaseId },
      });

      if (!productoBase) {
        return NextResponse.json({ error: "Producto base no encontrado" }, { status: 404 });
      }

      // Buscamos la variante específica
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

      if (variante.stock <= 0) {
        return NextResponse.json({ error: "La variante no tiene stock" }, { status: 400 });
      }

      const productoId = variante.id;
  // Revisar si el producto ya está en carrito para aumentar cantidad
  const productoEnCarrito = await prisma.carrito_producto.findUnique({
    where: {
      carrito_id_producto_id: {
        carrito_id: carrito.id,
        producto_id: productoId,
      },
    },
  });

  if (productoEnCarrito) {
    const actualizado = await prisma.carrito_producto.update({
      where: {
        carrito_id_producto_id: {
          carrito_id: carrito.id,
          producto_id: productoId,
        },
      },
      data: {
        cantidad: productoEnCarrito.cantidad + 1,
      },
    });

    return NextResponse.json({ mensaje: "Cantidad actualizada en el carrito", item: actualizado });
  }

  // Crear producto nuevo en carrito con cantidad 1
  const item = await prisma.carrito_producto.create({
    data: {
      carrito_id: carrito.id,
      producto_id: productoId,
      cantidad: 1,
    },
  });

  return NextResponse.json({ mensaje: "Producto agregado al carrito", item });
}

export async function DELETE(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const carritoId = cookieStore.get("carrito_id")?.value;

  if (!carritoId) {
    return NextResponse.json({ error: "Carrito no encontrado" }, { status: 400 });
  }

  //const productoId = parseInt(params.id);
  const { id } = await params;
  const productoId = parseInt(id);
  if (isNaN(productoId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  /*
  try {
    await prisma.carrito_producto.delete({
      where: {
        carrito_id_producto_id: {
          carrito_id: parseInt(carritoId),
          producto_id: productoId,
        },
      },
    });
    return NextResponse.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 500 });
  }
  */

  return NextResponse.json({ mensaje: "Producto eliminado del carrito simulado" });
}
