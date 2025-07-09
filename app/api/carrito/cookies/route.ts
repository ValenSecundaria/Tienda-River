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
  const cookieStore = cookies();
  let carritoId = cookieStore.get("carrito_id")?.value;
  console.log("🔎 COOKIE carrito_id:", carritoId);

  let carrito;

  if (carritoId) {
    const idNum = parseInt(carritoId);
    if (!isNaN(idNum)) {
      carrito = await prisma.carrito.findUnique({ where: { id: idNum } });
      console.log("🛒 Carrito encontrado:", carrito);
    }
  }

  if (!carrito) {
    const nuevoCarrito = await prisma.carrito.create({ data: {} });
    carritoId = nuevoCarrito.id.toString();
    carrito = nuevoCarrito;

    console.log("🆕 Nuevo carrito creado:", carrito);

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

  let body;
  try {
    body = await req.json();
  } catch {
    console.log("❌ Error: JSON inválido");
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { productoBaseId, talle, color } = body;
  console.log("📦 Datos del producto:", { productoBaseId, talle, color });

  if (
    !productoBaseId ||
    typeof productoBaseId !== "number" ||
    !talle ||
    typeof talle !== "string" ||
    !color ||
    typeof color !== "string"
  ) {
    console.log("❌ Error: Faltan o son inválidos los datos requeridos");
    return NextResponse.json(
      { error: "Faltan o son inválidos los datos requeridos" },
      { status: 400 }
    );
  }

  const productoBase = await prisma.productos.findUnique({
    where: { id: productoBaseId },
  });

  if (!productoBase) {
    console.log("❌ Producto base no encontrado");
    return NextResponse.json(
      { error: "Producto base no encontrado" },
      { status: 404 }
    );
  }

  const variante = await prisma.productos.findFirst({
    where: {
      producto_base_id: productoBaseId,
      talle,
      color_nombre: color,
    },
  });

  if (!variante) {
    return NextResponse.json(
      { error: "Variante no encontrada" },
      { status: 404 }
    );
  }

  if (variante.stock <= 0) {

    return NextResponse.json(
      { error: "La variante no tiene stock" },
      { status: 400 }
    );
  }

  const productoId = variante.id;

  console.log("🔍 Buscando si el producto ya está en el carrito...", {
    carrito_id: carrito.id,
    producto_id: productoId,
  });

  const productoEnCarrito = await prisma.carrito_producto.findUnique({
    where: {
      carrito_id_producto_id: {
        carrito_id: carrito.id,
        producto_id: productoId,
      },
    },
  });

  console.log("✅ ¿Producto ya estaba en el carrito?:", productoEnCarrito);

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

      console.log("🔁 Producto ya estaba, actualizando cantidad:", actualizado);

      return NextResponse.json(
        { mensaje: "Cantidad actualizada en el carrito", item: actualizado },
        { status: 200 }
      );
    } else {
      console.log("❌ No se puede agregar más, stock máximo alcanzado");
      return NextResponse.json(
        { error: "No se puede agregar más unidades, se alcanzó el stock disponible" },
        { status: 400 }
      );
    }
  } else {
    console.log("➕ Producto no estaba, creando nuevo carrito_producto");

    const nuevoItem = await prisma.carrito_producto.create({
      data: {
        carrito_id: carrito.id,
        producto_id: productoId,
        cantidad: 1,
      },
    });

    console.log("✅ Nuevo carrito_producto creado:", nuevoItem);

    return NextResponse.json(
      { mensaje: "Producto variante agregado al carrito", item: nuevoItem },
      { status: 201 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("🛑 DELETE iniciado");

  const cookieStore = await cookies();
  const carritoId = cookieStore.get("carrito_id")?.value;
  console.log("🍪 carrito_id desde cookie:", carritoId);

  if (!carritoId) {
    console.log("❌ No hay carrito_id en cookies");
    return NextResponse.json({ error: "Carrito no encontrado" }, { status: 400 });
  }

  const { id } = await params;
  console.log("🆔 Producto a eliminar ID:", id);

  const productoId = parseInt(id);
  if (isNaN(productoId)) {
    console.log("❌ ID inválido recibido:", id);
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

    console.log("🔍 Item encontrado en carrito_producto:", item);

    if (!item) {
      console.log("❌ Producto no encontrado en carrito_producto");
      return NextResponse.json({ error: "Producto no encontrado en el carrito" }, { status: 404 });
    }

    const nuevaCantidad = Math.max(item.cantidad - 1, 0);
    console.log(`🔢 Cantidad actual: ${item.cantidad}, nueva cantidad: ${nuevaCantidad}`);

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

    console.log("✅ Registro actualizado en carrito_producto:", actualizado);

    // Aquí agregamos un fetch para verificar que siga existiendo después del update
    const checkExist = await prisma.carrito_producto.findUnique({
      where: {
        carrito_id_producto_id: {
          carrito_id: parseInt(carritoId),
          producto_id: productoId,
        },
      },
    });
    console.log("🔎 Verificación post-update, registro existe?:", !!checkExist);

    return NextResponse.json({ message: "Cantidad actualizada correctamente", item: actualizado });

  } catch (error) {
    console.error("🔥 Error al disminuir cantidad:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}


