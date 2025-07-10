"use client";

import { useEffect, useState } from "react";
import { registerServiceWorker, subscribeUserToPush } from "../../lib/push";

export default function PushButton() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!("Notification" in window)) {
      setError("Este navegador no soporta notificaciones.");
      return;
    }

    if (Notification.permission === "granted") {
      initPush();
    }
  }, []);

  async function initPush() {
    try {
      const registration = await registerServiceWorker();
      const sub = await subscribeUserToPush(registration);
      setSubscription(sub);

      await fetch("/api/web-push/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub }),
      });
    } catch (err) {
      setError("Error suscribiéndose a notificaciones");
      console.error(err);
    }
  }

  function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        initPush();
      }
    });
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {!subscription && (
        <button onClick={requestPermission}>Permitir notificaciones</button>
      )}
      {subscription && <p>Notificaciones habilitadas ✅</p>}
    </div>
  );
}
