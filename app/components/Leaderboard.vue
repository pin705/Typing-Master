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

const scores = ref<ScoreEntry[]>([])
const loading = ref(true)

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

defineExpose({ refresh: fetchScores })
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
      <h3 class="font-bold text-gray-800 flex items-center gap-2">
        <span class="i-heroicons-trophy text-yellow-500" />
        Top Typists
      </h3>
      <button
        class="text-sm text-primary-600 hover:text-primary-700 font-medium"
        @click="fetchScores"
      >
        Refresh
      </button>
    </div>

    <div
      v-if="loading"
      class="p-8 text-center text-gray-500"
    >
      Loading...
    </div>

    <div
      v-else-if="scores.length === 0"
      class="p-8 text-center text-gray-500"
    >
      No scores yet. Be the first!
    </div>

    <table
      v-else
      class="w-full text-sm text-left"
    >
      <thead class="text-xs text-gray-500 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-3">
            Rank
          </th>
          <th class="px-4 py-3">
            User
          </th>
          <th class="px-4 py-3 text-right">
            WPM
          </th>
          <th class="px-4 py-3 text-right">
            Acc
          </th>
          <th class="px-4 py-3 text-right">
            Time
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(score, index) in scores"
          :key="score._id"
          class="border-b border-gray-50 hover:bg-gray-50 transition-colors"
        >
          <td class="px-4 py-3 font-medium text-gray-500">
            <span
              v-if="index < 3"
              class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
              :class="{
                'bg-yellow-100 text-yellow-700': index === 0,
                'bg-gray-100 text-gray-700': index === 1,
                'bg-orange-100 text-orange-700': index === 2,
              }"
            >
              {{ index + 1 }}
            </span>
            <span
              v-else
              class="pl-2"
            >{{ index + 1 }}</span>
          </td>
          <td class="px-4 py-3 font-medium text-gray-900">
            {{ score.username }}
          </td>
          <td class="px-4 py-3 text-right font-bold text-primary-600">
            {{ score.wpm }}
          </td>
          <td class="px-4 py-3 text-right text-gray-600">
            {{ score.accuracy }}%
          </td>
          <td class="px-4 py-3 text-right text-gray-500">
            {{ score.duration }}s
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
