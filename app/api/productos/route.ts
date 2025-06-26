
import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const productos = await prisma.productos.findMany();
    return NextResponse.json(productos);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}
