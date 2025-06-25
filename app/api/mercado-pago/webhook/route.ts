import { NextRequest, NextResponse } from "next/server";
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("data.id");
    const type = searchParams.get("type");

    console.log("Webhook recibido:", { paymentId, type });

    if (type === "payment" && paymentId) {
      const payment = await mercadopago.payment.findById(paymentId);
      console.log("Datos del pago:", payment.body);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
