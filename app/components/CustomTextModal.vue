<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm', text: string): void
  (e: 'cancel'): void
}>()

const customText = ref('')

const handleConfirm = () => {
  if (customText.value.trim()) {
    emit('confirm', customText.value.trim())
    customText.value = ''
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Custom Text</h2>
      
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Paste your text here to practice:
        </label>
        <textarea
          v-model="customText"
          rows="10"
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          placeholder="Type or paste your text here..."
        ></textarea>
      </div>

      <div class="flex justify-end gap-3">
        <button 
          class="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          @click="emit('cancel')"
        >
          Cancel
        </button>
        <button 
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!customText.trim()"
          @click="handleConfirm"
        >
          Start Practice
        </button>
      </div>
    </div>
  </div>
</template>
