import { NextResponse } from "next/server"
import { prisma } from "../../lib/prisma"

export async function GET() {
  try {
    const productosBase = await prisma.productos.findMany({
      where: {
        producto_base_id: null, // Solo productos base
      },
    })
    return NextResponse.json(productosBase)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener productos base" }, { status: 500 })
  }
}
