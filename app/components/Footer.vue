<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="container mx-auto px-4 py-12 max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 font-bold text-xl text-gray-800 mb-4">
            <img src="/logo-small.svg" alt="Typing Master Logo" class="w-8 h-8">
            Typing Master
          </div>
          <p class="text-gray-500 text-sm leading-relaxed">
            {{ t('footer.rights') }}
          </p>
        </div>
        
        <div>
          <h4 class="font-bold text-gray-800 mb-4">{{ t('footer.resources') }}</h4>
          <ul class="space-y-2 text-sm text-gray-500">
            <li><NuxtLink :to="localePath('/lessons')" class="hover:text-primary-600 transition-colors">{{ t('footer.lessons') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/speed-test')" class="hover:text-primary-600 transition-colors">{{ t('nav.speed_test') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/games')" class="hover:text-primary-600 transition-colors">{{ t('footer.games') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/blog')" class="hover:text-primary-600 transition-colors">{{ t('footer.blog') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-gray-800 mb-4">{{ t('footer.support') }}</h4>
          <ul class="space-y-2 text-sm text-gray-500">
            <li><NuxtLink :to="localePath('/help')" class="hover:text-primary-600 transition-colors">{{ t('footer.help') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/contact')" class="hover:text-primary-600 transition-colors">{{ t('footer.contact') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/privacy')" class="hover:text-primary-600 transition-colors">{{ t('footer.privacy') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/terms')" class="hover:text-primary-600 transition-colors">{{ t('footer.terms') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-gray-800 mb-4">{{ t('footer.connect') }}</h4>
          <div class="flex gap-4">
            <a href="#" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
              <span class="i-simple-icons-github text-sm"></span>
            </a>
            <a href="#" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
              <span class="i-simple-icons-twitter text-sm"></span>
            </a>
            <a href="#" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
              <span class="i-simple-icons-facebook text-sm"></span>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
        <p>© 2025 Typing Master. {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>
