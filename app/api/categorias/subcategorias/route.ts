import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nombre, descripcion, categoria_id } = await req.json();

    if (!nombre || typeof nombre !== "string") {
      return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
    }

    if (descripcion && typeof descripcion !== "string") {
      return NextResponse.json({ error: "Descripción inválida" }, { status: 400 });
    }

    if (!categoria_id || typeof categoria_id !== "number") {
      return NextResponse.json({ error: "ID de categoría inválido" }, { status: 400 });
    }

    const nuevaSubcategoria = await prisma.subcategorias.create({
      data: {
        nombre,
        descripcion: descripcion || "",
        slug: nombre.toLowerCase().replace(/\s+/g, "-"),
        categoria_id,
      },
    });

    return NextResponse.json(nuevaSubcategoria, { status: 201 });
  } catch (error) {
    console.error("Error al guardar la subcategoría:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
