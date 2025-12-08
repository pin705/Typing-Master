<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      {{ t('footer.games') }}
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="h-40 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
          <span class="i-heroicons-rocket-launch text-6xl text-blue-500" />
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Type Racer
        </h3>
        <p class="text-gray-600 mb-4">
          Race against time and type as fast as you can!
        </p>
        <button class="text-primary-600 font-medium hover:text-primary-700">
          Play Now &rarr;
        </button>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="h-40 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
          <span class="i-heroicons-bug-ant text-6xl text-green-500" />
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Word Defense
        </h3>
        <p class="text-gray-600 mb-4">
          Defend your base by typing words before they reach you.
        </p>
        <button class="text-primary-600 font-medium hover:text-primary-700">
          Play Now &rarr;
        </button>
      </div>
    </div>
  </div>
</template>
