<template>
  <NuxtLayout>
    <NuxtPage />
    <AchievementToast ref="achievementToast" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const achievementToast = ref()

// Provide the achievement toast for any child component to use
provide('achievementToast', achievementToast)
</script>
