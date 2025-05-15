import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      // Strapi uploads bucket
      {
        protocol: 'https',
        hostname: 'luma-catalogo-strapi-production.up.railway.app',
        port: '',
        pathname: '/uploads/**',
      },
      // S3 bucket
      {
        protocol: 'https',
        hostname: 'lumafestas.s3.sa-east-1.amazonaws.com',
        port: '',
        pathname: '/uploads/**',
      },
      // Picsum for placeholder images
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // (Opcional) Caso você teste com Strapi local
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};


export default nextConfig;
