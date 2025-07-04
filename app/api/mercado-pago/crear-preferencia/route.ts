import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const price = Number(body.price);
    if (isNaN(price)) {
      return NextResponse.json({ error: "Precio inválido" }, { status: 400 });
    }

    const transaccion = await prisma.transacciones.create({
      data: {
        usuario_id: 1,              // Harcodeado (mejor si sacas después)
        monto_total: price,
        estado_pago_id: 1,          // "pendiente"
        forma_pago_id: 1,           // MercadoPago
      },
    });

    const orden = await prisma.ordenes.create({
      data: {
        usuario_id: 1,
        estado_orden_id: 1,         // pendiente
        transaccion_id: transaccion.id,
        total: price,
        direccion_envio: body.direccion || null,
      },
    });

    const preference = {
      items: [
        {
          id: orden.id.toString(),
          title: body.title || "Producto",
          description: body.description || "Descripción del producto",
          unit_price: price,
          quantity: Number(body.quantity) || 1,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: `${process.env.URL_BASE}/mercado-pago/success`,
        failure: `${process.env.URL_BASE}/mercado-pago/failure`,
        pending: `${process.env.URL_BASE}/mercado-pago/pending`,
      },
      notification_url: `${process.env.URL_BASE}/api/mercado-pago/webhook`,
      auto_return: "approved",
      external_reference: transaccion.id.toString(),
    };

    const response = await mercadopago.preferences.create(preference);
    return NextResponse.json({ init_point: response.body.init_point });

  } catch (error: any) {
    console.error("Error creando preferencia:", error);
    return NextResponse.json({ error: error.message || "Error creando preferencia" }, { status: 500 });
  }
}


// En caso de que quieras usar feedback y webhook como en el ejemplo original, los podrías definir en otros archivos bajo /api/mercado-pago/feedback/route.ts y /api/mercado-pago/webhook/route.ts
