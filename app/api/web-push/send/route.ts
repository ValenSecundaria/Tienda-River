import { NextResponse } from "next/server";
import webPush from "web-push";
import { prisma } from "@/app/lib/prisma";

webPush.setVapidDetails(
  "mailto:tu-email@ejemplo.com", // Cambialo por el tuyo real
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
  const body = await request.json();
  const payload = JSON.stringify(body);

  try {
    const subscriptions = await prisma.push_subscription.findMany();

    if (subscriptions.length === 0) {
      return NextResponse.json({ error: "No hay suscripciones registradas" }, { status: 400 });
    }

    const results = await Promise.allSettled(
      subscriptions.map((sub) =>
        webPush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          },
          payload
        )
      )
    );

    // Eliminamos las suscripciones que fallaron (por ejemplo, fueron dadas de baja)
    const failed = results
      .map((result, i) => (result.status === "rejected" ? subscriptions[i].endpoint : null))
      .filter((x): x is string => !!x);

    if (failed.length > 0) {
      await prisma.push_subscription.deleteMany({
        where: {
          endpoint: { in: failed },
        },
      });
    }

    return NextResponse.json({
      message: `Notificaciones enviadas. ${failed.length} suscripciones eliminadas.`,
    });
  } catch (error) {
    console.error("Error al enviar notificaciones:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
