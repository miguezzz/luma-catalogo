import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "picsum.photos", "luma-catalogo-strapi-production.up.railway.app"],
  },
};

export default nextConfig;
