<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { articles } from '~/data/articles'

const selectedTime = ref(60)
const isCustomModalOpen = ref(false)
const leaderboardRef = ref()
const { playClick, playError, isEnabled: isSoundEnabled } = useSound()

const {
  targetText,
  userInput,
  stats,
  isRunning,
  isFinished,
  activeKey,
  pressedKey,
  setText,
  handleInput,
  reset,
  setDuration,
} = useTyping(selectedTime.value)

const settings = ref({
  nightMode: false,
  showTrace: true,
  largeFont: false,
  sound: true,
})

// Watch for finish to save score
watch(isFinished, async (finished) => {
  if (finished) {
    try {
      await $fetch('/api/scores', {
        method: 'POST',
        body: {
          username: 'Guest ' + Math.floor(Math.random() * 1000),
          wpm: stats.value.wpm,
          accuracy: stats.value.accuracy,
          duration: selectedTime.value,
        },
      })
      // Refresh leaderboard
      leaderboardRef.value?.refresh()
    }
    catch (e) {
      console.error('Failed to save score', e)
    }
  }
})

const handleToggleSetting = (key: string, value: boolean) => {
  // @ts-expect-error - dynamic key access
  settings.value[key] = value
  if (key === 'sound') {
    isSoundEnabled.value = value
  }
}

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

const handleChangeArticle = (articleId: string) => {
  if (articleId === 'custom') {
    isCustomModalOpen.value = true
    return
  }

  if (articleId === 'random') {
    const randomArticle = articles[Math.floor(Math.random() * articles.length)]
    if (randomArticle) {
      setText(randomArticle.content)
    }
  }
  else {
    const article = articles.find(a => a.id === articleId)
    if (article) {
      setText(article.content)
    }
  }
}

const handleCustomTextConfirm = (text: string) => {
  setText(text)
  isCustomModalOpen.value = false
}

const handleRestart = () => {
  reset()
}

const handleChangeTime = (time: number) => {
  selectedTime.value = time
  setDuration(time)
}

onMounted(() => {
  if (articles[0]) {
    setText(articles[0].content)
  }
})
</script>

<template>
  <div
    class="min-h-screen flex flex-col"
    :class="settings.nightMode ? 'bg-gray-900' : 'bg-gray-50'"
  >
    <div class="container mx-auto px-4 py-8 flex-1 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-8 flex flex-col gap-8">
          <!-- Header / Stats -->
          <StatsDisplay :stats="stats" />

          <!-- Typing Area -->
          <TypingArea
            :target-text="targetText"
            :user-input="userInput"
            :settings="settings"
            @input="onTypingInput"
          />

          <!-- Virtual Keyboard -->
          <div class="hidden md:block">
            <VirtualKeyboard
              :active-key="activeKey"
              :pressed-key="pressedKey"
            />
          </div>

          <!-- Controls -->
          <ControlPanel
            :is-running="isRunning"
            :selected-time="selectedTime"
            @restart="handleRestart"
            @change-time="handleChangeTime"
            @change-article="handleChangeArticle"
            @toggle-setting="handleToggleSetting"
          />
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4">
          <Leaderboard ref="leaderboardRef" />

          <!-- Ad placeholder or extra info could go here -->
          <div class="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
            <h3 class="font-bold text-gray-800 mb-2">
              Daily Challenge
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              Complete 3 tests with > 95% accuracy to win a badge!
            </p>
            <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="w-1/3 h-full bg-primary-500" />
            </div>
            <p class="text-xs text-gray-400 mt-2">
              1/3 Completed
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Modal -->
    <ResultsModal
      :stats="stats"
      :is-open="isFinished"
      @restart="handleRestart"
    />

    <!-- Custom Text Modal -->
    <CustomTextModal
      :is-open="isCustomModalOpen"
      @confirm="handleCustomTextConfirm"
      @cancel="isCustomModalOpen = false"
    />
  </div>
</template>
