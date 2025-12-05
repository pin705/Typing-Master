<script setup lang="ts">
defineProps<{
  isRunning: boolean
  selectedTime: number
}>()

const emit = defineEmits<{
  (e: 'restart'): void
  (e: 'changeTime', time: number): void
}>()

const timeOptions = [
  { label: '1 min', value: 60 },
  { label: '3 min', value: 180 },
  { label: '5 min', value: 300 },
]
</script>

<template>
  <div class="flex justify-center gap-4 mt-8">
    <button 
      class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
      @click="emit('restart')"
    >
      <span class="i-heroicons-arrow-path"></span>
      Restart
    </button>

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
</template>
