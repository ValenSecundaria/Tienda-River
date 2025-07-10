// /app/api/dashboard/stats/route.ts (o .js)
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Asegurate que este sea tu import de Prisma correcto
import { startOfDay, endOfDay } from "date-fns";

export async function GET() {
  try {
    const [productosTotales, ordenesPendientes, usuariosActivos, ingresosTotales, ventasDelDia] = await Promise.all([
      prisma.productos.count({
        where: {
          producto_base_id: null, // son los productos "base"
        },
      }),
      prisma.ordenes.count({
        where: {
          estadoorden: {
            es_final: false,
          },
        },
      }),
      prisma.usuarios.count(),
      prisma.transacciones.aggregate({
        where: {
          estado_pago_id: 1, // estado "pagado"
        },
        _sum: {
          monto_total: true,
        },
      }),
      prisma.ordenes.count({
        where: {
          fecha: {
            gte: startOfDay(new Date()),
            lte: endOfDay(new Date()),
          },
        },
      }),
    ]);

    return NextResponse.json({
      productosTotales,
      ordenesPendientes,
      usuariosActivos,
      ingresosTotales: ingresosTotales._sum.monto_total ?? 0,
      ventasDelDia,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 });
  }
}
