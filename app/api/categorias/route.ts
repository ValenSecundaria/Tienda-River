import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
}

export async function GET() {
  const categorias = await prisma.categorias.findMany({
    include: {
      subcategorias: {
        select: {
          id: true,
          nombre: true,
          descripcion: true
        }
      }
    }
  });

  const items = categorias.map(cat => ({
    label: cat.nombre,
    href: `/${slugify(cat.nombre)}`,
    categorias: [
      {
        id: cat.id,
        nombre: cat.nombre,
        subcategorias: cat.subcategorias.map(sc => ({
          id: sc.id,
          nombre: sc.nombre,
          descripcion: sc.descripcion,
        })),
      },
    ],
  }));

  return NextResponse.json(items);
}


export async function POST(req: Request) {
  try {
    const { nombre , descripcion } = await req.json();

    if (!nombre || typeof nombre !== "string") {
      return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
    }

    if (descripcion && typeof descripcion !== "string") {
      return NextResponse.json({ error: "Descripción inválida" }, { status: 400 });
    }

    const nuevaCategoria = await prisma.categorias.create({
      data: {
        nombre,
        descripcion: descripcion || "", 
        slug: nombre.toLowerCase().replace(/\s+/g, "-"),
      },
    });

    return NextResponse.json(nuevaCategoria, { status: 201 });
  } catch (error) {
    console.error("Error al guardar la categoría:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
