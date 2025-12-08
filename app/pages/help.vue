<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ t('footer.help') }}</h1>
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-bold text-gray-800 mb-2">How do I start a typing test?</h3>
        <p class="text-gray-600">Simply go to the home page and start typing the text displayed on the screen. The timer will start automatically.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-bold text-gray-800 mb-2">How is WPM calculated?</h3>
        <p class="text-gray-600">WPM (Words Per Minute) is calculated by dividing the number of correct characters typed by 5 and then dividing by the time in minutes.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-bold text-gray-800 mb-2">Can I customize the text?</h3>
        <p class="text-gray-600">Yes, you can choose "Custom Text" from the article dropdown on the home page to paste your own text.</p>
      </div>
    </div>
  </div>
</template>
