import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import type { PushSubscription } from "web-push";

export async function POST(request: Request) {
  const { subscription }: { subscription: PushSubscription } = await request.json();

  if (!subscription || !subscription.endpoint || !subscription.keys) {
    return NextResponse.json({ error: "Suscripción inválida" }, { status: 400 });
  }

  const { endpoint, keys } = subscription;

  try {
    const existing = await prisma.push_subscription.findUnique({
      where: { endpoint },
    });

    if (!existing) {
      await prisma.push_subscription.create({
        data: {
          endpoint,
          p256dh: keys.p256dh,
          auth: keys.auth,
        },
      });
    }

    return NextResponse.json({ message: "Suscripción guardada correctamente" });
  } catch (error) {
    console.error("Error al guardar la suscripción:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
