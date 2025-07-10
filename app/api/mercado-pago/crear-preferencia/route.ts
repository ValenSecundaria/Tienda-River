import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productos = body.productos; // [{ id: number, cantidad: number }]

    if (!Array.isArray(productos) || productos.length === 0) {
      return NextResponse.json({ error: "No se recibieron productos" }, { status: 400 });
    }

    // Obtener los productos reales desde la base de datos por ID
    const productosDB = await prisma.productos.findMany({
      where: {
        id: {
          in: productos.map((p: any) => p.id),
        },
      },
    });

    // Calcular total real y preparar ítems para Mercado Pago
    let total = 0;
      const itemsMP = [];

      for (const p of productos) {
        const productoBD = productosDB.find((db) => db.id === p.id);
        if (!productoBD) continue;

        const precio = Number(productoBD.precio_base);
        const cantidad = Number(p.cantidad);

        if (isNaN(precio) || isNaN(cantidad)) continue;

        // 🔴 Validación de stock
        if (productoBD.stock < cantidad) {
          return NextResponse.json({
            error: `No hay suficiente stock para "${productoBD.nombre}". Stock disponible: ${productoBD.stock}, solicitado: ${cantidad}`
          }, { status: 400 });
        }

        total += precio * cantidad;

        itemsMP.push({
          id: productoBD.id.toString(),
          title: productoBD.nombre,
          unit_price: precio,
          quantity: cantidad,
          currency_id: "ARS",
        });
      }



    console.log("El monto total de tu compra es de :" + total);
    console.log("tus productos son:"+ itemsMP);
    // Crear transacción y orden
        const transaccion = await prisma.transacciones.create({
      data: {
        usuario_id: 1,
        monto_total: total,
        estado_pago_id: 1,
        forma_pago_id: 1,
      },
    })

    const datosAdicionales = `${body.nombre}-*-${body.email}-*-${body.telefono || ""}`;

      const orden = await prisma.ordenes.create({
        data: {
          usuario_id: 1,
          estado_orden_id: 1,
          transaccion_id: transaccion.id,
          total,
          direccion_envio: body.direccion || null,
          notas: datosAdicionales
        },
      })

        await Promise.all(
      productos.map((p: any) => {
        const productoBD = productosDB.find((db) => db.id === p.id);
        if (!productoBD) return null;

        return prisma.ordenitems.create({
          data: {
            orden_id: orden.id,
            producto_id: productoBD.id,
            cantidad: Number(p.cantidad),
            precio_unitario: Number(productoBD.precio_base),
          },
        });
      }).filter(Boolean)
    );


    const preference = {
      items: itemsMP,
      back_urls: {
        success: `${process.env.URL_BASE}/components/mercadoPago/success`,
        failure: `${process.env.URL_BASE}/components/mercadoPago/failure`,
        pending: `${process.env.URL_BASE}/components/mercadoPago/pending`,
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
