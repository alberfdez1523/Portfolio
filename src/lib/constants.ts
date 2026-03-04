/* ================================================================
   CONSTANTS.TS — Datos estructurales (no traducibles)
   ================================================================
   Todo el texto visible se gestiona en src/lib/i18n.ts.
   Aquí solo quedan URLs, rutas de imagen y tipos.
   ================================================================ */

// --- Redes sociales ---
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/alberto-fern%C3%A1ndez-palomo-38a583267/',
  github: 'https://github.com/alberfdez1523',
  cv: '/cv.pdf',
} as const;

// --- Categorías de skills (usadas como claves de filtrado) ---
export const SKILL_CATEGORIES = ['Programming', 'Frontend', 'Database', 'Quantum'] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

// --- Rutas de imágenes ---
export const PROFILE_IMAGE = '/profile-photo.webp';
export const ABOUT_IMAGE = '/Imagen-TFG.webp';
