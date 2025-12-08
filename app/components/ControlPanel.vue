<script setup lang="ts">
import { ref } from 'vue'
import { articles } from '~/data/articles'

defineProps<{
  isRunning: boolean
  selectedTime: number
}>()

const emit = defineEmits<{
  (e: 'restart'): void
  (e: 'change-time', time: number): void
  (e: 'change-article', articleId: string): void
  (e: 'toggle-setting', setting: string, value: boolean): void
}>()

const { t } = useI18n()

const timeOptions = [15, 30, 60, 120]

const settings = ref({
  nightMode: false,
  showTrace: true,
  largeFont: false,
  sound: true,
})

const selectedArticle = ref(articles[0]?.id || 'match')

const handleArticleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  selectedArticle.value = target.value
  emit('change-article', target.value)
}

const toggleSetting = (key: keyof typeof settings.value) => {
  settings.value[key] = !settings.value[key]
  emit('toggle-setting', key, settings.value[key])
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Main Controls -->
    <div class="flex flex-wrap items-center justify-center gap-4">
      <!-- Restart Button -->
      <button
        class="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium shadow-sm shadow-primary-200 transition-all hover:shadow-md hover:shadow-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!isRunning"
        @click="emit('restart')"
      >
        <span class="i-heroicons-arrow-path text-lg"></span>
        <span>{{ t('controls.restart') }}</span>
      </button>

      <!-- Time Selection -->
      <div class="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2 border border-gray-100">
        <span class="i-heroicons-clock text-gray-500 ml-2"></span>
        <div class="flex gap-1">
          <button
            v-for="time in timeOptions"
            :key="time"
            class="px-4 py-2 rounded-md font-medium transition-all text-sm"
            :class="selectedTime === time 
              ? 'bg-primary-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
            @click="emit('change-time', time)"
          >
            {{ time }}s
          </button>
        </div>
      </div>

      <!-- Article Selection -->
      <div class="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2 border border-gray-100">
        <span class="i-heroicons-document-text text-gray-500 ml-2"></span>
        <select
          :value="selectedArticle"
          class="px-3 py-2 rounded-md border-0 bg-transparent font-medium text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
          @change="handleArticleChange"
        >
          <option
            v-for="article in articles"
            :key="article.id"
            :value="article.id"
          >
            {{ article.label }}
          </option>
          <option value="random">🎲 {{ t('controls.random_article') }}</option>
          <option value="custom">✏️ {{ t('controls.custom_text') }}</option>
        </select>
      </div>
    </div>

    <!-- Settings Toggles -->
    <div class="flex flex-wrap items-center justify-center gap-3">
      <button
        class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border"
        :class="settings.nightMode 
          ? 'bg-gray-800 text-white border-gray-700' 
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'"
        @click="toggleSetting('nightMode')"
      >
        <span class="i-heroicons-moon text-lg"></span>
        <span>{{ t('controls.night_mode') }}</span>
      </button>

      <button
        class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border"
        :class="settings.showTrace 
          ? 'bg-primary-50 text-primary-700 border-primary-200' 
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'"
        @click="toggleSetting('showTrace')"
      >
        <span class="i-heroicons-eye text-lg"></span>
        <span>{{ t('controls.show_trace') }}</span>
      </button>

      <button
        class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border"
        :class="settings.largeFont 
          ? 'bg-primary-50 text-primary-700 border-primary-200' 
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'"
        @click="toggleSetting('largeFont')"
      >
        <span class="i-heroicons-arrows-pointing-out text-lg"></span>
        <span>{{ t('controls.large_font') }}</span>
      </button>

      <button
        class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border"
        :class="settings.sound 
          ? 'bg-primary-50 text-primary-700 border-primary-200' 
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'"
        @click="toggleSetting('sound')"
      >
        <span class="i-heroicons-speaker-wave text-lg"></span>
        <span>{{ t('controls.sound') }}</span>
      </button>
    </div>
  </div>
</template>
