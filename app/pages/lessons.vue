<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      {{ t('footer.lessons') }}
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Lesson 1: Home Row
        </h3>
        <p class="text-gray-600 mb-4">
          Learn the home row keys: A, S, D, F, J, K, L, ;
        </p>
        <NuxtLink
          :to="localePath('/practice')"
          class="text-primary-600 font-medium hover:text-primary-700"
        >Start Lesson &rarr;</NuxtLink>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Lesson 2: Top Row
        </h3>
        <p class="text-gray-600 mb-4">
          Learn the top row keys: Q, W, E, R, T, Y, U, I, O, P
        </p>
        <NuxtLink
          :to="localePath('/practice')"
          class="text-primary-600 font-medium hover:text-primary-700"
        >Start Lesson &rarr;</NuxtLink>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Lesson 3: Bottom Row
        </h3>
        <p class="text-gray-600 mb-4">
          Learn the bottom row keys: Z, X, C, V, B, N, M, , . /
        </p>
        <NuxtLink
          :to="localePath('/practice')"
          class="text-primary-600 font-medium hover:text-primary-700"
        >Start Lesson &rarr;</NuxtLink>
      </div>
    </div>
  </div>
</template>
