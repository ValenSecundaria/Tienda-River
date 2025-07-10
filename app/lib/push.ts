export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    // 🔥 Asegurate de registrar el SW en `/sw.js` (no el que next-pwa pone por defecto)
    return navigator.serviceWorker.register("/sw.js");
  }
  throw new Error("Service worker no soportado");
}

export async function subscribeUserToPush(registration: ServiceWorkerRegistration) {
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
  };

  const subscription = await registration.pushManager.subscribe(subscribeOptions);
  return subscription;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
