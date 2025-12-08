<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { articles } from '~/data/articles'

const { t } = useI18n()

const selectedTime = ref(60)
const isCustomModalOpen = ref(false)
const isSetupModalOpen = ref(true)
const username = ref('')
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
          username: username.value || 'Guest ' + Math.floor(Math.random() * 1000),
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

const handleSetupConfirm = (name: string) => {
  username.value = name
  isSetupModalOpen.value = false
  leaderboardRef.value?.setCurrentUser(name)
}

const handleSetupSkip = () => {
  username.value = 'Guest ' + Math.floor(Math.random() * 1000)
  isSetupModalOpen.value = false
  leaderboardRef.value?.setCurrentUser(username.value)
}

onMounted(() => {
  if (articles[0]) {
    setText(articles[0].content)
  }
})
</script>

<template>
  <div
    class="min-h-screen flex flex-col transition-colors duration-300"
    :class="settings.nightMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30'"
  >
    <div class="container mx-auto px-4 py-8 flex-1 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-8 flex flex-col gap-6">
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
        <div class="lg:col-span-4 flex flex-col gap-6">
          <Leaderboard ref="leaderboardRef" />

          <!-- Daily Challenge Card -->
          <div class="p-6 bg-white rounded-xl shadow-lg border border-gray-200 text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <span class="i-heroicons-star text-2xl text-purple-600"></span>
            </div>
            <h3 class="font-bold text-gray-800 mb-2 text-lg">
              {{ t('home.daily_challenge') }}
            </h3>
            <p class="text-sm text-gray-600 mb-4 leading-relaxed">
              {{ t('home.challenge_desc') }}
            </p>
            <div class="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div class="w-1/3 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" />
            </div>
            <p class="text-xs text-gray-500 font-medium">
              1/3 {{ t('home.completed') }}
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

    <!-- Setup Modal -->
    <SetupModal
      :is-open="isSetupModalOpen"
      @confirm="handleSetupConfirm"
      @cancel="handleSetupSkip"
    />
  </div>
</template>
