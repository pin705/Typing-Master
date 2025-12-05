<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Mock text for now
const MOCK_TEXT = "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Clean code always looks like it was written by someone who cares."

const selectedTime = ref(60)
const { 
  targetText, 
  userInput, 
  stats, 
  isRunning, 
  setText, 
  handleInput, 
  reset,
  setDuration
} = useTyping(selectedTime.value)

onMounted(() => {
  setText(MOCK_TEXT)
})

const handleRestart = () => {
  reset()
  setText(MOCK_TEXT)
}

const handleChangeTime = (time: number) => {
  selectedTime.value = time
  setDuration(time)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-primary-100 selection:text-primary-700">
    <div class="container mx-auto px-4 py-12 max-w-5xl">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Typing Master</h1>
        <p class="text-gray-500">Test your speed and accuracy</p>
      </header>

      <!-- Stats -->
      <StatsDisplay :stats="stats" />

      <!-- Typing Area -->
      <TypingArea 
        :target-text="targetText"
        :user-input="userInput"
        @input="handleInput"
      />

      <!-- Controls -->
      <ControlPanel 
        :is-running="isRunning"
        :selected-time="selectedTime"
        @restart="handleRestart"
        @change-time="handleChangeTime"
      />
      
      <!-- Footer -->
      <footer class="mt-16 text-center text-gray-400 text-sm">
        <p>Press <kbd class="px-2 py-1 bg-gray-200 rounded text-gray-600 font-mono text-xs">Tab</kbd> to restart</p>
      </footer>
    </div>
  </div>
</template>

<style>
/* Global styles */
body {
  @apply antialiased;
}
</style>
