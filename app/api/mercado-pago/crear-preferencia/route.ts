import { NextRequest, NextResponse } from "next/server";
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: NextRequest) {
  try {
    const preference = {
      items: [
        {
          title: "Pago de prueba",
          quantity: 1,
          unit_price: 1.0,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:3000/mercado-pago/success",
        failure: "http://localhost:3000/mercado-pago/failure",
        pending: "http://localhost:3000/mercado-pago/pending",
      },
       //auto_return: "approved", // Hay que probarlo remotamente, de forma local rompe la llamada al link de mp
    };

    const response = await mercadopago.preferences.create(preference);

    return NextResponse.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return NextResponse.json({ error: "Error creando preferencia" }, { status: 500 });
  }
}
