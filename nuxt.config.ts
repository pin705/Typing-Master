// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    'nuxt-mongoose',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
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
      { code: 'zh', file: 'zh.json', name: '中文' },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Typing Master',
      short_name: 'TypingMaster',
      description: 'A modern, feature-rich typing practice application',
      theme_color: '#4F46E5',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
  tailwindcss: {

  },
})
