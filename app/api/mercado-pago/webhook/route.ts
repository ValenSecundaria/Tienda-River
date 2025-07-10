import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
const mercadopago = require("mercadopago")

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const paymentId = body?.data?.id
    const type = body?.type

    if (type !== "payment" || !paymentId) {
      return NextResponse.json({ message: "Evento ignorado" })
    }

    const payment = await mercadopago.payment.findById(paymentId)
    const info = payment.body
    const externalReference = info.external_reference

    if (!externalReference || isNaN(Number(externalReference))) {
      return NextResponse.json({ error: "Referencia externa inválida" }, { status: 400 })
    }

    // Obtener datos anteriores de la transacción para no perder info
    const transaccionActual = await prisma.transacciones.findUnique({
      where: { id: Number(externalReference) },
      select: { datos_adicionales: true },
    })


    // Determinar estado_pago_id
    let estado_pago_id = 1 // pendiente
    if (info.status === "approved") estado_pago_id = 2
    else if (info.status === "rejected") estado_pago_id = 3
    else if (info.status === "in_process") estado_pago_id = 4

    // Actualizar transacción con pago_id fijo (Mercado Pago = 1) y datos combinados
    await prisma.transacciones.update({
      where: { id: Number(externalReference) },
      data: {
        estado_pago_id,
        codigo_transaccion: info.id.toString(),
        forma_pago_id: 1,
        datos_adicionales: {
          metodo: info.payment_method_id,
          tipo: info.payment_type_id,
          email_cliente: info.payer?.email || null,
          estado: info.status,
          status_detail: info.status_detail || null,
          fecha_pago: info.date_approved || null,
        },
      },
    })

    // Si el pago fue aprobado: actualizar orden y stock
    if (estado_pago_id === 2) {
      await prisma.ordenes.updateMany({
        where: { transaccion_id: Number(externalReference) },
        data: { estado_orden_id: 2 }, // pagado
      })

      const orden = await prisma.ordenes.findFirst({
        where: { transaccion_id: Number(externalReference) },
        include: { ordenitems: true },
      })

      if (orden) {
        await Promise.all(
          orden.ordenitems.map((item) =>
            prisma.productos.update({
              where: { id: item.producto_id },
              data: {
                stock: {
                  decrement: item.cantidad,
                },
              },
            })
          )
        )
      }
    }

    return NextResponse.json({ status: "actualizado" })
  } catch (error: any) {
    console.error("Error en webhook:", error.response?.data || error.message || error)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
