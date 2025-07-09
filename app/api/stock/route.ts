import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const talle = searchParams.get("talle");
  const color = searchParams.get("color");
  const baseId = Number(searchParams.get("baseId"));

  if (!talle || !color || !baseId) {
    return NextResponse.json({ error: "Parámetros faltantes" }, { status: 400 });
  }

  const variante = await prisma.productos.findFirst({
    where: {
      producto_base_id: baseId,
      talle,
      color_nombre: color,
    },
    select: {
      stock: true,
    },
  });

  if (!variante) return NextResponse.json({ stock: 0 });
  return NextResponse.json({ stock: variante.stock });
}
