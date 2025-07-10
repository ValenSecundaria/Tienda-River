// service-worker.js (en la raíz del proyecto)
import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

self.__WB_DISABLE_DEV_LOGS = true;
clientsClaim();

// Precarga los assets generados por next-pwa
precacheAndRoute(self.__WB_MANIFEST);

console.log("[SW] Service worker registrado con éxito");

// Escucha el evento push
self.addEventListener('push', event => {
  console.log("estoy en mi sw propio");
  const data = event.data?.json() || { title: 'Sin datos', body: '' };
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png'
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data.url;
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
