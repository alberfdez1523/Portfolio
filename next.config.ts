import type { NextConfig } from "next";

/* ================================================================
   Configuración de Next.js
   ================================================================
   - images: optimización de imágenes (formatos modernos)
   - headers: seguridad básica + cache de fuentes
   ================================================================ */
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
