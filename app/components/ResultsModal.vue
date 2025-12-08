<script setup lang="ts">
import type { TypingStats } from '~/composables/useTyping'

defineProps<{
  stats: TypingStats
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'restart'): void
}>()
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all scale-100">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Result</h2>
      
      <div class="grid grid-cols-2 gap-6 mb-8">
        <div class="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <span class="text-5xl font-bold text-primary-600 mb-2">{{ stats.wpm }}</span>
          <span class="text-sm text-gray-500 font-medium uppercase tracking-wider">WPM</span>
        </div>
        
        <div class="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <span class="text-5xl font-bold text-primary-600 mb-2">{{ stats.accuracy }}%</span>
          <span class="text-sm text-gray-500 font-medium uppercase tracking-wider">Accuracy</span>
        </div>

        <div class="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <span class="text-2xl font-bold text-gray-800 mb-1">{{ stats.correctChars }}</span>
          <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">Correct</span>
        </div>

        <div class="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <span class="text-2xl font-bold text-red-500 mb-1">{{ stats.incorrectChars }}</span>
          <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">Errors</span>
        </div>
      </div>

      <button 
        class="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary-500/30"
        @click="emit('restart')"
      >
        <span class="i-heroicons-arrow-path text-xl"></span>
        Play Again
      </button>
    </div>
  </div>
</template>
