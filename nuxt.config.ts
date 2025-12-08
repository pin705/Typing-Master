// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    'nuxt-mongoose',
    'nuxt-auth-utils'
  ],
  eslint: {
    config: {
      stylistic: true // <---
    }
  },
  tailwindcss: {

  }
})
// Force rebuild 3