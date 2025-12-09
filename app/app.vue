<template>
  <NuxtLayout>
    <NuxtPage />
    <AchievementToast ref="achievementToast" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const achievementToast = ref()

// Make achievementToast globally available
if (process.client) {
  window.$achievementToast = achievementToast
}
</script>
