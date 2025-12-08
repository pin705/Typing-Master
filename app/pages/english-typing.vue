<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { articles } from '~/data/articles'

// Reuse the typing logic but filter for English articles only
const englishArticles = articles.filter(a => a.lang === 'en')

const selectedTime = ref(60)
const {
  targetText,
  userInput,
  stats,
  isFinished,
  activeKey,
  pressedKey,
  setText,
  handleInput,
  reset,
} = useTyping(selectedTime.value)

const settings = ref({
  nightMode: false,
  showTrace: true,
  largeFont: false,
  sound: true,
})

const { playClick, playError } = useSound()

const onTypingInput = (char: string) => {
  const previousLength = userInput.value.length
  handleInput(char)
  const newLength = userInput.value.length

  if (newLength > previousLength) {
    const index = newLength - 1
    if (userInput.value[index] === targetText.value[index]) {
      playClick()
    }
    else {
      playError()
    }
  }
}

const handleRestart = () => {
  reset()
}

onMounted(() => {
  if (englishArticles[0]) {
    setText(englishArticles[0].content)
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-5xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">
      English Typing Practice
    </h1>

    <StatsDisplay :stats="stats" />

    <div class="mt-8 flex flex-col gap-8">
      <TypingArea
        :target-text="targetText"
        :user-input="userInput"
        :settings="settings"
        @input="onTypingInput"
      />

      <div class="hidden md:block">
        <VirtualKeyboard
          :active-key="activeKey"
          :pressed-key="pressedKey"
        />
      </div>

      <div class="flex justify-center">
        <button
          class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm shadow-primary-200"
          @click="handleRestart"
        >
          <span class="i-heroicons-arrow-path" />
          Restart Test
        </button>
      </div>
    </div>

    <ResultsModal
      :stats="stats"
      :is-open="isFinished"
      @restart="handleRestart"
    />
  </div>
</template>
