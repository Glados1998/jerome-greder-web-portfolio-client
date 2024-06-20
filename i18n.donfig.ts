export const i18n = {
  locales: ['en', 'fr', 'es'], // Add your supported locales here
  defaultLocale: 'en',
} as const;

export type Locale = (typeof i18n)['locales'][number];
