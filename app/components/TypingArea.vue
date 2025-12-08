<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  targetText: string
  userInput: string
  settings?: {
    largeFont: boolean
    showTrace: boolean
    nightMode: boolean
  }
}>()

const emit = defineEmits<{
  (e: 'input', char: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

const handleKeydown = (e: KeyboardEvent) => {
  if (!isFocused.value) return

  // Prevent default scrolling for space
  if (e.key === ' ') {
    e.preventDefault()
  }

  if (e.key.length === 1 || e.key === 'Backspace') {
    emit('input', e.key)
  }
}

const focusInput = () => {
  if (inputRef.value) {
    inputRef.value.focus()
    isFocused.value = true
  }
}

const blurInput = () => {
  isFocused.value = false
}

// Keep focus when clicking anywhere in the area
const handleClick = () => {
  focusInput()
}
</script>

<template>
  <div
    class="relative w-full max-w-4xl mx-auto p-10 rounded-2xl shadow-xl cursor-text min-h-[320px] border-2 transition-all duration-300"
    :class="[
      isFocused ? 'border-primary-500 ring-4 ring-primary-100 shadow-2xl' : 'border-gray-200 shadow-lg',
      settings?.nightMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900',
    ]"
    @click="handleClick"
  >
    <!-- Hidden input -->
    <input
      ref="inputRef"
      type="text"
      class="absolute opacity-0 top-0 left-0 w-full h-full cursor-text"
      @blur="blurInput"
      @keydown="handleKeydown"
    >

    <!-- Text Display -->
    <div
      class="font-mono leading-loose break-words select-none transition-all"
      :class="settings?.largeFont ? 'text-3xl' : 'text-2xl'"
    >
      <span
        v-for="(char, index) in targetText"
        :key="index"
        class="relative inline-block transition-all duration-75"
        :class="{
          'text-green-600 font-medium': index < userInput.length && userInput[index] === char,
          'text-red-500 bg-red-100 font-medium rounded px-0.5': index < userInput.length && userInput[index] !== char,
          'text-gray-400': index >= userInput.length && !settings?.nightMode,
          'text-gray-500': index >= userInput.length && settings?.nightMode,
          'bg-gray-100 rounded px-0.5': settings?.showTrace && index < userInput.length && userInput[index] === char && !settings?.nightMode,
          'bg-gray-700 rounded px-0.5': settings?.showTrace && index < userInput.length && userInput[index] === char && settings?.nightMode,
        }"
      >
        <span
          v-if="index === userInput.length && isFocused"
          class="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-primary-500 animate-pulse"
        />
        {{ char === ' ' ? '\u00A0' : char }}
      </span>
    </div>

    <!-- Overlay when not focused -->
    <div
      v-if="!isFocused"
      class="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] rounded-2xl transition-all duration-300"
      :class="settings?.nightMode ? 'bg-gray-900/60' : 'bg-white/70'"
    >
      <div
        class="font-medium flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg transition-all"
        :class="settings?.nightMode ? 'text-gray-200 bg-gray-800 border border-gray-700' : 'text-gray-600 bg-white border border-gray-200'"
      >
        <span class="i-heroicons-cursor-arrow-rays text-2xl" />
        <span class="text-lg">Click here to start typing</span>
      </div>
    </div>
  </div>
</template>
