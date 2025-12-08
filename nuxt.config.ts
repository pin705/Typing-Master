// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    'nuxt-mongoose',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true, // <---
    },
  },
  i18n: {
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'vi', file: 'vi.json', name: 'Tiếng Việt' },
      { code: 'zh', file: 'zh.json', name: '中文' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
  },
  tailwindcss: {

  },
})