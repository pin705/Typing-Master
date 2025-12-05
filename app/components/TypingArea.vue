<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  targetText: string
  userInput: string
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
    class="relative w-full max-w-4xl mx-auto p-8 rounded-xl bg-white shadow-lg cursor-text min-h-[300px] border-2 transition-colors duration-200"
    :class="isFocused ? 'border-primary-500 ring-2 ring-primary-100' : 'border-gray-200'"
    @click="handleClick"
  >
    <!-- Hidden input to capture focus and mobile keyboard -->
    <input 
      ref="inputRef"
      type="text"
      class="absolute opacity-0 top-0 left-0 w-full h-full cursor-text"
      @blur="blurInput"
      @keydown="handleKeydown"
    />

    <!-- Text Display -->
    <div class="font-mono text-2xl leading-relaxed break-words select-none">
      <span 
        v-for="(char, index) in targetText" 
        :key="index"
        class="relative"
        :class="{
          'text-green-600': index < userInput.length && userInput[index] === char,
          'text-red-500 bg-red-100': index < userInput.length && userInput[index] !== char,
          'text-gray-400': index >= userInput.length,
          'border-l-2 border-primary-500 animate-pulse': index === userInput.length && isFocused
        }"
      >
        {{ char }}
      </span>
    </div>

    <!-- Overlay when not focused -->
    <div 
      v-if="!isFocused" 
      class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] rounded-xl"
    >
      <div class="text-gray-500 font-medium flex items-center gap-2">
        <span class="i-heroicons-cursor-arrow-rays text-xl"></span>
        Click here to start typing
      </div>
    </div>
  </div>
</template>
