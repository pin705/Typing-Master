<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const navItems = computed(() => [
  { label: t('nav.typing_test'), href: '/', active: true },
  { label: t('nav.english_typing'), href: '/english-typing' },
  { label: t('nav.key_practice'), href: '/practice' },
  { label: t('nav.chinese_typing'), href: '/chinese-typing' },
  { label: t('nav.speed_test'), href: '/speed-test' },
])

const availableLocales = computed(() => {
  return (locales.value as any[]).filter(i => i.code !== locale.value)
})
</script>

<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
      <div class="flex items-center gap-8">
        <NuxtLink :to="localePath('/')" class="text-2xl font-bold flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
          <span class="i-heroicons-keyboard text-3xl"></span>
          <span>Typing Master</span>
        </NuxtLink>
        
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.href"
            :to="localePath(item.href)"
            class="px-4 py-2 rounded-lg transition-all text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary-600"
            active-class="bg-primary-50 text-primary-700 font-semibold"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex items-center gap-4 text-sm">
        <!-- Language Switcher -->
        <div class="relative group">
          <button class="flex items-center gap-1 text-gray-600 hover:text-primary-600 font-medium py-2">
            <span class="uppercase">{{ locale }}</span>
            <span class="i-heroicons-chevron-down text-xs"></span>
          </button>
          <div class="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
            <div class="bg-white rounded-lg shadow-lg border border-gray-100 py-1">
              <button
                v-for="l in locales"
                :key="l.code"
                class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                :class="{ 'text-primary-600 font-bold': l.code === locale }"
                @click="setLocale(l.code)"
              >
                {{ l.name }}
              </button>
            </div>
          </div>
        </div>

        <div class="h-4 w-px bg-gray-200"></div>

        <button class="text-gray-600 hover:text-primary-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
          {{ t('nav.login') }}
        </button>
        <button class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm shadow-primary-200">
          {{ t('nav.register') }}
        </button>
      </div>
    </div>
  </header>
</template>
