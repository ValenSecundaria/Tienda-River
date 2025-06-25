import { NextApiRequest, NextApiResponse } from "next";
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
});  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

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
        success: "https://prueba-mp-kappa.vercel.app/mercado-pago/success",
        failure: "https://prueba-mp-kappa.vercel.app/mercado-pago/failure",
        pending: "https://prueba-mp-kappa.vercel.app/mercado-pago/pending",
      },
      auto_return: "approved",
      payer: {
        email: "test_user_1045774516@testuser.com",
      },
    };

    const response = await mercadopago.preferences.create(preference);
    console.log("Init point generado:", response.body.init_point);

    console.log("")

    return res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return res.status(500).json({ error: "Error creando preferencia" });
  }
}
