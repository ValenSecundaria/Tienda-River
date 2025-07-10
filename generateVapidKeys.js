const webPush = require('web-push');
const fs = require('fs');

// Generar las claves VAPID
const vapidKeys = webPush.generateVAPIDKeys();

const envContent = `
NEXT_PUBLIC_VAPID_PUBLIC_KEY=${vapidKeys.publicKey}
NEXT_PUBLIC_VAPID_PRIVATE_KEY=${vapidKeys.privateKey}
`;

// Escribir en el archivo .env (sobrescribe si ya existe)
fs.writeFileSync('.env', envContent.trim(), { flag: 'w' });

console.log('Claves VAPID generadas y guardadas en .env:');
console.log('Public Key:', vapidKeys.publicKey);
console.log('Private Key:', vapidKeys.privateKey);
