<script setup lang="ts">
import { ref } from 'vue'
import { generateGuestUsername } from '~/utils/username'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm', username: string): void
  (e: 'cancel'): void
}>()

const { t } = useI18n()
const username = ref('')

const handleConfirm = () => {
  const finalUsername = username.value.trim() || generateGuestUsername()
  emit('confirm', finalUsername)
}
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Transition
        enter-active-class="transition ease-out duration-300 delay-100"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
      >
        <div v-if="isOpen" class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform">
          <!-- Icon & Title -->
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <span class="i-heroicons-user text-4xl text-primary-600"></span>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ t('setup.title') }}</h2>
            <p class="text-gray-500 text-sm">{{ t('setup.subtitle') }}</p>
          </div>
          
          <!-- Username Input -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              {{ t('setup.username_label') }}
            </label>
            <input
              v-model="username"
              type="text"
              :placeholder="t('setup.username_placeholder')"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              maxlength="20"
              @keyup.enter="handleConfirm"
            />
            <p class="text-xs text-gray-500 mt-2">{{ t('setup.username_hint') }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3">
            <button
              class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
              @click="emit('cancel')"
            >
              {{ t('setup.skip') }}
            </button>
            <button
              class="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
              @click="handleConfirm"
            >
              {{ t('setup.start') }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
