import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
const mercadopago = require("mercadopago")

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const paymentId = body?.data?.id;
    const type = body?.type;

    if (type !== "payment" || !paymentId) {
      return NextResponse.json({ message: "Evento ignorado" });
    }

    const payment = await mercadopago.payment.findById(paymentId);
    const info = payment.body;
    const externalReference = info.external_reference;

    console.log("Pago recibido:", info);

    let estado_pago_id = 1; 
    if (info.status === "approved") estado_pago_id = 2;
    else if (info.status === "rejected") estado_pago_id = 3;
    else if (info.status === "in_process") estado_pago_id = 4;

    await prisma.transacciones.update({
      where: { id: Number(externalReference) },
      data: {
        estado_pago_id,
        codigo_transaccion: info.id.toString(),
        datos_adicionales: info,
      },
    });

    if (estado_pago_id === 2) {
      await prisma.ordenes.updateMany({
        where: { transaccion_id: Number(externalReference) },
        data: { estado_orden_id: 2 },
      });

      await prisma.pagos.create({
        data: {
        nombre: "Mateo Didier", 
        detalle: JSON.stringify(info), 
        activo: true,
        icono: "mercadopago", 
      }
  });
    }

    return NextResponse.json({ status: "actualizado" });
  } catch (error) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
} 
