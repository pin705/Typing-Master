import { ref, computed } from 'vue'

export interface TypingStats {
  wpm: number
  accuracy: number
  timeRemaining: number
  totalChars: number
  correctChars: number
  incorrectChars: number
}

export const useTyping = (initialTime: number = 60) => {
  const targetText = ref('')
  const userInput = ref('')
  const isRunning = ref(false)
  const isFinished = ref(false)
  const duration = ref(initialTime)
  const timeRemaining = ref(initialTime)
  const timeElapsed = ref(0)
  const timer = ref<ReturnType<typeof setInterval> | null>(null)
  const mode = ref<'time' | 'words'>('time')

  // Stats
  const startTime = ref<number | null>(null)
  const correctChars = ref(0)
  const incorrectChars = ref(0)

  const setText = (text: string) => {
    targetText.value = text
    reset()
  }

  const setDuration = (newDuration: number) => {
    duration.value = newDuration
    reset()
  }

  const setMode = (newMode: 'time' | 'words') => {
    mode.value = newMode
    reset()
  }

  const start = () => {
    if (isRunning.value || isFinished.value) return
    isRunning.value = true
    startTime.value = Date.now()

    timer.value = setInterval(() => {
      timeElapsed.value++
      if (mode.value === 'time') {
        if (timeRemaining.value > 0) {
          timeRemaining.value--
        }
        else {
          finish()
        }
      }
    }, 1000)
  }

  const finish = () => {
    if (timer.value) clearInterval(timer.value)
    isRunning.value = false
    isFinished.value = true
  }

  const reset = () => {
    if (timer.value) clearInterval(timer.value)
    userInput.value = ''
    isRunning.value = false
    isFinished.value = false
    timeRemaining.value = duration.value
    timeElapsed.value = 0
    correctChars.value = 0
    incorrectChars.value = 0
    startTime.value = null
  }

  const activeKey = computed(() => {
    if (isFinished.value || !targetText.value) return ''
    const char = targetText.value[userInput.value.length]
    if (!char) return ''
    if (char === ' ') return 'Space'
    return char
  })

  const pressedKey = ref('')

  const handleInput = (char: string) => {
    if (isFinished.value) return
    if (!isRunning.value) start()

    pressedKey.value = char === ' ' ? 'Space' : char

    // Handle backspace
    if (char === 'Backspace') {
      userInput.value = userInput.value.slice(0, -1)
      return
    }

    // Ignore other special keys
    if (char.length > 1) return

    // Limit input length to target text length
    if (userInput.value.length >= targetText.value.length) return

    userInput.value += char

    // Check finish condition for words mode
    if (mode.value === 'words' && userInput.value.length === targetText.value.length) {
      finish()
    }
  }

  const stats = computed<TypingStats>(() => {
    const totalTyped = userInput.value.length

    // Calculate accuracy
    let correct = 0
    let incorrect = 0
    for (let i = 0; i < totalTyped; i++) {
      if (userInput.value[i] === targetText.value[i]) {
        correct++
      }
      else {
        incorrect++
      }
    }

    const accuracy = totalTyped > 0 ? Math.round((correct / totalTyped) * 100) : 100

    // Calculate WPM
    // Standard WPM = (all typed / 5) / time in minutes
    const timeInSeconds = mode.value === 'time'
      ? (duration.value - timeRemaining.value)
      : timeElapsed.value

    const wpm = timeInSeconds > 0
      ? Math.round((totalTyped / 5) / (timeInSeconds / 60))
      : 0

    return {
      wpm,
      accuracy,
      timeRemaining: timeRemaining.value,
      totalChars: totalTyped,
      correctChars: correct,
      incorrectChars: incorrect,
    }
  })

  return {
    targetText,
    userInput,
    isRunning,
    isFinished,
    stats,
    activeKey,
    pressedKey,
    setText,
    start,
    reset,
    handleInput,
    setDuration,
    setMode,
  }
}
