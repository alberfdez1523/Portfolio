import type { NextConfig } from "next";
import path from "node:path";

/* ================================================================
   Configuración de Next.js
   ================================================================
   - images: optimización de imágenes (formatos modernos)
   - headers: seguridad básica + cache de fuentes
   ================================================================ */
const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
