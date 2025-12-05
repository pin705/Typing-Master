<script setup lang="ts">
import type { TypingStats } from '~/composables/useTyping'

defineProps<{
  stats: TypingStats
}>()
</script>

<template>
  <div class="flex gap-8 justify-center mb-8">
    <div class="flex flex-col items-center">
      <span class="text-4xl font-bold text-primary-600">{{ stats.timeRemaining }}</span>
      <span class="text-sm text-gray-500 uppercase tracking-wider font-medium">Time</span>
    </div>
    
    <div class="w-px bg-gray-200"></div>

    <div class="flex flex-col items-center">
      <span class="text-4xl font-bold text-gray-800">{{ stats.wpm }}</span>
      <span class="text-sm text-gray-500 uppercase tracking-wider font-medium">WPM</span>
    </div>

    <div class="w-px bg-gray-200"></div>

    <div class="flex flex-col items-center">
      <span class="text-4xl font-bold text-gray-800">{{ stats.accuracy }}%</span>
      <span class="text-sm text-gray-500 uppercase tracking-wider font-medium">Accuracy</span>
    </div>
  </div>
</template>
