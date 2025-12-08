<script setup lang="ts">
import type { TypingStats } from '~/composables/useTyping'

defineProps<{
  stats: TypingStats
}>()
</script>

<template>
  <div class="flex gap-6 justify-center mb-8 flex-wrap">
    <div class="flex flex-col items-center bg-white rounded-xl shadow-sm border border-gray-100 px-8 py-4 min-w-[140px] transition-all hover:shadow-md hover:border-primary-100">
      <div class="flex items-baseline gap-1 mb-1">
        <span class="text-5xl font-bold text-primary-600 tabular-nums">{{ stats.timeRemaining }}</span>
        <span class="text-lg text-primary-400 font-medium">s</span>
      </div>
      <span class="text-xs text-gray-500 uppercase tracking-widest font-semibold">Time</span>
    </div>

    <div class="flex flex-col items-center bg-white rounded-xl shadow-sm border border-gray-100 px-8 py-4 min-w-[140px] transition-all hover:shadow-md hover:border-green-100">
      <div class="flex items-baseline gap-1 mb-1">
        <span class="text-5xl font-bold text-gray-800 tabular-nums">{{ stats.wpm }}</span>
      </div>
      <span class="text-xs text-gray-500 uppercase tracking-widest font-semibold">WPM</span>
    </div>

    <div class="flex flex-col items-center bg-white rounded-xl shadow-sm border border-gray-100 px-8 py-4 min-w-[140px] transition-all hover:shadow-md hover:border-blue-100">
      <div class="flex items-baseline gap-1 mb-1">
        <span class="text-5xl font-bold tabular-nums" :class="stats.accuracy >= 95 ? 'text-green-600' : stats.accuracy >= 80 ? 'text-yellow-600' : 'text-red-600'">{{ stats.accuracy }}</span>
        <span class="text-lg font-medium" :class="stats.accuracy >= 95 ? 'text-green-400' : stats.accuracy >= 80 ? 'text-yellow-400' : 'text-red-400'">%</span>
      </div>
      <span class="text-xs text-gray-500 uppercase tracking-widest font-semibold">Accuracy</span>
    </div>
  </div>
</template>
