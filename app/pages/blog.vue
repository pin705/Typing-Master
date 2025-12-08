<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      {{ t('footer.blog') }}
    </h1>
    <div class="space-y-8">
      <article class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          Top 10 Tips to Improve Typing Speed
        </h2>
        <p class="text-gray-500 text-sm mb-4">
          December 8, 2025
        </p>
        <p class="text-gray-600 mb-4">
          Typing fast is a skill that can be learned. Here are the top 10 tips to help you type faster and more accurately...
        </p>
        <a
          href="#"
          class="text-primary-600 font-medium hover:text-primary-700"
        >Read more &rarr;</a>
      </article>
      <article class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          Why Touch Typing is Important
        </h2>
        <p class="text-gray-500 text-sm mb-4">
          December 1, 2025
        </p>
        <p class="text-gray-600 mb-4">
          Touch typing allows you to type without looking at the keyboard. This can significantly improve your productivity...
        </p>
        <a
          href="#"
          class="text-primary-600 font-medium hover:text-primary-700"
        >Read more &rarr;</a>
      </article>
    </div>
  </div>
</template>
