<script setup lang="ts">
import { ref } from 'vue'

export type Mode = 'time' | 'words' | 'quote' | 'custom'
export type TimeOption = 15 | 30 | 60 | 120
export type WordOption = 10 | 25 | 50 | 100

defineProps<{
  mode: Mode
  timeConfig: number
  wordConfig: number
}>()

const emit = defineEmits<{
  (e: 'update:mode', mode: Mode): void
  (e: 'update:timeConfig', time: number): void
  (e: 'update:wordConfig', count: number): void
  (e: 'toggleOption', option: string): void
}>()

const modes: { label: string; value: Mode }[] = [
  { label: 'Time', value: 'time' },
  { label: 'Words', value: 'words' },
  { label: 'Quote', value: 'quote' },
]

const timeOptions: TimeOption[] = [15, 30, 60, 120]
const wordOptions: WordOption[] = [10, 25, 50, 100]

const options = ref({
  punctuation: false,
  numbers: false
})

const toggleOption = (key: 'punctuation' | 'numbers') => {
  options.value[key] = !options.value[key]
  emit('toggleOption', key)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 mb-8 select-none">
    <!-- Main Config Bar -->
    <div class="flex flex-wrap justify-center items-center gap-6 bg-gray-100/80 backdrop-blur-sm px-6 py-3 rounded-xl text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 shadow-sm">
      
      <!-- Modes -->
      <div class="flex items-center gap-2 border-r border-gray-300 pr-6">
        <button 
          v-for="m in modes" 
          :key="m.value"
          class="flex items-center gap-2 px-2 py-1 rounded hover:text-gray-800 transition-colors"
          :class="{ 'text-primary-600 font-bold': mode === m.value }"
          @click="emit('update:mode', m.value)"
        >
          <span v-if="m.value === 'time'" class="i-heroicons-clock text-lg"></span>
          <span v-if="m.value === 'words'" class="i-heroicons-document-text text-lg"></span>
          <span v-if="m.value === 'quote'" class="i-heroicons-chat-bubble-bottom-center-text text-lg"></span>
          <span class="hidden sm:inline">{{ m.label }}</span>
        </button>
      </div>

      <!-- Sub Options -->
      <div class="flex items-center gap-4">
        <!-- Time Options -->
        <div v-if="mode === 'time'" class="flex items-center gap-2">
          <button
            v-for="t in timeOptions"
            :key="t"
            class="px-2 py-1 rounded hover:text-gray-800 transition-colors"
            :class="{ 'text-primary-600 font-bold': timeConfig === t }"
            @click="emit('update:timeConfig', t)"
          >
            {{ t }}
          </button>
        </div>

        <!-- Word Options -->
        <div v-if="mode === 'words'" class="flex items-center gap-2">
          <button
            v-for="w in wordOptions"
            :key="w"
            class="px-2 py-1 rounded hover:text-gray-800 transition-colors"
            :class="{ 'text-primary-600 font-bold': wordConfig === w }"
            @click="emit('update:wordConfig', w)"
          >
            {{ w }}
          </button>
        </div>
        
        <!-- Quote Options (Placeholder) -->
        <div v-if="mode === 'quote'" class="flex items-center gap-2">
          <span class="text-xs uppercase tracking-wider">Length:</span>
          <button class="hover:text-gray-800">Short</button>
          <button class="hover:text-gray-800">Medium</button>
          <button class="hover:text-gray-800">Long</button>
        </div>
      </div>

      <!-- Toggles -->
      <div class="flex items-center gap-4 border-l border-gray-300 pl-6">
        <button 
          class="flex items-center gap-1 hover:text-gray-800 transition-colors"
          :class="{ 'text-primary-600 font-bold': options.punctuation }"
          @click="toggleOption('punctuation')"
        >
          <span class="i-heroicons-at-symbol text-lg"></span>
          <span class="hidden sm:inline">Punctuation</span>
        </button>
        <button 
          class="flex items-center gap-1 hover:text-gray-800 transition-colors"
          :class="{ 'text-primary-600 font-bold': options.numbers }"
          @click="toggleOption('numbers')"
        >
          <span class="i-heroicons-hashtag text-lg"></span>
          <span class="hidden sm:inline">Numbers</span>
        </button>
      </div>

    </div>
  </div>
</template>
