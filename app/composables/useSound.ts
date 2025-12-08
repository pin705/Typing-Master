import { ref } from 'vue'

export const useSound = () => {
  const isEnabled = ref(true)
  let audioContext: AudioContext | null = null

  const initAudio = () => {
    if (!audioContext) {
      // @ts-expect-error - webkitAudioContext is not standard
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
  }

  const playTone = (frequency: number, type: OscillatorType, duration: number) => {
    if (!isEnabled.value) return
    initAudio()
    if (!audioContext) return

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + duration)
  }

  const playClick = () => {
    playTone(600, 'sine', 0.1)
  }

  const playError = () => {
    playTone(200, 'sawtooth', 0.15)
  }

  const toggleSound = () => {
    isEnabled.value = !isEnabled.value
  }

  return {
    isEnabled,
    playClick,
    playError,
    toggleSound,
  }
}
