<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <TransitionGroup name="toast">
      <div
        v-for="achievement in achievements"
        :key="achievement.id"
        class="flex items-center gap-3 rounded-lg border-2 bg-white p-4 shadow-lg dark:bg-gray-800 max-w-sm"
        :class="{
          'border-yellow-400': achievement.tier === 'gold',
          'border-gray-400': achievement.tier === 'silver',
          'border-orange-400': achievement.tier === 'bronze',
          'border-purple-400': achievement.tier === 'platinum',
          'border-blue-400': achievement.tier === 'diamond',
        }"
      >
        <div class="text-4xl">
          {{ achievement.icon }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-gray-500 dark:text-gray-400">
            🎉 Achievement Unlocked!
          </div>
          <div class="font-bold text-gray-900 dark:text-white">
            {{ achievement.name }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ achievement.description }}
          </div>
          <div class="mt-1 text-xs font-medium"
               :class="{
                 'text-yellow-600 dark:text-yellow-400': achievement.tier === 'gold',
                 'text-gray-600 dark:text-gray-400': achievement.tier === 'silver',
                 'text-orange-600 dark:text-orange-400': achievement.tier === 'bronze',
                 'text-purple-600 dark:text-purple-400': achievement.tier === 'platinum',
                 'text-blue-600 dark:text-blue-400': achievement.tier === 'diamond',
               }"
          >
            +{{ achievement.points }} XP
          </div>
        </div>
        <button
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          @click="removeAchievement(achievement.id)"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  tier: string
  points: number
}

const achievements = ref<Achievement[]>([])

const showAchievement = (achievement: Achievement) => {
  achievements.value.push(achievement)
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    removeAchievement(achievement.id)
  }, 5000)
}

const removeAchievement = (id: string) => {
  const index = achievements.value.findIndex(a => a.id === id)
  if (index !== -1) {
    achievements.value.splice(index, 1)
  }
}

// Expose the showAchievement method
defineExpose({
  showAchievement,
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
