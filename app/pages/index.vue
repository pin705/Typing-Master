<script setup lang="ts">
import { ref, onMounted } from 'vue'

const articles = {
  match: "The Little Match Girl was very cold. It was New Year's Eve, and the snow was falling. She walked the streets, bareheaded and barefoot.",
  census: "The United States Census is a decennial census mandated by Article I, Section 2 of the United States Constitution.",
  programming: "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Clean code always looks like it was written by someone who cares."
}

const selectedTime = ref(60)
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
  setDuration
} = useTyping(selectedTime.value)

const settings = ref({
  nightMode: false,
  showTrace: true,
  largeFont: false
})

const handleToggleSetting = (key: string, value: boolean) => {
  // @ts-ignore
  settings.value[key] = value
}

const handleChangeArticle = (articleId: string) => {
  if (articleId === 'random') {
    const keys = Object.keys(articles)
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    // @ts-ignore
    setText(articles[randomKey])
  } else {
    // @ts-ignore
    setText(articles[articleId] || articles.match)
  }
}

const handleRestart = () => {
  reset()
}

const handleChangeTime = (time: number) => {
  selectedTime.value = time
  setDuration(time)
}

onMounted(() => {
  setText(articles.match)
})
</script>

<template>
  <div class="min-h-screen flex flex-col" :class="settings.nightMode ? 'bg-gray-900' : 'bg-gray-50'">
    <div class="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-5xl">
      <!-- Header / Stats -->
      <StatsDisplay :stats="stats" />

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col gap-8">
        <!-- Typing Area -->
        <TypingArea 
          :target-text="targetText"
          :user-input="userInput"
          :settings="settings"
          @input="handleInput"
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
    </div>

    <!-- Results Modal -->
    <ResultsModal 
      :stats="stats"
      :is-open="isFinished"
      @restart="handleRestart"
    />
  </div>
</template>
