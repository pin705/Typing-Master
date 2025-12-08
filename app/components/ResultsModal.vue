<script setup lang="ts">
import type { TypingStats } from '~/composables/useTyping'

defineProps<{
  stats: TypingStats
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'restart'): void
}>()

const { t } = useI18n()
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
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <Transition
        enter-active-class="transition ease-out duration-300 delay-100"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
      >
        <div
          v-if="isOpen"
          class="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 transform"
        >
          <!-- Success Icon & Title -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <span class="i-heroicons-check-circle text-4xl text-green-600" />
            </div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              {{ t('results.title') }}
            </h2>
            <p class="text-gray-500">
              {{ t('results.subtitle') }}
            </p>
          </div>

          <!-- Main Stats -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="flex flex-col items-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200">
              <span class="text-5xl font-bold text-primary-600 mb-2 tabular-nums">{{ stats.wpm }}</span>
              <span class="text-sm text-primary-700 font-semibold uppercase tracking-wider">{{ t('stats.wpm') }}</span>
            </div>

            <div
              class="flex flex-col items-center p-6 bg-gradient-to-br rounded-xl border"
              :class="
                stats.accuracy >= 95
                  ? 'from-green-50 to-green-100 border-green-200'
                  : stats.accuracy >= 80
                    ? 'from-yellow-50 to-yellow-100 border-yellow-200'
                    : 'from-red-50 to-red-100 border-red-200'
              "
            >
              <span
                class="text-5xl font-bold mb-2 tabular-nums"
                :class="
                  stats.accuracy >= 95
                    ? 'text-green-600'
                    : stats.accuracy >= 80
                      ? 'text-yellow-600'
                      : 'text-red-600'
                "
              >{{ stats.accuracy }}%</span>
              <span
                class="text-sm font-semibold uppercase tracking-wider"
                :class="
                  stats.accuracy >= 95
                    ? 'text-green-700'
                    : stats.accuracy >= 80
                      ? 'text-yellow-700'
                      : 'text-red-700'
                "
              >{{ t('stats.accuracy') }}</span>
            </div>
          </div>

          <!-- Detailed Stats -->
          <div class="grid grid-cols-3 gap-3 mb-8">
            <div class="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <span class="text-2xl font-bold text-gray-800 mb-1 tabular-nums">{{ stats.totalChars }}</span>
              <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">{{ t('results.total') }}</span>
            </div>

            <div class="flex flex-col items-center p-4 bg-green-50 rounded-lg border border-green-100">
              <span class="text-2xl font-bold text-green-600 mb-1 tabular-nums">{{ stats.correctChars }}</span>
              <span class="text-xs text-green-600 font-medium uppercase tracking-wider">{{ t('results.correct') }}</span>
            </div>

            <div class="flex flex-col items-center p-4 bg-red-50 rounded-lg border border-red-100">
              <span class="text-2xl font-bold text-red-600 mb-1 tabular-nums">{{ stats.incorrectChars }}</span>
              <span class="text-xs text-red-600 font-medium uppercase tracking-wider">{{ t('results.errors') }}</span>
            </div>
          </div>

          <!-- Performance Message -->
          <div
            class="mb-6 p-4 rounded-lg text-center"
            :class="
              stats.accuracy >= 95 && stats.wpm >= 60
                ? 'bg-green-50 border border-green-200'
                : stats.accuracy >= 80 && stats.wpm >= 40
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-50 border border-gray-200'
            "
          >
            <p
              class="font-medium"
              :class="
                stats.accuracy >= 95 && stats.wpm >= 60
                  ? 'text-green-700'
                  : stats.accuracy >= 80 && stats.wpm >= 40
                    ? 'text-blue-700'
                    : 'text-gray-700'
              "
            >
              {{ stats.accuracy >= 95 && stats.wpm >= 60
                ? t('results.excellent')
                : stats.accuracy >= 80 && stats.wpm >= 40
                  ? t('results.good')
                  : t('results.keep_going')
              }}
            </p>
          </div>

          <button
            class="w-full py-4 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
            @click="emit('restart')"
          >
            <span class="i-heroicons-arrow-path text-xl" />
            {{ t('results.try_again') }}
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
