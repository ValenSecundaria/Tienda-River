import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const paymentId = body?.data?.id;
    const type = body?.type;

    // Ignorar eventos que no sean "payment"
    if (type !== "payment" || !paymentId) {
      return NextResponse.json({ message: "Evento ignorado" });
    }

    // Obtener detalles del pago desde MP
    const payment = await mercadopago.payment.findById(paymentId);
    const info = payment.body;
    const externalReference = info.external_reference;

    if (!externalReference || isNaN(Number(externalReference))) {
      return NextResponse.json({ error: "Referencia externa inválida" }, { status: 400 });
    }

    // Mapear estado a ID de tabla estados_pago
    let estado_pago_id = 1; // por defecto: pendiente
    if (info.status === "approved") estado_pago_id = 2;
    else if (info.status === "rejected") estado_pago_id = 3;
    else if (info.status === "in_process") estado_pago_id = 4;

    // Actualizar la transacción
    await prisma.transacciones.update({
      where: { id: Number(externalReference) },
      data: {
        estado_pago_id,
        codigo_transaccion: info.id.toString(),
        datos_adicionales: {
          metodo: info.payment_method_id,
          tipo: info.payment_type_id,
          email_cliente: info.payer?.email || null,
          estado: info.status,
          status_detail: info.status_detail || null,
          fecha_pago: info.date_approved || null,
        },
      },
    });

    // Si está aprobado: marcar orden como pagada, registrar el pago y actualizar stock
    if (estado_pago_id === 2) {
      await prisma.ordenes.updateMany({
        where: { transaccion_id: Number(externalReference) },
        data: { estado_orden_id: 2 }, // pagado
      });

      await prisma.pagos.create({
        data: {
          nombre: info.payer?.email || "Pago MP",
          detalle: JSON.stringify({
            id: info.id,
            status: info.status,
            status_detail: info.status_detail,
            email: info.payer?.email,
            monto: info.transaction_amount,
            metodo: info.payment_method_id,
            tipo: info.payment_type_id,
            fecha: info.date_approved,
          }),
          activo: true,
          icono: "mercadopago",
        },
      });

      // 🔻 Actualizar stock de productos
      const orden = await prisma.ordenes.findFirst({
        where: { transaccion_id: Number(externalReference) },
        include: { ordenitems: true },
      });

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
        );
      }
    }

    return NextResponse.json({ status: "actualizado" });
  } catch (error: any) {
    console.error("Error en webhook:", error.response?.data || error.message || error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
