import { NextRequest, NextResponse } from "next/server";
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const preference = {
      items: [
        {
          id: body.id || "item-id-prueba",
          title: body.title || "Producto de prueba",
          description: body.description || "Descripción del producto",
          unit_price: Number(body.price || 1),
          quantity: Number(body.quantity || 1),
          currency_id: "ARS",
        },
      ],
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "gemetrov@gmail.com",
        phone: {
          area_code: "0353",
          number: 154115273,
        },
        address: {
          street_name: "calle falsa",
          street_number: 123,
          zip_code: "5900",
        },
      },
      back_urls: {
        success: `${process.env.URL_BASE || "https://prueba-mp-kappa.vercel.app"}/mercado-pago/success`,
        failure: `${process.env.URL_BASE || "https://prueba-mp-kappa.vercel.app"}/mercado-pago/failure`,
        pending: `${process.env.URL_BASE || "https://prueba-mp-kappa.vercel.app"}/mercado-pago/pending`,
      },
      notification_url: `${process.env.URL_BASE || "https://prueba-mp-kappa.vercel.app"}/api/mercado-pago/webhook`,
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "visa"
          }
        ],
        excluded_payment_types: [],
        installments: 6,
      },
      external_reference: "gemetrovalentin@hotmail.com"
    };

    const response = await mercadopago.preferences.create(preference);
    console.log("Init point generado:", response.body.init_point);

    return NextResponse.json({ init_point: response.body.init_point });
  } catch (error: any) {
    console.error("Error creando preferencia:", error);
    return NextResponse.json({ error: error.message || "Error creando preferencia" }, { status: 500 });
  }
}

// En caso de que quieras usar feedback y webhook como en el ejemplo original, los podrías definir en otros archivos bajo /api/mercado-pago/feedback/route.ts y /api/mercado-pago/webhook/route.ts
