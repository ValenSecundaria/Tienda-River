/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
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
