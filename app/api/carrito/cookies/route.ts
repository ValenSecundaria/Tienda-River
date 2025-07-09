import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  let carritoId = cookieStore.get("carrito_id")?.value;

  let carrito;

  if (carritoId) {
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

  // Agregamos cantidad al resultado
  const productos = carrito.carrito_producto.map((cp) => ({
    ...cp.productos,
    cantidad: cp.cantidad,
  }));

  return NextResponse.json(productos);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  let carritoId = cookieStore.get("carrito_id")?.value;
  console.log("🔎 COOKIE carrito_id:", carritoId);

  let carrito;

  // Buscar carrito existente
  if (carritoId) {
    const idNum = parseInt(carritoId);
    if (!isNaN(idNum)) {
      carrito = await prisma.carrito.findUnique({
        where: { id: idNum },
        include: {
          carrito_producto: true,
        },
      });
      console.log("🛒 Carrito encontrado:", carrito);
    }
  }

  // Crear nuevo carrito si no existe
  if (!carrito) {
    const nuevoCarrito = await prisma.carrito.create({
      data: {},
      include: {
        carrito_producto: true,
      },
    });
    carritoId = nuevoCarrito.id.toString();
    carrito = nuevoCarrito;

    const response = NextResponse.json(
      { mensaje: "Carrito creado con cookie", carritoId },
      { status: 201 }
    );

    response.cookies.set("carrito_id", carritoId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

    return response;
  }

  // Leer datos del body
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { productoBaseId, talle, color } = body;

  if (
    !productoBaseId ||
    typeof productoBaseId !== "number" ||
    !talle ||
    typeof talle !== "string" ||
    !color ||
    typeof color !== "string"
  ) {
    return NextResponse.json(
      { error: "Faltan o son inválidos los datos requeridos" },
      { status: 400 }
    );
  }

  // Buscar variante
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
    return NextResponse.json(
      { error: "La variante no tiene stock disponible" },
      { status: 400 }
    );
  }

  const productoId = variante.id;

  const tieneProductos = carrito.carrito_producto.length > 0;
  const productoEnCarrito = carrito.carrito_producto.find(
    (item) => item.producto_id === productoId
  );

  if (productoEnCarrito) {
    if (productoEnCarrito.cantidad < variante.stock) {
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

      return NextResponse.json(
        { mensaje: "Cantidad actualizada en el carrito", item: actualizado },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "No se puede agregar más unidades, stock máximo alcanzado" },
        { status: 400 }
      );
    }
  } else {
    // Sea el primer producto o uno distinto nuevo
    const nuevoItem = await prisma.carrito_producto.create({
      data: {
        carrito_id: carrito.id,
        producto_id: productoId,
        cantidad: 1,
      },
    });

    return NextResponse.json(
      { mensaje: "Producto agregado al carrito", item: nuevoItem },
      { status: 201 }
    );
  }
}

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

    const checkExist = await prisma.carrito_producto.findUnique({
      where: {
        carrito_id_producto_id: {
          carrito_id: parseInt(carritoId),
          producto_id: productoId,
        },
      },
    });

    return NextResponse.json({ message: "Cantidad actualizada correctamente", item: actualizado });

  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}


