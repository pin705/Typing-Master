<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const keysToPractice = 'asdfjkl;'
const targetChar = ref('')
const pressedKey = ref('')
const score = ref(0)
const mistakes = ref(0)

const generateNextChar = () => {
  const randomIndex = Math.floor(Math.random() * keysToPractice.length)
  targetChar.value = keysToPractice[randomIndex]
}

const handleKeydown = (e: KeyboardEvent) => {
  pressedKey.value = e.key

  if (e.key === targetChar.value) {
    score.value++
    generateNextChar()
  }
  else {
    mistakes.value++
  }

  setTimeout(() => {
    pressedKey.value = ''
  }, 100)
}

onMounted(() => {
  generateNextChar()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="flex flex-col items-center gap-12 py-12">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Key Practice
      </h1>
      <p class="text-gray-500">
        Practice your touch typing skills
      </p>
    </div>

    <!-- Stats -->
    <div class="flex gap-12">
      <div class="text-center">
        <div class="text-4xl font-bold text-green-600">
          {{ score }}
        </div>
        <div class="text-sm text-gray-500 uppercase tracking-wider">
          Score
        </div>
      </div>
      <div class="text-center">
        <div class="text-4xl font-bold text-red-500">
          {{ mistakes }}
        </div>
        <div class="text-sm text-gray-500 uppercase tracking-wider">
          Mistakes
        </div>
      </div>
    </div>

    <!-- Target Display -->
    <div class="text-9xl font-mono font-bold text-primary-600 mb-8">
      {{ targetChar }}
    </div>

    <!-- Virtual Keyboard -->
    <VirtualKeyboard
      :active-key="targetChar"
      :pressed-key="pressedKey"
    />

    <div class="text-gray-400 text-sm mt-8">
      Press the highlighted key on your keyboard
    </div>
  </div>
</template>
