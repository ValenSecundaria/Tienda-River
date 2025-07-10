const withPWA = require("next-pwa")({
  dest: "public",
  mode: "injectManifest",             // Usás tu propio service worker
  swSrc: "service-worker.js",         // Ruta relativa desde la raíz del proyecto
  disable: process.env.NODE_ENV === "development", // No registra SW en desarrollo

  // Evita errores de archivos faltantes (comunes en App Router)
  buildExcludes: [
    /app-build-manifest\.json$/,
    /react-loadable-manifest\.json$/
  ],
});

const nextConfig = {
  images: {
    domains: [
      "celadasa.vtexassets.com",
      "res.cloudinary.com",
      "static.vecteezy.com"
    ],
  },
};

module.exports = withPWA(nextConfig);
