<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isRunning: boolean
  selectedTime: number
}>()

const emit = defineEmits<{
  (e: 'restart'): void
  (e: 'changeTime', time: number): void
  (e: 'changeArticle', articleId: string): void
  (e: 'toggleSetting', setting: string, value: boolean): void
}>()

const timeOptions = [
  { label: '1 min', value: 60 },
  { label: '3 min', value: 180 },
  { label: '5 min', value: 300 },
]

const articles = [
  { id: 'match', label: 'The Little Match Girl' },
  { id: 'census', label: 'American Census' },
  { id: 'programming', label: 'Programming Quotes' },
]

const selectedArticle = ref(articles[0].id)

const settings = ref({
  nightMode: false,
  showTrace: true,
  largeFont: false
})

const toggleSetting = (key: keyof typeof settings.value) => {
  settings.value[key] = !settings.value[key]
  emit('toggleSetting', key, settings.value[key])
}
</script>

<template>
  <div class="flex flex-col gap-6 mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <!-- Top Row: Article & Time -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-500">Article:</span>
          <select 
            v-model="selectedArticle"
            class="px-3 py-1.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            @change="emit('changeArticle', selectedArticle)"
          >
            <option v-for="article in articles" :key="article.id" :value="article.id">
              {{ article.label }}
            </option>
          </select>
        </div>
        
        <button 
          class="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          @click="emit('changeArticle', 'random')"
        >
          Random
        </button>
      </div>

      <div class="flex bg-gray-100 rounded-lg p-1">
        <button
          v-for="option in timeOptions"
          :key="option.value"
          class="px-4 py-1 rounded-md text-sm font-medium transition-all"
          :class="selectedTime === option.value ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-700'"
          @click="emit('changeTime', option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <div class="h-px bg-gray-100"></div>

    <!-- Bottom Row: Settings & Restart -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-6">
        <label class="flex items-center gap-2 cursor-pointer select-none">
          <input 
            type="checkbox" 
            :checked="settings.largeFont"
            class="rounded text-primary-600 focus:ring-primary-500"
            @change="toggleSetting('largeFont')"
          >
          <span class="text-sm text-gray-600">Large Font</span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer select-none">
          <input 
            type="checkbox" 
            :checked="settings.showTrace"
            class="rounded text-primary-600 focus:ring-primary-500"
            @change="toggleSetting('showTrace')"
          >
          <span class="text-sm text-gray-600">Show Trace</span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer select-none">
          <input 
            type="checkbox" 
            :checked="settings.nightMode"
            class="rounded text-primary-600 focus:ring-primary-500"
            @change="toggleSetting('nightMode')"
          >
          <span class="text-sm text-gray-600">Night Mode</span>
        </label>
      </div>

      <button 
        class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm shadow-primary-200"
        @click="emit('restart')"
      >
        <span class="i-heroicons-arrow-path"></span>
        Restart Test
      </button>
    </div>
  </div>
</template>
