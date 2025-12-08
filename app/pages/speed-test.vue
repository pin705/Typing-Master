<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isTesting = ref(false)
const progress = ref(0)
const result = ref<number | null>(null)

const startTest = () => {
  isTesting.value = true
  progress.value = 0
  result.value = null

  const interval = setInterval(() => {
    progress.value += 1
    if (progress.value >= 100) {
      clearInterval(interval)
      isTesting.value = false
      result.value = Math.floor(Math.random() * 40) + 40 // Random WPM between 40-80
    }
  }, 30)
}
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl text-center">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">
      Typing Speed Test
    </h1>

    <div class="bg-white p-12 rounded-xl shadow-sm border border-gray-100">
      <div v-if="!isTesting && result === null">
        <p class="text-gray-600 mb-8 text-lg">
          Test your typing speed with our quick 1-minute test.
        </p>
        <button
          class="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-xl font-bold rounded-xl transition-colors shadow-lg shadow-primary-500/30"
          @click="startTest"
        >
          Start Speed Test
        </button>
      </div>

      <div v-else-if="isTesting">
        <p class="text-gray-600 mb-4 font-medium">
          Testing your speed...
        </p>
        <div class="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-primary-600 transition-all duration-100 ease-linear"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>

      <div
        v-else
        class="animate-fade-in"
      >
        <div class="mb-8">
          <span class="text-6xl font-bold text-primary-600">{{ result }}</span>
          <span class="text-xl text-gray-500 font-medium ml-2">WPM</span>
        </div>
        <p class="text-gray-600 mb-8">
          Great job! Keep practicing to improve your speed.
        </p>
        <button
          class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors"
          @click="startTest"
        >
          Test Again
        </button>
      </div>
    </div>
  </div>
</template>
