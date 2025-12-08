<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ScoreEntry {
  _id: string
  username: string
  wpm: number
  accuracy: number
  date: string
  duration: number
}

const { t } = useI18n()

const scores = ref<ScoreEntry[]>([])
const loading = ref(true)
const currentUsername = ref('')

const fetchScores = async () => {
  loading.value = true
  try {
    const data = await $fetch<ScoreEntry[]>('/api/scores')
    scores.value = data
  }
  catch (error) {
    console.error('Failed to fetch scores:', error)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchScores()
})

defineExpose({ refresh: fetchScores, setCurrentUser: (name: string) => { currentUsername.value = name } })
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    <div class="p-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-yellow-50 to-orange-50">
      <h3 class="font-bold text-gray-800 flex items-center gap-2 text-lg">
        <span class="i-heroicons-trophy text-yellow-500 text-xl" />
        {{ t('leaderboard.title') }}
      </h3>
      <button
        class="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/50"
        @click="fetchScores"
      >
        <span class="i-heroicons-arrow-path text-base"></span>
        {{ t('common.refresh') }}
      </button>
    </div>

    <div
      v-if="loading"
      class="p-12 text-center text-gray-500 flex flex-col items-center gap-3"
    >
      <span class="i-heroicons-arrow-path text-3xl animate-spin text-primary-500"></span>
      <span>{{ t('common.loading') }}</span>
    </div>

    <div
      v-else-if="scores.length === 0"
      class="p-12 text-center text-gray-500 flex flex-col items-center gap-3"
    >
      <span class="i-heroicons-trophy text-4xl text-gray-300"></span>
      <div>
        <p class="font-medium text-gray-700">{{ t('leaderboard.no_scores') }}</p>
        <p class="text-sm">{{ t('leaderboard.be_first') }}</p>
      </div>
    </div>

    <div v-else class="divide-y divide-gray-100">
      <div
        v-for="(score, index) in scores"
        :key="score._id"
        class="p-4 hover:bg-gray-50 transition-all duration-200"
        :class="[
          index < 3 ? 'bg-gradient-to-r' : '',
          score.username === currentUsername ? 'ring-2 ring-primary-500 bg-primary-50/30' : ''
        ]"
        :style="index === 0 ? 'background: linear-gradient(to right, #fef3c7 0%, transparent 100%)' : 
                index === 1 ? 'background: linear-gradient(to right, #f3f4f6 0%, transparent 100%)' : 
                index === 2 ? 'background: linear-gradient(to right, #fed7aa 0%, transparent 100%)' : ''"
      >
        <div class="flex items-center gap-4">
          <!-- Rank Badge -->
          <div class="flex-shrink-0">
            <div
              v-if="index < 3"
              class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm"
              :class="{
                'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white': index === 0,
                'bg-gradient-to-br from-gray-300 to-gray-400 text-white': index === 1,
                'bg-gradient-to-br from-orange-400 to-orange-500 text-white': index === 2,
              }"
            >
              {{ index + 1 }}
            </div>
            <div
              v-else
              class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
              :class="score.username === currentUsername ? 'bg-primary-600 text-white font-bold' : 'bg-gray-100 text-gray-500'"
            >
              {{ index + 1 }}
            </div>
          </div>

          <!-- User Info -->
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-900 truncate" :class="score.username === currentUsername ? 'text-primary-700 font-bold' : ''">
              {{ score.username }}
              <span v-if="score.username === currentUsername" class="ml-1 text-xs text-primary-600">(You)</span>
            </p>
            <p class="text-xs text-gray-500">{{ t('leaderboard.test_duration', { duration: score.duration }) }}</p>
          </div>

          <!-- Stats -->
          <div class="flex items-center gap-4 text-right">
            <div>
              <p class="text-lg font-bold text-primary-600 tabular-nums">{{ score.wpm }}</p>
              <p class="text-xs text-gray-500 font-medium">{{ t('stats.wpm') }}</p>
            </div>
            <div>
              <p class="text-sm font-semibold tabular-nums" :class="
                score.accuracy >= 95 ? 'text-green-600' : 
                score.accuracy >= 80 ? 'text-yellow-600' : 'text-gray-600'
              ">{{ score.accuracy }}%</p>
              <p class="text-xs text-gray-500 font-medium">{{ t('leaderboard.acc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
